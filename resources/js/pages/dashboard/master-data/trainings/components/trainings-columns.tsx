import type { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/data-table';
import { LongText } from '@/components/long-text';
import { cn } from '@/lib/utils';
import type { Training } from '@/types/training';
import { DataTableRowActions } from './data-table-row-actions';

export const trainingsColumns: ColumnDef<Training>[] = [
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
        id: 'activity_type',
        accessorKey: 'activity_type',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Jenis Kegiatan" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-56 ps-3">
                {row.original.activity_type}
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
        id: 'learning_sector',
        accessorKey: 'learning_sector',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Bidang" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-56 ps-3">
                {row.original.learning_sector}
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
        id: 'learning_type',
        accessorKey: 'learning_type',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Bentuk Kegiatan" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-56 ps-3">
                {row.original.learning_type}
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
        id: 'organizer',
        accessorKey: 'organizer.name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Penyelenggara" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-56 ps-3">
                {row.original.organizer.name}
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
        id: 'is_ptpn_group',
        accessorKey: 'is_ptpn_group',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="LPP/Non LPP" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-56 ps-3">
                {row.original.is_ptpn_group ? 'LPP' : 'Non LPP'}
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
        id: 'learning_hours',
        accessorKey: 'learning_hours',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Durasi Pembelajaran"
            />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-56 ps-3">
                {row.original.learning_hours}
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
        id: 'cost',
        accessorKey: 'cost',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Biaya Pembelajaran" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-56 ps-3">{row.original.cost}</LongText>
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
