import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Checkbox } from "./Checkbox";

test("renders unchecked by default with polyline", async () => {
  await render(<Checkbox>Accept</Checkbox>);
  const svg = document.querySelector(".checkbox-indicator svg")!;
  expect(svg.querySelector("polyline")).toBeTruthy();
  expect(svg.querySelector("rect")).toBeNull();
});

test("renders polyline when checked", async () => {
  await render(<Checkbox isSelected>Accept</Checkbox>);
  const svg = document.querySelector(".checkbox-indicator svg")!;
  expect(svg.querySelector("polyline")).toBeTruthy();
  expect(svg.querySelector("rect")).toBeNull();
});

test("renders rect when indeterminate", async () => {
  await render(<Checkbox isIndeterminate>Accept</Checkbox>);
  const svg = document.querySelector(".checkbox-indicator svg")!;
  expect(svg.querySelector("rect")).toBeTruthy();
  expect(svg.querySelector("polyline")).toBeNull();
});

test("renders children as label", async () => {
  const { getByText } = await render(<Checkbox>Terms and conditions</Checkbox>);
  await expect.element(getByText("Terms and conditions")).toBeVisible();
});

test("renders without children", async () => {
  await render(<Checkbox aria-label="Standalone" />);
  const indicator = document.querySelector(".checkbox-indicator")!;
  const labelSpan = indicator.nextElementSibling;
  expect(labelSpan).toBeNull();
});

test("screenshot: checkbox states", async () => {
  const { container } = await render(
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 8 }}>
      <Checkbox>Unchecked</Checkbox>
      <Checkbox isSelected>Checked</Checkbox>
      <Checkbox isIndeterminate>Indeterminate</Checkbox>
    </div>,
  );
  await expect(container).toMatchScreenshot("checkbox-states");
});
