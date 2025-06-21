import { Meta, StoryObj } from "@storybook/react";

import ProfileIcon from "./ProfileIcon";

const meta: Meta<typeof ProfileIcon> = {
  component: ProfileIcon,
  decorators: [
    (Story) => (
      <div className="flex justify-end p-4 bg-black">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ProfileIcon>;
export const Default: Story = {};
