import { getElements } from "./getElements";

const INITIAL_HTML: string = `
    <main>
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
        <h3 class="score_player" id="user-score">0</h3>
        <h3 class="score_ia" id="ia-score">0</h3>
        <h2 id="text-result">Choose an option</h2>
        <h2 id="text-play">Make your choice now!</h2>
    </main>
`;

beforeEach(() => {
  const body = INITIAL_HTML;

  document.body.innerHTML = body;
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
