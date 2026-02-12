import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Search,
  X,
} from "./icons";

const iconMap = {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Search,
  X,
} as const;
type IconName = keyof typeof iconMap;

function IconPlayground({
  icon,
  size,
  color,
}: {
  icon: IconName;
  size: number;
  color: string;
}) {
  const Icon = iconMap[icon];
  return (
    <div style={{ color: "var(--color-text)" }}>
      <Icon size={size} color={color} />
    </div>
  );
}

const meta: Meta<typeof IconPlayground> = {
  title: "Icons",
  component: IconPlayground,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Icon components re-exported from Lucide React. Import individual icons for tree-shaking support.",
      },
    },
  },
  argTypes: {
    icon: {
      control: "select",
      options: Object.keys(iconMap),
      description: "Icon to display",
    },
    size: {
      control: { type: "range", min: 12, max: 64, step: 4 },
      description: "Icon size in pixels",
    },
    color: {
      control: "color",
      description: "Icon color (CSS color value)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconPlayground>;

export const Playground: Story = {
  args: {
    icon: "ChevronDown",
    size: 24,
    color: "currentColor",
  },
};

function IconGallery({ size, color }: { size: number; color: string }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: "24px",
        padding: "16px",
        color: "var(--color-text)",
      }}
    >
      {Object.entries(iconMap).map(([name, Icon]) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            padding: "16px",
            borderRadius: "8px",
            border: "1px solid var(--color-border)",
            backgroundColor: "var(--color-bg)",
          }}
        >
          <Icon size={size} color={color} />
          <code
            style={{
              fontSize: "12px",
              color: "var(--color-text-muted)",
            }}
          >
            {name}
          </code>
        </div>
      ))}
    </div>
  );
}

export const AllIcons: StoryObj<typeof IconGallery> = {
  args: {
    size: 24,
    color: "currentColor",
  },
  render: (args) => <IconGallery {...args} />,
  argTypes: {
    size: {
      control: { type: "range", min: 12, max: 64, step: 4 },
    },
    color: {
      control: "color",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "All available icons. Use the controls to adjust size and color.",
      },
    },
  },
};
