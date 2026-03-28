import { expect, test } from "vite-plus/test";
import { render } from "vitest-browser-react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";

test("modal default", async () => {
  await render(
    <Modal isOpen>
      <Modal.Title>Edit profile</Modal.Title>
      <p>Make changes to your profile here. Click save when you're done.</p>
      <Modal.Footer>
        <Modal.CloseButton variant="outlined">Cancel</Modal.CloseButton>
        <Button>Save changes</Button>
      </Modal.Footer>
    </Modal>,
  );
  await expect(document.body).toMatchScreenshot("modal-default");
});

test("modal long content", async () => {
  await render(
    <Modal isOpen>
      <Modal.Title>Terms of service</Modal.Title>
      {Array.from({ length: 10 }, (_, i) => (
        <p key={i}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris.
        </p>
      ))}
      <Modal.Footer>
        <Modal.CloseButton variant="outlined">Decline</Modal.CloseButton>
        <Button>Accept</Button>
      </Modal.Footer>
    </Modal>,
  );
  await expect(document.body).toMatchScreenshot("modal-long-content");
});
