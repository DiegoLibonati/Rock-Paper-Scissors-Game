const btnsUserOption = document.querySelectorAll(".option-to-play");
const scores = document.querySelectorAll(".score");

const textResult = document.getElementById("text-result");
const textPlay = document.getElementById("text-play");

const iaChoice = ["rock", "paper", "scissor"];

const getUserChoice = (e) => {
  const optionUserChoice = e.target.id;

  const optionIaChoice = iaChoice[Math.floor(Math.random() * iaChoice.length)];

  const roundResult = resultOfRound(optionUserChoice, optionIaChoice);

  btnsUserOption.forEach((btnUserOption) => {
    btnUserOption.style.pointerEvents = "none";
  });

  textPlay.textContent = "";

  if (roundResult && roundResult !== "draw") {
    textResult.textContent = `User choose: ${optionUserChoice} | Ia choose: ${optionIaChoice} | User Win!`;
    increaseScore(roundResult);
  } else if (!roundResult && roundResult !== "draw") {
    textResult.textContent = `User choose: ${optionUserChoice} | Ia choose: ${optionIaChoice} | Ia Win!`;
    increaseScore(roundResult);
  } else {
    textResult.textContent = `User choose: ${optionUserChoice} | Ia choose: ${optionIaChoice} | Draw!`;
  }
};

btnsUserOption.forEach((btnUserOption) => {
  btnUserOption.addEventListener("click", (e) => getUserChoice(e));
});

const resultOfRound = (userValue, iaValue) => {
  if (userValue == "rock" && iaValue == "rock") {
    return "draw";
  } else if (userValue == "rock" && iaValue == "paper") {
    return false;
  } else if (userValue == "rock" && iaValue == "scissor") {
    return true;
  }

  if (userValue == "paper" && iaValue == "rock") {
    return true;
  } else if (userValue == "paper" && iaValue == "paper") {
    return "draw";
  } else if (userValue == "paper" && iaValue == "scissor") {
    return false;
  }

  if (userValue == "scissor" && iaValue == "rock") {
    return false;
  } else if (userValue == "scissor" && iaValue == "paper") {
    return true;
  } else if (userValue == "scissor" && iaValue == "scissor") {
    return "draw";
  }
};

const increaseScore = (roundResult) => {
  if (roundResult && roundResult !== "draw") {
    for (const element of scores) {
      if (element.id === `user-score`) {
        element.textContent = `${parseInt(element.textContent) + 1}`;
      }
    }
  } else if (!roundResult && roundResult !== "draw") {
    for (const element of scores) {
      if (element.id === `ia-score`) {
        element.textContent = `${parseInt(element.textContent) + 1}`;
      }
    }
  }

  return;
};

const resetToPlay = () => {
  const timeoutToReset = setTimeout(() => {
    btnsUserOption.forEach((btnUserOption) => {
      btnUserOption.style.pointerEvents = "auto";
    });
    textPlay.textContent = "Make your choice now!";
    textResult.textContent = "Choose an option";

    return () => clearTimeout(timeoutToReset);
  }, 2500);
};

textResult.addEventListener("DOMSubtreeModified", () => resetToPlay());
