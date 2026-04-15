import "@/index.css";
import GripDuelPage from "@/pages/GripDuelPage/GripDuelPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const gridDuelPage = GripDuelPage();
  app.appendChild(gridDuelPage);
};

document.addEventListener("DOMContentLoaded", onInit);
