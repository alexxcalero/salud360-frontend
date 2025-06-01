import { Meta, StoryObj } from "@storybook/react";

import Comp from "@/components/ModalConfirmacionLogout";

const meta: Meta<typeof Comp> = {
  title: "modals/ModalConfirmacionLogout",
  component: Comp,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Comp>;
export const Default: Story = {
  args: {},
};
