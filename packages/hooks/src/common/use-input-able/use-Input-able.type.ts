export interface InputAbleProps<T> {
  value: T | undefined;
  defaultValue: T | undefined;
  beforeChange: ((value: T) => T | void) | undefined;
  onChange: ((value: T, ...other: any[]) => void) | undefined;
  control: boolean;
}
