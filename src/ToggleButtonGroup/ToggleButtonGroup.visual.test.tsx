import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { ToggleButtonGroup, ToggleButton } from "./ToggleButtonGroup";

test("toggle button group — single selection", async () => {
  const { container } = await render(
    <div style={{ padding: 16 }}>
      <ToggleButtonGroup selectionMode="single" disallowEmptySelection defaultSelectedKeys={["week"]}>
        <ToggleButton id="day">Day</ToggleButton>
        <ToggleButton id="week">Week</ToggleButton>
        <ToggleButton id="month">Month</ToggleButton>
      </ToggleButtonGroup>
    </div>,
  );
  await expect(container).toMatchScreenshot("toggle-button-group-single");
});

test("toggle button group — multiple selection", async () => {
  const { container } = await render(
    <div style={{ padding: 16 }}>
      <ToggleButtonGroup selectionMode="multiple" defaultSelectedKeys={["bold", "italic"]}>
        <ToggleButton id="bold">Bold</ToggleButton>
        <ToggleButton id="italic">Italic</ToggleButton>
        <ToggleButton id="underline">Underline</ToggleButton>
      </ToggleButtonGroup>
    </div>,
  );
  await expect(container).toMatchScreenshot("toggle-button-group-multiple");
});

test("toggle button group — disabled item", async () => {
  const { container } = await render(
    <div style={{ padding: 16 }}>
      <ToggleButtonGroup selectionMode="single" disallowEmptySelection defaultSelectedKeys={["day"]}>
        <ToggleButton id="day">Day</ToggleButton>
        <ToggleButton id="week">Week</ToggleButton>
        <ToggleButton id="month">Month</ToggleButton>
        <ToggleButton id="year" isDisabled>Year</ToggleButton>
      </ToggleButtonGroup>
    </div>,
  );
  await expect(container).toMatchScreenshot("toggle-button-group-disabled-item");
});

test("toggle button group — small size", async () => {
  const { container } = await render(
    <div style={{ padding: 16 }}>
      <ToggleButtonGroup selectionMode="single" disallowEmptySelection size="small" defaultSelectedKeys={["week"]}>
        <ToggleButton id="day">Day</ToggleButton>
        <ToggleButton id="week">Week</ToggleButton>
        <ToggleButton id="month">Month</ToggleButton>
      </ToggleButtonGroup>
    </div>,
  );
  await expect(container).toMatchScreenshot("toggle-button-group-small");
});
