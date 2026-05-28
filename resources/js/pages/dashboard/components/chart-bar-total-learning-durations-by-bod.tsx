import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

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

export const description = 'A bar chart with a label';

const chartData = [
    { month: 'BOD', desktop: 186 },
    { month: 'BOD-1', desktop: 305 },
    { month: 'BOD-2', desktop: 237 },
    { month: 'BOD-3', desktop: 73 },
    { month: 'BOD-4', desktop: 209 },
    { month: 'BOD-5', desktop: 214 },
    { month: 'BOD-6', desktop: 186 },
];

const chartConfig = {
    desktop: {
        label: 'JPL',
        color: 'var(--chart-1)',
    },
} satisfies ChartConfig;

export function ChartBarLabelTotalLearningDurationsByBod() {
    return (
        <Card className="shadow-none">
            <CardHeader>
                <CardTitle>Durasi Jam Pembelajaran per BOD</CardTitle>
                <CardDescription>Januari - Desember 2026</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="max-h-96 w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="desktop"
                            fill="var(--color-desktop)"
                            radius={8}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
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
