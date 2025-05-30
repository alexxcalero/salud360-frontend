import { Meta, StoryObj } from "@storybook/react";

import TableGenerator from "./Tabla";

interface Data {
  id: number;
  photo: string;
  name: string;
  age: number;
  score: number;
  active: boolean;
  date: string;
  hour: string;
}

const DataTableDemo = TableGenerator<Data>({
  idKey: "id" as keyof Data,
  columns: {
    id: { label: "ID", type: "number" },
    photo: { label: "Photo", type: "image" },
    name: { label: "Name", type: "text" },
    age: { label: "Age", type: "number" },
    score: { label: "Score", type: "score" },
    active: { label: "Active", type: "boolean" },
    date: { label: "Fecha", type: "datetime" },
    hour: { label: "Hora", type: "time" },
  },
  actions: {
    edit: (id) => {
      alert(`Edit ID: ${id}`);
    },
    delete: (id) => {
      alert(`Delete ID: ${id}`);
    },
    details: (id) => {
      alert(`Details for ID: ${id}`);
    },
  },
  actionButton: (
    <button
      className="border-1 border-neutral-300 p-2"
      onClick={() => alert("Hola")}
    >
      Botón de ejemplo
    </button>
  ),
});

const meta: Meta<typeof DataTableDemo> = {
  title: "Table/TanstackTable",
  component: DataTableDemo,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof DataTableDemo>;
export const Default: Story = {
  args: {
    rows: [
      {
        id: 1,
        photo: "https://cdn.waifu.im/7038.jpg",
        name: "John Doe",
        age: 30,
        score: 1,
        active: true,
        date: "2025-05-29T14:30:00",
        hour: "09:00",
      },
      {
        id: 2,
        photo: "https://cdn.waifu.im/7619.png",
        name: "Jane Smith",
        age: 25,
        score: 5,
        active: true,
        date: "2025-05-29T14:30:00",
        hour: "13:00",
      },
      {
        id: 3,
        photo: "https://cdn.waifu.im/7567.jpg",
        name: "Alice Johnson",
        age: 28,
        score: 2,
        active: false,
        date: "2025-05-29T14:30:00",
        hour: "17:00",
      },
      {
        id: 4,
        photo: "https://cdn.waifu.im/7038.jpg",
        name: "Bob Brown",
        age: 35,
        score: 3,
        active: false,
        date: "2025-05-29T14:30:00",
        hour: "10:00",
      },
      {
        id: 5,
        photo: "https://cdn.waifu.im/7619.png",
        name: "Charlie White",
        age: 22,
        score: 3,
        active: true,
        date: "2025-05-29T14:30:00",
        hour: "12:00",
      },
      {
        id: 6,
        photo: "https://cdn.waifu.im/7567.jpg",
        name: "Diana Green",
        age: 27,
        score: 3,
        active: true,
        date: "2025-05-29T14:30:00",
        hour: "11:00",
      },
      {
        id: 7,
        photo: "https://cdn.waifu.im/7038.jpg",
        name: "Ethan Blue",
        age: 31,
        score: 3,
        active: true,
        date: "2025-05-29T14:30:00",
        hour: "13:00",
      },
      {
        id: 8,
        photo: "https://cdn.waifu.im/7619.png",
        name: "Fiona Yellow",
        age: 29,
        score: 3,
        active: true,
        date: "2025-05-29T14:30:00",
        hour: "17:00",
      },
      {
        id: 9,
        photo: "https://cdn.waifu.im/7567.jpg",
        name: "George Red",
        age: 33,
        score: 3,
        active: true,
        date: "2025-05-29T14:30:00",
        hour: "18:00",
      },
      {
        id: 10,
        photo: "https://cdn.waifu.im/7038.jpg",
        name: "Hannah Purple",
        age: 26,
        score: 3,
        active: true,
        date: "2025-05-29T14:30:00",
        hour: "20:00",
      },
    ],
  },
};
