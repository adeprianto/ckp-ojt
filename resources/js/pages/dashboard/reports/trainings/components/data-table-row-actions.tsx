import { Link } from '@inertiajs/react';
import type { Row } from '@tanstack/react-table';
import { ArrowRightIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { trainingDetail } from '@/routes/dashboard/reports';
import type { Training } from '@/types/training';

type DataTableRowActionsProps = {
    row: Row<Training>;
};

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
    return (
        <Link href={trainingDetail(row.original.id)}>
            <Button variant="outline" aria-label="Submit">
                Detail <ArrowRightIcon />
            </Button>
        </Link>
    );
}
