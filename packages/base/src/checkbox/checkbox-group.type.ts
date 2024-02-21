import { ReactNode } from 'react';
import { KeygenType, ObjectKey } from '@sheinx/hooks';
import { CommonType } from '../common/type';
import { CheckboxStyle } from './checkbox.type';

export interface CheckboxGroupProps<DataItem, Value extends any[] | string>
  extends Pick<CommonType, 'className' | 'size' | 'style'> {
  jssStyle: CheckboxStyle;
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
  /**
   * @en By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match
   * @cn 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配
   * @default (val, d) => val===format(d)
   */
  prediction?: (value: Value[number], data: DataItem) => boolean;
  /**
   * @en Format value. The defaule value is return the original data. When it is a string, the value is fetched from the original data as a key equivalent to (d) => d[format] When it is a function, use its return value
   * @cn 格式化 value, 默认值，返回原始数据。 为 string 时，会作为 key 从原始数据中获取值，相当于 (d) => d[format]; 为函数时，以函数返回结果作为 value
   * @default d => d
   */
  format?: ObjectKey<DataItem> | ((data: DataItem) => Value[number]);
  /**
   * @en Set with multiple, value will separator by this
   * @cn 多选情况下设置后，value 会处理为 separator 分隔的字符串
   */
  separator?: string;
  /**
   * @en Key generator When it is true, the data itself is used as the key equivalent to (d => d) When it is a function, use its return value. When it is a string，ues the value of the string.For example, "id" is the same thing as (d) => d.id
   * @cn 生成每一项key的辅助方法 为 true 时，以数据项本身作为key，相当于 (d => d) 为函数时，使用此函数返回值 为string时，使用这个string对应的数据值。如 "id"，相当于 (d => d.id)
   * @default index
   */
  keygen: KeygenType<DataItem>;
  /**
   * @en The default is horizontal layout and setting the block property can changed it to be vertical layout.
   * @cn 默认为水平布局，设置 block 属性可以改为垂直布局
   */
  block?: boolean;
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
  /**
   * @en Default value
   * @cn 默认值  和 value 类型相同
   */
  defaultValue?: Value;
  beforeChange?: (value: Value) => Value | undefined;
  /**
   * @en When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true
   * @cn 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项
   * @default false
   */
  disabled?: boolean | ((data: DataItem) => boolean);
}
