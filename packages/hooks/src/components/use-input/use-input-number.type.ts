import { InputFormatProps } from './use-input-format.type';

export type NumberValue = string | number | undefined | null;
export interface InputNumberProps
  extends Omit<InputFormatProps, 'value' | 'onChange' | 'autoFix' | 'trim' | 'coin' | 'type'> {
  value: NumberValue;
  onChange: (value: NumberValue) => void | undefined;
  /**
   * @en Minimum allowed value. Input below this will be constrained to this value
   * @cn 允许的最小值。低于此值的输入将被约束为该值
   * @when For range validation or preventing negative values
   */
  min?: number;
  /**
   * @en Maximum allowed value. Input above this will be constrained to this value
   * @cn 允许的最大值。高于此值的输入将被约束为该值
   * @when For range validation or setting upper limits
   */
  max?: number;
  /**
   * @en When true, clearing the input sets value to null instead of undefined
   * @cn 为 true 时，清空输入将值设为 null 而非 undefined
   * @when When null has special meaning in your data model
   */
  allowNull?: boolean;
  /**
   * @en Increment/decrement step when using arrow buttons or keyboard arrows. Supports decimals
   * @cn 使用箭头按钮或键盘箭头时的增减步长。支持小数
   * @default 1
   * @when For custom step increments like 0.1, 5, or 100
   */
  step?: number;
  disabled?: boolean;
}
