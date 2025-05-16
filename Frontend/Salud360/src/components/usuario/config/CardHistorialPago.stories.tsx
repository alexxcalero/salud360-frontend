import { Meta, StoryObj } from "@storybook/react";

import CardHistorialPago from "./CardHistorialPago";

const meta: Meta<typeof CardHistorialPago> = {
  component: CardHistorialPago,
};

export default meta;

type Story = StoryObj<typeof CardHistorialPago>;
export const Default: Story = {
  args: {
    identificadorTransaccion: "1234567890",
    nombreComunidad: "Comunidad de Salud360",
    precio: 100,
    fechaPago: "2023-10-01",
  },
};
