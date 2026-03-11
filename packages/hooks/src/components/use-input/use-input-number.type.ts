import { InputFormatProps } from './use-input-format.type';

export type NumberValue = string | number | undefined | null;
export interface InputNumberProps
  extends Omit<InputFormatProps, 'value' | 'onChange' | 'autoFix' | 'trim' | 'type'> {
  value: NumberValue;
  onChange: (value: NumberValue) => void | undefined;
  /**
   * @en default value, restore on blur when input is empty
   * @cn 默认值，输入为空失焦时恢复
   */
  defaultValue?: NumberValue;
  /**
   * @en Minimum value
   * @cn 最小值
   */
  min?: number;
  /**
   * @en Maximum value
   * @cn 最大值
   */
  max?: number;
  /**
   * @en Allow value is null
   * @cn 清空后值为 null
   */
  allowNull?: boolean;
  /**
   * @en Change the digital span. It can be decimal
   * @cn 改变数字跨度，可为小数
   * @default 1
   */
  step?: number;
  disabled?: boolean;
}
