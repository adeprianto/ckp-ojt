import { Chart } from '@highcharts/react';
import axios from 'axios';
import type * as Highcharts from 'highcharts';
import React, { useEffect, useMemo, useState } from 'react';
import { REALIZATION_PER_REGIONAL, RKAP_PER_REGIONAL } from '@/lib/rkap';

interface ChartData {
    name: string;
    y: number; // The raw value (Highcharts will calculate the %)
}

const data: ChartData[] = [
    { name: 'LPP', y: 65.1 },
    { name: 'Non. LPP', y: 100 - 65.1 },
];

export default function RegionHcDevelopmentCostLppNonLpp() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchOverviewData = async () => {
            setIsLoading(true);

            try {
                // const response = await axios.get<OverviewRegionLearningCost[]>(
                //     '/api/training/realization/region',
                // );
                // setOverviewRegionLearningCost(response.data);
                setIsLoading(false);
            } catch (e) {
                console.error(e);
                setIsLoading(false);
            }
        };

        // fetchOverviewData();
    }, []);

    const chartOptions: Highcharts.Options = useMemo(() => {
        return {
            chart: {
                type: 'pie',
            },
            title: {
                text: undefined,
            },
            tooltip: {
                // Format the tooltip to show the percentage with 1 decimal place
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
            },
            plotOptions: {
                pie: {
                    // THIS IS THE MAGIC PROPERTY THAT MAKES IT A DONUT
                    innerSize: '75%',
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        // Display the name and the auto-calculated percentage
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        distance: 0, // Distance of labels from the chart
                    },
                },
            },
            series: [
                {
                    type: 'pie',
                    name: 'Market Share',
                    data: data,
                },
            ],
        };
    }, []);

    // 3. Render using the new JSX-native <Chart /> component
    return isLoading ? (
        <div>Loading ...</div>
    ) : (
        <div
            className="highcharts-light"
            style={{ width: '100%', height: '100%' }}
        >
            <Chart
                options={chartOptions as any}
                containerProps={{
                    style: {
                        maxHeight: '200px',
                        height: '100%', // Optional: Allows it to fill a larger parent container
                        width: '100%',
                    },
                }}
            />
        </div>
    );
}
