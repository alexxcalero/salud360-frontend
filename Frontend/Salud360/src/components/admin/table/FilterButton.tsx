import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import colors from "tailwindcss/colors";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Column } from "@tanstack/react-table";
import { Filter, FilterX, Star } from "lucide-react";
import { DateTime } from "luxon";
import { DateRange } from "react-day-picker";

function ClearFilterButton<Data>({ column }: { column: Column<Data> }) {
  return (
    <Button
      variant="outline"
      className="mt-4"
      onClick={() => column.setFilterValue(undefined)}
    >
      <FilterX />
      Quitar filtro
    </Button>
  );
}

function FilterButton<Data>({
  children,
  column,
}: {
  children?: React.ReactNode;
  column: Column<Data>;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="ring-0 outline-none focus:ring-0 focus:outline-none focus-within:ring-0 focus-within:outline-none">
          <Filter
            size={16}
            className="hover:text-blue-200 transition-colors duration-150 ease-out"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-4 flex flex-col">
        {children}
        <ClearFilterButton column={column} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function FilterButtonWithText<Data>({
  column,
  label,
}: {
  column: Column<Data>;
  label: string;
}) {
  return (
    <FilterButton column={column}>
      <input
        placeholder={`Filtrar ${label}`}
        value={(column.getFilterValue() as string) ?? ""}
        onChange={(event) => column.setFilterValue(event.target.value)}
        className="max-w-sm p-2 border-b-2 bg-white rounded-none focus-within:ring-0 focus:ring-0 focus-within:outline-none focus:border-blue-500"
      />
    </FilterButton>
  );
}

export function FilterButtonWithNumber<Data>({
  column,
}: {
  column: Column<Data>;
}) {
  return (
    <FilterButton column={column}>
      <div className="flex gap-4">
        <input
          placeholder="Mínimo"
          value={
            (column.getFilterValue() as [number, number])?.[0].toString() ?? ""
          }
          onChange={(event) =>
            column.setFilterValue((old: [number, number]) => [
              Number(event.target.value),
              old?.[1],
            ])
          }
          type="number"
          className="max-w-sm p-2 border-b-2 bg-white rounded-none focus-within:ring-0 focus:ring-0 focus-within:outline-none focus:border-blue-500"
        />
        <input
          placeholder="Máximo"
          value={
            (column.getFilterValue() as [number, number])?.[1].toString() ?? ""
          }
          onChange={(event) =>
            column.setFilterValue((old: [number, number]) => [
              old?.[0],
              Number(event.target.value),
            ])
          }
          type="number"
          className="max-w-sm p-2 border-b-2 bg-white rounded-none focus-within:ring-0 focus:ring-0 focus-within:outline-none focus:border-blue-500"
        />
      </div>
    </FilterButton>
  );
}

export function FilterButtonWithDate<Data>({
  column,
}: {
  column: Column<Data>;
}) {
  return (
    <FilterButton column={column}>
      <Calendar
        mode="range"
        selected={
          (column.getFilterValue() as [DateTime, DateTime] | undefined)
            ? {
                from:
                  (
                    column.getFilterValue() as [DateTime, DateTime]
                  )?.[0].toJSDate() ?? new Date(),
                to: (
                  column.getFilterValue() as [DateTime, DateTime]
                )?.[1]?.toJSDate(),
              }
            : undefined
        }
        onSelect={(range: DateRange | undefined) => {
          const min = DateTime.fromJSDate(range?.from ?? new Date());
          const max = range?.to ? DateTime.fromJSDate(range.to) : undefined;
          column.setFilterValue([min, max]);
        }}
      />
    </FilterButton>
  );
}

export function FilterButtonWithTime<Data>({
  column,
}: {
  column: Column<Data>;
}) {
  return (
    <FilterButton column={column}>
      <div className="flex gap-4">
        <input
          placeholder="Mínimo"
          value={(column.getFilterValue() as [string, string])?.[0] ?? ""}
          onChange={(event) =>
            column.setFilterValue((old: [string, string]) => [
              event.target.value,
              old?.[1],
            ])
          }
          type="time"
          className="max-w-sm p-2 border-b-2 bg-white rounded-none focus-within:ring-0 focus:ring-0 focus-within:outline-none focus:border-blue-500"
        />
        <input
          placeholder="Máximo"
          value={(column.getFilterValue() as [string, string])?.[1] ?? ""}
          onChange={(event) =>
            column.setFilterValue((old: [string, string]) => [
              old?.[0],
              event.target.value,
            ])
          }
          type="time"
          className="max-w-sm p-2 border-b-2 bg-white rounded-none focus-within:ring-0 focus:ring-0 focus-within:outline-none focus:border-blue-500"
        />
      </div>
    </FilterButton>
  );
}

export function FilterButtonWithScore<Data>({
  column,
}: {
  column: Column<Data>;
}) {
  return (
    <FilterButton column={column}>
      <div className="mb-2">
        <span>Mínimo</span>
        <div>
          {Array.from({ length: 5 }, (_, i) => (
            <button
              onClick={() =>
                column.setFilterValue((old: [number, number]) => [
                  i + 1,
                  old?.[1],
                ])
              }
            >
              <Star
                key={i}
                size={18}
                color={
                  ((column.getFilterValue() as [number, number])?.[0] ??
                    -Infinity) >=
                  i + 1
                    ? colors.amber["500"]
                    : colors.neutral["400"]
                }
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <span>Máximo</span>
        <div>
          {Array.from({ length: 5 }, (_, i) => (
            <button
              onClick={() =>
                column.setFilterValue((old: [number, number]) => [
                  old?.[0],
                  i + 1,
                ])
              }
            >
              <Star
                key={i}
                size={18}
                color={
                  ((column.getFilterValue() as [number, number])?.[1] ??
                    +Infinity) >=
                  i + 1
                    ? colors.amber["500"]
                    : colors.neutral["400"]
                }
              />
            </button>
          ))}
        </div>
      </div>
    </FilterButton>
  );
}
