export const getElements = () => ({
  imgsUserOptions: document.querySelectorAll(".game__content-choice") as NodeList,
  scorePlayer: document.querySelector(".game__header-user-score") as HTMLHeadingElement,
  scoreIA: document.querySelector(".game__header-ia-score") as HTMLHeadingElement,
  textResult: document.getElementById("text-result") as HTMLHeadingElement,
  textPlay: document.getElementById("text-play") as HTMLHeadingElement,
});
