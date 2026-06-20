import axios from 'axios';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { ConfirmDialog } from '@/components/confirm-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useTraining } from '@/pages/dashboard/master-data/trainings/components/training-provider';
import type { Training } from '@/types/training';

type TrainingDeleteDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentRow: Training;
};

function showSuccessDeleteTrainingData(
    data: Training,
    title: string = 'Sukses',
) {
    toast.success(title, {
        duration: 2000,
        description: (
            // w-[340px]
            <span>Pelatihan {data.name} berhasil dihapus</span>
        ),
    });
}

function showFailedDeleteTrainingData(data: Training, description?: string) {
    toast.error('Gagal', {
        duration: 2000,
        description: (
            // w-[340px]
            <>
                <div>Pelatihan {data.name} gagal dihapus</div>
                {description && <div>{description}</div>}
            </>
        ),
    });
}

export function TrainingDeleteDialog({
    open,
    onOpenChange,
    currentRow,
}: TrainingDeleteDialogProps) {
    const { setTrainings } = useTraining();
    const [isLoading, setIsLoading] = useState(false);

    const onDeleteOrganizer = () => {
        setIsLoading(true);
        axios
            .delete(`/api/master-data/training/${currentRow!.id}`)
            .then(() => {
                showSuccessDeleteTrainingData(currentRow);

                return axios.get<Training[]>('/api/master-data/training');
            })
            .then((response) => {
                setIsLoading(false);
                onOpenChange(false);
                setTrainings(response.data);
            })
            .catch((e: Error) => {
                console.log(e);

                if (axios.isAxiosError(e)) {
                    console.log(e.response?.data);
                }

                onOpenChange(false);
                showFailedDeleteTrainingData(currentRow);
                setIsLoading(false);
            });
    };

    return (
        <ConfirmDialog
            open={open}
            onOpenChange={onOpenChange}
            handleConfirm={onDeleteOrganizer}
            isLoading={isLoading}
            title={
                <span className="text-destructive">
                    <AlertTriangle
                        className="me-1 inline-block stroke-destructive"
                        size={18}
                    />{' '}
                    Hapus Pelatihan
                </span>
            }
            desc={
                <div className="space-y-4">
                    <p className="mb-2">
                        Apa kamu yakin untuk menghapus data pelatihan{' '}
                        <span className="font-bold">{currentRow.name}</span>
                        ?
                        <br />
                    </p>

                    <Alert variant="destructive">
                        <AlertTitle>Warning!</AlertTitle>
                        <AlertDescription>
                            Harap hati-hati, data yang telah dihapus tidak bisa
                            dikembalikan.
                        </AlertDescription>
                    </Alert>
                </div>
            }
            confirmText="Hapus"
            destructive
        />
    );
}
