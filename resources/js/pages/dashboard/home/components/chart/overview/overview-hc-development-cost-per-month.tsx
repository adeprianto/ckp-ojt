import { Chart } from '@highcharts/react';
import axios from 'axios';
import * as Highcharts from 'highcharts';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { REALIZATION_PER_REGIONAL, RKAP_PER_REGIONAL } from '@/lib/rkap';

Highcharts.setOptions({
    lang: {
        thousandsSep: '.',
        decimalPoint: ',',
    },
});

type OverviewRegionLearningCostPerMonth = {
    january: OverviewRegionLearningCost[];
    february: OverviewRegionLearningCost[];
    march: OverviewRegionLearningCost[];
    april: OverviewRegionLearningCost[];
    may: OverviewRegionLearningCost[];
    june: OverviewRegionLearningCost[];
    july: OverviewRegionLearningCost[];
    august: OverviewRegionLearningCost[];
    september: OverviewRegionLearningCost[];
    october: OverviewRegionLearningCost[];
    november: OverviewRegionLearningCost[];
    december: OverviewRegionLearningCost[];
};

type OverviewRegionLearningCost = {
    region_name: string;
    total_learning_hours: number;
    total_cost: number;
    total_participants: number;
};

const OverviewHCDevelopmentCostPerMonth: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [overviewRegionLearningCost, setOverviewRegionLearningCost] =
        useState<OverviewRegionLearningCostPerMonth>();

    useEffect(() => {
        const fetchOverviewData = async () => {
            setIsLoading(true);

            try {
                const response =
                    await axios.get<OverviewRegionLearningCostPerMonth>(
                        '/api/training/realization/region/month',
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

    const calculateRealization = useCallback(
        (
            overviewRegionLearningCost: OverviewRegionLearningCostPerMonth,
            region: string,
        ) => {
            const realizationData = Object.values(overviewRegionLearningCost);

            switch (region) {
                case 'ho':
                    return {
                        name: 'HO',
                        type: 'column',
                        yAxis: 0,
                        data: Object.values(REALIZATION_PER_REGIONAL).map(
                            (m, i) => {
                                const data = realizationData[i];
                                const regionData = data.find(
                                    (d) => d.region_name === 'SUPPCO HO',
                                );

                                return (
                                    (m.ho.lpp +
                                        m.ho.nonLpp +
                                        parseInt(
                                            regionData?.total_cost?.toString() ??
                                                '0',
                                        )) /
                                    1000
                                );
                            },
                        ),
                        tooltip: { valuePrefix: 'Rp. ' },
                    };
                case 'reg1':
                    return {
                        name: 'Regional 1',
                        type: 'column',
                        yAxis: 0,
                        data: Object.values(REALIZATION_PER_REGIONAL).map(
                            (m, i) => {
                                const data = realizationData[i];
                                const regionData = data.find(
                                    (d) => d.region_name === 'SUPPCO REG 01',
                                );

                                return (
                                    (m.reg1.lpp +
                                        m.reg1.nonLpp +
                                        parseInt(
                                            regionData?.total_cost?.toString() ??
                                                '0',
                                        )) /
                                    1000
                                );
                            },
                        ),
                        tooltip: { valuePrefix: 'Rp. ' },
                    };
                case 'reg2':
                    return {
                        name: 'Regional 2',
                        type: 'column',
                        yAxis: 0,
                        data: Object.values(REALIZATION_PER_REGIONAL).map(
                            (m, i) => {
                                const data = realizationData[i];
                                const regionData = data.find(
                                    (d) => d.region_name === 'SUPPCO REG 02',
                                );

                                return (
                                    (m.reg2.lpp +
                                        m.reg2.nonLpp +
                                        parseInt(
                                            regionData?.total_cost?.toString() ??
                                                '0',
                                        )) /
                                    1000
                                );
                            },
                        ),
                        tooltip: { valuePrefix: 'Rp. ' },
                    };
                case 'reg3':
                    return {
                        name: 'Regional 3',
                        type: 'column',
                        yAxis: 0,
                        data: Object.values(REALIZATION_PER_REGIONAL).map(
                            (m, i) => {
                                const data = realizationData[i];
                                const regionData = data.find(
                                    (d) => d.region_name === 'SUPPCO REG 03',
                                );

                                return (
                                    (m.reg3.lpp +
                                        m.reg3.nonLpp +
                                        parseInt(
                                            regionData?.total_cost?.toString() ??
                                                '0',
                                        )) /
                                    1000
                                );
                            },
                        ),
                        tooltip: { valuePrefix: 'Rp. ' },
                    };
                case 'reg5':
                    return {
                        name: 'Regional 5',
                        type: 'column',
                        yAxis: 0,
                        data: Object.values(REALIZATION_PER_REGIONAL).map(
                            (m, i) => {
                                const data = realizationData[i];
                                const regionData4 = data.find(
                                    (d) => d.region_name === 'SUPPCO REG 04',
                                );
                                const regionData5 = data.find(
                                    (d) => d.region_name === 'SUPPCO REG 05',
                                );

                                return (
                                    (m.reg5.lpp +
                                        m.reg5.nonLpp +
                                        parseInt(
                                            regionData4?.total_cost?.toString() ??
                                                '0',
                                        ) +
                                        parseInt(
                                            regionData5?.total_cost?.toString() ??
                                                '0',
                                        )) /
                                    1000
                                );
                            },
                        ),
                        tooltip: { valuePrefix: 'Rp. ' },
                    };
                case 'reg7':
                    return {
                        name: 'Regional 7',
                        type: 'column',
                        yAxis: 0,
                        data: Object.values(REALIZATION_PER_REGIONAL).map(
                            (m, i) => {
                                const data = realizationData[i];
                                const regionData = data.find(
                                    (d) => d.region_name === 'SUPPCO REG 07',
                                );

                                return (
                                    (m.reg7.lpp +
                                        m.reg7.nonLpp +
                                        parseInt(
                                            regionData?.total_cost?.toString() ??
                                                '0',
                                        )) /
                                    1000
                                );
                            },
                        ),
                        tooltip: { valuePrefix: 'Rp. ' },
                    };
                case 'reg8':
                    return {
                        name: 'Regional 8',
                        type: 'column',
                        yAxis: 0,
                        data: Object.values(REALIZATION_PER_REGIONAL).map(
                            (m, i) => {
                                const data = realizationData[i];
                                const regionData = data.find(
                                    (d) => d.region_name === 'SUPPCO REG 08',
                                );

                                return (
                                    (m.reg8.lpp +
                                        m.reg8.nonLpp +
                                        parseInt(
                                            regionData?.total_cost?.toString() ??
                                                '0',
                                        )) /
                                    1000
                                );
                            },
                        ),
                        tooltip: { valuePrefix: 'Rp. ' },
                    };
                default:
                    return {
                        name: 'Total Realisasi',
                        type: 'spline',
                        yAxis: 0,
                        data: Object.values(REALIZATION_PER_REGIONAL).map(
                            (monthData, i) => {
                                const realSystem = realizationData[i].reduce(
                                    (total, data) =>
                                        total +
                                        parseInt(
                                            data.total_cost?.toString() ?? '0',
                                        ) /
                                            1000,
                                    0,
                                );
                                const realLink = Object.values(
                                    monthData,
                                ).reduce((total, regionalData) => {
                                    return (
                                        total +
                                        regionalData.lpp / 1000 +
                                        regionalData.nonLpp / 1000
                                    );
                                }, 0);

                                return realSystem + realLink;
                            },
                        ),
                        tooltip: {
                            valuePrefix: 'Rp. ',
                        },
                    };
            }
        },
        [],
    );

    const chartOptions: Highcharts.Options = useMemo(() => {
        if (overviewRegionLearningCost) {
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
                        data: Object.values(RKAP_PER_REGIONAL).map(
                            (monthData) => {
                                return Object.values(monthData).reduce(
                                    (total, regionalData) => {
                                        return total + regionalData.rkap / 1000;
                                    },
                                    0,
                                );
                            },
                        ),
                        marker: {
                            enabled: false,
                        },
                        tooltip: {
                            valuePrefix: 'Rp. ',
                        },
                    },

                    // --- STACKED BARS PER REGION ---
                    calculateRealization(overviewRegionLearningCost, 'ho'),
                    calculateRealization(overviewRegionLearningCost, 'reg1'),
                    calculateRealization(overviewRegionLearningCost, 'reg2'),
                    calculateRealization(overviewRegionLearningCost, 'reg3'),
                    calculateRealization(overviewRegionLearningCost, 'reg5'),
                    calculateRealization(overviewRegionLearningCost, 'reg7'),
                    calculateRealization(overviewRegionLearningCost, 'reg8'),

                    // --- TREND LINES ---
                    calculateRealization(overviewRegionLearningCost, 'total'),
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
    }, [calculateRealization, overviewRegionLearningCost]);

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

export default OverviewHCDevelopmentCostPerMonth;
