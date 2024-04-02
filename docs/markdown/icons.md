`````
开发指南

# 自定义Icon

组件内的 Icon 支持替换为自定义 Icon
`````

## 用法

使用 setIcons 方法替换 Icon

```js
import { setIcon } from 'shineout'
setIcons({
  select: {
    DropdownArrow: <Icon name="angle-down" />,
  }
})
```


## 配置
支持修改的Icon
```js
const config = {
  alert: {
    Close: Icons.Close,
    Info: Icons.PcInfoCircleFill,
    Success: Icons.PcCheckCircleFill,
    Warning: Icons.PcWarningCircleFill,
    Danger: Icons.PcWarningCircleFill,
    ConfirmWarning: Icons.PcWarningCircleFill,
    Error: Icons.PcWarningCircleFill,
    Confirm: Icons.PcHelpCircleFill,
  },
  breadcrumb: {
    DropdownArrow: Icons.ArrowDown,
  },
  card: {
    CollapseArrow: Icons.ArrowRight,
  },
  carousel: {
    Backward: Icons.ArrowLeft,
    Forward: Icons.ArrowRight,
  },
  cascader: {
    More: Icons.ArrowDown,
    DropdownArrow: Icons.ArrowDown,
    Close: Icons.PcCloseCircleFill,
    CollapseArrow: Icons.ArrowRight,
  },
  collapse: {
    collapseArrow: Icons.ArrowRight,
  },
  datepicker: {
    Close: Icons.CloseOpaqueMultic1,
    Time: Icons.Time,
    Calendar: Icons.Calendar1,
    ArrowDoubleLeft: Icons.AngleDoubleLeft,
    ArrowLeft: Icons.ArrowLeft,
    ArrowDoubleRight: Icons.AngleDoubleRight,
    ArrowRight: Icons.ArrowRight,
  },
  dropdown: {
    DropdownArrow: Icons.ArrowDown,
  },
  editableArea: {
    Close: Icons.CloseOpaqueMultic1,
  },
  image: {
    Close: Icons.CloseOpaqueMultic1,
    Pics: Icons.Pics2,
    Download: Icons.Download,
    Preview: Icons.Preview,
    LoadFail: Icons.LoadingError2,
  },
  input: {
    ArrowRight: Icons.ArrowRight,
    ArrowLeft: Icons.ArrowLeft,
    Hide: Icons.Hide,
    Show: Icons.Display,
    Close: Icons.CloseOpaqueMultic1,
  },
  menu: {
    CollapseArrow: Icons.ArrowDown,
    FrontSolidArrowDown: Icons.PcArrowFillDown,
  },
  modal: {
    Close: Icons?.Close,
  },
  pagination: {
    PrePage: Icons.ArrowLeftDouble,
    NetPage: Icons.ArrowRightDouble,
    More: Icons.More,
    NextInButton: Icons.ArrowRight,
    PreInButton: Icons.ArrowLeft,
  },
  progress: {
    InfoCircle: Icons.Info,
    WarningCircle: Icons.Warning,
    SuccessCircle: Icons.Check,
    DangerCircle: Icons.Close,
    InfoLine: Icons.PcInfoCircleFill,
    WarningLine: Icons.PcWarningCircleFill,
    SuccessLine: Icons.PcCheckCircleFill,
    DangerLine: Icons.PcCloseCircleFill,
  },
  rate: {
    Star: Icons.PcStarFill,
  },
  select: {
    Check: Icons.Check,
    More: Icons.More,
    DropdownArrow: Icons.ArrowDown,
    Close: Icons.CloseOpaqueMultic1,
  },
  steps: {
    Finish: Icons.Check,
    Error: Icons.Close,
  },
  table: {
    SortUp: Icons.TableSortIconUp,
    SortDown: Icons.TableSortIconDown,
    Expand: Icons.Expand,
    Collapse: Icons.OdecShrink,
  },
  tabs: {
    Pre: Icons.ArrowLeft,
    Next: Icons.ArrowRight,
    CollapseArrow: Icons.ArrowLeft,
  },
  transfer: {
    DeleteAll: Icons.Delete,
    DeleteItem: Icons.Close,
    Search: Icons.Search,
    Add: Icons.ArrowRight,
    Remove: Icons.ArrowLeft,
  },
  tree: {
    LineExpand: Icons.TreeMinus,
    LineCollapse: Icons.TreePlus,
    Expand: Icons.TreeArrow,
  },
  treeSelect: {
    More: Icons.More,
    DropdownArrow: Icons.ArrowDown,
    Close: Icons.CloseOpaqueMultic1,
  },
  upload: {
    File: Icons.File,
    Success: Icons.PcCheckCircleFill,
    Warning: Icons.PcWarningCircleFill,
    Recover: Icons.Return,
    Delete: Icons.Delete,
    DeleteImage: Icons.CloseOpaqueMultic1,
    RecoverImage: Icons.UndeleteOpaque,
    PreviewImage: Icons.Preview,
    AddImage: Icons.Add,
  },
}
```
