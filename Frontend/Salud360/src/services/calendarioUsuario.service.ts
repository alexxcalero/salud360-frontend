import { citaMedicaSchema, citaMedicaType } from "@/schemas/citaMedica";
import { claseSchema, claseType } from "@/schemas/clase";

export const getCalendarData = async (): Promise<
  [citaMedicaType[], claseType[]]
> => {
  const data = [
    {
      idCitaMedica: 1,
      hora: "2025-06-01T08:00:00",
      fecha: "2025-06-01",
      estado: "available",
      medico: {
        idUsuario: 101,
        nombres: "Ana",
        apellidos: "Pérez",
        numeroDocumento: "12345678",
        correo: "ana.perez@clinica.com",
        especialidad: "Cardiología",
        descripcion: "Especialista en enfermedades cardiovasculares.",
      },
    },
    {
      idCitaMedica: 2,
      hora: "2025-06-02T09:30:00",
      fecha: "2025-06-02",
      estado: "canceled",
      medico: {
        idUsuario: 102,
        nombres: "Luis",
        apellidos: "García",
        numeroDocumento: "87654321",
        correo: "luis.garcia@hospital.com",
        especialidad: "Pediatría",
        descripcion: "Experto en cuidado infantil.",
      },
    },
    {
      idCitaMedica: 3,
      hora: "2025-06-03T11:15:00",
      fecha: "2025-06-03",
      estado: "suscribed",
      medico: {
        idUsuario: 103,
        nombres: "Marta",
        apellidos: "López",
        numeroDocumento: "11223344",
        correo: "marta.lopez@salud.com",
        especialidad: "Neurología",
        descripcion: "Neuróloga con más de 10 años de experiencia.",
      },
    },
    {
      idCitaMedica: 4,
      hora: "2025-06-04T13:00:00",
      fecha: "2025-06-04",
      estado: "soon",
      medico: {
        idUsuario: 104,
        nombres: "Pedro",
        apellidos: "Ramírez",
        numeroDocumento: "44332211",
        correo: "pedro.ramirez@clinica.com",
        especialidad: "Dermatología",
        descripcion: "Tratamiento de enfermedades de la piel.",
      },
    },
    {
      idCitaMedica: 5,
      hora: "2025-06-05T15:45:00",
      fecha: "2025-06-05",
      estado: "full",
      medico: {
        idUsuario: 105,
        nombres: "Laura",
        apellidos: "González",
        numeroDocumento: "99887766",
        correo: "laura.gonzalez@hospital.com",
        especialidad: "Ginecología",
        descripcion: "Atención integral en salud femenina.",
      },
    },
  ];

  const data2 = [
    {
      idClase: 1,
      nombre: "Yoga para principiantes",
      horaInicio: "2025-06-01T08:00:00",
      horaFin: "2025-06-01T09:00:00",
      fecha: "2025-06-01",
      capacidad: 20,
      cantAsistentes: 12,
      estado: "available",
    },
    {
      idClase: 2,
      nombre: "Pilates intermedio",
      horaInicio: "2025-06-02T10:30:00",
      horaFin: "2025-06-02T11:30:00",
      fecha: "2025-06-02",
      capacidad: 15,
      cantAsistentes: 15,
      estado: "full",
    },
    {
      idClase: 3,
      nombre: "Zumba avanzada",
      horaInicio: "2025-06-03T17:00:00",
      horaFin: "2025-06-03T18:00:00",
      fecha: "2025-06-03",
      capacidad: 25,
      cantAsistentes: 5,
      estado: "soon",
    },
    {
      idClase: 4,
      nombre: "Funcional para adultos mayores",
      horaInicio: "2025-06-04T07:00:00",
      horaFin: "2025-06-04T08:00:00",
      fecha: "2025-06-04",
      capacidad: 10,
      cantAsistentes: 8,
      estado: "suscribed",
    },
    {
      idClase: 5,
      nombre: "Stretching",
      horaInicio: "2025-06-05T19:00:00",
      horaFin: "2025-06-05T19:45:00",
      fecha: "2025-06-05",
      capacidad: 12,
      cantAsistentes: 0,
      estado: "canceled",
    },
  ];
  return [
    data.map((elem) => citaMedicaSchema.parse(elem)),
    data2.map((elem) => claseSchema.parse(elem)),
  ];
};

export const reservarCitaMedica = async (idCitaMedica: number) => {
  //console.log(idCitaMedica);
  return true;
};

export const getCitasSimilares = async (
  _idCitaMedica: number
): Promise<citaMedicaType[]> => {
  return [];
};

export const postergarCitaMedicaQuery = async (
  _idCitaMedica: number,
  _nuevaIdCitaMedica: number,
  _descripcion: string
): Promise<boolean> => {
  return true;
};
