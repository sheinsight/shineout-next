export interface UseSliderProps<Value extends number | number[]> {
  range: boolean;
  value: Value;
  onChange: (value: Value) => void;
  scale?: number[];
  step?: number;
}
