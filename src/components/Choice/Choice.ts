import type { ChoiceProps } from "@/types/props";
import type { ChoiceComponent } from "@/types/components";

import "@/components/Choice/Choice.css";

const Choice = ({
  id,
  name,
  className,
  srcImg,
  onClick,
}: ChoiceProps): ChoiceComponent => {
  const img = document.createElement("img") as ChoiceComponent;
  img.id = id;
  img.src = srcImg;
  img.alt = name;
  img.className = `game__choice ${className ?? ""}`;
  img.setAttribute("role", "button");
  img.setAttribute("tabindex", "0");
  img.setAttribute("aria-label", `Choose ${name}`);

  const handleClick = (e: MouseEvent): void => {
    onClick(e);
  };

  img.addEventListener("click", handleClick);

  img.cleanup = (): void => {
    img.removeEventListener("click", handleClick);
  };

  return img;
};

export default Choice;
