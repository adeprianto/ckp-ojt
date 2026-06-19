import React, { useState } from 'react';
import useDialogState from '@/hooks/use-dialog-state';
import type { Organizer } from '@/types/organizer';

type OrganizersDialogType = 'create' | 'edit' | 'delete';

type OrganizersContextType = {
    open: OrganizersDialogType | null;
    setOpen: (str: OrganizersDialogType | null) => void;
    currentRow: Organizer | null;
    setCurrentRow: React.Dispatch<React.SetStateAction<Organizer | null>>;
    organizers: Organizer[];
    setOrganizers: React.Dispatch<Organizer[]>;
};

const OrganizerContext = React.createContext<OrganizersContextType | null>(
    null,
);

export function OrganizerProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useDialogState<OrganizersDialogType>(null);
    const [currentRow, setCurrentRow] = useState<Organizer | null>(null);
    const [organizers, setOrganizers] = useState<Organizer[]>([]);

    return (
        <OrganizerContext
            value={{
                open,
                setOpen,
                currentRow,
                setCurrentRow,
                organizers,
                setOrganizers,
            }}
        >
            {children}
        </OrganizerContext>
    );
}

export const useOrganizers = () => {
    const organizersContext = React.useContext(OrganizerContext);

    if (!organizersContext) {
        throw new Error('useOrganizers must be used within useOrganizers');
    }

    return organizersContext;
};
