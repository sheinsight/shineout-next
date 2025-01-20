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
    Info: icons.InfoCircleFill,
    Success: icons.CheckCircleFill,
    Warning: icons.WarningCircleFill,
    Danger: icons.WarningCircleFill,
    ConfirmWarning: icons.WarningCircleFill,
    Error: icons.WarningCircleFill,
    Confirm: icons.HelpCircleFill,
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
    Close: icons.Close,
    CollapseArrow: icons.ArrowRight,
  },
  collapse: {
    collapseArrow: icons.ArrowRight,
  },
  datepicker: {
    Close: icons.Close,
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
  editableArea: {
    Close: icons.Close,
  },
  image: {
    Close: icons.Close,
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
    Close: icons.Close,
  },
  menu: {
    CollapseArrow: icons.ArrowDown,
    FrontSolidArrowDown: icons.ArrowDownFill,
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
    Close: icons.Close,
  },
  steps: {
    Finish: icons.Check,
    Error: icons.Close,
  },
  table: {
    SortUp: icons.SortAsc,
    SortDown: icons.SortDesc,
    Expand: icons.Expand,
    Collapse: icons.Shrink,
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
    LineExpand: icons.Expand,
    LineCollapse: icons.Shrink,
    Expand: icons.ArrowDownFill,
  },
  treeSelect: {
    More: icons.More,
    DropdownArrow: icons.ArrowDown,
    Close: icons.Close,
  },
  upload: {
    File: icons.File,
    Success: icons.CheckCircleFill,
    Warning: icons.WarningCircleFill,
    Recover: icons.Return,
    Delete: icons.Delete,
    DeleteImage: icons.Close,
    RecoverImage: icons.RecoverCircle,
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
