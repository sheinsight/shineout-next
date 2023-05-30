export interface InputAbleProps<T> {
  value: T | undefined;
  defaultValue: T | undefined;
  beforeChange: ((value: T | undefined) => T | void) | undefined;
  onChange: ((value: T | undefined, ...other: any[]) => void) | undefined;
  control: boolean;
}
