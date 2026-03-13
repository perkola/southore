import { expect, test } from "vite-plus/test";
import { render } from "vitest-browser-react";
import { Form } from "./Form";
import { TextField } from "../TextField/TextField";
import { Button } from "../Button/Button";

test("form default", async () => {
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
