import { DateTime } from "luxon";

export function seSolapan(
  a: [DateTime, DateTime] | undefined,
  b: [DateTime, DateTime] | undefined
): boolean {
  if (!a || !b) return false;
  return a[0] < b[1] && b[0] < a[1];
}

export function agruparEventosSolapados<EventoType>(
  eventos: EventoType[],
  obtenerRango: (e: EventoType) => [DateTime, DateTime] | undefined
): EventoType[][] {
  const ordenados = [...eventos].sort((a, b) =>
    (obtenerRango(a)?.[0] ?? -Infinity) > (obtenerRango(b)?.[0] ?? Infinity)
      ? 1
      : -1
  );
  const grupos: EventoType[][] = [];

  for (const evento of ordenados) {
    let colocado = false;

    for (const grupo of grupos) {
      if (
        grupo.every((e) => seSolapan(obtenerRango(e), obtenerRango(evento)))
      ) {
        grupo.push(evento);
        colocado = true;
        break;
      }
    }

    if (!colocado) {
      grupos.push([evento]);
    }
  }

  return grupos;
}
