import { Head } from '@inertiajs/react';
import { TrainingProvider } from '@/pages/dashboard/master-data/trainings/components/trainings-provider';
import { TrainingsTableWrapper } from '@/pages/dashboard/master-data/trainings/components/trainings-table-wrapper';
import { home as dashboardHome } from '@/routes/dashboard';

export default function MasterDataTrainings() {
    return (
        <>
            <TrainingProvider>
                <Head title="Dashboard" />
                <div className="flex h-full flex-1 flex-col gap-x-4 gap-y-8 overflow-x-auto rounded-xl p-4">
                    <div className="flex flex-wrap items-end justify-between gap-2">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">
                                Data Master Pelatihan
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Manajemen data master pelatihan
                            </p>
                        </div>
                    </div>
                    <TrainingsTableWrapper />
                </div>
            </TrainingProvider>
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
