import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Heading from '@/components/heading';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewHCDevelopmentIndex from '@/pages/dashboard/home/components/chart/overview/overview-hc-development-index';
import RegionHCDevelopmentIndex from '@/pages/dashboard/home/components/chart/region/region-hc-development-index';
import { home as dashboardHome } from '@/routes/dashboard';

export default function Dashboard() {
    const [selectedRegion, setSelectedRegion] = useState(1);

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
                    value={selectedRegion.toString()}
                    onValueChange={(value) =>
                        setSelectedRegion(parseInt(value))
                    }
                >
                    <TabsList>
                        <TabsTrigger value="1">Head Office</TabsTrigger>
                        <TabsTrigger value="2">Regional 1</TabsTrigger>
                        <TabsTrigger value="3">Regional 2</TabsTrigger>
                        <TabsTrigger value="4">Regional 3</TabsTrigger>
                        <TabsTrigger value="5">Regional 5</TabsTrigger>
                        <TabsTrigger value="6">Regional 7</TabsTrigger>
                        <TabsTrigger value="7">Regional 8</TabsTrigger>
                    </TabsList>
                </Tabs>
                <span className="text-lg font-bold">
                    Overview Pengembangan SDM PTPN I (Persero) Regional
                </span>
                <RegionHCDevelopmentIndex selectedRegion={selectedRegion} />
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
