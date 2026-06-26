import { FilePlus, MoveLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTrainingDetailReport } from '@/pages/dashboard/reports/training-detail/components/detail/training-detail-report-provider';

type TrainingDetailReportHeaderProp = {
    isAddReport: boolean;
    setIsAddReport: React.Dispatch<boolean>;
};

export function TrainingDetailReportHeader({
    isAddReport,
    setIsAddReport,
}: TrainingDetailReportHeaderProp) {
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
                {isAddReport ? (
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setIsAddReport(false);
                        }}
                        className="h-8 px-2 lg:px-3"
                    >
                        <MoveLeft className="ms-2 h-4 w-4" />
                        Kembali
                    </Button>
                ) : (
                    <Button
                        className="space-x-1"
                        onClick={() => setIsAddReport(true)}
                    >
                        <FilePlus size={18} />
                        <span>Tambah Laporan Realisasi Pelatihan</span>{' '}
                    </Button>
                )}
            </div>
        </div>
    );
}
