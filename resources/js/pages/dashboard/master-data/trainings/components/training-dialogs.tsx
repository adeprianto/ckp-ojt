import { TrainingActionDialog } from '@/pages/dashboard/master-data/trainings/components/training-action-dialog';
import { TrainingDeleteDialog } from '@/pages/dashboard/master-data/trainings/components/training-delete-dialog';
import { useTraining } from './training-provider';

export function TrainingDialogs() {
    const { open, setOpen, currentRow, setCurrentRow } = useTraining();

    return (
        <>
            <TrainingActionDialog
                key="organizer-add"
                open={open === 'create'}
                onOpenChange={() => setOpen('create')}
            />

            {currentRow && (
                <>
                    <TrainingActionDialog
                        key={`organizer-edit-${currentRow.id}`}
                        open={open === 'edit'}
                        onOpenChange={() => {
                            setOpen('edit');
                            setTimeout(() => {
                                setCurrentRow(null);
                            }, 500);
                        }}
                        currentRow={currentRow}
                    />

                    <TrainingDeleteDialog
                        key={`organizer-delete-${currentRow.id}`}
                        open={open === 'delete'}
                        onOpenChange={() => {
                            setOpen('delete');
                            setTimeout(() => {
                                setCurrentRow(null);
                            }, 500);
                        }}
                        currentRow={currentRow}
                    />
                </>
            )}
        </>
    );
}
