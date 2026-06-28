import { Chart } from '@highcharts/react';
import axios from 'axios';
import type * as Highcharts from 'highcharts';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { REALIZATION_PER_REGIONAL } from '@/lib/rkap';
import { RKAP_PER_REGIONAL } from '@/lib/rkap';

type OverviewRegionLearningCost = {
    region_name: string;
    total_learning_hours: number;
    total_cost: number;
    total_participants: number;
};

type OverviewHcDevelopmentPercentageToRkapProp = {
    fullYear: boolean;
};

export default function OverviewHCDevelopmentPercentageToRkap({
    fullYear,
}: OverviewHcDevelopmentPercentageToRkapProp) {
    const [isLoading, setIsLoading] = useState(false);
    const [overviewRegionLearningCost, setOverviewRegionLearningCost] =
        useState<OverviewRegionLearningCost[]>();

    const calculateRKAPValues = useCallback(
        (data: typeof RKAP_PER_REGIONAL, fullYear: boolean) => {
            if (fullYear) {
                return Object.values(data).reduce((total, monthData) => {
                    return (
                        total +
                        Object.values(monthData).reduce(
                            (total, data) => total + data.rkap / 1000,
                            0,
                        )
                    );
                }, 0);
            } else {
                return Object.values(data)
                    .slice(0, 6)
                    .reduce((total, monthData) => {
                        return (
                            total +
                            Object.values(monthData).reduce(
                                (total, data) => total + data.rkap / 1000,
                                0,
                            )
                        );
                    }, 0);
            }
        },
        [],
    );

    const calculateRealizationValues = useCallback(
        (
            data: typeof REALIZATION_PER_REGIONAL,
            overviewRegionLearningCost: OverviewRegionLearningCost[],
            fullYear: boolean,
        ) => {
            const mData: Record<string, number> = {};

            if (fullYear) {
                Object.values(data).forEach((monthData) => {
                    for (const [key, totals] of Object.entries(monthData)) {
                        // If the key doesn't exist yet, initialize it to 0
                        if (!(key in mData)) {
                            mData[key] = 0;
                        }

                        // Add the current month's value to the running total
                        mData[key] += totals.lpp + totals.nonLpp;
                    }
                });
            } else {
                Object.values(data)
                    .slice(0, 6)
                    .forEach((monthData) => {
                        for (const [key, totals] of Object.entries(monthData)) {
                            // If the key doesn't exist yet, initialize it to 0
                            if (!(key in mData)) {
                                mData[key] = 0;
                            }

                            // Add the current month's value to the running total
                            mData[key] += totals.lpp + totals.nonLpp;
                        }
                    });
            }

            overviewRegionLearningCost?.forEach((value) => {
                switch (value.region_name) {
                    case 'SUPPCO HO':
                        mData['ho'] += parseInt(value.total_cost.toString());
                        break;
                    case 'SUPPCO REG 01':
                        mData['reg1'] += parseInt(value.total_cost.toString());
                        break;
                    case 'SUPPCO REG 02':
                        mData['reg2'] += parseInt(value.total_cost.toString());
                        break;
                    case 'SUPPCO REG 03':
                        mData['reg3'] += parseInt(value.total_cost.toString());
                        break;
                    case 'SUPPCO REG 04':
                    case 'SUPPCO REG 05':
                        mData['reg5'] += parseInt(value.total_cost.toString());
                        break;
                    case 'SUPPCO REG 07':
                        mData['reg7'] += parseInt(value.total_cost.toString());
                        break;
                    case 'SUPPCO REG 08':
                        mData['reg8'] += parseInt(value.total_cost.toString());
                        break;
                }
            });

            return (
                mData['ho'] / 1000 +
                mData['reg1'] / 1000 +
                mData['reg2'] / 1000 +
                mData['reg3'] / 1000 +
                mData['reg5'] / 1000 +
                mData['reg7'] / 1000 +
                mData['reg8'] / 1000
            );
        },
        [],
    );

    const chartOptions: Highcharts.Options = useMemo(() => {
        if (
            overviewRegionLearningCost &&
            overviewRegionLearningCost.length > 0
        ) {
            const totalRKAP = calculateRKAPValues(RKAP_PER_REGIONAL, fullYear);
            const totalRealization = calculateRealizationValues(
                REALIZATION_PER_REGIONAL,
                overviewRegionLearningCost,
                fullYear,
            );

            const progressValue = (totalRealization / totalRKAP) * 100;
            const remainderValue = 100 - progressValue;

            return {
                chart: {
                    type: 'pie',
                    // Optional: make the chart background transparent
                    backgroundColor: 'transparent',
                },
                title: {
                    // Center the percentage text inside the donut hole
                    text: `${progressValue.toFixed(1)}%`,
                    align: 'center',
                    verticalAlign: 'middle',
                    // Adjust Y slightly to perfectly center the text vertically
                    y: 15,
                    style: {
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#333333',
                    },
                },
                tooltip: {
                    enabled: false, // Usually, progress bars don't need tooltips
                },
                plotOptions: {
                    pie: {
                        // Make the ring thinner for a standard progress bar look
                        innerSize: '80%',
                        borderWidth: 0, // Remove the border between slices
                        dataLabels: {
                            enabled: false, // Hide standard external data labels
                        },
                        // Optional: round the edges of the progress bar (requires Highcharts v9+)
                        borderRadius: 5,
                    },
                },
                series: [
                    {
                        type: 'pie',
                        name: 'Progress',
                        // Disable hover animations for the whole series to make it feel like a static UI element
                        states: {
                            hover: { enabled: false },
                        },
                        data: [
                            {
                                name: 'Completed',
                                y: progressValue,
                                color: '#007BFF', // Your primary progress color (e.g., blue)
                            },
                            {
                                name: 'Remaining',
                                y: remainderValue,
                                color: '#E9ECEF', // A faint gray color to act as the "empty" track
                                enableMouseTracking: false, // Prevents the user from interacting with the empty space
                            },
                        ],
                    },
                ],
            };
        }

        return {};
    }, [
        calculateRKAPValues,
        calculateRealizationValues,
        fullYear,
        overviewRegionLearningCost,
    ]);

    useEffect(() => {
        const fetchOverviewData = async () => {
            setIsLoading(true);

            try {
                const response = await axios.get<OverviewRegionLearningCost[]>(
                    fullYear
                        ? '/api/training/realization/region?isFullYear=true'
                        : `/api/training/realization/region?isFullYear=false`,
                );
                setOverviewRegionLearningCost(response.data);
                setIsLoading(false);
            } catch (e) {
                console.error(e);
                setIsLoading(false);
            }
        };

        fetchOverviewData();
    }, []);

    return isLoading ? (
        <div>Loading ...</div>
    ) : (
        <div className="highcharts-light" style={{ height: '100%' }}>
            <Chart
                options={chartOptions as any}
                containerProps={{
                    style: {
                        maxHeight: '200px',
                        height: '100%',
                    },
                }}
            />
        </div>
    );
}
