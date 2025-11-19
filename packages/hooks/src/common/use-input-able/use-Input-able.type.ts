export type ChangeType<T> = (value: T, ...other: any[]) => void;
export interface InputAbleProps<T, V extends ChangeType<T>> {
  value: T | undefined;
  defaultValue: T | undefined;
  beforeChange: ((value: T) => T | void) | undefined;
  onChange: V | undefined;
  onSameChange?: V;
  control: boolean;
  // 延迟时间
  delay?: number;
  filterSameChange?: boolean;
  forceSyncInputValue?: boolean;
}
