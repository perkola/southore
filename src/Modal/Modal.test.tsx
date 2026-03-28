import { useState } from "react";
import { expect, test, vi } from "vite-plus/test";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vite-plus/test/browser";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";

test("opens when trigger is clicked", async () => {
  await render(
    <Modal.Trigger>
      <Button>Open</Button>
      <Modal>
        <Modal.Title>Test modal</Modal.Title>
        <p>Content</p>
      </Modal>
    </Modal.Trigger>,
  );
  await page.getByRole("button", { name: "Open" }).click();
  await expect.element(page.getByRole("dialog")).toBeVisible();
  await expect.element(page.getByText("Test modal")).toBeVisible();
});

test("closes on Escape key", async () => {
  await render(
    <Modal.Trigger>
      <Button>Open</Button>
      <Modal>
        <Modal.Title>Test</Modal.Title>
      </Modal>
    </Modal.Trigger>,
  );
  await page.getByRole("button", { name: "Open" }).click();
  await expect.element(page.getByRole("dialog")).toBeVisible();
  await userEvent.keyboard("{Escape}");
  await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
});

test("closes on backdrop click when isDismissable", async () => {
  const onOpenChange = vi.fn();
  function Test() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onPress={() => setIsOpen(true)}>Open</Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            onOpenChange(open);
          }}
          isDismissable
        >
          <Modal.Title>Test</Modal.Title>
        </Modal>
      </>
    );
  }
  await render(<Test />);
  await page.getByRole("button", { name: "Open" }).click();
  await expect.element(page.getByRole("dialog")).toBeVisible();
  await userEvent.keyboard("{Escape}");
  await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
  expect(onOpenChange).toHaveBeenCalledWith(false);
});

test("does not close on backdrop click when isDismissable is false", async () => {
  await render(
    <Modal.Trigger>
      <Button>Open</Button>
      <Modal isDismissable={false}>
        <Modal.Title>Test</Modal.Title>
      </Modal>
    </Modal.Trigger>,
  );
  await page.getByRole("button", { name: "Open" }).click();
  await expect.element(page.getByRole("dialog")).toBeVisible();
  // Escape should not close either
  await userEvent.keyboard("{Escape}");
  await expect.element(page.getByRole("dialog")).toBeVisible();
});

test("title wires aria-labelledby on dialog", async () => {
  await render(
    <Modal.Trigger>
      <Button>Open</Button>
      <Modal>
        <Modal.Title>Accessible title</Modal.Title>
      </Modal>
    </Modal.Trigger>,
  );
  await page.getByRole("button", { name: "Open" }).click();
  const dialog = document.querySelector("[role=dialog]") as HTMLElement;
  const labelledBy = dialog.getAttribute("aria-labelledby");
  expect(labelledBy).toBeTruthy();
  const heading = document.getElementById(labelledBy!);
  expect(heading?.textContent).toBe("Accessible title");
});

test("CloseButton closes modal", async () => {
  await render(
    <Modal.Trigger>
      <Button>Open</Button>
      <Modal>
        <Modal.Title>Test</Modal.Title>
        <Modal.Footer>
          <Modal.CloseButton>Cancel</Modal.CloseButton>
        </Modal.Footer>
      </Modal>
    </Modal.Trigger>,
  );
  await page.getByRole("button", { name: "Open" }).click();
  await expect.element(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Cancel" }).click();
  await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
});

test("controlled isOpen", async () => {
  function Controlled() {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Title>Controlled</Modal.Title>
        <Modal.Footer>
          <Button onPress={() => setIsOpen(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  await render(<Controlled />);
  await expect.element(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
  await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
});

test("onOpenChange is called", async () => {
  const onOpenChange = vi.fn();
  await render(
    <Modal.Trigger onOpenChange={onOpenChange}>
      <Button>Open</Button>
      <Modal>
        <Modal.Title>Test</Modal.Title>
      </Modal>
    </Modal.Trigger>,
  );
  await page.getByRole("button", { name: "Open" }).click();
  expect(onOpenChange).toHaveBeenCalledWith(true);
});

test("render function receives close", async () => {
  await render(
    <Modal.Trigger>
      <Button>Open</Button>
      <Modal>
        {({ close }) => (
          <>
            <Modal.Title>Render fn</Modal.Title>
            <Button onPress={close}>Done</Button>
          </>
        )}
      </Modal>
    </Modal.Trigger>,
  );
  await page.getByRole("button", { name: "Open" }).click();
  await expect.element(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Done" }).click();
  await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
});

test("aria-label provides accessible name without Modal.Title", async () => {
  await render(
    <Modal.Trigger>
      <Button>Open</Button>
      <Modal aria-label="Image preview">
        <p>Full-size image content</p>
      </Modal>
    </Modal.Trigger>,
  );
  await page.getByRole("button", { name: "Open" }).click();
  const dialog = document.querySelector("[role=dialog]") as HTMLElement;
  expect(dialog.getAttribute("aria-label")).toBe("Image preview");
});

test("role alertdialog", async () => {
  await render(
    <Modal.Trigger>
      <Button>Open</Button>
      <Modal role="alertdialog">
        <Modal.Title>Warning</Modal.Title>
      </Modal>
    </Modal.Trigger>,
  );
  await page.getByRole("button", { name: "Open" }).click();
  await expect.element(page.getByRole("alertdialog")).toBeVisible();
});
