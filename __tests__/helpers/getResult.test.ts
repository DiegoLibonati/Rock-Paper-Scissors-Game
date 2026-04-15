import { getResult } from "@/helpers/getResult";
import { Result } from "@/types/enums";

describe("getResult", () => {
  describe("Win", () => {
    it("should return Win when user chooses rock and ia chooses scissor", () => {
      expect(getResult("rock", "scissor")).toBe(Result.Win);
    });

    it("should return Win when user chooses paper and ia chooses rock", () => {
      expect(getResult("paper", "rock")).toBe(Result.Win);
    });

    it("should return Win when user chooses scissor and ia chooses paper", () => {
      expect(getResult("scissor", "paper")).toBe(Result.Win);
    });
  });

  describe("Lose", () => {
    it("should return Lose when user chooses rock and ia chooses paper", () => {
      expect(getResult("rock", "paper")).toBe(Result.Lose);
    });

    it("should return Lose when user chooses paper and ia chooses scissor", () => {
      expect(getResult("paper", "scissor")).toBe(Result.Lose);
    });

    it("should return Lose when user chooses scissor and ia chooses rock", () => {
      expect(getResult("scissor", "rock")).toBe(Result.Lose);
    });
  });

  describe("Draw", () => {
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
