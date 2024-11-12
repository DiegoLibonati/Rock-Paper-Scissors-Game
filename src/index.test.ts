import { screen } from "@testing-library/dom";

import { Result } from "./entities/enums";

import { resultOfUser, getUserChoice, resetToPlay } from "./index";

describe("resultOfUser", () => {
  it("should return Result.Win when user wins", () => {
    const userWinRock = resultOfUser("rock", "scissor");
    const userWinPaper = resultOfUser("paper", "rock");
    const userWinScissor = resultOfUser("scissor", "paper");

    expect(userWinRock).toBe(Result.Win);
    expect(userWinPaper).toBe(Result.Win);
    expect(userWinScissor).toBe(Result.Win);
  });

  it("should return Result.Lose when user loses", () => {
    const userLoseRock = resultOfUser("rock", "paper");
    const userLosePaper = resultOfUser("paper", "scissor");
    const userLoseScissor = resultOfUser("scissor", "rock");

    expect(userLoseRock).toBe(Result.Lose);
    expect(userLosePaper).toBe(Result.Lose);
    expect(userLoseScissor).toBe(Result.Lose);
  });

  it("should return Result.Draw when it's a draw", () => {
    const userDrawRock = resultOfUser("rock", "rock");
    const userDrawPaper = resultOfUser("paper", "paper");
    const userDrawScissor = resultOfUser("scissor", "scissor");

    expect(userDrawRock).toBe(Result.Draw);
    expect(userDrawPaper).toBe(Result.Draw);
    expect(userDrawScissor).toBe(Result.Draw);
  });
});

describe("getUserChoice", () => {
  beforeEach(() => {
    document.body.innerHTML = `
        <h2 id="text-play">Make your choice now!</h2>
        <h2 id="text-result">Choose an option</h2>

        <h3 class="score_player" id="user-score">0</h3>
        <h3 class="score_ia" id="ia-score">0</h3>

        <div class="game_container_choices">
        <img
            src="./src/assets/rock.png"
            alt="roca"
            class="option-to-play"
            id="rock"
        />
        <img
            src="./src/assets/paper.png"
            alt="papel"
            class="option-to-play"
            id="paper"
        />
        <img
            src="./src/assets/tijera.png"
            alt="tijera"
            class="option-to-play"
            id="scissor"
        />
        </div>
      `;
  });

  it("should update the result text and score when user or ia wins", () => {
    const event = { target: { id: "rock" } } as unknown as Event;

    const imgsUserOptions = screen.getAllByRole("img") as HTMLImageElement[];
    const textPlay = screen.getByRole("heading", {
      name: /make your choice now!/i,
    }) as HTMLHeadingElement;
    const textResult = screen.getByRole("heading", {
      name: /choose an option/i,
    }) as HTMLHeadingElement;
    const scores = screen.getAllByRole("heading", {
      name: /0/i,
    }) as HTMLHeadingElement[];

    const scorePlayer = scores.find((score) => score.id === "user-score")!;
    const scoreIA = scores.find((score) => score.id === "ia-score")!;

    for (let img of imgsUserOptions) {
      expect(img).toBeInTheDocument();
    }

    expect(textPlay).toBeInTheDocument();
    expect(textResult).toBeInTheDocument();
    expect(scorePlayer).toBeInTheDocument();
    expect(scoreIA).toBeInTheDocument();

    getUserChoice(
      event,
      imgsUserOptions,
      textPlay,
      textResult,
      scorePlayer,
      scoreIA
    );

    expect(textPlay).toHaveTextContent("");
    expect(textResult).not.toBe("choose an option");

    const scoreUserAfterFn =
      textResult.textContent?.includes("User Win") &&
      !textResult.textContent.includes("Draw")
        ? "1"
        : "0";
    const scoreIAAfterFn =
      textResult.textContent?.includes("Ia Win") &&
      !textResult.textContent.includes("Draw")
        ? "1"
        : "0";

    expect(scorePlayer.textContent).toBe(scoreUserAfterFn);
    expect(scoreIA.textContent).toBe(scoreIAAfterFn);

    for (let img of imgsUserOptions) {
      expect(img.style.pointerEvents).toBe("none");
    }
  });
});

describe("resetToPlay", () => {
  jest.useFakeTimers();

  beforeEach(() => {
    document.body.innerHTML = `
          <h2 id="text-play">random text play</h2>
          <h2 id="text-result">random text result</h2>
  
          <h3 class="score_player" id="user-score">0</h3>
          <h3 class="score_ia" id="ia-score">0</h3>
  
          <div class="game_container_choices">
          <img
              src="./src/assets/rock.png"
              alt="roca"
              class="option-to-play"
              id="rock"
          />
          <img
              src="./src/assets/paper.png"
              alt="papel"
              class="option-to-play"
              id="paper"
          />
          <img
              src="./src/assets/tijera.png"
              alt="tijera"
              class="option-to-play"
              id="scissor"
          />
          </div>
        `;
  });

  it("It must change the pointerEvent of each image, update the textPlay and textResult text after 2500 seconds.", () => {
    const imgsUserOptions = screen.getAllByRole("img") as HTMLImageElement[];
    const textPlay = screen.getByRole("heading", {
      name: /random text play/i,
    }) as HTMLHeadingElement;
    const textResult = screen.getByRole("heading", {
      name: /random text result/i,
    }) as HTMLHeadingElement;

    for (let img of imgsUserOptions) {
      expect(img).toBeInTheDocument();
    }

    expect(textPlay).toBeInTheDocument();
    expect(textResult).toBeInTheDocument();

    resetToPlay(imgsUserOptions, textPlay, textResult);

    jest.advanceTimersByTime(2500);

    screen.debug();

    for (let img of imgsUserOptions) {
      expect(img.style.pointerEvents).toBe("auto");
    }

    expect(textPlay.textContent).toBe("Make your choice now!");
    expect(textResult.textContent).toBe("Choose an option");
  });
});
