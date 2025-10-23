import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { Result } from "@src/entities/enums";

import { RockPaperScissorsPage } from "@src/pages/RockPaperScissorsPage/RockPaperScissorsPage";

import { getResult } from "@src/helpers/getResult";

jest.mock("@src/helpers/getResult");
jest.mock("@src/constants/vars", () => ({
  iaChoices: ["rock", "paper", "scissor"],
}));

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const container = RockPaperScissorsPage();
  document.body.appendChild(container);
  return { container: container };
};

describe("RockPaperScissorsPage.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Math, "random").mockReturnValue(0);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.restoreAllMocks();
  });

  describe("General Tests.", () => {
    test("It should render the main game structure", () => {
      const { container } = renderComponent();

      expect(container).toBeInstanceOf(HTMLElement);
      expect(container.className).toBe("game-main");
      expect(container.querySelector(".game")).toBeInTheDocument();
    });

    test("It should render header with player and computer sections", () => {
      renderComponent();

      const playerName = screen.getByText("Player");
      const computerName = screen.getByText("Computer");
      const playerScore = document.getElementById("user-score");
      const iaScore = document.getElementById("ia-score");

      expect(playerName).toBeInTheDocument();
      expect(computerName).toBeInTheDocument();
      expect(playerScore).toBeInTheDocument();
      expect(iaScore).toBeInTheDocument();
    });

    test("It should render initial game state", () => {
      renderComponent();

      const textResult = screen.getByText("Choose an option");
      const textPlay = screen.getByText("Make your choice now!");

      expect(textResult).toBeInTheDocument();
      expect(textPlay).toBeInTheDocument();
    });

    test("It should render three choice options", () => {
      renderComponent();

      const rock = screen.getByRole("img", { name: "roca" });
      const paper = screen.getByRole("img", { name: "papel" });
      const scissor = screen.getByRole("img", { name: "tijera" });

      expect(rock).toBeInTheDocument();
      expect(paper).toBeInTheDocument();
      expect(scissor).toBeInTheDocument();
    });

    test("It should initialize scores to 0", () => {
      renderComponent();

      const playerScore = document.getElementById("user-score");
      const iaScore = document.getElementById("ia-score");

      expect(playerScore?.textContent).toBe("0");
      expect(iaScore?.textContent).toBe("0");
    });
  });

  describe("User Win Tests.", () => {
    test("It should update result text when user wins", async () => {
      (getResult as jest.Mock).mockReturnValue(Result.Win);
      renderComponent();

      const rock = screen.getByRole("img", { name: "roca" });
      await user.click(rock);

      const textResult = screen.getByText(/User Win!/i);
      expect(textResult).toBeInTheDocument();
      expect(textResult.textContent).toContain("User choose: rock");
      expect(textResult.textContent).toContain("Ia choose: rock");
    });

    test("It should increment player score when user wins", async () => {
      (getResult as jest.Mock).mockReturnValue(Result.Win);
      renderComponent();

      const rock = screen.getByRole("img", { name: "roca" });
      await user.click(rock);

      const playerScore = document.getElementById("user-score");
      expect(playerScore?.textContent).toBe("1");
    });

    test("It should not increment IA score when user wins", async () => {
      (getResult as jest.Mock).mockReturnValue(Result.Win);
      renderComponent();

      const rock = screen.getByRole("img", { name: "roca" });
      await user.click(rock);

      const iaScore = document.getElementById("ia-score");
      expect(iaScore?.textContent).toBe("0");
    });

    test("It should disable choices after user wins", async () => {
      (getResult as jest.Mock).mockReturnValue(Result.Win);
      renderComponent();

      const rock = screen.getByRole("img", { name: "roca" });
      await user.click(rock);

      const choices =
        document.querySelectorAll<HTMLImageElement>(".game__choice");
      choices.forEach((choice) => {
        expect(choice.style.pointerEvents).toBe("none");
      });
    });

    test("It should clear description text after user wins", async () => {
      (getResult as jest.Mock).mockReturnValue(Result.Win);
      renderComponent();

      const rock = screen.getByRole("img", { name: "roca" });
      await user.click(rock);

      const textPlay = document.querySelector(".game__description");
      expect(textPlay?.textContent).toBe("");
    });
  });

  describe("IA Win Tests.", () => {
    test("It should update result text when IA wins", async () => {
      (getResult as jest.Mock).mockReturnValue(Result.Lose);
      renderComponent();

      const paper = screen.getByRole("img", { name: "papel" });
      await user.click(paper);

      const textResult = screen.getByText(/Ia Win!/i);
      expect(textResult).toBeInTheDocument();
      expect(textResult.textContent).toContain("User choose: paper");
      expect(textResult.textContent).toContain("Ia choose: rock");
    });

    test("It should increment IA score when IA wins", async () => {
      (getResult as jest.Mock).mockReturnValue(Result.Lose);
      renderComponent();

      const paper = screen.getByRole("img", { name: "papel" });
      await user.click(paper);

      const iaScore = document.getElementById("ia-score");
      expect(iaScore?.textContent).toBe("1");
    });

    test("It should not increment player score when IA wins", async () => {
      (getResult as jest.Mock).mockReturnValue(Result.Lose);
      renderComponent();

      const paper = screen.getByRole("img", { name: "papel" });
      await user.click(paper);

      const playerScore = document.getElementById("user-score");
      expect(playerScore?.textContent).toBe("0");
    });

    test("It should disable choices after IA wins", async () => {
      (getResult as jest.Mock).mockReturnValue(Result.Lose);
      renderComponent();

      const paper = screen.getByRole("img", { name: "papel" });
      await user.click(paper);

      const choices =
        document.querySelectorAll<HTMLImageElement>(".game__choice");
      choices.forEach((choice) => {
        expect(choice.style.pointerEvents).toBe("none");
      });
    });
  });

  describe("Draw Tests.", () => {
    test("It should update result text on draw", async () => {
      (getResult as jest.Mock).mockReturnValue(Result.Draw);
      renderComponent();

      const scissor = screen.getByRole("img", { name: "tijera" });
      await user.click(scissor);

      const textResult = screen.getByText(/Draw!/i);
      expect(textResult).toBeInTheDocument();
      expect(textResult.textContent).toContain("User choose: scissor");
      expect(textResult.textContent).toContain("Ia choose: rock");
    });

    test("It should not increment any score on draw", async () => {
      (getResult as jest.Mock).mockReturnValue(Result.Draw);
      renderComponent();

      const scissor = screen.getByRole("img", { name: "tijera" });
      await user.click(scissor);

      const playerScore = document.getElementById("user-score");
      const iaScore = document.getElementById("ia-score");

      expect(playerScore?.textContent).toBe("0");
      expect(iaScore?.textContent).toBe("0");
    });

    test("It should disable choices on draw", async () => {
      (getResult as jest.Mock).mockReturnValue(Result.Draw);
      renderComponent();

      const scissor = screen.getByRole("img", { name: "tijera" });
      await user.click(scissor);

      const choices =
        document.querySelectorAll<HTMLImageElement>(".game__choice");
      choices.forEach((choice) => {
        expect(choice.style.pointerEvents).toBe("none");
      });
    });
  });
});
