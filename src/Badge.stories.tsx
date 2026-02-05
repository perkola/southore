import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Badge color="gray">Gray</Badge>
      <Badge color="red">Red</Badge>
      <Badge color="green">Green</Badge>
      <Badge color="amber">Amber</Badge>
      <Badge color="blue">Blue</Badge>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
};

export const Circular: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Badge variant="circular" color="gray">3</Badge>
      <Badge variant="circular" color="red">1</Badge>
      <Badge variant="circular" color="green">7</Badge>
      <Badge variant="circular" color="amber">5</Badge>
      <Badge variant="circular" color="blue">2</Badge>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
};

