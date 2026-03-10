import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { RadioGroup, Radio } from "./RadioGroup";

test("radio group error state", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 320 }}>
      <RadioGroup label="Favorite sport" isInvalid errorMessage="Please select a sport.">
        <Radio value="soccer">Soccer</Radio>
        <Radio value="baseball">Baseball</Radio>
      </RadioGroup>
    </div>,
  );
  await expect(container).toMatchScreenshot("radio-group-error");
});

test("radio group default", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 320 }}>
      <RadioGroup label="Favorite sport" defaultValue="baseball">
        <Radio value="soccer">Soccer</Radio>
        <Radio value="baseball">Baseball</Radio>
        <Radio value="basketball">Basketball</Radio>
      </RadioGroup>
    </div>,
  );
  await expect(container).toMatchScreenshot("radio-group-default");
});

test("radio group disabled", async () => {
  const { container } = await render(
    <div style={{ padding: 8, width: 320 }}>
      <RadioGroup label="Favorite sport" isDisabled>
        <Radio value="soccer">Soccer</Radio>
        <Radio value="baseball">Baseball</Radio>
      </RadioGroup>
    </div>,
  );
  await expect(container).toMatchScreenshot("radio-group-disabled");
});
