# Rock Paper Scissors Game

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

## Libraries used

```
"@testing-library/dom": "^10.4.0",
"@testing-library/jest-dom": "^6.6.3",
"@types/jest": "^29.5.14",
"jest": "^29.7.0",
"jest-environment-jsdom": "^29.7.0",
"ts-jest": "^29.2.5",
"typescript": "^5.2.2",
"vite": "^5.0.8"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/Rock-Paper-Scissors-Game`](https://www.diegolibonati.com.ar/#/project/Rock-Paper-Scissors-Game)

## Video

https://user-images.githubusercontent.com/99032604/200139528-5923183c-25b0-4d3b-97c6-7348b070eefe.mp4

## Testing

1. Join to the correct path of the clone
2. Execute: `yarn install`
3. Execute: `yarn test`

## Documentation

Here we get all the images and these images have your personal id:

```
export const imgsUserOptions = document.querySelectorAll(
  ".option-to-play"
) as NodeList;
```

Here we get the two scores and each score has its own personal class:

```
export const scorePlayer = document.querySelector(
  ".score_player"
) as HTMLHeadingElement;
export const scoreIA = document.querySelector(
  ".score_ia"
) as HTMLHeadingElement;
```

Here we get the text in which the result of each round will be displayed:

```
export const textResult = document.getElementById(
  "text-result"
) as HTMLHeadingElement;
```

Here we get the text which will show when the user will be able to play again:

```
export const textPlay = document.getElementById(
  "text-play"
) as HTMLHeadingElement;
```

Here we assign the function getUserChoice to each image when you click on one of them:

```
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
```

This function will be executed every time an image is clicked. We are going to obtain the id of the clicked image that will be the option that the user chose, we obtain the option that the AI chose through obtaining a random value of its Array of game possibilities, then we will execute the function resultOfRound that will return us if the user won, lost or tied. Then the pertinent validations will be made:

```
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
```

This function will return whether the user won, tied or lost depending on the values we pass as parameters:

```
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
```

Each time the element containing the result changes, resetToPlay will be executed:

```
if (textResult)
  new MutationObserver(() =>
    resetToPlay(imgsUserOptions, textPlay, textResult)
  ).observe(textResult, {
    childList: true,
  });
```

This function returns all values that are not the default scores after 2.5 minutes:

```
let timeout: NodeJS.Timeout;

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
```
