import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { ChoiceProps } from "@/types/props";
import type { ChoiceComponent } from "@/types/components";

import Choice from "@/components/Choice/Choice";

const renderComponent = (props: ChoiceProps): ChoiceComponent => {
  const container = Choice(props);
  document.body.appendChild(container);
  return container;
};

describe("Choice Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const mockOnClick = jest.fn();

  const defaultProps: ChoiceProps = {
    id: "rock",
    name: "rock",
    srcImg: "/images/rock.png",
    onClick: mockOnClick,
  };

  it("should render image with correct attributes", () => {
    renderComponent(defaultProps);

    const image = screen.getByAltText("rock");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("id", "rock");
    expect(image).toHaveAttribute("src", "/images/rock.png");
    expect(image).toHaveClass("game__choice");
    expect(image.tagName).toBe("IMG");
  });

  it("should call onClick handler when clicked", async () => {
    const user = userEvent.setup();
    renderComponent(defaultProps);

    const image = screen.getByAltText("rock");
    await user.click(image);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(expect.any(MouseEvent));
  });

  it("should apply additional className when provided", () => {
    const propsWithClass: ChoiceProps = {
      ...defaultProps,
      className: "custom-choice",
    };

    renderComponent(propsWithClass);

    const image = screen.getByAltText("rock");
    expect(image).toHaveClass("game__choice", "custom-choice");
  });

  it("should render different choices", () => {
    const paperProps: ChoiceProps = {
      id: "paper",
      name: "paper",
      srcImg: "/images/paper.png",
      onClick: mockOnClick,
    };

    renderComponent(paperProps);

    const image = screen.getByAltText("paper");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("id", "paper");
  });

  it("should cleanup event listener", async () => {
    const user = userEvent.setup();
    const choice = renderComponent(defaultProps);

    choice.cleanup?.();

    const image = screen.getByAltText("rock");
    await user.click(image);

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
