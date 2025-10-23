import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { ChoiceProps } from "@src/entities/props";

import { Choice } from "@src/components/Choice/Choice";

type RenderComponent = {
  props: { onClick: jest.Mock } & ChoiceProps;
  container: HTMLImageElement;
};

const renderComponent = (
  id: string,
  name: string,
  srcImg: string,
  className?: string,
  onClick?: jest.Mock
): RenderComponent => {
  const props = {
    id,
    name,
    srcImg,
    className,
    onClick: onClick ?? jest.fn(),
  };

  const container = Choice({
    id: props.id,
    name: props.name,
    srcImg: props.srcImg,
    className: props.className,
    onClick: props.onClick,
  });

  document.body.appendChild(container);

  return { props: props, container: container };
};

describe("Choice.ts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    const baseProps = {
      id: "test-choice",
      name: "rock",
      srcImg: "/images/rock.png",
      className: "custom-class",
    };

    test("It should render an img element with correct attributes", () => {
      const { container } = renderComponent(
        baseProps.id,
        baseProps.name,
        baseProps.srcImg,
        baseProps.className
      );

      expect(container).toBeInstanceOf(HTMLImageElement);
      expect(container.id).toBe(baseProps.id);
      expect(container.src).toContain(baseProps.srcImg);
      expect(container.alt).toBe(baseProps.name);
      expect(container.className).toBe(`game__choice ${baseProps.className}`);
    });

    test("It should be accessible via getByRole", () => {
      renderComponent(
        baseProps.id,
        baseProps.name,
        baseProps.srcImg,
        baseProps.className
      );

      const img = screen.getByRole("img", { name: baseProps.name });
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute(
        "src",
        expect.stringContaining(baseProps.srcImg)
      );
    });

    test("It should apply default className when className is not provided", () => {
      const { container } = renderComponent(
        baseProps.id,
        baseProps.name,
        baseProps.srcImg
      );

      expect(container.className).toBe("game__choice ");
    });

    test("It should apply combined className when provided", () => {
      const { container } = renderComponent(
        baseProps.id,
        baseProps.name,
        baseProps.srcImg,
        "active"
      );

      expect(container.className).toBe("game__choice active");
    });
  });

  describe("Click Tests.", () => {
    test("It should call onClick handler when clicked", async () => {
      const mockOnClick = jest.fn();
      renderComponent(
        "choice",
        "paper",
        "/images/paper.png",
        undefined,
        mockOnClick
      );

      const img = screen.getByRole("img", { name: /paper/i });
      await user.click(img);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test("It should pass event object to onClick handler", async () => {
      const mockOnClick = jest.fn();
      renderComponent(
        "choice",
        "scissors",
        "/images/scissors.png",
        undefined,
        mockOnClick
      );

      const img = screen.getByRole("img", { name: /scissors/i });
      await user.click(img);

      expect(mockOnClick).toHaveBeenCalledWith(expect.any(MouseEvent));
    });
  });

  describe("Image rendering.", () => {
    test("It should render with correct src attribute", () => {
      const { container } = renderComponent(
        "img-choice",
        "rock",
        "/images/rock.png"
      );

      expect(container.src).toContain("/images/rock.png");
    });

    test("It should render with correct alt text", () => {
      const { container } = renderComponent(
        "img-choice",
        "lizard",
        "/images/lizard.png"
      );

      expect(container.alt).toBe("lizard");
    });

    test("It should handle different image sources", () => {
      const sources = [
        { name: "rock", src: "/images/rock.png" },
        { name: "paper", src: "/images/paper.png" },
        { name: "scissors", src: "/images/scissors.png" },
      ];

      sources.forEach((source) => {
        const { container } = renderComponent(
          `choice-${source.name}`,
          source.name,
          source.src
        );

        expect(container.src).toContain(source.src);
        expect(container.alt).toBe(source.name);
      });
    });
  });
});
