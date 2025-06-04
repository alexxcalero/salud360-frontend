import { Button } from "@/components/ui/button";
import FabianButton from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { ChevronDown, Columns3, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import React, { FormEvent, useState } from "react";
import FileInput from "@/components/input/FileInput";

export function TableActions<Data>({
  table,
  actionButton,
}: {
  table: Table<Data>;
  actionButton?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
  };
  return (
    <div className="flex items-center justify-between py-4">
      <Input
        placeholder="Buscar..."
        onChange={(event) => table.setGlobalFilter(String(event.target.value))}
        className="max-w-sm"
      />
      <div className="flex items-center gap-2">
        {/* Columnas */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <Columns3 /> Columnas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Subir archivos */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <FabianButton>
              <Upload /> Subir Datos
            </FabianButton>
          </DialogTrigger>
          <DialogContent>
            <form
              className="flex gap-4 flex-col"
              onSubmit={(e) => submitHandler(e)}
            >
              <DialogTitle>
                <Label className="text-body-medium font-semibold">
                  Archivo a subir (formato: .csv)
                </Label>
              </DialogTitle>
              <FileInput name="archivo" details="CSV" accept=".csv" />
              <div className="flex items-center justify-end gap-2">
                <FabianButton variant="outline">Cancelar</FabianButton>
                <FabianButton type="submit">Subir</FabianButton>
              </div>
            </form>
          </DialogContent>

          {/* Action btn */}
          {actionButton}
        </Dialog>
      </div>
    </div>
  );
}
