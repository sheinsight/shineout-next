import { ReactNode } from 'react';
import { KeygenType, ObjectKey } from '@sheinx/hooks';
import { CommonType } from '../common/type';
import { RadioClasses } from './radio.type';
import { ButtonClasses } from '../button/button.type';

export interface RadioGroupProps<DataItem, Value>
  extends Pick<CommonType, 'className' | 'size' | 'style'> {
  jssStyle?: {
    radio?: () => RadioClasses;
    button?: () => ButtonClasses;
  };
  /**
   * @en You can pass in a set of Radio
   * @cn 可以传入一组Radio
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
   * @default (value, data) => value === format(data)
   */
  prediction?: (value: Value, data: DataItem) => boolean;
  /**
   * @en Format value. The defaule value is return the original data. When it is a string, the value is fetched from the original data as a key equivalent to (d) => d[format] When it is a function, use its return value
   * @cn 格式化 value, 默认值，返回原始数据。 为 string 时，会作为 key 从原始数据中获取值，相当于 (d) => d[format]; 为函数时，以函数返回结果作为 value
   * @default d => d
   */
  format?: ObjectKey<DataItem> | ((data: DataItem) => Value);
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
  onChange?: (value: Value, Data: DataItem) => void;
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
  /**
   * @en The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component
   * @cn 值改变前的回调，当返回值不为空时将作为组件的新值
   */
  beforeChange?: (value: Value) => Value | undefined;
  /**
   * @en When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true
   * @cn 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项
   * @default false
   */
  disabled?: boolean | ((data: DataItem) => boolean);
  /**
   * @en Customize the entire radio rendering. Compared to renderItem which only renders text content, this allows full control over layout and styles
   * @cn 完全自定义 radio 的渲染。相比 renderItem 只能渲染文本内容，renderWrapper 可以完全控制布局和样式
   * @version 3.9.4
   */
  renderWrapper?: (info: {
    content: React.ReactElement;
    wrapperProps: any;
    indicatorProps: any;
    inputProps: any;
    disabled?: boolean;
    checked?: boolean;
    children?: React.ReactNode;
    indicator?: React.ReactElement;
    item: DataItem;
    index: number;
  }) => React.ReactElement;
}
