import type { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/data-table';
import { LongText } from '@/components/long-text';
import { cn } from '@/lib/utils';
import type { Training } from '@/types/training';
// import { DataTableRowActions } from './data-table-row-actions';

export const trainingDetailReportColumns: ColumnDef<Training>[] = [
    // {
    //     id: 'select',
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && 'indeterminate')
    //             }
    //             onCheckedChange={(value) =>
    //                 table.toggleAllPageRowsSelected(!!value)
    //             }
    //             aria-label="Select all"
    //             className="translate-y-[2px]"
    //         />
    //     ),
    //     meta: {
    //         className: cn('start-0 z-10 rounded-tl-[inherit] max-md:sticky'),
    //     },
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //             className="translate-y-[2px]"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
        accessorKey: 'region',
        header: 'Region',
        meta: {
            rowSpan: 2, // <--- Add this!
        },
    },
    {
        id: 'january',
        header: () => <div className="text-center">Januari</div>,
        columns: [
            {
                id: 'january.total_participants',
                accessorKey: 'january.total_participants',
                header: () => <div className="text-center">Total Peserta</div>,
                enableHiding: false,
            },
            {
                id: 'january.total_learning_hours',
                accessorKey: 'january.total_learning_hours',
                header: () => (
                    <div className="text-center">Total Jam Pembelajaran</div>
                ),
                enableHiding: false,
            },
            {
                id: 'january.total_cost',
                accessorKey: 'january.total_cost',
                header: () => <div className="text-center">Total Biaya</div>,
                enableHiding: false,
            },
        ],
    },
    {
        id: 'february',
        header: () => <div className="text-center">Februari</div>,
        columns: [
            {
                id: 'february.total_participants',
                accessorKey: 'february.total_participants',
                header: () => <div className="text-center">Total Peserta</div>,
                enableHiding: false,
            },
            {
                id: 'february.total_learning_hours',
                accessorKey: 'february.total_learning_hours',
                header: () => (
                    <div className="text-center">Total Jam Pembelajaran</div>
                ),
                enableHiding: false,
            },
            {
                id: 'february.total_cost',
                accessorKey: 'february.total_cost',
                header: () => <div className="text-center">Total Biaya</div>,
                enableHiding: false,
            },
        ],
    },
    {
        id: 'march',
        header: () => <div className="text-center">Maret</div>,
        columns: [
            {
                id: 'march.total_participants',
                accessorKey: 'march.total_participants',
                header: () => <div className="text-center">Total Peserta</div>,
                enableHiding: false,
            },
            {
                id: 'march.total_learning_hours',
                accessorKey: 'march.total_learning_hours',
                header: () => (
                    <div className="text-center">Total Jam Pembelajaran</div>
                ),
                enableHiding: false,
            },
            {
                id: 'march.total_cost',
                accessorKey: 'march.total_cost',
                header: () => <div className="text-center">Total Biaya</div>,
                enableHiding: false,
            },
        ],
    },
];
