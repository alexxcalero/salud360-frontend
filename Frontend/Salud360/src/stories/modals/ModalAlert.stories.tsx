import { Meta, StoryObj } from "@storybook/react";

import Comp from "@/components/ModalAlert";

const meta: Meta<typeof Comp> = {
  title: "Modals/ModalAlert",
  component: Comp,
  tags: ["autodocs"],
  argTypes: {
    modulo: {
      control: "text",
      description: "Nombre del módulo",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Comp>;
export const Default: Story = {
  args: {
    modulo: "Comunidades",
    detalle: "Fallos",
    onCancel: () => alert("Hola"),
  },
};
