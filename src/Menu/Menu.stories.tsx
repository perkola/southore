import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import {
  Copy,
  Download,
  EllipsisVertical,
  LinkIcon,
  Pencil,
  Share,
  Trash2,
} from "../icons";
import { Menu } from "./Menu";
import { Popover } from "../Popover/Popover";
import { Button } from "../Button/Button";

const meta = {
  component: Menu,
  args: { onAction: fn() },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Menu.Trigger>
      <Button>Actions</Button>
      <Popover>
        <Menu {...args}>
          <Menu.Item id="edit">Edit</Menu.Item>
          <Menu.Item id="duplicate">Duplicate</Menu.Item>
          <Menu.Item id="delete">Delete</Menu.Item>
        </Menu>
      </Popover>
    </Menu.Trigger>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <Menu.Trigger>
      <Button variant="text" aria-label="More actions">
        <EllipsisVertical size={16} />
      </Button>
      <Popover>
        <Menu {...args}>
          <Menu.Item id="edit">
            <Pencil size={16} />
            Edit
          </Menu.Item>
          <Menu.Item id="copy">
            <Copy size={16} />
            Copy
          </Menu.Item>
          <Menu.Item id="share">
            <Share size={16} />
            Share
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item id="delete" data-destructive>
            <Trash2 size={16} />
            Delete
          </Menu.Item>
        </Menu>
      </Popover>
    </Menu.Trigger>
  ),
};

export const WithDisabledItems: Story = {
  render: (args) => (
    <Menu.Trigger>
      <Button>Actions</Button>
      <Popover>
        <Menu {...args}>
          <Menu.Item id="edit">Edit</Menu.Item>
          <Menu.Item id="duplicate" isDisabled>
            Duplicate
          </Menu.Item>
          <Menu.Item id="delete">Delete</Menu.Item>
        </Menu>
      </Popover>
    </Menu.Trigger>
  ),
};

export const WithSections: Story = {
  render: (args) => (
    <Menu.Trigger>
      <Button>File</Button>
      <Popover>
        <Menu {...args}>
          <Menu.Section header="Document">
            <Menu.Item id="new">New</Menu.Item>
            <Menu.Item id="open">Open</Menu.Item>
            <Menu.Item id="save">Save</Menu.Item>
          </Menu.Section>
          <Menu.Section header="Export">
            <Menu.Item id="pdf">Export as PDF</Menu.Item>
            <Menu.Item id="png">Export as PNG</Menu.Item>
          </Menu.Section>
        </Menu>
      </Popover>
    </Menu.Trigger>
  ),
};

export const WithLinks: Story = {
  render: (args) => (
    <Menu.Trigger>
      <Button>Links</Button>
      <Popover>
        <Menu {...args}>
          <Menu.Item
            id="docs"
            href="https://react-spectrum.adobe.com"
            target="_blank"
          >
            <LinkIcon size={16} />
            Documentation
          </Menu.Item>
          <Menu.Item id="github" href="https://github.com" target="_blank">
            <LinkIcon size={16} />
            GitHub
          </Menu.Item>
          <Menu.Item id="download" href="/file.pdf" download>
            <Download size={16} />
            Download
          </Menu.Item>
        </Menu>
      </Popover>
    </Menu.Trigger>
  ),
};
