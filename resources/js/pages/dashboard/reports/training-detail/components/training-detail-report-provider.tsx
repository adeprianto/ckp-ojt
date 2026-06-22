import React, { useState } from 'react';
import type { RecapTrainingRegionMonth } from '@/types/recap-training-region-month';
import type { Training } from '@/types/training';

type TrainingDetailReportContextType = {
    isFetchingReportTrainingDetail: boolean;
    setIsFetchingReportTrainingDetail: React.Dispatch<boolean>;
    training: Training | null;
    setTraining: React.Dispatch<Training | null>;
    isFetchingReportTrainingRecap: boolean;
    setIsFetchingReportTrainingRecap: React.Dispatch<boolean>;
    recapTrainingRegion: RecapTrainingRegionMonth[] | null;
    setRecapTrainingRegion: React.Dispatch<RecapTrainingRegionMonth[] | null>;
};

const TraininigDetailReportContext =
    React.createContext<TrainingDetailReportContextType | null>(null);

export function TrainingDetailReportProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isFetchingReportTrainingDetail, setIsFetchingReportTrainingDetail] =
        useState(false);
    const [training, setTraining] = useState<Training | null>(null);

    const [isFetchingReportTrainingRecap, setIsFetchingReportTrainingRecap] =
        useState(false);
    const [recapTrainingRegion, setRecapTrainingRegion] = useState<
        RecapTrainingRegionMonth[] | null
    >(null);

    return (
        <TraininigDetailReportContext
            value={{
                isFetchingReportTrainingDetail,
                setIsFetchingReportTrainingDetail,
                training,
                setTraining,
                isFetchingReportTrainingRecap,
                setIsFetchingReportTrainingRecap,
                recapTrainingRegion,
                setRecapTrainingRegion,
            }}
        >
            {children}
        </TraininigDetailReportContext>
    );
}

export const useTrainingDetailReport = () => {
    const trainingDetailReportContext = React.useContext(
        TraininigDetailReportContext,
    );

    if (!trainingDetailReportContext) {
        throw new Error(
            'trainingDetailReportContext must be used within trainingDetailReportContext',
        );
    }

    return trainingDetailReportContext;
};
