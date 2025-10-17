import { ChoiceProps } from "@src/entities/props";

import "@src/components/Choice/Choice.css";

export const Choice = ({
  id,
  name,
  className,
  srcImg,
  onClick,
}: ChoiceProps): HTMLImageElement => {
  const img = document.createElement("img");
  img.id = id;
  img.src = srcImg;
  img.alt = name;
  img.className = `game__choice ${className ?? ""}`;

  img.addEventListener("click", (e) => onClick(e));

  return img;
};
