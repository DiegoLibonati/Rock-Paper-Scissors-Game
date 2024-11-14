import { screen } from "@testing-library/dom";

import fs from "fs";
import path from "path";

const INITIAL_HTML: string = fs.readFileSync(
  path.resolve(__dirname, "../index.html"),
  "utf8"
);

beforeEach(() => {
  jest.resetModules();
  const body = INITIAL_HTML.match(/<body[^>]*>([\s\S]*?)<\/body>/i)![1];

  document.body.innerHTML = body;
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
