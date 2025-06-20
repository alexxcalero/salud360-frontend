import { Meta, StoryObj } from "@storybook/react";

import NotificationIcon from "./NotificationIcon";

const meta: Meta<typeof NotificationIcon> = {
  component: NotificationIcon,
  decorators: [
    (Story) => (
      <div className="flex justify-end p-4 bg-black">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof NotificationIcon>;
export const Default: Story = {};
