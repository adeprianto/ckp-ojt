import { Head } from '@inertiajs/react';
import Highcharts from 'highcharts';
import { Banknote, Hourglass, User } from 'lucide-react';
import Heading from '@/components/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartBarExperientalLearningDurations } from '@/pages/dashboard/home/components/chart-bar-experiental-learning-durations';
import { ChartBarFormalLearningDurations } from '@/pages/dashboard/home/components/chart-bar-formal-learning-durations';
import { ChartBarSocialLearningDurations } from '@/pages/dashboard/home/components/chart-bar-social-learning-durations';
import { ChartBarLabelTotalLearningDurationsByBod } from '@/pages/dashboard/home/components/chart-bar-total-learning-durations-by-bod';
import { ChartBarLabelTotalLearningDurationsByDivision } from '@/pages/dashboard/home/components/chart-bar-total-learning-durations-by-division';
import { ChartLineTotalLearningDurations } from '@/pages/dashboard/home/components/chart-line-total-learning-durations';
import OverviewCostByDivision from '@/pages/dashboard/home/components/overview/overview-cost-by-division';
import OverviewHCDevelopmentCost from '@/pages/dashboard/home/components/overview/overview-hc-development-cost-chart';
import { home as dashboardHome } from '@/routes/dashboard';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-x-4 gap-y-8 overflow-x-auto rounded-xl p-4">
                <Heading
                    title="Agrow Track"
                    className="mb-0"
                    description="Sistem Monitoring Pengembangan SDM PTPN I"
                />
                <div>
                    <OverviewHCDevelopmentCost />
                </div>
                <Tabs defaultValue="overview" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="ho">Head Office</TabsTrigger>
                        <TabsTrigger value="regional-1">Regional 1</TabsTrigger>
                        <TabsTrigger value="regional-2">Regional 2</TabsTrigger>
                        <TabsTrigger value="regional-3">Regional 3</TabsTrigger>
                        <TabsTrigger value="regional-5">Regional 5</TabsTrigger>
                        <TabsTrigger value="regional-7">Regional 7</TabsTrigger>
                        <TabsTrigger value="regional-8">Regional 8</TabsTrigger>
                    </TabsList>
                </Tabs>
                <div>
                    <OverviewHCDevelopmentCost />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="col-span-2 overflow-hidden rounded-sm border-[1.5px]">
                        <OverviewCostByDivision />
                    </div>
                    <div className="col-span-1">
                        <div>Test</div>
                    </div>
                </div>
                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <ChartLineTotalLearningDurations />
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <ChartBarExperientalLearningDurations />
                    </div>
                    <div className="relative rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <ChartBarSocialLearningDurations />
                    </div>
                    <div className="relative rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <ChartBarFormalLearningDurations />
                    </div>
                </div>
                <div className="relative rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <ChartBarLabelTotalLearningDurationsByBod />
                </div>
                <div className="relative rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <ChartBarLabelTotalLearningDurationsByDivision />
                </div>
                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboardHome(),
        },
    ],
};
