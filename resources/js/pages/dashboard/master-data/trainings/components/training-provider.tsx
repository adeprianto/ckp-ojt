import React, { useState } from 'react';
import useDialogState from '@/hooks/use-dialog-state';
import type { Training } from '@/types/training';

type TrainingDialogType = 'create' | 'edit' | 'delete';

type TrainingContextType = {
    open: TrainingDialogType | null;
    setOpen: (str: TrainingDialogType | null) => void;
    currentRow: Training | null;
    setCurrentRow: React.Dispatch<React.SetStateAction<Training | null>>;
    trainings: Training[];
    setTrainings: React.Dispatch<Training[]>;
};

const TraininigContext = React.createContext<TrainingContextType | null>(null);

export function TrainingProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useDialogState<TrainingDialogType>(null);
    const [currentRow, setCurrentRow] = useState<Training | null>(null);
    const [trainings, setTrainings] = useState<Training[]>([]);

    return (
        <TraininigContext
            value={{
                open,
                setOpen,
                currentRow,
                setCurrentRow,
                trainings,
                setTrainings,
            }}
        >
            {children}
        </TraininigContext>
    );
}

export const useTraining = () => {
    const trainingContext = React.useContext(TraininigContext);

    if (!trainingContext) {
        throw new Error('trainingContext must be used within trainingContext');
    }

    return trainingContext;
};
