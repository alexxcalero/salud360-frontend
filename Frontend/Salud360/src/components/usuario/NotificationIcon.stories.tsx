import { Meta, StoryObj } from "@storybook/react";

import NotificationIcon from "./NotificationIcon";
import { UsuarioProvider } from "@/hooks/useUsuario";

const meta: Meta<typeof NotificationIcon> = {
  component: NotificationIcon,
  decorators: [
    (Story) => (
      <UsuarioProvider>
        <div className="flex justify-end p-4 bg-black">
          <Story />
        </div>
      </UsuarioProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof NotificationIcon>;
export const Default: Story = {};
