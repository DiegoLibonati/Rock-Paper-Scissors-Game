const selectValue = document.querySelector(".select_center");

const imgRock = document.getElementById("imgRock");
const imgPaper = document.getElementById("imgPaper");
const imgScissor = document.getElementById("imgScissor");

const playBtn = document.getElementById("btnPlay");

const pOne = document.getElementById("p1"); 
const pTwo = document.getElementById("p2"); 
const pTr = document.getElementById("p3"); 
const openNewModal = document.querySelector(".article_modal");
const closeModalBtn = document.querySelector(".a");

const selectMachineValue = ["Rock", "Paper", "Scissor"];


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

playBtn.addEventListener("click", (e)=>{
    e.preventDefault()

    const vM = valueMachine();

    finalValue(selectValue.value, vM);

    openNewModal.style.display = "block";
    document.querySelector(".section_container").classList.add("blurEffect");
    playBtn.style.display ="none";
});

closeModalBtn.addEventListener("click", ()=>{
    openNewModal.style.display = "none";
    document.querySelector(".section_container").classList.remove("blurEffect");
    playBtn.style.display = "block";
});



function valueMachine(randomValue){

    randomValue = Math.floor(Math.random() * selectMachineValue.length);

    return randomValue

}

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

const colors = ["red", "green", "blue"];

function changeColor(color){
    color = Math.floor(Math.random() * colors.length);
    document.querySelector(".header_container").style.border = `.5rem solid ${colors[color]}`;

    document.querySelector(".header_container").style.transition = "border 2s";
}

setInterval(changeColor,2000); 


