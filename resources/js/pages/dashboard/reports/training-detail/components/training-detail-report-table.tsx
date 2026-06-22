import Handsontable from 'handsontable';
import { useEffect, useRef } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { useTrainingDetailReport } from '@/pages/dashboard/reports/training-detail/components/training-detail-report-provider';

const mergeCellsSettings = [
    {
        col: 0,
        row: 0,
        rowspan: 2,
        colspan: 1,
    },
    {
        col: 1,
        row: 0,
        rowspan: 1,
        colspan: 3,
    },
    {
        col: 4,
        row: 0,
        rowspan: 1,
        colspan: 3,
    },
    {
        col: 7,
        row: 0,
        rowspan: 1,
        colspan: 3,
    },
    {
        col: 10,
        row: 0,
        rowspan: 1,
        colspan: 3,
    },
    {
        col: 13,
        row: 0,
        rowspan: 1,
        colspan: 3,
    },
    {
        col: 16,
        row: 0,
        rowspan: 1,
        colspan: 3,
    },
    {
        col: 19,
        row: 0,
        rowspan: 1,
        colspan: 3,
    },
    {
        col: 22,
        row: 0,
        rowspan: 1,
        colspan: 3,
    },
    {
        col: 25,
        row: 0,
        rowspan: 1,
        colspan: 3,
    },
    {
        col: 28,
        row: 0,
        rowspan: 1,
        colspan: 3,
    },
    {
        col: 31,
        row: 0,
        rowspan: 1,
        colspan: 3,
    },
    {
        col: 34,
        row: 0,
        rowspan: 1,
        colspan: 3,
    },
];

export function TrainingDetailReportTable() {
    const { isFetchingReportTrainingRecap, recapTrainingRegion } =
        useTrainingDetailReport();

    const containerRef = useRef<HTMLDivElement>({} as HTMLDivElement); // The <div> where table lives
    const hotInstance = useRef<Handsontable>(null);

    useEffect(() => {
        if (recapTrainingRegion != null && recapTrainingRegion.length > 0) {
            if (hotInstance.current) {
                return;
            }

            const data = [
                [
                    'Regional',
                    'Januari',
                    'Januari',
                    'Januari',
                    'Februari',
                    'Februari',
                    'Februari',
                    'Maret',
                    'Maret',
                    'Maret',
                    'April',
                    'April',
                    'April',
                    'Mei',
                    'Mei',
                    'Mei',
                    'Juni',
                    'Juni',
                    'Juni',
                    'Juli',
                    'Juli',
                    'Juli',
                    'Agustus',
                    'Agustus',
                    'Agustus',
                    'September',
                    'September',
                    'September',
                    'Oktober',
                    'Oktober',
                    'Oktober',
                    'November',
                    'November',
                    'November',
                    'Desember',
                    'Desember',
                    'Desember',
                ],
                [
                    'Regional',
                    'Total Peserta',
                    'Total Jam Pembelajaran',
                    'Total Biaya',
                    'Total Peserta',
                    'Total Jam Pembelajaran',
                    'Total Biaya',
                    'Total Peserta',
                    'Total Jam Pembelajaran',
                    'Total Biaya',
                    'Total Peserta',
                    'Total Jam Pembelajaran',
                    'Total Biaya',
                    'Total Peserta',
                    'Total Jam Pembelajaran',
                    'Total Biaya',
                    'Total Peserta',
                    'Total Jam Pembelajaran',
                    'Total Biaya',
                    'Total Peserta',
                    'Total Jam Pembelajaran',
                    'Total Biaya',
                    'Total Peserta',
                    'Total Jam Pembelajaran',
                    'Total Biaya',
                    'Total Peserta',
                    'Total Jam Pembelajaran',
                    'Total Biaya',
                    'Total Peserta',
                    'Total Jam Pembelajaran',
                    'Total Biaya',
                    'Total Peserta',
                    'Total Jam Pembelajaran',
                    'Total Biaya',
                    'Total Peserta',
                    'Total Jam Pembelajaran',
                    'Total Biaya',
                ],
                ...recapTrainingRegion.map((val) => [
                    val.region_name,
                    val.month.january.total_participants,
                    val.month.january.total_learning_hours,
                    val.month.january.cost,
                    val.month.february.total_participants,
                    val.month.february.total_learning_hours,
                    val.month.february.cost,
                    val.month.march.total_participants,
                    val.month.march.total_learning_hours,
                    val.month.march.cost,
                    val.month.april.total_participants,
                    val.month.april.total_learning_hours,
                    val.month.april.cost,
                    val.month.may.total_participants,
                    val.month.may.total_learning_hours,
                    val.month.may.cost,
                    val.month.june.total_participants,
                    val.month.june.total_learning_hours,
                    val.month.june.cost,
                    val.month.july.total_participants,
                    val.month.july.total_learning_hours,
                    val.month.july.cost,
                    val.month.august.total_participants,
                    val.month.august.total_learning_hours,
                    val.month.august.cost,
                    val.month.september.total_participants,
                    val.month.september.total_learning_hours,
                    val.month.september.cost,
                    val.month.october.total_participants,
                    val.month.october.total_learning_hours,
                    val.month.october.cost,
                    val.month.november.total_participants,
                    val.month.november.total_learning_hours,
                    val.month.november.cost,
                    val.month.december.total_participants,
                    val.month.december.total_learning_hours,
                    val.month.december.cost,
                ]),
            ];

            hotInstance.current = new Handsontable(containerRef.current, {
                data: data,
                licenseKey: 'non-commercial-and-evaluation',
                height: 'auto',
                width: '100%',
                className: 'htCenter htMiddle',
                colWidths: 250,
                rowHeights: 30,
                autoRowSize: true,
                autoColumnSize: true,
                fixedColumnsLeft: 1,
                fixedRowsTop: 2,
                mergeCells: mergeCellsSettings,
            });
        }

        return () => {
            if (hotInstance.current) {
                hotInstance.current.destroy();
                hotInstance.current = null;
            }
        };
    }, [recapTrainingRegion]);

    return (
        <div className="m-4">
            {isFetchingReportTrainingRecap && (
                <div className="flex h-64 items-center justify-center gap-x-4">
                    <Spinner />
                    <span>Loading ...</span>
                </div>
            )}
            <div
                ref={containerRef}
                className={cn(
                    'h-auto, w-full, overflow-hidden',
                    isFetchingReportTrainingRecap ? 'hidden' : 'block',
                )}
            />
        </div>
    );
}
