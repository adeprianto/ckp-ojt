import { Chart } from '@highcharts/react';
import axios from 'axios';
import type * as Highcharts from 'highcharts';
import React, { useEffect, useMemo, useState } from 'react';

type RegionCostLearningSector = {
    learning_sector: string;
    total_cost: string;
};

type RegionHCDevelopmentCostLearningSectorProp = {
    selectedRegion: number;
};

export default function RegionHCDevelopmentCostLearningSector({
    selectedRegion,
}: RegionHCDevelopmentCostLearningSectorProp) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<RegionCostLearningSector[]>();

    useEffect(() => {
        const fetchOverviewData = async () => {
            setIsLoading(true);

            try {
                const response = await axios.get<RegionCostLearningSector[]>(
                    `/api/region/${selectedRegion}/realization/learning-sector`,
                );
                setData(response.data);
                setIsLoading(false);
            } catch (e) {
                console.error(e);
                setIsLoading(false);
            }
        };

        fetchOverviewData();
    }, [selectedRegion]);

    const chartOptions: Highcharts.Options = useMemo(() => {
        if (data) {
            return {
                chart: {
                    zooming: {
                        type: 'xy',
                    },
                },
                title: {
                    text: 'Overview Biaya per Bidang (Rp. 000)',
                },
                xAxis: [
                    {
                        // Use categories explicitly since we removed dataTable
                        categories: [
                            'Tanaman',
                            'Pengolahan',
                            'Teknik',
                            'Keuangan',
                            'Personalia',
                            'Umum',
                        ],
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
                        name: 'Realisasi',
                        type: 'column',
                        yAxis: 0,
                        data: [
                            parseInt(
                                data.find(
                                    (val) => val.learning_sector === 'tanaman',
                                )?.total_cost ?? '0',
                            ) / 1000,
                            parseInt(
                                data.find(
                                    (val) =>
                                        val.learning_sector === 'pengolahan',
                                )?.total_cost ?? '0',
                            ) / 1000,
                            parseInt(
                                data.find(
                                    (val) => val.learning_sector === 'teknik',
                                )?.total_cost ?? '0',
                            ) / 1000,
                            parseInt(
                                data.find(
                                    (val) => val.learning_sector === 'keuangan',
                                )?.total_cost ?? '0',
                            ) / 1000,
                            parseInt(
                                data.find(
                                    (val) =>
                                        val.learning_sector === 'personalia',
                                )?.total_cost ?? '0',
                            ) / 1000,
                            parseInt(
                                data.find(
                                    (val) => val.learning_sector === 'umum',
                                )?.total_cost ?? '0',
                            ) / 1000,
                        ],
                        marker: {
                            enabled: false,
                        },
                        tooltip: {
                            valuePrefix: 'Rp. ',
                        },
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
    }, [data]);

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
}
