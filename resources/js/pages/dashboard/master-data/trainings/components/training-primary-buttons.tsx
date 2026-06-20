import { UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useTraining } from './training-provider';

export function TrainingPrimaryButtons() {
    const { setOpen } = useTraining();

    return (
        <div className="flex gap-2">
            <Button className="space-x-1" onClick={() => setOpen('create')}>
                <span>Tambah Pelatihan</span> <UserPlus size={18} />
            </Button>
        </div>
    );
}
