import "./css/index.css";
import header from "./js/utils/header";

document.addEventListener("DOMContentLoaded", async () => {
  const headerElement = document.getElementById("header");
  if (headerElement) {
    headerElement.appendChild(header);
  }

  const router = await import("./js/router");
  router.default(window.location.pathname);
});
