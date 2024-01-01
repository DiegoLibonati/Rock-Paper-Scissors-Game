import {
  IAChoice,
  RoundResult,
  Result,
  IncreaseScore,
} from "./entities/vite-env.d";

const btnsUserOption = document.querySelectorAll(".option-to-play") as NodeList;
const scorePlayer = document.querySelector(
  ".score_player"
) as HTMLHeadingElement;
const scoreIA = document.querySelector(".score_ia") as HTMLHeadingElement;

const textResult = document.getElementById("text-result") as HTMLHeadingElement;
const textPlay = document.getElementById("text-play") as HTMLHeadingElement;

const iaChoice: IAChoice[] = ["rock", "paper", "scissor"];

const getUserChoice = (e: Event) => {
  const target = e.target as HTMLImageElement;

  const optionUserChoice = target?.id;

  const optionIaChoice = iaChoice[Math.floor(Math.random() * iaChoice.length)];

  const roundResult = resultOfRound(optionUserChoice, optionIaChoice);

  btnsUserOption.forEach((btnUserOption) => {
    const button = btnUserOption as HTMLImageElement;
    button.style.pointerEvents = "none";
  });

  textPlay.textContent = "";

  if (roundResult === Result.Win) {
    textResult.textContent = `User choose: ${optionUserChoice} | Ia choose: ${optionIaChoice} | User Win!`;
    increaseScore(roundResult);
  } else if (roundResult === Result.Lose) {
    textResult.textContent = `User choose: ${optionUserChoice} | Ia choose: ${optionIaChoice} | Ia Win!`;
    increaseScore(roundResult);
  } else {
    textResult.textContent = `User choose: ${optionUserChoice} | Ia choose: ${optionIaChoice} | Draw!`;
  }
};

btnsUserOption.forEach((btnUserOption) => {
  btnUserOption.addEventListener("click", (e) => getUserChoice(e));
});

const resultOfRound: RoundResult = (userValue, iaValue) => {
  if (userValue == "rock" && iaValue == "paper") {
    return Result.Lose;
  } else if (userValue == "rock" && iaValue == "scissor") {
    return Result.Win;
  }

  if (userValue == "paper" && iaValue == "rock") {
    return Result.Win;
  } else if (userValue == "paper" && iaValue == "scissor") {
    return Result.Lose;
  }

  if (userValue == "scissor" && iaValue == "rock") {
    return Result.Lose;
  } else if (userValue == "scissor" && iaValue == "paper") {
    return Result.Win;
  }

  return Result.Draw;
};

const increaseScore: IncreaseScore = (roundResult) => {
  if (roundResult === Result.Win) {
    scorePlayer.textContent = `${Number(scorePlayer.textContent) + 1}`;
    return;
  }

  scoreIA.textContent = `${Number(scoreIA.textContent) + 1}`;
  return;
};

const resetToPlay = () => {
  const timeoutToReset = setTimeout(() => {
    btnsUserOption.forEach((btnUserOption) => {
      const button = btnUserOption as HTMLImageElement;
      button.style.pointerEvents = "auto";
    });
    textPlay.textContent = "Make your choice now!";
    textResult.textContent = "Choose an option";
    return () => clearTimeout(timeoutToReset);
  }, 2500);
};

textResult.addEventListener("DOMSubtreeModified", () => resetToPlay());
