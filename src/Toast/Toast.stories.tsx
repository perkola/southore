import type { Meta, StoryObj } from "@storybook/react-vite";
import { GlobalToastRegion } from "./Toast";
import { addToast } from "./toastQueue";
import { Button } from "../Button/Button";

const meta: Meta = {
  title: "Toast",
};

export default meta;

type Story = StoryObj;

function StoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <GlobalToastRegion />
    </>
  );
}

export const Default: Story = {
  render: () => (
    <StoryLayout>
      <Button onPress={() => addToast("Your changes have been saved.")}>
        Show Toast
      </Button>
    </StoryLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `
import { GlobalToastRegion, addToast } from 'southore';
import { Button } from 'southore';

// Place GlobalToastRegion at the root of your app
function App() {
  return (
    <>
      <MyComponent />
      <GlobalToastRegion />
    </>
  );
}

// Use addToast from anywhere in your app
function MyComponent() {
  return (
    <Button onPress={() => addToast('Your changes have been saved.')}>
      Save
    </Button>
  );
}
`.trim(),
      },
    },
  },
};

export const ManualDismissOnly: Story = {
  render: () => (
    <StoryLayout>
      <Button
        onPress={() =>
          addToast("This toast requires manual dismissal.", { timeout: null })
        }
      >
        Show Toast
      </Button>
    </StoryLayout>
  ),
  parameters: {
    docs: {
      source: {
        code: `
// Set timeout to null for toasts that require manual dismissal
addToast('This toast requires manual dismissal.', { timeout: null });
`.trim(),
      },
    },
  },
};
