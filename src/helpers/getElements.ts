export const getElements = () => ({
  imgsUserOptions: document.querySelectorAll(".option__play") as NodeList,
  scorePlayer: document.querySelector(".score__player") as HTMLHeadingElement,
  scoreIA: document.querySelector(".score__ia") as HTMLHeadingElement,
  textResult: document.getElementById("text-result") as HTMLHeadingElement,
  textPlay: document.getElementById("text-play") as HTMLHeadingElement,
});
