import { getElements } from "./getElements";

import { OFFICIAL_BODY } from "../tests/jest.setup";

beforeEach(() => {
  document.body.innerHTML = OFFICIAL_BODY;
});

afterEach(() => {
  document.body.innerHTML = "";
});

test("It must render the elements of the document that the 'getElements' function exports.", () => {
  const { imgsUserOptions, scoreIA, scorePlayer, textPlay, textResult } =
    getElements();

  expect(scoreIA).toBeInTheDocument();
  expect(scorePlayer).toBeInTheDocument();
  expect(textPlay).toBeInTheDocument();
  expect(textResult).toBeInTheDocument();

  for (let img of imgsUserOptions) {
    expect(img).toBeInTheDocument();
  }
});
