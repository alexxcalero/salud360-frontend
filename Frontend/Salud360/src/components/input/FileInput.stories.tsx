import { Meta, StoryObj } from "@storybook/react";

import Comp from "@/components/input/FileInput";

const meta: Meta<typeof Comp> = {
  component: Comp,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Comp>;
export const Default: Story = {
  args: {
    name: "archivo",
    details: "CSV",
    multiple: true,
  },
};
