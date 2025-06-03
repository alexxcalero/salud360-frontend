import { Meta, StoryObj } from "@storybook/react";

import Calendario from "./Calendario";

const meta: Meta<typeof Calendario> = {
  title: "Calendar/Calendar",
  component: Calendario,
};

export default meta;

type Story = StoryObj<typeof Calendario>;
export const Default: Story = {};
