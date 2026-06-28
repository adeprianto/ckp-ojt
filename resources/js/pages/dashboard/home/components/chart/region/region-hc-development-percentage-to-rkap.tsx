import { Chart } from '@highcharts/react';
import axios from 'axios';
import type * as Highcharts from 'highcharts';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { REALIZATION_PER_REGIONAL, RKAP_PER_REGIONAL } from '@/lib/rkap';
import { mapRegionIdToRegion } from '@/lib/utils';

type RegionHcDevelopmentPercentageToRkapProp = {
    selectedRegion: number;
    fullYear: boolean;
};

type RegionDevelopmentCost = {
    region_name: string;
    total_cost: string;
};

export default function RegionHCDevelopmentPercentageToRkap({
    selectedRegion,
    fullYear,
}: RegionHcDevelopmentPercentageToRkapProp) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<RegionDevelopmentCost>();

    useEffect(() => {
        const fetchOverviewData = async () => {
            setIsLoading(true);

            try {
                const response = await axios.get<RegionDevelopmentCost[]>(
                    `/api/region/${selectedRegion}/realization`,
                );
                setData(response.data.at(0));
                setIsLoading(false);
            } catch (e) {
                console.error(e);
                setIsLoading(false);
            }
        };

        fetchOverviewData();
    }, [selectedRegion]);

    const calculateRKAPValues = useCallback(
        (
            data: typeof RKAP_PER_REGIONAL,
            selectedRegion: number,
            fullYear: boolean,
        ) => {
            const regKey = mapRegionIdToRegion(selectedRegion);

            if (fullYear) {
                return Object.values(data).reduce((total, monthData) => {
                    return total + monthData[regKey].rkap;
                }, 0);
            } else {
                return Object.values(data)
                    .slice(0, 6)
                    .reduce((total, monthData) => {
                        return total + monthData[regKey].rkap;
                    }, 0);
            }
        },
        [],
    );

    const calculateRealizationValues = useCallback(
        (
            data: typeof REALIZATION_PER_REGIONAL,
            selectedRegion: number,
            overviewRegionLearningCost: RegionDevelopmentCost,
            fullYear: boolean,
        ) => {
            const regKey = mapRegionIdToRegion(selectedRegion);

            let realization = 0;

            if (fullYear) {
                realization += Object.values(data).reduce(
                    (total, monthData) => {
                        return (
                            total +
                            monthData[regKey].lpp +
                            monthData[regKey].nonLpp
                        );
                    },
                    0,
                );
            } else {
                realization += Object.values(data)
                    .slice(0, 6)
                    .reduce((total, monthData) => {
                        return (
                            total +
                            monthData[regKey].lpp +
                            monthData[regKey].nonLpp
                        );
                    }, 0);
            }

            return (
                realization +
                parseInt(overviewRegionLearningCost.total_cost ?? '0')
            );
        },
        [],
    );

    const chartOptions: Highcharts.Options = useMemo(() => {
        if (data) {
            const rkap = calculateRKAPValues(
                RKAP_PER_REGIONAL,
                selectedRegion,
                fullYear,
            );
            const realization = calculateRealizationValues(
                REALIZATION_PER_REGIONAL,
                selectedRegion,
                data,
                fullYear,
            );

            const progressValue = (realization / rkap) * 100;
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
        data,
        fullYear,
        selectedRegion,
    ]);

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
