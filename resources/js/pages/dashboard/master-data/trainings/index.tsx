import { Head } from '@inertiajs/react';
import { TrainingDialogs } from '@/pages/dashboard/master-data/trainings/components/training-dialogs';
import { TrainingPrimaryButtons } from '@/pages/dashboard/master-data/trainings/components/training-primary-buttons';
import { TrainingProvider } from '@/pages/dashboard/master-data/trainings/components/training-provider';
import { TrainingTableWrapper } from '@/pages/dashboard/master-data/trainings/components/training-table-wrapper';
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
                        <TrainingPrimaryButtons />
                    </div>
                    <TrainingTableWrapper />
                </div>

                <TrainingDialogs />
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
