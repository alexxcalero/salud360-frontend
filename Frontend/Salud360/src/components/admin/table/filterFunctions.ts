import { Row } from "@tanstack/react-table";
import { DateTime } from "luxon";

export function filterDate<Data>(
  row: Row<Data>,
  columnId: string,
  filterValue: [string, string]
) {
  const rowDate = DateTime.fromISO(row.getValue(columnId));

  const min = filterValue?.[0] ? DateTime.fromISO(filterValue[0]) : null;
  const max = filterValue?.[1] ? DateTime.fromISO(filterValue[1]) : null;

  if (min && rowDate <= min) return false;
  if (max && rowDate >= max) return false;
  return true;
}

export function filterTime<Data>(
  row: Row<Data>,
  columnId: string,
  filterValue: string
): boolean {
  const rowValue = row.getValue(columnId) as string; // debe ser ISO string
  if (!rowValue || !filterValue) return true;

  const rowDateTime = DateTime.fromISO(rowValue);
  const filterTime = DateTime.fromFormat(filterValue, "HH:mm");

  if (!rowDateTime.isValid || !filterTime.isValid) return true;

  // Comparamos hora y minuto
  return (
    rowDateTime.hour === filterTime.hour &&
    rowDateTime.minute === filterTime.minute
  );
}
