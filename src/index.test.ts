import { screen } from "@testing-library/dom";

const INITIAL_HTML = `
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

beforeEach(() => {
  jest.resetModules();
  document.body.innerHTML = INITIAL_HTML;
  require("./index.ts");
  document.dispatchEvent(new Event("DOMContentLoaded"));
});

afterEach(() => {
  document.body.innerHTML = "";
});

it("should update the result text and score when user or ia wins", () => {
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

  const rock = imgsUserOptions.find(
    (img) => img.id === "rock"
  ) as HTMLImageElement;
  rock?.click();

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

it("It must change the pointerEvent of each image, update the textPlay and textResult text after 2500 seconds.", async () => {
  jest.useFakeTimers();

  const imgsUserOptions = screen.getAllByRole("img") as HTMLImageElement[];
  const textPlay = screen.getByRole("heading", {
    name: /make your choice now!/i,
  }) as HTMLHeadingElement;
  const textResult = screen.getByRole("heading", {
    name: /choose an option/i,
  }) as HTMLHeadingElement;

  for (let img of imgsUserOptions) {
    expect(img).toBeInTheDocument();
  }

  expect(textPlay).toBeInTheDocument();
  expect(textResult).toBeInTheDocument();

  const rock = imgsUserOptions.find(
    (img) => img.id === "rock"
  ) as HTMLImageElement;
  rock?.click();

  expect(textPlay.textContent).not.toBe("Make your choice now!");
  expect(textResult.textContent).not.toBe("Choose an option");

  await jest.advanceTimersByTimeAsync(2500);

  for (let img of imgsUserOptions) {
    expect(img.style.pointerEvents).toBe("auto");
  }

  expect(textPlay.textContent).toBe("Make your choice now!");
  expect(textResult.textContent).toBe("Choose an option");

  jest.useRealTimers();
});
