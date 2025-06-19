import { Meta, StoryObj } from "@storybook/react";

import PasswordInput from "./PasswordInput";

const meta: Meta<typeof PasswordInput> = {
  component: PasswordInput,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      description: "Texto que indica que acción realizar",
    },
    //Se cambio idName por name
    name: {
      description:
        "Identificador del input; además que también funciona como nombre de form-data. *Servirá para el label también*",
    },
    label: {
      description:
        "Texto a mostrarse en el label. **Si el string está vacío, el label no ocupa espacio**",
    },
    defaultValue: {
      description:
        "Valor por defecto del input. Esto es más que nada para no afectar a la entrada de datos",
    },
    className: {
      description: "Clases/Sintaxis Tailwind para modificar el input",
    },
    disabled: {
      description: "¿Está deshabilitado?",
    },
    required: {
      description: "¿El input es requerido?",
    },
    onChange: {
      description: "Función que se activará cuando cambie el input",
    },
  },
};

export default meta;

type Story = StoryObj<typeof PasswordInput>;
export const Default: Story = {
  args: {
    placeholder: "Ingrese su contrasenha aquí",
    //se cambio el idname por name
    name: "contrasenha",
    label: "Contraseña",
    defaultValue: "CuevaChad123",
    className: "",
    disabled: false,
    onChange: () => {},
    required: true,
  },
};
