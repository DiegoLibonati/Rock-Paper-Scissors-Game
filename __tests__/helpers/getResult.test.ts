import { Result } from "@/types/enums";

import { getResult } from "@/helpers/getResult";

describe("getResult", () => {
  describe("User wins scenarios", () => {
    it("should return Win when user chooses rock and IA chooses scissor", () => {
      expect(getResult("rock", "scissor")).toBe(Result.Win);
    });

    it("should return Win when user chooses paper and IA chooses rock", () => {
      expect(getResult("paper", "rock")).toBe(Result.Win);
    });

    it("should return Win when user chooses scissor and IA chooses paper", () => {
      expect(getResult("scissor", "paper")).toBe(Result.Win);
    });
  });

  describe("User loses scenarios", () => {
    it("should return Lose when user chooses rock and IA chooses paper", () => {
      expect(getResult("rock", "paper")).toBe(Result.Lose);
    });

    it("should return Lose when user chooses paper and IA chooses scissor", () => {
      expect(getResult("paper", "scissor")).toBe(Result.Lose);
    });

    it("should return Lose when user chooses scissor and IA chooses rock", () => {
      expect(getResult("scissor", "rock")).toBe(Result.Lose);
    });
  });

  describe("Draw scenarios", () => {
    it("should return Draw when both choose rock", () => {
      expect(getResult("rock", "rock")).toBe(Result.Draw);
    });

    it("should return Draw when both choose paper", () => {
      expect(getResult("paper", "paper")).toBe(Result.Draw);
    });

    it("should return Draw when both choose scissor", () => {
      expect(getResult("scissor", "scissor")).toBe(Result.Draw);
    });
  });
});
