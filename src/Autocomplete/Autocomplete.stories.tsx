import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { User } from "../icons";
import { Autocomplete } from "./Autocomplete";

const meta = {
  component: Autocomplete,
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  args: { onChange: fn() },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

const users = [
  { id: "alice", name: "Alice Johnson" },
  { id: "bob", name: "Bob Smith" },
  { id: "charlie", name: "Charlie Brown" },
  { id: "diana", name: "Diana Prince" },
  { id: "edward", name: "Edward Norton" },
  { id: "fiona", name: "Fiona Apple" },
  { id: "george", name: "George Lucas" },
  { id: "helen", name: "Helen Mirren" },
];

export const Default: Story = {
  args: {
    label: "Assign to",
    placeholder: "Select user...",
    children: users.map((user) => (
      <Autocomplete.Item key={user.id} id={user.id}>
        {user.name}
      </Autocomplete.Item>
    )),
  },
};

export const WithIcon: Story = {
  args: {
    label: "Assign to",
    placeholder: "Select user...",
    startAdornment: <User size={16} />,
    children: users.map((user) => (
      <Autocomplete.Item key={user.id} id={user.id}>
        {user.name}
      </Autocomplete.Item>
    )),
  },
};

export const WithDescription: Story = {
  args: {
    label: "Team member",
    description: "Select a team member to assign this task",
    placeholder: "Select user...",
    searchPlaceholder: "Type to filter...",
    children: users.map((user) => (
      <Autocomplete.Item key={user.id} id={user.id}>
        {user.name}
      </Autocomplete.Item>
    )),
  },
};

export const WithDisabledItems: Story = {
  args: {
    label: "Assign to",
    placeholder: "Select user...",
    children: [
      <Autocomplete.Item key="alice" id="alice">
        Alice Johnson
      </Autocomplete.Item>,
      <Autocomplete.Item key="bob" id="bob">
        Bob Smith
      </Autocomplete.Item>,
      <Autocomplete.Item key="charlie" id="charlie" isDisabled>
        Charlie Brown (Unavailable)
      </Autocomplete.Item>,
      <Autocomplete.Item key="diana" id="diana">
        Diana Prince
      </Autocomplete.Item>,
    ],
  },
};

export const Invalid: Story = {
  args: {
    label: "Reviewer",
    placeholder: "Select a reviewer",
    isInvalid: true,
    errorMessage: "Please select a reviewer",
    children: users.slice(0, 4).map((user) => (
      <Autocomplete.Item key={user.id} id={user.id}>
        {user.name}
      </Autocomplete.Item>
    )),
  },
};

export const Disabled: Story = {
  args: {
    label: "Assign to",
    placeholder: "Select user...",
    isDisabled: true,
    children: users.slice(0, 4).map((user) => (
      <Autocomplete.Item key={user.id} id={user.id}>
        {user.name}
      </Autocomplete.Item>
    )),
  },
};

export const WithRichItems: Story = {
  args: {
    label: "Assign to",
    placeholder: "Select user...",
    children: users.slice(0, 5).map((user) => (
      <Autocomplete.Item key={user.id} id={user.id} textValue={user.name}>
        <User size={14} /> {user.name}
      </Autocomplete.Item>
    )),
  },
};

export const MultiSelect: Story = {
  args: {
    label: "Assign to",
    placeholder: "Select users...",
    selectionMode: "multiple",
    children: users.map((user) => (
      <Autocomplete.Item key={user.id} id={user.id}>
        {user.name}
      </Autocomplete.Item>
    )),
  },
};

export const MultiSelectWithDefaultValue: Story = {
  args: {
    label: "Reviewers",
    placeholder: "Select reviewers...",
    selectionMode: "multiple",
    defaultValue: ["alice", "charlie"],
    children: users.map((user) => (
      <Autocomplete.Item key={user.id} id={user.id}>
        {user.name}
      </Autocomplete.Item>
    )),
  },
};

export const MultiSelectDisabled: Story = {
  args: {
    label: "Assign to",
    placeholder: "Select users...",
    selectionMode: "multiple",
    isDisabled: true,
    children: users.slice(0, 4).map((user) => (
      <Autocomplete.Item key={user.id} id={user.id}>
        {user.name}
      </Autocomplete.Item>
    )),
  },
};

export const MultiSelectCollapsed: Story = {
  args: {
    label: "Reviewers",
    placeholder: "Select reviewers...",
    selectionMode: "multiple",
    collapseTags: true,
    defaultValue: ["alice", "bob", "charlie", "diana"],
    children: users.map((user) => (
      <Autocomplete.Item key={user.id} id={user.id}>
        {user.name}
      </Autocomplete.Item>
    )),
  },
};

export const MultiSelectInvalid: Story = {
  args: {
    label: "Reviewers",
    placeholder: "Select reviewers...",
    selectionMode: "multiple",
    isInvalid: true,
    errorMessage: "Please select at least one reviewer",
    children: users.slice(0, 4).map((user) => (
      <Autocomplete.Item key={user.id} id={user.id}>
        {user.name}
      </Autocomplete.Item>
    )),
  },
};
