/*
=============================================================================================================
DEPRECATED
=============================================================================================================
*/

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreVertical,
  Trash,
} from "lucide-react";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import Button from "@/components/Button";

type ColumnTypes =
  | "text"
  | "number"
  | "date"
  | "image"
  | "boolean"
  | "tag"
  | "multi-tag"
  | "score";

interface Column {
  label: string;
  type: ColumnTypes;
}

interface Props<T extends object> {
  idKey: keyof T;
  onCheckedChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  columns: Record<keyof T, Column>;
  rows: T[];
  navToDetails?: (id: any) => void;
  navToEdit?: (id: any) => void;
  deleteModalFunc?: (id: any) => void;
}

function Table<T extends object>({
  idKey,
  onCheckedChange,
  columns,
  rows,
}: Props<T>) {
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(20);

  const [sortByKey, setSortByKey] = useState<{
    key?: keyof T;
    ord: number;
  }>({ ord: 0 });

  const [data, setData] = useState<T[]>(rows);
  const [filterCriterias, setFilterCriterias] = useState<
    Record<keyof T, string | { min: number; max: number } | boolean>
  >({} as Record<keyof T, string | { min: number; max: number } | boolean>);

  // const [seleccionados, setSeleccionados] = useState<Set<number>>(new Set());

  const selectAllInputRef = useRef<HTMLInputElement>(null);
  const [seleccionados, setSeleccionados] = useState<number[]>([]);

  const toggleTodo = () => {
    if (!selectAllInputRef.current) return;
    if (selectAllInputRef.current.checked)
      setSeleccionados(data.map((r) => r[idKey] as number));
    else setSeleccionados([]);
  };

  const toggleUno = (id: number) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    let newData = [...rows];
    Object.entries(filterCriterias).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) return;

      newData = newData.filter((row) => {
        const cellValue = row[key as keyof T];
        if (typeof cellValue === "string") {
          return (cellValue as string)
            .toLowerCase()
            .includes((value as string).toLowerCase());
        } else if (typeof cellValue === "number") {
          const { min, max } = value as { min: number; max: number };
          return (
            (min === undefined || cellValue >= min) &&
            (max === undefined || cellValue <= max)
          );
        } else if (typeof cellValue === "boolean") {
          return cellValue === value;
        }
        return true;
      });
    });
    setData(newData);
    if (selectAllInputRef.current?.checked)
      setSeleccionados(newData.map((r) => r[idKey] as number));
  }, [rows, filterCriterias]);

  const sortDataFunc = useCallback(
    (type: ColumnTypes, key: keyof T, ord: "asc" | "desc" = "asc") => {
      if (type === "image" || type === "multi-tag" || type === "boolean")
        return;

      const dir = ord === "asc" ? 1 : -1;
      const compFuncs = {
        number: (a: T, b: T) => ((a[key] as number) - (b[key] as number)) * dir,
        date: (a: T, b: T) =>
          (new Date(a[key] as Date).getTime() -
            new Date(b[key] as Date).getTime()) *
          dir,
        text: (a: T, b: T) =>
          (a[key] as string).localeCompare(b[key] as string) * dir,
        tag: (a: T, b: T) =>
          (a[key] as string).localeCompare(b[key] as string) * dir,
        score: (a: T, b: T) => ((a[key] as number) - (b[key] as number)) * dir,
      };

      const func = compFuncs[type];

      setData((prevData) => [...prevData].sort(func));
    },
    [data]
  );

  return (
    <div className="w-max max-w-full h-max px-6 py-4 overflow-x-scroll">
      {seleccionados.length >= 1 && (
        <div className="sticky top-0 left-0 mb-2 flex gap-0 bg-white items-center border-1 border-neutral-300 rounded-md font-medium text-body-small h-10 w-max">
          <div className="px-4">
            <span>{seleccionados.length} seleccionado(s)</span>
          </div>
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
                    ¿Estás seguro de que deseas eliminar los{" "}
                    {seleccionados.length}
                    elementos seleccionados?
                  </p>
                  <div className="flex justify-end gap-2">
                    <DialogClose>
                      <Button>Cancelar</Button>
                    </DialogClose>

                    <Button
                      variant="danger"
                      onClick={() => {
                        // Aquí iría la lógica para eliminar los elementos seleccionados
                        setSeleccionados([]);
                      }}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
      <table>
        <thead className="h-[50px] border-separate border-spacing-0">
          <tr className="bg-blue-700 text-white">
            <th className="px-4 py-2 rounded-l-lg">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  ref={selectAllInputRef}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    toggleTodo();
                    if (onCheckedChange) onCheckedChange(e);
                  }}
                />
              </div>
            </th>
            {(Object.entries(columns) as [string, Column][]).map(
              ([key, col]) => (
                <th key={key} className={`px-4 py-2`}>
                  <div className="flex items-center gap-2">
                    <span>{col.label}</span>

                    {col.type !== "image" && col.type !== "multi-tag" && (
                      <>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button>
                              <Filter size={16} />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-72">
                            {col.type === "text" && (
                              <>
                                <input
                                  type="text"
                                  placeholder={`Filtrar por ${col.label}`}
                                  className="w-full p-2 border-b-2 bg-white rounded-none focus-within:ring-0 focus:ring-0 focus-within:outline-none focus:border-blue-500"
                                  defaultValue={
                                    (filterCriterias[
                                      key as keyof T
                                    ] as string) ?? ""
                                  }
                                  onChange={(e) => {
                                    const filterValue =
                                      e.target.value.toLowerCase();
                                    setFilterCriterias((prev) => ({
                                      ...prev,
                                      [key as keyof T]: filterValue,
                                    }));
                                  }}
                                />
                              </>
                            )}
                            {col.type === "number" && (
                              <>
                                <div className="flex gap-2">
                                  <input
                                    type="number"
                                    placeholder={`Mínimo de ${col.label}`}
                                    className="w-full p-2 border-b-2 bg-white rounded-none focus-within:ring-0 focus:ring-0 focus-within:outline-none focus:border-blue-500"
                                    defaultValue={
                                      ((
                                        filterCriterias[key as keyof T] as {
                                          min: number;
                                        }
                                      )?.min?.toString() as string) ?? ""
                                    }
                                    onChange={(e) => {
                                      const filterValue = Number(
                                        e.target.value
                                      );
                                      setFilterCriterias((prev) => ({
                                        ...prev,
                                        [key as keyof T]: {
                                          ...(prev[key as keyof T] as object),
                                          min: filterValue,
                                        },
                                      }));
                                    }}
                                  />
                                  <input
                                    type="number"
                                    placeholder={`Máximo de ${col.label}`}
                                    className="w-full p-2 border-b-2 bg-white rounded-none focus-within:ring-0 focus:ring-0 focus-within:outline-none focus:border-blue-500"
                                    defaultValue={
                                      ((
                                        filterCriterias[key as keyof T] as {
                                          max: number;
                                        }
                                      )?.max?.toString() as string) ?? ""
                                    }
                                    onChange={(e) => {
                                      const filterValue = Number(
                                        e.target.value
                                      );
                                      setFilterCriterias((prev) => ({
                                        ...prev,
                                        [key as keyof T]: {
                                          ...(prev[key as keyof T] as object),
                                          max: filterValue,
                                        },
                                      }));
                                    }}
                                  />
                                </div>
                              </>
                            )}
                          </PopoverContent>
                        </Popover>

                        {sortByKey.key === key && sortByKey.ord !== 0 ? (
                          sortByKey.ord === 1 ? (
                            <button
                              onClick={() => {
                                sortDataFunc(col.type, key as keyof T, "desc");
                                setSortByKey({ key: key as keyof T, ord: 2 });
                              }}
                            >
                              <ArrowUp size={16} />
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setData([...rows]);
                                setSortByKey({ key: key as keyof T, ord: 0 });
                              }}
                            >
                              <ArrowDown size={16} />
                            </button>
                          )
                        ) : (
                          <button
                            onClick={() => {
                              sortDataFunc(col.type, key as keyof T);
                              setSortByKey({ key: key as keyof T, ord: 1 });
                            }}
                          >
                            <ArrowUpDown size={16} />
                          </button>
                        )}

                        <Popover>
                          <PopoverTrigger asChild>
                            <button>
                              <MoreVertical size={16} />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-48">
                            <div className="flex flex-col gap-2">
                              <button
                                onClick={() => {
                                  // Implementar lógica de ordenamiento
                                }}
                              >
                                Ordenar por {col.label}
                              </button>
                              <button
                                onClick={() => {
                                  // Implementar lógica de filtrado
                                }}
                              >
                                Filtrar por {col.label}
                              </button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </>
                    )}
                  </div>
                </th>
              )
            )}
            <th className="px-4 py-2 rounded-r-lg">
              <div className="flex items-center gap-2">Acciones</div>
            </th>
          </tr>
        </thead>
        <tbody className="space-y-2">
          {data.slice(0, offset).map((cols, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b-2 gap-4 bg-neutral-100 hover:bg-gray-50" // NUEVO
            >
              <td className="px-4">
                <input
                  type="checkbox"
                  checked={seleccionados.includes(cols[idKey] as number)}
                  onChange={() => toggleUno(cols[idKey] as number)}
                />
              </td>
              {Object.entries(cols).map(([key, col], colIndex) => (
                <td key={colIndex} className={`px-4 py-4`}>
                  {columns[key as keyof T].type === "image" ? (
                    <img
                      src={col}
                      alt={`Imagen de la fila ${rowIndex} y columna ${colIndex}`}
                      className="h-12 aspect-1/1 object-cover rounded-full"
                    />
                  ) : (
                    col
                  )}
                </td>
              ))}
              <td className="px-4">Botones de accion dea</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end gap-4 w-full mt-4">
        <div>
          Filas por página{" "}
          <select
            name=""
            id=""
            onChange={(e) => setOffset(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20" selected>
              20
            </option>
            <option value="25">50</option>
          </select>
        </div>
        <div>
          {(page - 1) * offset + 1} - {rows.length} de {100} resultados
        </div>
        <div>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={(page + 1) * offset > rows.length}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Table;
