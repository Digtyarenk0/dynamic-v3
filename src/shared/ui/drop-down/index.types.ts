export interface DropDownProps {
  active: boolean;
  setActive: (p: boolean) => void;
  children?: React.ReactElement;
  className?: string;
}
