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

// const chartOptions: Highcharts.Options = {
//     chart: {
//         zooming: {
//             type: 'xy',
//         },
//     },
//     title: {
//         text: 'Overview Pengembangan Biaya SDM (Rp. 000)',
//     },
//     xAxis: [
//         {
//             // Use categories explicitly since we removed dataTable
//             categories: [
//                 'Jan',
//                 'Feb',
//                 'Mar',
//                 'Apr',
//                 'Mei',
//                 'Jun',
//                 'Jul',
//                 'Agu',
//                 'Sep',
//                 'Okt',
//                 'Nov',
//                 'Des',
//             ],
//             crosshair: true,
//         },
//     ],
//     yAxis: [
//         {
//             title: {
//                 text: 'Biaya (Rp. 000)',
//                 style: {
//                     color: 'var(--highcharts-color-1)',
//                 },
//             },
//             labels: {
//                 format: '{value:,.0f}',
//                 style: {
//                     color: 'var(--highcharts-color-1)',
//                 },
//             },
//         },
//     ],
//     tooltip: {
//         shared: true,
//         useHTML: true, // This is the magic flag that lets us use custom CSS and HTML
//
//         // --- 1. Outer Box Styling ---
//         backgroundColor: 'rgba(255, 255, 255, 0.95)', // Use 'rgba(30,30,30, 0.9)' for a dark theme
//         borderColor: '#e6e6e6',
//         borderWidth: 1,
//         borderRadius: 8, // Gives it nice rounded corners
//         padding: 12, // Gives the text room to breathe
//         shadow: true,
//         style: {
//             color: '#333333', // Font color (use '#ffffff' for dark theme)
//             fontFamily: 'sans-serif',
//             fontSize: '13px',
//         },
//
//         // --- 2. Title (Header) ---
//         // Adds a bold title with a subtle line underneath
//         headerFormat:
//             '<div style="font-size: 10px; font-weight: bold; border-bottom: 1px solid #eeeeee; padding-bottom: 6px; margin-bottom: 6px;">{point.key}</div><table style="width: 100%;">',
//
//         // --- 3. Body (The Data Rows) ---
//         // Uses a table to perfectly align the series name on the left and the value on the right
//         pointFormat:
//             '<tr>' +
//             '<td style="padding: 3px 15px 3px 0; font-size: 10px">' +
//             '<span style="color:{series.color}; font-size: 10px;">\u25CF</span> {series.name}:' +
//             '</td>' +
//             '<td style="padding: 3px 0; text-align: right; font-size: 10px">' +
//             '<b>Rp. {point.y:,.0f}</b>' +
//             '</td>' +
//             '</tr>',
//
//         // --- 4. Footer ---
//         footerFormat: '</table>',
//         valueDecimals: 0,
//     },
//     legend: {
//         enabled: false,
//         layout: 'vertical',
//         align: 'left',
//         x: 130,
//         verticalAlign: 'top',
//         y: 55,
//         floating: true,
//         backgroundColor: `color-mix(
//                 var(--highcharts-neutral-color-40) 25%,
//                 transparent
//             )`,
//     },
//     plotOptions: {
//         // Enable stacking for the column charts
//         column: {
//             stacking: 'normal',
//         },
//     },
//     series: [
//         // --- TREND LINES ---
//         {
//             name: 'RKAP',
//             type: 'spline',
//             yAxis: 0,
//             data: Object.values(RKAP_PER_REGIONAL).map((monthData) => {
//                 return Object.values(monthData).reduce(
//                     (total, regionalData) => {
//                         return total + regionalData.rkap / 1000;
//                     },
//                     0,
//                 );
//             }),
//             marker: {
//                 enabled: false,
//             },
//             tooltip: {
//                 valuePrefix: 'Rp. ',
//             },
//         },
//
//         // --- STACKED BARS PER REGION ---
//         {
//             name: 'HO',
//             type: 'column',
//             yAxis: 0,
//             data: Object.values(REALIZATION_PER_REGIONAL).map(
//                 (m) => (m.ho.lpp + m.ho.nonLpp) / 1000,
//             ),
//             tooltip: { valuePrefix: 'Rp. ' },
//         },
//         {
//             name: 'Regional 1',
//             type: 'column',
//             yAxis: 0,
//             data: Object.values(REALIZATION_PER_REGIONAL).map(
//                 (m) => (m.reg1.lpp + m.reg1.nonLpp) / 1000,
//             ),
//             tooltip: { valuePrefix: 'Rp. ' },
//         },
//         {
//             name: 'Regional 2',
//             type: 'column',
//             yAxis: 0,
//             data: Object.values(REALIZATION_PER_REGIONAL).map(
//                 (m) => (m.reg2.lpp + m.reg2.nonLpp) / 1000,
//             ),
//             tooltip: { valuePrefix: 'Rp. ' },
//         },
//         {
//             name: 'Regional 3',
//             type: 'column',
//             yAxis: 0,
//             data: Object.values(REALIZATION_PER_REGIONAL).map(
//                 (m) => (m.reg3.lpp + m.reg3.nonLpp) / 1000,
//             ),
//             tooltip: { valuePrefix: 'Rp. ' },
//         },
//         {
//             name: 'Regional 5',
//             type: 'column',
//             yAxis: 0,
//             data: Object.values(REALIZATION_PER_REGIONAL).map(
//                 (m) => (m.reg5.lpp + m.reg5.nonLpp) / 1000,
//             ),
//             tooltip: { valuePrefix: 'Rp. ' },
//         },
//         {
//             name: 'Regional 7',
//             type: 'column',
//             yAxis: 0,
//             data: Object.values(REALIZATION_PER_REGIONAL).map(
//                 (m) => (m.reg7.lpp + m.reg7.nonLpp) / 1000,
//             ),
//             tooltip: { valuePrefix: 'Rp. ' },
//         },
//         {
//             name: 'Regional 8',
//             type: 'column',
//             yAxis: 0,
//             data: Object.values(REALIZATION_PER_REGIONAL).map(
//                 (m) => (m.reg8.lpp + m.reg8.nonLpp) / 1000,
//             ),
//             tooltip: { valuePrefix: 'Rp. ' },
//         },
//
//         // --- TREND LINES ---
//         {
//             name: 'Total Realisasi',
//             type: 'spline',
//             yAxis: 0,
//             data: Object.values(REALIZATION_PER_REGIONAL).map((monthData) => {
//                 return Object.values(monthData).reduce(
//                     (total, regionalData) => {
//                         return (
//                             total +
//                             regionalData.lpp / 1000 +
//                             regionalData.nonLpp / 1000
//                         );
//                     },
//                     0,
//                 );
//             }),
//             tooltip: {
//                 valuePrefix: 'Rp. ',
//             },
//         },
//     ],
//     responsive: {
//         rules: [
//             {
//                 condition: {
//                     maxWidth: 500,
//                 },
//                 chartOptions: {
//                     legend: {
//                         enabled: false,
//                         floating: false,
//                         layout: 'horizontal',
//                         align: 'center',
//                         verticalAlign: 'bottom',
//                         x: 0,
//                         y: 0,
//                     },
//                     yAxis: [
//                         {
//                             labels: {
//                                 align: 'right',
//                                 x: 0,
//                                 y: -6,
//                             },
//                             showLastLabel: false,
//                         },
//                     ],
//                 },
//             },
//         ],
//     },
// };

type OverviewRegionLearningCost = {
    region_name: string;
    total_learning_hours: number;
    total_cost: number;
    total_participants: number;
};

const OverviewHCDevelopmentCost: React.FC = () => {
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

    const chartOptions: Highcharts.Options = useMemo(() => {
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
                    categories: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'Mei',
                        'Jun',
                        'Jul',
                        'Agu',
                        'Sep',
                        'Okt',
                        'Nov',
                        'Des',
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
                column: {
                    stacking: 'normal',
                },
            },
            series: [
                // --- TREND LINES ---
                {
                    name: 'RKAP',
                    type: 'spline',
                    yAxis: 0,
                    data: Object.values(RKAP_PER_REGIONAL).map((monthData) => {
                        return Object.values(monthData).reduce(
                            (total, regionalData) => {
                                return total + regionalData.rkap / 1000;
                            },
                            0,
                        );
                    }),
                    marker: {
                        enabled: false,
                    },
                    tooltip: {
                        valuePrefix: 'Rp. ',
                    },
                },

                // --- STACKED BARS PER REGION ---
                {
                    name: 'HO',
                    type: 'column',
                    yAxis: 0,
                    data: Object.values(REALIZATION_PER_REGIONAL).map(
                        (m) => (m.ho.lpp + m.ho.nonLpp) / 1000,
                    ),
                    tooltip: { valuePrefix: 'Rp. ' },
                },
                {
                    name: 'Regional 1',
                    type: 'column',
                    yAxis: 0,
                    data: Object.values(REALIZATION_PER_REGIONAL).map(
                        (m) => (m.reg1.lpp + m.reg1.nonLpp) / 1000,
                    ),
                    tooltip: { valuePrefix: 'Rp. ' },
                },
                {
                    name: 'Regional 2',
                    type: 'column',
                    yAxis: 0,
                    data: Object.values(REALIZATION_PER_REGIONAL).map(
                        (m) => (m.reg2.lpp + m.reg2.nonLpp) / 1000,
                    ),
                    tooltip: { valuePrefix: 'Rp. ' },
                },
                {
                    name: 'Regional 3',
                    type: 'column',
                    yAxis: 0,
                    data: Object.values(REALIZATION_PER_REGIONAL).map(
                        (m) => (m.reg3.lpp + m.reg3.nonLpp) / 1000,
                    ),
                    tooltip: { valuePrefix: 'Rp. ' },
                },
                {
                    name: 'Regional 5',
                    type: 'column',
                    yAxis: 0,
                    data: Object.values(REALIZATION_PER_REGIONAL).map(
                        (m) => (m.reg5.lpp + m.reg5.nonLpp) / 1000,
                    ),
                    tooltip: { valuePrefix: 'Rp. ' },
                },
                {
                    name: 'Regional 7',
                    type: 'column',
                    yAxis: 0,
                    data: Object.values(REALIZATION_PER_REGIONAL).map(
                        (m) => (m.reg7.lpp + m.reg7.nonLpp) / 1000,
                    ),
                    tooltip: { valuePrefix: 'Rp. ' },
                },
                {
                    name: 'Regional 8',
                    type: 'column',
                    yAxis: 0,
                    data: Object.values(REALIZATION_PER_REGIONAL).map(
                        (m) => (m.reg8.lpp + m.reg8.nonLpp) / 1000,
                    ),
                    tooltip: { valuePrefix: 'Rp. ' },
                },

                // --- TREND LINES ---
                {
                    name: 'Total Realisasi',
                    type: 'spline',
                    yAxis: 0,
                    data: Object.values(REALIZATION_PER_REGIONAL).map(
                        (monthData) => {
                            return Object.values(monthData).reduce(
                                (total, regionalData) => {
                                    return (
                                        total +
                                        regionalData.lpp / 1000 +
                                        regionalData.nonLpp / 1000
                                    );
                                },
                                0,
                            );
                        },
                    ),
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
    }, [])

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

export default OverviewHCDevelopmentCost;
