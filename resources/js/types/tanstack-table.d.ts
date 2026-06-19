import '@tanstack/react-table';

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData, TValue> {
        className?: string; // apply to both th and td
        tdClassName?: string;
        thClassName?: string;
        selectOptions?: { label: string; value: string }[];
        defaultValue?: string | number; // Add this!
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface TableMeta<TData extends RowData> {
        updateData: (
            rowIndex: number,
            columnId: string,
            value: unknown,
        ) => void;
    }
}
