import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pencil } from 'lucide-react';
import { fn } from 'storybook/test';
import { Button } from './Button';

const meta = {
  component: Button,
  args: { onPress: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    variant: 'solid',
    children: 'Button',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Button',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Button',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'solid',
    children: [<Pencil key="icon" size={16} />, 'Edit'],
  },
};

export const Disabled: Story = {
  args: {
    variant: 'solid',
    children: 'Disabled',
    isDisabled: true,
  },
};
