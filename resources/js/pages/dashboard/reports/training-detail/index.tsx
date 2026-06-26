import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { TrainingDetailReportHeader } from '@/pages/dashboard/reports/training-detail/components/detail/training-detail-report-header';
import { TrainingDetailReportWrapper } from '@/pages/dashboard/reports/training-detail/components/detail/training-detail-report-wrapper';
import { TrainingDetailReportInput } from '@/pages/dashboard/reports/training-detail/components/report/training-detail-report-input';
import { home as dashboardHome } from '@/routes/dashboard';
import { trainings as reportTraining } from '@/routes/dashboard/reports';
import { TrainingDetailReportProvider } from './components/detail/training-detail-report-provider';
import { TrainingDetailReportTable } from './components/detail/training-detail-report-table';

type ReportTrainingDetailProp = {
    id: number;
};

export default function ReportTrainingDetail({ id }: ReportTrainingDetailProp) {
    const [isAddReport, setIsAddReport] = useState(false);

    return (
        <>
            <TrainingDetailReportProvider>
                <Head title="Dashboard" />
                <TrainingDetailReportWrapper id={id}>
                    <TrainingDetailReportHeader
                        isAddReport={isAddReport}
                        setIsAddReport={setIsAddReport}
                    />
                    {isAddReport ? (
                        <TrainingDetailReportInput
                            setIsAddReport={setIsAddReport}
                            isAddReport={isAddReport}
                        />
                    ) : (
                        <TrainingDetailReportTable />
                    )}
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
