# Rock-Paper-Scissors-Game-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install LiveServer extension from Visual Studio Code [OPTIONAL]
4. Click in "Go Live" from LiveServer extension

---

1. Clone the repository
2. Join to the correct path of the clone
3. Open index.html in your favorite navigator

---

1. Clone the repository
2. Join to the correct path of the clone
3. Execute: `yarn install`
4. Execute: `yarn dev`

## Description

I made a rock-paper-scissors like web page where the user plays against an AI. The AI is configured to choose randomly by rock, paper, scissors. In case the user wins a victory sign and the AI selection will be shown, in case the user loses the same thing will happen and if the user draws as well.

## Technologies used

1. Typescript
2. CSS3
3. HTML5

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/91`](https://www.diegolibonati.com.ar/#/project/91)

## Video

https://user-images.githubusercontent.com/99032604/200139528-5923183c-25b0-4d3b-97c6-7348b070eefe.mp4

## Documentation

Here we get all the images and these images have your personal id:

```
const btnsUserOption = document.querySelectorAll(".option-to-play") as NodeList;
```

Here we get the two scores and each score has its own personal class:

```
const scorePlayer = document.querySelector(
  ".score_player"
) as HTMLHeadingElement;
const scoreIA = document.querySelector(".score_ia") as HTMLHeadingElement;
```

Here we get the text in which the result of each round will be displayed:

```
const textResult = document.getElementById("text-result") as HTMLHeadingElement;
```

Here we get the text which will show when the user will be able to play again:

```
const textPlay = document.getElementById("text-play") as HTMLHeadingElement;
```

Here we assign the function getUserChoice to each image when you click on one of them:

```
btnsUserOption.forEach((btnUserOption) => {
  btnUserOption.addEventListener("click", (e) => getUserChoice(e));
});
```

This function will be executed every time an image is clicked. We are going to obtain the id of the clicked image that will be the option that the user chose, we obtain the option that the AI chose through obtaining a random value of its Array of game possibilities, then we will execute the function resultOfRound that will return us if the user won, lost or tied. Then the pertinent validations will be made:

```
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
```

This function will return whether the user won, tied or lost depending on the values we pass as parameters:

```
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
```

This function increments the score of the user or the ia depending on who won in case of a tie it will not return anything or do anything:

```
const increaseScore: IncreaseScore = (roundResult) => {
  if (roundResult === Result.Win) {
    scorePlayer.textContent = `${Number(scorePlayer.textContent) + 1}`;
    return
  }

  scoreIA.textContent = `${Number(scoreIA.textContent) + 1}`;
  return
};
```

Each time the element containing the result changes, resetToPlay will be executed:

```
textResult.addEventListener("DOMSubtreeModified", () => resetToPlay());
```

This function returns all values that are not the default scores after 2.5 minutes:

```
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
```
