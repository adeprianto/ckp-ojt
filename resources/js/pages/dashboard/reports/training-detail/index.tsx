import { Head } from '@inertiajs/react';
import { TrainingDetailReportHeader } from '@/pages/dashboard/reports/training-detail/components/detail/training-detail-report-header';
import { TrainingDetailReportWrapper } from '@/pages/dashboard/reports/training-detail/components/detail/training-detail-report-wrapper';
import { TrainingDetailReportInput } from '@/pages/dashboard/reports/training-detail/components/report/training-detail-report-input';
import { home as dashboardHome } from '@/routes/dashboard';
import { trainings as reportTraining } from '@/routes/dashboard/reports';
import { TrainingDetailReportProvider } from './components/detail/training-detail-report-provider';

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
                    {/*<TrainingDetailReportTable />*/}
                    <TrainingDetailReportInput />
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
