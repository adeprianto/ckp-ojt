import { Chart } from '@highcharts/react';
import axios from 'axios';
import type * as Highcharts from 'highcharts';
import React, { useEffect, useMemo, useState } from 'react';

type RealizationLppNonLpp = {
    is_ptpn_group: boolean;
    total_cost: string;
};

type ChartData = {
    name: string;
    y: number; // The raw value (Highcharts will calculate the %)
};

export default function OverviewHCDevelopmentCostLppNonLpp() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<RealizationLppNonLpp[]>();

    useEffect(() => {
        const fetchOverviewData = async () => {
            setIsLoading(true);

            try {
                const response = await axios.get<RealizationLppNonLpp[]>(
                    '/api/training/realization/ptpn-group',
                );
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
        if (data && data.length > 0) {
            const lppCost = parseInt(
                data.find((i) => i.is_ptpn_group)?.total_cost ?? '0',
            );

            const nonLppCost = parseInt(
                data.find((i) => !i.is_ptpn_group)?.total_cost ?? '0',
            );

            const mData: ChartData[] = [
                {
                    name: 'LPP',
                    y:
                        nonLppCost > 0
                            ? (lppCost / (lppCost + nonLppCost)) * 100
                            : 100,
                },
                {
                    name: 'Non LPP',
                    y:
                        nonLppCost > 0
                            ? (nonLppCost / (lppCost + nonLppCost)) * 100
                            : 0,
                },
            ];

            return {
                chart: {
                    type: 'pie',
                },
                title: {
                    text: undefined,
                },
                tooltip: {
                    // Format the tooltip to show the percentage with 1 decimal place
                    pointFormat:
                        '{series.name}: <b>{point.percentage:.1f}%</b>',
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
                        data: mData,
                    },
                ],
            };
        }

        return {};
    }, [data]);

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
