import { RoundResult } from "./entities/vite-env.d";
import { Result } from "./entities/enums.d";

import { INDEX_STATE } from "./states/indexState";

import {
  imgsUserOptions,
  scoreIA,
  scorePlayer,
  textPlay,
  textResult,
} from "./constants/elements";

const iaChoice = INDEX_STATE.iaChoice;

let timeout: NodeJS.Timeout;

export const getUserChoice = (
  e: Event,
  imgsUserOptions: NodeList | HTMLImageElement[],
  textPlay: HTMLHeadingElement,
  textResult: HTMLHeadingElement,
  scorePlayer: HTMLHeadingElement,
  scoreIA: HTMLHeadingElement
): void => {
  const target = e.target as HTMLImageElement;

  const optionUserChoice = target?.id;
  const optionIaChoice = iaChoice[Math.floor(Math.random() * iaChoice.length)];

  const userResult = resultOfUser(optionUserChoice, optionIaChoice);

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

export const resultOfUser: RoundResult = (userValue, iaValue) => {
  if (
    (userValue == "rock" && iaValue == "scissor") ||
    (userValue == "paper" && iaValue == "rock") ||
    (userValue == "scissor" && iaValue == "paper")
  )
    return Result.Win;

  if (
    (userValue == "rock" && iaValue == "paper") ||
    (userValue == "paper" && iaValue == "scissor") ||
    (userValue == "scissor" && iaValue == "rock")
  )
    return Result.Lose;

  return Result.Draw;
};

export const resetToPlay = (
  imgsUserOptions: NodeList | HTMLImageElement[],
  textPlay: HTMLHeadingElement,
  textResult: HTMLHeadingElement
) => {
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

imgsUserOptions.forEach((imgUserOption: Node) => {
  imgUserOption.addEventListener("click", (e) =>
    getUserChoice(
      e,
      imgsUserOptions,
      textPlay,
      textResult,
      scorePlayer,
      scoreIA
    )
  );
});

if (textResult)
  new MutationObserver(() =>
    resetToPlay(imgsUserOptions, textPlay, textResult)
  ).observe(textResult, {
    childList: true,
  });
