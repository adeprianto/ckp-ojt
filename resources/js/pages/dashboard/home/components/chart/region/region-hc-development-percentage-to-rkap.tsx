import { Chart } from '@highcharts/react';
import axios from 'axios';
import type * as Highcharts from 'highcharts';
import React, { useEffect, useMemo, useState } from 'react';

type RegionHcDevelopmentPercentageToRkapProp = {
    fullYear: boolean;
};

export default function RegionHcDevelopmentPercentageToRkap({
    fullYear,
}: RegionHcDevelopmentPercentageToRkapProp) {
    const [isLoading, setIsLoading] = useState(false);

    const chartOptions: Highcharts.Options = useMemo(() => {
        const progressValue = 90;
        const remainderValue = 100 - progressValue;

        return {
            chart: {
                type: 'pie',
                // Optional: make the chart background transparent
                backgroundColor: 'transparent',
            },
            title: {
                // Center the percentage text inside the donut hole
                text: `${progressValue}%`,
                align: 'center',
                verticalAlign: 'middle',
                // Adjust Y slightly to perfectly center the text vertically
                y: 15,
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#333333',
                },
            },
            tooltip: {
                enabled: false, // Usually, progress bars don't need tooltips
            },
            plotOptions: {
                pie: {
                    // Make the ring thinner for a standard progress bar look
                    innerSize: '80%',
                    borderWidth: 0, // Remove the border between slices
                    dataLabels: {
                        enabled: false, // Hide standard external data labels
                    },
                    // Optional: round the edges of the progress bar (requires Highcharts v9+)
                    borderRadius: 5,
                },
            },
            series: [
                {
                    type: 'pie',
                    name: 'Progress',
                    // Disable hover animations for the whole series to make it feel like a static UI element
                    states: {
                        hover: { enabled: false },
                    },
                    data: [
                        {
                            name: 'Completed',
                            y: progressValue,
                            color: '#007BFF', // Your primary progress color (e.g., blue)
                        },
                        {
                            name: 'Remaining',
                            y: remainderValue,
                            color: '#E9ECEF', // A faint gray color to act as the "empty" track
                            enableMouseTracking: false, // Prevents the user from interacting with the empty space
                        },
                    ],
                },
            ],
        };
    }, []);

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

        fetchOverviewData();
    }, []);

    return isLoading ? (
        <div>Loading ...</div>
    ) : (
        <div className="highcharts-light" style={{ height: '100%' }}>
            <Chart
                options={chartOptions as any}
                containerProps={{
                    style: {
                        maxHeight: '200px',
                        height: '100%',
                    },
                }}
            />
        </div>
    );
}
