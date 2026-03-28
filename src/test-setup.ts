const style = document.createElement("style");
style.textContent = `
  body > div { width: fit-content; }
  *, *::before, *::after {
    transition-duration: 0s !important;
    animation-duration: 0s !important;
  }
  * { -webkit-font-smoothing: antialiased !important; }
`;
document.head.appendChild(style);
