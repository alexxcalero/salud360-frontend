import { IComunidad } from "@/models/comunidad";
import { IMembresia } from "@/models/membresia";

export const setPendingMembership = (
  comunidad: IComunidad,
  membresia: IMembresia
) => {
  localStorage.setItem("targeted_community", JSON.stringify(comunidad));
  localStorage.setItem("targeted_membership", JSON.stringify(membresia));
};

export const getPendingMembership = () => {
  const comunidad = JSON.parse(
    localStorage.getItem("targeted_community") ?? "null"
  ) as IComunidad | null;
  const membresia = JSON.parse(
    localStorage.getItem("targeted_membership") ?? "null"
  ) as IMembresia | null;
  return {
    comunidad,
    membresia,
  };
};

export const clearPendingMembership = () => {
  localStorage.setItem("targeted_community", "null");
  localStorage.setItem("targeted_membership", "null");
};
