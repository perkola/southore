import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";

const meta = {
  component: Modal,
  args: { onOpenChange: fn() },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Modal.Trigger>
      <Button>Open modal</Button>
      <Modal {...args}>
        <Modal.Title>Edit profile</Modal.Title>
        <p>Make changes to your profile here. Click save when you're done.</p>
        <Modal.Footer>
          <Modal.CloseButton variant="outlined">Cancel</Modal.CloseButton>
          <Button>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </Modal.Trigger>
  ),
};

export const Controlled: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onPress={() => setIsOpen(true)}>Open modal</Button>
        <Modal {...args} isOpen={isOpen} onOpenChange={setIsOpen}>
          <Modal.Title>Controlled modal</Modal.Title>
          <p>This modal is controlled via external state.</p>
          <Modal.Footer>
            <Button variant="outlined" onPress={() => setIsOpen(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const AlertDialog: Story = {
  render: (args) => (
    <Modal.Trigger>
      <Button>Delete item</Button>
      <Modal {...args} isDismissable={false} role="alertdialog">
        <Modal.Title>Delete item?</Modal.Title>
        <p>
          This action cannot be undone. This will permanently delete the item and all associated
          data.
        </p>
        <Modal.Footer>
          <Modal.CloseButton variant="outlined">Cancel</Modal.CloseButton>
          <Button>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Modal.Trigger>
  ),
};

export const RenderFunction: Story = {
  render: (args) => (
    <Modal.Trigger>
      <Button>Open modal</Button>
      <Modal {...args}>
        {({ close }) => (
          <>
            <Modal.Title>Save changes?</Modal.Title>
            <p>You have unsaved changes. Would you like to save them?</p>
            <Modal.Footer>
              <Button variant="outlined" onPress={close}>
                Discard
              </Button>
              <Button onPress={close}>Save</Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Modal.Trigger>
  ),
};
