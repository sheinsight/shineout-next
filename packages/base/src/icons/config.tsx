import icons from './icons';
const config = {
  alert: {
    Close: icons.Close,
    Info: icons.InfoCircleFill,
    Success: icons.CheckCircleFill,
    Warning: icons.WarningCircleFill,
    Danger: icons.WarningCircleFill,
    ConfirmWarning: icons.WarningCircleFill,
    Error: icons.WarningCircleFill,
    Confirm: icons.HelpCircleFill,
  },
  form: {
    Tooltip: icons.HelpCircleOutline,
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
    More: icons.More,
    DropdownArrow: icons.ArrowDown,
    Close: icons.CloseFill,
    CollapseArrow: icons.ArrowRight,
  },
  collapse: {
    collapseArrow: icons.ArrowRight,
  },
  datepicker: {
    Close: icons.CloseFill,
    Time: icons.Time,
    Calendar: icons.Calendar,
    ArrowDoubleLeft: icons.ArrowLeftDouble,
    ArrowLeft: icons.ArrowLeft,
    ArrowDoubleRight: icons.ArrowRightDouble,
    ArrowRight: icons.ArrowRight,
  },
  dropdown: {
    DropdownArrow: icons.ArrowDown,
  },
  empty: {
    NoData: icons.EmptyNoData,
  },
  editableArea: {
    Close: icons.CloseFill,
  },
  image: {
    Close: icons.CloseFill,
    Pics: icons.ImageCount,
    Download: icons.Download,
    Preview: icons.Preview,
    LoadFail: icons.ImageError,
  },
  input: {
    ArrowRight: icons.ArrowRight,
    ArrowLeft: icons.ArrowLeft,
    Hide: icons.Hide,
    Show: icons.Display,
    Close: icons.CloseFill,
  },
  link: {
    prefixIcon: icons.Link,
  },
  menu: {
    CollapseArrow: icons.ArrowDown,
    FrontSolidArrowDown: icons.ArrowDownFill,
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
    InfoLine: icons.InfoCircleFill,
    WarningLine: icons.WarningCircleFill,
    SuccessLine: icons.CheckCircleFill,
    DangerLine: icons.Close,
  },
  rate: {
    Star: icons.StarFill,
  },
  select: {
    Check: icons.Check,
    More: icons.More,
    DropdownArrow: icons.ArrowDown,
    Close: icons.CloseFill,
  },
  steps: {
    Finish: icons.Check,
    Error: icons.Close,
  },
  switch: {
    Loading: icons.Loading,
  },
  table: {
    SortUp: icons.SortAsc,
    SortDown: icons.SortDesc,
    Expand: icons.Expand,
    Collapse: icons.Shrink,
    Filter: icons.Filter,
    Search: icons.Search,
  },
  tabs: {
    Pre: icons.ArrowLeft,
    Next: icons.ArrowRight,
    CollapseArrow: icons.ArrowLeft,
  },
  tag: {
    Close: icons.Close,
  },
  textarea: {
    Close: icons.CloseFill,
  },
  transfer: {
    DeleteAll: icons.Delete,
    DeleteItem: icons.Close,
    Search: icons.Search,
    Add: icons.ArrowRight,
    Remove: icons.ArrowLeft,
  },
  tree: {
    LineExpand: icons.Expand,
    LineCollapse: icons.Shrink,
    Expand: icons.ArrowDownFill,
    Leaf: icons.File,
  },
  treeSelect: {
    More: icons.More,
    DropdownArrow: icons.ArrowDown,
    Close: icons.CloseFill,
  },
  upload: {
    File: icons.File,
    Success: icons.CheckCircleFill,
    Warning: icons.WarningCircleFill,
    Recover: icons.Return,
    Delete: icons.Delete,
    DeleteImage: icons.CloseFill,
    RecoverImage: icons.RecoverCircle,
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
