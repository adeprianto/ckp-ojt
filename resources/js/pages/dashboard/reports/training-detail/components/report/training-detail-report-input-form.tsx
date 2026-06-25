import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useTrainingDetailReport } from '@/pages/dashboard/reports/training-detail/components/detail/training-detail-report-provider';
import { useTrainingDetailReportInput } from '@/pages/dashboard/reports/training-detail/components/report/training-detail-report-input-provider';
import TrainingDetailReportInputFormDateButton from './training-detail-report-input-form-date-button';

export function TrainingDetailReportInputForm() {
    const {
        startLearningDate,
        setStartLearningDate,
        endLearningDate,
        setEndLearningDate,
        selectedEmployees,
    } = useTrainingDetailReportInput();
    const { training } = useTrainingDetailReport();

    useEffect(() => {
        console.log(selectedEmployees);
    }, [selectedEmployees]);

    return training ? (
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
                <div className="mb-2 text-sm font-medium">Jenis Pelatihan</div>
                <Input
                    value={training.learning_type.toCapitalize() ?? ''}
                    placeholder="Tipe pelatihan"
                    className="col-span-4"
                    autoComplete="off"
                    disabled
                />
            </div>
            <div className="col-span-4">
                <div className="mb-2 text-sm font-medium">Penyelenggara</div>
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
                    value={training.learning_hours}
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
                    value={training.cost?.toString()}
                    placeholder="Biaya pelatihan"
                    className="col-span-4"
                    autoComplete="off"
                    type="number"
                />
            </div>
        </div>
    ) : (
        <div>Loading ...</div>
    );
}
