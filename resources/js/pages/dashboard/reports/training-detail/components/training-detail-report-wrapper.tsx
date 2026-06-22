import axios from 'axios';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useTrainingDetailReport } from '@/pages/dashboard/reports/training-detail/components/training-detail-report-provider';
import type { RecapTrainingRegionMonth } from '@/types/recap-training-region-month';
import type { Training } from '@/types/training';

type TrainingDetailReportWrapperProps = {
    id: number;
    children: ReactNode;
};

export function TrainingDetailReportWrapper({
    id,
    children,
}: TrainingDetailReportWrapperProps) {
    const {
        setTraining,
        setIsFetchingReportTrainingDetail,
        setRecapTrainingRegion,
        setIsFetchingReportTrainingRecap,
    } = useTrainingDetailReport();

    useEffect(() => {
        const fetchReportTrainingDetail = async () => {
            setIsFetchingReportTrainingDetail(true);

            try {
                const response = await axios.get<Training>(
                    `/api/training/overview/${id}`,
                );
                setTraining(response.data);
                setIsFetchingReportTrainingDetail(false);
            } catch (e) {
                console.log(e);
                setIsFetchingReportTrainingDetail(false);
            }
        };

        const fetchReportTrainingRecap = async () => {
            setIsFetchingReportTrainingRecap(true);

            try {
                const response = await axios.get<RecapTrainingRegionMonth[]>(
                    `/api/training/realization/${id}`,
                );
                setRecapTrainingRegion(response.data);
                setIsFetchingReportTrainingRecap(false);
            } catch (e) {
                console.log(e);
                setIsFetchingReportTrainingRecap(false);
            }
        };

        fetchReportTrainingDetail();
        fetchReportTrainingRecap();
    }, [
        id,
        setIsFetchingReportTrainingDetail,
        setIsFetchingReportTrainingRecap,
        setRecapTrainingRegion,
        setTraining,
    ]);

    return <div>{children}</div>;
}
