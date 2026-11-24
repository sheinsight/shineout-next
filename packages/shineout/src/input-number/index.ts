import InputNumber from './input-number';

type RefInputNumber = typeof InputNumber;

export interface InputNumberComponent extends RefInputNumber {
  displayName: string;
}

const InputNumberComp: InputNumberComponent = InputNumber as InputNumberComponent;

InputNumberComp.displayName = 'ShineoutInputNumber';

export default InputNumberComp;
