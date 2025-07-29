import { CommonClasses, CommonType } from '../common/type';
import {
  BaseTreeProps,
  ObjectKey,
  KeygenResult,
  TreePathType,
  useTree,
  UpdateFunc,
} from '@sheinx/hooks';
import { SpinClasses } from '../spin/spin.type';
import { CheckboxClasses } from '../checkbox/checkbox.type';

export type TreeRenderItemType<DataItem> =
  | ((item: DataItem, expanded: boolean, active: boolean, id: KeygenResult) => React.ReactNode)
  | ObjectKey<DataItem>;

export type TreeClasses = {
  rootClass: string;
  tree: string;
  notTree: string;
  virtual: string;
  root: string;
  line: string;
  noline: string;
  lineIndent: string;
  contentDisabled: string;
  content: string;
  small: string;
  large: string;
  childnode: string;
  checkbox: string;
  contentWrapper: string;
  inlineContent: string;
  text: string;
  list: string;
  iconWrapper: string;
  icon: string;
  node: string;
  children: string;
  leaf: string;
  placement: string;
  sizeSmall: string;
  sizeLarge: string;
};
export type JsstyleType = {
  tree: () => TreeClasses;
  spin: () => SpinClasses;
  checkbox: () => CheckboxClasses;
  common: () => CommonClasses;
};

export type DatumType<DataItem> = ReturnType<typeof useTree<DataItem>>;

type ActionOnClick = 'check' | 'expand';

export type LeafIcon<T> = boolean | ((d: T) => React.ReactNode) | React.ReactNode
export interface TreeProps<DataItem, Value extends any[]>
  extends Omit<BaseTreeProps<DataItem>, 'isControlled'>,
    Pick<CommonType, 'className' | 'style'> {
  jssStyle?: JsstyleType;
  /**
   * @en The keys of selected
   * @cn 选中的 key （受控）
   */
  value?: Value;
  /**
   * @en Whether show line
   * @cn 是否显示连接线
   * @default true
   */
  line?: boolean;
  /**
   * @en Class name of icon
   * @cn 展开/收起按钮的类名
   */
  iconClass?: string;
  /**
   * @en Class name of node
   * @cn 节点的class，如果是函数，参数为该节点数据
   */
  nodeClass?: string | ((data: DataItem) => string);
  /**
   * @en Class name of content
   * @cn 内容样式
   */
  contentClass?: string | ((data: DataItem) => string);
  /**
   * @en The class of leaf, the params of function is data
   * @cn 叶子节点的 class, 函数的参数为该条叶子节点数据
   */
  leafClass?: string | ((data: DataItem) => string);

  /**
   * @en The class of checkbox, the params of function is data
   * @cn 开启叶子节点前的图标，或者自定义函数渲染
   * @version 3.7.0
   */
  leafIcon?: LeafIcon<DataItem>;

  /**
   * @en Custom expand/collapse buttons
   * @cn 自定义展开/收起按钮
   */
  expandIcons?: (React.ReactNode | ((d: DataItem) => React.ReactNode))[];
  /**
   * @en The class of children, the params of function is data
   * @cn 子节点 class, 函数的参数为该条叶子节点数据
   */
  childrenClass?: ((data: DataItem) => string) | string;
  /**
   * @en When setting the onDrop attribute, it is draggable
   * @cn 设置 onDrop 属性时，为可拖动状态
   */
  onDrop?: (data: DataItem[], key: KeygenResult, targetKey: KeygenResult, position: number) => void;
  /**
   * @en Active node key
   * @cn 激活节点的key
   */
  active?: KeygenResult;
  /**
   * @en Set active node key
   * @cn 设置激活节点的key
   * @version 3.4.0
   */
  setActive?: (key: KeygenResult | undefined, data?: DataItem) => void;
  /**
   * @en If need to double-click to expand
   * @cn 双击是否展开节点
   * @default false
   */
  doubleClickExpand?: boolean;
  /**
   * @en Expand by click parent node
   * @cn 点击父节点展开
   * @default false
   */
  parentClickExpand?: boolean;

  /**
   * @cn 点击节点展开是的操作: 'expand' 展开节点，'check' 选中复选框
   * @en The operation when clicking the node to expand: 'expand' expand the node, 'check' check the checkbox
   * @version 3.6.0
   */
  actionOnClick?: ActionOnClick | ActionOnClick[];
  /**
   * @en Selector when dray image
   * @cn 定义拖拽图片的选择器
   */
  dragImageSelector?: ((data?: DataItem) => string) | string;
  /**
   * @en Expand event
   * @cn 节点展开回调，参数为当前展开节点 key 数组
   */
  onExpand?: (value: KeygenResult[]) => void;
  /**
   * @en When it is a string, return d[string]. When it is a function, return the result of the function
   * @cn 为 string 时，返回 d[string]。 为 function 时，返回函数结果
   * @default index
   */
  renderItem: TreeRenderItemType<DataItem>;
  /**
   * @en Change event
   * @cn 设置 onChange 属性时，显示 选择框。参数为当前选中值，和 mode 属性相关
   */
  onChange?: (value: Value, id: KeygenResult) => void;
  /**
   * @en Dom style when drop images
   * @cn 拖拽图片的原生 style 样式
   */
  dragImageStyle?: React.CSSProperties;
  /**
   * @en Whether it can only be dragged at the same level
   * @cn 是否只能平级拖拽
   */
  dragSibling?: boolean;
  /**
   * @en Automatically expand nodes with child nodes when dragging
   * @cn 拖拽时自动展开含有子节点的节点
   * @default false
   */
  dragHoverExpand?: boolean;
  /**
   * @en Whether the node is inline
   * @cn 节点是否内联
   * @default false
   */
  inlineNode?: boolean;
  /**
   * @en Whether to highlight the node when clicked
   * @cn 点击节点高亮
   * @default true
   */
  highlight?: boolean;

  /**
   * @en Dynamically load nodes
   * @cn 设置 loader 属性后，未定义 children 的节点视为动态加载节点，点击展开触发 loader事件，children 为 null 或者长度为 0 视为叶子节点
   */
  loader?: (key: KeygenResult, data: DataItem) => void;
  /**
   * @en Ref
   * @cn ref
   * @private no static
   */
  getDatum?: (datum: DatumType<DataItem>['datum']) => void;
  /**
   * @en Click event
   * @cn 节点点击事件
   */
  onClick?: (data: DataItem, id: KeygenResult, path?: TreePathType) => void;
  /**
   * @en Drag start event
   * @cn 拖拽开始事件
   */
  onDragStart?: (e: React.DragEvent, data: DataItem) => void;
  /**
   * @en Drag end event
   * @cn 拖拽结束事件
   */
  onDragEnd?: (e: React.DragEvent, data: DataItem) => void;
  /**
   * @en Drag over event
   * @cn 拖拽经过事件
   */
  onDragOver?: (e: React.DragEvent, data: DataItem) => void;
  /**
   * @en Drag leave event
   * @cn 拖拽离开事件
   */
  onDragLeave?: (e: React.DragEvent, data: DataItem) => void;
  /**
   * @en Virtual list
   * @cn 虚拟列表
   * @version 3.6.0
   */
  virtual?: boolean;
  /**
   * @en The height of the list item
   * @cn 列表项高度，仅开启virtual时生效
   * @version 3.6.0
   */
  lineHeight?: number;
  /**
   * @en Height of the list, only effective when virtual is opened
   * @cn 列表高度，仅开启virtual时生效
   * @version 3.6.0
   */
  height?: number;
  /**
   * @en Number of list items displayed at the same time
   * @cn 同时展示的列表项数量
   * @default 20
   * @version 3.6.0
   */
  rowsInView?: number;
  rootStyle?: React.CSSProperties;
  ignoreSetFlat?: boolean;
  tiledData?: DataItem[];

  /**
   * @en size of Tree
   * @cn 组件尺寸
   * @default default
   * @version 3.7.0
   */
  size?: 'small' | 'default' | 'large';
}

export interface VirtualTreeProps<DataItem, Value extends any[]>
  extends Omit<
    TreeProps<DataItem, Value>,
    'height' | 'line' | 'dragImageSelector' | 'onDrop' | 'childrenKey' | 'rowsInView'
  > {
  height: number | string;
  line: boolean;
  contentClass?: string | ((data: DataItem) => string);
  isControlled: boolean;
  rowsInView: number;
  bindNode: (
    id: KeygenResult,
    update: UpdateFunc,
    data: DataItem,
  ) => { expanded: boolean; active: boolean };
  onToggle?: (id: KeygenResult, expanded?: boolean) => void;
  onNodeClick: (data: DataItem, id: KeygenResult) => void;
  childrenKey: keyof DataItem;
}
