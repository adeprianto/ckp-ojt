import { Chart } from '@highcharts/react';
import * as Highcharts from 'highcharts';

import React from 'react';
import { REALIZATION_PER_REGIONAL, RKAP_PER_REGIONAL } from '@/lib/rkap';

Highcharts.setOptions({
    lang: {
        thousandsSep: '.',
        decimalPoint: ',',
    },
});

const chartOptions: Highcharts.Options = {
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
                text: 'Biaya',
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
        valueDecimals: 0,
    },
    legend: {
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
        {
            name: 'Total Realisasi',
            type: 'spline',
            yAxis: 0,
            data: Object.values(REALIZATION_PER_REGIONAL).map((monthData) => {
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
            }),
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

const OverviewHCDevelopmentCost: React.FC = () => {
    // 2. Strongly type your configuration object using Highcharts.Options


    // 3. Render using the new JSX-native <Chart /> component
    return (
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
