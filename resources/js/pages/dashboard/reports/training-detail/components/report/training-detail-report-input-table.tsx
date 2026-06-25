import { Cross2Icon } from '@radix-ui/react-icons';
import {
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import type {
    ColumnFiltersState,
    PaginationState,
    RowSelectionState,
    SortingState,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { DataTablePagination, DataTableToolbar } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useTrainingDetailReportInput } from '@/pages/dashboard/reports/training-detail/components/report/training-detail-report-input-provider';
import type { Employee } from '@/types/employee';
import { trainingDetailReportInputColumns as columns } from './training-detail-report-input-columns';

type DataTableProps = {
    data: Employee[];
    search?: Record<string, unknown>;
};

export function TrainingDetailReportInputTable({ data }: DataTableProps) {
    const { employees, setSelectedEmployees } = useTrainingDetailReportInput();

    // Local UI-only states
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            pagination,
            rowSelection,
            columnFilters,
        },
        enableRowSelection: true,
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        getRowId: (row) => row.id.toString(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    useEffect(() => {
        const selectedIds = Object.keys(rowSelection);
        const setSelectedIds = new Set(selectedIds);

        const selectedEmployees =
            employees?.filter((employee) =>
                setSelectedIds.has(employee.id.toString()),
            ) ?? null;

        setSelectedEmployees(selectedEmployees);
    }, [employees, rowSelection, setSelectedEmployees]);

    return (
        <div
            className={cn(
                'max-sm:has-[div[role="toolbar"]]:mb-16', // Add margin bottom to the table on mobile when the toolbar is visible
                'flex flex-1 flex-col gap-4',
            )}
        >
            <div className="flex items-center justify-between">
                <DataTableToolbar
                    table={table}
                    searchPlaceholder="Filter pelatihan..."
                    searchKey="name"
                />
                {table.getSelectedRowModel().rows.length > 0 ? (
                    <div className="flex items-center gap-4">
                        <span className="block text-xs">
                            Karyawan Terpilih{' '}
                            {table.getSelectedRowModel().rows.length}
                        </span>
                        <Button
                            variant="ghost"
                            onClick={() => {
                                table.resetRowSelection();
                            }}
                            className="h-8 px-2 text-xs lg:px-3"
                        >
                            Hapus Pilihan
                            <Cross2Icon className="ms-2 h-4 w-4" />
                        </Button>
                    </div>
                ) : null}
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="group/row"
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            className={cn(
                                                'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                                                header.column.columnDef.meta
                                                    ?.className,
                                                header.column.columnDef.meta
                                                    ?.thClassName,
                                            )}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                    className="group/row"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={cn(
                                                'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                                                cell.column.columnDef.meta
                                                    ?.className,
                                                cell.column.columnDef.meta
                                                    ?.tdClassName,
                                            )}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} className="mt-auto" />
        </div>
    );
}
