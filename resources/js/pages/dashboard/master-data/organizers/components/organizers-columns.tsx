import type { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/data-table';
import { LongText } from '@/components/long-text';
import { cn } from '@/lib/utils';
import type { Organizer } from '@/types/organizer';
import { DataTableRowActions } from './data-table-row-actions';

export const organizerColumns: ColumnDef<Organizer>[] = [
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
            <DataTableColumnHeader column={column} title="Nama" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-56 ps-3">{row.original.name}</LongText>
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
        id: 'is_group_ptpn',
        accessorKey: 'is_group_ptpn',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="PTPN Group" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-56 ps-3">
                {row.original.is_ptpn_group ? 'Ya' : 'Tidak'}
            </LongText>
        ),
        meta: {
            className: cn(
                // 'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
                'start-6 ps-0.5 max-md:sticky @4xl/content:table-cell @4xl/content:drop-shadow-none',
            ),
        },
        enableHiding: false,
        enableSorting: false,
        enableGrouping: true,
    },
    {
        id: 'actions',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Action" />
        ),
        cell: DataTableRowActions,
    },
];
