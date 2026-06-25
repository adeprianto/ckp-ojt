import type { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/data-table';
import { LongText } from '@/components/long-text';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { Employee } from '@/types/employee';

export const trainingDetailReportInputColumns: ColumnDef<Employee>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        meta: {
            className: cn('start-0 z-10 rounded-tl-[inherit] max-md:sticky'),
        },
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'nik',
        accessorKey: 'nik',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="NIK" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-96 ps-3">{row.original.nik}</LongText>
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
        id: 'name',
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama Karyawan" />
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
        id: 'start_working_date',
        accessorKey: 'start_working_date',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tgl Mulai Kerja" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-96 ps-3">
                {row.original.start_working_date}
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
        id: 'company_code',
        accessorKey: 'company_code',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Kode Perusahaan" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-96 ps-3">
                {row.original.company_code}
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
        id: 'personnel_area_code',
        accessorKey: 'personnel_area_code',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Kode Personnel Area"
            />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-96 ps-3">
                {row.original.personnel_area_code}
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
        id: 'employee_group',
        accessorKey: 'employee_group',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tipe Karyawan" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-96 ps-3">
                {row.original.employee_group}
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
        id: 'job_grade',
        accessorKey: 'job_grade',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Job Grade" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-96 ps-3">
                {row.original.job_grade}
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
        id: 'personnel_area',
        accessorKey: 'personnel_area',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Personnel Area" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-96 ps-3">
                {row.original.personnel_area}
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
        id: 'personnel_subarea',
        accessorKey: 'personnel_subarea',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Personnel Subarea" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-96 ps-3">
                {row.original.personnel_subarea}
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
        id: 'position_code',
        accessorKey: 'position_code',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Kode Jabatan" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-96 ps-3">
                {row.original.position_code}
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
        id: 'position',
        accessorKey: 'position',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Jabatan" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-96 ps-3">
                {row.original.position}
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
        id: 'birth_date',
        accessorKey: 'birth_date',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tanggal Lahir" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-96 ps-3">
                {row.original.birth_date}
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
        id: 'person_grade',
        accessorKey: 'person_grade',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Person Grade" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-96 ps-3">
                {row.original.person_grade}
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
        id: 'gender',
        accessorKey: 'gender',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Jenis Kelamin" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-96 ps-3">{row.original.gender}</LongText>
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
        id: 'educational',
        accessorKey: 'educational',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Pendidikan" />
        ),
        cell: ({ row }) => (
            <LongText className="max-w-96 ps-3">
                {row.original.educational}
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
];
