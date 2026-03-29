import "@/index.css";
import RockPaperScissorsPage from "@/pages/RockPaperScissorsPage/RockPaperScissorsPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const rockPaperScissorsPage = RockPaperScissorsPage();
  app.appendChild(rockPaperScissorsPage);
};

document.addEventListener("DOMContentLoaded", onInit);
