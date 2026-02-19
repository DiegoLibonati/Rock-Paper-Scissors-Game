interface DefaultProps {
  className?: string;
  children?: string;
}

export interface ChoiceProps extends DefaultProps {
  id: string;
  name: string;
  srcImg: string;
  onClick: (e: MouseEvent) => void;
}
