import { Chart } from '@highcharts/react';
import axios from 'axios';
import * as Highcharts from 'highcharts';

import React, { useEffect, useMemo, useState } from 'react';

Highcharts.setOptions({
    lang: {
        thousandsSep: '.',
        decimalPoint: ',',
    },
});

type OverviewLearningHoursPerRegion = {
    region_name: string;
    total_learning_hours: string;
};

const OverviewHCDevelopmentLearningHoursPerRegion: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<OverviewLearningHoursPerRegion[]>();

    useEffect(() => {
        const fetchOverviewData = async () => {
            setIsLoading(true);

            try {
                const response = await axios.get<
                    OverviewLearningHoursPerRegion[]
                >('/api/training/total-learning-hours/region');
                setData(response.data);
                setIsLoading(false);
            } catch (e) {
                console.error(e);
                setIsLoading(false);
            }
        };

        fetchOverviewData();
    }, []);

    const chartOptions: Highcharts.Options = useMemo(() => {
        if (data) {
            return {
                chart: {
                    zooming: {
                        type: 'xy',
                    },
                },
                title: {
                    text: 'Jumlah Jam Pembelajaran per Region',
                },
                xAxis: [
                    {
                        // Use categories explicitly since we removed dataTable
                        categories: [
                            'HO',
                            'REG 1',
                            'REG 2',
                            'REG 3',
                            'REG 5',
                            'REG 7',
                            'REG 8',
                        ],
                        crosshair: true,
                    },
                ],
                yAxis: [
                    {
                        title: {
                            text: 'Jumlah Jam Pembelajaran',
                            style: {
                                color: 'var(--highcharts-color-1)',
                            },
                        },
                        labels: {
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
                        '<b>{point.y:,.0f} Jam</b>' +
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
                        name: 'Total Jam Pembelajaran',
                        type: 'column',
                        yAxis: 0,
                        data: [
                            parseInt(
                                data.find(
                                    (val) => val.region_name === 'SUPPCO HO',
                                )?.total_learning_hours ?? '0',
                            ),
                            parseInt(
                                data.find(
                                    (val) =>
                                        val.region_name === 'SUPPCO REG 01',
                                )?.total_learning_hours ?? '0',
                            ),
                            parseInt(
                                data.find(
                                    (val) =>
                                        val.region_name === 'SUPPCO REG 02',
                                )?.total_learning_hours ?? '0',
                            ),
                            parseInt(
                                data.find(
                                    (val) =>
                                        val.region_name === 'SUPPCO REG 03',
                                )?.total_learning_hours ?? '0',
                            ),
                            parseInt(
                                data.find(
                                    (val) =>
                                        val.region_name === 'SUPPCO REG 04',
                                )?.total_learning_hours ?? '0',
                            ) +
                                parseInt(
                                    data.find(
                                        (val) =>
                                            val.region_name === 'SUPPCO REG 05',
                                    )?.total_learning_hours ?? '0',
                                ),

                            parseInt(
                                data.find(
                                    (val) =>
                                        val.region_name === 'SUPPCO REG 07',
                                )?.total_learning_hours ?? '0',
                            ),
                            parseInt(
                                data.find(
                                    (val) =>
                                        val.region_name === 'SUPPCO REG 08',
                                )?.total_learning_hours ?? '0',
                            ),
                        ],
                        marker: {
                            enabled: false,
                        },
                        tooltip: {
                            valuePrefix: 'Jam ',
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
};

export default OverviewHCDevelopmentLearningHoursPerRegion;
