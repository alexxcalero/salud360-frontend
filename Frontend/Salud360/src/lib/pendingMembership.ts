import { IMembresia } from "@/models/membresia";
import { baseAPI } from "@/services/baseAPI";

export const setPendingMembership = async (idMembresia: number) => {
  const data = (await baseAPI.get(`/membresias/${idMembresia}`))
    .data as IMembresia;
  localStorage.setItem("current_membership", JSON.stringify(data));
};

export const getPendingMembership = () =>
  JSON.parse(
    localStorage.getItem("current_membership") ?? "null"
  ) as IMembresia | null;

export const clearPendingMembership = () => {
  localStorage.setItem("current_membership", "null");
};
