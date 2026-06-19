import { OrganizersActionDialog } from './organizers-action-dialog';
import { OrganizersDeleteDialog } from './organizers-delete-dialog';
import { useOrganizers } from './organizers-provider';

export function OrganizersDialogs() {
    const { open, setOpen, currentRow, setCurrentRow } = useOrganizers();

    return (
        <>
            <OrganizersActionDialog
                key="organizer-add"
                open={open === 'create'}
                onOpenChange={() => setOpen('create')}
            />

            {currentRow && (
                <>
                    <OrganizersActionDialog
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

                    <OrganizersDeleteDialog
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
