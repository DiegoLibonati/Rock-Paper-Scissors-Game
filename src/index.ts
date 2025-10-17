import { RockPaperScissorsPage } from "@src/pages/RockPaperScissorsPage/RockPaperScissorsPage";

const onInit = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const rockPaperScissorsPage = RockPaperScissorsPage();
  app.appendChild(rockPaperScissorsPage);
};

document.addEventListener("DOMContentLoaded", onInit);
