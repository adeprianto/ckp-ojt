import { Chart } from '@highcharts/react';
import axios from 'axios';
import * as Highcharts from 'highcharts';

import React, { useEffect, useMemo, useState } from 'react';
import { REALIZATION_PER_REGIONAL, RKAP_PER_REGIONAL } from '@/lib/rkap';

Highcharts.setOptions({
    lang: {
        thousandsSep: '.',
        decimalPoint: ',',
    },
});

type OverviewRegionLearningCost = {
    region_name: string;
    total_learning_hours: number;
    total_cost: number;
    total_participants: number;
};

const OverviewHCDevelopmentCostPerRegion: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [overviewRegionLearningCost, setOverviewRegionLearningCost] =
        useState<OverviewRegionLearningCost[]>();

    useEffect(() => {
        const fetchOverviewData = async () => {
            setIsLoading(true);

            try {
                const response = await axios.get<OverviewRegionLearningCost[]>(
                    '/api/training/realization/region',
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

    const calculateRKAPValues = (data: typeof RKAP_PER_REGIONAL) => {
        const mData: Record<string, number> = {};

        Object.values(data).forEach((monthData) => {
            for (const [key, totals] of Object.entries(monthData)) {
                // If the key doesn't exist yet, initialize it to 0
                if (!(key in mData)) {
                    mData[key] = 0;
                }

                // Add the current month's value to the running total
                mData[key] += totals.rkap;
            }
        });

        return [
            mData['ho'] / 1000,
            mData['reg1'] / 1000,
            mData['reg2'] / 1000,
            mData['reg3'] / 1000,
            mData['reg5'] / 1000,
            mData['reg7'] / 1000,
            mData['reg8'] / 1000,
        ];
    };

    const calculateRealizationValues = (
        data: typeof REALIZATION_PER_REGIONAL,
    ) => {
        const mData: Record<string, number> = {};

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

        return [
            mData['ho'] / 1000,
            mData['reg1'] / 1000,
            mData['reg2'] / 1000,
            mData['reg3'] / 1000,
            mData['reg5'] / 1000,
            mData['reg7'] / 1000,
            mData['reg8'] / 1000,
        ];
    };

    const chartOptions: Highcharts.Options = useMemo(() => {
        if (
            overviewRegionLearningCost &&
            overviewRegionLearningCost?.length > 0
        ) {
            return {
                chart: {
                    zooming: {
                        type: 'xy',
                    },
                },
                title: {
                    text: 'Overview Pengembangan Biaya SDM (Rp. 000)',
                },
                xAxis: [
                    {
                        // Use categories explicitly since we removed dataTable
                        categories: overviewRegionLearningCost.map(
                            (overview) => overview.region_name,
                        ),
                        crosshair: true,
                    },
                ],
                yAxis: [
                    {
                        title: {
                            text: 'Biaya (Rp. 000)',
                            style: {
                                color: 'var(--highcharts-color-1)',
                            },
                        },
                        labels: {
                            format: '{value:,.0f}',
                            style: {
                                color: 'var(--highcharts-color-1)',
                            },
                        },
                    },
                ],
                tooltip: {
                    shared: true,
                    useHTML: true, // This is the magic flag that lets us use custom CSS and HTML

                    // --- 1. Outer Box Styling ---
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Use 'rgba(30,30,30, 0.9)' for a dark theme
                    borderColor: '#e6e6e6',
                    borderWidth: 1,
                    borderRadius: 8, // Gives it nice rounded corners
                    padding: 12, // Gives the text room to breathe
                    shadow: true,
                    style: {
                        color: '#333333', // Font color (use '#ffffff' for dark theme)
                        fontFamily: 'sans-serif',
                        fontSize: '13px',
                    },

                    // --- 2. Title (Header) ---
                    // Adds a bold title with a subtle line underneath
                    headerFormat:
                        '<div style="font-size: 10px; font-weight: bold; border-bottom: 1px solid #eeeeee; padding-bottom: 6px; margin-bottom: 6px;">{point.key}</div><table style="width: 100%;">',

                    // --- 3. Body (The Data Rows) ---
                    // Uses a table to perfectly align the series name on the left and the value on the right
                    pointFormat:
                        '<tr>' +
                        '<td style="padding: 3px 15px 3px 0; font-size: 10px">' +
                        '<span style="color:{series.color}; font-size: 10px;">\u25CF</span> {series.name}:' +
                        '</td>' +
                        '<td style="padding: 3px 0; text-align: right; font-size: 10px">' +
                        '<b>Rp. {point.y:,.0f}</b>' +
                        '</td>' +
                        '</tr>',

                    // --- 4. Footer ---
                    footerFormat: '</table>',
                    valueDecimals: 0,
                },
                legend: {
                    enabled: false,
                    layout: 'vertical',
                    align: 'left',
                    x: 130,
                    verticalAlign: 'top',
                    y: 55,
                    floating: true,
                    backgroundColor: `color-mix(
                var(--highcharts-neutral-color-40) 25%,
                transparent
            )`,
                },
                plotOptions: {
                    // Enable stacking for the column charts
                },
                series: [
                    {
                        name: 'RKAP',
                        type: 'column',
                        yAxis: 0,
                        data: calculateRKAPValues(RKAP_PER_REGIONAL),
                        marker: {
                            enabled: false,
                        },
                        tooltip: {
                            valuePrefix: 'Rp. ',
                        },
                    },

                    {
                        name: 'Realisasi per Regional',
                        type: 'column',
                        yAxis: 0,
                        data: calculateRealizationValues(
                            REALIZATION_PER_REGIONAL,
                        ),
                        tooltip: { valuePrefix: 'Rp. ' },
                    },
                ],
                responsive: {
                    rules: [
                        {
                            condition: {
                                maxWidth: 500,
                            },
                            chartOptions: {
                                legend: {
                                    enabled: false,
                                    floating: false,
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom',
                                    x: 0,
                                    y: 0,
                                },
                                yAxis: [
                                    {
                                        labels: {
                                            align: 'right',
                                            x: 0,
                                            y: -6,
                                        },
                                        showLastLabel: false,
                                    },
                                ],
                            },
                        },
                    ],
                },
            };
        }

        return {};
    }, [overviewRegionLearningCost]);

    // 3. Render using the new JSX-native <Chart /> component
    return isLoading ? (
        <div>Loading ...</div>
    ) : (
        <div
            className="highcharts-light overflow-hidden rounded-sm border-[1.5px]"
            style={{ width: '100%', height: '100%' }}
        >
            <Chart
                options={chartOptions as any}
                containerProps={{
                    style: {
                        minHeight: '600px',
                        height: '100%', // Optional: Allows it to fill a larger parent container
                        width: '100%',
                    },
                }}
            />
        </div>
    );
};

export default OverviewHCDevelopmentCostPerRegion;
