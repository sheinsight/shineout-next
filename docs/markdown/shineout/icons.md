`````
开发指南

# 自定义Icon

组件内的 Icon 支持替换为自定义 Icon
`````

## 用法

使用 setIcons 方法替换 Icon

```js
import { setIcons } from 'shineout'
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
    Close: icons.Close,
    Info: icons.PcInfoCircleFill,
    Success: icons.PcCheckCircleFill,
    Warning: icons.PcWarningCircleFill,
    Danger: icons.PcWarningCircleFill,
    ConfirmWarning: icons.PcWarningCircleFill,
    Error: icons.PcWarningCircleFill,
    Confirm: icons.PcHelpCircleFill,
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
    Close: icons.CloseOpaqueMultic1,
  },
  menu: {
    CollapseArrow: icons.ArrowDown,
    FrontSolidArrowDown: icons.PcArrowFillDown,
  },
  modal: {
    Close: Icons?.Close,
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
}
```

<!--
```react
import React from 'react';
import { icons } from 'shineout';
function MyIcon(props: any){
  const style={
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto',
    color: 'var(--soui-input-icon-color,var(--soui-neutral-text-4,#666C7C))',
    ...props.style
  }
    return <div style={style}>{props.children}</div>;
}

type IconType = keyof typeof icons;

const App: React.FC = () => (
  <div>
    <h4>展示全部icons图标</h4>
    {
        Object.keys(icons).map((key) => {
            return <div key={key} style={{display: 'inline-block', width: 160, height: 100, textAlign: 'center'}}><MyIcon>{icons[key as IconType]}</MyIcon><div>{key}</div></div>
        })
    }
    </div>
);
export default App;
``` -->
