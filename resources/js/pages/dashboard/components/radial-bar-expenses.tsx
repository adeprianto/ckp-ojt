'use client';

import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from 'recharts';

import { ChartContainer  } from '@/components/ui/chart';
import type {ChartConfig} from '@/components/ui/chart';

const chartData = [
    { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
];

const chartConfig = {
    visitors: {
        label: 'Visitors',
    },
    safari: {
        label: 'Safari',
        color: 'var(--chart-2)',
    },
} satisfies ChartConfig;

export function RadialBarExpenses() {
    return (
        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-28"
        >
            <RadialBarChart
                data={chartData}
                startAngle={90}
                endAngle={-234}
                outerRadius={50}
                innerRadius={40}
            >
                <PolarGrid
                    gridType="circle"
                    radialLines={false}
                    stroke="none"
                    className="first:fill-muted last:fill-background"
                    polarRadius={[50, 40]}
                />
                <RadialBar dataKey="visitors" background cornerRadius={10} />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy - 6}
                                            className="fill-foreground text-xl font-bold"
                                        >
                                            90%
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 14}
                                            className="fill-muted-foreground"
                                        >
                                            Realisasi
                                        </tspan>
                                    </text>
                                );
                            }
                        }}
                    />
                </PolarRadiusAxis>
            </RadialBarChart>
        </ChartContainer>
    );
}
