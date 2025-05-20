import { StructKeygenStringType, KeygenResult, ObjectKey } from '../../common/type';

export type CheckedStatusType = 0 | 1 | 2;

export type TreeModeType = 0 | 1 | 2 | 3 | 4;

export type UpdateFunc = (name: string, active: boolean) => void;

export type FlatNodeType<DataItem> = {
  id: KeygenResult;
  data: DataItem;
  level: number;
  pid?: KeygenResult | null;
};

export type FlatMapType = {
  active: boolean;
  expanded: boolean;
  fetching: boolean;
};

export interface TreeContext<DataItem> {
  pathMap: Map<KeygenResult, TreePathType>;
  dataMap: Map<KeygenResult, DataItem>;
  dataFlat: FlatNodeType<DataItem>[];
  dataFlatStatusMap: Map<KeygenResult, FlatMapType>;
  valueMap: Map<KeygenResult, CheckedStatusType>;
  unmatchedValueMap: Map<any, any>;
  updateMap: Map<KeygenResult, UpdateFunc>;
  forceUpdateMap: Map<KeygenResult, () => void>;
  value?: KeygenResult[];
  cachedValue: KeygenResult[];
  data?: DataItem[];
  valueDataCache: Map<KeygenResult, DataItem>;
}

export interface TreePathType {
  children: KeygenResult[];
  path: KeygenResult[];
  isDisabled: boolean;
  indexPath: number[];
  index: number;
}

export interface DisabledOption<DataItem> {
  disabled: (data: DataItem) => boolean;
  isRealtime: boolean;
}

export interface BaseTreeProps<DataItem> {
  /**
   * @private 内部属性
   */
  isControlled: boolean;
  /**
   * @private 内部属性
   */
  tiledData?: DataItem[];
  active?: KeygenResult;
  /**
   * @en Selected key (controlled)
   * @cn 选中的 key （受控）
   */
  value?: KeygenResult[];
  /**
   * @en Default selected key (not controlled)
   * @cn 默认选中的 key （非受控）
   */
  defaultValue?: KeygenResult[];
  /**
   * @en Data, children is children, if children is null or length is 0, it is considered as a leaf node
   * @cn 数据，子节点为 children，如果 children 值为 null 或 长度为 0 时，视为叶子节点
   */
  data: DataItem[];
  /**
   * @en Expanded node
   * @cn 展开的节点 key(受控)
   */
  expanded?: KeygenResult[];
  /**
   * @en Default expanded nodes
   * @cn 默认展开的节点 key（非受控）
   */
  defaultExpanded?: KeygenResult[];
  /**
   * @en Expanded all nodes
   * @cn 默认展开所有节点
   * @default false
   */
  defaultExpandAll?: boolean;
  /**
   * @en Control whether the node can be chosen
   * @cn 显示选择框时有效，为 true 时，所有节点禁用选择，为函数时，根据函数返回结果确定是否禁用
   * @default false
   */
  disabled?: boolean | ((item: DataItem) => boolean) | DisabledOption<DataItem>;
  /**
   * @en Auxiliary method for generating key. When it is a function, use the return value of this function. When it is a string, use the data value corresponding to this string. For example, "id" is the same thing as (d) => d.id
   * @cn 生成 key 的辅助方法, 为函数时，使用此函数返回值, 为 string 时，使用这个 string 对应的数据值。如 "id"，相当于 (d) => d.id
   * @default index
   */
  keygen: StructKeygenStringType<DataItem>;
  /**
   * @en Specify the name of the subdata
   * @cn 指定子数据的属性名
   * @default 'children'
   */
  childrenKey?: ObjectKey<DataItem>;
  /**
   * @en Mode 0: Returns only the fully selected node including the parent node. 1: Returns all selected nodes and semi-selected nodes. 2: Return only the selected child nodes. 3: If the parent node is full selected, only return the parent node. 4: What you choose is what you get
   * @cn 选中值模式，未设置值为单选 0: 只返回完全选中的节点，包含父节点 1: 返回全部选中的节点和半选中的父节点 2: 只返回选中的子节点 3: 如果父节点选中，只返回父节点 4: 所选即所得
   * @default 1
   */
  mode?: TreeModeType;
  /**
   * @en Whether to monitor data changes to update data
   * @cn 是否监听 data 变化更新数据
   * @default true
   */
  dataUpdate?: boolean;
  /**
   * @en Whether to enable unmatch mode
   * @cn 是否开启不匹配模式
   */
  unmatch?: boolean;
  /**
   * @en Expand event
   * @cn 节点展开回调，参数为当前展开节点 key 数组
   */
  onExpand?: (value: KeygenResult[]) => void;
  /**
   * @private 保持数据缓存
   */
  keepCache?: boolean;
  /**
   * @private 内部数据处理
   */
  datum?: TreeDatum<DataItem>;
  /**
   * @private 是否虚拟化
   */
  virtual?: boolean;
}

export interface TreeDatum<DataItem> {
  get: (id: KeygenResult) => CheckedStatusType | undefined;
  set: (
    id: KeygenResult,
    checked: CheckedStatusType,
    direction?: 'asc' | 'desc',
  ) => CheckedStatusType | null;
  insertFlat: (id: KeygenResult) => void;
  removeFlat: (id: KeygenResult) => void;
  expandedFlat: (id: KeygenResult[]) => void;
  getPath: (id: KeygenResult) => TreePathType | undefined;
  getValue: () => KeygenResult[];
  getChecked: (id: KeygenResult) => boolean | 'indeterminate';
  getKey: (item: DataItem, id?: KeygenResult, index?: number) => KeygenResult;
  getDataByValues: (values: KeygenResult[] | KeygenResult) => DataItem | (DataItem | null)[] | null;
  setValue: (value?: KeygenResult[]) => void;
  setData: (data?: DataItem[]) => void;
  isDisabled: (id: KeygenResult) => boolean;
  bindNode: (
    id: KeygenResult,
    update: UpdateFunc,
    data: DataItem,
  ) => { active: boolean; expanded: boolean };
  bindVirtualNode: (
    id: KeygenResult,
    update: UpdateFunc,
    data: DataItem,
  ) => { active: boolean; expanded: boolean };
  getDataById: (
    id: KeygenResult,
  ) => DataItem | { IS_NOT_MATCHED_VALUE: boolean; value: KeygenResult | null } | null;
  bindUpdate: (id: KeygenResult, update: () => void) => void;
  unBindUpdate: (id: KeygenResult) => void;
  isUnMatched: (data: any) => boolean;
  updateMap: Map<KeygenResult, UpdateFunc>;
  childrenKey: string;
  data: DataItem[];
  dataFlat: FlatNodeType<DataItem>[];
  pathMap: Map<KeygenResult, TreePathType>;
  dataMap: Map<KeygenResult, DataItem>;
  valueMap: Map<KeygenResult, CheckedStatusType>;
  dataFlatStatusMap: Map<KeygenResult, FlatMapType>;
  updateExpanded: (expanded?: KeygenResult[]) => void;
}
