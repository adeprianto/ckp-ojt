import { Chart } from '@highcharts/react';
import type { ChartOptions } from '@highcharts/react';
import { ColumnSeries } from '@highcharts/react/series/Column';
import React from 'react';

interface ColumnChartProps {
    title?: string;
}

const DevelopmentCostChart: React.FC<ColumnChartProps> = ({
    title = 'Training & Development Costs',
}) => {
    // Base configuration for axes, tooltips, and general layout
    const options: ChartOptions = {
        chart: {
            backgroundColor: '#ffffff',
        },
        xAxis: {
            categories: [
                'Human Resources',
                'Information Technology',
                'General Affairs',
                'Operational Field',
                'Finance',
            ],
            crosshair: true,
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Cost (IDR / Millions)',
            },
            labels: {
                format: 'Rp {value}M',
            },
        },
        tooltip: {
            shared: true,
            valuePrefix: 'Rp ',
            valueSuffix: ' Million',
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                borderRadius: 4,
            },
        },
        credits: {
            enabled: false,
        },
    };

    return (
        <div
            style={{
                padding: '1.5rem',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
            }}
        >
            {/* The Chart component now directly accepts high-level properties
        like title and subtitle natively as props.
      */}
            <Chart
                title={title}
                subtitle="Comparison: Budget vs. Actual Expenditures"
                options={options}
            >
                {/* Series are now rendered as cleanly typed child components */}
                <ColumnSeries
                    name="Allocated Budget"
                    data={[120, 180, 90, 250, 110]}
                    color="#4f46e5"
                />
                <ColumnSeries
                    name="Actual Spending"
                    data={[115, 195, 85, 240, 110]}
                    color="#06b6d4"
                />
            </Chart>
        </div>
    );
};

export default DevelopmentCostChart;
