import { Head } from '@inertiajs/react';
import { TrainingReportProvider } from '@/pages/dashboard/reports/trainings/components/training-report-provider';
import { TrainingReportTableWrapper } from '@/pages/dashboard/reports/trainings/components/training-report-table-wrapper';
import { home as dashboardHome } from '@/routes/dashboard';

export default function ReportTrainings() {
    return (
        <>
            <TrainingReportProvider>
                <Head title="Dashboard" />
                <div className="flex h-full flex-1 flex-col gap-x-4 gap-y-8 overflow-x-auto rounded-xl p-4">
                    <div className="flex flex-wrap items-end justify-between gap-2">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">
                                Laporan Realisasi Pelatihan
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Manajemen realisasi pelatihan
                            </p>
                        </div>
                    </div>

                    <TrainingReportTableWrapper />
                </div>
            </TrainingReportProvider>
        </>
    );
}

ReportTrainings.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboardHome(),
        },
        {
            title: 'Laporan Realisasi Pelatihan',
            href: '#',
        },
    ],
};
