import React, { useState } from 'react';
import type { Training } from '@/types/training';

type TrainingReportContextType = {
    currentRow: Training | null;
    setCurrentRow: React.Dispatch<React.SetStateAction<Training | null>>;
    trainings: Training[];
    setTrainings: React.Dispatch<Training[]>;
};

const TraininigReportContext =
    React.createContext<TrainingReportContextType | null>(null);

export function TrainingReportProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [currentRow, setCurrentRow] = useState<Training | null>(null);
    const [trainings, setTrainings] = useState<Training[]>([]);

    return (
        <TraininigReportContext
            value={{
                currentRow,
                setCurrentRow,
                trainings,
                setTrainings,
            }}
        >
            {children}
        </TraininigReportContext>
    );
}

export const useTrainingReport = () => {
    const trainingReportContext = React.useContext(TraininigReportContext);

    if (!trainingReportContext) {
        throw new Error(
            'trainingReportContext must be used within trainingReportContext',
        );
    }

    return trainingReportContext;
};
