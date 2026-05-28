import { Head } from '@inertiajs/react';
import { Banknote, Hourglass, User } from 'lucide-react';
import Heading from '@/components/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import {
    ChartBarExperientalLearningDurations
} from '@/pages/dashboard/components/chart-bar-experiental-learning-durations';
import { ChartBarFormalLearningDurations } from '@/pages/dashboard/components/chart-bar-formal-learning-durations';
import { ChartBarSocialLearningDurations } from '@/pages/dashboard/components/chart-bar-social-learning-durations';
import { ChartBarLabelTotalLearningDurations } from '@/pages/dashboard/components/chart-bar-total-learning-durations';
import { RadialBarExpenses } from '@/pages/dashboard/components/radial-bar-expenses';
import { RadialBarLearningHours } from '@/pages/dashboard/components/radial-bar-learning-hours';
import { RadialBarParticipants } from '@/pages/dashboard/components/radial-bar-participants';
import { dashboard } from '@/routes';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    ChartBarLabelTotalLearningDurationsByBod
} from '@/pages/dashboard/components/chart-bar-total-learning-durations-by-bod';
import {
    ChartBarLabelTotalLearningDurationsByDivision
} from '@/pages/dashboard/components/chart-bar-total-learning-durations-by-division';
import { ChartLineTotalLearningDurations } from '@/pages/dashboard/components/chart-line-total-learning-durations';

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
                <div className="grid gap-4 sm:grid-cols-3">
                    <Card>
                        <CardHeader className="mb-0 flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-sm font-medium">
                                Realisasi Biaya
                            </CardTitle>
                            <Banknote className="text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="mt-0">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold">
                                        Rp. 1.250.000.000
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        20% terhadap RKAP bulan ini
                                    </p>
                                </div>
                                <div>
                                    <RadialBarExpenses />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="mb-0 flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-sm font-medium">
                                Realisasi Jam Pembelajaran
                            </CardTitle>
                            <Hourglass className="text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="mt-0">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold">
                                        120 Jam
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        20% terhadap RKAP bulan ini
                                    </p>
                                </div>
                                <div>
                                    <RadialBarLearningHours />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="mb-0 flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-sm font-medium">
                                Realisasi Jumlah Peserta
                            </CardTitle>
                            <User className="text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="mt-0">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold">
                                        150 Peserta
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        20% terhadap RKAP bulan ini
                                    </p>
                                </div>
                                <div>
                                    <RadialBarParticipants />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
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
            href: dashboard(),
        },
    ],
};
