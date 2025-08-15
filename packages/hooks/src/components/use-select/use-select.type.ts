import { ObjectKey } from '../../common/type';

export interface BaseSelectProps<DataItem, Value> {
  value?: Value;
  data?: DataItem[];
  treeData?: DataItem[];
  /**
   * @en Whether to disable data caching. By default, shineout caches value-to-data mappings for performance. When data changes frequently (e.g., updated from API), enabling this prevents stale cache issues
   * @cn 是否禁用数据缓存。出于性能考虑，shineout 默认会缓存 value 与 data 的映射关系。当 data 频繁变更时（如接口动态更新），开启此选项可避免缓存不一致问题
   * @default false
   * @whenCn 当列表数据会动态更新时使用，如通过接口实时获取数据或根据其他条件变化数据
   */
  noCache?: boolean;

  /**
   * @en Initial value for uncontrolled component
   * @cn 非受控组件的初始值
   * @whenCn 需要设置初始选中值但不需要外部控制时使用
   */
  defaultValue?: Value;
  control: boolean;
  separator?: string;

  /**
   * @en Enable multiple selection mode
   * @cn 是否开启多选模式
   * @default false
   * @whenCn 需要选择多个选项时使用
   */
  multiple?: boolean;
  childrenKey?: keyof DataItem;

  /**
   * @en When true, disables all options; when function, disables options where function returns true
   * @cn 为 true 时禁用全部选项；为函数时根据返回值禁用特定选项
   * @default false
   * @whenCn 需要禁用整个选择器或根据条件禁用特定选项时使用
   */
  disabled?: boolean | ((data: DataItem) => boolean);

  /**
   * @en Custom comparison function to determine if a value matches a data item. Solves JavaScript's reference equality (===) limitation where objects with identical content but different references are considered unequal
   * @cn 自定义匹配函数，用于判断 value 是否与数据项匹配。解决 JavaScript 引用相等（===）的局限性，即内容相同但引用不同的对象会被判定为不相等的问题
   * @default (val, d) => val===format(d)
   * @whenCn 当选中值为对象类型且数据源会重新生成（如从接口获取）时使用，避免因引用变化导致的匹配失败
   */
  prediction?: (value: Value extends (infer U)[] ? U : Value, Data: DataItem) => boolean;

  /**
   * @en Formats data item to value. String: extracts property (e.g., 'id' gets d.id). Function: returns custom value from data item
   * @cn 格式化数据项为选中值。字符串：提取对应属性（如 'id' 获取 d.id）。函数：从数据项返回自定义值
   * @default d => d
   * @whenCn 当数据项为对象但只需要其中某个属性作为值时使用
   */
  format?: ((data: DataItem) => Value extends (infer U)[] ? U : Value) | ObjectKey<DataItem>;

  /**
   * @en Intercepts value changes. Return new value to modify it, or undefined to prevent the change
   * @cn 拦截值变更。返回新值以修改，返回 undefined 阻止变更
   * @whenCn 需要在值变更前进行验证或转换时使用
   */
  beforeChange?: (value: Value) => any;

  /**
   * @en Callback when value changes. Parameters: value (selected value), data (selected data item), checked (selection state)
   * @cn 值变更回调。参数：value（选中值）、data（选中的数据项）、checked（选中状态）
   * @whenCn 需要响应选择变化时使用
   */
  onChange?: (value: Value, data?: DataItem, checked?: boolean) => void;

  /**
   * @en Groups options by returning group name for each item. Parameters: item (current data item to categorize), index (item's position in array), data (complete data array for context)
   * @cn 通过返回分组名称对选项进行分组。参数：item（当前要分类的数据项）、index（数据项在数组中的索引位置）、data（完整的数据数组，提供上下文信息）
   * @whenCn 需要将选项按类别分组显示时使用，如按部门、类型或首字母等条件组织选项
   */
  groupBy?: (item: DataItem, index?: number, data?: DataItem[]) => string;
  filterSameChange?: boolean;
}

export interface UseSelectProps<Value> {
  onSameChange: (value: Value) => void;
}
