import { expect, test, vi } from "vite-plus/test";
import { render } from "vitest-browser-react";
import { page } from "vite-plus/test/browser";
import { Form } from "./Form";
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
