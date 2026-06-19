import { UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useOrganizers } from './organizers-provider';

export function OrganizersPrimaryButtons() {
    const { setOpen } = useOrganizers();

    return (
        <div className="flex gap-2">
            <Button className="space-x-1" onClick={() => setOpen('create')}>
                <span>Tambah Penyelenggara</span> <UserPlus size={18} />
            </Button>
        </div>
    );
}
