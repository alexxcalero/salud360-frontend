import { z } from "zod";
import { DateTime } from "luxon";

// Función que transforma DateTime según el nombre del campo
export const dynamicDateTimeSerializer = (key: string) =>
  z
    .custom<DateTime>((val) => val instanceof DateTime && val.isValid)
    .transform((val) => {
      if (key.toLowerCase().includes("hora")) {
        return val.toFormat("HH:mm");
      } else if (key.toLowerCase().includes("fecha")) {
        return val.toISO();
      } else {
        return val.toISO(); // fallback
      }
    });

export const buildSchema = <T extends Record<string, any>>(shape: {
  [K in keyof T]: string extends K ? never : DateConstructor;
}) => {
  const entries = Object.keys(shape).map((key) => [
    key,
    dynamicDateTimeSerializer(key),
  ]);
  return z.object(Object.fromEntries(entries));
};
