import React from 'react';
import { TreeClasses } from '../tree/tree.type';
import { KeygenResult, ObjectKey, UnMatchedData } from '@sheinx/hooks';
import { TreeSelectClasses, SelectClasses } from '@sheinx/shineout-style';
import { AbsoluteListProps } from '../absolute-list/absolute-list.type';
import { CommonType } from '../common/type';

export type JssStyleType = {
  treeSelect?: () => TreeSelectClasses;
  select?: () => SelectClasses;
  tree?: () => TreeClasses;
};

export type TreeModeType = 0 | 1 | 2 | 3 | 4;

export type ResultItem<DataItem> = DataItem | UnMatchedData;

export interface ComponentRef<DataItem, Value> {
  /**
   * @en Get the data corresponding to the value
   * @cn 获取 value 对应的 data
   */
  getDataByValues: (
    values: Value,
  ) => Value extends any[] ? ResultItem<DataItem>[] : ResultItem<DataItem>;
}

export interface TreeSelectProps<DataItem, Value>
  extends Pick<CommonType, 'className' | 'style' | 'size'>,
    Pick<AbsoluteListProps, 'absolute' | 'zIndex'> {
  jssStyle?: {
    treeSelect?: () => TreeSelectClasses;
  };

  /**
   * @en placeholder when value is empty
   * @cn value 为空时的占位符
   */
  placeholder?: string;
  /**
   * @en when compressed is True,the comptessedBound can limit the numbers of multiple selected item's label
   * @cn 开启多选后，指定允许展示标签数量，超过后将折叠
   */
  compressedBound?: number;
  compressedClassName?: string;
  /**
   * @en If clearable is true, show clear value icon
   * @cn 是否可清除值
   * @default false
   */
  clearable?: boolean;
  filterText?: string;
  /**
   * @en ender unmatched value
   * @cn 渲染未匹配值的方式
   */
  renderUnmatched?: (value: Value extends (infer U)[] ? U : Value) => React.ReactNode;
  /**
   * @en inner title
   * @cn 内嵌标题
   */
  innerTitle?: React.ReactNode;
  /**
   * @en data source
   * @cn 数据源
   * @default []
   */
  data?: DataItem[];
  /**
   * @en Some methods of getting components Currently only support getDataByValue
   * @cn 获取组件的一些方法 目前只支持 getDataByValues
   */
  getComponentRef?:
    | ((ref: ComponentRef<DataItem, Value>) => void)
    | { current?: ComponentRef<DataItem, Value> };
  onFilter?: (text: string) => void;
  /**
   * @en Placeholder content when there is no data
   * @cn 无数据时的占位内容
   */
  empty?: React.ReactNode;
  /**
   * @en if it is true, it will be multiple selection
   * @cn 是否是多选
   * @default false
   */
  multiple?: boolean;
  /**
   * @en callback function of blur event
   * @cn blur 事件回调函数
   */
  onBlur: (e?: any) => void;
  /**
   * @en callback function of focus event
   * @cn focus 事件回调函数
   */
  onFocus: (e?: any) => void;
  /**
   * @en When it is true, all nodes disable the selection; when it is a function, it determines whether it is disabled according to the return result of the function.
   * @cn 为 true 时，所有节点禁用选择，为函数时，根据函数返回结果确定是否禁用
   * @default false
   */
  disabled?: ((data: DataItem) => boolean) | boolean;
  /**
   * @en The content displayed in the result after selecting, if not set, use renderItem. not show while return null, result is current selected
   * @cn 选中后在结果中显示的内容，默认和 renderItem 相同
   * @default renderItem
   */
  renderResult?: (data: DataItem) => React.ReactNode;
  /**
   * @en mode 0: Returns only the fully selected node including the parent node. 1: Returns all selected nodes and semi-selected nodes. 2: Return only the selected child nodes. 3: If the parent node is full selected, only return the parent node. 4: What you choose is what you get.
   * @cn 选中值模式，未设置值为单选 0: 只返回完全选中的节点，包含父节点 1: 返回全部选中的节点和半选中的父节点 2: 只返回选中的子节点 3: 如果父节点选中，只返回父节点 4: 所选即所得
   * @default 1
   */
  mode?: TreeModeType;
  /**
   * @en The height of list
   * @cn 列表高度
   * @default 300
   */
  height?: number;
  /**
   * @en option collapse callback
   * @cn 下拉列表展开/收起回调
   */
  onCollapse?: (collapse: boolean) => void;
  /**
   * @en Whether to show the descendant nodes of the hit node after filtering
   * @cn 筛选后是否展示命中节点的后代节点
   * @default false
   */
  showHitDescendants?: boolean;
  /**
   * @en Popup Position
   * @cn 弹出位置
   */
  position?: 'auto' | 'bottom-left' | 'top-left';
  /**
   * @en Expand option list while enter press
   * @cn 回车触发下拉框展开的时候调用
   */
  onEnterExpand?: (e: React.KeyboardEvent<HTMLDivElement>) => boolean;
  /**
   * @en value is your picker now
   * @cn 参数 为 当前选中值
   */
  onChange: (value: Value, selected?: DataItem, path?: (string | number)[]) => void;

  /**
   * @en onChange additional parameters (current is the data of the clicked node, data is the currently selected data, checked is whether it is selected or canceled in the multi-select state)
   * @cn onChange 额外参数 (current 为点击的节点的数据， data 为当前选中的数据， checked 为多选状态下是选中还是取消)
   */
  onChangeAddition?: (params: {
    current?: DataItem;
    checked?: 0 | 1 | 2;
    data?: DataItem[] | DataItem | null;
  }) => void;
  /**
   * @en In the Form, the value will be taken over by the form and the value will be invalid.
   * @cn 选中的 key （受控），多选时必须为array
   */
  value?: Value;
  defaultValue?: Value;
  /**
   * @en Merges selected values; the repeat value will not appear in the Popover when it is'no-repeat'.
   * @cn 将选中值合并，只在多选模式下有效；为 'no-repeat' 时弹出框中不重复展示值
   * @default false
   */
  compressed?: boolean | 'no-repeat';

  open?: boolean;
  line?: boolean;

  width?: number | string;
  underline?: boolean;
  border?: boolean;
  showArrow?: boolean;
  childrenKey: keyof DataItem & string;
  focusSelected?: boolean;
  renderItem:
    | ObjectKey<DataItem>
    | ((
        data: DataItem,
        expanded?: boolean,
        active?: boolean,
        id?: KeygenResult,
      ) => React.ReactNode);
}
