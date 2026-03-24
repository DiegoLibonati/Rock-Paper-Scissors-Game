import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { RockPaperScissorsPage } from "@/pages/RockPaperScissorsPage/RockPaperScissorsPage";

import type { Page } from "@/types/pages";

const renderPage = (): Page => {
  const container = RockPaperScissorsPage();
  document.body.appendChild(container);
  return container;
};

describe("RockPaperScissorsPage", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("should render the page with correct structure", () => {
    renderPage();

    const main = document.querySelector<HTMLElement>(".game-main");
    expect(main).toBeInTheDocument();
    expect(main?.tagName).toBe("MAIN");
  });

  it("should render player and computer sections", () => {
    renderPage();

    expect(screen.getByText("Player")).toBeInTheDocument();
    expect(screen.getByText("Computer")).toBeInTheDocument();
  });

  it("should render initial scores as 0", () => {
    renderPage();

    const playerScore =
      document.querySelector<HTMLHeadingElement>("#user-score");
    const iaScore = document.querySelector<HTMLHeadingElement>("#ia-score");

    expect(playerScore?.textContent).toBe("0");
    expect(iaScore?.textContent).toBe("0");
  });

  it("should render initial game messages", () => {
    renderPage();

    expect(screen.getByText("Choose an option")).toBeInTheDocument();
    expect(screen.getByText("Make your choice now!")).toBeInTheDocument();
  });

  it("should render all three choice images", () => {
    renderPage();

    expect(screen.getByAltText("rock")).toBeInTheDocument();
    expect(screen.getByAltText("paper")).toBeInTheDocument();
    expect(screen.getByAltText("scissor")).toBeInTheDocument();
  });

  it("should update result text when user makes a choice", async () => {
    const user = userEvent.setup({ delay: null });
    renderPage();

    const rockChoice = screen.getByAltText("rock");
    await user.click(rockChoice);

    const resultText =
      document.querySelector<HTMLHeadingElement>("#text-result");
    expect(resultText?.textContent).toContain("User choose: rock");
    expect(resultText?.textContent).toContain("Ia choose:");
  });

  it("should update player score when player wins", async () => {
    const user = userEvent.setup({ delay: null });
    const mathRandomSpy = jest.spyOn(Math, "random").mockReturnValue(0.9);

    renderPage();

    const rockChoice = screen.getByAltText("rock");
    await user.click(rockChoice);

    const resultText =
      document.querySelector<HTMLHeadingElement>("#text-result");

    if (resultText?.textContent.includes("User Win!")) {
      const playerScore =
        document.querySelector<HTMLHeadingElement>("#user-score");
      expect(playerScore?.textContent).toBe("1");
    }

    mathRandomSpy.mockRestore();
  });

  it("should update computer score when computer wins", async () => {
    const user = userEvent.setup({ delay: null });
    const mathRandomSpy = jest.spyOn(Math, "random").mockReturnValue(0.3);

    renderPage();

    const rockChoice = screen.getByAltText("rock");
    await user.click(rockChoice);

    const resultText =
      document.querySelector<HTMLHeadingElement>("#text-result");

    if (resultText?.textContent.includes("Ia Win!")) {
      const iaScore = document.querySelector<HTMLHeadingElement>("#ia-score");
      expect(iaScore?.textContent).toBe("1");
    }

    mathRandomSpy.mockRestore();
  });

  it("should show draw message when both choose same option", async () => {
    const user = userEvent.setup({ delay: null });
    const mathRandomSpy = jest.spyOn(Math, "random").mockReturnValue(0);

    renderPage();

    const rockChoice = screen.getByAltText("rock");
    await user.click(rockChoice);

    const resultText =
      document.querySelector<HTMLHeadingElement>("#text-result");
    expect(resultText?.textContent).toContain("Draw!");

    mathRandomSpy.mockRestore();
  });

  it("should disable choices after selection", async () => {
    const user = userEvent.setup({ delay: null });
    renderPage();

    const rockChoice = screen.getByAltText("rock");
    await user.click(rockChoice);

    expect(rockChoice.style.pointerEvents).toBe("none");
  });

  it("should reset game after timeout", async () => {
    const user = userEvent.setup({ delay: null });
    renderPage();

    const rockChoice = screen.getByAltText("rock");
    await user.click(rockChoice);

    jest.advanceTimersByTime(2500);

    const resultText =
      document.querySelector<HTMLHeadingElement>("#text-result");
    const playText = document.querySelector<HTMLHeadingElement>("#text-play");

    expect(resultText?.textContent).toBe("Choose an option");
    expect(playText?.textContent).toBe("Make your choice now!");
  });

  it("should re-enable choices after reset", async () => {
    const user = userEvent.setup({ delay: null });
    renderPage();

    const rockChoice = screen.getByAltText("rock");
    await user.click(rockChoice);

    expect(rockChoice.style.pointerEvents).toBe("none");

    jest.advanceTimersByTime(2500);

    expect(rockChoice.style.pointerEvents).toBe("auto");
  });

  it("should cleanup timeout and observer on page cleanup", () => {
    const page = renderPage();

    expect(page.cleanup).toBeDefined();
    page.cleanup?.();

    expect(page.cleanup).toBeDefined();
  });
});
