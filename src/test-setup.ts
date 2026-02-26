import { beforeEach } from "vitest";

beforeEach(() => {
  const style = document.createElement("style");
  style.dataset.vitestContainer = "";
  style.textContent = "body > div { width: fit-content; }";
  document.head.appendChild(style);

  return () => style.remove();
});
