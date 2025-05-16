import { Meta, StoryObj } from "@storybook/react";

import MethodCard from "./CardMetodoPago";

const meta: Meta<typeof MethodCard> = {
  component: MethodCard,
};

export default meta;

type Story = StoryObj<typeof MethodCard>;
export const Default: Story = {
  args: {
    method: "mastercard",
    numero: "1234567890123456",
  },
};
