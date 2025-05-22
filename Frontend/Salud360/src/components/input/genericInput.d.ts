export interface GenericInputProps {
  idName: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (_: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}
