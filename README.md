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

## Feel free to edit my code

If you want you can edit the header colors, adding values to the array:

```
const colors = ["red", "green", "blue", "NEW COLOR"];
```

If you want you can add more ways to play and not only the traditional ones like rock, paper, scissors. You can also put `Diamond` as an example in the choices to choose from.

```
const selectMachineValue = ["Rock", "Paper", "Scissor", "NEW ITEM"];
```

If you edit the above it should modify the following, (I remind you that you must enter an IMG element in the HTML relevant to your new ITEM)

The first addEventListener execute the opacity when you click a element from the list and the function finalValue find the final condition like if you win, lose or draw.

```
selectValue.addEventListener("input", ()=>{
    if (selectValue.value == "Rock"){
        imgRock.style.opacity = "1";
        imgPaper.style.opacity = "0";
        imgScissor.style.opacity = "0";
    } else if (selectValue.value == "Paper"){
        imgRock.style.opacity = "0";
        imgPaper.style.opacity = "1";
        imgScissor.style.opacity = "0";
    } else if (selectValue.value == "Scissor"){
        imgRock.style.opacity = "0";
        imgPaper.style.opacity = "0";
        imgScissor.style.opacity = "1";
    }
})

function finalValue(vU, vM){

    if (vU == "Rock" && vM == "0"){
        pOne.textContent = ` The machine select: ${selectMachineValue[0]}`
        pTwo.textContent = "Your choice was: Rock"
        pTr.textContent = "ITS A DRAW";
    } else if (vU == "Rock" && vM == "1"){
        pOne.textContent = ` The machine select: ${selectMachineValue[1]}`
        pTwo.textContent = "Your choice was: Rock"
        pTr.textContent = "You LOSE";
    } else if (vU == "Rock" && vM == "2"){
        pOne.textContent = ` The machine select: ${selectMachineValue[2]}`
        pTwo.textContent = "Your choice was: Rock"
        pTr.textContent = "You WIN";
    }


    if (vU == "Paper" && vM == "0"){
        pOne.textContent = ` The machine select: ${selectMachineValue[0]}`
        pTwo.textContent = "Your choice was: Paper"
        pTr.textContent = "You WIN";
    } else if (vU == "Paper" && vM == "1"){
        pOne.textContent = ` The machine select: ${selectMachineValue[1]}`
        pTwo.textContent = "Your choice was: Paper"
        pTr.textContent = "ITS A DRAW";
    } else if (vU == "Paper" && vM == "2"){
        pOne.textContent = ` The machine select: ${selectMachineValue[2]}`
        pTwo.textContent = "Your choice was: Paper"
        pTr.textContent = "You LOSE";
    }

    if (vU == "Scissor" && vM == "0"){
        pOne.textContent = ` The machine select: ${selectMachineValue[2]}`
        pTwo.textContent = "Your choice was: Scissor"
        pTr.textContent = "You LOSE";
    } else if (vU == "Scissor" && vM == "1"){
        pOne.textContent = ` The machine select: ${selectMachineValue[0]}`
        pTwo.textContent = "Your choice was: Scissor"
        pTr.textContent = "You WIN";
    } else if (vU == "Scissor" && vM == "2"){
        pOne.textContent = ` The machine select: ${selectMachineValue[1]}`
        pTwo.textContent = "Your choice was: Scissor"
        pTr.textContent = "ITS A DRAW";
    }
}
```

## Technologies used

1. Javascript
2. CSS3
3. HTML5

## Galery

![Rock-Paper-Scissors](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/rcs-0.jpg)

![Rock-Paper-Scissors](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/rcs-1.jpg)

![Rock-Paper-Scissors](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/rcs-2.jpg)

![Rock-Paper-Scissors](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/rcs-3.jpg)

## Portfolio Link

`https://diegolibonati.github.io/DiegoLibonatiWeb/#/projects?q=Rock,%20paper,%20or%20scissors%20game%20page`

## Video
