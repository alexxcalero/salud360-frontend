import { Meta, StoryObj } from "@storybook/react";

import CardCalendario from "./CardCalendario";

const meta: Meta<typeof CardCalendario> = {
  component: CardCalendario,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Se refiere a la variante de color",
    },
    nombreServicio: {
      description: "Nombre del servicio",
    },
    titulo: {
      description: "Título para la reserva",
    },
    state: {
      description:
        "Es el estado de la reserva. Por ejemplo si está disponible o lleno",
    },
    totalCapacity: {
      description:
        "Capacidad total de la reserva. **Solo aplica si está disponible**",
      if: { arg: "state", eq: "available" },
    },
    currentCapacity: {
      description:
        "Capacidad actual de la reserva; es decir, cantidad de usuarios inscritos. **Solo aplica si está disponible**",
      if: { arg: "state", eq: "available" },
    },
    showBadge: {
      description: "Mostrar o no el badge",
    },
  },
};

export default meta;

type Story = StoryObj<typeof CardCalendario>;
export const Default: Story = {
  args: {
    variant: "blue",
    nombreServicio: "Consulta médica",
    titulo: "Consulta médica con el Dr. Juan Pérez",
    state: "available",
    totalCapacity: 10,
    currentCapacity: 5,
  },
};
