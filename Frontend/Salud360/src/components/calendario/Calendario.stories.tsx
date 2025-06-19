import { Meta, StoryObj } from "@storybook/react";

import Comp from "./Calendario";
import { DateTime } from "luxon";

interface EventoConcrete {
  horaInicio: DateTime;
  horaFin: DateTime;
  nombre: string;
}

const meta: Meta<typeof Comp<EventoConcrete>> = {
  component: Comp<EventoConcrete>,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Comp<EventoConcrete>>;
export const Default: Story = {
  args: {
    cards: {
      month: () => (
        <div className="w-4 h-4 rounded-full bg-blue-300 border-1 border-blue-400"></div>
      ),
      week: (d) => (
        <div className="w-full h-full bg-blue-300 border-1 border-blue-400">
          {d.nombre}
        </div>
      ),
      day: (d) => (
        <div className="w-full h-full bg-blue-300 border-1 border-blue-400">
          {d.nombre}
        </div>
      ),
    },
    fetchData: async () => [
      {
        horaInicio: DateTime.now()
          .set({ minute: 0, second: 0 })
          .plus({ hour: -1 }),
        horaFin: DateTime.now().set({ minute: 0, second: 0 }).plus({ hour: 0 }),
        nombre: "Como estas",
      },
      {
        horaInicio: DateTime.now()
          .set({ minute: 0, second: 0 })
          .plus({ hour: -1 }),
        horaFin: DateTime.now()
          .set({ minute: 0, second: 0 })
          .plus({ hour: 0, minute: 30 }),
        nombre: "Como estas",
      },
      {
        horaInicio: DateTime.now()
          .set({ minute: 0, second: 0 })
          .plus({ hour: -1 }),
        horaFin: DateTime.now().set({ minute: 0, second: 0 }).plus({ hour: 0 }),
        nombre: "Como estas",
      },
      {
        horaInicio: DateTime.now().set({ minute: 0, second: 0 }),
        horaFin: DateTime.now().set({ minute: 0, second: 0 }).plus({ hour: 1 }),
        nombre: "Hola",
      },
      {
        horaInicio: DateTime.now()
          .set({ minute: 0, second: 0 })
          .plus({ minute: 5 }),
        horaFin: DateTime.now()
          .set({ minute: 0, second: 0 })
          .plus({ hour: 1, minute: 5 }),
        nombre: "Como estas",
      },
      {
        horaInicio: DateTime.now()
          .set({ minute: 0, second: 0 })
          .plus({ hour: 2, minute: 5 }),
        horaFin: DateTime.now()
          .set({ minute: 0, second: 0 })
          .plus({ hour: 3, minute: 5 }),
        nombre: "Como estas",
      },
    ],
    getRangeDateFromData: (d) => [d.horaInicio, d.horaFin],
  },
};
