import Button from "@/components/Button";
import Input from "@/components/input/Input";
import SelectLabel from "@/components/SelectLabel";
import { IComunidad } from "@/models/comunidad";
import { IMembresia } from "@/models/membresia";
import { useState } from "react";

const DetallesMembresia = ({
  comunidad,
  membresia,
  setMembresia,
}: {
  comunidad: IComunidad;
  membresia: IMembresia;
  setMembresia: (_: IMembresia) => void;
}) => {
  const [selectInput, setSelectInput] = useState<string | undefined>(
    membresia.idMembresia?.toString()
  );
  return (
    <div className="bg-white flex gap-3 flex-col">
      <SelectLabel
        label="Cambiar membresía"
        options={
          comunidad.membresias?.map((m) => ({
            value: m.idMembresia?.toString() ?? "",
            content: `${m?.nombre} - ${new Intl.NumberFormat("es-PE", {
              style: "currency",
              currency: "PEN",
            }).format(m?.precio ?? 0)}`,
          })) ?? []
        }
        htmlFor="membresia"
        placeholder="Seleccione una membresía"
        value={selectInput}
        onChange={(val) => {
          if (!comunidad.membresias) return;
          setMembresia(
            comunidad.membresias?.find(
              (m) => m.idMembresia?.toString() === selectInput
            ) ?? comunidad.membresias[0]
          );
          setSelectInput(val);
        }}
      />
      <hr />

      <h2 className="text-left">{membresia.nombre}</h2>

      <p className="text-left">{membresia.descripcion}</p>

      <div className="pb-2 border-b-1 border-neutral-400 w-full text-left">
        <h3 className="w-full">
          Total{" "}
          <span className="text-end">
            {new Intl.NumberFormat("es-PE", {
              style: "currency",
              currency: "PEN",
            }).format(membresia?.precio ?? 0)}
          </span>
        </h3>
      </div>

      <div className="gap-2 items-end grid grid-cols-[1fr_auto]">
        <Input
          name="codigo-promocional"
          label="Código promocional"
          className="grow-1"
          placeholder="Ingrese su código promocional"
        />
        <Button>Aplicar</Button>
      </div>
    </div>
  );
};

export default DetallesMembresia;
