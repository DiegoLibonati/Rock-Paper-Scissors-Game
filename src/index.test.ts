import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { OFFICIAL_BODY } from "./tests/jest.constants";

describe("index.ts", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      jest.useFakeTimers();

      document.body.innerHTML = OFFICIAL_BODY;

      require("./index.ts");
      document.dispatchEvent(new Event("DOMContentLoaded"));
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();

      document.body.innerHTML = "";
    });

    test("It should update the result text and score when user or ia wins", async () => {
      const userEvent = user.setup({
        advanceTimers: jest.advanceTimersByTime,
      });

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
      await userEvent.click(rock);

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

    test("It must change the pointerEvent of each image, update the textPlay and textResult text after 2500 seconds.", async () => {
      const userEvent = user.setup({
        advanceTimers: jest.advanceTimersByTime,
      });

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
      await userEvent.click(rock);

      expect(textPlay.textContent).not.toBe("Make your choice now!");
      expect(textResult.textContent).not.toBe("Choose an option");

      await jest.advanceTimersByTimeAsync(2500);

      for (let img of imgsUserOptions) {
        expect(img.style.pointerEvents).toBe("auto");
      }

      expect(textPlay.textContent).toBe("Make your choice now!");
      expect(textResult.textContent).toBe("Choose an option");
    });
  });
});
