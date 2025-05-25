import { Meta, StoryObj } from "@storybook/react";

import Calendario from "./Calendario";
import { DateTime } from "luxon";

const meta: Meta<typeof Calendario> = {
  component: Calendario,
};

export default meta;

type Story = StoryObj<typeof Calendario>;
export const Default: Story = {
  args: {},
};
