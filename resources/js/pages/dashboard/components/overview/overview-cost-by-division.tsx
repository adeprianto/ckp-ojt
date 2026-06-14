import { Chart } from '@highcharts/react';
import { COST_PER_HO_DIVISIONS, HO_DIVISIONS } from '@/lib/divisions';

const chartOptions: Highcharts.Options = {
    chart: {
        type: 'bar',
        height: HO_DIVISIONS.length * 40 + 100,
    },
    title: {
        text: 'Biaya per Divisi',
    },
    xAxis: {
        categories: HO_DIVISIONS,
        title: {
            text: null,
        },
        gridLineWidth: 1,
        lineWidth: 0,
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Biaya per Divisi',
            align: 'high',
        },
        labels: {
            overflow: 'justify',
        },
        gridLineWidth: 0,
    },
    tooltip: {
        headerFormat: `<div style="display: flex">
                <div>
                    <svg width="10" height="30">
                        <path d="M 1.5 1.5 L 1.5 28.5" stroke="{series.color}"
                            stroke-width="3" stroke-linecap="round" />
                    </svg>
                </div>
                <div>
                    <div class="highcharts-header">
                        {point.key}
                    </div>`,
        pointFormat: `<span style="color: var(--highcharts-neutral-color-40)">
                    {series.name}
                </span>
                <b style="padding-left: 0.5em">{point.y}</b>`,
        footerFormat: '</div>',
        useHTML: true,
        valuePrefix: 'Rp. ',
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -0,
        y: 0,
        floating: true,
        borderColor: 'var(--highcharts-neutral-color-10, #e6e6e6)',
        borderRadius: 4,
        borderWidth: 1,
        backgroundColor: 'var(--highcharts-background-color, #ffffff)',
    },
    credits: {
        enabled: false,
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true,
                formatter: function () {
                    // 1. Check if the value exists to keep TypeScript happy
                    if (this.y === undefined || this.y === null) {
                        return '';
                    }

                    // 2. Divide by 1000
                    const scaledValue = this.y / 1000;

                    // 4. Return the new value with comma formatting
                    return `Rp. ${scaledValue.toLocaleString('id-ID')}`;
                },
                // Optional: styling to make it bold and match your screenshot
                style: {
                    fontWeight: 'bold',
                    color: '#000000',
                    textOutline: 'none', // Removes the white glowing border Highcharts adds by default
                },
            },
            groupPadding: 0.1,
        },
    },
    series: [
        {
            type: 'bar', // Explicitly declaring the type here is good practice in TS
            name: 'Biaya (Rp. 000)',
            data: COST_PER_HO_DIVISIONS.map(({ amount }) => amount),
            label: {
                format: 'Rp. {value}',
            },
        },
    ],
};

export default function OverviewCostByDivision() {
    return (
        <div
            className="highcharts-light w-full h-full"
        >
            {/* Using the JSX-native Chart component */}
            <Chart options={chartOptions as any} />
        </div>
    );
}
