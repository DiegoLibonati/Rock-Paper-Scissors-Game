import { Result } from "@src/entities/enums";
import { RoundResult } from "@src/entities/helpers";

export const getResult: RoundResult = (userValue, iaValue) => {
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
