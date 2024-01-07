export interface UseSliderProps<Value extends number | number[]> {
  value: Value | undefined;
  onChange: (value: Value) => void;
  range: boolean;
  scale: number[];
  step: number;
  vertical: boolean;
  onIncrease: (() => void) | undefined;
}
