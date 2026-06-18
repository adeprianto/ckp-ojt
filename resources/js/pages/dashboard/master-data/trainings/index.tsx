import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import { home as dashboardHome } from '@/routes/dashboard';

export default function MasterDataTrainings() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-x-4 gap-y-8 overflow-x-auto rounded-xl p-4">
                <Heading
                    title="Agrow Track"
                    className="mb-0"
                    description="Sistem Monitoring Pengembangan SDM PTPN I"
                />
                <h1>Pelatihan</h1>
            </div>
        </>
    );
}

MasterDataTrainings.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboardHome(),
        },
        {
            title: 'Master Data - Pelatihan',
            href: '#',
        },
    ],
};
