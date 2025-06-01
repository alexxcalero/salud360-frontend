import { Meta, StoryObj } from "@storybook/react";

import Comp from "@/components/Spinner";

const meta: Meta<typeof Comp> = {
  title: "Components/common/Spinner",
  component: Comp,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Comp>;
export const Default: Story = {
  args: {},
};
