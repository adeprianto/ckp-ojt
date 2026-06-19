import { Cross2Icon } from '@radix-ui/react-icons';
import { type Table } from '@tanstack/react-table';
import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type DataTableToolbarProps<TData> = {
    table: Table<TData>;
    searchPlaceholder?: string;
    searchKey: string;
    children?: ReactNode;
};

export function DataTableToolbar<TData>({
    table,
    searchPlaceholder = 'Filter...',
    searchKey,
    children,
}: DataTableToolbarProps<TData>) {
    const isFiltered =
        table.getState().columnFilters.length > 0 ||
        table.getState().globalFilter;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                <Input
                    placeholder={searchPlaceholder}
                    value={
                        (table
                            .getColumn(searchKey)
                            ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) => {
                        table
                            .getColumn(searchKey)
                            ?.setFilterValue(event.target.value);
                    }}
                    className="h-8 w-[150px] lg:w-[250px]"
                />

                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => {
                            table.resetColumnFilters();
                            table.setGlobalFilter('');
                        }}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ms-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            {children && <div className="flex">{children}</div>}
        </div>
    );
}
