import { KeygenResult, KeygenType, ObjectKey } from '../../common/type';

export type TransferListType = 'source' | 'target';

export interface TransferInfo<DataItem> {
  data: DataItem[];
  validKeys: KeygenResult[];
  selectedKeys: Map<KeygenResult, boolean>;
  disabledKeys: KeygenResult[];
}

export interface BaseTransferProps<DataItem, Value extends KeygenResult[]> {
  /**
   * @en Data source
   * @cn 数据源
   * @default index
   */
  data: DataItem[];
  selectedKeys?: KeygenResult[];
  /**
   * @en Default checked list
   * @cn 默认被勾选的列表
   */
  defaultSelectedKeys?: KeygenResult[];
  /**
   * @en The set of values displayed in the box data on the right
   * @cn 显示在右侧框数据的值集合
   */
  value?: Value;
  /**
   * @en Default value
   * @cn 默认值  和 value 类型相同
   */
  defaultValue?: Value;
  /**
   * @en Format value. The defaule value is return the original data. When it is a string, the value is fetched from the original data as a key equivalent to (d) => d[format] When it is a function, use its return value
   * @cn 格式化 value, 默认值，返回原始数据。 为 string 时，会作为 key 从原始数据中获取值，相当于 (d) => d[format]; 为函数时，以函数返回结果作为 value
   * @default d => d
   */
  format?: ((data: DataItem) => Value[number]) | ObjectKey<DataItem>;
  /**
   * @en Generate a auxiliary method for each key If not filled, index will be used(not recommended,there may be problems with more than 10 data) When it is a function, use its return value. When it is a string，ues the value of the string.For example, "id" is the same thing as (d) => d.id
   * @cn 生成每一项key的辅助方法 为 true 时，以数据项本身作为key，相当于 (d => d) 为函数时，使用此函数返回值 为string时，使用这个string对应的数据值。如 "id"，相当于 (d => d.id)
   * @default index
   */
  keygen?: KeygenType<DataItem>;
  simple?: boolean;
  /**
   * @en When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true
   * @cn 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项
   */
  disabled?: boolean | ((data: DataItem) => boolean);
  valueControl: boolean;
  selectControl: boolean;
  /**
   * @en By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match
   * @cn 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配
   */
  prediction?: (value: Value[number], Data: DataItem) => boolean;
  /**
   * @en The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component
   * @cn 值改变前的回调，当返回值不为空时将作为组件的新值
   */
  beforeChange?: (value: Value) => any;
  /**
   * @en Change callback,Parameter is the selected value
   * @cn 改变回调,参数为当前选中值
   */
  onChange?: (value: Value, currentData: DataItem[] | DataItem, isTarget: boolean) => void;
  /**
   * @en Filter function, parameters are: input text, data, whether it is the data on the left
   * @cn 筛选函数, 参数为: 输入文本, 数据, 是否为左侧数据
   */
  onFilter?: (text: string, data: DataItem, isSource: boolean) => boolean;
  /**
   * @en Search event
   * @cn 输入框值变化的回调, 参数为: 输入文本, 是否为左侧数据
   */
  onSearch?: (text: string, isSource: boolean) => void;
  /**
   * ((value: KeygenResult) => void) 这种为内部非受控情况下的类型，非受控内部直接整合 target source
   * @en Select event
   * @cn 勾选触发的方法
   */
  onSelectChange?:
    | ((sourceKeys: KeygenResult[], targetKeys?: KeygenResult[]) => void)
    | ((selectKeys: KeygenResult[]) => void);
}
