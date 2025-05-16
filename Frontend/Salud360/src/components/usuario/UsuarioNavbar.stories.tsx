import { Meta, StoryObj } from "@storybook/react";

import UsuarioNavbar from "./UsuarioNavbar";

const meta: Meta<typeof UsuarioNavbar> = {
  component: UsuarioNavbar,
};

export default meta;

type Story = StoryObj<typeof UsuarioNavbar>;
export const Default: Story = {};
