import { Meta, StoryObj } from "@storybook/react";

import UnifiedInput from "./Input";
import { Mail, ChevronDown } from "lucide-react";

const meta: Meta<typeof UnifiedInput> = {
  component: UnifiedInput,
  tags: ["autodocs"],
  argTypes: {
    type: {
      description: "Tipo de input. Por ejemplo: text, date, email",
    },
    placeholder: {
      description: "Texto que indica que acción realizar",
    },
    leftIcon: {
      description: "Ícono a mostrarse en la izquierda",
    },
    rightIcon: {
      description: "Ícono a mostrarse en la derecha",
    },
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

type Story = StoryObj<typeof UnifiedInput>;
export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Ingrese su texto aquí",
    leftIcon: <Mail />,
    rightIcon: <ChevronDown />,
    name: "unified-input",
    label: "Texto de ejemplo",
    className: "",
    disabled: false,
    onChange: () => {},
    required: true,
  },
};
