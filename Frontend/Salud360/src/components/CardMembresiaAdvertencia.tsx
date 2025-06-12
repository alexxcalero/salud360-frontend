"use client";

import { memo, useState } from "react";
import {
  clearPendingMembership,
  getPendingMembership,
} from "@/lib/pendingMembership";
import { X } from "lucide-react";
import { useDialog } from "@/hooks/dialogContext";

const CardMembresiaAdvertencia = () => {
  const membresia = getPendingMembership();
  const [selfDestruct, setSelfDestruct] = useState(false);
  const { callAlertDialog } = useDialog();

  if (!membresia || selfDestruct) return undefined;

  return (
    <div className="p-4 border-1 border-blue-700 bg-blue-200 text-blue-700 rounded-md my-4 flex justify-between">
      <div className="text-left flex flex-col gap-2">
        <p className="text-left">
          Usted está considerando comprar la siguiente membresía:
        </p>
        <p>
          <strong>{membresia.nombre}</strong>
        </p>
        <p className="text-body-medium">
          {new Intl.NumberFormat("es-PE", {
            style: "currency",
            currency: "PEN",
          }).format(membresia?.precio ?? 0)}
        </p>
      </div>
      <div>
        <button
          className="bg-blue-700 text-blue-200 hover:bg-blue-500 transition-colors duration-150 ease-out p-1 rounded-full"
          onClick={() => {
            callAlertDialog({
              title: "Estás seguro de cancelar la membresía pendiente?",
              onConfirm: async () => {
                setSelfDestruct(true);
                clearPendingMembership();
                return false;
              },
            });
          }}
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export default memo(CardMembresiaAdvertencia);
