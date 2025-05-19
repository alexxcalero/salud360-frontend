import { Meta, StoryObj } from "@storybook/react";

import ProfileIcon from "./ProfileIcon";
import { UsuarioProvider } from "@/hooks/useUsuario";

const meta: Meta<typeof ProfileIcon> = {
  component: ProfileIcon,
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

type Story = StoryObj<typeof ProfileIcon>;
export const Default: Story = {};
