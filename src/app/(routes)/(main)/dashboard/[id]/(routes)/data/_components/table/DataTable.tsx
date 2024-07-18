"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useModal } from "@/hooks/useModal";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export default function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) { 
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const { onOpen } = useModal();

    return (
        <div className="h-fit">
            <Table className="overflow-y-auto max-h-[1/2]">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                onClick={() => {
                                    onOpen("delete", {
                                        value: row.getValue("value"),
                                        date: row.getValue("date")
                                    })
                                }}
                                className="cursor-pointer"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No data
                                </TableCell>
                            </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}