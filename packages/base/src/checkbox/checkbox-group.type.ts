import { ReactNode } from 'react';
import { KeygenType, ObjectKey } from '@sheinx/hooks';
import { CommonType } from '../common/type';
import { CheckboxClasses } from './checkbox.type';

export interface CheckboxGroupClasses extends CheckboxClasses {
  group: string;
  groupBlock: string;
  groupButton: string;
  groupOutline: string;
  groupSmall: string;
  groupLarge: string;
}

export interface CheckboxGroupProps<DataItem, Value>
  extends Pick<CommonType, 'className' | 'size' | 'style'> {
  jssStyle: CheckboxGroupClasses;
  /**
   * @en You can pass in a set of Checkbox
   * @cn 可以传入一组Checkbox
   */
  children?: ReactNode;
  /**
   * @en When it is a string, return d\\[string]. When it is a function, return the result of the function.
   * @cn 为 string 时，返回 d\\[string]。 为 function 时，返回函数结果
   * @default  d => d
   */
  renderItem?: ObjectKey<DataItem> | ((data: DataItem, index?: number) => ReactNode);
  prediction?: (value: Value, data: DataItem) => boolean;
  format?: ObjectKey<DataItem> | ((data: DataItem) => Value);
  keygen: KeygenType<DataItem>;
  /**
   * @en The default is horizontal layout and setting the block property can changed it to be vertical layout.
   * @cn 默认为水平布局，设置 block 属性可以改为垂直布局
   */
  block?: boolean;
  /**
   * @en set button to show button style
   * @cn 设置 button 属性可以展示为按钮样式
   */
  button?: boolean | 'outline';
  /**
   * @en the data items
   * @cn 数据项
   * @override any[]
   */
  data?: DataItem[];
  /**
   * @en The callback function for changing value
   * @cn 值改变回调函数
   */
  onChange?: (value: Value) => void;
  /**
   * @en In the Form, value is taken over by the Form and the value will be invalid.
   * @cn 在 Form中，value 会被表单接管，value 无效
   * @override any
   */
  value?: Value;
  defaultValue?: Value;
  beforeChange?: (value: Value) => Value | undefined;
  disabled?: boolean | ((data: DataItem) => boolean);
}
