import { IComunidad } from "@/models/comunidad";
import { IMembresia } from "@/models/membresia";
import { DateTime } from "luxon";

export const setPendingMembership = (
  comunidad: IComunidad,
  membresia: IMembresia
) => {
  localStorage.setItem("targeted_community", JSON.stringify(comunidad));
  localStorage.setItem("targeted_membership", JSON.stringify(membresia));
  localStorage.setItem(
    "membreship_datetime_limit",
    DateTime.now().plus({ minute: 30 }).toISO()
  );
};

export const getPendingMembership = () => {
  const tiempoFaltante = DateTime.fromISO(
    localStorage.getItem("membreship_datetime_limit") ?? DateTime.now().toISO()
  );

  if (tiempoFaltante <= DateTime.now()) {
    clearPendingMembership();
    return {
      comunidad: null,
      membresia: null,
      tiempoFaltante: null,
    };
  }

  const comunidad = JSON.parse(
    localStorage.getItem("targeted_community") ?? "null"
  ) as IComunidad | null;
  const membresia = JSON.parse(
    localStorage.getItem("targeted_membership") ?? "null"
  ) as IMembresia | null;
  return {
    comunidad,
    membresia,
    tiempoFaltante,
  };
};

export const clearPendingMembership = () => {
  localStorage.setItem("targeted_community", "null");
  localStorage.setItem("targeted_membership", "null");
  localStorage.setItem("membreship_datetime_limit", "null");
};
