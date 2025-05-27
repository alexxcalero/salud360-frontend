import { Meta, StoryObj } from "@storybook/react";

import Comp from "@/components/ModalError";

const meta: Meta<typeof Comp> = {
  title: "Modals/ModalError",
  component: Comp,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Comp>;
export const Default: Story = {
  args: {},
};
