import { UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';

// import { useTraining } from './training-provider';

export function TrainingDetailReportPrimaryButtons() {
    // const { setOpen } = useTraining();

    return (
        <div className="flex gap-2">
            <Button className="space-x-1">
                <span>Tambah Laporan Realisasi Pelatihan</span>{' '}
                <UserPlus size={18} />
            </Button>
        </div>
    );
}
