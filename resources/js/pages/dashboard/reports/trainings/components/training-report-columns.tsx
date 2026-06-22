import type { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/data-table';
import { LongText } from '@/components/long-text';
import { cn } from '@/lib/utils';
import type { Training } from '@/types/training';
import { DataTableRowActions } from './data-table-row-actions';

export const trainingReportColumns: ColumnDef<Training>[] = [
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
        id: 'name',
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama Pelatihan" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-96 ps-3">{row.original.name}</LongText>
        ),
        meta: {
            className: cn(
                // 'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
                'start-6 ps-0.5 max-md:sticky @4xl/content:table-cell @4xl/content:drop-shadow-none',
            ),
        },
        enableHiding: false,
    },
    {
        id: 'total_participants',
        accessorKey: 'realization.total_participants',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Total Peserta" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-56 ps-3">
                {row.original.realization?.reduce(
                    (val, item) => val + item.total_participants,
                    0,
                )}
            </LongText>
        ),
        meta: {
            className: cn(
                // 'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
                'start-6 ps-0.5 max-md:sticky @4xl/content:table-cell @4xl/content:drop-shadow-none',
            ),
        },
        enableHiding: false,
    },
    {
        id: 'total_learning_hours',
        accessorKey: 'realization.total_learning_hours',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Total Durasi Pembelajaran"
            />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-56 ps-3">
                {row.original.realization?.reduce(
                    (val, item) => val + item.total_learning_hours,
                    0,
                )}
            </LongText>
        ),
        meta: {
            className: cn(
                // 'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
                'start-6 ps-0.5 max-md:sticky @4xl/content:table-cell @4xl/content:drop-shadow-none',
            ),
        },
        enableHiding: false,
    },
    {
        id: 'total_cost',
        accessorKey: 'realization.cost',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Total Biaya Pembelajaran"
            />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-56 ps-3">
                {row.original.realization?.reduce(
                    (val, item) => BigInt(val) + BigInt(item.cost),
                    BigInt(0),
                )}
            </LongText>
        ),
        meta: {
            className: cn(
                // 'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
                'start-6 ps-0.5 max-md:sticky @4xl/content:table-cell @4xl/content:drop-shadow-none',
            ),
        },
        enableHiding: false,
    },
    {
        id: 'actions',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Action" />
        ),
        cell: DataTableRowActions,
    },
];
