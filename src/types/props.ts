interface DefaultProps {
  className?: string | undefined;
  children?: string | undefined;
}

export interface ChoiceProps extends DefaultProps {
  id: string;
  name: string;
  srcImg: string;
  onClick: (e: MouseEvent) => void;
}
