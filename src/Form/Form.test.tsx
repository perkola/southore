import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { Form } from "./Form";
import { TextField } from "../TextField/TextField";
import { Button } from "../Button/Button";

test("calls onSubmit when submitted", async () => {
  const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
  await render(
    <Form onSubmit={onSubmit}>
      <Button type="submit">Submit</Button>
    </Form>,
  );
  await page.getByRole("button", { name: "Submit" }).click();
  expect(onSubmit).toHaveBeenCalledOnce();
});

test("calls onReset when reset", async () => {
  const onReset = vi.fn();
  await render(
    <Form onReset={onReset}>
      <Button type="reset">Reset</Button>
    </Form>,
  );
  await page.getByRole("button", { name: "Reset" }).click();
  expect(onReset).toHaveBeenCalledOnce();
});

test("screenshot: form default", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 320 }}>
      <Form>
        <TextField label="Name" placeholder="Enter your name" />
        <Button type="submit">Submit</Button>
      </Form>
    </div>,
  );
  await expect(container).toMatchScreenshot("form-default");
});
