export type PasswordValue = string | undefined;
export interface InputPasswordProps {
  value: PasswordValue;
  onChange: (value: PasswordValue) => void;
  point?: string;
}
