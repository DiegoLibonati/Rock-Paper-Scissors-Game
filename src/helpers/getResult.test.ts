import { Result } from "@src/entities/enums.d";

import { getResult } from "@src/helpers/getResult";

describe("getResult.ts", () => {
  describe("General Tests.", () => {
    test("It should return Result.Win when user wins", () => {
      const userWinRock = getResult("rock", "scissor");
      const userWinPaper = getResult("paper", "rock");
      const userWinScissor = getResult("scissor", "paper");

      expect(userWinRock).toBe(Result.Win);
      expect(userWinPaper).toBe(Result.Win);
      expect(userWinScissor).toBe(Result.Win);
    });

    test("It should return Result.Lose when user loses", () => {
      const userLoseRock = getResult("rock", "paper");
      const userLosePaper = getResult("paper", "scissor");
      const userLoseScissor = getResult("scissor", "rock");

      expect(userLoseRock).toBe(Result.Lose);
      expect(userLosePaper).toBe(Result.Lose);
      expect(userLoseScissor).toBe(Result.Lose);
    });

    test("It should return Result.Draw when it's a draw", () => {
      const userDrawRock = getResult("rock", "rock");
      const userDrawPaper = getResult("paper", "paper");
      const userDrawScissor = getResult("scissor", "scissor");

      expect(userDrawRock).toBe(Result.Draw);
      expect(userDrawPaper).toBe(Result.Draw);
      expect(userDrawScissor).toBe(Result.Draw);
    });
  });
});
