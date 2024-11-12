import { Result } from "./entities/enums.d";

import { INDEX_STATE } from "./states/indexState";

import { getResult } from "./helpers/getResult";

import {
  imgsUserOptions,
  scoreIA,
  scorePlayer,
  textPlay,
  textResult,
} from "./constants/elements";

const iaChoice = INDEX_STATE.iaChoice;

let timeout: NodeJS.Timeout;

const getUserChoice = (e: Event): void => {
  const target = e.target as HTMLImageElement;

  const optionUserChoice = target?.id;
  const optionIaChoice = iaChoice[Math.floor(Math.random() * iaChoice.length)];

  const userResult = getResult(optionUserChoice, optionIaChoice);

  imgsUserOptions.forEach((btnUserOption) => {
    const button = btnUserOption as HTMLImageElement;
    button.style.pointerEvents = "none";
  });

  textPlay.textContent = "";

  if (userResult === Result.Win) {
    textResult.textContent = `User choose: ${optionUserChoice} | Ia choose: ${optionIaChoice} | User Win!`;
    scorePlayer.textContent = `${Number(scorePlayer.textContent) + 1}`;
    return;
  }

  if (userResult === Result.Lose) {
    textResult.textContent = `User choose: ${optionUserChoice} | Ia choose: ${optionIaChoice} | Ia Win!`;
    scoreIA.textContent = `${Number(scoreIA.textContent) + 1}`;
    return;
  }

  textResult.textContent = `User choose: ${optionUserChoice} | Ia choose: ${optionIaChoice} | Draw!`;
};

const resetToPlay = () => {
  timeout = setTimeout(() => {
    if (textResult.textContent === "Choose an option")
      return clearTimeout(timeout!);

    if (timeout) clearTimeout(timeout);

    imgsUserOptions.forEach((imgUserOption) => {
      const img = imgUserOption as HTMLImageElement;
      img.style.pointerEvents = "auto";
    });
    textPlay.textContent = "Make your choice now!";
    textResult.textContent = "Choose an option";
  }, 2500);
};

const onInit = () => {
  imgsUserOptions.forEach((imgUserOption: Node) => {
    imgUserOption.addEventListener("click", (e) => getUserChoice(e));
  });

  new MutationObserver(() => resetToPlay()).observe(textResult, {
    childList: true,
  });
};

document.addEventListener("DOMContentLoaded", onInit);
