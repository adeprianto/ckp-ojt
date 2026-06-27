import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewHCDevelopmentIndex from '@/pages/dashboard/home/components/chart/overview/overview-hc-development-index';
import RegionHCDevelopmentIndex from '@/pages/dashboard/home/components/chart/region/region-hc-development-index';
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
                <span className="text-lg font-bold">
                    Overview Konsolidasi Pengembangan SDM PTPN I (Persero)
                </span>
                <OverviewHCDevelopmentIndex />
                <Tabs
                    defaultValue="overview"
                    className="w-[400px]"
                    value="ho"
                    onValueChange={(value) => console.log(value)}
                >
                    <TabsList>
                        <TabsTrigger value="ho">Head Office</TabsTrigger>
                        <TabsTrigger value="regional-1">Regional 1</TabsTrigger>
                        <TabsTrigger value="regional-2">Regional 2</TabsTrigger>
                        <TabsTrigger value="regional-3">Regional 3</TabsTrigger>
                        <TabsTrigger value="regional-5">Regional 5</TabsTrigger>
                        <TabsTrigger value="regional-7">Regional 7</TabsTrigger>
                        <TabsTrigger value="regional-8">Regional 8</TabsTrigger>
                    </TabsList>
                </Tabs>
                <span className="text-lg font-bold">
                    Overview Pengembangan SDM PTPN I (Persero) Regional
                </span>
                <RegionHCDevelopmentIndex />
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
