import { Result } from "@src/entities/enums";

import { Choice } from "@src/components/Choice/Choice";

import { iaChoices } from "@src/constants/vars";

import { getResult } from "@src/helpers/getResult";

import assets from "@src/assets/export";

import "@src/pages/RockPaperScissorsPage/RockPaperScissorsPage.css";

let timeout: NodeJS.Timeout;

const getUserChoice = (e: MouseEvent): void => {
  const imgsUserOptions =
    document.querySelectorAll<HTMLImageElement>(".game__choice");
  const textPlay =
    document.querySelector<HTMLHeadingElement>(".game__description");
  const scorePlayer = document.querySelector<HTMLHeadingElement>(
    ".game__player-score"
  );
  const scoreIA = document.querySelector<HTMLHeadingElement>(".game__ia-score");
  const textResult =
    document.querySelector<HTMLHeadingElement>(".game__result-text");

  const target = e.target as HTMLImageElement;

  const optionUserChoice = target?.id;
  const optionIaChoice =
    iaChoices[Math.floor(Math.random() * iaChoices.length)];

  const userResult = getResult(optionUserChoice, optionIaChoice);

  imgsUserOptions.forEach((btnUserOption) => {
    const button = btnUserOption as HTMLImageElement;
    button.style.pointerEvents = "none";
  });

  textPlay!.textContent = "";

  if (userResult === Result.Win) {
    textResult!.textContent = `User choose: ${optionUserChoice} | Ia choose: ${optionIaChoice} | User Win!`;
    scorePlayer!.textContent = `${Number(scorePlayer!.textContent) + 1}`;
    return;
  }

  if (userResult === Result.Lose) {
    textResult!.textContent = `User choose: ${optionUserChoice} | Ia choose: ${optionIaChoice} | Ia Win!`;
    scoreIA!.textContent = `${Number(scoreIA!.textContent) + 1}`;
    return;
  }

  textResult!.textContent = `User choose: ${optionUserChoice} | Ia choose: ${optionIaChoice} | Draw!`;
};

const resetToPlay = () => {
  const imgsUserOptions =
    document.querySelectorAll<HTMLImageElement>(".game__choice");
  const textPlay =
    document.querySelector<HTMLHeadingElement>(".game__description");
  const textResult =
    document.querySelector<HTMLHeadingElement>(".game__result-text");

  timeout = setTimeout(() => {
    if (textResult!.textContent === "Choose an option")
      return clearTimeout(timeout!);

    if (timeout) clearTimeout(timeout);

    imgsUserOptions.forEach((imgUserOption) => {
      const img = imgUserOption as HTMLImageElement;
      img.style.pointerEvents = "auto";
    });
    textPlay!.textContent = "Make your choice now!";
    textResult!.textContent = "Choose an option";
  }, 2500);
};

export const RockPaperScissorsPage = (): HTMLElement => {
  const main = document.createElement("main");
  main.className = "game-main";

  main.innerHTML = `
    <section class="game">
        <article class="game__header">
            <div class="game__header-user">
                <h2 class="game__player-name">Player</h2>
                <h3 class="game__player-score" id="user-score">0</h3>
            </div>
            <div class="game__header-ia">
                <h2 class="game__ia-name">Computer</h2>
                <h3 class="game__ia-score" id="ia-score">0</h3>
            </div>
        </article>

        <article class="game__content">
            <h2 id="text-result" class="game__result-text">Choose an option</h2>

            <div class="game__choices">
            </div>

            <h2 id="text-play" class="game__description">
                Make your choice now!
            </h2>
        </article>
    </section>
  `;

  const gameChoices = main.querySelector<HTMLDivElement>(".game__choices");
  const textResult =
    main.querySelector<HTMLHeadingElement>(".game__result-text");

  const rock = Choice({
    id: "rock",
    name: "roca",
    srcImg: assets.images.RockPng,
    onClick: (e) => getUserChoice(e),
  });
  const paper = Choice({
    id: "paper",
    name: "papel",
    srcImg: assets.images.PaperPng,
    onClick: (e) => getUserChoice(e),
  });
  const scissor = Choice({
    id: "scissor",
    name: "tijera",
    srcImg: assets.images.TijeraPng,
    onClick: (e) => getUserChoice(e),
  });

  gameChoices?.append(rock, paper, scissor);

  new MutationObserver(() => resetToPlay()).observe(textResult!, {
    childList: true,
  });

  return main;
};
