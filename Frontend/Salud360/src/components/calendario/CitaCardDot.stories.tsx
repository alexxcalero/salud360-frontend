import { Meta, StoryObj } from "@storybook/react";

import Comp from "./CitaCardDot";
import { DateTime } from "luxon";

const meta: Meta<typeof Comp> = {
  title: "Calendar/Dot-Cita",
  component: Comp,
};

export default meta;

type Story = StoryObj<typeof Comp>;
export const Default: Story = {
  args: {
    citaMedica: {
      idCitaMedica: 1,
      fecha: DateTime.now(),
      hora: DateTime.now(),
      estado: "available",
      medico: {
        idUsuario: 1,
        apellidos: "Natividad",
        nombres: "Nathaly",
        descripcion: "",
        correo: "nathaly.natividad@upch.edu.pe",
        especialidad: "Pediatrìa",
        numeroDocumento: "",
      },
    },
  },
};
