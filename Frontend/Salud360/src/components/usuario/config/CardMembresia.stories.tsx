import { Meta, StoryObj } from "@storybook/react";

import CardMembresia from "./CardMembresia";

const meta: Meta<typeof CardMembresia> = {
  component: CardMembresia,
};

export default meta;

type Story = StoryObj<typeof CardMembresia>;
export const Default: Story = {
  args: {
    comunidad: "Comunidad de Salud360",
    precio: 100,
    fechaRenovacion: "2023-10-01",
    state: "Activa",
    selected: false,
  },
};
