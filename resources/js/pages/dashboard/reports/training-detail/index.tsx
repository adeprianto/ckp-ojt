import { Head } from '@inertiajs/react';
import { TrainingDetailReportHeader } from '@/pages/dashboard/reports/training-detail/components/training-detail-report-header';
import { TrainingDetailReportTable } from '@/pages/dashboard/reports/training-detail/components/training-detail-report-table';
import { TrainingDetailReportWrapper } from '@/pages/dashboard/reports/training-detail/components/training-detail-report-wrapper';
import { home as dashboardHome } from '@/routes/dashboard';
import { trainings as reportTraining } from '@/routes/dashboard/reports';
import { TrainingDetailReportProvider } from './components/training-detail-report-provider';

type ReportTrainingDetailProp = {
    id: number;
};

export default function ReportTrainingDetail({ id }: ReportTrainingDetailProp) {
    return (
        <>
            <TrainingDetailReportProvider>
                <Head title="Dashboard" />
                <TrainingDetailReportWrapper id={id}>
                    <TrainingDetailReportHeader />
                    <TrainingDetailReportTable />
                </TrainingDetailReportWrapper>
            </TrainingDetailReportProvider>
        </>
    );
}

ReportTrainingDetail.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboardHome(),
        },
        {
            title: 'Laporan Pelatihan',
            href: reportTraining(),
        },
    ],
};
