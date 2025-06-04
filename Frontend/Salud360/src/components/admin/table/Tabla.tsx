"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Row,
  type Table as ReactTable,
} from "@tanstack/react-table";
import { Frown, Info, Pencil, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import colors from "tailwindcss/colors";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Salud360Column } from "./table";
import dataColumnsGenerator from "./dataColumnsGenerator";
import SelecctionActions from "./SelecctionActions";
import { TableActions } from "./TableActions";
import Pagination from "./Pagination";

export default function Tabla<Data extends Record<string, any>>({
  idKey,
  columns,
  actions,
  actionButton,
}: {
  idKey: keyof Data;
  columns: Partial<Record<keyof Data, Salud360Column>>;
  actions?: {
    details?: (id: any) => void;
    edit?: (id: any) => void;
    delete?: (id: any) => void;
  };
  actionButton?: React.ReactNode;
}) {
  const headers: ColumnDef<Data>[] = [
    {
      id: "select",
      header: ({ table }: { table: ReactTable<Data> }) => (
        <Checkbox
          className="data-[state=checked]:bg-white data-[state=checked]:border-white data-[state=checked]:text-blue-500"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: boolean) =>
            table.toggleAllPageRowsSelected(value)
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }: { row: Row<Data> }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...dataColumnsGenerator({ columns }),
  ];

  if (actions)
    headers.push({
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: Row<Data> }) => {
        const id = row.getValue(idKey as string);
        return (
          <div className="flex gap-1">
            {actions.details && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (actions.details) actions.details(id);
                }}
              >
                <Info color="blue" />
              </Button>
            )}
            {actions.edit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (actions.edit) actions.edit(id);
                }}
              >
                <Pencil color="orange" />
              </Button>
            )}
            {actions.delete && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Trash color="red" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <h2 className="text-lg font-semibold">Details</h2>
                  </DialogHeader>
                  <div className="p-4">
                    {/* Here you can render the details of the row */}
                    <p>Details for ID:</p>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        );
      },
    });

  return ({ rows }: { rows: Data[] }) => {
    const [sorting, setSorting] = React.useState<SortingState>([
      { id: idKey as string, desc: false },
    ]);
    const [columnFilters, setColumnFilters] =
      React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
      data: rows,
      columns: headers,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
      },
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 20,
        },
      },
    });

    return (
      <div className="w-full">
        <SelecctionActions table={table} actions={actions} />
        <TableActions table={table} actionButton={actionButton} />
        <div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <TableHead
                        key={header.id}
                        className={`text-white font-medium bg-blue-500 ${
                          index === 0 ? "rounded-l-md" : ""
                        } ${
                          index === headerGroup.headers.length - 1
                            ? "rounded-r-md"
                            : ""
                        }`}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
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
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell
                        key={cell.id}
                        className={`${index === 0 ? "rounded-l-md" : ""} ${
                          index === row.getVisibleCells().length - 1
                            ? "rounded-r-md"
                            : ""
                        }`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={headers.length}
                    className={`h-24 text-center`}
                  >
                    <div className="flex flex-col items-center">
                      <Frown size={48} color={colors.blue[500]} />
                      <span className="text-blue-500 text-body-medium font-semibold">
                        No results
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <Pagination table={table} />
      </div>
    );
  };
}
