import { useTrainingDetailReport } from '@/pages/dashboard/reports/training-detail/components/training-detail-report-provider';

export function TrainingDetailReportHeader() {
    const { isFetchingReportTrainingDetail, training } =
        useTrainingDetailReport();

    return (
        <div className="flex flex-1 flex-col gap-x-4 gap-y-8 overflow-x-auto rounded-xl p-4">
            <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                    <h2 className="text-xl font-bold tracking-tight">
                        Detail Laporan Realisasi Pelatihan
                    </h2>
                    {isFetchingReportTrainingDetail ? (
                        <p>Loading...</p>
                    ) : (
                        <p>{training?.name}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
