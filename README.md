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

## Description

I made a rock-paper-scissors like web page where the user plays against an AI. The AI is configured to choose randomly by rock, paper, scissors. In case the user wins a victory sign and the AI selection will be shown, in case the user loses the same thing will happen and if the user draws as well.

## Technologies used

1. Javascript
2. CSS3
3. HTML5

## Galery

![Rock-Paper-Scissors](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/rcs2-0.jpg)

![Rock-Paper-Scissors](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/rcs2-1.jpg)

![Rock-Paper-Scissors](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/rcs2-2.jpg)

![Rock-Paper-Scissors](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/rcs2-3.jpg)

![Rock-Paper-Scissors](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/rcs2-4.jpg)

## Portfolio Link

`https://diegolibonati.github.io/DiegoLibonatiWeb/#/projects?q=Rock,%20Paper,%20Or%20Scissors%20Game%20Page`

## Video



https://user-images.githubusercontent.com/99032604/200139528-5923183c-25b0-4d3b-97c6-7348b070eefe.mp4



## Documentation

Here we get all the images and these images have your personal id:

```
const btnsUserOption = document.querySelectorAll(".option-to-play");
```

Here we get the two scores and each score has its own personal id:

```
const scores = document.querySelectorAll(".score");
```

Here we get the text in which the result of each round will be displayed:

```
const textResult = document.getElementById("text-result");
```

Here we get the text which will show when the user will be able to play again:

```
const textPlay = document.getElementById("text-play");
```

Here we assign the function getUserChoice to each image when you click on one of them:

```
btnsUserOption.forEach((btnUserOption) => {
  btnUserOption.addEventListener("click", (e) => getUserChoice(e));
});
```

This function will be executed every time an image is clicked. We are going to obtain the id of the clicked image that will be the option that the user chose, we obtain the option that the AI chose through obtaining a random value of its Array of game possibilities, then we will execute the function resultOfRound that will return us if the user won, lost or tied. Then the pertinent validations will be made:

```
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
```

This function will return whether the user won, tied or lost depending on the values we pass as parameters:

```
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
```

This function increments the score of the user or the ia depending on who won in case of a tie it will not return anything or do anything:

```
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
      btnUserOption.style.pointerEvents = "auto";
    });
    textPlay.textContent = "Make your choice now!";
    textResult.textContent = "Choose an option";

    return () => clearTimeout(timeoutToReset);
  }, 2500);
};
```
