import Button from "@/components/Button";
import {
  Dialog,
  DialogHeader,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Table } from "@tanstack/react-table";
import { Trash } from "lucide-react";

function SelecctionActions<Data>({
  table,
  actions,
}: {
  table: Table<Data>;
  actions?: {
    details?: (id: any) => void;
    edit?: (id: any) => void;
    delete?: (id: any) => void;
  };
}) {
  return (
    <>
      {table.getFilteredSelectedRowModel().rows.length > 0 && (
        <div className="fixed z-10 bottom-4 left-4 flex gap-0 bg-white items-center border-1 border-neutral-300 rounded-md font-medium text-body-small h-10 w-max">
          <div className="px-4">
            <span>
              {table.getFilteredSelectedRowModel().rows.length} seleccionado(s)
            </span>
          </div>
          {actions?.delete !== undefined && (
            <>
              <div className="w-[1px] h-full bg-neutral-300"></div>
              <div className="px-4 h-full hover:bg-neutral-200 transition-colors duration-200 ease-in-out">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="flex gap-2 items-center h-full">
                      <Trash size={16} color="red" />
                      <span className="text-red-500">Eliminar</span>
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="flex flex-col gap-4">
                      <DialogHeader>
                        <h2 className="text-lg font-semibold">
                          Confirmar eliminación
                        </h2>
                      </DialogHeader>
                      <p>
                        ¿Estás seguro de que deseas eliminar{" "}
                        <strong>
                          {table.getFilteredSelectedRowModel().rows.length}
                        </strong>{" "}
                        elemento(s) seleccionado(s)?
                      </p>
                      <div className="flex justify-end gap-2">
                        <DialogClose>
                          <Button>Cancelar</Button>
                        </DialogClose>

                        <Button
                          variant="danger"
                          onClick={() => {
                            // Aquí iría la lógica para eliminar los elementos seleccionados
                          }}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default SelecctionActions;
