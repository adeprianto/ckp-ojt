import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';

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

export const description = 'A horizontal bar chart';

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
        color: 'var(--chart-1)',
    },
} satisfies ChartConfig;

export function ChartBarFormalLearningDurations() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Formal Learning Durations</CardTitle>
                <CardDescription>Januari - Desember 2026</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="min-h-96 w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            left: -20,
                        }}
                    >
                        <XAxis type="number" dataKey="desktop" hide />
                        <YAxis
                            dataKey="month"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="desktop"
                            fill="var(--color-desktop)"
                            radius={5}
                        >
                            <LabelList
                                position="insideRight"
                                offset={12}
                                className="fill-white"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            {/*<CardFooter className="flex-col items-start gap-2 text-sm">*/}
            {/*    <div className="flex gap-2 leading-none font-medium">*/}
            {/*        Trending up by 5.2% this month{' '}*/}
            {/*        <TrendingUp className="h-4 w-4" />*/}
            {/*    </div>*/}
            {/*    <div className="leading-none text-muted-foreground">*/}
            {/*        Showing total visitors for the last 6 months*/}
            {/*    </div>*/}
            {/*</CardFooter>*/}
        </Card>
    );
}
