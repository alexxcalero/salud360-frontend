import { Meta, StoryObj } from "@storybook/react";

import Comp from "./Table.deprecated";

const meta: Meta<typeof Comp<Data>> = {
  title: "Table/Table",
  component: Comp<Data>,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

interface Data {
  id: number;
  photo: string;
  name: string;
  age: number;
}

type Story = StoryObj<typeof Comp<Data>>;
export const Default: Story = {
  args: {
    idKey: "id" as keyof Data,
    onCheckedChange: (e) => console.log(e.target.checked),
    columns: {
      id: { label: "ID", type: "number" },
      photo: { label: "Photo", type: "image" },
      name: { label: "Name", type: "text" },
      age: { label: "Age", type: "number" },
    },
    rows: [
      {
        id: 1,
        photo: "https://cdn.waifu.im/7038.jpg",
        name: "John Doe",
        age: 30,
      },
      {
        id: 2,
        photo: "https://cdn.waifu.im/7619.png",
        name: "Jane Smith",
        age: 25,
      },
      {
        id: 3,
        photo: "https://cdn.waifu.im/7567.jpg",
        name: "Alice Johnson",
        age: 28,
      },
      {
        id: 4,
        photo: "https://cdn.waifu.im/7038.jpg",
        name: "Bob Brown",
        age: 35,
      },
      {
        id: 5,
        photo: "https://cdn.waifu.im/7619.png",
        name: "Charlie White",
        age: 22,
      },
      {
        id: 6,
        photo: "https://cdn.waifu.im/7567.jpg",
        name: "Diana Green",
        age: 27,
      },
      {
        id: 7,
        photo: "https://cdn.waifu.im/7038.jpg",
        name: "Ethan Blue",
        age: 32,
      },
      {
        id: 8,
        photo: "https://cdn.waifu.im/7619.png",
        name: "Fiona Black",
        age: 29,
      },
      {
        id: 9,
        photo: "https://cdn.waifu.im/7567.jpg",
        name: "George Yellow",
        age: 31,
      },
      {
        id: 10,
        photo: "https://cdn.waifu.im/7038.jpg",
        name: "Hannah Purple",
        age: 24,
      },
    ],
  },
};
