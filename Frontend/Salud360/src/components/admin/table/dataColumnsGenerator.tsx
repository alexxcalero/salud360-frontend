import { Column, ColumnDef, Row, Table } from "@tanstack/react-table";
import colors from "tailwindcss/colors";
import { Salud360Column } from "./table";
import { ArrowDown, ArrowUp, ArrowUpDown, Star } from "lucide-react";
import { DateTime } from "luxon";
import {
  FilterButtonWithDate,
  FilterButtonWithNumber,
  FilterButtonWithScore,
  FilterButtonWithText,
  FilterButtonWithTime,
} from "./FilterButton";
import { filterDate, filterTime } from "./filterFunctions";

function SortingButton<Data>({ column }: { column: Column<Data> }) {
  return (
    <button
      className="ring-0 outline-none focus:ring-0 focus:outline-none focus-within:ring-0 focus-within:outline-none"
      onClick={() => {
        switch (column.getIsSorted()) {
          case false:
            column.toggleSorting(column.getIsSorted() === "asc");
            break;
          case "asc":
            column.toggleSorting(column.getIsSorted() === "asc");
            break;
          case "desc":
            column.clearSorting();
        }
      }}
    >
      {!column.getIsSorted() && (
        <ArrowUpDown
          size={16}
          className="hover:text-blue-200 transition-colors duration-150 ease-out"
        />
      )}
      {column.getIsSorted() === "asc" && (
        <ArrowUp
          size={16}
          className="hover:text-blue-200 transition-colors duration-150 ease-out"
        />
      )}
      {column.getIsSorted() === "desc" && (
        <ArrowDown
          size={16}
          className="hover:text-blue-200 transition-colors duration-150 ease-out"
        />
      )}
    </button>
  );
}

function dataColumnsGenerator<Data extends Record<string, any>>({
  columns,
}: {
  columns: Partial<Record<keyof Data, Salud360Column>>;
}) {
  return (Object.entries(columns) as [string, Salud360Column][]).map(
    ([key, value]) => {
      switch (value.type) {
        case "text":
          return {
            accessorKey: key,
            filterFn: "includesString",
            header: ({ column }: { column: Column<Data> }) => (
              <div className="flex items-center gap-2">
                <span className="font-semibold">{value.label}</span>
                <SortingButton column={column} />
                <FilterButtonWithText column={column} label={value.label} />
              </div>
            ),
            cell: ({ row }: { row: Row<Data> }) => (
              <div>
                <span>{row.getValue(key)}</span>
              </div>
            ),
          };
        case "number":
          return {
            accessorKey: key,
            filterFn: "inNumberRange",
            header: ({
              column,
            }: {
              table: Table<Data>;
              column: Column<Data>;
            }) => (
              <div className="flex items-center gap-2">
                <span className="font-semibold">{value.label}</span>
                <SortingButton column={column} />
                <FilterButtonWithNumber column={column} />
              </div>
            ),
            cell: ({ row }: { row: Row<Data> }) => (
              <span>{row.getValue(key)}</span>
            ),
          };
        case "date":
          return {
            accessorKey: key,
            filterFn: filterDate,
            header: ({
              column,
            }: {
              table: Table<Data>;
              column: Column<Data>;
            }) => (
              <div className="flex items-center gap-2">
                <span className="font-semibold">{value.label}</span>
                <SortingButton column={column} />
                <FilterButtonWithDate column={column} />
              </div>
            ),
            cell: ({ row }: { row: Row<Data> }) => (
              <span>
                {DateTime.fromISO(row.getValue(key), { locale: "pe" }).toFormat(
                  "D",
                  {
                    locale: "pe",
                  }
                )}
              </span>
            ),
          };
        case "time":
          return {
            accessorKey: key,
            filterFn: filterTime,
            header: ({
              column,
            }: {
              table: Table<Data>;
              column: Column<Data>;
            }) => (
              <div className="flex items-center gap-2">
                <span className="font-semibold">{value.label}</span>
                <SortingButton column={column} />
                <FilterButtonWithTime column={column} />
              </div>
            ),
            cell: ({ row }: { row: Row<Data> }) => (
              <span>
                {DateTime.fromISO(row.getValue(key), { locale: "pe" }).toFormat(
                  "HH:mm",
                  {
                    locale: "pe",
                  }
                )}
              </span>
            ),
          };
        case "datetime":
          return {
            accessorKey: key,
            filterFn: (
              row: Row<Data>,
              columnId: string,
              filterValue: any,
              _addMeta: (meta: any) => void
            ) => {
              const rowDate = DateTime.fromISO(row.getValue(columnId));

              const min = filterValue?.[0]
                ? DateTime.fromISO(filterValue[0])
                : null;
              const max = filterValue?.[1]
                ? DateTime.fromISO(filterValue[1])
                : null;

              if (min && rowDate <= min) return false;
              if (max && rowDate >= max) return false;
              return true;
            },
            header: ({
              column,
            }: {
              table: Table<Data>;
              column: Column<Data>;
            }) => (
              <div className="flex items-center gap-2">
                <span className="font-semibold">{value.label}</span>
                <SortingButton column={column} />
                {/* Filtrar */}
              </div>
            ),
            cell: ({ row }: { row: Row<Data> }) => (
              <span>
                {DateTime.fromISO(row.getValue(key), { locale: "pe" }).toFormat(
                  "f",
                  {
                    locale: "pe",
                  }
                )}
              </span>
            ),
          };
        case "image":
          return {
            accessorKey: key,
            header: () => <span className="font-semibold">{value.label}</span>,
            cell: ({ row }: { row: Row<Data> }) => (
              <img
                src={row.getValue(key)}
                alt={value.label}
                className="aspect-1/1 h-12 rounded-full object-cover"
              />
            ),
          };
        case "boolean":
          return {
            accessorKey: key,
            header: () => <span className="font-semibold">{value.label}</span>,
            cell: ({ row }: { row: Row<Data> }) => (
              <div>
                {row.getValue(key) ? (
                  <div className="aspect-1/1 h-4 rounded-full bg-green-400"></div>
                ) : (
                  <div className="aspect-1/1 h-4 rounded-full bg-red-400"></div>
                )}
              </div>
            ),
          };
        case "tag":
          return {
            accessorKey: key,
            header: () => <span className="font-semibold">{value.label}</span>,
            cell: ({ row }: { row: Row<Data> }) => (
              <span className="tag">{row.getValue(key)}</span>
            ),
          };
        case "multi-tag":
          return {
            accessorKey: key,
            header: () => <span className="font-semibold">{value.label}</span>,
            cell: ({ row }: { row: Row<Data> }) => (
              <div className="flex flex-wrap gap-1">
                {(row.getValue(key) as string[]).map((tag: string) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            ),
          };
        case "score":
          return {
            accessorKey: key,
            filterFn: "inNumberRange",
            header: ({ column }: { column: Column<Data> }) => (
              <div className="flex items-center gap-2">
                <span className="font-semibold">{value.label}</span>
                <SortingButton column={column} />
                <FilterButtonWithScore column={column} />
              </div>
            ),
            cell: ({ row }: { row: Row<Data> }) => (
              <div className="flex items-center gap-1">
                {Array.from({ length: row.getValue(key) }, (_, i) => (
                  <Star key={i} size={14} color={colors.amber["500"]} />
                ))}
              </div>
            ),
          };
        default:
          return {
            accessorKey: key,
            header: () => <span className="font-semibold">{value.label}</span>,
            cell: ({ row }: { row: Row<Data> }) => (
              <span>{row.getValue(key)}</span>
            ),
          };
      }
    }
  ) as ColumnDef<Data>[];
}

export default dataColumnsGenerator;
