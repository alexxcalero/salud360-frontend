import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination<Data>({ table }: { table: Table<Data> }) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex items-center gap-2">
        <Select
          value={table.getState().pagination.pageSize.toString()}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="w-max">
            <SelectValue placeholder="Selecciona una forma de paginar" />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50].map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft /> Anterior
        </Button>
        <div>
          Página <strong>{table.getState().pagination.pageIndex + 1}</strong> de{" "}
          <strong>{table.getPageCount()}</strong>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
