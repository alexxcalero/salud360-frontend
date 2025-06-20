import { Meta, StoryObj } from "@storybook/react";

import Comp from "./FormularioTarjeta";

const meta: Meta<typeof Comp> = {
  title: "Form/FormularioTarjeta",
  component: Comp,
};

export default meta;

type Story = StoryObj<typeof Comp>;
export const Default: Story = {
  args: {
    submitHandler: () => {},
    cancelHandler: () => {},
  },
};
