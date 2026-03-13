import { beforeEach } from "vite-plus/test";

beforeEach(() => {
  const style = document.createElement("style");
  style.dataset.vitestContainer = "";
  style.textContent = `
    body > div { width: fit-content; }
    *, *::before, *::after {
      transition-duration: 0s !important;
      animation-duration: 0s !important;
    }
    * { -webkit-font-smoothing: antialiased !important; }
  `;
  document.head.appendChild(style);

  return () => style.remove();
});
