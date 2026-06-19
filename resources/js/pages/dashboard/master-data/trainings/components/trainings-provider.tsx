import React, { useState } from 'react';
import useDialogState from '@/hooks/use-dialog-state';
import type { Training } from '@/types/training';

type TrainingsDialogType = 'create' | 'edit' | 'delete';

type TrainingsContextType = {
    open: TrainingsDialogType | null;
    setOpen: (str: TrainingsDialogType | null) => void;
    currentRow: Training | null;
    setCurrentRow: React.Dispatch<React.SetStateAction<Training | null>>;
    trainings: Training[];
    setTrainings: React.Dispatch<Training[]>;
};

const TraininigContext = React.createContext<TrainingsContextType | null>(null);

export function TrainingProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useDialogState<TrainingsDialogType>(null);
    const [currentRow, setCurrentRow] = useState<Training | null>(null);
    const [organizers, setOrganizers] = useState<Training[]>([]);

    return (
        <TraininigContext
            value={{
                open,
                setOpen,
                currentRow,
                setCurrentRow,
                trainings: organizers,
                setTrainings: setOrganizers,
            }}
        >
            {children}
        </TraininigContext>
    );
}

export const useTrainings = () => {
    const trainingsContext = React.useContext(TraininigContext);

    if (!trainingsContext) {
        throw new Error(
            'trainingsContext must be used within trainingsContext',
        );
    }

    return trainingsContext;
};
