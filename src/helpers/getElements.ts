export const getElements = () => ({
  imgsUserOptions: document.querySelectorAll(".option-to-play") as NodeList,
  scorePlayer: document.querySelector(".score_player") as HTMLHeadingElement,
  scoreIA: document.querySelector(".score_ia") as HTMLHeadingElement,
  textResult: document.getElementById("text-result") as HTMLHeadingElement,
  textPlay: document.getElementById("text-play") as HTMLHeadingElement,
});
