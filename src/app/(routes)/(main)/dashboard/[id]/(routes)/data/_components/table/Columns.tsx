"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Data = {
    date: Date;
    value: number;
}

const columns: ColumnDef<Data>[] = [
    {
        accessorKey: 'date',
        header: 'Date',
    },
    {
        accessorKey: 'value',
        header: 'Hours',
    }
]

export default columns;