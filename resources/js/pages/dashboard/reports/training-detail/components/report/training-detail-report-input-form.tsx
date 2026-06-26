import axios from 'axios';
import { format } from 'date-fns';
import { FilePlus, Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { showErrorToast, showSuccessToast } from '@/lib/show-toast';
import { useTrainingDetailReport } from '@/pages/dashboard/reports/training-detail/components/detail/training-detail-report-provider';
import { useTrainingDetailReportInput } from '@/pages/dashboard/reports/training-detail/components/report/training-detail-report-input-provider';
import TrainingDetailReportInputFormDateButton from './training-detail-report-input-form-date-button';

type TrainingDetailReportInputFormProp = {
    isAddReport: boolean;
    setIsAddReport: React.Dispatch<boolean>;
};

export function TrainingDetailReportInputForm({
    setIsAddReport,
}: TrainingDetailReportInputFormProp) {
    const {
        learningHours,
        setLearningHours,
        cost,
        setCost,
        startLearningDate,
        setStartLearningDate,
        endLearningDate,
        setEndLearningDate,
        selectedEmployees,
    } = useTrainingDetailReportInput();
    const { training } = useTrainingDetailReport();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setLearningHours(training?.learning_hours);
        setCost(training?.cost);
    }, [
        selectedEmployees,
        setCost,
        setLearningHours,
        training?.cost,
        training?.learning_hours,
    ]);

    const storeTrainingRealizationReport = async () => {
        setIsLoading(true);

        try {
            const data = {
                name: training?.name,
                activity_type: training?.activity_type.toLowerCase(),
                learning_sector: training?.learning_sector.toLowerCase(),
                learning_type: training?.learning_type.toLowerCase(),
                learning_hours: learningHours,
                cost: cost?.toString(),
                organization_id: training?.organization_id,
                is_ptpn_group: training?.is_ptpn_group,
                start_learning_date: format(startLearningDate, 'yyyy-MM-dd'),
                end_learning_date: format(endLearningDate, 'yyyy-MM-dd'),
                total_participants: selectedEmployees?.length,
                total_learning_hours:
                    (selectedEmployees?.length ?? 0) * (learningHours ?? 0),
                total_cost: (
                    BigInt(selectedEmployees?.length ?? 0) * BigInt(cost ?? 0)
                ).toString(),
                participants: selectedEmployees?.map((employee) => employee.id),
            };

            await axios.post(`/api/training/realization/${training?.id}`, data);

            showSuccessToast({
                successInfo: `Berhasil menyimpan data realisasi pelatihan ${training?.name}`,
            });

            setIsLoading(false);
            setIsAddReport(false);
        } catch (e) {
            console.log(e);
            showErrorToast({
                errorInfo: `Gagal menyimpan data realisasi pelatihan ${training?.name}`,
            });
            setIsLoading(false);
        }
    };

    const renderSaveReportButton = () => {
        if (
            selectedEmployees &&
            learningHours &&
            selectedEmployees?.length > 0 &&
            learningHours > 0
        ) {
            return (
                <div className="mt-8 flex items-center justify-between">
                    <div>
                        <span className="block text-xs">
                            Total Peserta{' '}
                            <span className="font-bold">
                                {selectedEmployees.length} Peserta
                            </span>
                        </span>
                        <span className="mt-2 block text-xs">
                            Total Durasi Jam Pembelajaran{' '}
                            <span className="font-bold">
                                {selectedEmployees.length * learningHours} Jam
                            </span>
                        </span>
                        <span className="mt-2 block text-xs">
                            Total Biaya Pembelajaran{' '}
                            <span className="font-bold">
                                Rp.{' '}
                                {BigInt(selectedEmployees.length ?? 0n) *
                                    BigInt(cost ?? 0)}
                            </span>
                        </span>
                    </div>
                    <Button
                        className="space-x-1"
                        disabled={isLoading}
                        onClick={storeTrainingRealizationReport}
                    >
                        {isLoading ? (
                            <>
                                <Loader className="h-7 w-7 animate-spin" />
                                {'  '}
                                Loading...
                            </>
                        ) : (
                            <>
                                <span>Simpan Laporan Pelatihan</span>{' '}
                                <FilePlus size={18} />
                            </>
                        )}
                    </Button>
                </div>
            );
        } else {
            return null;
        }
    };

    return training ? (
        <div>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4">
                    <div className="mb-2 text-sm font-medium">Nama</div>
                    <Input
                        value={training.name ?? ''}
                        placeholder="Masukkan nama"
                        autoComplete="off"
                        disabled
                    />
                </div>
                <div className="col-span-4">
                    <div className="mb-2 text-sm font-medium">
                        Kegiatan Pelatihan
                    </div>
                    <Input
                        value={training.activity_type.toCapitalize() ?? ''}
                        placeholder="Jenis kegiatan"
                        className="col-span-4"
                        autoComplete="off"
                        disabled
                    />
                </div>
                <div className="col-span-4">
                    <div className="mb-2 text-sm font-medium">Bidang</div>
                    <Input
                        value={training.learning_sector.toCapitalize() ?? ''}
                        placeholder="Bidang"
                        className="col-span-4"
                        autoComplete="off"
                        disabled
                    />
                </div>
                <div className="col-span-4">
                    <div className="mb-2 text-sm font-medium">
                        Jenis Pelatihan
                    </div>
                    <Input
                        value={training.learning_type.toCapitalize() ?? ''}
                        placeholder="Tipe pelatihan"
                        className="col-span-4"
                        autoComplete="off"
                        disabled
                    />
                </div>
                <div className="col-span-4">
                    <div className="mb-2 text-sm font-medium">
                        Penyelenggara
                    </div>
                    <Input
                        value={training.organizer.name ?? ''}
                        placeholder="Penyelenggara"
                        className="col-span-4"
                        autoComplete="off"
                        disabled
                    />
                </div>
                <div className="col-span-4">
                    <div className="mb-2 text-sm font-medium">
                        Termasuk Dalam PTPN Grup
                    </div>
                    <Input
                        value={training.is_ptpn_group ? 'LPP' : 'Non LPP'}
                        placeholder="PTPN Grup"
                        className="col-span-4"
                        autoComplete="off"
                        disabled
                    />
                </div>
                <div className="col-span-3">
                    <div className="mb-2 text-sm font-medium">
                        Tanggal Mulai Pelatihan
                    </div>
                    <TrainingDetailReportInputFormDateButton
                        date={startLearningDate}
                        setDate={setStartLearningDate}
                    />
                </div>
                <div className="col-span-3">
                    <div className="mb-2 text-sm font-medium">
                        Tanggal Akhir Pelatihan
                    </div>
                    <TrainingDetailReportInputFormDateButton
                        date={endLearningDate}
                        setDate={setEndLearningDate}
                    />
                </div>
                <div className="col-span-3">
                    <div className="mb-2 text-sm font-medium">
                        Jam Pembelajaran (per Orang)
                    </div>
                    <Input
                        onChange={(e) =>
                            setLearningHours(parseInt(e.target.value))
                        }
                        value={learningHours}
                        placeholder="Jam pembelajaran"
                        className="col-span-4"
                        autoComplete="off"
                        type="number"
                    />
                </div>
                <div className="col-span-3">
                    <div className="mb-2 text-sm font-medium">
                        Biaya Pelatihan (per Orang)
                    </div>
                    <Input
                        onChange={(e) =>
                            setCost(
                                e.target.value
                                    ? BigInt(e.target.value)
                                    : undefined,
                            )
                        }
                        value={cost?.toString()}
                        placeholder="Biaya pelatihan"
                        className="col-span-4"
                        autoComplete="off"
                        type="number"
                    />
                </div>
            </div>
            {renderSaveReportButton()}
        </div>
    ) : (
        <div>Loading ...</div>
    );
}
