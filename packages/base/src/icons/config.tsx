import icons from './icons';
const config = {
  alert: {
    Close: icons.Close,
    Info: icons.PcInfoCircleFill,
    Success: icons.PcCheckCircleFill,
    Warning: icons.PcWarningCircleFill,
    Danger: icons.PcWarningCircleFill,
    ConfirmWarning: icons.PcWarningCircleFill,
    Error: icons.PcWarningCircleFill,
    Confirm: icons.PcHelpCircleFill,
  },
  form: {
    Tooltip: icons.PcHelpCircleOutline,
  },
  breadcrumb: {
    DropdownArrow: icons.ArrowDown,
  },
  card: {
    CollapseArrow: icons.ArrowRight,
  },
  carousel: {
    Backward: icons.ArrowLeft,
    Forward: icons.ArrowRight,
  },
  cascader: {
    More: icons.ArrowDown,
    DropdownArrow: icons.ArrowDown,
    Close: icons.PcCloseCircleFill,
    CollapseArrow: icons.ArrowRight,
  },
  collapse: {
    collapseArrow: icons.ArrowRight,
  },
  datepicker: {
    Close: icons.CloseOpaqueMultic1,
    Time: icons.Time,
    Calendar: icons.Calendar,
    ArrowDoubleLeft: icons.AngleDoubleLeft,
    ArrowLeft: icons.ArrowLeft,
    ArrowDoubleRight: icons.AngleDoubleRight,
    ArrowRight: icons.ArrowRight,
  },
  dropdown: {
    DropdownArrow: icons.ArrowDown,
  },
  editableArea: {
    Close: icons.CloseOpaqueMultic1,
  },
  image: {
    Close: icons.CloseOpaqueMultic1,
    Pics: icons.Pics2,
    Download: icons.Download,
    Preview: icons.Preview,
    LoadFail: icons.LoadingError2,
  },
  input: {
    ArrowRight: icons.ArrowRight,
    ArrowLeft: icons.ArrowLeft,
    Hide: icons.Hide,
    Show: icons.Display,
    Close: icons.PcCloseCircleFill,
  },
  link: {
    prefixIcon: icons.Link,
  },
  menu: {
    CollapseArrow: icons.ArrowDown,
    FrontSolidArrowDown: icons.PcArrowFillDown,
    Search: icons.Search,
  },
  modal: {
    Close: icons?.Close,
  },
  pagination: {
    PrePage: icons.ArrowLeftDouble,
    NetPage: icons.ArrowRightDouble,
    More: icons.More,
    NextInButton: icons.ArrowRight,
    PreInButton: icons.ArrowLeft,
  },
  progress: {
    InfoCircle: icons.Info,
    WarningCircle: icons.Warning,
    SuccessCircle: icons.Check,
    DangerCircle: icons.Close,
    InfoLine: icons.PcInfoCircleFill,
    WarningLine: icons.PcWarningCircleFill,
    SuccessLine: icons.PcCheckCircleFill,
    DangerLine: icons.PcCloseCircleFill,
  },
  rate: {
    Star: icons.PcStarFill,
  },
  select: {
    Check: icons.Check,
    More: icons.More,
    DropdownArrow: icons.ArrowDown,
    Close: icons.CloseOpaqueMultic1,
  },
  steps: {
    Finish: icons.Check,
    Error: icons.Close,
  },
  table: {
    SortUp: icons.TableSortIconUp,
    SortDown: icons.TableSortIconDown,
    Expand: icons.Expand,
    Collapse: icons.OdecShrink,
  },
  tabs: {
    Pre: icons.ArrowLeft,
    Next: icons.ArrowRight,
    CollapseArrow: icons.ArrowLeft,
  },
  transfer: {
    DeleteAll: icons.Delete,
    DeleteItem: icons.Close,
    Search: icons.Search,
    Add: icons.ArrowRight,
    Remove: icons.ArrowLeft,
  },
  tree: {
    LineExpand: icons.TreeMinus,
    LineCollapse: icons.TreePlus,
    Expand: icons.TreeArrow,
  },
  treeSelect: {
    More: icons.More,
    DropdownArrow: icons.ArrowDown,
    Close: icons.CloseOpaqueMultic1,
  },
  upload: {
    File: icons.File,
    Success: icons.PcCheckCircleFill,
    Warning: icons.PcWarningCircleFill,
    Recover: icons.Return,
    Delete: icons.Delete,
    DeleteImage: icons.CloseOpaqueMultic1,
    RecoverImage: icons.UndeleteOpaque,
    PreviewImage: icons.Preview,
    AddImage: icons.Add,
  },
};
//属性变成可选的 两层深度
type DeepPartial<T> = {
  [P in keyof T]?: Partial<T[P]>;
};
type OptionalConfig = DeepPartial<typeof config>;

// 合并配置 用于覆盖默认配置
export const setIcons = (newConfig: OptionalConfig) => {
  const keys = Object.keys(newConfig) as (keyof OptionalConfig)[];
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = newConfig[key];
    if (config[key] && typeof value === 'object') {
      config[key] = {
        ...config[key],
        ...value,
      } as any;
    }
  }
};

export default config;
