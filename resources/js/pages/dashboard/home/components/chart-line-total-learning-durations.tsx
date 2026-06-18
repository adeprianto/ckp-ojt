'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent

} from '@/components/ui/chart';
import type {ChartConfig} from '@/components/ui/chart';

export const description = 'A line chart with a label';

const chartData = [
    { month: 'Januari', desktop: 186 },
    { month: 'Februari', desktop: 305 },
    { month: 'Maret', desktop: 237 },
    { month: 'April', desktop: 73 },
    { month: 'Mei', desktop: 209 },
    { month: 'Juni', desktop: 214 },
    { month: 'Juli', desktop: 186 },
    { month: 'Agustus', desktop: 305 },
    { month: 'September', desktop: 237 },
    { month: 'Oktober', desktop: 73 },
    { month: 'November', desktop: 209 },
    { month: 'Desember', desktop: 214 },
];

const chartConfig = {
    desktop: {
        label: 'JPL',
        color: 'var(--chart-2)',
    },
} satisfies ChartConfig;

export function ChartLineTotalLearningDurations() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Durasi Jam Pembelajaran</CardTitle>
                <CardDescription>Januari - Desember 2026</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="max-h-96 w-full"
                >
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Line
                            dataKey="desktop"
                            type="natural"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={{
                                fill: 'var(--color-desktop)',
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
