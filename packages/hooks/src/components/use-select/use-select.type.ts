import { ObjectKey } from '../../common/type';

export interface BaseSelectProps<DataItem, Value> {
  value?: Value;
  data?: DataItem[];
  treeData?: DataItem[];

  /**
   * @en Initial value
   * @cn 默认值 通过 Value 类型
   */
  defaultValue?: Value;
  control: boolean;
  separator?: string;

  /**
   * @en If it is true, it will be multiple selection
   * @cn 是否是多选
   * @default false
   */
  multiple?: boolean;
  childrenKey?: keyof DataItem;

  /**
   * @en When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true
   * @cn 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项
   * @default false
   */
  disabled?: boolean | ((data: DataItem) => boolean);

  /**
   * @en By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match
   * @cn 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配
   * @default (val, d) => val===format(d)
   */
  prediction?: (value: Value, Data: DataItem) => boolean;

  /**
   * @en Format value. The defaule value is return the original data. When it is a string, the value is fetched from the original data as a key equivalent to (d) => d[format] When it is a function, use its return value
   * @cn 格式化 value, 默认值，返回原始数据。 为 string 时，会作为 key 从原始数据中获取值，相当于 (d) => d[format]; 为函数时，以函数返回结果作为 value
   * @default d => d
   */
  format?: ((data: DataItem) => Value extends (infer U)[] ? U : Value) | ObjectKey<DataItem>;

  /**
   * @en The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component
   * @cn 值改变前的回调，当返回值不为空时将作为组件的新值
   */
  beforeChange?: (value: Value) => any;

  /**
   * @en Change callback
   * @cn 值改变回调
   */
  onChange?: (value: Value, data?: DataItem | DataItem[], checked?: boolean) => void;

  /**
   * @en Group by
   * @cn 分组
   */
  groupBy?: (item: DataItem, index?: number, data?: DataItem[]) => string;
}
