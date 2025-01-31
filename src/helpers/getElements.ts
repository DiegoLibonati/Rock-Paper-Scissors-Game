export const getElements = () => ({
  imgsUserOptions: document.querySelectorAll(".game__choice") as NodeList,
  scorePlayer: document.querySelector(".game__player-score") as HTMLHeadingElement,
  scoreIA: document.querySelector(".game__ia-score") as HTMLHeadingElement,
  textResult: document.getElementById("text-result") as HTMLHeadingElement,
  textPlay: document.getElementById("text-play") as HTMLHeadingElement,
});
