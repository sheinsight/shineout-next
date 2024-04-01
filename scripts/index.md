
# Alert
Alert 用于承载显示用户需要关注的关键信息
## API
### Alert
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|type|\"success\" / \"info\" / \"warning\" / \"danger\" / \"confirmwarning\" / \"error\" |\"warning|类型|
|closeItem|ReactNode||自定义关闭按钮|
|icon|ReactNode||为 true 时，根据 type 属性显示状态图标。如果需要显示自定义图标，传入 ReactElement|
|iconSize|number |14|icon 的尺寸|
|title|ReactNode||标题模式|
|closable|boolean / \"only\" ||是否现实关闭按钮，当设置为only的时候，仅仅显示关闭按钮|
|onClose|((e: MouseEvent<HTMLDivElement, MouseEvent>) => void) ||关闭事件|
|bordered|boolean |true|是否显示边框|
|children|ReactNode||内容，文字或 react 组件|
## Example
### 基本用法
提示框基本用法，在页面内用于展示重要提示信息
```tsx
/**
 * cn - 基本用法
 *    -- 提示框基本用法，在页面内用于展示重要提示信息
 * en - Basic
 *    -- The basic usage of Alert, used to display important prompt information in the page
 */
import React from 'react';
import { Alert } from 'shineout';

export default () => {
  return (
    <Alert icon type='info'>
      This is a line of important text for alerting purposes
    </Alert>
  );
};

```
### 不同类型
通过设置 <span>type</span> 属性切换不同的提示框类型，支持 4 种不同的类型：<span>success</span>、<span>info</span>、<span>warning</span>、<span>danger</span>
```tsx
/**
 * cn - 不同类型
 *    -- 通过设置 `type` 属性切换不同的提示框类型，支持 4 种不同的类型：`success`、`info`、`warning`、`danger`
 * en - Type
 *    -- Set the `type` property to switch between different types of alert boxes. Support 4 different types: `success`, `info`, `warning`, `danger`
 */
import React from 'react';
import { Alert } from 'shineout';

export default () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      <Alert icon type='info' style={{ width: 'calc(50% - 16px)' }}>
        This is informative text.
      </Alert>
      <Alert icon type='success' style={{ width: 'calc(50% - 16px)' }}>
        This is success text.
      </Alert>
      <Alert icon type='warning' style={{ width: 'calc(50% - 16px)' }}>
        This is warning text.
      </Alert>
      <Alert icon type='danger' style={{ width: 'calc(50% - 16px)' }}>
        This is danger text.
      </Alert>
    </div>
  );
};

```
### 允许关闭
通过设置 <span>closable</span> 属性可以展示关闭按钮。通过 <span>onClose</span> 属性可以设置关闭回调函数
注意 <span>onClose</span> 属性未来不再支持 boolean 类型，<span>hideClose</span> 属性即将弃用，请使用 <span>closable</span>
```tsx
/**
 * cn - 允许关闭
 *    -- 通过设置 `closable` 属性可以展示关闭按钮。通过 `onClose` 属性可以设置关闭回调函数
 *    -- 注意 `onClose` 属性未来不再支持 boolean 类型，`hideClose` 属性即将弃用，请使用 `closable`
 * en - Basic
 *    -- The basic usage of Alert, used to display important prompt information in the page
 */
import React, { useState } from 'react';
import { Alert, Button } from 'shineout';

export default () => {
  const [reset, setReset] = useState(true);
  const handleReset = () => {
    setReset(true);
  };

  const handleClose = () => {
    setTimeout(() => {
      setReset(false);
    }, 300);
  };

  return (
    <div>
      {!reset && (
        <Button onClick={handleReset} mode='text' type='primary'>
          重置
        </Button>
      )}
      {reset && (
        <Alert icon closable type='info' onClose={handleClose}>
          This is informative text.
        </Alert>
      )}
    </div>
  );
};

```
### 标题模式
通过设置 <span>title</span> 属性可以展示标题模式的提示框
```tsx
/**
 * cn - 标题模式
 *    -- 通过设置 `title` 属性可以展示标题模式的提示框
 * en - Title
 *    -- Set the `title` property to display the title mode alert box
 */
import React from 'react';
import { Alert } from 'shineout';

export default () => {
  return (
    <Alert type='info' icon title='Heading' closable>
      This is a line of important text for alerting purposes
    </Alert>
  );
};

```
### 无边框
设置 <span>bordered</span> 属性为 false 可以隐藏提示框的边框
```tsx
/**
 * cn - 无边框
 *    -- 设置 `bordered` 属性为 false 可以隐藏提示框的边框
 * en - No border
 *    -- Set the `bordered` property to false to hide the border of the alert box
 */
import React from 'react';
import { Alert } from 'shineout';

export default () => {
  return (
    <Alert icon type='info' bordered={false}>
      This is a line of important text for alerting purposes
    </Alert>
  );
};

```
## Guide
### 何时使用
承载一些关键重要提示信息，在页面内一般置于相关模块的最上方，静态展示，不会自动消失，也不会打断用户的当前操作
### 与布局相关
在页面内一般置于相关模块的最上方，静态展示
### 推荐/慎用示例
1、当一个页面中需要多条警告时，建议使用带标题的组合提示框
2、使用颜色主题应该文案表达意思契合


# Breadcrumb
显示页面在系统中的层级结构和当前所在位置，并可以快速返回之前的任意页面
## API
### Breadcrumb
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|data|any[]|[]|面包屑对象数组,见 data|
|separator|ReactNode|\"/\"|面包屑分隔符,可以是字符串或自定义的元素|
|keygen|true / ObjectKey<Item> / (data: Item, index?: number ) => string / number||生成每一项key的辅助方法。为 true 时，以数据项本身作为key，相当于 (d => d)；为函数时，使用此函数返回值；为string时，使用这个string对应的数据值。如 \"id\"，相当于 (d => d.id)|
|renderItem|((value: Item) => ReactNode) ||自定义渲染|
|max|number ||最大显示个数|
### BreadcrumbData
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|onClick|MouseEventHandler<HTMLAnchorElement> ||点击事件|
|title|ReactNode||显示内容|
|url|string ||链接地址，onClick 属性二选一|
|icon|ReactNode||自定义图标|
## Example
### 基本用法
组件调用通过 json 数据配置
```tsx
/**
 * cn - 基本用法
 *    -- 组件调用通过 json 数据配置
 * en - Base
 *    -- The basic usage
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Message, TYPE } from 'shineout';

type BreadcrumbData = TYPE.Breadcrumb.Data;

type BreadcrumbProps<data> = TYPE.Breadcrumb.Props<data>;

const data: BreadcrumbProps<BreadcrumbData>['data'] = [
  { title: 'Home', url: '/' },
  { title: <Link to='/cn/components/shineout/button'>Button</Link> },
  { title: 'Handler', onClick: () => Message.info('clicked') },
  { title: 'Self' },
];
const App: React.FC = () => <Breadcrumb data={data} />;

export default App;

```
### 尺寸
通过设置 fontSize 设置尺寸
```tsx
/**
 * cn - 尺寸
 *    -- 通过设置 fontSize 设置尺寸
 * en - Size
 *    -- set fontSize to change size
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Message, TYPE } from 'shineout';

type BreadcrumbData = TYPE.Breadcrumb.Data;

type BreadcrumbProps<data> = TYPE.Breadcrumb.Props<data>;

const data: BreadcrumbProps<BreadcrumbData>['data'] = [
  { title: 'Home', url: '/' },
  { title: <Link to='/cn/components/shineout/button'>Button</Link> },
  { title: 'Handler', onClick: () => Message.info('clicked') },
  { title: 'Self' },
];
const App: React.FC = () => (
  <div>
    <Breadcrumb data={data} style={{ fontSize: 12 }} />
    <Breadcrumb data={data} style={{ fontSize: 14, marginTop: 24 }} />
    <Breadcrumb data={data} style={{ fontSize: 16, marginTop: 24 }} />
  </div>
);

export default App;

```
### 自定义分隔符
默认的分隔符为 '/'，可以通过 separator 属性自定义
```tsx
/**
 * cn - 自定义分隔符
 *    -- 默认的分隔符为 '/'，可以通过 separator 属性自定义
 * en - separator
 *    -- The default separator is '/'
 */

import React from 'react';
import { Breadcrumb, TYPE } from 'shineout';

function Separator() {
  const str = '>';
  return <span>{str}</span>;
}

type BreadcrumbData = TYPE.Breadcrumb.Data;

type BreadcrumbProps<data> = TYPE.Breadcrumb.Props<data>;

const data: BreadcrumbProps<BreadcrumbData>['data'] = [
  { title: 'Home', url: '/' },
  { title: 'Self' },
];

const App: React.FC = () => (
  <div>
    <Breadcrumb data={data} separator='/' style={{ marginBottom: '24px' }} />
    <Breadcrumb data={data} separator={<Separator />} />
  </div>
);

export default App;

```
### 自定义图标
带图标的面包屑
```tsx
/**
 * cn - 自定义图标
 *    -- 带图标的面包屑
 * en - icon
 *    -- Breadcrumbs with icons
 */

import React from 'react';
import { Breadcrumb, TYPE } from 'shineout';

type BreadcrumbData = TYPE.Breadcrumb.Data;

type BreadcrumbProps<data> = TYPE.Breadcrumb.Props<data>;

const home = (
  <svg width='1em' height='1em' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M7.01274 1.16681L7.03514 1.16772C7.0439 1.16825 7.05266 1.16898 7.0614 1.1699C7.07268 1.1711 7.08397 1.17262 7.09523 1.17449C7.10701 1.17643 7.11888 1.17878 7.13068 1.18149C7.14282 1.18428 7.15483 1.18745 7.16674 1.19101C7.19155 1.19842 7.21609 1.20757 7.24007 1.21843L7.3038 1.25224L7.36391 1.29449L13.1886 5.96116C13.7766 6.43231 13.1102 7.30323 12.5163 6.91255L12.4608 6.87217L12.1404 6.61535C12.0902 6.57505 12.0167 6.58314 11.9764 6.63341C11.9599 6.65411 11.9508 6.67985 11.9508 6.70639L11.951 11.6667C11.951 12.5142 11.4084 12.8363 10.854 12.8294L10.7861 12.8333H3.214C2.60798 12.8333 2.04907 12.25 2.04907 11.6667L2.04887 6.70649C2.04887 6.64205 1.99663 6.58982 1.9322 6.58982C1.90566 6.58982 1.8799 6.59888 1.8592 6.61549L1.53923 6.87217C0.951171 7.34333 0.249058 6.50097 0.76001 6.00645L0.811506 5.96116L6.63618 1.29449L6.69628 1.25224C6.69778 1.25132 6.69929 1.2504 6.7008 1.24949L6.63618 1.29449C6.66273 1.27322 6.69068 1.2546 6.71968 1.23864C6.73531 1.23003 6.75127 1.22219 6.76748 1.21511C6.77705 1.21094 6.78672 1.20703 6.79646 1.20339C6.81078 1.19804 6.82523 1.19329 6.83981 1.18912C6.84847 1.18664 6.85721 1.18436 6.86598 1.18229C6.8821 1.17847 6.89843 1.17535 6.91484 1.17292C6.92268 1.17177 6.93045 1.17078 6.93823 1.16995C6.95674 1.16797 6.97546 1.16689 6.99419 1.16667C7.00028 1.16667 7.00651 1.16667 7.01274 1.16681ZM6.81767 2.64277L3.32311 5.44243C3.25401 5.49778 3.2138 5.58153 3.2138 5.67006L3.21399 11.375C3.21401 11.5361 3.34459 11.6667 3.50567 11.6667H4.66953C4.83061 11.6667 4.96119 11.5361 4.96121 11.375L4.96141 8.16667C4.96141 7.86751 5.18626 7.62096 5.47595 7.58726L5.53547 7.58382C5.54107 7.5835 5.54668 7.58333 5.55229 7.58333H8.45621C8.7779 7.58333 9.03868 7.8445 9.03868 8.16667L9.03848 11.375C9.03846 11.5361 9.16903 11.6667 9.33012 11.6667C9.33011 11.6667 9.33012 11.6667 9.33012 11.6667L10.4944 11.6667C10.6555 11.6667 10.7861 11.5361 10.7861 11.375V5.67005C10.7861 5.58152 10.7459 5.49779 10.6768 5.44243L7.1824 2.64278C7.07582 2.55738 6.92426 2.55738 6.81767 2.64277ZM7.29041 8.75H6.70967C6.38751 8.75 6.12634 9.01117 6.12634 9.33333V11.375C6.12634 11.5361 6.25692 11.6667 6.41801 11.6667H7.58207C7.74316 11.6667 7.87374 11.5361 7.87374 11.375V9.33333C7.87374 9.01117 7.61257 8.75 7.29041 8.75Z'
      fill='currentColor'
    />
  </svg>
);

const tag = (
  <svg width='1em' height='1em' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M8.16628 1.16766L11.5316 1.30638C12.1216 1.3307 12.6004 1.79199 12.6466 2.38066L12.925 5.92253C12.9517 6.26273 12.8282 6.59759 12.5869 6.83889L6.82038 12.6054C6.36477 13.061 5.62608 13.061 5.17047 12.6054L1.50833 8.94323C1.05272 8.48762 1.05272 7.74893 1.50833 7.29332L7.29327 1.50838C7.52387 1.27778 7.84045 1.15423 8.16628 1.16766ZM8.11823 2.33334L2.74577 7.70579C2.51797 7.9336 2.51797 8.30295 2.74577 8.53075L5.58295 11.3679C5.81075 11.5957 6.1801 11.5957 6.40791 11.3679L11.7619 6.01393L11.5038 2.72997C11.4923 2.58281 11.3726 2.46749 11.2251 2.46141L8.11823 2.33334ZM8.97477 3.40479C9.78019 3.40479 10.4331 4.05771 10.4331 4.86312C10.4331 5.66854 9.78019 6.32145 8.97477 6.32145C8.16936 6.32145 7.51644 5.66854 7.51644 4.86312C7.51644 4.05771 8.16936 3.40479 8.97477 3.40479ZM8.97477 4.57145C8.81369 4.57145 8.6831 4.70204 8.6831 4.86312C8.6831 5.0242 8.81369 5.15479 8.97477 5.15479C9.13585 5.15479 9.26644 5.0242 9.26644 4.86312C9.26644 4.70204 9.13585 4.57145 8.97477 4.57145Z'
      fill='currentColor'
    />
  </svg>
);

const data: BreadcrumbProps<BreadcrumbData>['data'] = [
  { icon: home, url: '#home' },
  { icon: tag, title: 'Custom', url: 'https://www.google.com' },
  { icon: tag, title: 'Demo' },
];

const style = { display: 'flex', alignItems: 'center' };
const data2: BreadcrumbProps<BreadcrumbData>['data'] = [
  {
    title: (
      <a style={style} href='#home'>
        Home&nbsp;{home}{' '}
      </a>
    ),
  },
  {
    title: (
      <a style={style} href='https://www.google.com'>
        Custom&nbsp;{tag}
      </a>
    ),
  },
  { title: <span style={style}>Custom&nbsp;{tag}</span> },
];

const App: React.FC = () => (
  <div>
    <Breadcrumb data={data} style={{ marginBottom: 24 }} />
    <Breadcrumb data={data2} />
  </div>
);

export default App;

```
### 自定义渲染
自定义渲染面包屑中的内容
```tsx
/**
 * cn - 自定义渲染
 *    -- 自定义渲染面包屑中的内容
 * en - Base
 *    -- Custom render content in Breadcrumb
 */

import React, { ReactNode } from 'react';
import { Breadcrumb, TYPE } from 'shineout';

const data = [
  { name: 'home', link: '#home' },
  { name: 'menu', link: 'https://www.google.com' },
  { name: 'self' },
];
type BreadcrumbProps = TYPE.Breadcrumb.Props<typeof data[0]>;

const renderItem: BreadcrumbProps['renderItem'] = (value) => {
  let BreadcrumbItem: ReactNode = value.name;

  if (value.link) BreadcrumbItem = <a href={value.link}>{value.name}</a>;

  return BreadcrumbItem;

  return <b>{BreadcrumbItem}</b>;
};
export default function () {
  return <Breadcrumb renderItem={renderItem} data={data} />;
}

```
### 带有下拉
dataItem 为数组时，会渲染为下拉
```tsx
/**
 * cn - 带有下拉
 *    -- dataItem 为数组时，会渲染为下拉
 * en - Dropdown
 *    -- When dataItem is an array, it will be rendered as a dropdown
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Message, TYPE } from 'shineout';

type BreadcrumbData = TYPE.Breadcrumb.Data;

type BreadcrumbProps<data> = TYPE.Breadcrumb.Props<data>;

const data: BreadcrumbProps<BreadcrumbData>['data'] = [
  { title: 'Home', url: '/' },
  { title: <Link to='/cn/components/shineout/button'>Button</Link> },
  [
    {
      title: 'Dropdown',
      onClick: () => {
        Message.info('Dropdown');
      },
    },
    { title: 'Menu', url: window.location.href },
    { title: 'Pagination' },
    { title: 'Table' },
  ],
  { title: 'Self' },
];
const App: React.FC = () => <Breadcrumb data={data} />;

export default App;

```
### 显示省略
通过 max 来指定最多渲染的面包屑数量，超出的部分将显示为省略号。
```tsx
/**
 * cn - 显示省略
 *    -- 通过 max 来指定最多渲染的面包屑数量，超出的部分将显示为省略号。
 * en - Max
 *    -- Set max to limit the number of breadcrumbs displayed
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Message, TYPE } from 'shineout';

type BreadcrumbData = TYPE.Breadcrumb.Data;

type BreadcrumbProps<data> = TYPE.Breadcrumb.Props<data>;

const data: BreadcrumbProps<BreadcrumbData>['data'] = [
  { title: 'Home', url: '/' },
  { title: <Link to='/cn/components/shineout/button'>Button</Link> },
  {
    title: 'Dropdown',
    onClick: () => {
      Message.info('Dropdown');
    },
  },
  { title: 'Menu', url: window.location.href },
  {
    title: 'Pagination',
    onClick: () => {
      Message.info('Pagination');
    },
  },
  {
    title: 'Table',
    onClick: () => {
      Message.info('Table');
    },
  },
  { title: 'Self' },
];
const App: React.FC = () => <Breadcrumb max={3} data={data} />;

export default App;

```
## Guide
### 何时使用
当系统超过两级以上层级结构；\n 当系统需要让用户了解自己所处位置，并需要向上返回时
### 组件常见用法
1、面包屑中文案过长时，可缩略显示，鼠标 hover 时显示全部
### 推荐/慎用示例
面包屑作用为显示层级结构和当前所在位置，应重点强调当前所在位置，弱化分隔符及上级页面的视觉效果


# Button
使用按钮触发操作和链接
## API
### Button
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|style|CSSProperties ||自定义样式|
|className|string ||自定义类名|
|onClick|MouseEventHandler<Element> ||按钮点击回调|
|disabled|boolean |false|禁用|
|children|ReactNode||按钮里面的内容, 可以是文字图标等|
|renderLoading|((buttonEl: ReactNode) => ReactElement) ||自定义loading|
|loading|boolean |false|loading 状态|
|mode|\"text\" / \"outline\" / \"dashed\" ||按钮风格|
|type|/ \"default\"  / \"primary\"  / \"secondary\"  / \"danger\"  / \"warning\"  / \"success\"  / \"link\" |\"default\"|按钮类型|
|size|\"default\" / \"small\" / \"large\" |\"default\"|按钮尺寸|
|space|boolean |false|仅有2个汉字的按钮，是否在2个汉字中间插入空格|
|href|string ||如果设置了 href 属性，将会用 <a> 代替 <button>|
|target|string ||当设置了 href 属性时，target 会被设置到 <a> 元素上|
|shape|\"circle\" / \"round\" / \"square\" |\"default\"|设置按钮形状|
|htmlType|\"button\" / \"submit\" / \"reset\" |\"button\"|按钮原生type属性|
### Button.Group
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|style|CSSProperties ||自定义样式|
|className|string ||自定义类名|
|size|\"small\" / \"large\" / \"default\"|\"default\"|不同尺寸|
|shape|\"round\" ||设置按钮形状|
|mode|\"text\" / \"outline\" / \"dashed\" ||按钮风格;如果Button和Group同时设置mode,以Group为准|
|type|/ \"default\"  / \"primary\"  / \"secondary\"  / \"danger\"  / \"warning\"  / \"success\"  / \"link\" |\"default\"|按钮类型;如果Button和Group同时设置type,以Button为准|
|children|ReactNode|index|由 Button 组成的 array|
## Example
### 基本用法
按钮分为主要按钮、次要按钮、线框按钮、虚框按钮、文字按钮五种，主按钮在同一个操作区域最多出现一次
```tsx
/**
 * cn - 基本用法
 *    -- 按钮分为主要按钮、次要按钮、线框按钮、虚框按钮、文字按钮五种，主按钮在同一个操作区域最多出现一次
 * en - Base
 *    -- Button is divided into five types: primary, secondary, outline, dash, and text. The primary button can only appear once in the same operation area
 */

import { Button } from 'shineout';
export default () => {
  const buttonStyle = {
    margin: 0,
  };

  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Button type='primary' style={buttonStyle}>
        Primary
      </Button>

      <Button type='secondary' style={buttonStyle}>
        Secondary
      </Button>

      <Button type='secondary' mode='outline' style={buttonStyle}>
        Outline
      </Button>

      <Button type='secondary' mode='dashed' style={buttonStyle}>
        Dashed
      </Button>

      <Button type='primary' mode='text' style={buttonStyle}>
        Text
      </Button>
    </div>
  );
};

```
### 图标按钮
Button 可以嵌入图标
```tsx
/**
 * cn - 图标按钮
 *    -- Button 可以嵌入图标
 * en - Button with icon
 *    -- Button can embed icons
 */

import { Button } from 'shineout';
import { Icon01 } from './static/icon';

export default () => {
  const buttonStyle = {
    margin: 0,
  };

  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Button type='primary' style={buttonStyle}>
        <Icon01 style={{ marginRight: 4 }}></Icon01>
        Primary
      </Button>
      <Button type='primary' style={buttonStyle}>
        Primary
        <Icon01 style={{ marginLeft: 4 }}></Icon01>
      </Button>
      <Button type='primary' shape='square' style={buttonStyle}>
        <Icon01></Icon01>
      </Button>
    </div>
  );
};

```
### 按钮形状
按钮分为矩形、全圆角、方形、圆形四种
```tsx
/**
 * cn - 按钮形状
 *    -- 按钮分为矩形、全圆角、方形、圆形四种
 * en - Button shape
 *    -- Button is divided into square, circle, round, and rectangle
 */

import { Button } from 'shineout';
import { Icon01 } from './static/icon';

export default () => {
  const buttonStyle = {
    margin: 0,
  };

  const iconWarpperStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  };

  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Button type='primary' style={buttonStyle}>
        Primary
      </Button>
      <Button type='primary' shape='round' style={buttonStyle}>
        Primary
      </Button>
      <Button type='primary' shape='square' style={buttonStyle}>
        <span style={iconWarpperStyle}>
          <Icon01></Icon01>
        </span>
      </Button>
      <Button type='primary' shape='circle' style={buttonStyle}>
        <span style={iconWarpperStyle}>
          <Icon01></Icon01>
        </span>
      </Button>
    </div>
  );
};

```
### 按钮尺寸
按钮分为小、中、大三种尺寸，推荐及默认为尺寸「中」，可在不同场景及不同业务需求选择适合尺寸
```tsx
/**
 * cn - 按钮尺寸
 *    -- 按钮分为小、中、大三种尺寸，推荐及默认为尺寸「中」，可在不同场景及不同业务需求选择适合尺寸
 * en - Button size
 *    -- Button is divided into small, medium, and large. The recommended and default size is medium. You can choose the appropriate size in different scenarios and different business needs
 */

import { Button } from 'shineout';
export default () => {
  const buttonStyle = {
    margin: 0,
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
      <Button type='primary' size='small' style={buttonStyle}>
        Primary
      </Button>
      <Button type='primary' style={buttonStyle}>
        Primary
      </Button>
      <Button type='primary' size='large' style={buttonStyle}>
        Primary
      </Button>
    </div>
  );
};

```
### 按钮状态
按钮状态分为危险、警告、成功三种，可以与按钮类型同时生效，优先级高于按钮类型
```tsx
/**
 * cn - 按钮状态
 *    -- 按钮状态分为危险、警告、成功三种，可以与按钮类型同时生效，优先级高于按钮类型
 * en - Button status
 *    -- Button status is divided into danger, warning, and success. It can take effect at the same time as the button type, and the priority is higher than the button type
 */

import { Button } from 'shineout';
export default () => {
  const buttonStyle = {
    margin: 0,
    width: 72,
  };

  const wrapperStyle = {
    gap: 24,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  };

  const buttonWrapperStyle = {
    gap: 24,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  };

  return (
    <div style={wrapperStyle}>
      <div style={buttonWrapperStyle}>
        <Button type='danger' style={buttonStyle}>
          Danger
        </Button>
        <Button type='danger' mode='outline' style={buttonStyle}>
          Danger
        </Button>
        <Button type='danger' mode='dashed' style={buttonStyle}>
          Danger
        </Button>
        <Button type='danger' mode='text' style={buttonStyle}>
          Danger
        </Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='warning' style={buttonStyle}>
          Warning
        </Button>
        <Button type='warning' mode='outline' style={buttonStyle}>
          Warning
        </Button>
        <Button type='warning' mode='dashed' style={buttonStyle}>
          Warning
        </Button>
        <Button type='warning' mode='text' style={buttonStyle}>
          Warning
        </Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='success' style={buttonStyle}>
          Success
        </Button>
        <Button type='success' mode='outline' style={buttonStyle}>
          Success
        </Button>
        <Button type='success' mode='dashed' style={buttonStyle}>
          Success
        </Button>
        <Button type='success' mode='text' style={buttonStyle}>
          Success
        </Button>
      </div>
    </div>
  );
};

```
### 禁用按钮
按钮的禁用状态
```tsx
/**
 * cn - 禁用按钮
 *    -- 按钮的禁用状态
 * en - Disabled
 *    -- Button disabled state
 */

import { Button } from 'shineout';
export default () => {
  const buttonStyle = {
    margin: 0,
    width: 72,
  };

  const wrapperStyle = {
    gap: 24,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  };

  const buttonWrapperStyle = {
    gap: 24,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  };

  return (
    <div style={wrapperStyle}>
      <div style={buttonWrapperStyle}>
        <Button type='primary' disabled style={buttonStyle}>
          Primary
        </Button>
        <Button type='primary' disabled mode='outline' style={buttonStyle}>
          Primary
        </Button>
        <Button type='primary' disabled mode='dashed' style={buttonStyle}>
          Primary
        </Button>
        <Button type='primary' disabled mode='text' style={buttonStyle}>
          Primary
        </Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='danger' disabled style={buttonStyle}>
          Danger
        </Button>
        <Button type='danger' disabled mode='outline' style={buttonStyle}>
          Danger
        </Button>
        <Button type='danger' disabled mode='dashed' style={buttonStyle}>
          Danger
        </Button>
        <Button type='danger' disabled mode='text' style={buttonStyle}>
          Danger
        </Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='warning' disabled style={buttonStyle}>
          Warning
        </Button>
        <Button type='warning' disabled mode='outline' style={buttonStyle}>
          Warning
        </Button>
        <Button type='warning' disabled mode='dashed' style={buttonStyle}>
          Warning
        </Button>
        <Button type='warning' disabled mode='text' style={buttonStyle}>
          Warning
        </Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='success' disabled style={buttonStyle}>
          Success
        </Button>
        <Button type='success' disabled mode='outline' style={buttonStyle}>
          Success
        </Button>
        <Button type='success' disabled mode='dashed' style={buttonStyle}>
          Success
        </Button>
        <Button type='success' disabled mode='text' style={buttonStyle}>
          Success
        </Button>
      </div>
    </div>
  );
};

```
### 加载中按钮
通过设置 loading 可以让一个按钮处于加载中状态，处于加载中状态的按钮不会触发点击事件
```tsx
/**
 * cn - 加载中按钮
 *    -- 通过设置 loading 可以让一个按钮处于加载中状态，处于加载中状态的按钮不会触发点击事件
 * en - Loading
 *    -- Set loading to make a button loading. The button in the loading state does not trigger the click event
 */

import { Button } from 'shineout';
export default () => {
  const buttonStyle = {
    margin: 0,
  };

  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Button type='primary' loading style={buttonStyle}>
        Primary
      </Button>
      <Button type='primary' loading shape='square' style={buttonStyle}></Button>
    </div>
  );
};

```
### 组合按钮
可用在同级多项操作，以按钮组合方式出现
```tsx
/**
 * cn - 组合按钮
 *    -- 可用在同级多项操作，以按钮组合方式出现
 * en - Group
 *    -- Can be used in the same level of multiple operations, in the form of button group
 */

import { Button } from 'shineout';
import { Icon02, Icon03 } from './static/icon';

export default () => {
  const iconWarpperStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    // lineHeight: '22px',
    height: '100%',
  };

  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', flexDirection: 'column' }}>
      <Button.Group mode='text'>
        <Button type='primary'>Publish</Button>
        <Button type='secondary'>Publish</Button>
        <Button type='secondary'>Publish</Button>
        <Button type='secondary' disabled>
          Publish
        </Button>
      </Button.Group>

      <Button.Group type='secondary'>
        <Button type='primary'>Publish</Button>
        <Button>Publish</Button>
        <Button>Publish</Button>
        <Button>Publish</Button>
      </Button.Group>

      <Button.Group type='secondary' mode='outline'>
        <Button>Publish</Button>
        <Button>Publish</Button>
        <Button>Publish</Button>
        <Button>Publish</Button>
      </Button.Group>

      <div style={{ display: 'flex', gap: 24 }}>
        <Button.Group type='primary'>
          <Button>Publish</Button>
          <Button>
            <span style={iconWarpperStyle}>
              <Icon02></Icon02>
            </span>
          </Button>
        </Button.Group>

        <Button.Group type='secondary'>
          <Button>Publish</Button>
          <Button>
            <span style={iconWarpperStyle}>
              <Icon03 color='#666C7C'></Icon03>
            </span>
          </Button>
        </Button.Group>
      </div>
    </div>
  );
};

```
## Guide
### 何时使用
当操作命令需要用户点击，触发相应业务逻辑时
### 与布局相关
1、在页面、表单、对话框等场景中按钮一般会处于用户浏览路径上，便于用户发现，高效引导行动
2、主按钮通常单独使用，是页面里的最主要的视觉焦点，在一个页面中，建议最多只出现一个主按钮
3、当有限的空间中需要放置按钮数量过多时，可以适当将次按钮折叠，或者对按钮进行组合排列，可以按照主次组合或者业务场景进行组合
### 组件搭配使用
不同类型按钮搭配使用，可以用来表达不同的强调级别
### 推荐/慎用示例
1、用户在使用主、次按钮时，需要表达主次关系，突出强调的用主要按钮，其他操作使用次要按钮，禁止同时使用多个主要按钮
2、多个按钮组合使用时，每个按钮之间需存在一定间隔，不建议连在一起
3、当多个按钮组合使用时，需要换行的情况下，需与布局组件结合使用，防止换行时左边出现留白情况


# Card
最基础的卡片容器，能够创建清晰的视觉单元，让信息更具逻辑性
## API
### Card.Body
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|children|ReactNode||子元素|
### Card
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|collapsible|boolean / \"bottom\" |false|是否可折叠，\"bottom\" 表示从下方点击折叠|
|collapsed|boolean ||是否折叠，用于受控状态|
|defaultCollapsed|boolean |true|初始折叠状态（仅在 collapsible 为 true 时有效）|
|onCollapse|((collapsed: boolean) => void) ||折叠状态改变时回调事件|
|shadow|boolean / \"hover\" |false|是否显示阴影\n \"hover\" - 鼠标移到元素上显示;\n true - 总是显示;\n false - 从不显示|
|id|any||手风琴下控制展开的值|
|children|ReactNode||子元素|
|forwardedRef|((el: HTMLDivElement) => void) ||获取 Card dom|
|resizable|boolean / \"x\" / \"y\" / \"xy\" |false|是否可以拖动大小|
|moveable|boolean |false|是否可以拖拽移动|
|split|boolean |false|是否分割头部和主体|
### Card.Footer
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|align|\"left\" / \"center\" / \"right\" ||对齐方式|
|children|ReactNode||子元素|
### Card.Header
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|align|\"left\" / \"center\" / \"right\"||对齐方式|
|children|ReactNode||子元素|
|extra|ReactNode||额外元素|
## Example
### 基本用法
Card 内部由 Header, Body, Footer 三个自组件组成，可以组合或单独使用
```tsx
/**
 * cn - 基本用法
 *    -- Card 内部由 Header, Body, Footer 三个自组件组成，可以组合或单独使用
 * en - Base
 *    -- The card is composed of three components: Header, Body, and Footer. It can be combined or used separately
 */
import React from 'react';
import { Card, TYPE, Button } from 'shineout';

type CardProps = TYPE.Card.Props;

type CardStyle = CardProps['style'];

const cardStyle: CardStyle = {
  width: 360,
};

const iconStyle = {
  width: 32,
  height: 32,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
};

const App: React.FC = () => (
  <div>
    <Card style={cardStyle} split>
      <Card.Header
        extra={
          <Button mode='text' type='primary'>
            Text Button
          </Button>
        }
      >
        Card title
      </Card.Header>
      <Card.Body>
        Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
        bird in the open.
      </Card.Body>
      <Card.Footer>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              marginRight: 8,
              ...iconStyle,
            }}
          >
            <svg
              width='14'
              height='14'
              viewBox='0 0 14 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M11.6084 4.76308C11.5697 4.75817 11.5308 4.75559 11.4917 4.75534L9.33165 4.74819C9.42966 4.30236 9.48157 3.85177 9.48157 3.43331C9.48157 3.00474 9.43549 2.57319 9.34507 2.14938C9.33827 2.11717 9.3285 2.08568 9.31591 2.05534C9.0814 1.1845 8.32423 0.583313 7.4434 0.583313C6.40039 0.583313 5.61348 1.45653 5.61348 2.61427L5.61289 2.64403C5.61127 2.6823 5.61127 2.72063 5.61289 2.75891C5.56739 3.96546 4.59497 5.01843 3.38338 5.1732L1.67654 5.20117C1.39501 5.17907 1.11723 5.27806 0.910387 5.4742C0.703543 5.67034 0.586463 5.94578 0.587457 6.23391L0.583374 12.3869C0.583374 12.9541 1.03429 13.4166 1.58904 13.4166H3.46213L10.5794 13.4041C10.9737 13.4041 11.2211 13.2911 11.5145 13.097C11.805 12.9041 12.0409 12.6369 12.1987 12.322C12.253 12.2327 12.2932 12.1375 12.3189 12.0381L12.3236 12.0184L13.3841 7.13748C13.4074 7.04224 13.4173 6.94462 13.4133 6.847C13.4372 6.4303 13.3361 6.01604 13.1233 5.6595C12.7891 5.09879 12.2792 4.7976 11.6084 4.76308ZM2.18914 6.2391L2.30975 6.23731C2.63189 6.23254 2.89681 6.49515 2.90149 6.82385C2.90153 6.82673 2.90155 6.82961 2.90155 6.83249V11.7738C2.90155 12.1025 2.64038 12.369 2.31821 12.369H2.19338C1.87121 12.3695 1.61004 12.103 1.61004 11.7743L1.6105 11.7738L1.61426 6.83381C1.61451 6.50862 1.87048 6.24381 2.18914 6.2391ZM12.3831 6.90296L11.3255 11.7714C11.3129 11.7904 11.3016 11.8103 11.2917 11.8309C11.2162 11.989 11.0998 12.123 10.9551 12.2184C10.7672 12.3428 10.713 12.3565 10.5742 12.3565L4.51258 12.3674C4.19041 12.368 3.92879 12.1019 3.92822 11.7732L3.92822 11.7722V6.13272C5.46006 5.7476 6.59581 4.37141 6.63898 2.76367C6.63993 2.74442 6.63954 2.72513 6.63781 2.70593V2.67617L6.63956 2.61367C6.63956 2.12558 6.91548 1.63034 7.4434 1.63034C7.87098 1.63034 8.2379 1.93748 8.3359 2.37736C8.34123 2.40165 8.34825 2.42552 8.3569 2.44879C8.42131 2.77265 8.45394 3.10226 8.45432 3.43272C8.45432 3.95058 8.3499 4.55772 8.16848 5.09939C8.11461 5.25914 8.13966 5.43562 8.23573 5.57322C8.3318 5.71082 8.48708 5.79261 8.65265 5.79284L11.4912 5.80296C11.5087 5.80534 11.5256 5.80712 11.5425 5.80772C11.8791 5.822 12.0891 5.93986 12.2466 6.20355C12.354 6.38442 12.4031 6.59508 12.3872 6.80593C12.3854 6.8321 12.3856 6.85837 12.3877 6.8845L12.3837 6.90236L12.3831 6.90296Z'
                fill='#666C7C'
              />
            </svg>
          </div>
          <div
            style={{
              marginRight: 8,
              ...iconStyle,
            }}
          >
            <svg
              width='14'
              height='14'
              viewBox='0 0 14 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M11.6666 1.75C12.311 1.75 12.8333 2.26557 12.8333 2.90155V11.5382C12.8333 11.9313 12.5104 12.25 12.1121 12.25C12.0002 12.25 11.8898 12.2243 11.7897 12.1749L8.41102 11.0839C8.24907 11.004 8.0705 10.9624 7.88944 10.9624H2.33329C1.68896 10.9624 1.16663 10.4468 1.16663 9.81085V2.90155C1.16663 2.26557 1.68896 1.75 2.33329 1.75H11.6666ZM11.0833 2.90155H2.91663C2.59446 2.90155 2.33329 3.15933 2.33329 3.47733V9.23508C2.33329 9.55307 2.59446 9.81085 2.91663 9.81085H7.88944C8.19982 9.81085 8.50655 9.87197 8.79183 9.99006L8.9326 10.0538L11.2947 10.7214C11.4495 10.7652 11.611 10.6767 11.6554 10.5239C11.6628 10.4981 11.6666 10.4714 11.6666 10.4446V3.47733C11.6666 3.15933 11.4055 2.90155 11.0833 2.90155ZM7.5832 6.93198C7.90533 6.93202 8.16645 7.18979 8.16645 7.50775C8.16645 7.82571 7.90533 8.08348 7.5832 8.08353H4.0832C3.76107 8.08348 3.49996 7.82571 3.49996 7.50775C3.49996 7.18979 3.76107 6.93202 4.0832 6.93198H7.5832ZM9.91654 4.62888C10.125 4.62884 10.3176 4.73858 10.4218 4.91674C10.526 5.0949 10.526 5.3144 10.4218 5.49256C10.3176 5.67072 10.125 5.78046 9.91654 5.78043H4.0832C3.76107 5.78038 3.49996 5.52261 3.49996 5.20465C3.49996 4.88669 3.76107 4.62892 4.0832 4.62888H9.91654Z'
                fill='#666C7C'
              />
            </svg>
          </div>
          <div style={iconStyle}>
            <svg
              width='14'
              height='14'
              viewBox='0 0 14 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12.1513 0.592407C12.2679 0.571526 12.3807 0.587559 12.48 0.6307C12.4836 0.633009 12.4876 0.634808 12.4917 0.636657C12.5519 0.663785 12.6065 0.701338 12.6537 0.746589C12.6566 0.749428 12.6596 0.752341 12.6626 0.755292L12.6712 0.764178C12.7165 0.811346 12.754 0.865931 12.7817 0.925713C12.7831 0.930218 12.7849 0.9343 12.7866 0.938397C12.8418 1.06357 12.8529 1.21109 12.8006 1.36048L12.8119 1.32526C12.8096 1.3333 12.8072 1.34131 12.8046 1.34926L12.8006 1.36048L8.92148 12.4438C8.74695 12.9425 8.05241 12.9708 7.83784 12.488L5.71206 7.70519L0.929811 5.58C0.470019 5.37564 0.473825 4.73594 0.905988 4.52472L0.974021 4.49635L12.0574 0.617187C12.0613 0.615824 12.0651 0.614504 12.069 0.613227C12.0766 0.610661 12.0846 0.608239 12.0926 0.605992C12.1093 0.601251 12.1257 0.597343 12.142 0.594157C12.1436 0.594178 12.1454 0.593853 12.1472 0.593537L12.1513 0.592407ZM10.8547 3.38798L6.84954 7.39315L8.30614 10.6697L10.8547 3.38798ZM10.0305 2.5614L2.74756 5.1111L6.02412 6.56773L10.0305 2.5614Z'
                fill='#666C7C'
              />
            </svg>
          </div>
          <div style={{ ...iconStyle, marginInlineStart: 'auto' }}>
            <svg
              width='14'
              height='14'
              viewBox='0 0 14 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2.91667 5.83331C3.561 5.83331 4.08333 6.35565 4.08333 6.99998C4.08333 7.64431 3.561 8.16665 2.91667 8.16665C2.27233 8.16665 1.75 7.64431 1.75 6.99998C1.75 6.35565 2.27233 5.83331 2.91667 5.83331ZM7 5.83331C7.64433 5.83331 8.16667 6.35565 8.16667 6.99998C8.16667 7.64431 7.64433 8.16665 7 8.16665C6.35567 8.16665 5.83333 7.64431 5.83333 6.99998C5.83333 6.35565 6.35567 5.83331 7 5.83331ZM11.0833 5.83331C11.7277 5.83331 12.25 6.35565 12.25 6.99998C12.25 7.64431 11.7277 8.16665 11.0833 8.16665C10.439 8.16665 9.91667 7.64431 9.91667 6.99998C9.91667 6.35565 10.439 5.83331 11.0833 5.83331Z'
                fill='#666C7C'
              />
            </svg>
          </div>
        </div>
      </Card.Footer>
    </Card>
  </div>
);

export default App;

```
### 阴影
可以通过 <span>shadow</span> 属性控制阴影
```tsx
/**
 * cn - 阴影
 *    -- 可以通过 `shadow` 属性控制阴影
 * en - BoxShadow
 *    -- Set the `shadow` property to determined how to display the shadow
 */
import React from 'react';
import { Card, TYPE } from 'shineout';

type CardProps = TYPE.Card.Props;

type CardStyle = CardProps['style'];

const cardStyle: CardStyle = {
  width: 140,
  display: 'inline-flex',
  marginInlineEnd: 20,
};

const App: React.FC = () => (
  <div>
    <Card style={cardStyle}>
      <Card.Body>Never</Card.Body>
    </Card>

    <Card style={cardStyle} shadow='hover'>
      <Card.Body>Hover</Card.Body>
    </Card>

    <Card style={cardStyle} shadow>
      <Card.Body>Always</Card.Body>
    </Card>
  </div>
);

export default App;

```
### 悬浮样式
可以设置 <span>shadow</span> = 'hover'，让卡片在鼠标移入时显示阴影，同时你可以通过样式覆盖来自定义悬浮样式
```tsx
/**
 * cn - 悬浮样式
 *    -- 可以设置 `shadow` = 'hover'，让卡片在鼠标移入时显示阴影，同时你可以通过样式覆盖来自定义悬浮样式
 * en - Hover
 *    -- Set shadow to hover to show shadow when the mouse is over the card, and you can customize the hover style by overriding the style
 */
import React from 'react';
import { Card, TYPE, Button } from 'shineout';
import { createUseStyles } from 'react-jss';

type CardProps = TYPE.Card.Props;

type CardStyle = CardProps['style'];

const cardStyle: CardStyle = {
  width: 360,
  display: 'inline-flex',
};

const iconStyle = {
  width: 32,
  height: 32,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
};

const HoverCard: React.FC<{ className?: string }> = (props) => (
  <Card
    style={{...cardStyle, margin: '16px'}}
    split
    className={props.className}
    shadow='hover'
  >
    <Card.Header
      extra={
        <Button mode='text' type='primary'>
          Text Button
        </Button>
      }
    >
      Card title
    </Card.Header>
    <Card.Body>
      Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
      bird in the open.
    </Card.Body>
    <Card.Footer>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            marginRight: 8,
            ...iconStyle,
          }}
        >
          <svg
            width='14'
            height='14'
            viewBox='0 0 14 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M11.6084 4.76308C11.5697 4.75817 11.5308 4.75559 11.4917 4.75534L9.33165 4.74819C9.42966 4.30236 9.48157 3.85177 9.48157 3.43331C9.48157 3.00474 9.43549 2.57319 9.34507 2.14938C9.33827 2.11717 9.3285 2.08568 9.31591 2.05534C9.0814 1.1845 8.32423 0.583313 7.4434 0.583313C6.40039 0.583313 5.61348 1.45653 5.61348 2.61427L5.61289 2.64403C5.61127 2.6823 5.61127 2.72063 5.61289 2.75891C5.56739 3.96546 4.59497 5.01843 3.38338 5.1732L1.67654 5.20117C1.39501 5.17907 1.11723 5.27806 0.910387 5.4742C0.703543 5.67034 0.586463 5.94578 0.587457 6.23391L0.583374 12.3869C0.583374 12.9541 1.03429 13.4166 1.58904 13.4166H3.46213L10.5794 13.4041C10.9737 13.4041 11.2211 13.2911 11.5145 13.097C11.805 12.9041 12.0409 12.6369 12.1987 12.322C12.253 12.2327 12.2932 12.1375 12.3189 12.0381L12.3236 12.0184L13.3841 7.13748C13.4074 7.04224 13.4173 6.94462 13.4133 6.847C13.4372 6.4303 13.3361 6.01604 13.1233 5.6595C12.7891 5.09879 12.2792 4.7976 11.6084 4.76308ZM2.18914 6.2391L2.30975 6.23731C2.63189 6.23254 2.89681 6.49515 2.90149 6.82385C2.90153 6.82673 2.90155 6.82961 2.90155 6.83249V11.7738C2.90155 12.1025 2.64038 12.369 2.31821 12.369H2.19338C1.87121 12.3695 1.61004 12.103 1.61004 11.7743L1.6105 11.7738L1.61426 6.83381C1.61451 6.50862 1.87048 6.24381 2.18914 6.2391ZM12.3831 6.90296L11.3255 11.7714C11.3129 11.7904 11.3016 11.8103 11.2917 11.8309C11.2162 11.989 11.0998 12.123 10.9551 12.2184C10.7672 12.3428 10.713 12.3565 10.5742 12.3565L4.51258 12.3674C4.19041 12.368 3.92879 12.1019 3.92822 11.7732L3.92822 11.7722V6.13272C5.46006 5.7476 6.59581 4.37141 6.63898 2.76367C6.63993 2.74442 6.63954 2.72513 6.63781 2.70593V2.67617L6.63956 2.61367C6.63956 2.12558 6.91548 1.63034 7.4434 1.63034C7.87098 1.63034 8.2379 1.93748 8.3359 2.37736C8.34123 2.40165 8.34825 2.42552 8.3569 2.44879C8.42131 2.77265 8.45394 3.10226 8.45432 3.43272C8.45432 3.95058 8.3499 4.55772 8.16848 5.09939C8.11461 5.25914 8.13966 5.43562 8.23573 5.57322C8.3318 5.71082 8.48708 5.79261 8.65265 5.79284L11.4912 5.80296C11.5087 5.80534 11.5256 5.80712 11.5425 5.80772C11.8791 5.822 12.0891 5.93986 12.2466 6.20355C12.354 6.38442 12.4031 6.59508 12.3872 6.80593C12.3854 6.8321 12.3856 6.85837 12.3877 6.8845L12.3837 6.90236L12.3831 6.90296Z'
              fill='#666C7C'
            />
          </svg>
        </div>
        <div
          style={{
            marginRight: 8,
            ...iconStyle,
          }}
        >
          <svg
            width='14'
            height='14'
            viewBox='0 0 14 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M11.6666 1.75C12.311 1.75 12.8333 2.26557 12.8333 2.90155V11.5382C12.8333 11.9313 12.5104 12.25 12.1121 12.25C12.0002 12.25 11.8898 12.2243 11.7897 12.1749L8.41102 11.0839C8.24907 11.004 8.0705 10.9624 7.88944 10.9624H2.33329C1.68896 10.9624 1.16663 10.4468 1.16663 9.81085V2.90155C1.16663 2.26557 1.68896 1.75 2.33329 1.75H11.6666ZM11.0833 2.90155H2.91663C2.59446 2.90155 2.33329 3.15933 2.33329 3.47733V9.23508C2.33329 9.55307 2.59446 9.81085 2.91663 9.81085H7.88944C8.19982 9.81085 8.50655 9.87197 8.79183 9.99006L8.9326 10.0538L11.2947 10.7214C11.4495 10.7652 11.611 10.6767 11.6554 10.5239C11.6628 10.4981 11.6666 10.4714 11.6666 10.4446V3.47733C11.6666 3.15933 11.4055 2.90155 11.0833 2.90155ZM7.5832 6.93198C7.90533 6.93202 8.16645 7.18979 8.16645 7.50775C8.16645 7.82571 7.90533 8.08348 7.5832 8.08353H4.0832C3.76107 8.08348 3.49996 7.82571 3.49996 7.50775C3.49996 7.18979 3.76107 6.93202 4.0832 6.93198H7.5832ZM9.91654 4.62888C10.125 4.62884 10.3176 4.73858 10.4218 4.91674C10.526 5.0949 10.526 5.3144 10.4218 5.49256C10.3176 5.67072 10.125 5.78046 9.91654 5.78043H4.0832C3.76107 5.78038 3.49996 5.52261 3.49996 5.20465C3.49996 4.88669 3.76107 4.62892 4.0832 4.62888H9.91654Z'
              fill='#666C7C'
            />
          </svg>
        </div>
        <div style={iconStyle}>
          <svg
            width='14'
            height='14'
            viewBox='0 0 14 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12.1513 0.592407C12.2679 0.571526 12.3807 0.587559 12.48 0.6307C12.4836 0.633009 12.4876 0.634808 12.4917 0.636657C12.5519 0.663785 12.6065 0.701338 12.6537 0.746589C12.6566 0.749428 12.6596 0.752341 12.6626 0.755292L12.6712 0.764178C12.7165 0.811346 12.754 0.865931 12.7817 0.925713C12.7831 0.930218 12.7849 0.9343 12.7866 0.938397C12.8418 1.06357 12.8529 1.21109 12.8006 1.36048L12.8119 1.32526C12.8096 1.3333 12.8072 1.34131 12.8046 1.34926L12.8006 1.36048L8.92148 12.4438C8.74695 12.9425 8.05241 12.9708 7.83784 12.488L5.71206 7.70519L0.929811 5.58C0.470019 5.37564 0.473825 4.73594 0.905988 4.52472L0.974021 4.49635L12.0574 0.617187C12.0613 0.615824 12.0651 0.614504 12.069 0.613227C12.0766 0.610661 12.0846 0.608239 12.0926 0.605992C12.1093 0.601251 12.1257 0.597343 12.142 0.594157C12.1436 0.594178 12.1454 0.593853 12.1472 0.593537L12.1513 0.592407ZM10.8547 3.38798L6.84954 7.39315L8.30614 10.6697L10.8547 3.38798ZM10.0305 2.5614L2.74756 5.1111L6.02412 6.56773L10.0305 2.5614Z'
              fill='#666C7C'
            />
          </svg>
        </div>
        <div style={{ ...iconStyle, marginInlineStart: 'auto' }}>
          <svg
            width='14'
            height='14'
            viewBox='0 0 14 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M2.91667 5.83331C3.561 5.83331 4.08333 6.35565 4.08333 6.99998C4.08333 7.64431 3.561 8.16665 2.91667 8.16665C2.27233 8.16665 1.75 7.64431 1.75 6.99998C1.75 6.35565 2.27233 5.83331 2.91667 5.83331ZM7 5.83331C7.64433 5.83331 8.16667 6.35565 8.16667 6.99998C8.16667 7.64431 7.64433 8.16665 7 8.16665C6.35567 8.16665 5.83333 7.64431 5.83333 6.99998C5.83333 6.35565 6.35567 5.83331 7 5.83331ZM11.0833 5.83331C11.7277 5.83331 12.25 6.35565 12.25 6.99998C12.25 7.64431 11.7277 8.16665 11.0833 8.16665C10.439 8.16665 9.91667 7.64431 9.91667 6.99998C9.91667 6.35565 10.439 5.83331 11.0833 5.83331Z'
              fill='#666C7C'
            />
          </svg>
        </div>
      </div>
    </Card.Footer>
  </Card>
);

const useStyle = createUseStyles(
  {
    customCard: {
      transitionProperty: 'all',
      '&:hover': {
        transform: 'translateY(-4px)',
      },
    },
  },

  { name: 'custom-card' },
);

const App = () => {
  const classes = useStyle();
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', margin:'-16px'}}>
      <HoverCard />
      <HoverCard className={classes?.customCard} />
    </div>
  );
};

export default App;

```
### 无边框卡片
通过设置 border 样式，可以去掉卡片的边框
```tsx
/**
 * cn - 无边框卡片
 *    -- 通过设置 border 样式，可以去掉卡片的边框
 * en - Hover
 *    -- Set shadow to hover to show shadow when the mouse is over the card, and you can customize the hover style by overriding the style
 */
import React from 'react';
import { Card, TYPE, Button } from 'shineout';

type CardProps = TYPE.Card.Props;

type CardStyle = CardProps['style'];

const cardStyle: CardStyle = {
  width: 360,
  border: 'none',
};

const App: React.FC = () => (
  <div style={{ padding: 32, background: '#f4f5f8' }}>
    <Card style={cardStyle} split>
      <Card.Header
        extra={
          <Button mode='text' type='primary'>
            Text Button
          </Button>
        }
      >
        Card title
      </Card.Header>
      <Card.Body>
        Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
        bird in the open.
      </Card.Body>
    </Card>
  </div>
);

export default App;

```
### 无分割线
通过设置 <span>split</span> = false 属性，可以去掉卡片的分割线
```tsx
/**
 * cn - 无分割线
 *    -- 通过设置 `split` = false 属性，可以去掉卡片的分割线
 * en - No split
 *    -- Set `split` = false to remove the split line of the card
 */
import React from 'react';
import { Card, TYPE, Button } from 'shineout';

type CardProps = TYPE.Card.Props;

type CardStyle = CardProps['style'];

const cardStyle: CardStyle = {
  width: 360,
};

const iconStyle = {
  width: 32,
  height: 32,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
};

const App: React.FC = () => (
  <div>
    <Card style={cardStyle} split={false}>
      <Card.Header
        extra={
          <Button mode='text' type='primary'>
            Text Button
          </Button>
        }
      >
        Card title
      </Card.Header>
      <Card.Body>
        Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
        bird in the open.
      </Card.Body>
      <Card.Footer>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              marginRight: 8,
              ...iconStyle,
            }}
          >
            <svg
              width='14'
              height='14'
              viewBox='0 0 14 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M11.6084 4.76308C11.5697 4.75817 11.5308 4.75559 11.4917 4.75534L9.33165 4.74819C9.42966 4.30236 9.48157 3.85177 9.48157 3.43331C9.48157 3.00474 9.43549 2.57319 9.34507 2.14938C9.33827 2.11717 9.3285 2.08568 9.31591 2.05534C9.0814 1.1845 8.32423 0.583313 7.4434 0.583313C6.40039 0.583313 5.61348 1.45653 5.61348 2.61427L5.61289 2.64403C5.61127 2.6823 5.61127 2.72063 5.61289 2.75891C5.56739 3.96546 4.59497 5.01843 3.38338 5.1732L1.67654 5.20117C1.39501 5.17907 1.11723 5.27806 0.910387 5.4742C0.703543 5.67034 0.586463 5.94578 0.587457 6.23391L0.583374 12.3869C0.583374 12.9541 1.03429 13.4166 1.58904 13.4166H3.46213L10.5794 13.4041C10.9737 13.4041 11.2211 13.2911 11.5145 13.097C11.805 12.9041 12.0409 12.6369 12.1987 12.322C12.253 12.2327 12.2932 12.1375 12.3189 12.0381L12.3236 12.0184L13.3841 7.13748C13.4074 7.04224 13.4173 6.94462 13.4133 6.847C13.4372 6.4303 13.3361 6.01604 13.1233 5.6595C12.7891 5.09879 12.2792 4.7976 11.6084 4.76308ZM2.18914 6.2391L2.30975 6.23731C2.63189 6.23254 2.89681 6.49515 2.90149 6.82385C2.90153 6.82673 2.90155 6.82961 2.90155 6.83249V11.7738C2.90155 12.1025 2.64038 12.369 2.31821 12.369H2.19338C1.87121 12.3695 1.61004 12.103 1.61004 11.7743L1.6105 11.7738L1.61426 6.83381C1.61451 6.50862 1.87048 6.24381 2.18914 6.2391ZM12.3831 6.90296L11.3255 11.7714C11.3129 11.7904 11.3016 11.8103 11.2917 11.8309C11.2162 11.989 11.0998 12.123 10.9551 12.2184C10.7672 12.3428 10.713 12.3565 10.5742 12.3565L4.51258 12.3674C4.19041 12.368 3.92879 12.1019 3.92822 11.7732L3.92822 11.7722V6.13272C5.46006 5.7476 6.59581 4.37141 6.63898 2.76367C6.63993 2.74442 6.63954 2.72513 6.63781 2.70593V2.67617L6.63956 2.61367C6.63956 2.12558 6.91548 1.63034 7.4434 1.63034C7.87098 1.63034 8.2379 1.93748 8.3359 2.37736C8.34123 2.40165 8.34825 2.42552 8.3569 2.44879C8.42131 2.77265 8.45394 3.10226 8.45432 3.43272C8.45432 3.95058 8.3499 4.55772 8.16848 5.09939C8.11461 5.25914 8.13966 5.43562 8.23573 5.57322C8.3318 5.71082 8.48708 5.79261 8.65265 5.79284L11.4912 5.80296C11.5087 5.80534 11.5256 5.80712 11.5425 5.80772C11.8791 5.822 12.0891 5.93986 12.2466 6.20355C12.354 6.38442 12.4031 6.59508 12.3872 6.80593C12.3854 6.8321 12.3856 6.85837 12.3877 6.8845L12.3837 6.90236L12.3831 6.90296Z'
                fill='#666C7C'
              />
            </svg>
          </div>
          <div
            style={{
              marginRight: 8,
              ...iconStyle,
            }}
          >
            <svg
              width='14'
              height='14'
              viewBox='0 0 14 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M11.6666 1.75C12.311 1.75 12.8333 2.26557 12.8333 2.90155V11.5382C12.8333 11.9313 12.5104 12.25 12.1121 12.25C12.0002 12.25 11.8898 12.2243 11.7897 12.1749L8.41102 11.0839C8.24907 11.004 8.0705 10.9624 7.88944 10.9624H2.33329C1.68896 10.9624 1.16663 10.4468 1.16663 9.81085V2.90155C1.16663 2.26557 1.68896 1.75 2.33329 1.75H11.6666ZM11.0833 2.90155H2.91663C2.59446 2.90155 2.33329 3.15933 2.33329 3.47733V9.23508C2.33329 9.55307 2.59446 9.81085 2.91663 9.81085H7.88944C8.19982 9.81085 8.50655 9.87197 8.79183 9.99006L8.9326 10.0538L11.2947 10.7214C11.4495 10.7652 11.611 10.6767 11.6554 10.5239C11.6628 10.4981 11.6666 10.4714 11.6666 10.4446V3.47733C11.6666 3.15933 11.4055 2.90155 11.0833 2.90155ZM7.5832 6.93198C7.90533 6.93202 8.16645 7.18979 8.16645 7.50775C8.16645 7.82571 7.90533 8.08348 7.5832 8.08353H4.0832C3.76107 8.08348 3.49996 7.82571 3.49996 7.50775C3.49996 7.18979 3.76107 6.93202 4.0832 6.93198H7.5832ZM9.91654 4.62888C10.125 4.62884 10.3176 4.73858 10.4218 4.91674C10.526 5.0949 10.526 5.3144 10.4218 5.49256C10.3176 5.67072 10.125 5.78046 9.91654 5.78043H4.0832C3.76107 5.78038 3.49996 5.52261 3.49996 5.20465C3.49996 4.88669 3.76107 4.62892 4.0832 4.62888H9.91654Z'
                fill='#666C7C'
              />
            </svg>
          </div>
          <div style={iconStyle}>
            <svg
              width='14'
              height='14'
              viewBox='0 0 14 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12.1513 0.592407C12.2679 0.571526 12.3807 0.587559 12.48 0.6307C12.4836 0.633009 12.4876 0.634808 12.4917 0.636657C12.5519 0.663785 12.6065 0.701338 12.6537 0.746589C12.6566 0.749428 12.6596 0.752341 12.6626 0.755292L12.6712 0.764178C12.7165 0.811346 12.754 0.865931 12.7817 0.925713C12.7831 0.930218 12.7849 0.9343 12.7866 0.938397C12.8418 1.06357 12.8529 1.21109 12.8006 1.36048L12.8119 1.32526C12.8096 1.3333 12.8072 1.34131 12.8046 1.34926L12.8006 1.36048L8.92148 12.4438C8.74695 12.9425 8.05241 12.9708 7.83784 12.488L5.71206 7.70519L0.929811 5.58C0.470019 5.37564 0.473825 4.73594 0.905988 4.52472L0.974021 4.49635L12.0574 0.617187C12.0613 0.615824 12.0651 0.614504 12.069 0.613227C12.0766 0.610661 12.0846 0.608239 12.0926 0.605992C12.1093 0.601251 12.1257 0.597343 12.142 0.594157C12.1436 0.594178 12.1454 0.593853 12.1472 0.593537L12.1513 0.592407ZM10.8547 3.38798L6.84954 7.39315L8.30614 10.6697L10.8547 3.38798ZM10.0305 2.5614L2.74756 5.1111L6.02412 6.56773L10.0305 2.5614Z'
                fill='#666C7C'
              />
            </svg>
          </div>
          <div style={{ ...iconStyle, marginInlineStart: 'auto' }}>
            <svg
              width='14'
              height='14'
              viewBox='0 0 14 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2.91667 5.83331C3.561 5.83331 4.08333 6.35565 4.08333 6.99998C4.08333 7.64431 3.561 8.16665 2.91667 8.16665C2.27233 8.16665 1.75 7.64431 1.75 6.99998C1.75 6.35565 2.27233 5.83331 2.91667 5.83331ZM7 5.83331C7.64433 5.83331 8.16667 6.35565 8.16667 6.99998C8.16667 7.64431 7.64433 8.16665 7 8.16665C6.35567 8.16665 5.83333 7.64431 5.83333 6.99998C5.83333 6.35565 6.35567 5.83331 7 5.83331ZM11.0833 5.83331C11.7277 5.83331 12.25 6.35565 12.25 6.99998C12.25 7.64431 11.7277 8.16665 11.0833 8.16665C10.439 8.16665 9.91667 7.64431 9.91667 6.99998C9.91667 6.35565 10.439 5.83331 11.0833 5.83331Z'
                fill='#666C7C'
              />
            </svg>
          </div>
        </div>
      </Card.Footer>
    </Card>
  </div>
);

export default App;

```
### 表单
Card.Submit 可以用来触发 Card 内部表单提交
```tsx
/**
 * cn - 表单
 *    -- Card.Submit 可以用来触发 Card 内部表单提交
 * en - Form
 *    -- Use Card.submit to trigger the submimt event of the form in the card
 */
import React from 'react';
import { Card, Form, Input } from 'shineout';

const App: React.FC = () => (
  <Card style={{ width: 360 }}>
    <Card.Header>Card title</Card.Header>
    <Card.Body>
      <Form
        labelAlign='top'
        onSubmit={(data) => {
          console.log(data);
        }}
      >
        <Form.Item label='User name :'>
          <Input name='name' defaultValue='user' />
        </Form.Item>

        <Form.Item label='Email :'>
          <Input name='email' defaultValue='test@example.com' />
        </Form.Item>
      </Form>
    </Card.Body>

    <Card.Footer align='right'>
      <Card.Submit>Submit</Card.Submit>
    </Card.Footer>
  </Card>
);

export default App;

```
### 折叠
设置 <span>collapsible</span> 可以折叠 Card，通过 collapsed 或 defaultCollapsed 属性控制状态
```tsx
/**
 * cn - 折叠
 *    -- 设置 `collapsible` 可以折叠 Card，通过 collapsed 或 defaultCollapsed 属性控制状态
 * en - Collapse
 *    -- Set `collapsible` can collapse the Card panel
 */
import React from 'react';
import { Card, DatePicker } from 'shineout';

const App: React.FC = () => (
  <Card collapsible>
    <Card.Header>Card title</Card.Header>

    <Card.Body>
      <div>
        <DatePicker />
      </div>
    </Card.Body>
  </Card>
);

export default App;

```
### 手风琴
使用 Card.Accordion 可以使一组 Card 实现手风琴效果（每次打开一个 Card）
```tsx
/**
 * cn - 手风琴
 *    -- 使用 Card.Accordion 可以使一组 Card 实现手风琴效果（每次打开一个 Card）
 * en - Accordion
 *    -- Put a group of Card in the Card.Accordion, only one panel can be expanded at the same time
 */
import React from 'react';
import { Card } from 'shineout';

const bodyStyle = {
  background: '#f4f5f8',
};
const App: React.FC = () => (
  <Card.Accordion defaultActive={1}>
    <Card split>
      <Card.Header>Card title 1</Card.Header>
      <Card.Body style={bodyStyle}>
        Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
        bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
        as a mask. People who have this joy do not need to talk about it; they radiate it. They just
        live out their joy and let it splash its sunlight and glow into other lives as naturally as
        bird sings.
      </Card.Body>
    </Card>
    <Card split>
      <Card.Header>Card title 2</Card.Header>
      <Card.Body style={bodyStyle}>
        Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
        bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
        as a mask. People who have this joy do not need to talk about it; they radiate it. They just
        live out their joy and let it splash its sunlight and glow into other lives as naturally as
        bird sings.
      </Card.Body>
    </Card>
    <Card split>
      <Card.Header>Card title 3</Card.Header>
      <Card.Body style={bodyStyle}>
        Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
        bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
        as a mask. People who have this joy do not need to talk about it; they radiate it. They just
        live out their joy and let it splash its sunlight and glow into other lives as naturally as
        bird sings.
      </Card.Body>
    </Card>
  </Card.Accordion>
);

export default App;

```
## Guide
### 何时使用
需要将不同类型的数据，组成集合在同一区域展示时\n 需要更多的数据或操作对图片进行补充说明时\n 有交互性的信息内容，需要在一个空间布局内变换长度时
### 组件搭配使用
1、卡片与分页搭配使用，当卡片过多、需在每页固定展示一定数量时，可让用户翻页查找图片
2、卡片与分步加载搭配使用，当卡片数量较多且需要实时更新时，或需要瀑布流展示时，减少用户操作、提供沉浸式体验
3、卡片与搜索框搭配使用，当卡片数量较多时，用户可精确检索快速找到对应卡片
### 推荐/慎用示例
数据格式一致、信息类型较简时，建议使用列表呈现而非卡片，避免增加页面的复杂性


# Carousel
轮播视图容器
## API
### Carousel
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|animation|\"slide\" / \"slide-y\" / \"fade\" |\"slide\"|动画效果，可选值为 slide - 横向滑动 ，slide-y - 垂直滑动 ，fade - 淡入淡出|
|indicatorPosition|\"left\" / \"center\" / \"right\" / \"outer\" |\"center\"|指示标示位置|
|indicatorType|\"number\" / ((current: number, moveTo: (index: number) => void) => ReactNode) / \"circle\" / \"line\" / \"slider\" |\"circle\"|指示标示样式, 函数则可以自定义样式: (current, moveTo) => (<Component />)|
|interval|number |0|动画间隔时间，为 0 时，不自动播放|
|onMove|((current: number, extra: { prev: number; direction: \"forward\" / \"backward\"; moveTo: (n: number) => void; }) => void) ||轮播后的回调|
|children|ReactNode||子元素|
|showArrow|\"always\" / \"hover\" ||切换箭头显示时机|
|arrowClassName|string ||箭头扩展 class|
## Example
### 基本用法
最基本的使用
```tsx
/**
 * cn - 基本用法
 *    -- 最基本的使用
 * en - Base
 *    -- The basic usage
 */
import React from 'react';
import { Carousel } from 'shineout';

const images = [
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-02.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-03.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-04.png',
];
const App: React.FC = () => {
  return (
    <Carousel
      style={{ width: 600, height: 280 }}
      showArrow={'hover'}
      interval={5000}
      onMove={console.log}
    >
      {images.map((src) => (
        <img key={src} src={src} />
      ))}
    </Carousel>
  );
};

export default App;

```
### 指示器
可以指定指示器类型和位置
```tsx
/**
 * cn - 指示器
 *    -- 可以指定指示器类型和位置
 * en - Indicator
 *    -- You can set indicator type and position
 */
import React, { useState } from 'react';
import { Carousel, Radio, TYPE } from 'shineout';

type CarouselProps = TYPE.Carousel.Props;
type CarouselIndicatorType = CarouselProps['indicatorType'];
type CarouselIndicatorPosition = CarouselProps['indicatorPosition'];

const images = [
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-02.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-03.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-04.png',
];
const App: React.FC = () => {
  const [indicatorType, setIndicatorType] = useState<CarouselIndicatorType>('circle');
  const [indicatorPosition, setIndicatorPosition] = useState<CarouselIndicatorPosition>('center');

  const rowStyle = { display: 'flex', marginBottom: 16, alignItems: 'center' };
  return (
    <div>
      <div style={rowStyle}>
        <div style={{ width: 150 }}>indicator position:</div>
        <Radio.Group
          keygen
          value={indicatorPosition}
          data={['left', 'center', 'right', 'outer']}
          onChange={(v) => setIndicatorPosition(v)}
        />
      </div>
      <div style={rowStyle}>
        <div style={{ width: 150 }}>indicator type:</div>
        <Radio.Group
          keygen
          value={indicatorType}
          data={['circle', 'line', 'number']}
          onChange={(v) => setIndicatorType(v)}
        />
      </div>

      <Carousel
        style={{ width: 600, height: 280 }}
        indicatorPosition={indicatorPosition}
        indicatorType={indicatorType}
      >
        {images.map((src) => (
          <img key={src} src={src} />
        ))}
      </Carousel>
    </div>
  );
};

export default App;

```
### 切换方向
轮播组件提供了三种动画过渡方式，可以切换选项查看效果
```tsx
/**
 * cn - 切换方向
 *    -- 轮播组件提供了三种动画过渡方式，可以切换选项查看效果
 * en - Animation
 *    -- The carousel component provides three animation transition modes, you can switch options to see the effect
 */
import React, { useState } from 'react';
import { Carousel, Radio, TYPE } from 'shineout';

type CarouselProps = TYPE.Carousel.Props;

const images = [
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-02.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-03.png',
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-04.png',
];
const App: React.FC = () => {
  const [animationType, setAnimation] = useState<CarouselProps['animation']>('slide');

  const rowStyle = { display: 'flex', marginBottom: 16, alignItems: 'center' };
  return (
    <div>
      <div style={rowStyle}>
        <div style={{ width: 150 }}>animation type:</div>
        <Radio.Group
          keygen
          value={animationType}
          data={['slide', 'slide-y', 'fade']}
          onChange={(v) => setAnimation(v)}
        />
      </div>

      <Carousel style={{ width: 600, height: 280 }} interval={3000} animation={animationType}>
        {images.map((src) => (
          <img key={src} src={src} />
        ))}
      </Carousel>
    </div>
  );
};

export default App;

```
### 自定义 Indicator
当 indicatorType 为函数时，可以自定义 Indicator
```tsx
/**
 * cn - 自定义 Indicator
 *    -- 当 indicatorType 为函数时，可以自定义 Indicator
 * en - Custom Indicator
 *    -- Indicators can be customized when indicatorType is a function
 */
import React from 'react';
import { Carousel, TYPE } from 'shineout';
import classnames from 'classnames';

require('./style-2-custom-indicator.css');

type CarouselProps = TYPE.Carousel.Props;
type CarouselInterval = CarouselProps['interval'];
type CarouselIndicatorType = CarouselProps['indicatorType'];

const containerStyle = {
  fontSize: 40,
  color: '#fff',
  display: 'flex',
  margin: 'auto',
};
const items = ['S', 'H', 'I', 'N', 'E'];
const duration: CarouselInterval = 5000;

const App: React.FC = () => {
  const indicatorSwitch: CarouselIndicatorType = (current, moveTo) => (
    <div className='indicator'>
      {items.map((item, index) => {
        const isActive = current === index;
        const itemClassname = classnames('indicator-item', isActive && 'active');
        const animationStyle = isActive
          ? { animation: `indicator-rise ${duration / 1000}s linear` }
          : {};
        return (
          <div key={item} onClick={() => moveTo(index)} className={itemClassname}>
            <span>{item}</span>
            <div className='indicator-progress'>
              <div className='fg' style={animationStyle} />
              <div className='bg' />
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <Carousel
      indicatorType={indicatorSwitch}
      style={{ width: 600, height: 280 }}
      interval={duration}
    >
      {items.map((item) => (
        <div key={item} style={{ background: '#2e97f1', display: 'flex' }}>
          <div style={containerStyle}>{item}</div>
        </div>
      ))}
    </Carousel>
  );
};

export default App;

/* style-2-custom-indicator.css
@keyframes indicator-rise {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
div.indicator {
  text-align: center;
  user-select: none;
  float: left;
}
div.indicator-item {
  margin-right: 10px;
  float: left;
  width: 36px;
  height: 30px;
  font-size: 20px;
  color: #ffffff50;
  cursor: pointer;
}
div.indicator-item.active {
  color: #fff;
}
div.indicator .indicator-progress {
  position: relative;
}
div.indicator .indicator-progress > div {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  border-radius: 1000px;
}
div.indicator .indicator-progress .bg {
  width: 100%;
  background: #ffffff50;
}
div.indicator .indicator-progress .fg {
  width: 0;
  background: #ffffff;
}
*/

```
## Guide



# Cascader
对于相关联的数据集，可采用多级分类的级联选择方式
## API
### Cascader
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|size|\"small\" / \"large\" / \"default\"|\"default\"|不同尺寸|
|status|\"error\" ||组件状态|
|innerTitle|ReactNode||内嵌标题|
|filterSameChange|boolean |false|当两次选择的值相同时不触发 onChange|
|absolute|boolean / (() => HTMLElement / null) |false|为 true 时，选项弹出层在 DOM 中独立 render; 为函数时，返回值作为弹出层容器|
|zIndex|number |1000|选项列表 z-index 值, 需要配合 absolute|
|multiple|boolean |false|开启多选|
|mode|0 / 1 / 2 / 3 / 4 ||选中值模式，未设置值为单选 0: 只返回完全选中的节点，包含父节点 1: 返回全部选中的节点和半选中的父节点 2: 只返回选中的子节点 3: 如果父节点选中，只返回父节点 4: 所选即所得|
|width|string / number ||输入框宽度|
|open|boolean ||控制浮层显隐|
|value|Value ||选中的 key （受控)|
|defaultValue|Value ||默认选中的 key|
|data|any[]||数据，子节点为children，如果 children 值为 null 或 长度为 0 时，视为叶子节点|
|childrenKey|ObjectKey<DataItem> |\"children\"|指定子数据的属性名|
|final|boolean ||单选只支持选末级节点|
|filterDelay|number |\"children\"|用户输入触发 fitler 事件的延时，单位为毫秒。|
|renderOptionList|((list: ReactElement, info: { loading: boolean; }) => ReactElement) ||自定义渲染下拉列表|
|renderUnmatched|((data: any) => ReactNode) ||渲染未匹配值的方式|
|height|number |300|下拉列表高度|
|unmatch|boolean |true|是否展示data中不存在的值|
|clearable|boolean |true|是否显示清除数据图标|
|wideMatch|boolean |false|开启 wideMatch 后，将筛选出所有可能的匹配项目|
|showArrow|boolean |true|是否显示下拉箭头，仅针对单选情况|
|finalDismiss|boolean |false|选择末级节点后是否关闭选项列表|
|singleRemove|boolean ||支持单个节点删除|
|compressedBound|number ||开启多选后，指定允许展示标签数量，超过后将折叠|
|loading|boolean / ReactNode||下拉列表加载状态|
|compressed|boolean / \"no-repeat\" |false|将选中值合并。为\"no-repeat\"时弹出框中不重复展示值|
|onCollapse|((collapse: boolean) => void) ||下拉列表展开/收起回调|
|loader|((key: string / number, data: DataItem) => void) ||设置 loader 属性后，未定义 children 的节点视为动态加载节点，点击展开触发 loader 事件，children 为 null 或者长度为 0 视为叶子节点|
|disabled|boolean / ((data: DataItem) => boolean) |false|当 disabled 为 true 时，禁用整个选择框。如果 disabled 为函数，根据函数反回结果禁用选项|
|expandTrigger|\"click\" / \"hover\" / \"hover-only\" |\"click\"|节点展开触发方式|
|onChange|((value: Value, selected?: DataItem ) => void) ||设置 onChange 属性时，显示 选择框。参数为当前选中值，和 mode 属性相关|
|onFilter|((text: string) => void / ((data: DataItem) => boolean) ) ||onFilter 不为空时，可以输入过滤数据;onFilter 如果返回一个函数，使用这个函数做前端过滤;如果不返回，可以自行做后端过滤;单选状态下支持|
|keygen|ObjectKey<DataItem> / ((data: DataItem, parentKey?: string / number ) => string / number)|index|生成 key 的辅助方法, 为函数时，使用此函数返回值, 为 string 时，使用这个 string 对应的数据值。如 \"id\"，相当于 (d) => d.id|
|renderItem|ObjectKey<DataItem> / ((data: DataItem, active?: boolean , id?: string / number ) => ReactNode)|d => d|当 renderItem 为 string 时，返回 DataItem\\[string]。 若为函数时，则返回函数结果|
|renderResult|ObjectKey<DataItem> / ((data: DataItem, row: DataItem[]) => ReactNode) |renderItem|选中后在结果中显示的内容，默认和 renderItem 相同|
|onBlur|((e?: KeyboardEvent<HTMLDivElement> ) => void) ||失焦事件|
|onFocus|((e?: KeyboardEvent<HTMLDivElement> ) => void) ||聚焦事件|
|placeholder|string ||占位符|
|emptyAfterSelect|boolean |true|选中后是否清空输入框内容|
|border|boolean |true|是否展示边框|
|underline|boolean ||是否只展示下边框|
|maxLength|number ||Select 输入框输入字符串最大长度|
|resultClassName|string / ((value: DataItem) => string) ||选中结果内容容器的className|
|compressedClassName|string ||多选合并展示弹出框的类名|
|focusSelected|boolean |true|onFilter 在多选情况下点击选项后是否选中过滤文本|
|hideTag|boolean |false|隐藏标签样式，默认情况下展示结果以标签模式分割，隐藏标签样式后可通过自定义 renderResult 渲染分割结果|
|getComponentRef|((comp: CascaderRef) => void) / { current: CascaderRef ; } ||绑定组件的引用, 可以调用某些组件的方法|
|popover|PopoverProps[\"position\"]||校验信息弹出位置|
|popoverProps|PopoverProps ||校验或者tip弹框接受的属性|
|name|Name ||Form 内存取数据的 key|
|beforeChange|((value: T) => void / T ) ||值改变前的回调，当返回值不为空时将作为组件的新值|
|reserveAble|boolean ||设置为 true 组件卸载后表单不自动删除数据|
|rules|RuleItem[]||校验规则 详见 [Rule](/components/rule)|
|onError|((error?: Error ) => void) ||rules 校验回调|
|bind|string[] ||当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用|
### CascaderRef
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|close|(e?: MouseEvent ) => void||关闭下拉框|
## Example
### 基本用法
基础级联选择器的用法
```tsx
/**
 * cn - 基本用法
 *    -- 基础级联选择器的用法
 * en - Basic
 *    -- Basic usage of cascader
 */
import React from 'react';
import { Cascader } from 'shineout';

interface DataItem {
  value: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
        ],
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
        ],
      },
    ],
  },
];

export default () => {
  return (
    <div>
      <Cascader
        width={300}
        clearable
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={(n) => `${n?.value}`}
      />
    </div>
  );
};

```
### 
通过<span>renderResult</span>支持自定义渲染结果
```tsx
/**
 * cn -
 *    -- 通过`renderResult`支持自定义渲染结果
 * en -
 *    -- Support custom rendering results through `renderResult`
 */
import React from 'react';
import { Cascader, TYPE } from 'shineout';

type CascaderProps = TYPE.Cascader.Props<DataItem, string[]>;

interface DataItem {
  value: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
        ],
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
        ],
      },
    ],
  },
];

export default () => {
  const renderResult: CascaderProps['renderResult'] = (node) => {
    return node.value.toLocaleUpperCase();
  };

  return (
    <div>
      <Cascader
        width={300}
        clearable
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderResult={renderResult}
        renderItem={(n) => `${n?.value}`}
      />
    </div>
  );
};

```
### 
通过<span>hideTag</span>取消默认的标签分割样式，配合<span>renderResult</span>自定义渲染实现丰富的展示效果
```tsx
/**
 * cn -
 *    -- 通过`hideTag`取消默认的标签分割样式，配合`renderResult`自定义渲染实现丰富的展示效果
 * en -
 *    -- Cancel the default tag split style through `hideTag`, and customize the rendering to achieve a rich display effect
 */
import React from 'react';
import { Cascader, TYPE } from 'shineout';

type CascaderProps = TYPE.Cascader.Props<DataItem, string[]>;

interface DataItem {
  value: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
        ],
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
        ],
      },
    ],
  },
];

export default () => {
  const renderResult: CascaderProps['renderResult'] = (node) => {
    return node.value;
  };

  return (
    <div>
      <Cascader
        width={300}
        hideTag
        clearable
        placeholder='Please select city'
        data={data}
        keygen='value'
        onChange={v=>console.log(v)}
        renderResult={renderResult}
        renderItem={(n) => `${n?.value}`}
      />
    </div>
  );
};

```
### 多选
开启 <span>multiple</span> 属性或者设置 <span>mode</span> 属性可以选择多个值
模式为 0 时，返回完全选中的节点，包含父节点
模式为 1 时，返回选中、半选中的节点
模式为 2 时，只返回叶子节点
模式为 3 时，只返回完全选中的父节点
模式为 4 时，所选即所得，没有上下级关系
```tsx
/**
 * cn - 多选
 *    -- 开启 `multiple` 属性或者设置 `mode` 属性可以选择多个值
 *    -- 模式为 0 时，返回完全选中的节点，包含父节点
 *    -- 模式为 1 时，返回选中、半选中的节点
 *    -- 模式为 2 时，只返回叶子节点
 *    -- 模式为 3 时，只返回完全选中的父节点
 *    -- 模式为 4 时，所选即所得，没有上下级关系
 * en - Basic
 *    --
 */
import React, { useState } from 'react';
import { Cascader, Radio, TYPE } from 'shineout';

type CascaderProps = TYPE.Cascader.Props<DataItem, string[]>;

interface DataItem {
  value: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
          {
            value: 'yuhuatai',
          },
        ],
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
        ],
      },
    ],
  },
];

const radio = [
  {
    mode: 'full',
    value: 0,
  },
  {
    mode: 'half',
    value: 1,
  },
  {
    mode: 'child only',
    value: 2,
  },
  {
    mode: 'shallow',
    value: 3,
  },
  {
    mode: 'freedom',
    value: 4,
  },
];

export default () => {
  const [value, setValue] = useState<CascaderProps['value']>([]);
  const [mode, setMode] = useState<0 | 1 | 2 | 3 | 4>(0);

  const handleModeChange = (v: any) => {
    setMode(v.value);
    setValue([]);
  };

  const handleChange: CascaderProps['onChange'] = (v) => {
    setValue(v);
  };

  return (
    <div>
      <Radio.Group
        size='small'
        keygen='value'
        prediction={(item, v) => item === v.value}
        value={mode}
        onChange={handleModeChange}
        renderItem={(item) => `模式 ${item.value}`}
        data={radio}
        style={{ marginBottom: 24 }}
      />

      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <Cascader
            clearable
            multiple
            singleRemove
            mode={mode}
            width={300}
            placeholder='Please select city'
            data={data}
            keygen='value'
            value={value}
            onChange={handleChange}
            renderItem={(n) => `${n?.value}`}
          />
        </div>
        <pre
          style={{
            flex: 1,
            margin: 10,
            background: '#1d1d1d',
            color: '#94d5fc',
            borderRadius: 4,
            padding: 10,
          }}
        >
          <div style={{ marginBottom: 10 }}>
            <code style={{ color: '#5D8E4E' }}>
              <span>/</span>
              <span>/</span> DataItem[]
            </code>
          </div>
          {value && value.length > 0 && <code>{JSON.stringify(value, null, 2)}</code>}
          {!value || (value.length === 0 && <code style={{ color: '#757575' }}>no data</code>)}
        </pre>
      </div>
    </div>
  );
};

```
### 
设置<span>compressed</span>属性，当选项超长的时候会合并选项
```tsx
/**
 * cn -
 *    -- 设置`compressed`属性，当选项超长的时候会合并选项
 * en -
 *    -- Set the `compressed` property, when the option is too long, the option will be merged
 */
import React from 'react';
import { Cascader } from 'shineout';

interface DataItem {
  value: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
          {
            value: 'yuhuatai',
          },
        ],
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
        ],
      },
    ],
  },
];

export default () => {
  return (
    <div>
      <Cascader
        clearable
        multiple
        mode={0}
        compressed
        width={300}
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={(n) => `${n?.value}`}
      />
    </div>
  );
};

```
### 
当<span>compressed</span>属性值为 'no-repeat' 时，合并的选项中不会出现结果框中的重复内容
```tsx
/**
 * cn -
 *    -- 当`compressed`属性值为 'no-repeat' 时，合并的选项中不会出现结果框中的重复内容
 * en -
 *    -- When the value of the `compressed` property is 'no-repeat', the repeated content in the merged options will not appear in the result box
 */
import React from 'react';
import { Cascader } from 'shineout';

interface DataItem {
  value: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
          {
            value: 'yuhuatai',
          },
        ],
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
        ],
      },
    ],
  },
];

export default () => {
  return (
    <div>
      <Cascader
        clearable
        multiple
        mode={0}
        compressed='no-repeat'
        width={300}
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={(n) => `${n?.value}`}
      />
    </div>
  );
};

```
### 移入展开
更改<span>expandTrigger</span>属性可以设置鼠标移入节点时展开下一层级，默认为点击展开
```tsx
/**
 * cn - 移入展开
 *    -- 更改`expandTrigger`属性可以设置鼠标移入节点时展开下一层级，默认为点击展开
 * en - Trigger
 *    -- Set `expandTrigger` property to change the trigger event of expanding next level, default is click
 */
import React from 'react';
import { Cascader } from 'shineout';

interface DataItem {
  value: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
        ],
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
        ],
      },
    ],
  },
];

export default () => {
  return (
    <div>
      <Cascader
        width={300}
        expandTrigger='hover'
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={(n) => `${n?.value}`}
      />
    </div>
  );
};

```
### 点击叶子节点关闭面板
设置<span>finalDismiss</span>属性，点击最后一级节点时关闭面板
```tsx
/**
 * cn - 点击叶子节点关闭面板
 *    -- 设置`finalDismiss`属性，点击最后一级节点时关闭面板
 * en - finalDismiss
 *    -- Set the `finalDismiss` property to close the panel when the last level node is clicked
 */
import React from 'react';
import { Cascader } from 'shineout';

interface DataItem {
  value: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
        ],
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
        ],
      },
    ],
  },
];

export default () => {
  return (
    <div>
      <Cascader
        width={300}
        finalDismiss
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={(n) => `${n?.value}`}
      />
    </div>
  );
};

```
### 禁用/禁用选项
通过设置<span>disabled</span>属性可以禁用组件。disabled为函数时，支持禁用单个选项
```tsx
/**
 * cn - 禁用/禁用选项
 *    -- 通过设置`disabled`属性可以禁用组件。disabled为函数时，支持禁用单个选项
 * en - Disabled
 *    -- Set the `disabled` property to disable the component. When `disabled` is a function, support disabling a single option
 */
import React from 'react';
import { Cascader, TYPE } from 'shineout';

type CascaderProps = TYPE.Cascader.Props<DataItem, string[]>;

interface DataItem {
  value: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
        ],
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
        ],
      },
    ],
  },
];

export default () => {
  const handleDisabled: CascaderProps['disabled'] = (item) => {
    return item.value === 'jiangsu';
  };

  const renderItem: CascaderProps['renderItem'] = (n) => `${n.value}`;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, width: 632 }}>
      <Cascader
        width={300}
        disabled
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={renderItem}
      />
      <Cascader
        clearable
        width={300}
        disabled={handleDisabled}
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={renderItem}
      />
      <Cascader
        width={300}
        disabled
        mode={0}
        onChange={(v) => console.log(v)}
        defaultValue={['jiangsu', 'nanjing']}
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={renderItem}
      />
      <Cascader
        clearable
        mode={0}
        onChange={(v) => console.log(v)}
        width={300}
        disabled={handleDisabled}
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={renderItem}
      />
    </div>
  );
};

```
### 动态加载
配置<span>loader</span>开启动态加载功能，当点击的节点没有子节点时，会调用<span>loader</span>函数
注意，该功能仅支持<span>mode</span>为 3 或 4 模式
```tsx
/**
 * cn - 动态加载
 *    -- 配置`loader`开启动态加载功能，当点击的节点没有子节点时，会调用`loader`函数
 *    -- 注意，该功能仅支持`mode`为 3 或 4 模式
 * en - Loader
 *    -- Set `loader` property to enable dynamic loading. When the node has no children, the `loader` function will be called
 *    -- Note that this feature only supports mode 3 or 4
 */
import React, { useState } from 'react';
import { produce } from 'immer';
import { Cascader, TYPE } from 'shineout';

type CascaderProps = TYPE.Cascader.Props<DataItem, string[]>;

interface DataItem {
  value?: string;
  id?: string;
  children?: DataItem[];
}

const initData = ['0', '1', '2', '3', '4', '5', '6', '7', '8'].map((i) => ({ id: i }));
const createRange = () => Array.from({ length: Math.round(Math.random() * 4) }, (_, i) => i);

export default () => {
  const [_data, setData] = useState<DataItem[]>(initData);
  const [value, setValue] = useState<string[]>([]);

  const loader: CascaderProps['loader'] = (key) => {
    const path = key.toString().split(',');
    setTimeout(() => {
      const producer = produce((draft) => {
        let { data } = draft;
        path.forEach((pid, i) => {
          data = draft.find((d: { id: string }) => d.id === pid);
          if (i < path.length - 1) draft = data.children;
        });
        data.children = [...createRange().map((i) => ({ id: `${data.id}-${i}` }))];
      });
      const nextState = producer(_data);
      setData(nextState);
    }, 500);
  };

  const handleChange: CascaderProps['onChange'] = (v) => setValue(v);
  const renderItem: CascaderProps['renderItem'] = (node) => `node ${node.id}`;
  const keyGenerator: CascaderProps['keygen'] = (node, parentKey) =>
    `${String(parentKey)},${node.id}`.replace(/^,/, '');

  return (
    <div>
      <Cascader
        mode={3}
        width={300}
        placeholder='Please select city'
        data={_data}
        loader={loader}
        value={value}
        onChange={handleChange}
        keygen={keyGenerator}
        renderItem={renderItem}
      />
    </div>
  );
};

```
### 过滤数据（本地）
设置<span>onFilter</span>属性且返回内容为函数时，会根据返回的过滤函数对本地数据进行过滤
```tsx
/**
 * cn - 过滤数据（本地）
 *    -- 设置`onFilter`属性且返回内容为函数时，会根据返回的过滤函数对本地数据进行过滤
 * en - Filter data (local)
 *    -- Set the `onFilter` property and return the content as a function, the local data will be filtered according to the returned filter function
 */
import React from 'react';
import { Cascader, TYPE } from 'shineout';

type CascaderProps = TYPE.Cascader.Props<DataItem, string[]>;

interface DataItem {
  value: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
          {
            value: 'gulou',
          },
        ],
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
        ],
      },
    ],
  },
];

export default () => {
  const handleFilter: CascaderProps['onFilter'] = (text) => (d) => d.value.indexOf(text) >= 0;

  const renderItem: CascaderProps['renderItem'] = (n) => `${n.value}`;

  return (
    <div style={{ display: 'flex', gap: 32 }}>
      <Cascader
        width={300}
        placeholder='Please select city'
        data={data}
        keygen='value'
        onFilter={handleFilter}
        renderItem={renderItem}
      />

      <Cascader
        mode={3}
        width={300}
        placeholder='Please select city'
        data={data}
        keygen='value'
        onFilter={handleFilter}
        renderItem={renderItem}
      />
    </div>
  );
};

```
### 宽泛过滤
打开<span>wideMatch</span>后，将筛选出所有可能的匹配项目
```tsx
/**
 * cn - 宽泛过滤
 *    -- 打开`wideMatch`后，将筛选出所有可能的匹配项目
 * en - Wide match
 *    -- After opening `wideMatch`, all possible matching items will be filtered out
 */
import React from 'react';
import { Cascader, TYPE } from 'shineout';

type CascaderProps = TYPE.Cascader.Props<DataItem, string[]>;

interface DataItem {
  value: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
          {
            value: 'gulou',
          },
        ],
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
        ],
      },
    ],
  },
];

export default () => {
  const handleFilter: CascaderProps['onFilter'] = (text: string) => (d: DataItem) =>
    d.value.indexOf(text) >= 0;

  const renderItem: CascaderProps['renderItem'] = (n) => `${n.value}`;

  return (
    <div style={{ display: 'flex', gap: 32 }}>
      <Cascader
        wideMatch
        width={300}
        placeholder='Please select city'
        data={data}
        keygen='value'
        onFilter={handleFilter}
        renderItem={renderItem}
      />
    </div>
  );
};

```
### 内嵌标题
使用 innerTitle 展示内嵌标题
```tsx
/**
 /**
 * cn - 内嵌标题
 *    -- 使用 innerTitle 展示内嵌标题
 * en - inner title
 *    -- use innerTitle to display the inner title
 */
import React from 'react';
import { Cascader } from 'shineout';

interface DataItem {
  value: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
        ],
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
        ],
      },
    ],
  },
];

export default () => {
  return (
    <div>
      <Cascader
        innerTitle='Inner Title'
        width={300}
        placeholder='Please select city'
        clearable
        data={data}
        keygen='value'
        renderItem={(n) => `${n?.value}`}
      />
    </div>
  );
};

```
### 渲染未匹配值
通过<span>renderUnmatched</span>属性可以渲染未匹配的值
```tsx
/**
 * cn - 渲染未匹配值
 *    -- 通过`renderUnmatched`属性可以渲染未匹配的值
 * en - renderUnmatched
 *    -- The unmatched value can be rendered through the `renderUnmatched` property
 */
import React from 'react';
import { Cascader, TYPE } from 'shineout';

type CascaderProps = TYPE.Cascader.Props<DataItem, string[]>;

interface DataItem {
  value: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
        ],
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
        ],
      },
    ],
  },
];

export default () => {
  const renderUnmatched: CascaderProps['renderUnmatched'] = (text) => {
    return `Unmatched: ${text}`;
  };

  const renderItem: CascaderProps['renderItem'] = (n) => `${n.value}`;

  return (
    <div>
      <Cascader
        width={300}
        unmatch
        defaultValue={['shanghai']}
        placeholder='Please select city'
        data={data}
        renderUnmatched={renderUnmatched}
        keygen='value'
        renderItem={renderItem}
      />
    </div>
  );
};

```
### tip
test tip
```tsx
/**
 * cn - tip
 *    -- test tip
 * en - tip
 *    -- test tip
 */
import React from 'react';
import { Cascader } from 'shineout';

interface DataItem {
  value: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
        ],
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
        ],
      },
    ],
  },
];

export default () => {
  return (
    <div>
      <Cascader
        tip='test tip'
        width={300}
        clearable
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={(n) => `${n?.value}`}
      />
      <Cascader
        status='error'
        width={300}
        clearable
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={(n) => `${n?.value}`}
      />
      <Cascader
        tip='test tip'
        error="error"
        popover
        width={300}
        clearable
        placeholder='Please select city'
        data={data}
        keygen='value'
        renderItem={(n) => `${n?.value}`}
      />
    </div>
  );
};

```
## Guide
### 何时使用
常见的使用场景包含：1、层级结构清晰一致的数据信息，使用级联选择可以支持用户逐级查看；2、体量较大的数据集
### 推荐/慎用示例
1、级联选择层级建议不超过 4 级，如果数据结构确实分层加多，建议使用其他更适合的交互形式或数据结构呈现方式
2、尽量避免层级过多，如遇特殊情况可以在容器宽度内让文字做换行处理，而不是出现横向滚动条


# Checkbox
在一组数据中，用户可通过复选框选择一个或多个数据
## API
### Checkbox
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|onChange|((value: T , checked: boolean, raw: T) => void) ||值改变回调函数|
|checked|boolean / \"indeterminate\" / ((d: T) => boolean / \"indeterminate\") ||checked 传入时为受控组件|
|defaultChecked|boolean / \"indeterminate\" ||默认选中状态|
|onClick|((e: MouseEvent<HTMLInputElement, MouseEvent>) => void) ||勾选框点击回调|
|disabled|boolean |false|是否禁用|
|inputRef|Ref<HTMLInputElement> ||获取input dom|
|style|CSSProperties ||自定义样式|
|className|string ||自定义类名|
|size|\"small\" / \"large\" / \"default\"|\"default\"|不同尺寸|
|children|ReactNode||内容|
|htmlValue|any|true|选中后返回的值|
|value|any||如果 checked 未设置，checked 状态为 value === htmlValue|
|defaultValue|Value||默认值和 value 类型相同|
|name|Name ||Form 内存取数据的 key|
|beforeChange|((value: T) => void / T ) ||值改变前的回调，当返回值不为空时将作为组件的新值|
|reserveAble|boolean ||设置为 true 组件卸载后表单不自动删除数据|
|rules|RuleItem[]||校验规则 详见 [Rule](/components/rule)|
|onError|((error?: Error ) => void) ||rules 校验回调|
|bind|string[] ||当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用|
### Checkbox.Group
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|size|\"small\" / \"large\" / \"default\"|\"default\"|不同尺寸|
|style|CSSProperties ||自定义样式|
|children|ReactNode||可以传入一组Checkbox|
|renderItem|ObjectKey<DataItem> / ((data: DataItem, index?: number ) => ReactNode) |d => d|为 string 时，返回 d\\[string]。 为 function 时，返回函数结果|
|prediction|((value: Value[number], data: DataItem) => boolean) |(val, d) => val===format(d)|默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配|
|format|ObjectKey<DataItem> / ((data: DataItem) => Value[number]) |d => d|格式化 value, 默认值，返回原始数据。 为 string 时，会作为 key 从原始数据中获取值，相当于 (d) => d[format]; 为函数时，以函数返回结果作为 value|
|separator|string ||多选情况下设置后，value 会处理为 separator 分隔的字符串|
|keygen|/ ObjectKey<DataItem>  / ((data: DataItem, index?: number) => string / number)  / true|index|生成每一项key的辅助方法 为 true 时，以数据项本身作为key，相当于 (d => d) 为函数时，使用此函数返回值 为string时，使用这个string对应的数据值。如 \"id\"，相当于 (d => d.id)|
|block|boolean ||默认为水平布局，设置 block 属性可以改为垂直布局|
|data|any[]||数据项|
|onChange|((value: Value) => void) ||值改变回调函数|
|value|any||在 Form中，value 会被表单接管，value 无效|
|defaultValue|Value ||默认值  和 value 类型相同|
|disabled|boolean / ((data: DataItem) => boolean) |false|如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项|
|name|Name ||Form 内存取数据的 key|
|beforeChange|((value: T) => void / T ) ||值改变前的回调，当返回值不为空时将作为组件的新值|
|reserveAble|boolean ||设置为 true 组件卸载后表单不自动删除数据|
|rules|RuleItem[]||校验规则 详见 [Rule](/components/rule)|
|onError|((error?: Error ) => void) ||rules 校验回调|
|bind|string[] ||当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用|
## Example
### 基本用法
基本的 Checkbox
```tsx
/**
 * cn - 基本用法
 *    -- 基本的 Checkbox
 * en - Base
 *    -- Basic Checkbox
 */
import React from 'react';
import { Checkbox } from 'shineout';

const App: React.FC = () => <Checkbox>Checkbox</Checkbox>;

export default App;

```
### 尺寸
设置 <span>size</span> 属性改变组件的尺寸大小, 内置三种尺寸：small、default、large
```tsx
/**
 * cn - 尺寸
 *    -- 设置 `size` 属性改变组件的尺寸大小, 内置三种尺寸：small、default、large
 * en - Base
 *    -- Set the size property to change the size of the component. There are three built-in sizes: small, default, and large
 */
import React from 'react';
import { Checkbox } from 'shineout';

const App: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Checkbox size={'small'}>Checkbox</Checkbox>
    <Checkbox>Checkbox</Checkbox>
    <Checkbox size={'large'}>Checkbox</Checkbox>
  </div>
);

export default App;

```
### 状态
checked 有三个值，选中(true)、未选中(false)、半选中('indeterminate')，checked 设置时为受控组件（此示例没有处理 onChange 事件）
```tsx
/**
 * cn - 状态
 *    -- checked 有三个值，选中(true)、未选中(false)、半选中('indeterminate')，checked 设置时为受控组件（此示例没有处理 onChange 事件）
 * en - Checked
 *    -- The checked has three values: true(checked), false(not checked), 'indeterminate'(half-checked)
 */
import React from 'react';
import { Checkbox } from 'shineout';

const App: React.FC = () => (
  <div>
    <div style={{ marginBottom: 12, lineHeight: 0 }}>
      <Checkbox checked={false}>not checked</Checkbox>
      <Checkbox checked>checked</Checkbox>
      <Checkbox checked='indeterminate'>indeterminate</Checkbox>
    </div>

    <div style={{ lineHeight: 0 }}>
      <Checkbox checked={false} disabled>
        not checked
      </Checkbox>
      <Checkbox checked disabled>
        checked
      </Checkbox>
      <Checkbox checked='indeterminate' disabled>
        indeterminate
      </Checkbox>
    </div>
  </div>
);

export default App;

```
### 全选/半选
通过设置 checked = 'indeterminate' 属性，可以实现半选效果
```tsx
/**
 * cn - 全选/半选
 *    -- 通过设置 checked = 'indeterminate' 属性，可以实现半选效果
 * en - Check all
 *    -- Set checked = 'indeterminate' to achieve half-check effect
 */
import React, { useState } from 'react';
import { Checkbox } from 'shineout';

const data = ['Option1', 'Option2', 'Option3'];
const getChecked = (value: string[], num: number) => {
  if (value.length === num) return true;
  if (value.length === 0) return false;
  return 'indeterminate';
};

const App: React.FC = () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <div>
      <Checkbox
        checked={getChecked(value, data.length)}
        onChange={(v) => {
          if (v) {
            setValue(data);
          } else {
            setValue([]);
          }
        }}
      >
        {getChecked(value, data.length) === true ? 'UnCheckAll' : 'CheckAll'}
      </Checkbox>
      <Checkbox.Group
        style={{ marginTop: 12 }}
        data={data}
        keygen
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export default App;

```
### 选中值
未设置htmlValue的状态下，checkbox选中时返回true，如果设置 htmlValue，返回 htmlValue。未选中状态都是返回 undefined
```tsx
/**
 * cn - 选中值
 *    -- 未设置htmlValue的状态下，checkbox选中时返回true，如果设置 htmlValue，返回 htmlValue。未选中状态都是返回 undefined
 * en - Value
 *    -- When the htmlValue is set, the checkbox return the htmlValue (checked) and undefined (not checked)
 *    -- When the htmlValue is not set, the checkbox selected return true (checked) and undefined (not checked)
 */
import React from 'react';
import { Checkbox } from 'shineout';

const App: React.FC = () => (
  <Checkbox htmlValue='ok' onChange={console.log}>
    {'value is "ok"'}
  </Checkbox>
);

export default App;

```
### 一组复选框
一组复选框可以放在 Checkbox.Group 中
```tsx
/**
 * cn - 一组复选框
 *    -- 一组复选框可以放在 Checkbox.Group 中
 * en - Group
 *    -- A series of checkboxes group by Checkbox.Group
 */
import React from 'react';
import { Checkbox } from 'shineout';

const data = [
  { id: 1, color: 'red' },
  { id: 2, color: 'cyan' },
  { id: 3, color: 'blue' },
  { id: 4, color: 'green' },
  { id: 5, color: 'yellow' },
  { id: 6, color: 'orange' },
  { id: 7, color: 'violet' },
];

const App: React.FC = () => (
  <Checkbox.Group keygen='id' defaultValue={[3, 5]}>
    {data.map((d) => (
      <Checkbox key={d.id} htmlValue={d.id}>
        {d.color}
      </Checkbox>
    ))}
  </Checkbox.Group>
);

export default App;

```
### 
可以直接通过数据来渲染一组 Checkbox
```tsx
/**
 * cn -
 *    -- 可以直接通过数据来渲染一组 Checkbox
 * en -
 *    -- Render a group of checkboxes from data
 */
import React from 'react';
import { Checkbox, TYPE } from 'shineout';

type CheckboxGroupProps = TYPE.Checkbox.GroupProps<string, string[]>;
type CheckboxGroupRenderItem = CheckboxGroupProps['renderItem'];

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

const renderItem: CheckboxGroupRenderItem = (color) => {
  const style = { borderBottom: `solid 1px ${color}` };
  return <span style={style}>{color}</span>;
};

const App: React.FC = () => (
  <Checkbox.Group
    keygen={(c) => c}
    data={data}
    defaultValue={['blue', 'cyan']}
    renderItem={renderItem}
  />
);

export default App;

```
### 布局
默认是水平布局，设置 block 属性可以改为垂直布局
```tsx
/**
 * cn - 布局
 *    -- 默认是水平布局，设置 block 属性可以改为垂直布局
 * en - Layout
 *    -- The default layout is horizontal, and the block property can be set to vertical
 */
import React from 'react';
import { Checkbox } from 'shineout';

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

const App: React.FC = () => (
  <>
    <Checkbox.Group keygen={(c) => c} data={data} defaultValue={['blue', 'cyan']} />
    <Checkbox.Group
      keygen={(c) => c}
      data={data}
      defaultValue={['blue', 'cyan']}
      block
      style={{ marginTop: 24, display: 'inline-block' }}
    />
  </>
);

export default App;

```
### 复选框组禁用
设置 Checkbox.Group 的 disabled 为 true，禁用全部选项
```tsx
/**
 * cn - 复选框组禁用
 *    -- 设置 Checkbox.Group 的 disabled 为 true，禁用全部选项
 * en - Group disabled
 *    -- Set the disabled property of Checkbox.Group to true to disable all options
 */
import React from 'react';
import { Checkbox } from 'shineout';

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

const App: React.FC = () => (
  <>
    <Checkbox.Group disabled keygen={(c) => c} data={data} defaultValue={['blue', 'cyan']} />
  </>
);

export default App;

```
### 
disabled 为函数时，根据函数结果实现有条件禁用
```tsx
/**
 * cn -
 *    -- disabled 为函数时，根据函数结果实现有条件禁用
 * en -
 *    -- When the disabled property is a function, the conditional disable is implemented according to the function result
 */
import React from 'react';
import { Checkbox } from 'shineout';

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

const App: React.FC = () => (
  <>
    <Checkbox.Group
      disabled={(d) => d === 'yellow'}
      keygen={(c) => c}
      data={data}
      defaultValue={['blue', 'cyan']}
    />
  </>
);

export default App;

```
### 点击回调
点击选择框后的回调
```tsx
/**
 * cn - 点击回调
 *    -- 点击选择框后的回调
 * en - OnClick
 *    -- Checkbox click callback
 */
import React, { useState } from 'react';
import { Checkbox } from 'shineout';

const App: React.FC = () => {
  const [total, setTotal] = useState(0);

  return (
    <div>
      <Checkbox onClick={() => setTotal(total + 1)}>
        Click Me
        {` ${total} Times!`}
      </Checkbox>
    </div>
  );
};

export default App;

```
### separator
通过 separator 属性设置分隔符
```tsx
/**
 * cn - separator
 *    -- 通过 separator 属性设置分隔符
 * en - separator
 *    -- Set the separator by separator property
 */
import React from 'react';
import { Checkbox } from 'shineout';

const data = [
  { id: '1', color: 'red' },
  { id: '2', color: 'cyan' },
  { id: '3', color: 'blue' },
  { id: '4', color: 'green' },
  { id: '5', color: 'yellow' },
  { id: '6', color: 'orange' },
  { id: '7', color: 'violet' },
];

const App: React.FC = () => (
  <Checkbox.Group separator={','} keygen='id' defaultValue={'3,5'}>
    {data.map((d) => (
      <Checkbox key={d.id} htmlValue={d.id}>
        {d.color}
      </Checkbox>
    ))}
  </Checkbox.Group>
);

export default App;

```
### 带输入（deprecated）
设置 inputable 属性可以显示输入框，返回值为输入框内容
```tsx
/**
 * cn - 带输入（deprecated）
 *    -- 设置 inputable 属性可以显示输入框，返回值为输入框内容
 * en - Inputable
 *    -- Set the inputable property to true can show the input box and the return value is the value of the input box.
 */
import React from 'react';
import { Checkbox } from 'shineout';

const App: React.FC = () => (
  <Checkbox inputable onChange={console.log}>
    more...
  </Checkbox>
);

export default App;

```
## Guide
### 何时使用
需要从一个数据集中选择多个选项时\n 需要对两种状态进行切换时（选中或未选中，打开或关闭），可单独使用多选框\n 需要一个标记控件，通过触发操作按钮后才生效时
### 常见用法
多选框可以在表单中单独使用
### 组件搭配使用
在列表中一般会用于全选、半全选
### 推荐/慎用示例
当选项较多且字段长度不一时，建议将多选框对齐


# Collapse
Collapse 对内容进行分组和归类，将次要信息隐藏
## API
### Collapse.Item
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|showExpandIcon|boolean |true|是否显示展开图标|
|expandIcon|ReactNode||展开图标|
|extra|ReactNode||扩展内容|
|title|ReactNode||折叠面板头部内容|
|contentStyle|CSSProperties ||折叠面板内容区域样式|
|children|ReactNode||折叠面板内的内容|
|keygen|string||面板的key，唯一标识|
|disabled|boolean |false|是否禁用|
### Collapse
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|expandIcon|ReactNode||展开图标|
|triggerRegion|\"icon\" / \"header\" / \"disabled\" ||触发展开折叠的区域|
|active|string / string[]||当前展开的面板,受控|
|border|boolean |true|是否显示边框|
|expandIconPosition|\"left\" / \"right\" |\"left\"|折叠图标位置|
|extraPosition|\"left\" / \"right\" |\"right\"|扩展内容位置|
|children|ReactNode||折叠面板内的内容|
|defaultActive|string / string[] ||默认展开的面板|
|accordion|boolean |false|是否开启手风琴模式|
|onChange|((active: string, actives: string[], e: MouseEvent<HTMLDivElement, MouseEvent>) => void) ||展开面板改变时触发回调|
## Example
### 基本用法
基础折叠面板，可自定义面板内容
```tsx
/**
 * cn - 基本用法
 *    -- 基础折叠面板，可自定义面板内容
 * en - Basic
 *    -- Basic collapse, you can customize the content of the panel
 */
import React from 'react';
import { Collapse } from 'shineout';

export default () => {
  return (
    <div>
      <Collapse defaultActive={['1', '3']} style={{ maxWidth: 1180 }}>
        <Collapse.Item title='This is panel header 1' keygen='0'>
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>
        <Collapse.Item title='This is panel header 2' keygen='1'>
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>

        <Collapse.Item title='This is panel header 3' keygen='2' disabled>
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>

        <Collapse.Item title='This is panel header 4' keygen='3' disabled>
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>
      </Collapse>
    </div>
  );
};

```
### 手风琴模式
手风琴模式，每次只能展开一个面板
```tsx
/**
 * cn - 手风琴模式
 *    -- 手风琴模式，每次只能展开一个面板
 * en - accordion
 *    -- Accordion mode, only one panel can be expanded at a time
 */
import React from 'react';
import { Collapse } from 'shineout';

export default () => {
  return (
    <div>
      <Collapse accordion style={{ maxWidth: 1180 }}>
        <Collapse.Item title='This is panel header 1' keygen='0'>
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>
        <Collapse.Item title='This is panel header 2' keygen='1'>
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>

        <Collapse.Item title='This is panel header 3' keygen='2'>
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>

        <Collapse.Item title='This is panel header 4' keygen='3'>
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>
      </Collapse>
    </div>
  );
};

```
### 嵌套面板
嵌套面板
```tsx
/**
 * cn - 嵌套面板
 *    -- 嵌套面板
 * en - Nested panels
 *    -- Nested panels
 */
import React from 'react';
import { Collapse } from 'shineout';

export default () => {
  return (
    <div>
      <Collapse style={{ maxWidth: 1180 }} defaultActive={['0']}>
        <Collapse.Item title='This is panel header 1' keygen='0'>
          <Collapse defaultActive={['1']}>
            <Collapse.Item title='This is panel nest header 2' keygen='1'>
              Joy in living comes from having fine emotions, trusting them, giving them the freedom
              of a bird in the open. Joy in living can never be assumed as a pose, or put on from
              the outside as a mask. People who have this joy do not need to talk about it; they
              radiate it. They just live out their joy and let it splash its sunlight and glow into
              other lives as naturally as bird sings.
            </Collapse.Item>

            <Collapse.Item title='This is panel nest header 3' keygen='2'>
              Joy in living comes from having fine emotions, trusting them, giving them the freedom
              of a bird in the open. Joy in living can never be assumed as a pose, or put on from
              the outside as a mask. People who have this joy do not need to talk about it; they
              radiate it. They just live out their joy and let it splash its sunlight and glow into
              other lives as naturally as bird sings.
            </Collapse.Item>
          </Collapse>
        </Collapse.Item>
        <Collapse.Item title='This is panel header 2' keygen='3'>
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>

        <Collapse.Item title='This is panel header 3' keygen='4'>
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>

        <Collapse.Item title='This is panel header 4' keygen='5'>
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>
      </Collapse>
    </div>
  );
};

```
### 简洁面板
无边框的简洁模式
```tsx
/**
 * cn - 简洁面板
 *    -- 无边框的简洁模式
 * en - Simple panel
 *    -- Simple mode without border
 */
import React from 'react';
import { Collapse } from 'shineout';

export default () => {
  return (
    <div>
      <Collapse defaultActive={['0']} style={{ maxWidth: 1180 }} border={false}>
        <Collapse.Item title='This is panel header 1' keygen='0'>
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>
        <Collapse.Item title='This is panel header 2' keygen='1'>
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>
        <Collapse.Item title='This is panel header 3' keygen='2'>
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>
      </Collapse>
    </div>
  );
};

```
### 自定义面板样式
可自定义标题背景色、内容背景色、折叠图标等
```tsx
/**
 * cn - 自定义面板样式
 *    -- 可自定义标题背景色、内容背景色、折叠图标等
 * en - Customize
 *    -- You can customize the title background color, content background color, collapse icon, etc
 */
import React from 'react';
import { Collapse } from 'shineout';

export default () => {
  const arrowIcon = (
    <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10.6957 5.75207L16.2694 11.3386C16.6589 11.7289 16.6589 12.3609 16.2694 12.7512L10.7576 18.2751C10.3675 18.6661 9.73435 18.6668 9.3434 18.2767C9.15675 18.0904 9.05121 17.838 9.04974 17.5744L8.98776 6.46395C8.98467 5.91168 9.42988 5.46147 9.98216 5.45839C10.2497 5.4569 10.5067 5.56268 10.6957 5.75207Z'
        fill='#666C7C'
      />
    </svg>
  );

  return (
    <div>
      <Collapse defaultActive={['1']} style={{ maxWidth: 1180 }} expandIcon={arrowIcon}>
        <Collapse.Item
          title='This is panel header 1'
          keygen='0'
          style={{ background: '#F4F5F8' }}
          contentStyle={{ background: '#FFFFFF' }}
        >
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>
        <Collapse.Item
          title='This is panel header 2'
          keygen='1'
          style={{ background: '#F4F5F8' }}
          contentStyle={{ background: '#FFFFFF' }}
        >
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>
        <Collapse.Item
          title='This is panel header 3'
          keygen='2'
          disabled
          style={{ background: '#F4F5F8' }}
          contentStyle={{ background: '#FFFFFF' }}
        >
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>
      </Collapse>
    </div>
  );
};

```
### 额外操作
自定义渲染每个面板的扩容内容
```tsx
/**
 * cn - 额外操作
 *    -- 自定义渲染每个面板的扩容内容
 * en - Extra
 *    -- Customize the extra content of each panel
 */
import React from 'react';
import { Collapse, Checkbox, Button } from 'shineout';

export default () => {
  const moreIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12ZM14 19C14 20.1046 13.1046 21 12 21C10.8954 21 10 20.1046 10 19C10 17.8954 10.8954 17 12 17C13.1046 17 14 17.8954 14 19Z" fill="#666C7C"/>
    </svg>
  )
  return (
    <div>
      <Collapse defaultActive={['1']} style={{ maxWidth: 1180 }}>
        <Collapse.Item title='This is panel header 1' keygen='0' extra={moreIcon}>
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>
        <Collapse.Item
          title='This is panel header 2'
          keygen='1'
          extra={<Checkbox style={{ margin: 0 }}>checkbox</Checkbox>}
        >
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>
        <Collapse.Item title='This is panel header 3' keygen='2' extra={<Button type='primary'>Button</Button>}>
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>
      </Collapse>
    </div>
  );
};

```
### 展开图标位置
可设置是否显示展开图标以及图标展示的位置
```tsx
/**
 * cn - 展开图标位置
 *    -- 可设置是否显示展开图标以及图标展示的位置
 * en - Icon position
 *    -- You can set whether to display the expand icon and the position of the icon
 */
import React from 'react';
import { Collapse, Radio } from 'shineout';

export default () => {
  type PositionType = 'left' | 'right';
  type RegionType = 'header' | 'icon' | 'disabled';

  const iconPosition: (PositionType | 'none')[] = ['left', 'right', 'none'];
  const regions: RegionType[] = ['header', 'icon', 'disabled'];
  const [position, setPosition] = React.useState('left');
  const [region, setRegion] = React.useState<RegionType>('header');

  const rowStyle = { display: 'flex', marginBottom: 16, alignItems: 'center' };

  return (
    <div>
      <div style={rowStyle}>
        <div style={{ width: 80 }}>Icon:</div>
        <Radio.Group
          keygen
          data={iconPosition}
          value={position}
          onChange={(d) => setPosition(d)}
        />
      </div>
      <div style={rowStyle}>
        <div style={{ width: 80 }}>Hotspot:</div>
        <Radio.Group
          keygen
          data={regions}
          value={region}
          onChange={(d) => setRegion(d)}
        />
      </div>
      
      <Collapse
        style={{ maxWidth: 1180 }}
        triggerRegion={region}
        expandIconPosition={(position !== 'none' && position) as PositionType}
      >
        <Collapse.Item
          title='This is panel header 1'
          keygen='0'
          showExpandIcon={position !== 'none'}
        >
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>
        <Collapse.Item
          title='This is panel header 2'
          keygen='1'
          showExpandIcon={position !== 'none'}
        >
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>
        <Collapse.Item
          title='This is panel header 3'
          keygen='2'
          showExpandIcon={position !== 'none'}
        >
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>
      </Collapse>
    </div>
  );
};

```
## Guide
### 何时使用
对内容进行分组和归类，保持页面整洁\n 对次要 / 不需要完整阅读的内容进行隐藏，缩短页面，提高屏效，减少用户的滚动操作
### 常见用法
折叠面板展开时吸顶显示，当展开内容过多时，便于用户实时了解内容主题或类型
### 组件搭配使用
与表单搭配使用，在展开的面板中进行信息的添加或编辑，可以给用户扁平沉浸的编辑状态，避免弹出层或进入二级界面带来的任务打断
### 推荐/慎用示例
标题信息不宜过多，建议提炼关键信息，如有较多详情内容可放在折叠区域显示，帮助用户区分主次信息层级


# Date-picker
选择日期。支持年、月、季度、周、日类型，支持范围选择等。
## API
### DatePicker
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|size|\"small\" / \"large\" / \"default\"|\"default\"|不同尺寸|
|status|\"error\" ||组件状态|
|innerTitle|ReactNode||内嵌标题|
|placeTitle|ReactNode||占位标题，需要配合 innerTitle 一起使用|
|absolute|boolean / (() => HTMLElement / null) |false|为 true 时，选项弹出层在 DOM 中独立 render; 为函数时，返回值作为弹出层容器|
|zIndex|number |1000|选项列表 z-index 值, 需要配合 absolute|
|children|ReactNode||额外渲染的节点|
|disabled|boolean / ((date: Date, type?: \"start\" / \"end\" , value0?: Date , value1?: Date ) => boolean) / (boolean / ((date: Date) => boolean))[] |false|如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项|
|disabledTime|string / ((time: string) => boolean) ||禁用指定 Time。|
|open|boolean ||控制浮层显隐|
|onCollapse|((collapse: boolean) => void) ||下拉列表展开/收起回调|
|align|\"left\" / \"right\" / \"center\" |\"center\"|值水平排布方式|
|timeZone|string ||设置默认时区,格式为/^([+-]\\d{2})$/ 支持 \"-12\" 到 \"+13\"|
|position|\"top-left\" / \"top-right\" / \"bottom-left\" / \"bottom-right\" ||弹出框位置|
|type|\"date\" / \"time\" / \"datetime\" / \"month\" / \"week\" / \"quarter\" / \"year\" |\"date\"|时间类型|
|format|string ||不同type对应的默认值。\"date\": \"YYYY-MM-DD\"; \"time\": \"HH:mm:ss\"; \"week\": \"GGGG WW\"; \"month\": \"YYYY-MM\"; \"quarter\": \"YYYY-\\[Q]Q\";  \"year\": \"YYYY\"; \"datetime\": \"YYYY-MM-DD HH:mm:ss\"|
|formatResult|string / ((date: Date) => string) |props.format|对选中时间进行格式化|
|range|number / boolean ||范围跨度，单位 秒，为 true 时表示不限制选择范围|
|value|Value ||值为 string 时，需要和 format 属性匹配。非 string 会格式化为 string。range 属性为 true 时，值为长度为2的数组|
|defaultValue|Value ||默认值  和 value 类型相同|
|onChange|((value: Value extends any[] ? string[] : string) => void) ||值改变回调函数|
|clearable|boolean |true|是否显示清除数据图标|
|clearWithUndefined|boolean |false|清空值时抛出 undefined|
|allowSingle|boolean |false|是否允许单选, 仅在 range 模式下有效|
|defaultRangeMonth|(Date / number / string )[] ||使用 defaultPickerValue 代替|
|defaultPickerValue|Date / number / string  / (Date / number / string )[]||面板默认时间，在未选择日期时生效|
|placeholder|string / string[] ||占位文字。range 属性不为空时，为长度为2的数组|
|defaultTime|DateTimeType / DateTimeType[]||选择日期时默认的时间, 格式为: \"HH:mm:ss\"|
|min|Date / number / string ||可选最小值|
|max|Date / number / string ||可选最大值|
|hourStep|number ||小时选项步长|
|minuteStep|number ||分钟选项步长|
|secondStep|number ||秒选项步长|
|quickSelect|{name: string, value: Value}[]||快速选择, 仅在 range 模式下有效, name: 文字提示, value: 时间范围|
|showSelNow|boolean ||是否展示今天或者此刻按钮|
|inputable|boolean |false|可输入|
|onPickerChange|((value: DateTimeType / DateTimeType[], quickSelectItem: void / {  name: ReactNode, value: DateTimeType / DateTimeType[] / (() => DateTimeType / DateTimeType[]) } , areaType: \"year\" / \"month\" / \"week\" / \"day\" / \"time\" / \"quick\" / \"quarter\") => void) ||值改变回调，有别于 onChange, onPickerChange会在每项值改变的时候执行|
|onBlur|((e: any) => void) ||blur 事件回调|
|onFocus|((e: any) => void) ||focus 事件回调|
|underline|boolean |false|是否只展示下边框|
|width|string / number ||自定义宽度|
|popover|PopoverProps[\"position\"]||校验信息弹出位置|
|popoverProps|PopoverProps ||校验或者tip弹框接受的属性|
|name|Name ||Form 内存取数据的 key|
|beforeChange|((value: T) => void / T ) ||值改变前的回调，当返回值不为空时将作为组件的新值|
|reserveAble|boolean ||设置为 true 组件卸载后表单不自动删除数据|
|rules|RuleItem[]||校验规则 详见 [Rule](/components/rule)|
|onError|((error?: Error ) => void) ||rules 校验回调|
|bind|string[] ||当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用|
## Example
### 基本用法
最基本的用法
```tsx
/**
 * cn - 基本用法
 *    -- 最基本的用法
 * en - Base
 *    -- The basic usage
 */
import React from 'react';
import { DatePicker } from 'shineout';

const App: React.FC = () => <DatePicker showSelNow onChange={(v) => console.log(v)} />;

export default App;

```
### 选择日期时间
设置 type 为 datetime，选择日期 + 时间
```tsx
/**
 * cn - 选择日期时间
 *    -- 设置 type 为 datetime，选择日期 + 时间
 * en - Datetime Mode
 *    -- Set type to be datetime to select date and time
 */
import React from 'react';
import { DatePicker } from 'shineout';

const App: React.FC = () => <DatePicker type='datetime' />;

export default App;

```
### 尺寸
内置了三种尺寸，small、default、large
```tsx
/**
 * cn - 尺寸
 *    -- 内置了三种尺寸，small、default、large
 * en - Size
 *    -- There are three built-in size: small、default、large
 */
import React from 'react';
import { DatePicker, TYPE, Radio } from 'shineout';

type DatePickerProps = TYPE.DatePicker.Props;
type DatePickerSize = DatePickerProps['size'];

const Size: DatePickerSize[] = ['small', 'default', 'large'];

const App: React.FC = () => {
  const [size, setSize] = React.useState<DatePickerSize>('default');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Radio.Group button={'outline'} data={Size} value={size} onChange={setSize} keygen />
      <DatePicker size={size} type='date' showSelNow />
      <DatePicker size={size} type='datetime' showSelNow />
      <DatePicker size={size} type='date' range showSelNow />
      <DatePicker size={size} type='datetime' range showSelNow />
    </div>
  );
};

export default App;

```
### 选择星期
设置 type 为 week，选择星期
```tsx
/**
 * cn - 选择星期
 *    -- 设置 type 为 week，选择星期
 * en - Week Mode
 *    -- Set type to be week to select week
 */
import React from 'react';
import { DatePicker } from 'shineout';

const App: React.FC = () => <DatePicker type='week' />;

export default App;

```
### 选择月
设置 type 为 month，选择月
```tsx
/**
 * cn - 选择月
 *    -- 设置 type 为 month，选择月
 * en - Month Mode
 *    -- Set type to be month to select month
 */
import React from 'react';
import { DatePicker } from 'shineout';

const App: React.FC = () => <DatePicker type='month' />;

export default App;

```
### 选择季度
设置 type 为 quarter，选择季度
```tsx
/**
 * cn - 选择季度
 *    -- 设置 type 为 quarter，选择季度
 * en - Quarter Mode
 *    -- Set type to be quarter to select month
 */
import React from 'react';
import { DatePicker } from 'shineout';

const App: React.FC = () => <DatePicker type='quarter' />;

export default App;

```
### 选择年
设置 type 为 year，选择年
```tsx
/**
 * cn - 选择年
 *    -- 设置 type 为 year，选择年
 * en - Year Mode
 *    -- Set type to be year to select year
 */
import React from 'react';
import { DatePicker } from 'shineout';

const App: React.FC = () => <DatePicker type='year' />;

export default App;

```
### 选择时间
设置 type 为 time，选择时间，根据 format 自动加载相应的选择列
```tsx
/**
 * cn - 选择时间
 *    -- 设置 type 为 time，选择时间，根据 format 自动加载相应的选择列
 * en - Time Mode
 *    -- Set type to be time to select time and automatically load the corresponding selection column according to the format property
 */
import React from 'react';
import { DatePicker } from 'shineout';

const now = Date.now();

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <DatePicker type='time' defaultValue={now} showSelNow />
    <DatePicker type='time' format='HH:mm' defaultValue={now} />
    <DatePicker type='time' format='hh:mm A' defaultValue={now} />
  </div>
);

export default App;

```
### 
步进设置
```tsx
/**
 * cn -
 *    -- 步进设置
 * en - Step
 *    -- Set step of TimePicker
 */
import React from 'react';
import { DatePicker } from 'shineout';

const step: number = 2;

const App: React.FC = () => (
  <div style={{ display: 'flex', gap: '24px' }}>
    <DatePicker placeholder='Hour Step' type='time' hourStep={step} />
    <DatePicker placeholder='Minute Step' type='time' minuteStep={step} />
    <DatePicker placeholder='Second Step' type='time' secondStep={step} />
  </div>
);

export default App;

```
### 范围选择
设置 range 属性可以选择范围，输入和返回的 value 为长度为 2 的数组
```tsx
/**
 * cn - 范围选择
 *    -- 设置 range 属性可以选择范围，输入和返回的 value 为长度为 2 的数组
 * en - Range
 *    --Set the range property to select range, the input value and return value is an array of length 2
 */
import React from 'react';
import { DatePicker, Radio, TYPE } from 'shineout';

type DateType = TYPE.DatePicker.Props['type'];
const types: DateType[] = ['date', 'week', 'month', 'quarter', 'year', 'time', 'datetime'];

const App: React.FC = () => {
  const [type, setType] = React.useState<DateType>('date');
  return (
    <div>
      <Radio.Group
        button={'outline'}
        data={types}
        value={type}
        onChange={setType}
        keygen
        style={{ marginBottom: 24 }}
      />
      <br />
      <DatePicker type={type} range />
    </div>
  );
};
export default App;

```
### 快速选择
可以配置一些快速选择的选项, 日期可以是 Date, 时间戳, 或者字符串,字符串需要和所格式填写的 format 一致
```tsx
/**
 * cn - 快速选择
 *    -- 可以配置一些快速选择的选项, 日期可以是 Date, 时间戳, 或者字符串,字符串需要和所格式填写的 format 一致
 * en - Quick select
 *    -- can configure some options for quick selection. The date can be Date, timestamp, or string. The string needs to be in the same format as the format
 */
import React from 'react';
import { DatePicker } from 'shineout';

const QuickSelectData = [
  { name: 'Today', value: () => Date.now() },
  {
    name: 'A week later',
    value: () => {
      const now = Date.now();
      return now + 7 * 24 * 60 * 60 * 1000;
    },
  },
  {
    name: 'A month later',
    value: () => {
      const now = Date.now();
      return now + 30 * 24 * 60 * 60 * 1000;
    },
  },
];
const QuickSelectDataTime = [
  {
    name: 'Next Week',
    value: () => {
      const now = Date.now();
      return [now, now + 7 * 24 * 60 * 60 * 1000];
    },
  },
  {
    name: 'Last Week',
    value: () => {
      const now = Date.now();
      return [now - 7 * 24 * 60 * 60 * 1000, now];
    },
  },
  {
    name: 'Next Month',
    value: () => {
      const now = Date.now();
      return [now, now + 30 * 24 * 60 * 60 * 1000];
    },
  },
  {
    name: 'Last Month',
    value: () => {
      const now = Date.now();
      return [now - 30 * 24 * 60 * 60 * 1000, now];
    },
  },
  {
    name: 'special date',
    value: ['2019-01-01 00:00:00', '2019-12-31 23:59:59'],
  },
];

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <DatePicker
      range
      absolute
      type='datetime'
      onChange={(d) => console.log(d)}
      quickSelect={QuickSelectDataTime}
      placeholder={['Start datetime', 'End datetime']}
      style={{ display: 'block' }}
    />

    <DatePicker placeholder='Quick Date' quickSelect={QuickSelectData} />
  </div>
);

export default App;

```
### 禁用
日期选择框禁用状态
```tsx
/**
 * cn - 禁用
 *    -- 日期选择框禁用状态
 * en - Disabled
 *    -- Disabled date picker
 */
import React from 'react';
import { DatePicker } from 'shineout';

const Now = Date.now();

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <DatePicker disabled={true} defaultValue={Now} />
    <DatePicker range disabled={true} defaultValue={['2017-05-10', '2017-05-20']} />
    <DatePicker range disabled={[false, true]} defaultValue={['2017-05-10', '2017-05-20']} />
    <DatePicker range disabled={[true, false]} defaultValue={['2017-05-10', '2017-05-20']} />
  </div>
);

export default App;

```
### 不可选取的时间
当 <span>disabled</span> 为函数时，可以根据返回值禁用某些时间
```tsx
/**
 * cn - 不可选取的时间
 *    -- 当 `disabled` 为函数时，可以根据返回值禁用某些时间
 * en - Disabled date
 *    -- When `disabled` is a function, you can disable some date according to the return value
 */
import React from 'react';
import { DatePicker } from 'shineout';

const Now = Date.now();

const App: React.FC = () => (
  <div style={{ display: 'flex', gap: '24px' }}>
    <DatePicker
      type='datetime'
      inputable
      defaultValue={Now}
      disabled={(d) => {
        return d.getDay() === 0 || d.getDay() === 6;
      }}
    />

    <DatePicker
      type='time'
      defaultValue='14:30:30'
      disabled={(d) => {
        if (d.getHours() > 15) return true;
        return false;
      }}
    />
  </div>
);

export default App;

```
### 
disabledTime 属性支持单独禁用时间。
```tsx
/**
 * cn -
 *    -- disabledTime 属性支持单独禁用时间。
 * en -
 *    -- The disabledTime attribute supports separate disable time
 */
import React from 'react';
import { DatePicker } from 'shineout';

const Now = Date.now();

const App: React.FC = () => (
  <div>
    <DatePicker
      type='datetime'
      defaultValue={Now}
      defaultTime='10:00:00'
      disabledTime={(time) => time === '12:00:00'}
    />
  </div>
);

export default App;

```
### 
同时禁用日期和时间
```tsx
/**
 * cn -
 *    -- 同时禁用日期和时间
 * en -
 *    -- Disable both special date and special time
 */
import React from 'react';
import { DatePicker } from 'shineout';

const App: React.FC = () => (
  <div>
    <DatePicker
      inputable
      type='datetime'
      defaultValue={'2023-10-12 12:00:00'}
      style={{ marginInlineEnd: 12 }}
      disabled={(d) => {
        return d.getDay() === 0 || d.getDay() === 6;
      }}
      disabledTime={'11:00:00'}
    />
  </div>
);

export default App;

```
### 可输入
设置 <span>inputable</span> 使日期可输入
```tsx
/**
 * cn - 可输入
 *    -- 设置 `inputable` 使日期可输入
 * en - Inputable
 *    -- Set `inputable` to make date inputable
 */
import React from 'react';
import { DatePicker } from 'shineout';

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <DatePicker inputable />
    <DatePicker type={'datetime'} inputable range absolute />
  </div>
);

export default App;

```
### 绝对定位
如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染。（非必要情况下不建议）
```tsx
/**
 * cn - 绝对定位
 *    -- 如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染。（非必要情况下不建议）
 * en - Absolute
 *    -- If the parent container of the pop-up layer is occluded, you can set the absolute property to make the pop-up options rendered in a separate layer. (not recommended if not necessary)
 */
import React from 'react';
import { DatePicker } from 'shineout';

const Now = Date.now();

const App: React.FC = () => (
  <div
    style={{
      padding: 10,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    }}
  >
    <DatePicker
      absolute
      format='x'
      type='datetime'
      defaultValue={new Date()}
      formatResult='YYYY-MM-DD HH:mm:ss'
    />
    <DatePicker absolute inputable range defaultValue={['2018-05-25', '2018-06-05']} />
    <DatePicker absolute type='time' defaultValue={Now} />
  </div>
);

export default App;

```
### 内嵌标题
使用 innerTitle 展示内嵌标题
```tsx
/**
 * cn - 内嵌标题
 *    -- 使用 innerTitle 展示内嵌标题
 * en - inner title
 *    -- -- use innerTitle to display the inner title
 */
import React from 'react';
import { DatePicker } from 'shineout';

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <DatePicker type='date' innerTitle='Select date' clearable showSelNow />

    <DatePicker range innerTitle='Select date' clearable showSelNow />

    <DatePicker type='datetime' inputable clearable innerTitle='Select datetime' showSelNow />
  </div>
);

export default App;

```
### 弹出框位置
通过设置 <span>position</span> 指定弹出面板的位置。默认为自动
```tsx
/**
 * cn - 弹出框位置
 *    -- 通过设置 `position` 指定弹出面板的位置。默认为自动
 * en - Position
 *    -- Set `Position` can control the different position of DatePicker
 */
import React from 'react';
import { DatePicker } from 'shineout';

const style = { width: 180 };

const App: React.FC = () => (
  <div style={{ display: 'flex', gap: 24, flexFlow: 'row wrap' }}>
    <DatePicker style={style} type='date' placeholder='top-left' position='top-left' />
    <DatePicker style={style} type='date' placeholder='top-right' position='top-right' />
    <DatePicker style={style} type='date' placeholder='bottom-left' position='bottom-left' />
    <DatePicker style={style} type='date' placeholder='bottom-right' position='bottom-right' />
  </div>
);

export default App;

```
### 时区
设置 timeZone
```tsx
/**
 * cn - 时区
 *    -- 设置 timeZone
 * en - timeZone
 *    -- set timeZone
 */
import React, { useState } from 'react';
import { DatePicker, Select } from 'shineout';

const offsetList = new Array(26).fill(undefined).map((_, index) => {
  const num = index - 12;
  const abs = Math.abs(num);
  const str = abs < 10 ? `0${abs}` : `${abs}`;
  return `${num < 0 ? '-' : '+'}${str}`;
});

const App: React.FC = () => {
  const [tz, setTz] = useState('+08');
  return (
    <div>
      <DatePicker
        format='X'
        timeZone={tz}
        type='datetime'
        defaultValue={new Date()}
        placeholder='Select datetime'
        onChange={(d) => console.log(d)}
        formatResult='YYYY-MM-DD HH:mm:ss'
      />
      <Select
        keygen
        renderItem={(d) => d}
        width={90}
        value={tz}
        data={offsetList}
        onChange={(v) => setTz(v)}
        style={{ marginInlineStart: 12 }}
      />
    </div>
  );
};

export default App;

```
### 
在清空值时抛出抛出 undefined
```tsx
/**
 * cn -
 *    -- 在清空值时抛出抛出 undefined
 * en -
 *    -- onChange get undefined while clear value
 */
import React, { useState } from 'react';
import { DatePicker, Input, TYPE } from 'shineout';

type DatePickerValue = TYPE.DatePicker.Value;

const App: React.FC = () => {
  const [value, setValue] = useState<DatePickerValue>('2022-02-22');
  return (
    <div>
      <DatePicker
        clearable
        type='date'
        value={value}
        clearWithUndefined
        onChange={setValue}
        style={{ marginBottom: 24 }}
      />
      <Input.Group style={{ width: 240 }} disabled>
        <b>Value</b>
        <Input value={String(value)} />
      </Input.Group>
    </div>
  );
};
export default App;

```
### 面板默认时间
打开面板后的默认时间，仅在未选择日期时生效
```tsx
/**
 * cn - 面板默认时间
 *    -- 打开面板后的默认时间，仅在未选择日期时生效
 * en - DefaultPickerValue
 *    -- default date of panel，work under has no value
 */
import React from 'react';
import { DatePicker } from 'shineout';

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <DatePicker defaultPickerValue='2022-09' type='date' />

    <DatePicker range type='date' defaultPickerValue={['2022-11', '2022-12']} />
  </div>
);

export default App;

```
### 允许单选
可以设置范围选择的时候只选择一侧.
```tsx
/**
 * cn - 允许单选
 *    -- 可以设置范围选择的时候只选择一侧.
 * en - allow single
 *    -- can set range select only select single
 */
import React from 'react';
import { DatePicker } from 'shineout';

const App: React.FC = () => (
  <DatePicker range allowSingle type='datetime' onChange={(d) => console.log(d)} />
);

export default App;

```
### 格式化
传入值可为 日期对象，时间戳，字符串，通过format 属性可以定义返回值的格式.
支持通过 formatResult 属性单独格式化值展示格式.
注: 我们使用dayjs格式化
```tsx
/**
 * cn - 格式化
 *    -- 传入值可为 日期对象，时间戳，字符串，通过format 属性可以定义返回值的格式.
 *    -- 支持通过 formatResult 属性单独格式化值展示格式.
 *    -- 注: 我们使用dayjs格式化
 * en - Format
 *    -- The format attribute defines the format of the return value
 *    -- support formatResult attribute to format the display format separately
 *    -- tip: we use dayjs format
 */
import React, { useState } from 'react';
import { DatePicker, Input, TYPE } from 'shineout';

type DatePickerProps = TYPE.DatePicker.Props;
type DatePickerValue = TYPE.DatePicker.Value;
type DatePickerFormat = DatePickerProps['format'];

type InputProps = TYPE.Input.Props;
type InputOnChange = InputProps['onChange'];

const App: React.FC = () => {
  const [value, setValue] = useState<DatePickerValue>(new Date());
  const [format, setFormat] = useState<DatePickerFormat>('YYYY-M-D HH:mm');
  const [formatResult, setFormatResult] = useState<DatePickerFormat>('YY/MM/DD');
  const [formatResultValue, setFormatResultValue] = useState<DatePickerValue>(new Date());

  const handleFormatChange: InputOnChange = (v) => setFormat(v);

  const handleFormatResultChange: InputOnChange = (v) => setFormatResult(v);

  return (
    <div>
      <DatePicker
        value={value}
        format={format}
        type='datetime'
        placeholder='format date'
        style={{ marginBottom: 24 }}
        onChange={setValue}
      />

      <Input.Group width={240} style={{ marginBottom: 32 }}>
        <Input style={{ flex: 1 }} value='format' disabled />
        <Input
          style={{ flex: 3 }}
          placeholder='格式化'
          value={format}
          onChange={handleFormatChange}
        />
      </Input.Group>

      <DatePicker
        type='datetime'
        format='YYYY-MM-DD HH:mm:ss'
        placeholder='format date'
        value={formatResultValue}
        formatResult={formatResult}
        onChange={setFormatResultValue}
        style={{ marginBottom: 24 }}
      />

      <Input.Group width={240} style={{ marginBottom: 24 }} disabled>
        <Input style={{ flex: 1 }} value='value' />
        <Input style={{ flex: 3 }} placeholder='值' value={String(formatResultValue)} />
      </Input.Group>

      <Input.Group width={240}>
        <Input style={{ flex: 3 }} value='formatResult' disabled />
        <Input
          style={{ flex: 4 }}
          placeholder='展示格式化'
          value={formatResult}
          onChange={handleFormatResultChange}
        />
      </Input.Group>
    </div>
  );
};

export default App;

```
### 最大最小时间
可以通过设置 min/max 去设置一个选择时间的最大最小值. 推荐在单选且datetime 类型下使用
```tsx
/**
 * cn - 最大最小时间
 *    -- 可以通过设置 min/max 去设置一个选择时间的最大最小值. 推荐在单选且datetime 类型下使用
 * en - min max date
 *    -- The basic usage
 */
import React from 'react';
import { DatePicker } from 'shineout';

const Now = Date.now();

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <DatePicker type='datetime' min={Now} placeholder='Select min datetime' />

    <DatePicker
      min={Now}
      type='datetime'
      max={Now + 4 * 86400000}
      placeholder='Select min/max datetime'
    />
  </div>
);

export default App;

```
### 完全受控
value onChange
```tsx
/**
 * cn - 完全受控
 *    -- value onChange
 * en - controlled
 *    -- value onChange
 */
import React from 'react';
import { DatePicker } from 'shineout';

const App = () => {
  const [v, setV] = React.useState('');
  return (
    <DatePicker
      type='date'
      placeholder='Select date'
      value={v}
      onChange={(d: string) => {
        console.log(d);
        setV(d);
      }}
    />
  );
};

export default App;

```
### timepicker range max
timepicker max 和 range 一起使用导致禁用逻辑错误
```tsx
/**
 * cn - timepicker range max
 *    -- timepicker max 和 range 一起使用导致禁用逻辑错误
 */
import React from 'react';
import { DatePicker } from 'shineout';

const date = new Date('2022/02/24 23:59:59');

const App = () => (
  <div>
    <DatePicker
      type='datetime'
      defaultValue={['2022-02-17 00:00:00', '2022-02-24 00:00:00']}
      range={7 * 24 * 3600}
      style={{ marginTop: '12px' }}
      placeholder='Select datetime'
      max={date}
    />
  </div>
);
export default App;

```
### 控制弹层（受控）
DatePicker 通过 open 控制弹层的显示和隐藏。请注意，将面板设置成常开时，建议同时设置 position 属性，否则面板易遮挡其他内容。
```tsx
/**
 * cn - 控制弹层（受控）
 *    -- DatePicker 通过 open 控制弹层的显示和隐藏。请注意，将面板设置成常开时，建议同时设置 position 属性，否则面板易遮挡其他内容。
 * en -  Dropdown list controlled by open property
 *    -- The dropdown list of Datepicker controlled by open property
 */
import React, { useState } from 'react';
import { DatePicker, Button } from 'shineout';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleClose = (close: boolean) => {
    setOpen(close);
  };
  return (
    <div style={{ display: 'flex' }}>
      <Button id='control' onClick={() => setOpen(true)}>
        Open elastic layer
      </Button>
      <DatePicker open={open} onCollapse={handleClose} type='date' placeholder='Select date' />
    </div>
  );
};

export default App;

```
### focus blur 事件

```tsx
/**
 * cn - focus blur 事件
 */

import React from 'react';
import { DatePicker } from 'shineout';

const App: React.FC = () => (
  <DatePicker
    showSelNow
    inputable
    range
    absolute
    type={'date'}
    onFocus={() => {
      console.log('focus');
    }}
    onBlur={() => {
      console.log('blur');
    }}
  />
);

export default App;

```
### 边框样式
设置 status 属性可以改变边框样式
```tsx
/**
 * cn - 边框样式
 *    -- 设置 status 属性可以改变边框样式
 * en - Border style
 *    -- Set the status property to change the border style
 */
import React from 'react';
import { DatePicker } from 'shineout';

const App: React.FC = () => (
  <div style={{ display: 'flex', gap: '24px' }}>
    <DatePicker status='error' showSelNow onChange={(v) => console.log(v)} />
    <DatePicker tip='i am a tip' onChange={(v) => console.log(v)} />
    <DatePicker
      tip='i am a tip'
      error='something wrong'
      popover
      showSelNow
      onChange={(v) => console.log(v)}
    />
  </div>
);

export default App;

```
## Guide
### 何时使用
当需要输入日期时；\n 当需要输入一个日期区间时；\n 多用于表单中日期输入，或数据筛选条件中进行日期条件输入时。
### 与布局相关
日期选择器常用于详情页表单布局，日期选择的类型不同会导致选择框的长度不一致，在布局上要根据具体类型来做选择
### 组件搭配使用
与选择器搭配使用，对选择的颗粒度（年、月、日）进行切换，常用于日期选择器类型的选择


# Descriptions
一般用于详情页的信息展示
## API
### Descriptions
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|size|\"small\" / \"large\" / \"default\"|\"default\"|不同尺寸|
|border|boolean |false|是否显示边框|
|extra|ReactNode||扩展内容|
|title|ReactNode||描述标题|
|layout|\"horizontal\" / \"vertical\" / \"inlineHorizontal\" / \"inlineVertical\" |\"inlineHorizontal\"|排列方式|
|colon|ReactNode||标签后面的内容|
|tableLayout|\"auto\" / \"fixed\" |\"auto\"|表格样式的layout-fixed,当设置为fixed时,宽度会被均分|
|items|ItemType[]||描述项数组,描述项对象结构见下|
|labelStyle|CSSProperties ||标签样式|
|valueStyle|CSSProperties ||值样式|
|column|number / { xs?: number ; sm?: number ; md?: number ; lg?: number ; xl?: number ; xxl?: number ; xxxl?: number ; } |3|每行放置的列的数量，一个数据为一列，可配置为数字或对象，当配置为对象格式时，支持响应式排列|
### ItemType
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|label|ReactNode||数据标签|
|value|ReactNode||数据值|
|span|number ||占据的列数|
|itemLabelStyle|CSSProperties ||当前数据标签样式|
|itemValueStyle|CSSProperties ||当前数据值样式|
## Example
### 基本用法
描述列表的基本样式
```tsx
/**
 * cn - 基本用法
 *    -- 描述列表的基本样式
 * en - Basic
 *    -- Basic usage of Descriptions
 */
import React from 'react';
import { Descriptions } from 'shineout';

const data = [
  {
    label: 'Name',
    value: 'Mai Mai',
  },
  {
    label: 'Residence',
    value: 'Beijing',
  },
  {
    label: 'Address',
    value: 'Yingdu Building',
  },
  {
    label: 'Mobile',
    value: '187-2323-9834',
  },
  {
    label: 'Hometown',
    value: 'Beijing',
  },
];

export default () => {
  return (
    <div style={{ marginBottom: '-12px' }}>
      <Descriptions
        items={data}
        title='User Info'
        colon={<span style={{ paddingLeft: '4px' }}>:</span>}
      />
    </div>
  );
};

```
### 单列样式
单列的描述列表样式
```tsx
/**
 * cn - 单列样式
 *    -- 单列的描述列表样式
 * en - One Colums
 *    -- One colums style of Descriptions
 */
import React from 'react';
import { Descriptions } from 'shineout';

const data = [
  {
    label: 'Name',
    value: 'Mai Mai',
  },
  {
    label: 'Mobile',
    value: '187-2323-9834',
  },
  {
    label: 'Residence',
    value: 'Beijing',
  },
];

export default () => {
  return (
    <div style={{ marginBottom: '-12px' }}>
      <Descriptions
        items={data}
        title='User Info'
        layout='horizontal'
        column={1}
        style={{ marginBottom: '12px' }}
      />
      <Descriptions
        items={data}
        title='User Info'
        layout='horizontal'
        column={1}
        labelStyle={{ textAlign: 'right' }}
      />
    </div>
  );
};

```
### 标签文本对齐
标签文本可以设置左对齐、右对齐，也可以设置垂直的样式排列
```tsx
/**
 * cn - 标签文本对齐
 *    -- 标签文本可以设置左对齐、右对齐，也可以设置垂直的样式排列
 * en - Label text alignment
 *    -- The label text can be set to left-aligned, right-aligned, and can also be set to vertical style arrangement
 */
import React from 'react';
import { Descriptions } from 'shineout';

const data = [
  {
    label: 'Name',
    value: 'Mai Mai',
  },
  {
    label: 'Residence',
    value: 'Beijing',
  },
  {
    label: 'Address',
    value: 'Yingdu Building',
  },
  {
    label: 'Hometown',
    value: 'Beijing',
  },
  {
    label: 'Mobile',
    value: '187-2323-9834',
  },
];

export default () => {
  return (
    <div style={{ marginBottom: '-12px' }}>
      <Descriptions
        items={data}
        title='User Info'
        layout='horizontal'
        colon={<span style={{ paddingLeft: '4px' }}>:</span>}
        style={{ marginBottom: '12px' }}
      />
      <Descriptions
        items={data}
        title='User Info'
        layout='horizontal'
        colon={<span style={{ paddingLeft: '4px' }}>:</span>}
        labelStyle={{ textAlign: 'right' }}
        style={{ marginBottom: '12px' }}
      />
      <Descriptions
        items={data}
        title='User Info'
        layout='vertical'
        colon={<span style={{ paddingLeft: '4px' }}>:</span>}
        labelStyle={{ paddingBottom: '2px' }}
      />
    </div>
  );
};

```
### 带边框展示
带边框和背景颜色的列表
```tsx
/**
 * cn - 带边框展示
 *    -- 带边框和背景颜色的列表
 * en - Show With Border
 *    -- List with border and background color
 */
import React from 'react';
import { Descriptions } from 'shineout';

const data = [
  {
    label: 'Name',
    value: 'Mai Mai',
  },
  {
    label: 'Residence',
    value: 'Beijing',
  },
  {
    label: 'Address',
    value: 'Yingdu Building,Zhichun Road,Beijing',
  },
  {
    label: 'Mobile',
    value: '187-2323-9834',
  },
  {
    label: 'Hometown',
    value: 'Beijing',
  },
];

export default () => {
  return (
    <div>
      <Descriptions
        items={data}
        title='User Info'
        layout='horizontal'
        border
        tableLayout='fixed'
        style={{ marginBottom: '20px' }}
      />
      <Descriptions
        items={data}
        title='User Info'
        layout='horizontal'
        border
        tableLayout='fixed'
        labelStyle={{ textAlign: 'right' }}
        style={{ marginBottom: '20px' }}
      />
      <Descriptions
        items={data}
        title='User Info'
        layout='vertical'
        border
        tableLayout='fixed'
        column={4}
      />
    </div>
  );
};

```
### 不同排列模式
可以通过tableLayout='fixed'设置等宽，通过layout设置不同的排列方式，设置border是否显示边框
```tsx
/**
 * cn - 不同排列模式
 *    -- 可以通过tableLayout='fixed'设置等宽，通过layout设置不同的排列方式，设置border是否显示边框
 * en - Arrangement
 *    -- You can set the same width by tableLayout='fixed', and set different arrangement by layout, set border to show border
 */
import React from 'react';
import { Descriptions, Radio } from 'shineout';

const data = [
  {
    label: 'Name',
    value: 'Mai Mai',
  },
  {
    label: 'Residence',
    value: 'Beijing',
  },
  {
    label: 'Address',
    value: 'Yingdu Building',
  },
  {
    label: 'Mobile',
    value: '187-2323-9834',
  },
  {
    label: 'Hometown',
    value: 'Beijing',
  },
];

type layoutType = 'horizontal' | 'vertical' | 'inlineHorizontal' | 'inlineVertical';
const layouts: layoutType[] = ['horizontal', 'vertical', 'inlineHorizontal', 'inlineVertical'];

type tableLayoutType = 'fixed' | 'auto';
const tableLayouts: tableLayoutType[] = ['auto', 'fixed'];

interface borderType {
  label: string;
  value: boolean;
}
const borders: borderType[] = [
  { label: 'no border', value: false },
  { label: 'border', value: true },
];

export default () => {
  const [layout, setLayout] = React.useState<layoutType>('horizontal');
  const [tableLayout, setTableLayout] = React.useState<tableLayoutType>('auto');
  const [border, setBorder] = React.useState<boolean>(false);
  return (
    <div style={{ marginBottom: '-12px' }}>
      <Radio.Group
        data={layouts}
        value={layout}
        onChange={setLayout}
        keygen
        style={{ marginBottom: 24 }}
      />
      <Radio.Group
        data={tableLayouts}
        value={tableLayout}
        onChange={setTableLayout}
        keygen
        style={{ marginBottom: 24 }}
      />
      <Radio.Group
        data={borders}
        format={'value'}
        renderItem={'label'}
        value={border}
        onChange={setBorder}
        keygen={'label'}
        style={{ marginBottom: 24 }}
      />
      <Descriptions
        items={data}
        title='User Info'
        colon={<span style={{ paddingLeft: '4px' }}>:</span>}
        layout={layout}
        tableLayout={tableLayout}
        border={border}
        labelStyle={{
          marginBottom: layout === 'inlineVertical' ? '2px' : '',
          paddingBottom: layout === 'vertical' ? '2px' : '',
        }}
      />
    </div>
  );
};

```
### 不同尺寸
展示不同尺寸下的描述列表
```tsx
/**
 * cn - 不同尺寸
 *    -- 展示不同尺寸下的描述列表
 * en - Different Size
 *    -- Show Descriptions of different sizes
 */
import React from 'react';
import { Descriptions, Radio } from 'shineout';

const data = [
  {
    label: 'Name',
    value: 'Mai Mai',
  },
  {
    label: 'Residence',
    value: 'Beijing',
  },
  {
    label: 'Address',
    value: 'Yingdu Building,Zhichun Road,Beijing',
  },
  {
    label: 'Mobile',
    value: '187-2323-9834',
  },
  {
    label: 'Hometown',
    value: 'Beijing',
  },
];

type SizeType = 'small' | 'default' | 'large' | undefined;
const Size: SizeType[] = ['small', 'default', 'large'];

export default () => {
  const [size, setSize] = React.useState<SizeType>('default');
  return (
    <div>
      <Radio.Group
        data={Size}
        value={size}
        onChange={setSize}
        keygen
        style={{ marginBottom: 24 }}
      />
      <Descriptions
        items={data}
        title='User Info'
        colon={<span style={{ paddingLeft: '4px' }}>:</span>}
        style={{ marginBottom: '12px' }}
        size={size}
      />
      <Descriptions
        items={data}
        title='User Info'
        layout='horizontal'
        labelStyle={{ textAlign: 'right' }}
        size={size}
        border
      />
    </div>
  );
};

```
### 响应式排列
支持响应式排列
```tsx
/**
 * cn - 响应式排列
 *    -- 支持响应式排列
 * en - Responsive
 *    -- Responsive arrangement
 */
import React from 'react';
import { Descriptions } from 'shineout';

const data = [
  {
    label: 'Name',
    value: 'Mai Mai',
  },
  {
    label: 'Residence',
    value: 'Beijing',
  },
  {
    label: 'Address',
    value: 'Yingdu Building,Zhichun Road,Beijing',
  },
  {
    label: 'Mobile',
    value: '187-2323-9834',
  },
  {
    label: 'Hometown',
    value: 'Beijing',
  },
];

export default () => {
  return (
    <div>
      <Descriptions
        items={data}
        title='User Info'
        border
        layout='horizontal'
        labelStyle={{ textAlign: 'right' }}
        column={{
          xs: 1,
          sm: 2,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 4,
        }}
      />
    </div>
  );
};

```
## Guide
### 何时使用
当操作命令需要用户点击，触发相应业务逻辑时
### 推荐使用示例
文本换行时，建议使用以下换行方式
适配多语言，建议使用垂直布局样式


# Divider
分割线是一个呈线状的轻量化组件，起到分割、组织、细化的作用，用于有逻辑的组织元素内容和页面结构
## API
### Divider
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|children|ReactNode||分割线中文字内容|
|mode|\"horizontal\" / \"vertical\" |\"horizontal\"|分割线排布模式|
|orientation|\"center\" / \"left\" / \"right\" |\"center\"|水平分割线的文字排布位置|
|type|\"solid\" / \"dashed\" |\"solid\"|线段类型|
## Example
### 基本用法
默认为水平分割线
```tsx
/**
 * cn - 基本用法
 *    --默认为水平分割线
 * en - Base
 *    --Divider is horizontal by default. You can add text within Divider
 */
import React from 'react';
import { Divider } from 'shineout';

const App: React.FC = () => (
  <div style={{ fontSize: 12 }}>
    <p>A design is a plan or specification for the construction of an object.</p>
    <Divider />
    <p>A design is a plan or specification for the construction of an object.</p>
  </div>
);

export default App;

```
### 虚线分割
使用 <span>type</span>="dashed" 设置为虚线分割线
```tsx
/**
 * cn - 虚线分割
 *    --使用 `type`="dashed" 设置为虚线分割线
 * en - Dashed
 *    --Use type="dashed" make it dashed
 */
import React from 'react';
import { Divider } from 'shineout';

const App: React.FC = () => (
  <div style={{ fontSize: 12 }}>
    <p>A design is a plan or specification for the construction of an object.</p>
    <Divider type='dashed' />
    <p>A design is a plan or specification for the construction of an object.</p>
  </div>
);

export default App;

```
### 带文字的分割线
分割线中带有文字，可以用 orientation 指定文字位置
```tsx
/**
 * cn - 带文字的分割线
 *    -- 分割线中带有文字，可以用 orientation 指定文字位置
 * en - Divider with title
 *    --Divider with inner title, set orientation="left/right" to align it
 */
import React from 'react';
import { Divider } from 'shineout';

const App: React.FC = () => (
  <div style={{ fontSize: 12 }}>
    <p>A design is a plan or specification for the construction of an object.</p>
    <Divider>Center</Divider>
    <p>A design is a plan or specification for the construction of an object.</p>
    <Divider orientation={'left'}>Left</Divider>
    <p>A design is a plan or specification for the construction of an object.</p>
    <Divider orientation={'right'}>Right</Divider>
    <p>A design is a plan or specification for the construction of an object.</p>
  </div>
);

export default App;

```
### 垂直分割线
使用 mode="vertical" 设置为行内的垂直分割线
```tsx
/**
 * cn - 垂直分割线
 *    -- 使用 mode="vertical" 设置为行内的垂直分割线
 * en - Vertical
 *    --Use type="vertical" make it vertical
 */
import React from 'react';
import { Divider } from 'shineout';

const inlineStyle = {
  display: 'inline-block',
  lineHeight: '22px',
  fontSize: 14,
};

const App: React.FC = () => (
  <>
    <span style={inlineStyle}>Item 1</span>
    <Divider mode='vertical'>H</Divider>
    <span style={inlineStyle}>Item 2</span>
    <Divider mode='vertical' />
    <span style={inlineStyle}>Item 3</span>
  </>
);

export default App;

```
## Guide
### 何时使用
在表单或长列表中分隔不同的项目或部分\n 在页面上以视觉方式分隔不同的内容块\n 在视觉上将不同的主题分隔开
### 与布局相关
1、分割表单字段 - 在表单界面中，添加分割线能够将不同类型字段或者内容区块分隔开来，使得页面更加直观易懂，用户可以更快速定位和填写表单
2、分割操作按钮 - 操作界面中，可以使用分割线来把不同的操作按钮、筛选器或者快速筛选按钮分隔开来，使得页面更加清爽、有效并且具有导航性
### 推荐/慎用示例
当有明显的留白或副标题已经对内容起到分割作用时，要避免过度使用分割线导致的视觉干扰。


# Drawer
屏幕边缘滑出的浮层面板, 通常位于页面的侧栏或顶部菜单中，用于存储和显示交互的相关信息和菜单选项
## API
### Drawer
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|position|\"top\" / \"right\" / \"bottom\" / \"left\" |\"right\"|Pop-up position|
|width|string / number |auto|the width of the Drawer|
|height|string / number |auto|the height of the Drawer|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|hideMask|boolean |false|是否隐藏遮罩|
|forceMask|boolean |false|是否强制设置遮罩透明度（多层Modal中，除第一层外的其他弹出层遮罩透明度会被调整为0.01）|
|top|string / number |10vh|弹框距离顶部距离|
|fullScreen|boolean |false|是否全屏展示|
|bodyStyle|CSSProperties ||扩展弹出层 body 的样式|
|footer|ReactNode||底部内容|
|maskCloseAble|boolean / null |true|点击遮罩层是否关闭对话框, 设置为 null 右上角关闭图标会保留|
|padding|string / number ||内容内边距|
|title|ReactNode||弹出层的标题|
|visible|boolean |false|是否显示|
|zIndex|number |1050|弹出层 z-index 值，注意：如果嵌套 Select 组件，并且 Select 组件含有 absolute 字段，需要修改 Select 的 z-index 的值|
|rootClassName|string ||弹出层的根元素类名, 为遮罩层的父元素|
|container|(() => HTMLElement / null) / HTMLElement / null |document.body|渲染的目标节点|
|maskBackground|string ||遮罩背景色，设置后透明度将失效|
|onClose|(() => void) ||弹出层关闭回调|
|destroy|boolean |false|关闭时是否销毁元素|
|hideClose|boolean ||是否隐藏关闭按钮|
|type|\"success\" / \"info\" / \"warning\" / \"error\" ||弹出层 title 显示状态 icon|
|zoom|boolean |false|是否开启 zoom 动画效果|
|esc|boolean |true|是否支持 esc 键关闭|
|events|object |{}|外层元素所接受的事件列表，可用于在 createPortal 场景中阻止冒泡|
|resizable|boolean |false|是否可调整大小|
|children|ReactNode||弹出层内容|
## Example
### 基本用法
最基本的组件用法
Drawer 会在 document.body 中创建一个新的层显示弹出内容
关闭 Drawer 时默认没有对组件进行销毁, 只是隐藏, 组件的状态会被保留。 如果不需要保留组件之前的状态, 可以设置 destroy 属性
```tsx
/**
 * cn - 基本用法
 *    -- 最基本的组件用法
 *    -- Drawer 会在 document.body 中创建一个新的层显示弹出内容
 *    -- 关闭 Drawer 时默认没有对组件进行销毁, 只是隐藏, 组件的状态会被保留。 如果不需要保留组件之前的状态, 可以设置 destroy 属性
 * en - Base
 *    -- The basic usage for component
 */
import React, { useState } from 'react';
import { Drawer, Button, TYPE } from 'shineout';

type DrawerProps = TYPE.Drawer.Props;
type DrawerVisible = DrawerProps['visible'];
type DrawerOnClose = DrawerProps['onClose'];

const App: React.FC = () => {
  const [content, setContent] = useState(1);
  const [visible, setVisible] = useState<DrawerVisible>(false);

  const handleCancel: DrawerOnClose = () => {
    setVisible(false);
    setContent(content + 1);
    console.log('clicked cancel');
  };

  const handleOk = () => {
    setVisible(false);
    setContent(content + 1);
    console.log('clicked ok!');
  };

  const show = () => {
    setVisible(true);
  };

  return (
    <div>
      <Button onClick={show}>click me</Button>
      <Drawer
        width={400}
        visible={visible}
        title='Drawer Title'
        onClose={handleCancel}
        footer={[
          <Button key='cancel' onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key='ok' type='primary' onClick={handleOk}>
            Ok
          </Button>,
        ]}
      >
        {`you are visited ${content}`}
      </Drawer>
    </div>
  );
};

export default App;

```
### 位置
通过 position 可设置 Drawer 弹出的位置, 现支持 top、right、bottom 和 left 四个位置配置
```tsx
/**
 * cn - 位置
 *    -- 通过 position 可设置 Drawer 弹出的位置, 现支持 top、right、bottom 和 left 四个位置配置
 * en - Position
 *    -- Set position property to specify the pop-up position
 */
import React, { useState } from 'react';
import { Drawer, Button, Form, Input, Radio, TYPE } from 'shineout';

type DrawerProps = TYPE.Drawer.Props;
type DrawerPosition = DrawerProps['position'];

const positionList: DrawerPosition[] = ['right', 'top', 'bottom', 'left'];

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<DrawerPosition>('right');

  const toggle = (v: boolean) => {
    setVisible(v);
  };

  const footer = () => (
    <div>
      <Button mode='outline' onClick={() => toggle(false)}>
        Cancel
      </Button>
      <Drawer.Submit>Submit</Drawer.Submit>
    </div>
  );
  return (
    <div>
      <Radio.Group
        keygen
        value={position}
        data={positionList}
        onChange={(p) => setPosition(p)}
        style={{ marginBottom: 24 }}
      />

      <Button onClick={() => toggle(true)}>click me</Button>

      <Drawer
        title='Form'
        key={position}
        footer={footer()}
        visible={visible}
        position={position}
        onClose={() => toggle(false)}
      >
        <Form
          labelWidth={100}
          labelAlign='right'
          style={{ width: 500 }}
          onSubmit={() => toggle(false)}
        >
          <Form.Item required label='Email'>
            <Input name='email' />
          </Form.Item>

          <Form.Item required label='Password'>
            <Input name='password' type='password' />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default App;

```
### 指定目标
使用 container 来指定 Drawer 渲染的目标节点
```tsx
/**
 * cn - 指定目标
 *    -- 使用 container 来指定 Drawer 渲染的目标节点
 * en - Target
 *    -- set container to render target node
 */
import React, { useState } from 'react';
import { Button, Drawer, TYPE } from 'shineout';

type DrawerProps = TYPE.Drawer.Props;
type DrawerContainer = DrawerProps['container'];

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [wrapper, setWrapper] = useState<DrawerContainer>();

  const handleDismiss = () => {
    setVisible(false);
  };

  const show = () => {
    setVisible(true);
  };

  return (
    <div ref={(ref) => setWrapper(ref!)}>
      <Button onClick={show}>click me</Button>
      <Drawer
        width={400}
        visible={visible}
        container={wrapper}
        title='Drawer Title'
        onClose={handleDismiss}
        footer={[
          <Button key='cancel' onClick={handleDismiss}>
            Cancel
          </Button>,
          <Button key='ok' type='primary' onClick={handleDismiss}>
            Ok
          </Button>,
        ]}
      >
        Drawer mount after Button
      </Drawer>
    </div>
  );
};

export default App;

```
### 表单
Drawer 支持 Form 表单，并且支持 Form 的所有特性，表单提交可以使用 Drawer.Submit 来代替 Button[type=submit]
```tsx
/**
 * cn - 表单
 *    -- Drawer 支持 Form 表单，并且支持 Form 的所有特性，表单提交可以使用 Drawer.Submit 来代替 Button[type=submit]
 * en - Form
 *    --The internal form of Drawer can use Drawer.Submit to trigger submit
 */
import React, { useState } from 'react';
import { Drawer, Button, Form, Input, Message, TYPE } from 'shineout';

interface FormValue {
  email?: string;
  password?: string;
}

type FormProps = TYPE.Form.Props<FormValue>;
type FormRules = FormProps['rules'];

const rules: FormRules = {
  email: [
    { required: true, message: 'Please enter your email.' },
    { type: 'email', message: 'Please enter a valid email.' },
  ],
  password: [
    { required: true, message: 'Please enter password.' },
    { min: 7, message: 'Password must be at least {min} characters.' },
    { regExp: /[a-z]+/i, message: 'Password at least has one letter.' },
    (value: string, _formData: any, callback: any) => {
      if (/\d+/.test(value)) callback(true);
      else callback(new Error('Password at least has one numeral.'));
    },
  ],
};

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };

  const show = () => {
    setVisible(true);
  };

  const handleSubmit = (data: FormValue) => {
    setVisible(false);
    Message.success(JSON.stringify(data));
  };

  const renderFooter = () => (
    <div>
      <Button onClick={handleClose}>Cancel</Button>
      <Drawer.Submit>Submit</Drawer.Submit>
    </div>
  );

  return (
    <div>
      <Button onClick={show}>Drawer Form</Button>

      <Drawer
        visible={visible}
        width={456}
        title='Form'
        onClose={handleClose}
        footer={renderFooter()}
      >
        <Form
          labelWidth={100}
          rules={rules}
          labelAlign='right'
          style={{ maxWidth: 400 }}
          onSubmit={handleSubmit}
        >
          <Form.Item required label='Email'>
            <Input name='email' />
          </Form.Item>

          <Form.Item required label='Password'>
            <Input name='password' type='password' />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default App;

```
### 点击空白关闭
默认点击对话框外部空白页面会关闭对话框
设置 maskCloseAble 属性为 false，禁用点击空白关闭，同时右上角的关闭图标也会隐藏
设置 maskCloseAble 属性为 null，禁用点击空白关闭，右上角的关闭图标会保留
```tsx
/**
 * cn - 点击空白关闭
 *    -- 默认点击对话框外部空白页面会关闭对话框
 *    -- 设置 maskCloseAble 属性为 false，禁用点击空白关闭，同时右上角的关闭图标也会隐藏
 *    -- 设置 maskCloseAble 属性为 null，禁用点击空白关闭，右上角的关闭图标会保留
 * en - Close
 *    -- By default, clicking on the blank page outside the Modal box will closes the Modal box
 *    -- Set maskCloseAble to false to disable the function that click mask to close and the close icon in the upper right corner will be hidden at the same time
 *    -- Set maskCloseAbel to null to disable the function that click mask to close and the close icon in the upper right corner will be preserved
 */
import React, { useState } from 'react';
import { Drawer, Button, Radio } from 'shineout';

const list: { title: string; value: boolean | null }[] = [
  {
    title: 'false',
    value: false,
  },
  {
    title: 'true',
    value: true,
  },
  {
    title: 'null',
    value: null,
  },
];

const App: React.FC = () => {
  const [selected, setSelected] = useState(list[0]);
  const [visible, setVisible] = useState(false);

  const footer = () => (
    <Button mode='outline' onClick={() => setVisible(false)}>
      Close
    </Button>
  );

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <Radio.Group
          data={list}
          keygen='title'
          value={selected}
          renderItem='title'
          onChange={(c) => setSelected(c)}
          prediction={(v, d) => v.title === d.title}
          style={{ marginInlineEnd: 20 }}
        />
      </div>

      <Button mode='outline' onClick={() => setVisible(true)}>
        Open
      </Button>

      <Drawer
        width={400}
        visible={visible}
        footer={footer()}
        title='Modal Title'
        maskCloseAble={selected.value}
        onClose={() => setVisible(false)}
      >
        The prop maskCloseAble is &nbsp;
        {selected.title}
        .
        <br />
        You must click the button to close the Modal.
      </Drawer>
    </div>
  );
};

export default App;

```
### 全屏
使用 fullScreen 属性来使抽屉全屏展示
```tsx
/**
 * cn - 全屏
 *    -- 使用 fullScreen 属性来使抽屉全屏展示
 * en - Full Screen
 *    -- Use the fullScreen property to display the Drawer in full screen
 */
import React, { useState, useCallback } from 'react';

import {
  Form,
  Drawer,
  Button,
  Input,
  Upload,
  Radio,
  Checkbox,
  DatePicker,
  Rate,
  Textarea,
} from 'shineout';

const star = (
  <svg viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path d='M8.276 7.825L1.85649 8.7559L1.74278 8.77878C1.00761 8.96968 0.736859 9.90915 1.30093 10.4606L5.953 15.008L4.84231 21.3268L4.82911 21.4327C4.77288 22.2003 5.59415 22.7575 6.29763 22.3824L11.999 19.343L17.7023 22.3825L17.7988 22.4279C18.5105 22.7194 19.2948 22.1128 19.1578 21.3281L18.054 15.008L22.6997 10.46L22.7779 10.3745C23.2586 9.78723 22.9242 8.86973 22.1443 8.75601L15.758 7.825L12.895 2.05544C12.5264 1.31273 11.4661 1.31545 11.1013 2.06004L8.276 7.825Z' />
  </svg>
);

const StarRate = Rate(star, star);

const Content = () => {
  return (
    <div>
      <Form
        defaultValue={{ name: 'zhangsan', email: 'zhangsan@qq.com', score: 3 }}
        onSubmit={(v) => {
          console.log('form submit', v);
        }}
        onChange={(v) => {
          console.log('form change', v);
        }}
        onReset={() => {
          console.log('form reset');
        }}
      >
        <Form.Item label='Name'>
          <Input name={'name'} placeholder='please input name' clearable />
        </Form.Item>
        <Form.Item label='Password'>
          <Input name={'password'} placeholder='please input password' clearable />
        </Form.Item>
        <Form.Item label='Email'>
          <Input name={'email'} clearable placeholder='please input email' />
        </Form.Item>
        <Form.Item label='Gendar'>
          <Radio.Group name='gendar' data={['male', 'female']} keygen />
        </Form.Item>
        <Form.Item label='Course'>
          <Checkbox.Group name='course' data={['chinese', 'maths', 'english', 'physics']} keygen />
        </Form.Item>
        <Form.Item label='Enrollment date'>
          <DatePicker name='date' placeholder={'please select date'} clearable showSelNow />
        </Form.Item>
        <Form.Item label='Score'>
          <StarRate name='score'></StarRate>
        </Form.Item>
        <Form.Item label='upload avatar'>
          <Upload.Image
            action='/api/upload'
            accept='image/*'
            name='file'
            htmlName='file'
            recoverAble
            leftHandler
            removeConfirm='Are you sure to delete it ?'
            limit={3}
            onSuccess={(_res, filem, data) => {
              return data;
            }}
          />
        </Form.Item>
        <Form.Item label='Address'>
          <Textarea name='address' />
        </Form.Item>

        <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
          <Form.Submit>Submit</Form.Submit>
          <Form.Reset>Reset</Form.Reset>
        </Form.Item>
      </Form>
    </div>
  );
};

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const cancel = useCallback(() => {
    setVisible(false);
  }, [visible]);

  const footer = () => (
    <Button type='primary' onClick={cancel}>
      OK
    </Button>
  );

  return (
    <div>
      <Drawer title='Profile' fullScreen visible={visible} onClose={cancel} footer={footer()}>
        <Content></Content>
      </Drawer>
      <Button mode='outline' onClick={() => setVisible(true)}>
        Full Screen
      </Button>
    </div>
  );
};

export default App;

```
### 附带图标
使用 type 属性来指定标题附带的图标
```tsx
/**
 * cn - 附带图标
 *    -- 使用 type 属性来指定标题附带的图标
 * en - Icon
 *    -- use type display type icon
 */
import React, { useState } from 'react';
import { Drawer, Button, Radio, TYPE } from 'shineout';

type DrawerProps = TYPE.Drawer.Props;
type DrawerType = DrawerProps['type'];

const typeList: DrawerType[] = ['info', 'success', 'warning', 'error'];

const App: React.FC = () => {
  const [type, setType] = useState<DrawerType>('success');
  const [visible, setVisible] = useState(false);

  const handleOk = () => {
    setVisible(false);
    console.log('clicked ok!');
  };

  const handleCancel = () => {
    setVisible(false);
    console.log('clicked cancel');
  };

  const show = () => setVisible(true);

  const footer = () => [
    <Button key='cancel' onClick={handleCancel}>
      Cancel
    </Button>,

    <Button key='ok' type={type === 'error' ? 'danger' : 'primary'} onClick={handleOk}>
      Ok
    </Button>,
  ];

  return (
    <div>
      <Radio.Group
        style={{ marginBottom: 24 }}
        data={typeList}
        value={type}
        keygen
        onChange={setType}
      />

      <Button mode='outline' onClick={show}>
        click me
      </Button>

      <Drawer
        type={type}
        width={500}
        visible={visible}
        footer={footer()}
        onClose={handleCancel}
        title={`Drawer Title with ${type} Icon`}
      >
        <span>Drawer type: </span>
        <b>{type}</b>
      </Drawer>
    </div>
  );
};
export default App;

```
### 隐藏遮罩
使用 hideMask 属性来隐藏遮罩
```tsx
/**
 * cn - 隐藏遮罩
 *    -- 使用 hideMask 属性来隐藏遮罩
 * en - hide mask
 *    -- use hideMask property to hide mask
 */
import React, { useState } from 'react';
import { Drawer, Button } from 'shineout';

const App: React.FC = () => {
  const [content, setContent] = useState(1);
  const [visible, setVisible] = useState<boolean>(false);

  const handleCancel = () => {
    setVisible(false);
    setContent(content + 1);
    console.log('clicked cancel');
  };

  const handleOk = () => {
    setVisible(false);
    setContent(content + 1);
    console.log('clicked ok!');
  };

  const show = () => {
    setVisible(true);
  };

  return (
    <div>
      <Button onClick={show}>click me</Button>
      <Drawer
        width={400}
        hideMask
        visible={visible}
        title='Drawer Title'
        onClose={handleCancel}
        footer={[
          <Button key='cancel' onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key='ok' type='primary' onClick={handleOk}>
            Ok
          </Button>,
        ]}
      >
        {`you are visited ${content}`}
      </Drawer>
    </div>
  );
};

export default App;

```
### 可伸缩
设置 resizable 来自由调整 Drawer 大小
```tsx
/**
 * cn - 可伸缩
 *    -- 设置 resizable 来自由调整 Drawer 大小
 * en - Resizable
 *    -- Set resizable to resize Drawer freely
 */
import React, { useState } from 'react';
import { Drawer, Button, Form, Input, Radio, TYPE } from 'shineout';

type DrawerProps = TYPE.Drawer.Props;
type DrawerPosition = DrawerProps['position'];

const positionList: DrawerPosition[] = ['right', 'top', 'bottom', 'left'];

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<DrawerPosition>('right');

  const toggle = (v: boolean) => {
    setVisible(v);
  };

  const footer = () => (
    <div>
      <Button mode='outline' onClick={() => toggle(false)}>
        Cancel
      </Button>
      <Drawer.Submit>Submit</Drawer.Submit>
    </div>
  );
  return (
    <div>
      <Radio.Group
        keygen
        value={position}
        data={positionList}
        onChange={(p) => setPosition(p)}
        style={{ marginBottom: 24 }}
      />

      <Button onClick={() => toggle(true)}>click me</Button>

      <Drawer
        title='Form'
        key={position}
        resizable
        footer={footer()}
        visible={visible}
        position={position}
        onClose={() => toggle(false)}
      >
        <Form
          labelWidth={100}
          labelAlign='right'
          style={{ width: 500 }}
          onSubmit={() => toggle(false)}
        >
          <Form.Item required label='Email'>
            <Input name='email' />
          </Form.Item>

          <Form.Item required label='Password'>
            <Input name='password' type='password' />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default App;

```
## Guide
### 何时使用
当需要一个附加的面板来对页面内容做补充说明时\n 当需要在当前任务流中插入临时操作任务时
### 与页面布局相关
整体界面布局：抽屉在整个页面出现\n 局部区域布局：抽屉尽在当前操作的区域出现，而不会覆盖整个页面
### 推荐/慎用示例
1、抽屉的最大宽度建议不要超过屏幕宽度的 80%，因为抽屉设计的初衷是为了提供一个快速的访问通道，而非为了取代整个页面
2、避免设计过多的嵌套层次，通常不超过两层，过多的层次会使用户花费更多的时间去寻找他们所需的信息，加重用户负担，也会影响用户体验


# Dropdown
通常用于展示用户可供选择的选项，在操作选项较多时，可以将这些选项收纳起来
## API
### Dropdown
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|size|\"small\" / \"large\" / \"default\"|\"default\"|不同尺寸|
|absolute|boolean / (() => HTMLElement / null) |false|为 true 时，选项弹出层在 DOM 中独立 render; 为函数时，返回值作为弹出层容器|
|type|/ \"default\"  / \"primary\"  / \"secondary\"  / \"danger\"  / \"warning\"  / \"success\"  / \"link\" |\"default\"|按钮类型|
|mode|\"text\" / \"outline\" / \"dashed\" ||按钮风格|
|onClick|((data: any) => void) ||点击事件。参数为渲染的数据,注: 如果数据内设置了onClick，会忽略此方法，调用data.onClick|
|disabled|boolean |false|禁用|
|placeholder|ReactNode||按钮显示内容|
|columns|number ||页面多元素展示,此属性需要依赖width属性,请合理的设置列数和宽度|
|animation|boolean |true|是否开启动画|
|data|object[]|[]|下拉数据 详见 DropdownData|
|trigger|\"click\" / \"hover\" |\"click\"|触发方式|
|width|number ||弹出选项层的宽度|
|position|/ \"left-top\"  / \"left-bottom\"  / \"right-top\"  / \"right-bottom\"  / \"top-right\"  / \"top-left\"  / \"bottom-right\"  / \"bottom-left\"  / \"left\"  / \"right\"  / \"top\"  / \"bottom\" / \"auto\" |\"bottom-left\"|弹出的方向和位置|
|renderItem|string / ((data: any) => ReactNode) ||设置显示的内容,如果是字符串,则为对应的值。如果是函数,则返回值为显示的内容,参数为当条数据|
|open|boolean ||控制浮层显隐|
|onCollapse|((collapse: boolean) => void) ||下拉列表展开/收起回调|
## Example
### 基本用法
Dropdown 通过数据来渲染，支持 json 格式数据、React 组件
```tsx
/**
 * cn - 基本用法
 *    -- Dropdown 通过数据来渲染，支持 json 格式数据、React 组件
 * en - Base
 *   -- Dropdown is rendered through data and supports json formatted data and React components
 */
import React from 'react';
import { Dropdown, TYPE } from 'shineout';

type DropdownItem = TYPE.Dropdown.Item;
const data: DropdownItem[] = [
  {
    content: 'Submenu',
    children: [
      {
        content: 'Link to Google',
        target: '_blank',
        url: 'https://google.com',
      },
      {
        content: 'Disabled',
        disabled: true,
      },
    ],
  },
  <a key={'link'} href='/'>
    Home
  </a>,
  {
    content: 'Message',
    onClick: () => {
      console.info('Some message.');
    },
  },
];

const App: React.FC = () => {
  return (
    <>
      <Dropdown placeholder='Click me' data={data} onClick={console.log} />
      <Dropdown placeholder='Click me' data={data} disabled />
    </>
  );
};

export default App;

```
### 触发方式
Dropdown 默认通过点击触发下拉行为，设置 trigger="hover" 属性可以改为移入触发
```tsx
/**
 * cn - 触发方式
 *    -- Dropdown 默认通过点击触发下拉行为，设置 trigger="hover" 属性可以改为移入触发
 * en - Trigger
 *    -- By default, Dropdown toggled clicking, setting trigger="hover" can toggled by mouse move in
 */
import React from 'react';
import { Dropdown, TYPE } from 'shineout';

type DropdownItem = TYPE.Dropdown.Item;

const menu: DropdownItem[] = [
  { content: 'America' },
  { content: 'Germany' },
  { content: 'United Kingdom' },
  { content: 'France' },
  { content: 'Russia' },
];

const App: React.FC = () => (
  <>
    <Dropdown trigger='click' placeholder='Click me' data={menu} />
    <Dropdown trigger='hover' placeholder='Hover me' data={menu} />
  </>
);

export default App;

```
### 弹出位置
设置 position 属性可以控制下拉菜单弹出的方向和位置
```tsx
/**
 * cn - 弹出位置
 *    -- 设置 position 属性可以控制下拉菜单弹出的方向和位置
 * en - Position
 *    -- Set position property can control the direction and position of the drop-down menu
 */
import React from 'react';
import { Dropdown, TYPE } from 'shineout';

type DropdownItem = TYPE.Dropdown.Item;

const menu: DropdownItem[] = [
  {
    content: 'First',
    children: [
      {
        content: 'link1',
      },
      {
        content: 'link2',
      },
    ],
  },
  {
    content: 'Second',
    children: [
      {
        content: 'link3',
      },
      {
        content: 'link4',
        children: [
          {
            content: 'link5',
          },
          {
            content: 'link6',
          },
        ],
      },
    ],
  },
];

const App: React.FC = () => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 12 }}>
    <div style={{ display: 'flex', justifyContent: 'center', gap: 12, padding: '0 120px' }}>
      <Dropdown placeholder='Bottom left' position='bottom-left' data={menu} />
      <Dropdown placeholder='Bottom' position='bottom' data={menu} />
      <Dropdown placeholder='Bottom right' position='bottom-right' data={menu} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropdown placeholder='Right Top' position='right-top' data={menu} />
      <Dropdown placeholder='Left Top' position='left-top' data={menu} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropdown placeholder='Right' position='right' data={menu} />
      <Dropdown placeholder='Left' position='left' data={menu} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropdown placeholder='Right Bottom' position='right-bottom' data={menu} />
      <Dropdown placeholder='Left Bottom' position='left-bottom' data={menu} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
      <Dropdown placeholder='Top Left' position='top-left' data={menu} />
      <Dropdown placeholder='Top' position='top' data={menu} />
      <Dropdown placeholder='Top right' position='top-right' data={menu} />
    </div>
  </div>
);

export default App;

```
### 按钮下拉
和 Button 属性相同, 支持 type text outline
```tsx
/**
 * cn - 按钮下拉
 *    -- 和 Button 属性相同, 支持 type text outline
 * en - Button
 *    -- Same as Button, support type text outline
 */
import React from 'react';
import { Dropdown } from 'shineout';

const menu: {
  id: string;
  content: string;
}[] = [];

for (let i = 1; i <= 3; i++) {
  menu.push({
    id: `${i}`,
    content: `item${i}`,
  });
}

const columnStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 24,
};
const App: React.FC = () => (
  <div style={{ display: 'flex', gap: 24 }}>
    <div style={columnStyle}>
      <Dropdown data={menu} type={'primary'} placeholder={'Default'} />
      <Dropdown data={menu} type={'secondary'} placeholder={'Default'} />
      <Dropdown data={menu} type={'danger'} placeholder={'Default'} />
      <Dropdown data={menu} type={'warning'} placeholder={'Default'} />
      <Dropdown data={menu} type={'success'} placeholder={'Default'} />
    </div>
    <div style={columnStyle}>
      <Dropdown data={menu} type={'primary'} placeholder={'Outline'} outline />
      <Dropdown data={menu} type={'secondary'} placeholder={'Outline'} outline />
      <Dropdown data={menu} type={'danger'} placeholder={'Outline'} outline />
      <Dropdown data={menu} type={'warning'} placeholder={'Outline'} outline />
      <Dropdown data={menu} type={'success'} placeholder={'Outline'} outline />
    </div>
    <div style={columnStyle}>
      <Dropdown data={menu} type={'primary'} placeholder={'Text'} text />
      <Dropdown data={menu} type={'secondary'} placeholder={'Text'} text />
      <Dropdown data={menu} type={'danger'} placeholder={'Text'} text />
      <Dropdown data={menu} type={'warning'} placeholder={'Text'} text />
      <Dropdown data={menu} type={'success'} placeholder={'Text'} text />
    </div>
  </div>
);

export default App;

```
### 多级菜单
带有多个下钻层级菜单的下拉框, 在 data 中设置 children 属性即可
```tsx
/**
 * cn - 多级菜单
 *    -- 带有多个下钻层级菜单的下拉框, 在 data 中设置 children 属性即可
 * en - Multi-level
 *   -- Dropdown with multiple levels of menu, set the children property in data
 */
import React from 'react';
import { Dropdown } from 'shineout';

const menu = new Array(5).fill(null).map((_, index) => ({
  id: `${index}`,
  content: `item${index}`,
  children: new Array(5).fill(null).map((_, i) => ({
    id: `${index}-${i}`,
    content: `item${index}-${i}`,
  })),
}));

const App: React.FC = () => <Dropdown data={menu} placeholder={'Click me'} />;

export default App;

```
### 分组菜单
通过在数据项配置 group 可以在菜单中添加分组
```tsx
/**
 * cn - 分组菜单
 *    -- 通过在数据项配置 group 可以在菜单中添加分组
 * en - Group
 *   -- Add a group to the menu by setting group in the data item
 */
import React from 'react';
import { Dropdown } from 'shineout';

const menu = new Array(4).fill(null).map((_, index) => ({
  id: `${index}`,
  content: `item${index}`,
  group: index % 2 === 0 ? `group${index / 2}` : undefined,
}));

const App: React.FC = () => <Dropdown data={menu} placeholder={'Group Menu'} absolute />;

export default App;

```
### 带分割线下拉菜单
通过在数据项配置 divider:true 可以在菜单中添加分割线
```tsx
/**
 * cn - 带分割线下拉菜单
 *    -- 通过在数据项配置 divider:true 可以在菜单中添加分割线
 * en - Divider
 *    -- Add a divider to the menu by setting divider:true in the data item
 */
import React from 'react';
import { Dropdown, TYPE } from 'shineout';

type DropdownItem = TYPE.Dropdown.Item;

const menu: DropdownItem[] = [
  {
    content: 'First',
  },
  {
    content: 'Second',
  },
  {
    content: 'Third',
    divider: true,
  },
  {
    content: 'Fourth',
  },
];

const App: React.FC = () => (
  <Dropdown data={menu} placeholder={'Dividing Line'} position='bottom-left' />
);

export default App;

```
### 多列平铺下拉菜单
设置 columns 属性可以让选项多列平铺
```tsx
/**
 * cn - 多列平铺下拉菜单
 *    -- 设置 columns 属性可以让选项多列平铺
 * en - Multiple columns
 *    -- Set columns property can make the option multi-column tiled
 */
import React from 'react';
import { Dropdown } from 'shineout';

const menu = new Array(30).fill(null).map((_, index) => ({
  id: `${index}`,
  content: `item${index}`,
}));

const App: React.FC = () => (
  <Dropdown placeholder='Tiling Menu' width={500} columns={5} data={menu} />
);

export default App;

```
### 带图标的下拉菜单
content 可以传 ReactNode 来渲染复杂的内容
```tsx
/**
 * cn - 带图标的下拉菜单
 *    -- content 可以传 ReactNode 来渲染复杂的内容
 * en - Dropdown with icon
 *    -- Content can pass ReactNode to render complex content
 */
import React from 'react';
import { Dropdown } from 'shineout';
import FontAwesome from './Icon';

const menu = new Array(5).fill(null).map((_, index) => ({
  id: `${index}`,
  content: (
    <div>
      <FontAwesome name={'user-o'} /> <span style={{ marginInlineStart: 4 }}>{`item${index}`}</span>
    </div>
  ),
}));

const App: React.FC = () => <Dropdown placeholder='Icon Menu' data={menu} />;

export default App;

```
### 尺寸
通过 size 设置下拉菜单的尺寸
```tsx
/**
 * cn - 尺寸
 *    -- 通过 size 设置下拉菜单的尺寸
 * en - Size
 *    -- Set the size of the dropdown menu through size
 */
import React from 'react';
import { Dropdown } from 'shineout';

const menu = new Array(4).fill(null).map((_, index) => ({
  id: `${index}`,
  content: `item${index}`,
}));

const marginStyle = { marginInlineEnd: 24 };
const App: React.FC = () => (
  <div>
    {['small', 'default', 'large'].map((size: any) => (
      <Dropdown
        outline
        type={'primary'}
        key={size}
        data={menu}
        placeholder='Dropdown'
        size={size}
        style={marginStyle}
      />
    ))}
  </div>
);

export default App;

```
### 组合下拉
在 Button.Group 中组合使用，通常用于隐藏一组按钮中不太常用的选项
```tsx
/**
 * cn - 组合下拉
 *    -- 在 Button.Group 中组合使用，通常用于隐藏一组按钮中不太常用的选项
 * en - Group
 *    -- Dropdown can be combined with Button used in Button.Group
 */
import React from 'react';
import { Button, Dropdown, TYPE } from 'shineout';

type DropdownItem = TYPE.Dropdown.Item;

const menu: DropdownItem[] = [
  {
    content: 'First',
  },
  {
    content: 'Second',
    target: '_blank',
    url: 'http://www.google.com',
  },
];

const App: React.FC = () => (
  <>
    <Button.Group
      mode={'outline'}
      type={'secondary'}
      style={{ display: 'inline-block', marginInlineEnd: 24 }}
    >
      <Button>Option</Button>
      <Button>Option</Button>
      <Dropdown
        data={menu}
        position='bottom-right'
        onClick={(data: any) => console.info(`The Dropdown clicked ${data.content}.`)}
      />
    </Button.Group>
    <Button.Group type={'secondary'} style={{ display: 'inline-block' }}>
      <Button>Option</Button>
      <Button>Option</Button>
      <Dropdown
        data={menu}
        position='bottom-right'
        onClick={(data: any) => console.info(`The Dropdown clicked ${data.content}.`)}
      />
    </Button.Group>
  </>
);

export default App;

```
### 绝对定位
如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染
```tsx
/**
 * cn - 绝对定位
 *    -- 如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染
 * en - Absolute
 *    -- If the parent container of the pop-up layer is occluded, you can set the absolute property to make the pop-up options rendered in a separate layer
 */
import React from 'react';
import { Dropdown, TYPE } from 'shineout';

type DropdownItem = TYPE.Dropdown.Item;

const data: DropdownItem[] = [
  {
    content:
      'subMenu',
    children: [
      {
        content: 'Link to Google',
        target: '_blank',
        url: 'https://google.com',
      },
      {
        content: 'Disabled',
        disabled: true,
      },
    ],
  },
  <a href='/' key={'home'}>
    Home
  </a>,
  {
    content: 'Message',
    onClick: () => {
      console.info('Some message.');
    },
  },
];

const App: React.FC = () => (
  <div style={{ background: '#eee', padding: 20, borderRadius: 4, overflow: 'hidden' }}>
    <Dropdown
      position={'bottom'}
      outline
      type={'primary'}
      absolute
      placeholder='Absolute'
      data={data}
    />

    <Dropdown
      outline
      type={'primary'}
      placeholder='Default'
      data={data}
      style={{ marginInlineStart: 24 }}
    />
  </div>
);

export default App;

```
### 控制弹层（受控）
Dropdown 通过 open 控制弹层的显示和隐藏
```tsx
/**
 * cn - 控制弹层（受控）
 *    -- Dropdown 通过 open 控制弹层的显示和隐藏
 * en - Controlled
 *    -- Component controlled by open property
 */
import React, { useState } from 'react';
import { Button, Dropdown } from 'shineout';

const menu = new Array(4).fill(null).map((_, index) => ({
  id: `${index}`,
  content: `item${index}`,
}));

const App: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleCollapse = (collapsed: boolean) => {
    setShow(collapsed);
    console.log('控制弹层（受控）:', collapsed);
  };
  return (
    <div style={{ height: 150 }}>
      <Button onClick={() => setShow(true)} style={{ marginInlineEnd: 24 }}>
        Open elastic layer
      </Button>
      <Dropdown onCollapse={handleCollapse} open={show} placeholder='Dropdown' data={menu} />
    </div>
  );
};

export default App;

```
## Guide
### 何时使用
这一功能通常被使用在网页导航菜单、以及其他工具菜单和选项较多的功能使用场景中
### 与布局相关
下拉菜单根据在页面内的布局位置，支持不同的布局方式
### 推荐使用
1、可用作网站或应用程序的导航菜单，用户可以通过点击下拉菜单中的选项访问特定页面或执行操作
2、操作类菜单：用于执行针对某个数据项的操作，例如鼠标右键弹出的上下文菜单
### 慎用示例
1、简化交互，只有 2 个或 1 个可选项时，不建议使用下拉菜单，请让用户直接选择
2、菜单项数量过多时，建议对其进行分组或分级处理


# Editable-area
用于多行输入的文本输入框基础组件
## API
### EditableArea
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|status|\"error\" ||组件状态|
|disabled|boolean |false|是否禁用|
|clearable|boolean |true|是否展示清除按钮|
|placeholder|string ||同原生属性|
|width|string / number ||编辑域宽度|
|maxHeight|string / number ||输入框的最大高度, 超过之后会出现滚动条|
|onBlur|((e: FocusEvent<Element, Element>) => void) ||失去焦点事件|
|onFocus|((e: FocusEvent<Element, Element>) => void) ||聚焦事件|
|getPopupContainer|(() => HTMLElement) ||自定义Popover容器，覆盖默认渲染在body下的行为, () => DOMElement|
|renderFooter|((value?: string ) => ReactNode) ||渲染 textarea footer|
|renderResult|((value: string) => ReactNode) ||自定义显示结果|
|onChange|((value: string) => void) ||值改变后的回调函数|
|value|string ||受控|
|defaultValue|string ||默认值|
|trim|boolean ||trim 为 true 时，失去焦点时会自动删除空白字符|
|bordered|boolean |false|是否显示外边框|
|delay|number ||用户输入触发 onChange 和校验间隔时间，单位 毫秒|
|innerTitle|ReactNode||内嵌标题|
|placeTitle|ReactNode||占位标题，需要配合 innerTitle 一起使用|
|name|Name ||Form 内存取数据的 key|
|beforeChange|((value: T) => void / T ) ||值改变前的回调，当返回值不为空时将作为组件的新值|
|reserveAble|boolean ||设置为 true 组件卸载后表单不自动删除数据|
|rules|RuleItem[]||校验规则 详见 [Rule](/components/rule)|
|onError|((error?: Error ) => void) ||rules 校验回调|
|bind|string[] ||当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用|
## Example
### 基本用法
EditableArea 默认展示一行，超过一行的内容用...代替
```tsx
/**
 * cn - 基本用法
 *    -- EditableArea 默认展示一行，超过一行的内容用...代替
 * en - Base
 *    -- Editablearea displays one line by default, and more than one line is replaced by ...
 */

import React from 'react';
import { EditableArea } from 'shineout';

const App: React.FC = () => <EditableArea width={300} bordered placeholder='input something' />;

export default App;

```
### 受控
传递value, onChange使组件受控
```tsx
/**
 * cn - 受控
 *    -- 传递value, onChange使组件受控
 * en - Controlled
 *    -- Pass value and onChange props to make the component controlled
 */

import React, { useState } from 'react';
import { EditableArea, TYPE } from 'shineout';

type EditableAreaProps = TYPE.EditableArea.Props;
type EditableAreaValue = EditableAreaProps['value'];

const App: React.FC = () => {
  const [value, setValue] = useState<EditableAreaValue>(
    'i am a long text, i am a long text, i am a long text',
  );

  return (
    <EditableArea
      width={300}
      bordered
      value={value}
      placeholder='Input something'
      onChange={(val) => setValue(val)}
      onBlur={() => console.log('EditableArea: onBlur')}
    />
  );
};

export default App;

```
### 自定义容器
在内滚容器中使用此组件，可使用 getPopupContainer 指定渲染的目标容器，使之随之滚动
```tsx
/**
 * cn - 自定义容器
 *    -- 在内滚容器中使用此组件，可使用 getPopupContainer 指定渲染的目标容器，使之随之滚动
 * en - Custom container
 *    -- use getPopupContainer return target container
 */
import React from 'react';
import { EditableArea } from 'shineout';

const App: React.FC = () => {
  const container = (): HTMLElement => document.querySelector('#popup-target')!;
  return (
    <div
      id='popup-target'
      style={{ height: 100, overflowY: 'auto', position: 'relative', padding: 10, marginLeft: -10 }}
    >
      <div style={{ height: 50 }} />

      <EditableArea
        bordered
        width={300}
        maxHeight={100}
        placeholder='scroll in container'
        getPopupContainer={container}
      />

      <div style={{ height: 140 }} />
    </div>
  );
};

export default App;

```
### 渲染 textarea footer
在输入框内嵌入标题
```tsx
/**
 * cn - 渲染 textarea footer
 *    -- 在输入框内嵌入标题
 * en - RenderFooter
 *    -- render textarea footer
 */

import React from 'react';
import { EditableArea, TYPE } from 'shineout';

type EditableAreaProps = TYPE.EditableArea.Props;
type EditableAreaRenderFooter = EditableAreaProps['renderFooter'];

const App: React.FC = () => {
  const renderFooter: EditableAreaRenderFooter = () => <div>Tip</div>;

  return (
    <div>
      <EditableArea
        width={300}
        bordered
        renderFooter={renderFooter}
        placeholder='input something'
      />
    </div>
  );
};

export default App;

```
### 自定义显示结果
自定义显示结果
```tsx
/**
 * cn - 自定义显示结果
 *    -- 自定义显示结果
 * en - RenderResult
 *    -- Customize display results
 */

import React from 'react';
import { EditableArea, TYPE } from 'shineout';

type EditableAreaProps = TYPE.EditableArea.Props;
type EditableAreaRenderResult = EditableAreaProps['renderResult'];

const App: React.FC = () => {
  const renderResult: EditableAreaRenderResult = () => <div>Guessing what I inputed ?</div>;

  return (
    <div>
      <EditableArea
        width={300}
        bordered
        renderResult={renderResult}
        placeholder='input something'
      />
    </div>
  );
};

export default App;

```
## Guide
### 何时使用
当用户有多行信息输入的需求时，可使用该组件
### 与组件搭配使用
在表格内输入内容交互：输如内容撑高编辑框，编辑框覆盖在表格之上，不撑高表格的行高，编辑框内不出现竖向滚动条，输入完成之后，超出编辑框的内容...截断


# Empty
空状态时的展示占位图
## API
### Empty
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|imgSrc|string ||空状态图片地址,优先级高于icon|
|icon|ReactNode||空状态图标|
|description|ReactNode||描述,若为false则不显示描述|
## Example
### 基本用法
空状态组件的基础用法
```tsx
/**
 * cn - 基本用法
 *    -- 空状态组件的基础用法
 * en - Basic
 *    -- The basic usage of Empty
 */
import React from 'react';
import { Empty } from 'shineout';

export default () => {
  return <Empty></Empty>;
};

```
### 自定义图标和文案
设置<span>icon</span>和<span>description</span>属性可以自定义图标和文案
```tsx
/**
 * cn - 自定义图标和文案
 *    -- 设置`icon`和`description`属性可以自定义图标和文案
 * en - Custom icon and description
 *    -- Set the `icon` and `description` property to customize the icon and description
 */
import React from 'react';
import { Empty } from 'shineout';
import { customIcon } from './static/icon';

export default () => {
  return <Empty icon={customIcon} description='No network'></Empty>;
};

```
### 自定义图片
设置<span>imgSrc</span>参数传入图片的Url
```tsx
/**
 * cn - 自定义图片
 *    -- 设置`imgSrc`参数传入图片的Url
 * en - Custom image
 *    -- Set the `imgSrc` parameter to the Url of the image
 */
import React from 'react';
import { Empty, Button } from 'shineout';

export default () => {
  const renderDescription = () => {
    return <Button type='primary'>Refresh</Button>;
  };
  return (
    <Empty
      imgSrc='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
      description={renderDescription()}
    ></Empty>
  );
};

```
### 推荐状态
推荐空状态的类型
```tsx
/**
 * cn - 推荐状态
 *    -- 推荐空状态的类型
 * en - Status
 *    -- The recommended status type of Empty
 */
import React from 'react';
import { Message } from 'shineout';
import {
  noData,
  noResult,
  noAuth,
  noInternet,
  web404,
  error,
  noDataColorful,
  noResultColorful,
  noAuthColorful,
  noInternetColorful,
  web404Colorful,
  errorColorful,
} from './static/icon';

export default () => {
  const handleCopy = (id: string) => {
    const icon = document.getElementById(id)!.innerHTML;
    navigator?.clipboard?.writeText(icon);
    Message.success('svg copied successfully', 1, {
      hideClose: true,
    });
  };

  const renderIcon = (icon: React.ReactNode, id: string, name: string) => {
    return (
      <div style={{ width: 100, cursor: 'pointer' }} onClick={() => handleCopy(id)}>
        <div id={id}>{icon}</div>
        <div
          style={{
            fontSize: 14,
            color: '#999DA8',
            lineHeight: '20px',
            textAlign: 'center',
            marginTop: 8,
          }}
        >
          {name}
        </div>
      </div>
    );
  };
  return (
    <div>
      <div
        style={{
          marginBottom: 32,
          display: 'flex',
          gap: 32,
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
          overflow: 'auto',
        }}
      >
        {renderIcon(noData, 'noData', 'No data')}
        {renderIcon(noResult, 'noResult', 'Search results are empty')}
        {renderIcon(noAuth, 'noAuth', 'No permission yet')}
        {renderIcon(noInternet, 'noInternet', 'No network')}
        {renderIcon(web404, 'web404', '404')}
        {renderIcon(error, 'error', 'Failed to load')}
      </div>
      <div
        style={{
          display: 'flex',
          gap: 32,
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
          overflow: 'auto',
        }}
      >
        {renderIcon(noDataColorful, 'noDataColorful', 'No data')}
        {renderIcon(noResultColorful, 'noResultColorful', 'Search results are empty')}
        {renderIcon(noAuthColorful, 'noAuthColorful', 'No permission yet')}
        {renderIcon(noInternetColorful, 'noInternetColorful', 'No network')}
        {renderIcon(web404Colorful, 'web404Colorful', '404')}
        {renderIcon(errorColorful, 'errorColorful', 'Failed to load')}
      </div>
    </div>
  );
};

```
## Guide
### 何时使用

### 组件搭配使用
和文字按钮的搭配使用，引导用户下一步的操作
### 推荐/慎用示例
空状态图标大小，需要根据放置的容器大小来调整相对应的尺寸


# Form
用以收集、校验和提交数据，一般由输入框、单选框、复选框、选择器等控件组成
## API
### FormRef
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|getValue|(name?: string ) => any||返回表单的值|
|validate|() => Promise<any>||校验表单|
|validateFields|(fields: string / string[]) => Promise<any>||校验表单指定字段|
|validateFieldsWithError|(fields: string / string[]) => Promise<any>||校验可以通过 catch 获取报错信息|
|clearValidate|() => void||清除校验|
|submit|(withValidate?: boolean ) => void||提交表单, withValidate: 是否校验|
|reset|() => void||重置表单|
### Form.Item
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|label|ReactNode||未定义时，标签不会 render，也不会占位。如果无内容需要占位，使用空字符串 \"\"。|
|tip|ReactNode||提示文案|
|required|boolean |false|必填标记，纯展示用，不会触发校验|
|children|ReactNode||表单元素|
|labelWidth|string / number |140px|标签宽度，labelAlign 为 \"top\" 时无效。|
|labelAlign|\"left\" / \"right\" / \"top\" ||默认为空，跟随主题样式。|
|labelVerticalAlign|\"top\" / \"bottom\" / \"middle\" |\"top\"|默认顶部对齐|
|keepErrorHeight|boolean |false|单行错误提示不撑开页面高度|
|inline|boolean |false|是否水平布局|
### Form.Field
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|name|string / string[]||表单字段, 配合 Form 使用|
|reserveAble|boolean ||设置为 true 组件卸载后表单不自动删除数据|
|defaultValue|T ||默认值|
|rules|RuleItem[]||校验规则 详见 [Rule](/components/rule)|
|children|((opts: object) => ReactNode) / ReactNode||支持 value 和 onChange 的 React 组件，或者函数，函数object属性如下\nvalue: 根据 name 从上级 Form 或 Form.Block 获取的值\nerror：数据校验错误信息，类型为 Error\nonChange: 值改变回调函数\ndisabled: 继承 Form 的 disabled 属性|
|onError|((error?: Error ) => void) ||rules 校验回调|
|bind|string[] ||当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用|
### Form.FieldSet
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|name|string||从 Form 中存取数据的名称|
|children|((opts: object) => ReactNode) /ReactNode||children 不为 function，用来处理 object 类型数据，children 内的 name 会拼接 FieldSet name，如 FieldSet name 为 \"a\", children 元素name 为 b，children 实际处理的数据为 a.b;\nchildren 为 function 时，用来处理数组数据。options 属性为\nlist: name 下的全部数据。\nvalue: 根据name获取的值的单条数据。\nonChange: 子组件数据改变回调。\nonRemove: 子组件删除回调。\nindex: 当前项索引。\nonInsert: 在当前项之前插入一条数据。\nonAppend: 在当前项之后附加一条数据。|
|empty|((insert: (val: any) => void) => ReactNode) ||数据为空时展示内容。（仅在children为function时有效）|
|defaultValue|T ||默认值|
|reserveAble|boolean ||设置为 true 组件卸载后表单不自动删除数据|
|rules|RuleItem[]||校验规则 详见 Rule|
### Form.Flow
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|children|(datum: FormDatum) => ReactNode||datum 为 Datum.Form 对象|
|names|string[] ||names 为空时，Form 内任意值变化会触发 Flow 更新；不为空时，只监听指定字段变化|
### Form
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|value|object||表单数据|
|onChange|((value: T) => void) ||表单内组件值变化函数|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|children|ReactNode||Form 内容|
|labelWidth|string / number |140px|标签宽度，labelAlign 为 \"top\" 时无效。|
|labelAlign|\"left\" / \"right\" / \"top\" ||默认为空，跟随主题样式。|
|labelVerticalAlign|\"top\" / \"bottom\" / \"middle\" |\"top\"|默认顶部对齐|
|keepErrorHeight|boolean |false|单行错误提示不撑开页面高度|
|inline|boolean |false|是否水平布局|
|defaultValue|T ||默认值|
|rules|RuleItem[]||校验规则|
|onError|((error: Error) => void) ||rules 校验回调|
|initValidate|boolean ||设置 value 后是否自动校验|
|onSubmit|((value: T) => void) ||表单提交函数。表单内部校验失败时不会触发。|
|onReset|(() => void) ||表单重置函数|
|scrollToError|number / boolean |false|校验失败时是否滚动到第一个校验失败组件，该值为数字时，表示相对于顶部的偏移量|
|removeUndefined|boolean |true|是否删除值为 undefined 的字段|
|throttle|number |1000|ms, 两次提交间隔时长（防止重复提交)|
|scrollParent|(() => HTMLElement / null) ||滚动的父元素，用于滚动到错误位置增加偏移量|
|disabled|boolean |false|是否禁用，为 true 时，表单内所有元素 disabled 都为 true|
|size|\"small\" / \"default\" / \"large\" |\"default\"|表单元素的尺寸|
|formRef|((form: FormRef<V>) => void) / { current?: FormRef<V> ; } ||绑定 form 的引用, 可以调用某些 form 的方法|
## Example
### 基本用法
表单内置了类似双向绑定的机制，根据表单元素的 name 属性自动下发、收集数据
```tsx
/**
 * cn - 基本用法
 *    -- 表单内置了类似双向绑定的机制，根据表单元素的 name 属性自动下发、收集数据
 * en - Basic usage
 *    -- The form has built-in two-way binding mechanism, which automatically issues and collects data based on the name attribute of the form element
 */

import { Form, Input, Upload, Radio, Checkbox, DatePicker, Rate, Textarea } from 'shineout';

const star = (
  <svg viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path d='M8.276 7.825L1.85649 8.7559L1.74278 8.77878C1.00761 8.96968 0.736859 9.90915 1.30093 10.4606L5.953 15.008L4.84231 21.3268L4.82911 21.4327C4.77288 22.2003 5.59415 22.7575 6.29763 22.3824L11.999 19.343L17.7023 22.3825L17.7988 22.4279C18.5105 22.7194 19.2948 22.1128 19.1578 21.3281L18.054 15.008L22.6997 10.46L22.7779 10.3745C23.2586 9.78723 22.9242 8.86973 22.1443 8.75601L15.758 7.825L12.895 2.05544C12.5264 1.31273 11.4661 1.31545 11.1013 2.06004L8.276 7.825Z' />
  </svg>
);

const StarRate = Rate(star, star);

export default () => {
  return (
    <div>
      <Form
        defaultValue={{ name: 'zhangsan', email: 'zhangsan@qq.com', score: 3 }}
        onSubmit={(v) => {
          console.log('form submit', v);
        }}
        onChange={(v) => {
          console.log('form change', v);
        }}
        onReset={() => {
          console.log('form reset');
        }}
      >
        <Form.Item label='Name'>
          <Input name={'name'} placeholder='please input name' clearable />
        </Form.Item>
        <Form.Item label='Password'>
          <Input name={'password'} placeholder='please input password' clearable />
        </Form.Item>
        <Form.Item label='Email'>
          <Input name={'email'} clearable placeholder='please input email' />
        </Form.Item>
        <Form.Item label='Gendar'>
          <Radio.Group name='gendar' data={['male', 'female']} keygen />
        </Form.Item>
        <Form.Item label='Course'>
          <Checkbox.Group name='course' data={['chinese', 'maths', 'english', 'physics']} keygen />
        </Form.Item>
        <Form.Item label='Enrollment date'>
          <DatePicker name='date' placeholder={'please select date'} clearable showSelNow />
        </Form.Item>
        <Form.Item label='Score'>
          <StarRate name='score'></StarRate>
        </Form.Item>
        <Form.Item label='upload avatar'>
          <Upload.Image
            action='/api/upload'
            accept='image/*'
            name='file'
            htmlName='file'
            recoverAble
            leftHandler
            removeConfirm='Are you sure to delete it ?'
            limit={3}
            onSuccess={(_res, filem, data) => {
              return data;
            }}
          />
        </Form.Item>
        <Form.Item label='Address'>
          <Textarea name='address' />
        </Form.Item>

        <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
          <Form.Submit>Submit</Form.Submit>
          <Form.Reset>Reset</Form.Reset>
        </Form.Item>
      </Form>
    </div>
  );
};

```
### 表单方法
可以通过 formRef 去获得表单的一些方法集, 包含校验, 清空校验, 提交等
```tsx
/**
 * cn - 表单方法
 *    -- 可以通过 formRef 去获得表单的一些方法集, 包含校验, 清空校验, 提交等
 * en - Form Methods
 *    -- You can use formRef to get some methods of the form, including validation, clear validation, submission, etc
 */
import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, TYPE, Button } from 'shineout';

type ValueType = {
  name?: string;
};
type FormRef = TYPE.Form.Ref<any>;

const App: React.FC = () => {
  const form = useRef<FormRef>();
  const [value, setValue] = useState<ValueType>({});

  useEffect(() => {}, []);

  return (
    <Form
      value={value}
      formRef={(formRef) => {
        form.current = formRef;
      }}
      onChange={(v) => {
        setValue(v);
      }}
      onSubmit={(data) => {
        console.log(data);
      }}
    >
      <div style={{ margin: '0 0 24px 0' }}>
        <Button onClick={() => form.current?.reset()}>reset</Button>
        <Button onClick={() => form.current?.submit()}>submit</Button>
        <Button
          onClick={() =>
            form.current?.validate().catch((e) => {
              console.error(e);
            })
          }
        >
          validate
        </Button>
        <Button onClick={() => form.current?.clearValidate()}>clear validate</Button>
        <Button onClick={() => console.log(form.current?.getValue())}>get value</Button>
        <Button onClick={() => form.current?.submit(false)}>submit without validate</Button>
      </div>

      <Form.Item label='name' required>
        <Input name='name' rules={[{ required: true, message: 'name is required' }]} clearable />
      </Form.Item>

      <Form.Item label='Password' required>
        <Input.Password
          clearable
          name='password'
          rules={[{ required: true, message: 'password is required' }]}
        />
      </Form.Item>

      <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
        <Form.Submit>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  );
};

export default App;

```
### 标签对齐方式
通过 labelWidth 和 labelAlign 改变标签宽度和水平对齐方式
```tsx
/**
 * cn - 标签对齐方式
 *    -- 通过 labelWidth 和 labelAlign 改变标签宽度和水平对齐方式
 * en -
 *    --
 */

import { useState } from 'react';
import { Form, Input, TYPE, Radio } from 'shineout';

type FormProps = TYPE.Form.Props<any>;

const alignArr: FormProps['labelAlign'][] = ['left', 'top', 'right'];
export default () => {
  const [align, setAlign] = useState<FormProps['labelAlign']>('right');

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Radio.Group value={align} data={alignArr} keygen onChange={setAlign} />
      </div>
      <Form labelWidth={65} labelAlign={align} style={{ maxWidth: 500 }}>
        <Form.Item label='Email'>
          <Input name='email' clearable />
        </Form.Item>

        <Form.Item label='Password'>
          <Input name='password' type='password' clearable />
        </Form.Item>

        <Form.Item label='' style={{ marginTop: align === 'top' ? -10 : 32, marginBottom: 0 }}>
          <Form.Submit>Submit</Form.Submit>
        </Form.Item>
      </Form>
    </div>
  );
};

```
### 
当 label 文字存在换行时，可使用 labelVerticalAlign 来控制垂直方向对齐方式
```tsx
/**
 * cn -
 *    -- 当 label 文字存在换行时，可使用 labelVerticalAlign 来控制垂直方向对齐方式
 * en -
 *    -- When the label text has a line break, you can use labelVerticalAlign to control the vertical alignment
 */

import { useState } from 'react';
import { Form, Input, TYPE, Radio, Textarea } from 'shineout';

type FormProps = TYPE.Form.Props<any>;

const alignArr: FormProps['labelVerticalAlign'][] = ['bottom', 'top', 'middle'];

export default () => {
  const [align, setAlign] = useState<FormProps['labelVerticalAlign']>('top');
  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <Radio.Group value={align} data={alignArr} keygen onChange={setAlign} />
      </div>
      <Form labelWidth={65} labelVerticalAlign={align} style={{ maxWidth: 500 }}>
        <Form.Item label='Your Email'>
          <Input name='email' clearable />
        </Form.Item>

        <Form.Item label='Password'>
          <Input name='password' type='password' clearable />
        </Form.Item>
        <Form.Item label='Your Address'>
          <Textarea name='address' />
        </Form.Item>
        <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
          <Form.Submit>Submit</Form.Submit>
        </Form.Item>
      </Form>
    </>
  );
};

```
### 水平布局
设置 inline 属性使 Form 变为水平布局
```tsx
/**
 * cn - 水平布局
 *    -- 设置 inline 属性使 Form 变为水平布局
 * en - Inline
 *    -- Set the inline property to true to make the Form horizontal
 */
import React from 'react';
import { Form, Input } from 'shineout';

const App: React.FC = () => (
  <Form inline labelWidth={65}>
    <Form.Item label='Email' style={{ marginBottom: 0, marginRight: 24 }}>
      <Input name='email' clearable />
    </Form.Item>

    <Form.Item label='password' style={{ marginBottom: 0, marginRight: 24 }}>
      <Input name='password' placeholder='Password' type='password' clearable />
    </Form.Item>

    <Form.Submit>Submit</Form.Submit>
  </Form>
);

export default App;

```
### 提示信息
在 Form.Item 上设置提示文案时，提示文案始终显示在组件下方
```tsx
/**
 * cn - 提示信息
 *    -- 在 Form.Item 上设置提示文案时，提示文案始终显示在组件下方
 * en - Tips
 *    -- Set the tip property on Form.Item, the prompt text is displayed below the component
 */
import React from 'react';
import { Form, Input } from 'shineout';

const App: React.FC = () => (
  <Form style={{ maxWidth: 500 }}>
    <Form.Item label='Email' tip='Email or nickname or phonenumber'>
      <Input name='email' clearable />
    </Form.Item>

    <Form.Item
      label='Password'
      tip='Use at least one letter, one numeral, and seven characters.'
      style={{ marginBottom: 0 }}
    >
      <Input name='password' type='password' clearable />
    </Form.Item>
  </Form>
);

export default App;

```
### 基础校验
通过 Rule 对象，可以使用内置的规则。规则详见 Rule
```tsx
/**
 * cn - 基础校验
 *    -- 通过 Rule 对象，可以使用内置的规则。规则详见 Rule
 * en - validate
 *    -- Use the built-in rules through the Rule object. See Rule for details
 */

import React, { useState, useCallback } from 'react';
import { Form, Input, Checkbox, Rule, Button, TYPE } from 'shineout';

interface Value {
  age?: string;
  tel?: string;
  name?: string;
  IPv4?: string;
  email?: string;
  password?: string;
  colors?: string[];
}
type FormProps = TYPE.Form.Props<Value>;
type FormValue = FormProps['value'];
type FormRef = TYPE.Form.Ref<any>;
type RuleFunc = TYPE.Rule.ValidFunc;

const password = {
  func: (value: string, _formData: any, _cb: any, props: { message: string; title: string }) =>
    new Promise((resolve, reject) => {
      console.log('password', props);
      if (!/\d+/.test(value) || !/[a-z]+/i.test(value)) {
        reject(new Error(props.message.replace('{title}', props.title)));
      } else {
        resolve(true);
      }
    }),
};

const isExist: RuleFunc = (value, _, callback) => {
  if (value.indexOf('so') >= 0) callback(new Error(`"${value}" is existed.`));
  else callback(true);
};

const rules = Rule(
  // validate function package
  {
    password,
    isExist,
  },
  // language package
  {
    password: {
      message: '{title} at least has one numeral and one letter',
    },
  },
);

const App: React.FC = () => {
  const [ref, setRef] = useState<FormRef>();
  const [value, setValue] = useState<FormValue>(undefined);

  const validFields = useCallback(() => {
    if (ref && ref.validateFields) {
      ref.validateFields(['email', 'name']);
    }
  }, [ref]);

  return (
    <Form
      value={value}
      scrollToError={200}
      scrollParent={() => document.getElementById('layout')}
      onChange={setValue}
      formRef={(f) => setRef(f)}
      style={{ maxWidth: 500 }}
      onSubmit={(d) => console.log(d)}
    >
      <Form.Item required label='Email'>
        <Input name='email' title='Email' rules={[rules.required, rules.email]} clearable />
      </Form.Item>

      <Form.Item required label='Name'>
        <Input name='name' title='Name' rules={[rules.required, rules.isExist]} clearable />
      </Form.Item>

      <Form.Item
        required
        label='Password'
        tip='At least one letter, one numeral, and 6 - 20 characters.'
      >
        <Input
          name='password'
          title='Password'
          type='password'
          clearable
          rules={[rules.required, rules.range(6, 20), rules.password]}
        />
      </Form.Item>

      <Form.Item required label='Age' tip='between 18 and 60'>
        <Input
          name='age'
          title='Age'
          style={{ width: 100 }}
          type='integer'
          clearable
          rules={[rules.required, rules.integer, rules.range(18, 60)]}
        />
      </Form.Item>

      <Form.Item required label='Tel'>
        <Input
          name='tel'
          title='Tel'
          rules={[rules.required, rules.regExp('^[\\d\\s ().-]+$')]}
          clearable
        />
      </Form.Item>

      <Form.Item required label='IPv4'>
        <Input name='IPv4' title='IP' rules={[rules.required, rules.ipv4]} clearable />
      </Form.Item>

      <Form.Item required label='Favorite Colors' tip='select your favorite colors'>
        <Checkbox.Group
          name='colors'
          keygen={(d) => d}
          data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']}
          defaultValue={[]}
          renderItem={(d) => <div style={{ width: 40 }}>{d}</div>}
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: 4,
          }}
          rules={[rules.required('At least select one favorite color'), rules.min(2), rules.max(3)]}
        />
      </Form.Item>

      <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
        <Form.Button>Sumbit</Form.Button>
        <Form.Reset>Reset</Form.Reset>
        <Button onClick={validFields}>Validate Some Field</Button>
      </Form.Item>
    </Form>
  );
};

export default App;

```
### 联动校验
使用 <span>bind</span> 属性进行联动校验
```tsx
/**
 * cn - 联动校验
 *    -- 使用 `bind` 属性进行联动校验
 * en - Bind validate
 *    -- Use the `bind` property for bind validate
 */
import { Form, Input } from 'shineout';
import React from 'react';

export default () => {
  const [v, setV] = React.useState({});
  return (
    <div>
      <Form
        value={v}
        onSubmit={(v) => {
          console.log('form submit', v);
        }}
        onChange={(v) => {
          setV(v);
          console.log('form change', v);
        }}
        onReset={() => {
          console.log('form reset');
        }}
      >
        <Form.Item label='password'>
          <Input.Password
            bind={['repeat']}
            rules={[
              (value, _, callback, _prop) => {
                if (!value) {
                  callback(new Error('password is required'));
                }
                if (value && value.length > 10) {
                  callback(new Error('password length must less than 10'));
                }
                callback(true);
              },
            ]}
            name={'password'}
            clearable
            placeholder='please input password'
          />
        </Form.Item>
        <Form.Item label='repeat'>
          <Input.Password
            name={'repeat'}
            rules={[
              (value, formValue, callback, _prop) => {
                if (!value) {
                  callback(new Error('repeat is required'));
                }
                if (value && value !== formValue.password) {
                  callback(new Error('Two inputs are inconsistent'));
                }
                callback(true);
              },
            ]}
            clearable
            placeholder='please input password again'
          />
        </Form.Item>

        <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
          <Form.Submit>Submit</Form.Submit>
          <Form.Reset>Reset</Form.Reset>
        </Form.Item>
      </Form>
    </div>
  );
};

```
### 服务端校验
通过给 Form 设置 <span>error</span>，实现后端校验数据展示
在表单值被改变后，对应后端校验数据会被清空
前端校验优先级大于后端校验
```tsx
/**
 * cn - 服务端校验
 *    -- 通过给 Form 设置 `error`，实现后端校验数据展示
 *    -- 在表单值被改变后，对应后端校验数据会被清空
 *    -- 前端校验优先级大于后端校验
 * en - Back-end validation
 *    -- By setting an `error` on the Form, the back-end validation data is presented. After the form value is changed, the corresponding back-end validation data is cleared
 *    -- front-end validation priority is greater than back-end validation
 */
import React, { useState } from 'react';
import { Form, Input, Rule } from 'shineout';

const rules = Rule();

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ [key: string]: string }>({});

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError({ email: 'The email has been registered' });
    }, 1000);
  };

  return (
    <Form disabled={loading} error={error} style={{ maxWidth: 500 }} onSubmit={handleSubmit}>
      <Form.Item required label='Email'>
        <Input name='email' title='Email' rules={[rules.required, rules.email]} clearable />
      </Form.Item>

      <Form.Item required label='Name'>
        <Input name='name' title='Name' rules={[rules.required]} clearable />
      </Form.Item>

      <Form.Item
        required
        label='Password'
        tip='At least one letter, one numeral, and 6 - 20 characters.'
      >
        <Input
          name='password'
          title='Password'
          type='password'
          clearable
          rules={[rules.required, rules.range(6, 20)]}
        />
      </Form.Item>

      <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
        <Form.Button loading={loading}>Sumbit</Form.Button>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  );
};

export default App;

```
### 校验样式
使用 <span>keepErrorHeight</span> 使得单行错误提示不会撑开页面高度
```tsx
/**
 * cn - 校验样式
 *    -- 使用 `keepErrorHeight` 使得单行错误提示不会撑开页面高度
 * en - validate style
 *    -- Use `keepErrorHeight` so that a single-line error prompt will not stretch the page height
 */

import React, { useState } from 'react';
import { Form, Input, Checkbox, Rule, TYPE } from 'shineout';

interface Value {
  age?: string;
  tel?: string;
  name?: string;
  IPv4?: string;
  email?: string;
  password?: string;
  colors?: string[];
}
type FormProps = TYPE.Form.Props<Value>;
type FormValue = FormProps['value'];
type RuleFunc = TYPE.Rule.ValidFunc;

const password = {
  func: (value: string, _formData: any, _cb: any, props: { message: string; title: string }) =>
    new Promise((resolve, reject) => {
      console.log('password', props);
      if (!/\d+/.test(value) || !/[a-z]+/i.test(value)) {
        reject(new Error(props.message.replace('{title}', props.title)));
      } else {
        resolve(true);
      }
    }),
};

const isExist: RuleFunc = (value, _, callback) => {
  if (value.indexOf('so') >= 0) callback(new Error(`"${value}" is existed.`));
  else callback(true);
};

const rules = Rule(
  // validate function package
  {
    password,
    isExist,
  },
  // language package
  {
    password: {
      message: '{title} at least has one numeral and one letter',
    },
  },
);

const App: React.FC = () => {
  const [value, setValue] = useState<FormValue>(undefined);

  return (
    <Form
      value={value}
      scrollParent={() => document.getElementById('layout')}
      onChange={setValue}
      style={{ maxWidth: 500 }}
      onSubmit={(d) => console.log(d)}
      keepErrorHeight
    >
      <Form.Item required label='Email' tip="88888">
        <Input name='email' title='Email' rules={[rules.required, rules.email]} clearable />
      </Form.Item>

      <Form.Item required label='Name'>
        <Input name='name' title='Name' rules={[rules.required, rules.isExist]} clearable />
      </Form.Item>

      <Form.Item
        required
        label='Password'
        tip='At least one letter, one numeral, and 6 - 20 characters.'
      >
        <Input
          name='password'
          title='Password'
          type='password'
          clearable
          rules={[rules.required, rules.range(6, 20), rules.password]}
        />
      </Form.Item>

      <Form.Item required label='Age' tip='between 18 and 60'>
        <Input
          name='age'
          title='Age'
          style={{ width: 100 }}
          type='integer'
          clearable
          rules={[rules.required, rules.integer, rules.range(18, 60)]}
        />
      </Form.Item>

      <Form.Item required label='Tel'>
        <Input
          name='tel'
          title='Tel'
          rules={[rules.required, rules.regExp('^[\\d\\s ().-]+$')]}
          clearable
        />
      </Form.Item>

      <Form.Item required label='IPv4'>
        <Input name='IPv4' title='IP' rules={[rules.required, rules.ipv4]} clearable />
      </Form.Item>

      <Form.Item required label='Favorite Colors' tip='select your favorite colors'>
        <Checkbox.Group
          name='colors'
          keygen={(d) => d}
          data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']}
          defaultValue={[]}
          renderItem={(d) => <div style={{ width: 40 }}>{d}</div>}
          rules={[rules.required('At least select one favorite color'), rules.min(2), rules.max(3)]}
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: 4,
          }}
        />
      </Form.Item>

      <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
        <Form.Button>Sumbit</Form.Button>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  );
};

export default App;

```
### 禁用
使用 disabled 属性使表单内支持 disabled 属性的组件禁用，通常用在表单数据加载或提交时
```tsx
/**
 * cn - 禁用
 *    -- 使用 disabled 属性使表单内支持 disabled 属性的组件禁用，通常用在表单数据加载或提交时
 * en - Disabled
 *    -- Use the disabled property to make the Form support to disable component
 */
import React from 'react';
import { Form, Input, Textarea } from 'shineout';

const App: React.FC = () => (
  <Form disabled>
    <Form.Item label='Email'>
      <Input name='email' clearable />
    </Form.Item>
    <Form.Item label='Email2'>
      <Input clearable />
    </Form.Item>

    <Form.Item label='Password'>
      <Input name='password' type='password' clearable />
    </Form.Item>

    <Form.Item label='Name'>
      <Input.Group style={{ width: 300 }} disabled>
        <Input name='firstName' placeholder='First Name' clearable />
        -
        <Input name='lastName' placeholder='Last Name' clearable />
      </Input.Group>
    </Form.Item>

    <Form.Item label='Age'>
      <Input.Number
        style={{ width: 100 }}
        name='age'
        type='number'
        digits={0}
        defaultValue='0'
        clearable
      />
    </Form.Item>
    <Form.Item label='address'>
      <Textarea rows={2} name='address' defaultValue='xxx' />
    </Form.Item>
    <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
      <Form.Submit loading>Submit</Form.Submit>
      <Form.Reset>Reset</Form.Reset>
    </Form.Item>
  </Form>
);

export default App;

```
### 字段
支持 value 和 onChange 的组件可以放在 Form.Field 中
children 为 ReactElement时，必须支持 value 和 onChange 属性
children 为 Function 时，返回一个或一组 ReactElement，在函数内部自行处理 value 和 onChange
```tsx
/**
 * cn - 字段
 *    -- 支持 value 和 onChange 的组件可以放在 Form.Field 中
 *    -- children 为 ReactElement时，必须支持 value 和 onChange 属性
 *    -- children 为 Function 时，返回一个或一组 ReactElement，在函数内部自行处理 value 和 onChange
 * en - Field
 *    -- Components that support value property and onChange property can be put in a Form.Field
 *    -- When the children property is a ReactElement, the value and onChange property must be provided
 *    -- When the children property is a function, return one or one group of ReactElement
 */
import React from 'react';
import { Form, Rule } from 'shineout';

function Input(props: any) {
  const { value = '', status, onChange } = props;
  const style = { border: `solid 1px ${status === 'error' ? 'red' : '#ccc'}`, outline: 'none' };
  return (
    <input
      {...props}
      style={style}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}
const rule = Rule();
const App: React.FC = () => (
  <Form style={{ maxWidth: 500 }} onSubmit={(d) => console.log(d)}>
    <Form.Item required label='Email'>
      <Form.Field
        name='email'
        defaultValue='test@email.com'
        rules={[rule.required('不能为空'), rule.email('格式不正确')]}
      >
        {({ value, onChange, status }) => (
          <Input value={value || ''} status={status} onChange={onChange} type='text' />
        )}
      </Form.Field>
    </Form.Item>

    <Form.Item label='Password' tip='Use at least one letter, one numeral, and seven characters.'>
      <Form.Field
        name='password'
        rules={[
          rule.required,
          rule.min(7, '不能小于7个字符'),
          rule.regExp(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, '格式不正确'),
        ]}
      >
        <Input type='password' />
      </Form.Field>
    </Form.Item>

    <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
      <Form.Submit>Submit</Form.Submit>
    </Form.Item>
  </Form>
);

export default App;

```
### FieldSet (Object)
Form.FieldSet 可以处理对象类型的字段
```tsx
/**
 * cn - FieldSet (Object)
 *    -- Form.FieldSet 可以处理对象类型的字段
 * en - FieldSet (Object)
 *    -- Form.FieldSet handles fields of object type
 */
import React, { useState } from 'react';
import { Form, Input } from 'shineout';

interface Value {
  account?: {
    name?: {
      firstName: string;
      lastName: string;
    };
    age?: number;
  };
}

const App: React.FC = () => {
  const [value, setValue] = useState<Value>({
    account: {
      name: {
        firstName: 'James',
        lastName: 'Potter',
      },
      age: 20,
    },
  });

  const handleChange = (v: Value) => {
    setValue(v);
  };

  return (
    <Form
      value={value}
      labelWidth={60}
      onChange={handleChange}
      onSubmit={(data) => {
        console.log(data);
      }}
    >
      <Form.Item label='Account'>
        <Form.FieldSet name='account'>
          <Form.Item label='Name'>
            <Form.FieldSet name='name'>
              <Input.Group style={{ width: 300 }}>
                <Input name='firstName' placeholder='First Name' clearable />
                -
                <Input name='lastName' placeholder='Last Name' clearable />
              </Input.Group>
            </Form.FieldSet>
          </Form.Item>
          <Form.Item label='Age'>
            <Input
              name='age'
              digits={0}
              title='age'
              type='number'
              defaultValue='18'
              style={{ width: 100 }}
              clearable
            />
          </Form.Item>
        </Form.FieldSet>
      </Form.Item>
      {/* <Form.Item label='333'>
        <Input name="333"></Input>
      </Form.Item> */}
      <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
        <Form.Submit>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  );
};

export default App;

```
### FieldSet (Loop)
FieldSet children 为函数时，根据 name 从 Form 中获取 value （类型为 array），遍历这个 value 生成一组子组件
```tsx
/**
 * cn - FieldSet (Loop)
 *    -- FieldSet children 为函数时，根据 name 从 Form 中获取 value （类型为 array），遍历这个 value 生成一组子组件
 * en - FieldSet (Loop)
 *    -- When FieldSet's children is a function, takes the value (type is array) from the form by the name property, and generate a set of subcomponents
 */
import React, { useState } from 'react';
import { Form, Input, Rule } from 'shineout';

interface FriendsItem {
  name?: string;
  age?: string;
}
interface Value {
  name?: string;
  age?: string;
  friends?: FriendsItem[];
}

const rules = Rule();

const add = (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_2710_88158)'>
      <path
        d='M8.00008 0.666626C12.0502 0.666626 15.3334 3.94987 15.3334 7.99996C15.3334 12.05 12.0502 15.3333 8.00008 15.3333C3.94999 15.3333 0.666748 12.05 0.666748 7.99996C0.666748 3.94987 3.94999 0.666626 8.00008 0.666626ZM8.00008 4.66663C7.63189 4.66663 7.33341 4.9651 7.33341 5.33329V7.33329H5.33341C4.99152 7.33329 4.70974 7.59065 4.67123 7.92221L4.66675 7.99996C4.66675 8.36815 4.96522 8.66663 5.33341 8.66663H7.33341V10.6666C7.33341 11.0085 7.59077 11.2903 7.92233 11.3288L8.00008 11.3333C8.36827 11.3333 8.66675 11.0348 8.66675 10.6666V8.66663H10.6667C11.0086 8.66663 11.2904 8.40927 11.3289 8.07771L11.3334 7.99996C11.3334 7.63177 11.0349 7.33329 10.6667 7.33329H8.66675V5.33329C8.66675 4.9914 8.40939 4.70962 8.07783 4.67111L8.00008 4.66663Z'
        fill='#197AFA'
      />
    </g>
    <defs>
      <clipPath id='clip0_2710_88158'>
        <rect width='16' height='16' fill='white' />
      </clipPath>
    </defs>
  </svg>
);

const cancel = (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_2710_88189)'>
      <path
        d='M8.00008 0.666626C3.94999 0.666626 0.666748 3.94987 0.666748 7.99996C0.666748 12.05 3.94999 15.3333 8.00008 15.3333C12.0502 15.3333 15.3334 12.05 15.3334 7.99996C15.3334 3.94987 12.0502 0.666626 8.00008 0.666626ZM11.3334 7.99996C11.3334 8.36815 11.0349 8.66663 10.6667 8.66663H5.33341C4.96522 8.66663 4.66675 8.36815 4.66675 7.99996C4.66675 7.63177 4.96522 7.33329 5.33341 7.33329H10.6667C11.0349 7.33329 11.3334 7.63177 11.3334 7.99996Z'
        fill='#EB4242'
      />
    </g>
    <defs>
      <clipPath id='clip0_2710_88189'>
        <rect width='16' height='16' fill='white' />
      </clipPath>
    </defs>
  </svg>
);

const App: React.FC = () => {
  const [value, setValue] = useState<Value>({});

  const handleChange = (v: Value) => {
    setValue(v);
  };

  return (
    <Form
      value={value}
      labelWidth={60}
      onChange={handleChange}
      onSubmit={(data) => {
        console.log(data);
      }}
    >
      <Form.Item label='Name'>
        <Input name='name' defaultValue='Harry Potter' clearable />
      </Form.Item>
      <Form.Item label='age'>
        <Input type='number' name='age' defaultValue='20' clearable />
      </Form.Item>
      <Form.Item label='Friends'>
        <Form.FieldSet
          name='friends'
          empty={(insert) => {
            return (
              <button type={'button'} onClick={() => insert({ name: '' })}>
                Add new friends
              </button>
            );
          }}
          defaultValue={[{ name: 'Hermione Granger', age: '16' }, {}]}
        >
          {({ onAppend, onRemove }) => (
            <Form.Item style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Input
                  name='name'
                  placeholder='Name'
                  title='Friend name'
                  rules={[rules.required('Name is required')]}
                  style={{ width: 180, marginInlineEnd: 8 }}
                  clearable
                />
                <Input
                  name='age'
                  type='number'
                  placeholder='Age'
                  rules={[rules.required('Age is required')]}
                  title='Friend age'
                  style={{ width: 60 }}
                  clearable
                />
                <a
                  style={{ margin: '0 12px', lineHeight: 1, cursor: 'pointer' }}
                  onClick={() => onAppend({ name: '', age: '16' })}
                >
                  {add}
                </a>
                <a style={{ lineHeight: 1, cursor: 'pointer' }} onClick={onRemove}>
                  {cancel}
                </a>
              </div>
            </Form.Item>
          )}
        </Form.FieldSet>
      </Form.Item>
      <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
        <Form.Submit>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  );
};

export default App;

```
### 数组 name
数据为数组类型的组件，name 可以传入一个相应的数组，来分别处理数组内的单个数据
```tsx
/**
 * cn - 数组 name
 *    -- 数据为数组类型的组件，name 可以传入一个相应的数组，来分别处理数组内的单个数据
 * en - Array name
 *    -- When the data is an array type, the name can pass in a corresponding array to process the single data in the array
 */
import React, { useState } from 'react';
import { produce } from 'immer';
import { Form, DatePicker, Input, Modal, Rule, TYPE } from 'shineout';

type Value = string[];
type FormProps = TYPE.Form.Props<Value>;

const NameInput = (props: FormProps) => {
  const { value, onChange } = props;

  const handleLastName = (v: string | undefined) => {
    const newValue = produce(props.value, (draft: any[]) => {
      draft[1] = v;
    });
    onChange!(newValue!);
  };
  const handleFirstName = (v: string | undefined) => {
    const newValue = produce(props.value, (draft: any[]) => {
      draft[0] = v;
    });
    onChange!(newValue!);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Input value={value![0]} width={120} onChange={handleFirstName} clearable />
      <span style={{ margin: '0 4px' }}>-</span>
      <Input value={value![1]} width={120} onChange={handleLastName} clearable />
    </div>
  );
};

const rule = Rule();

const App: React.FC = () => {
  const [initValue] = useState({
    firstName: 'Harry',
    lastName: 'Potter',
    date: {
      startDate: Date.now(),
      endDate: Date.now() + 86400 * 5000,
    },
  });

  return (
    <Form
      value={initValue}
      onSubmit={(data) => {
        Modal.info({ title: 'Form Data', content: <pre>{JSON.stringify(data, null, 2)}</pre> });
      }}
    >
      <Form.Item label='Name'>
        <Form.Field name={['firstName', 'lastName']}>
          <NameInput />
        </Form.Field>
      </Form.Item>

      <Form.Item label='Date'>
        <DatePicker
          range
          rules={[rule.required]}
          name={['date.startDate', 'date.endDate']}
          clearable
        />
      </Form.Item>

      <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
        <Form.Submit>Submit</Form.Submit>
      </Form.Item>
    </Form>
  );
};

export default App;

```
### 联动
在通常情况下，Form 不通过 value 和 onChange 方式处理数据，只是在 submit 的时候获取数据提交
这种情况下，需要联动时，可以使用 Flow 组件来实现。如果设置了 names 属性，只监听 names 包含的字段变化，如果没有设置，会监听 Form 内所有数据的变化
```tsx
/**
 * cn - 联动
 *    -- 在通常情况下，Form 不通过 value 和 onChange 方式处理数据，只是在 submit 的时候获取数据提交
 *    -- 这种情况下，需要联动时，可以使用 Flow 组件来实现。如果设置了 names 属性，只监听 names 包含的字段变化，如果没有设置，会监听 Form 内所有数据的变化
 * en - Flow
 *    -- For performance reasons, internal data of the Form is isolated and changing one component does not trigger another component to change
 *    -- If one component depends on another component's value, place it in the Flow component
 */
import React from 'react';
import { Form, Input, Checkbox, DatePicker, Rule } from 'shineout';

const rule = Rule();

const App: React.FC = () => (
  <Form onSubmit={(d) => console.log(d)}>
    <Form.Item label='First Name'>
      <Input name='firstName' delay={0} defaultValue='Harry' clearable />
    </Form.Item>

    <Form.Item label='Last Name'>
      <Input name='lastName' delay={0} defaultValue='Potter' clearable />
    </Form.Item>

    <Form.Item label='Full Name'>
      <Form.Flow names={['firstName', 'lastName']}>
        {(datum) => (
          <div style={{ lineHeight: '32px' }}>{`${datum?.get('firstName')}-${datum?.get(
            'lastName',
          )}`}</div>
        )}
      </Form.Flow>
    </Form.Item>

    <Form.Item label='Password'>
      <Input name='password' type='password' clearable />
    </Form.Item>

    <Form.Item label=''>
      <Checkbox defaultValue name='showAge'>
        Show age
      </Checkbox>
      <Checkbox name='showColors'>Show colors</Checkbox>
      <Form.Flow names={[]}>
        {(datum) => (
          <Checkbox
            name='dateRange'
            beforeChange={() => datum?.set({ startDate: undefined, endDate: undefined })}
          >
            Date range
          </Checkbox>
        )}
      </Form.Flow>
    </Form.Item>

    <Form.Flow names={['showAge']}>
      {(datum) =>
        datum?.get('showAge') && (
          <Form.Item required label='Age' tip='between 18 and 60'>
            <Input
              name='age'
              digits={0}
              title='age'
              type='number'
              defaultValue='18'
              style={{ width: 100 }}
              clearable
              rules={[rule.range(18, 60)]}
            />
          </Form.Item>
        )
      }
    </Form.Flow>

    <Form.Flow>
      {(datum) =>
        datum?.get('showColors') && (
          <Form.Item required label='Favorite Colors'>
            <Checkbox.Group
              keygen={(c) => c}
              name='colors'
              data={['red', 'yellow', 'green', 'blue', 'pink']}
            />
          </Form.Item>
        )
      }
    </Form.Flow>

    <Form.Item label='Date' tip=''>
      <Form.Flow names={['dateRange']}>
        {(datum) =>
          datum?.get('dateRange') === true ? (
            <DatePicker key='r' range name={['startDate', 'endDate']} type='date' />
          ) : (
            <DatePicker key='s' name='startDate' type='date' />
          )
        }
      </Form.Flow>
    </Form.Item>

    <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
      <Form.Button>Sumbit</Form.Button>
    </Form.Item>
  </Form>
);

export default App;

```
### initValidate

```tsx
/**
 * cn - initValidate
 *    --
 * en - initValidate
 *    --
 */
import { Form, Input, Button } from 'shineout';
import React from 'react';

export default () => {
  const [v, setV] = React.useState({});
  return (
    <div>
      <Form
        initValidate
        value={v}
        onSubmit={(v) => {
          console.log('form submit', v);
        }}
        onChange={(v) => {
          setV(v);
          console.log('form change', v);
        }}
        onReset={() => {
          console.log('form reset');
        }}
      >
        <Form.Item label='name'>
          <Input
            rules={[
              { required: true, message: 'name is required' },
              { max: 10, message: 'name length must less than 10' },
            ]}
            name={'name'}
            clearable
            placeholder='please input name'
          />
        </Form.Item>
        <Form.Item label='email'>
          <Input
            name={'email'}
            rules={[{ required: true, message: 'email is required' }]}
            clearable
            placeholder='please input email'
          />
        </Form.Item>

        <Form.Item label=''>
          <Form.Submit>Submit</Form.Submit>
          <Form.Reset>Reset</Form.Reset>
          <Button
            onClick={() => {
              setV({ name: 'aelsssssllonnnnggggggg' });
            }}
          >
            Automatically verify modified fields after changing values
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

```
### size
表单元素的尺寸
```tsx
/**
 * cn - size
 *    -- 表单元素的尺寸
 * en - size
 *    -- The size of the form element
 */
import React from 'react';
import { Form, Input, Radio, Textarea, TYPE } from 'shineout';

type RadioSize = TYPE.Radio.GroupProps<any, any>['size'];

const App: React.FC = () => {
  const [size, setSize] = React.useState<RadioSize>('default');
  return (
    <>
      <Radio.Group data={['default', 'small', 'large']} keygen value={size} onChange={setSize} />
      <Form disabled size={size}>
        <Form.Item label='Email'>
          <Input name='email' />
        </Form.Item>
        <Form.Item label='Email2'>
          <Input />
        </Form.Item>

        <Form.Item label='Password'>
          <Input name='password' type='password' />
        </Form.Item>

        <Form.Item label='Name'>
          <Input.Group style={{ width: 300 }} disabled>
            <Input name='firstName' placeholder='First Name' />
            -
            <Input name='lastName' placeholder='Last Name' />
          </Input.Group>
        </Form.Item>

        <Form.Item label='Age'>
          <Input.Number
            style={{ width: 100 }}
            name='age'
            type='number'
            digits={0}
            defaultValue='0'
          />
        </Form.Item>
        <Form.Item label='address'>
          <Textarea rows={2} name='address' defaultValue='xxx' />
        </Form.Item>
      </Form>
    </>
  );
};

export default App;

```
## Guide
### 何时使用
需要收集信息时；\n 需求对输入的信息进行校验时。
### 与布局相关
表单的自适应布局，当表单显示三列信息，在分辨率变大的时候，保持间距不变，表单的占位宽度拉宽。推荐间距距离 24px
### 推荐使用
当遇到有多语言场景的时候，推荐使用垂直对齐的方式
当提交校验后，想要强调表单状态的时候，可以在表单右侧添加状态图标来凸显
表单必填符合的位置默认放在标题的左边，释义图标放在标题的右侧
### 推荐/慎用示例
标题字数过多的时候，在处理文字换行的时候要注意调整文字行高，避免行间距不统一带来的参差感


# Gap
设置组件之间的间距
## API
### Gap
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|column|string / number |8|水平方向的列间距|
|row|string / number |8|垂直方向的行间距|
|itemStyle|CSSProperties ||子元素自定义样式|
|children|ReactNode||子元素|
## Example
### 基本用法
为子元素设置水平和垂直间距
```tsx
/**
 * cn - 基本用法
 *    -- 为子元素设置水平和垂直间距
 * en - Base
 *    -- Set horizontal and vertical spacing for child elements
 */
import React from 'react';
import { Gap, Button } from 'shineout';

const App: React.FC = () => (
  <Gap style={{ width: 400 }}>
    {Array.from({ length: 10 }).map((_, i) => (
      <Button key={i} type='primary'>
        Button
      </Button>
    ))}
  </Gap>
);

export default App;

```
### 自定义间距
通过 row 和 column 分别来调整垂直和水平间距
推荐优先考虑4px、8px、12px、16px、24px的间距值
```tsx
/**
 * cn - 自定义间距
 *    -- 通过 row 和 column 分别来调整垂直和水平间距
 *    -- 推荐优先考虑4px、8px、12px、16px、24px的间距值
 * en - Custom
 *    -- custom the vertical and horizontal spacing by row and column
 *    -- It is recommended to consider the spacing values of 4px, 8px, 12px, 16px, 24px first
 */
import React, { useState } from 'react';
import { Gap, Button, Slider } from 'shineout';

const App: React.FC = () => {
  const [row, setRow] = useState(8);
  const [column, setColumn] = useState(8);
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ width: 80 }}>column:</div>
        <Slider
          style={{ flex: 1 }}
          scale={[0, 100]}
          formatScale={false}
          defaultValue={column}
          onChange={setColumn}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ width: 80 }}>row:</div>
        <Slider
          style={{ flex: 1 }}
          scale={[0, 100]}
          formatScale={false}
          defaultValue={row}
          onChange={setRow}
        />
      </div>
      <div style={{ width: 500, border: '1px solid #e8ebf0', borderRadius: '4px', padding: 10 }}>
        <Gap row={row} column={column}>
          {Array.from({ length: 10 }).map((_, i) => (
            <Button key={i} type='primary'>
              Button
            </Button>
          ))}
        </Gap>
      </div>
    </>
  );
};

export default App;

```
### 垂直方向
设置  flexDirection 样式来改变方向
```tsx
/**
 * cn - 垂直方向
 *    -- 设置  flexDirection 样式来改变方向
 * en - Vertical
 *    -- Set flexDirection to change the direction
 */
import React from 'react';
import { Gap, Button } from 'shineout';

const App: React.FC = () => (
  <Gap style={{ width: 400, flexDirection: 'column' }} row={10}>
    {Array.from({ length: 4 }).map((_, i) => (
      <Button key={i} type='primary'>
        Button
      </Button>
    ))}
  </Gap>
);

export default App;

```
### 对齐方式
通过 alignItem 设置对齐方式
```tsx
/**
 * cn - 对齐方式
 *    -- 通过 alignItem 设置对齐方式
 * en - Align
 *    -- Set align to change the alignment
 */
import React, { useState } from 'react';
import { Gap, Button, Radio } from 'shineout';

const App: React.FC = () => {
  const [align, setAlign] = useState('flex-start');
  return (
    <>
      <Radio.Group
        value={align}
        onChange={setAlign}
        data={['flex-start', 'center', 'flex-end', 'baseline']}
        keygen
        defaultValue='flex-start'
      />

      <Gap
        style={{
          width: 160,
          marginTop: 16,
          border: '1px solid #e8ebf0',
          borderRadius: '4px',
          alignItems: align,
          padding: 12,
        }}
        row={20}
      >
        <span>start</span>
        <Button type='primary'>Button</Button>
        <div
          style={{
            fontSize: 14,
            background: '#f4f5f8',
            height: 120,
            lineHeight: '24px',
            borderRadius: '4px',
            padding: '12px',
          }}
        >
          end
        </div>
      </Gap>
    </>
  );
};

export default App;

```
## Guide



# Grid
动态栅格体系，用于某些不适合使用 flex 的地方
## API
### Grid
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|gutter|number ||栅格之间间距|
|offset|number |0|左偏移百分比，0 <= offset < 1|
|width|number |1|宽度百分比，0 < number <= 1|
|responsive|\"sm\" / \"md\" / \"lg\" / \"xl\" |\"md\"|激活响应式的最小尺寸。sm: 568px; md: 768px; lg: 992px; xl: 1200px;\n例如：设置为 sm 时，屏幕尺寸若低于568px，栅格系统的响应性将不会生效。|
|stretch|boolean ||是否撑满容器高度|
|children|ReactNode||子元素|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
## Example
### 任意等分
Grid 的栅格体系是动态生成，可以实现任意等份
```tsx
/**
 * cn - 任意等分
 *    -- Grid 的栅格体系是动态生成，可以实现任意等份
 * en - Arbitrary
 *    -- Grid system is dynamic generated and can be any number
 */
import React, { useState } from 'react';
import { Grid, Slider, TYPE } from 'shineout';

type SliderProps = TYPE.Slider.Props<number>;
type SliderOnChange = SliderProps['onChange'];

const gridStyle: React.CSSProperties = {
  color: '#fff',
  paddingLeft: 8,
  background: '#197afa',
  fontSize: 14,
};
const style: React.CSSProperties = { background: '#e8ebf0', marginBottom: 4, lineHeight: '30px' };

const App: React.FC = () => {
  const [count, setCount] = useState(5);

  const handleCountChange: SliderOnChange = (v) => {
    setCount(v);
  };
  return (
    <div>
      <Slider
        step={0}
        value={count}
        formatValue={false}
        onChange={handleCountChange}
        scale={[1, 2, 3, 5, 8, 13, 21, 34, 55]}
      />

      <div style={{ height: 20 }} />

      {Array.from({ length: count }).map((_n, i) => (
        <div key={i} style={style}>
          <Grid width={(i + 1) / count} style={gridStyle}>
            {`${i + 1}/${count}`}
          </Grid>
        </div>
      ))}
    </div>
  );
};

export default App;

```
### 偏移
offset 属性可以设置偏移，取值方式和宽度相同
```tsx
/**
 * cn - 偏移
 *    -- offset 属性可以设置偏移，取值方式和宽度相同
 * en - Offset
 *    -- The offset property set the offset in the same way as the width
 */
import React from 'react';
import { Grid } from 'shineout';

const style: React.CSSProperties = {
  background: '#e8ebf0',
};
const gridStyle: React.CSSProperties = {
  color: '#fff',
  lineHeight: '60px',
  textAlign: 'center',
  background: '#197afa',
  fontSize: 14,
};

const App: React.FC = () => (
  <div style={style}>
    <Grid width={1 / 3} offset={1 / 3} style={gridStyle}>
      With 1/3, Offset 1/3
    </Grid>
  </div>
);

export default App;

```
### 嵌套
嵌套的栅格
```tsx
/**
 * cn - 嵌套
 *    -- 嵌套的栅格
 * en - Nested
 *    -- Nested grids
 */
import React from 'react';
import { Grid } from 'shineout';

const style: React.CSSProperties = {
  color: '#fff',
  lineHeight: '30px',
  textAlign: 'center',
  background: '#197afa',
  fontSize: 14,
};

const App: React.FC = () => (
  <Grid style={{ textAlign: 'center' }}>
    <Grid width={1 / 2} style={style}>
      1/2
    </Grid>

    <Grid width={1 / 2} style={{ lineHeight: '30px' }}>
      <div style={{ fontSize: 14 }}>1/2</div>
      <div>
        <Grid style={style} width={1 / 3}>
          1/3
        </Grid>
        <Grid
          style={{ ...style, background: '#6bb5ff', color: '#fff', fontSize: 14 }}
          width={1 / 3}
        >
          1/3
        </Grid>
        <Grid style={style} width={1 / 3}>
          1/3
        </Grid>
      </div>
    </Grid>
  </Grid>
);

export default App;

```
### 间距
通过 gutter 属性设置栅格间距
```tsx
/**
 * cn - 间距
 *    -- 通过 gutter 属性设置栅格间距
 * en - Gutter
 *    -- Set grid spacing through the gutter property
 */
import React from 'react';
import { Grid } from 'shineout';

const style: React.CSSProperties = {
  background: '#e8ebf0',
};
const gridStyle: React.CSSProperties = {
  color: '#fff',
  lineHeight: '30px',
  textAlign: 'center',
  background: '#197afa',
  fontSize: 14,
};
const gridStyle2: React.CSSProperties = {
  color: '#fff',
  lineHeight: '30px',
  textAlign: 'center',
  background: '#6bb5ff',
  fontSize: 14,
};

const App: React.FC = () => (
  <div style={style}>
    <Grid gutter={8}>
      {Array.from({ length: 8 })
        .map((_, i) => i + 1)
        .map((i) => (
          <Grid key={i} width={1 / 8}>
            <div style={i % 2 === 0 ? gridStyle2 : gridStyle}>1/8</div>
          </Grid>
        ))}
    </Grid>
  </div>
);

export default App;

```
## Guide



# Image
用于图片展示及预览
## API
### Image.Group
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|style|CSSProperties ||自定义样式|
|className|string ||自定义类名|
|showCount|boolean ||显示图片数量|
|target|\"_self\" / \"_blank\" / \"_modal\" / \"_download\" |\"_modal\"|图片打开方式|
|shape|\"rounded\" / \"circle\" / \"thumbnail\" |\"rounded\"|图片形状|
|lazy|boolean |false|是否延迟加载|
|pile|boolean |false|是否堆叠|
|fit|\"fill\" / \"center\" / \"fit\" / \"stretch\" ||图片填充方式|
|width|string / number |\"100%\"|图片宽度|
|height|string / number |\"100%\"|图片高度|
|children|ReactNode||子元素|
### Image
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|style|CSSProperties ||自定义样式|
|className|string ||自定义类名|
|onClick|MouseEventHandler<Element> ||点击图片的回调|
|onError|((e: Event, type: number) => void) ||src或alt 地址请求出错回调|
|placeholder|ReactNode|\"loading|图加载时的占位内容|
|title|string ||原生 title 属性|
|fit|\"fill\" / \"center\" / \"fit\" / \"stretch\" |-|图片填充方式|
|container|string / HTMLElement |-|懒加载容器|
|error|ReactNode|-|自定义错误内容|
|href|string ||原始图片地址|
|lazy|number / boolean |false|是否延迟加载，如果为数字则表示懒加载偏移量|
|noImgDrag|boolean |false|是否禁止 img 元素原生 draggable 属性|
|shape|\"rounded\" / \"circle\" / \"thumbnail\" |\"rounded\"|图片形状|
|target|\"_self\" / \"_blank\" / \"_modal\" / \"_download\" |\"_modal\"|图片打开方式|
|width|string / number |\"100%\"|图片宽度|
|height|string / number |\"100%\"|图片高度|
|src|string ||图片地址|
|alt|string ||备用地址，src无效时会应用|
|autoSSL|boolean |false|是否根据页面自动转换协议|
## Example
### 基本用法
基础 Image 用法
```tsx
/**
 * cn - 基本用法
 *    --基础 Image 用法
 * en - Base
 *    --Base Image
 */

import React from 'react';
import { Image } from 'shineout';

export default () => {
  return (
    <div
      style={{
        gap: 8,
        display: 'flex',
      }}
    >
      <Image
        fit='fill'
        width={128}
        height={128}
        target='_modal'
        src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
        href='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
      ></Image>
    </div>
  );
};

```
### 不同状态
图片在加载过程中，会有不同的状态。不同状态下的 Image 展现形式不同
```tsx
/**
 * cn - 不同状态
 *    -- 图片在加载过程中，会有不同的状态。不同状态下的 Image 展现形式不同
 * en - Status
 *    -- Image has different status when loading
 */

import React from 'react';
import { Image } from 'shineout';

export default () => {
  return (
    <div
      style={{
        gap: 8,
        display: 'flex',
      }}
    >
      <Image
        fit='fill'
        width={128}
        height={128}
        target='_modal'
        src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
        href='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
      ></Image>
      <Image fit='fill' width={128} height={128} src='error'></Image>
    </div>
  );
};

```
### 
支持自定义渲染不同状态下的内容：
1、通过设置 <span>error</span> 属性自定义渲染加载失败时的内容
2、通过设置 <span>placeholder</span> 属性用于自定义渲染加载中时的占位符内容
```tsx
/**
 * cn -
 *    -- 支持自定义渲染不同状态下的内容：
 *    -- 1、通过设置 `error` 属性自定义渲染加载失败时的内容
 *    -- 2、通过设置 `placeholder` 属性用于自定义渲染加载中时的占位符内容
 * en -
 *    -- Custom rendering of content in different states:
 *    -- 1. `error` is used to customize the content when loading fails
 *    -- 2. `placeholder` is used to customize the placeholder content when loading
 */

import React from 'react';
import { Image } from 'shineout';

export default () => {
  const renderIcon = () => {
    return (
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M6.67122 2C7.4076 2 8.00456 2.59695 8.00456 3.33333C8.00456 3.50839 7.97008 3.68173 7.90311 3.84347L7.42418 5L8.6665 6.91387L7.18965 9.80933L8.04044 12.2235C8.2852 12.918 7.92059 13.6794 7.22608 13.9242C7.08371 13.9744 6.93386 14 6.78291 14H1.99984C1.26346 14 0.666504 13.403 0.666504 12.6667V3.33333C0.666504 2.59695 1.26346 2 1.99984 2H6.67122ZM13.9998 2C14.7362 2 15.3332 2.59695 15.3332 3.33333V12.6667C15.3332 13.403 14.7362 14 13.9998 14H10.7806C10.2061 14 9.69625 13.6321 9.51521 13.0869L8.42684 9.80933L9.81843 6.66667L8.6665 5L9.10115 3.04409C9.23672 2.43404 9.7778 2 10.4027 2H13.9998ZM4.13693 9.53628L1.99984 11.664V12C1.99984 12.3682 2.29831 12.6667 2.6665 12.6667H5.84111C6.2093 12.6667 6.50778 12.3682 6.50778 12C6.50778 11.9245 6.49497 11.8496 6.46988 11.7784L5.86317 10.058L5.1383 9.48081C4.83888 9.24225 4.40817 9.26611 4.13693 9.53628ZM10.2945 8.88333L9.95912 9.64247C9.89202 9.79403 9.88378 9.96515 9.93601 10.1225L10.6292 12.2101C10.7197 12.4827 10.9747 12.6667 11.2619 12.6667H13.3332C13.7014 12.6667 13.9998 12.3682 13.9998 12V11.7053L10.2945 8.88333ZM13.3332 3.33333H10.9377C10.6251 3.33333 10.3545 3.55045 10.2868 3.85556L10.1579 4.43666C10.1177 4.61775 10.1548 4.8074 10.2602 4.96002L11.1278 6.21597C11.2597 6.40688 11.2829 6.65263 11.1889 6.86479L10.8145 7.70933L13.9998 10.1347V4C13.9998 3.63181 13.7014 3.33333 13.3332 3.33333ZM5.69471 3.33333H2.6665C2.29831 3.33333 1.99984 3.63181 1.99984 4V10.0933L4.13693 7.96532C4.40817 7.69516 4.83888 7.6713 5.1383 7.90986L6.03493 8.62424C6.0979 8.67442 6.16629 8.71346 6.23767 8.7416L6.95367 7.33688C7.06186 7.1247 7.04864 6.87093 6.919 6.67114L6.11482 5.43183C5.99536 5.24774 5.97415 5.01664 6.05812 4.81387L6.29761 4.23555C6.43549 3.90258 6.27735 3.52087 5.94438 3.38298C5.86522 3.3502 5.78038 3.33333 5.69471 3.33333ZM3.99984 4C4.73621 4 5.33317 4.59696 5.33317 5.33333C5.33317 6.0697 4.73621 6.66667 3.99984 6.66667C3.26347 6.66667 2.6665 6.0697 2.6665 5.33333C2.6665 4.59696 3.26347 4 3.99984 4ZM3.99984 5.14286C3.89463 5.14286 3.80936 5.22813 3.80936 5.33333C3.80936 5.43854 3.89463 5.52381 3.99984 5.52381C4.10504 5.52381 4.19031 5.43854 4.19031 5.33333C4.19031 5.22813 4.10504 5.14286 3.99984 5.14286Z'
          fill='#B3B7C1'
        />
      </svg>
    );
  };
  const renderError = () => {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontSize: 12,
          color: '#666C7C',
        }}
      >
        <div>{renderIcon()}</div>
        <div>Error</div>
      </div>
    );
  };

  const renderPlaceholder = () => {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          color: '#666C7C',
        }}
      >
        <div>疯狂加载中...</div>
      </div>
    );
  };

  return (
    <div
      style={{
        gap: 8,
        display: 'flex',
      }}
    >
      <Image
        fit='fill'
        width={128}
        height={128}
        target='_modal'
        placeholder={renderPlaceholder()}
        src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
      ></Image>
      <Image fit='fill' width={128} height={128} src='error' error={renderError()}></Image>
    </div>
  );
};

```
### 图片形状
Image 可以设置不同的形状
内置三种不同的形状：圆形模式 circle、圆角模式 rounded、带边框模式 thumbnail
```tsx
/**
 * cn - 图片形状
 *    -- Image 可以设置不同的形状
 *    -- 内置三种不同的形状：圆形模式 circle、圆角模式 rounded、带边框模式 thumbnail
 * en - Shape
 *    -- Image can be set to different shapes
 */

import React from 'react';
import { Image } from 'shineout';

export default () => {
  return (
    <div
      style={{
        gap: 8,
        display: 'flex',
      }}
    >
      <Image
        shape='rounded'
        fit='fill'
        width={128}
        height={128}
        src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
      ></Image>
      <Image
        shape='circle'
        fit='fill'
        width={128}
        height={128}
        src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
      ></Image>
      <Image
        shape='thumbnail'
        fit='fill'
        width={128}
        height={128}
        src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
      ></Image>
    </div>
  );
};

```
### 填充方式
Image 四种不同的图片填充方式：
fill 填充整个容器、center 居中、fit 原图、stretch 拉伸
```tsx
/**
 * cn - 填充方式
 *    -- Image 四种不同的图片填充方式：
 *    -- fill 填充整个容器、center 居中、fit 原图、stretch 拉伸
 * en - Fit
 *    -- Image has four different fill modes:
 *    -- fill, center, fit, stretch
 */

import React from 'react';
import { Image } from 'shineout';

export default () => {
  const fit = ['fill', 'center', 'fit', 'stretch'];

  return (
    <div
      style={{
        gap: 8,
        display: 'flex',
      }}
    >
      {fit.map((item, index) => {
        return (
          <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
            <Image
              fit={item as any}
              width={128}
              height={128}
              src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
            ></Image>
            <div style={{ textAlign: 'center', color: '#141737', fontSize: 12, marginTop: 5 }}>
              {item}
            </div>
          </div>
        );
      })}
    </div>
  );
};

```
### 打开方式
Image 通过配置 <span>target</span> 属性实现四种打开方式：
_modal 通过弹层打开预览、_blank 通过新窗口打开预览、_self 通过当前窗口打开预览、_download 下载图片
```tsx
/**
 * cn - 打开方式
 *    -- Image 通过配置 `target` 属性实现四种打开方式：
 *    -- _modal 通过弹层打开预览、_blank 通过新窗口打开预览、_self 通过当前窗口打开预览、_download 下载图片
 * en - Target
 *    -- Image has four open modes: _modal open preview through layer, _blank open preview through new window, _self open preview through current window, _download download image
 */

import React from 'react';
import { Image } from 'shineout';

export default () => {
  const images = [
    {
      src: 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
      target: '_modal',
    },
    {
      src: 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
      target: '_blank',
    },
    {
      src: 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
      target: '_self',
    },
    {
      src: 'static/image/s-01.png',
      target: '_download',
    },
  ];
  return (
    <div
      style={{
        gap: 8,
        display: 'flex',
      }}
    >
      {images.map((item, index) => {
        return (
          <div key={index}>
            <Image
              fit='fill'
              width={128}
              height={128}
              target={item.target as any}
              src={item.src}
              href={item.src}
            ></Image>
            <div style={{ fontSize: 12, textAlign: 'center' }}>{item.target}</div>
          </div>
        );
      })}
    </div>
  );
};

```
### 图片组
Image 支持一组图片的展示
通过设置 <span>pile</span> 属性折叠图片，通过设置 <span>showCount</span> 展示图片数量
注意，showCount 属性仅在 pile 属性为 true 时生效。开启 pile 属性后，图片组将默认开启 _modal 模式预览
```tsx
/**
 * cn - 图片组
 *    -- Image 支持一组图片的展示
 *    -- 通过设置 `pile` 属性折叠图片，通过设置 `showCount` 展示图片数量
 *    -- 注意，showCount 属性仅在 pile 属性为 true 时生效。开启 pile 属性后，图片组将默认开启 _modal 模式预览
 * en - Group
 *    -- Image supports a group of images.
 *    -- Set the `pile` property to fold the images, and set the `showCount` property to show the number of images
 *    -- Note that the showCount property only takes effect when the pile property is true. After the pile property is turned on, the image group will default to preview in _modal mode
 */

import React from 'react';
import { Image } from 'shineout';

export default () => {
  const images = [
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-02.png',
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-03.png',
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-04.png',
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-05.png',
  ];
  return (
    <div
      style={{
        gap: 16,
        width: '100%',
        display: 'flex',
      }}
    >
      <Image.Group fit='fill' target='_modal' pile lazy>
        {images.map((item, index) => {
          return <Image key={index} width={128} height={128} src={item} href={item}></Image>;
        })}
      </Image.Group>

      <Image.Group fit='fill' target='_modal' pile showCount lazy>
        {images.map((item, index) => {
          return <Image key={index} width={128} height={128} src={item} href={item}></Image>;
        })}
      </Image.Group>
    </div>
  );
};

```
### 
Image 支持平铺展示一组图片
```tsx
/**
 * cn -
 *    -- Image 支持平铺展示一组图片
 * en -
 *    -- Image supports tiled display of a group of images
 */

import React from 'react';
import { Image } from 'shineout';

export default () => {
  const images = [
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-02.png',
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-03.png',
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-04.png',
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-05.png',
  ];
  return (
    <div
      style={{
        gap: 8,
        display: 'flex',
      }}
    >
      <Image.Group fit='fill' target='_modal'>
        {images.map((item, index) => {
          return <Image key={index} width={128} height={128} src={item} href={item}></Image>;
        })}
      </Image.Group>
    </div>
  );
};

```
### 懒加载
Image 通过配置 <span>lazy</span> 属性开启懒加载模式
```tsx
/**
 * cn - 懒加载
 *    -- Image 通过配置 `lazy` 属性开启懒加载模式
 * en - Lazy
 *    -- Image enables lazy loading mode by configuring the `lazy` property
 */

import React from 'react';
import { Image } from 'shineout';

export default () => {
  const images = [
    {
      src: 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
      target: '_modal',
    },
    {
      src: 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-02.png',
      target: '_blank',
    },
    {
      src: 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-03.png',
      target: '_self',
    },
    {
      src: 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-04.png',
      target: '_download',
    },
  ];
  return (
    <div style={{ width: '100%' }}>
      {images.map((item, index) => {
        return <Image key={index} lazy fit='fill' width={'100%'} height={528} src={item.src}></Image>;
      })}
    </div>
  );
};

```
### 
通过配置 <span>container</span> 对指定容器下的 Image 进行懒加载
```tsx
/**
 * cn -
 *    -- 通过配置 `container` 对指定容器下的 Image 进行懒加载
 * en -
 *    -- Set `container` to lazy load Image in the specified container
 */

import React from 'react';
import { Image } from 'shineout';

export default () => {
  const images = [
    {
      src: 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
      target: '_modal',
    },
    {
      src: 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-02.png',
      target: '_blank',
    },
    {
      src: 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-03.png',
      target: '_self',
    },
    {
      src: 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-04.png',
      target: '_download',
    },
  ];
  return (
    <div id='image-container' style={{ width: '100%', height: 300, overflow: 'auto' }}>
      {images.map((item, index) => {
        return (
          <Image
            key={index}
            lazy
            container='#image-container'
            fit='fill'
            width='100%'
            height='100%'
            src={item.src}
          ></Image>
        );
      })}
    </div>
  );
};

```
## Guide
### 何时使用
当需要对图像进行展示、陈列、预览时使用，另提供了图片加载中、加载失败、暂无图片的默认占位样式
### 与布局相关
多张图片组合展示时，尽量确保页面图片使用相同尺寸及比例，如有特殊情况，建议图片宽度一致且四周间距相同
### 组件搭配使用
1、图片与分页搭配使用，当图片过多、需在每页固定展示一定数量时，可让用户自主选择页数查找图片
2、图片与分步加载搭配使用，可形成图片瀑布流，浏览大量图片时能减少用户操作、提供沉浸式体验
### 图片比例推荐
常见的 4 种比例图片，系统在使用时建议统一图片比例，避免相同场景下不同比例混用
### 推荐/慎用示例
对于没有预览功能的图片缩略图呈现尺寸不要太小，确保用户可以看清


# Input
通常用于承载用户信息录入的文本框，常用于表单。对话框、表格等场景，在输入框基础样式上可以根据需求拓展出多种信息录入形式
## API
### Input
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|value|string ||输入值|
|onChange|(value: string) => void||值改变回调|
|defaultValue|string||默认值|
|clearable|boolean / (() => void) |false|可点击清空图标删除输入框内容，为函数式表示清空回调|
|onBlur|FocusEventHandler<Element> ||失去焦点后的回调|
|onFocus|FocusEventHandler<Element> ||聚焦后的回调|
|onClick|MouseEventHandler<Element> ||点击回调|
|disabled|boolean |false|禁用组件|
|autoSelect|boolean |false|是否自动获得焦点|
|size|\"small\" / \"large\" / \"default\"|\"default\"|不同尺寸|
|prefix|ReactNode||前缀|
|width|string / number ||宽度|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|status|\"error\" ||组件状态|
|clearIcon|ReactNode||自定义清除图标|
|suffix|ReactNode||后缀|
|underline|boolean |false|仅仅展示下边框|
|border|boolean |: true|是否展示边框|
|onEnterPress|((value: string, e: KeyboardEvent<Element>) => void) ||回车键回调函数|
|trim|boolean ||是否去除前后空格|
|numType|\"non-negative\" / \"positive\" ||设置数字类型 支持 \"positive\" 和 \"non-negative\", 仅在 type = number 下生效|
|coin|boolean |false|以千位分隔符展示,仅当 type 为 number 时有效|
|integerLimit|number ||整数位数限制, 仅在 type = number 下生效|
|digits|number ||小数位数限制, 仅在 type = number 下生效|
|autoFix|boolean ||是否自动补全小数位数, 仅在 type = number 下生效|
|tip|ReactNode||提示信息|
|forwardRef|Ref<HTMLInputElement> ||获取input dom元素|
|innerTitle|ReactNode||内嵌标题|
|placeTitle|ReactNode||占位标题，需要配合 innerTitle 一起使用|
|htmlName|string ||原生 html 属性|
|clearToUndefined|boolean |false|点击清除按钮后数据变为 undefined|
|info|number / ((value: string / undefined) => string)||提示信息|
|delay|number ||用户输入触发 onChange 和校验间隔时间，单位 毫秒|
|popover|PopoverProps[\"position\"]||校验信息弹出位置|
|popoverProps|PopoverProps ||校验或者tip弹框接受的属性|
|name|Name ||Form 内存取数据的 key|
|beforeChange|((value: T) => void / T ) ||值改变前的回调，当返回值不为空时将作为组件的新值|
|onError|((error?: Error ) => void) ||rules 校验回调|
|reserveAble|boolean ||设置为 true 组件卸载后表单不自动删除数据|
|rules|RuleItem[]||校验规则 详见 [Rule](/components/rule)|
|bind|string[] ||当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用|
### Input.Number
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|value|V ||输入值|
|onChange|(value: string) => void||值改变回调|
|defaultValue|string||默认值|
|clearable|boolean / (() => void) |false|可点击清空图标删除输入框内容，为函数式表示清空回调|
|step|number |1|改变数字跨度，可为小数|
|min|number ||最小值|
|max|number ||最大值|
|onBlur|FocusEventHandler<Element> ||失去焦点后的回调|
|onFocus|FocusEventHandler<Element> ||聚焦后的回调|
|onClick|MouseEventHandler<Element> ||点击回调|
|disabled|boolean |false|禁用组件|
|autoSelect|boolean |false|是否自动获得焦点|
|size|\"small\" / \"large\" / \"default\"|\"default\"|不同尺寸|
|prefix|ReactNode||前缀|
|width|string / number ||宽度|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|status|\"error\" ||组件状态|
|clearIcon|ReactNode||自定义清除图标|
|suffix|ReactNode||后缀|
|underline|boolean |false|仅仅展示下边框|
|border|boolean |: true|是否展示边框|
|onEnterPress|((value: string, e: KeyboardEvent<Element>) => void) ||回车键回调函数|
|numType|\"non-negative\" / \"positive\" ||设置数字类型 支持 \"positive\" 和 \"non-negative\", 仅在 type = number 下生效|
|integerLimit|number ||整数位数限制, 仅在 type = number 下生效|
|digits|number ||小数位数限制, 仅在 type = number 下生效|
|cancelBlurChange|boolean ||取消 blur 触发 onChange,用于多层嵌套的格式化，只在最外层触发一次onChange|
|allowNull|boolean ||清空后值为 null|
|tip|ReactNode||提示信息|
|forwardRef|Ref<HTMLInputElement> ||获取input dom元素|
|innerTitle|ReactNode||内嵌标题|
|placeTitle|ReactNode||占位标题，需要配合 innerTitle 一起使用|
|htmlName|string ||原生 html 属性|
|clearToUndefined|boolean |false|点击清除按钮后数据变为 undefined|
|info|number / ((value: string / undefined) => string)||提示信息|
|delay|number ||用户输入触发 onChange 和校验间隔时间，单位 毫秒|
|popover|PopoverProps[\"position\"]||校验信息弹出位置|
|popoverProps|PopoverProps ||校验或者tip弹框接受的属性|
|name|Name ||Form 内存取数据的 key|
|beforeChange|((value: T) => void / T ) ||值改变前的回调，当返回值不为空时将作为组件的新值|
|onError|((error?: Error ) => void) ||rules 校验回调|
|reserveAble|boolean ||设置为 true 组件卸载后表单不自动删除数据|
|rules|RuleItem[]||校验规则 详见 [Rule](/components/rule)|
|bind|string[] ||当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用|
### Input.Password
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|point|string |\"•\"|密码符号|
|visibilityToggle|boolean ||是否显示切换密码可见状态的按钮|
|visibility|boolean ||是否显示密码|
|defaultVisibility|boolean ||初始状态是否显示密码|
|onVisibilityChange|((visibility: boolean) => void) ||切换密码可见状态的按钮的图标|
## Example
### 基本用法
Input 通常需要和其他的组件配合使用，所以默认的宽度是 100%，默认 display 为 block
如果设置了 style.width，默认 display 为 inline-flex
```tsx
/**
 * cn - 基本用法
 *    -- Input 通常需要和其他的组件配合使用，所以默认的宽度是 100%，默认 display 为 block
 *    -- 如果设置了 style.width，默认 display 为 inline-flex
 * en - Base
 *    -- Input usually needs to be used with other components, so the default width is 100% and the default display is block
 *    -- If the style.width is set, the default display is inline-flex
 */
import React from 'react';
import { Input } from 'shineout';

const App: React.FC = () => <Input width={300} placeholder='input something' clearable />;

export default App;

```
### 尺寸大小
设置 <span>size</span> 属性改变输入框组件的尺寸大小。内置三种尺寸：small、default、large
```tsx
/**
 * cn - 尺寸大小
 *    -- 设置 `size` 属性改变输入框组件的尺寸大小。内置三种尺寸：small、default、large
 * en - Size
 *    -- Set the size property to change the size of the input box component. There are three built-in sizes available: small, default, and large
 */

import React from 'react';
import { Input } from 'shineout';

const App: React.FC = () => (
  <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
    <Input size='small' width={240} placeholder='small size' clearable />
    <Input width={240} placeholder='default size' clearable />
    <Input size='large' width={240} placeholder='large size' clearable />
  </div>
);

export default App;

```
### 数字
设置 <span>type</span> 为 number，输入时会做一次校验，禁止输入非数字类型字符
设置 <span>digits</span> 限制小数位数
设置 <span>integerLimit</span> 限制整数位数
设置 <span>numType</span> 限制数字格式, 支持 'positive' 和 'non-negative'
```tsx
/**
 * cn - 数字
 *    -- 设置 `type` 为 number，输入时会做一次校验，禁止输入非数字类型字符
 *    -- 设置 `digits` 限制小数位数
 *    -- 设置 `integerLimit` 限制整数位数
 *    -- 设置 `numType` 限制数字格式, 支持 'positive' 和 'non-negative'
 * en - Number
 *    -- Set `type` to number, the input will be verified once when inputting, and non-numeric characters are not allowed to be entered
 *    -- Set `digits` to limit the number of decimal places
 *    -- Set `integerLimit` to limit the number of integers
 *    -- Set `numType` to limit the number format, support 'positive' and 'non-negative'
 */

import React from 'react';
import { Input } from 'shineout';

const style: React.CSSProperties = { marginBottom: 24 };

const App: React.FC = () => (
  <div style={{ width: 300 }}>
    <Input style={style} type='number' placeholder='digits undefined' />
    <Input style={style} digits={0} type='number' placeholder='digits 0' clearable />
    <Input style={style} digits={1} type='number' placeholder='digits 1' clearable />
    <Input style={style} digits={2} type='number' placeholder='digits 2' clearable />
    <Input style={style} numType='non-negative' type='number' placeholder='non-negative' />
    <Input style={style} type='number' integerLimit={3} placeholder='integerLimit 3' clearable />
    <Input
      style={style}
      autoFix
      digits={3}
      type='number'
      placeholder='digits 3; autoFix'
      clearable
    />
    <Input
      style={style}
      numType='positive'
      integerLimit={3}
      type='number'
      placeholder='positive;integerLimit 3'
    />
    <Input.Number numType='positive' integerLimit={3} placeholder='positive; integerLimit 3' />
  </div>
);

export default App;

```
### 
Input.Number 组件，可以通过鼠标和上下键辅助输入
```tsx
/**
 * cn -
 *    -- Input.Number 组件，可以通过鼠标和上下键辅助输入
 * en -
 *    -- Input.Number component, can be assisted by mouse and up and down keys to input
 */

import React from 'react';
import { Input } from 'shineout';

const App: React.FC = () => <Input.Number width={300} />;

export default App;

```
### 前后标签
利用内置的 group 组件可以在前后增加标签
```tsx
/**
 * cn - 前后标签
 *    -- 利用内置的 group 组件可以在前后增加标签
 * en - Front and rear tags
 *    -- Use the built-in group component to add tags before and after
 */

import React from 'react';
import { Input } from 'shineout';

const style: React.CSSProperties = { width: 300, marginBottom: 24 };

const App: React.FC = () => (
  <div>
    <Input.Group style={style}>
      <b>http://</b>
      <Input placeholder='email' />
    </Input.Group>
    <Input.Group style={style}>
      <Input placeholder='email' />
      <b>.com</b>
    </Input.Group>
    <Input.Group style={style}>
      <b>http://</b>
      <Input placeholder='email' />
      <b>.com</b>
    </Input.Group>
  </div>
);

export default App;

```
### 提示文字
在 input 上设置的 tip 在 focus 时弹出
```tsx
/**
 * cn - 提示文字
 *    -- 在 input 上设置的 tip 在 focus 时弹出
 * en - Tip
 *    -- The tip set on the input pops up when focus
 */

import { Input } from 'shineout';

export default () => {
  return <Input width={300} placeholder='input something' tip={'please input something here'} />;
};

```
### 校验
设置了 <span>rules</span>，会自动校验输入数据，设置了 <span>popover</span> 会在指定位置弹出
如果没有设置 <span>popover</span>，不会弹出错误提示
有错误时，提示框不会隐藏
```tsx
/**
 * cn - 校验
 *    -- 设置了 `rules`，会自动校验输入数据，设置了 `popover` 会在指定位置弹出
 *    -- 如果没有设置 `popover`，不会弹出错误提示
 *    -- 有错误时，提示框不会隐藏
 * en - Validate
 *    -- When the `rules` property is set, it will automatically verify the input data. When the `popover` property is set, it will pop up at the specified location
 *    -- If the popover `property` is not set, no error message will pop up
 *    -- If input is invalid, the message will not be hidden
 */

import React from 'react';
import { Input, Rule } from 'shineout';

const rules = Rule();

export default function () {
  return (
    <Input
      placeholder='email'
      rules={[rules.required]}
      tip='Please enter a valid Email address'
      popover='top-left'
      width={300}
    />
  );
}

```
### 允许删除
设置 <span>clearable</span> 属性，Input 将显示删除按钮，点击删除按钮清空内容
```tsx
/**
 * cn - 允许删除
 *    -- 设置 `clearable` 属性，Input 将显示删除按钮，点击删除按钮清空内容
 * en -  allow clear
 *    -- Set the `clearable` property, the Input will display the clear button, click the clear button to clear the content
 */
import React from 'react';
import { Input } from 'shineout';

const App: React.FC = () => <Input width={300} clearable placeholder='input something' />;

export default App;

```
### 禁用
开启 <span>disabled</span> 属性后，组件将禁止输入
```tsx
/**
 * cn - 禁用
 *    -- 开启 `disabled` 属性后，组件将禁止输入
 * en - disabled
 *    -- When the `disabled` attribute is enabled, the component will prevent input
 */

import React from 'react';
import { Input } from 'shineout';

const style: React.CSSProperties = { width: 300 };

const App: React.FC = () => (
  <div>
    <Input.Group disabled style={{ ...style, marginBottom: 24 }}>
      <Input placeholder='first name' />
      -
      <Input placeholder='last name' />
    </Input.Group>

    <Input disabled style={style} placeholder='disabled input' />
  </div>
);

export default App;

```
### 内置密码组件
使用内置 password 组件专门处理密码业务场景
```tsx
/**
 * cn - 内置密码组件
 *    -- 使用内置 password 组件专门处理密码业务场景
 * en - Built-in password component
 *    -- We use the built-in password component specifically for handling password-related scenarios
 */

import React from 'react';
import { Form, Input } from 'shineout';

const App: React.FC = () => (
  <Form>
    <Input.Password
      width={300}
      name={'password'}
      defaultValue='12312312312321312321312'
      placeholder='input password'
      visibilityToggle
      clearable
    />
  </Form>
);

export default App;

```
### 内嵌标题
使用 innerTitle 展示内嵌标题
```tsx
/**
 /**
 * cn - 内嵌标题
 *    -- 使用 innerTitle 展示内嵌标题
 * en - inner title
 *    -- use innerTitle to display the inner title
 */
import React from 'react';
import { Input } from 'shineout';

const App: React.FC = () => (
  <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 24 }}>
    <Input innerTitle='Small title' clearable size={'small'} />
    <Input innerTitle='Medium Title' clearable />
    <Input innerTitle='Large Title' clearable size={'large'} />
  </div>
);

export default App;

```
### 下边框
开启 <span>underline</span> 属性后，组件将支持下边框样式，仅展示下部的边框
```tsx
/**
 * cn - 下边框
 *    -- 开启 `underline` 属性后，组件将支持下边框样式，仅展示下部的边框
 * en - Bottom border
 *    -- After enabling the `underline` attribute, the component will support the bottom border style and display only the border at the bottom
 */

import React from 'react';
import { Input } from 'shineout';

const App: React.FC = () => <Input width={300} underline clearable placeholder='Underline' />;

export default App;

```
### 自动选中
开启 <span>autoSelect</span> 属性后，当 Input 组件聚焦时，将自动全选当前 Input 组件的内容
```tsx
/**
 * cn - 自动选中
 *    -- 开启 `autoSelect` 属性后，当 Input 组件聚焦时，将自动全选当前 Input 组件的内容
 * en - Automatically select Input
 *    -- After enabling the `autoSelect` attribute, when the Input component is focused, the content of the current Input component will be automatically selected
 */

import React from 'react';
import { Input } from 'shineout';

const App: React.FC = () => (
  <Input width={300} defaultValue={'hello world'} placeholder='input something' autoSelect />
);

export default App;

```
### 清除空格
开启 <span>trim</span> 属性，Input 组件会在键入内容后去除内容两端的空格字符
```tsx
/**
 * cn - 清除空格
 *    -- 开启 `trim` 属性，Input 组件会在键入内容后去除内容两端的空格字符
 * en - Trim whitespace
 *    -- After enabling the `trim` attribute, the Input component will remove the whitespace characters at both ends of the content after typing
 */

import React from 'react';
import { Input } from 'shineout';

const App: React.FC = () => <Input width={300} placeholder='input something' trim />;

export default App;

```
### 键盘事件
Input 组件支持 <span>onKeyUp</span>（键盘弹起）、<span>onKeyDown</span>（键盘按下）、<span>onEnterPress</span>（回车） 事件
```tsx
/**
 * cn - 键盘事件
 *    -- Input 组件支持 `onKeyUp`（键盘弹起）、`onKeyDown`（键盘按下）、`onEnterPress`（回车） 事件
 * en - Keyboard events
 *    -- The Input component supports the `onKeyUp` (key up), `onKeyDown` (key down), and `onEnterPress` (enter key) events
 */

import React, { useState } from 'react';
import { Input } from 'shineout';

const style: React.CSSProperties = { marginBottom: 24, width: 300 };

const App: React.FC = () => {
  const [keyUp, setKeyUp] = useState<number>(0);
  const [keyDown, setKeyDown] = useState<number>(0);
  const [keyEnterPress, setKeyEnterPress] = useState<number>(0);

  const onKeyUp = () => setKeyUp(keyUp + 1);
  const onKeyDown = () => setKeyDown(keyDown + 1);
  const onEnterPress = () => setKeyEnterPress(keyEnterPress + 1);

  return (
    <div>
      <Input.Group style={style}>
        <Input placeholder='onKeyUp' onKeyUp={onKeyUp} />
        <b className='onKeyUp'>{`onKeyUp: ${keyUp} times`}</b>
      </Input.Group>

      <Input.Group style={style}>
        <Input placeholder='onKeyDown' onKeyDown={onKeyDown} />
        <b className='onKeyDown'>{`onKeyDown: ${keyDown} times`}</b>
      </Input.Group>

      <Input.Group style={style}>
        <Input placeholder='onEnterPress' onEnterPress={onEnterPress} />
        <b className='onEnterPress'>{`onEnterPress: ${keyEnterPress} times`}</b>
      </Input.Group>
    </div>
  );
};

export default App;

```
### 输入限制
通过设置 <span>min</span>（最小值）、 <span>max</span>（最大值）、 <span>maxLength</span>（最大长度）来限制 Input 组件的输入内容
```tsx
/**
 * cn - 输入限制
 *    -- 通过设置 `min`（最小值）、 `max`（最大值）、 `maxLength`（最大长度）来限制 Input 组件的输入内容
 * en - Input restriction
 *    -- Set `min` (minimum value), `max` (maximum value), and `maxLength` (maximum length) to restrict the input content of the Input component
 */

import React from 'react';
import { Input } from 'shineout';

const style: React.CSSProperties = { marginBottom: 24 };

const App: React.FC = () => {
  return (
    <div style={{ width: 300 }}>
      <Input.Group style={style}>
        <b className='min'>min</b>
        <Input.Number placeholder='100' min={100} />
      </Input.Group>

      <Input.Group style={style}>
        <b className='max'>max</b>
        <Input.Number placeholder='200' max={200} />
      </Input.Group>

      <Input.Group style={style}>
        <b className='maxLength'>maxLength</b>
        <Input placeholder='5' maxLength={5} />
      </Input.Group>
    </div>
  );
};

export default App;

```
### clearToUndefined

```tsx
/**
 * cn - clearToUndefined
 *    --
 * en - clearToUndefined
 *    --
 */

import React from 'react';
import { Input } from 'shineout';

const App: React.FC = () => (
  <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 24 }}>
    <Input clearable placeholder='input' />
    <Input
      clearable
      clearToUndefined
      placeholder='input clearToUndefined'
      onChange={console.log.bind(null, 'change')}
    />
    <Input.Number clearable placeholder='number' />
    <Input.Number
      clearable
      allowNull
      placeholder='number allowNull'
      onChange={console.log.bind(null, 'change')}
    />
    <Input.Number
      clearable
      clearToUndefined
      placeholder='number clearToUndefined'
      onChange={console.log.bind(null, 'change')}
    />

    <Input.Password clearable placeholder='password' />
    <Input.Password
      clearable
      clearToUndefined
      placeholder='password clearToUndefined'
      onChange={console.log.bind(null, 'change')}
    />
  </div>
);

export default App;

```
### border
设置 <span>border</span> false ，Input 组件将不再显示边框
```tsx
/**
 * cn - border
 *    -- 设置 `border` false ，Input 组件将不再显示边框
 * en - Borderless mode
 *    -- Set `border` false, the Input component will no longer display the border
 */

import { Input } from 'shineout';

export default () => {
  return (
    <Input
      style={{ backgroundColor: '#eee' }}
      width={300}
      placeholder='input something'
      border={false}
    />
  );
};

```
### ref

```tsx
/**
 * cn - ref
 *    --
 * en - ref
 *    --
 */

import { Input } from 'shineout';

export default () => {
  return (
    <Input
      width={300}
      placeholder='input something'
      forwardRef={(e) => {
        console.log('ref', e);
      }}
    />
  );
};

```
### info

```tsx
/**
 * cn - info
 *    --
 * en - info
 *    --
 */

import { Input } from 'shineout';

export default () => {
  return <Input width={300} placeholder='input something' info={5} />;
};

```
### delay
delay=300
```tsx
/**
 * cn - delay
 *    -- delay=300
 */
import { useState } from 'react';
import { Input } from 'shineout';

export default () => {
  const [v, setV] = useState('');
  return (
    <>
      <span>{v}</span>
      <Input
        width={300}
        value={v}
        placeholder='input something'
        delay={300}
        onChange={(d) => {
          console.log(d);
          setV(d || '');
        }}
      />
    </>
  );
};

```
## Guide
### 何时使用
需要输入文本信息内容时使用
### 与布局相关
输入框在表单应用中的布局样式，分为常规布局和多种输入框组合布局
### 推荐使用
当高级筛选组件遇到多语言场景的时候会出现字段过长导致换行的情况，这个时候推荐使用内嵌输入框，解决文本过长换行的问题。


# List
最基础的列表展示，可承载文字、列表、图片、段落
## API
### List
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|striped|boolean ||是否显示交错斑马底纹|
|pagination|PaginationProps |PaginationProps|分页展示, 详见 Pagination|
|itemStyle|CSSProperties ||列表容器样式|
|colNum|number |1|多列展示|
|data|any[]||渲染数据|
|keygen|/ ObjectKey<DataItem>  / ((data: DataItem, index?: number) => string / number)  / true||生成每一项key的辅助方法\n为 true 时，以数据项本身作为 key，相当于 (d => d)\n为函数时，使用此函数返回值\n为 string 时，使用这个 string 对应的数据值。如 \"id\"，相当于 (d => d.id)|
|renderItem|ObjectKey<DataItem> / ((d: DataItem, index: number) => ReactNode) ||需要渲染成列表的数据|
|fixed|boolean |false|是否启用虚拟列表|
|height|number ||列表高度|
|bordered|boolean |false|是否显示边框|
|lineHeight|number |32|列表项高度|
|rowsInView|number |10|同时展示的列表项数量|
|empty|ReactNode||无数据时展示的内容|
|scrollLoading|(() => void) ||滚动到底部时触发|
|size|\"small\" / \"large\" / \"default\"|\"default\"|尺寸|
|loading|ReactNode|false|加载中|
|footer|ReactNode / (() => ReactNode)||底部内容|
|rowClassName|string / ((rowData: DataItem, index: number) => string ) ||自定义行 className|
|value|any[]||当前选中值，格式和 onChange 返回值一致|
|onChange|((value: Value, data: DataItem / DataItem[]) => void) ||选择行。rowData 为选中的数据，rowIndex 为选中行号。如果需要数据需要格式化的处理，建议配置 format。|
|prediction|((value: Value extends (infer U)[] ? U : Value, data: DataItem) => boolean) |(val, d) => val===format(d)|默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配|
|disabled|((data: Item) => boolean) / boolean|false|如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项|
|format|ObjectKey<DataItem> / ((data: DataItem) => Value extends (infer U)[] ? U : Value) |d => d|格式化 value, 默认值，返回原始数据。 为 string 时，会作为 key 从原始数据中获取值，相当于 (d) => d\\[format]; 为函数时，以函数返回结果作为 value。|
## Example
### 基本用法
基础的List用法
```tsx
/**
 * cn - 基本用法
 *    -- 基础的List用法
 * en - Base
 *    -- Basic List usage
 */
import React from 'react';
import { List, TYPE, Button } from 'shineout';

interface ListItem {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}
type ListProps = TYPE.List.Props<ListItem, ListItem>;
type ListData = ListProps['data'];
type ListRenderItem = ListProps['renderItem'];

const data: ListData = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    start: '2012-01-29',
    time: '01:42',
    salary: 115777,
    country: 'Reunion',
    office: 'Miami',
    office5: 'Istanbul',
    height: 113.74,
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    start: '2007-09-04',
    time: '03:26',
    salary: 396093,
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
    office5: 'Shenzhen',
    height: 82.13,
  },
  {
    id: 3,
    firstName: 'Dylan',
    lastName: 'Ratke',
    position: 'Development Lead',
    start: '2009-10-16',
    time: '01:45',
    salary: 236064,
    country: 'Peru',
    office: 'Boston',
    office5: 'Delhi',
    height: 179.53,
  },
  {
    id: 4,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    start: '2014-06-30',
    time: '02:17',
    salary: 338985,
    country: 'Peru',
    office: 'Chengdu',
    office5: 'Dallas-Fort Worth',
    height: 190.11,
  },
];

const App: React.FC = () => {
  const renderItem: ListRenderItem = (rowData) => (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', fontSize: '14px' }}>
      <svg
        width='40'
        height='40'
        viewBox='0 0 40 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z'
          fill='#E8EBF0'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M19.8301 21.0204C22.46 21.0204 24.592 18.8884 24.592 16.2585C24.592 13.6286 22.46 11.4966 19.8301 11.4966C17.2002 11.4966 15.0682 13.6286 15.0682 16.2585C15.0682 18.8884 17.2002 21.0204 19.8301 21.0204ZM16.7628 22.7211C13.9482 22.7211 11.6665 25.0028 11.6665 27.8174C11.6665 28.1963 11.9737 28.5034 12.3525 28.5034H27.6471C28.026 28.5034 28.3332 28.1963 28.3332 27.8174C28.3332 25.0028 26.0515 22.7211 23.2369 22.7211H16.7628Z'
          fill='#B3B7C1'
        />
      </svg>
      <div style={{ flex: 1, minWidth: 0, margin: '0 12px' }}>
        <div style={{ fontWeight: 'bold' }}>List Title</div>
        <div>{rowData.position}</div>
      </div>
      <div>
        <Button type='primary' mode='text'>
          Preview
        </Button>
        <Button type='primary' mode='text'>
          Edit
        </Button>
        <Button type='primary' mode='text'>
          Delete
        </Button>
      </div>
    </div>
  );

  return <List keygen='id' bordered data={data} renderItem={renderItem} />;
};

export default App;

```
### 不同尺寸
通过设置 size 为 <span>large</span> <span>small</span> 分别把按钮设为大、小尺寸。若不设置 size，则尺寸为中
```tsx
/**
 * cn - 不同尺寸
 *    -- 通过设置 size 为 `large` `small` 分别把按钮设为大、小尺寸。若不设置 size，则尺寸为中
 * en - Size
 *    -- Set size to `large` or `small` to change the size of button
 */
import React, { useState } from 'react';
import { List, Radio, TYPE } from 'shineout';

interface ListItem {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}
type ListProps = TYPE.List.Props<ListItem, ListItem>;
type ListData = ListProps['data'];
type ListRenderItem = ListProps['renderItem'];

const data: ListData = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    start: '2012-01-29',
    time: '01:42',
    salary: 115777,
    country: 'Reunion',
    office: 'Miami',
    office5: 'Istanbul',
    height: 113.74,
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    start: '2007-09-04',
    time: '03:26',
    salary: 396093,
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
    office5: 'Shenzhen',
    height: 82.13,
  },
  {
    id: 3,
    firstName: 'Dylan',
    lastName: 'Ratke',
    position: 'Development Lead',
    start: '2009-10-16',
    time: '01:45',
    salary: 236064,
    country: 'Peru',
    office: 'Boston',
    office5: 'Delhi',
    height: 179.53,
  },
  {
    id: 4,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    start: '2014-06-30',
    time: '02:17',
    salary: 338985,
    country: 'Peru',
    office: 'Chengdu',
    office5: 'Dallas-Fort Worth',
    height: 190.11,
  },
];

const renderItem: ListRenderItem = (rowData) => (
  <div>{`Name: ${rowData.firstName}-${rowData.lastName}`}</div>
);

const sizeList = ['small', 'default', 'large'];
const App: React.FC = () => {
  const [size, setSize] = useState('default');

  return (
    <>
      <Radio.Group
        style={{ marginBottom: 24 }}
        keygen
        data={sizeList}
        value={size}
        onChange={setSize}
      />
      <List keygen='id' bordered data={data} renderItem={renderItem} size={size} />
    </>
  );
};

export default App;

```
### 自定义边框
设置 bordered 为 false 关闭默认边框
```tsx
/**
 * cn - 自定义边框
 *    -- 设置 bordered 为 false 关闭默认边框
 * en - custom border
 *    -- Set bordered to false to close the default border
 */
import React from 'react';
import { List, TYPE } from 'shineout';

interface ListItem {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}
type ListProps = TYPE.List.Props<ListItem, ListItem>;
type ListData = ListProps['data'];
type ListRenderItem = ListProps['renderItem'];

const data: ListData = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    start: '2012-01-29',
    time: '01:42',
    salary: 115777,
    country: 'Reunion',
    office: 'Miami',
    office5: 'Istanbul',
    height: 113.74,
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    start: '2007-09-04',
    time: '03:26',
    salary: 396093,
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
    office5: 'Shenzhen',
    height: 82.13,
  },
  {
    id: 3,
    firstName: 'Dylan',
    lastName: 'Ratke',
    position: 'Development Lead',
    start: '2009-10-16',
    time: '01:45',
    salary: 236064,
    country: 'Peru',
    office: 'Boston',
    office5: 'Delhi',
    height: 179.53,
  },
  {
    id: 4,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    start: '2014-06-30',
    time: '02:17',
    salary: 338985,
    country: 'Peru',
    office: 'Chengdu',
    office5: 'Dallas-Fort Worth',
    height: 190.11,
  },
];

const renderItem: ListRenderItem = (rowData) => (
  <div>{`Name: ${rowData.firstName}-${rowData.lastName}`}</div>
);

const App: React.FC = () => {
  return (
    <div style={{ padding: '0 16px', border: '1px solid #E8EBF0' }}>
      <List
        itemStyle={{ paddingLeft: 0, paddingRight: 0 }}
        keygen='id'
        bordered={false}
        data={data}
        renderItem={renderItem}
      />
    </div>
  );
};

export default App;

```
### 大数据列表
设置 fixed 属性来启用虚拟列表，本例加载了10000条数据
支持自动高度，默认跟随父元素高度
lineHeight 用来设置列表项高度
rowsInView 用来设置同时所展示的列表项数量，默认为10个
```tsx
/**
 * cn - 大数据列表
 *    -- 设置 fixed 属性来启用虚拟列表，本例加载了10000条数据
 *    -- 支持自动高度，默认跟随父元素高度
 *    -- lineHeight 用来设置列表项高度
 *    -- rowsInView 用来设置同时所展示的列表项数量，默认为10个
 * en - Big data list
 *    -- Set the fixed property to enable the virtual list, which in this case loads 10,000 pieces of data
 *    -- support automatic height, and follow the height of parent element by default
 *    -- lineheight is used to set the height of list items
 *    -- rowsinview is used to set the number of list items displayed on a page. The default is 10
 */
import React from 'react';
import { List, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface ListItem {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}
type ListProps = TYPE.List.Props<ListItem, any>;
type ListRenderItem = ListProps['renderItem'];

const names: ListItem[] = user.fetchSync(10000);

const style: React.CSSProperties = {
  width: 30,
  height: 30,
  background: '#eee',
  borderRadius: '50%',
  marginInlineEnd: 12,
  alignItems: 'center',
  display: 'inline-flex',
  justifyContent: 'center',
};

// eslint-disable-next-line react/prop-types
const renderItem: ListRenderItem = ({ id, firstName }) => (
  <div style={{ height: 30, display: 'flex', alignItems: 'center' }}>
    <span style={style}>{firstName.slice(0, 1)}</span>
    <span style={{ flex: 1 }}>{firstName}</span>
    <span>-{id}</span>
  </div>
);

const App: React.FC = () => (
  <List
    height={300}
    lineHeight={54}
    fixed
    keygen='id'
    bordered
    data={names}
    renderItem={renderItem}
  />
);

export default App;

```
### 分页
前端分页的情况下, 设置 pagination 显示分页，没有设置 onChange 处理数据的情况下，会自动对数据进行分页
pagination 的参数和 Pagination 组件一致
```tsx
/**
 * cn - 分页
 *    -- 前端分页的情况下, 设置 pagination 显示分页，没有设置 onChange 处理数据的情况下，会自动对数据进行分页
 *    -- pagination 的参数和 Pagination 组件一致
 * en - Pagination
 *   -- Set the pagination property to show the pagination and if not set onChange property, the data is automatically paged
 *    -- The parameters of pagination are consistent with the Pagination component
 */
import React, { useState, useEffect } from 'react';
import { List, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface ListItem {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}
type ListProps = TYPE.List.Props<ListItem, ListItem>;
type ListRenderItem = ListProps['renderItem'];

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState<number>(1);
  const [data, setData] = useState<ListItem[]>([]);

  const fetchData = (c: number) => {
    setLoading(true);
    user.fetch
      .get('List', { current, pageSize: 10, sorter: {}, username: '' })
      .then((_data: { data: any }) => {
        setData(_data.data);
        setLoading(false);
        setCurrent(c);
      });
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const renderItem: ListRenderItem = (rowData) => (
    <div>{`Name: ${rowData.firstName}-${rowData.lastName}`}</div>
  );

  const handlePageChange = (index: number) => {
    if (index > 10) return;
    fetchData(index);
  };

  const pagination = {
    current,
    total: 100,
    pageSize: 10,
    align: 'right',
    onChange: handlePageChange,
  };

  return (
    <List
      keygen='id'
      format='id'
      bordered
      data={data}
      loading={loading}
      renderItem={renderItem}
      pagination={pagination}
    />
  );
};

export default App;

```
### 选择行
设置 onChange 属性，会自动添加选择行
```tsx
/**
 * cn - 选择行
 *    -- 设置 onChange 属性，会自动添加选择行
 * en - Select
 *    -- Set the onChange property will automatically add a row with checkbox
 */
import React, { useState, useEffect } from 'react';
import { List, Checkbox, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface ListItem {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}
type ListProps = TYPE.List.Props<ListItem, number[]>;
type ListOnChange = ListProps['onChange'];
type ListRenderItem = ListProps['renderItem'];

type CheckboxProps = TYPE.Checkbox.Props<any>;
type CheckboxOnChange = CheckboxProps['onChange'];

const style: React.CSSProperties = {
  padding: '12px 16px',
  display: 'flex',
  fontSize: 14,
  lineHeight: '22px',
  alignItems: 'center',
  justifyContent: 'flex-start',
  border: '1px solid transparent',
};

const App: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ListItem[]>([]);
  const [value, setValue] = useState<number[]>([1]);

  const fetchData = (c: number) => {
    setLoading(true);
    user.fetch
      .get('List', { current, pageSize: 10, sorter: {}, username: '' })
      .then((_data: { data: ListItem[] }) => {
        setData([...data, ..._data.data]);
        setCurrent(c);
        setLoading(false);
      });
  };

  const getChecked = () => {
    if (!value || value.length <= 0) return false;
    if (value.length === data.length) return true;
    return 'indeterminate';
  };

  const onChange: ListOnChange = (selectedValue) => {
    console.log('selectValue: ', selectedValue);
    setValue(selectedValue);
  };

  const checkboxOnChange: CheckboxOnChange = (flag: boolean) => {
    if (flag) {
      setValue(data.map((v: ListItem) => v.id));
      return;
    }
    setValue([]);
  };

  const renderItem: ListRenderItem = (rowData) => (
    <div>{`From ${rowData.country}. Name: ${rowData.firstName}-${rowData.lastName}`}</div>
  );

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <div>
      <div style={style}>
        <Checkbox checked={getChecked()} onChange={checkboxOnChange} />
        <div>{`Selected ${value.length}`}</div>
      </div>
      <List
        format='id'
        keygen='id'
        bordered
        data={data}
        value={value}
        loading={loading}
        onChange={onChange}
        renderItem={renderItem}
      />
    </div>
  );
};

export default App;

```
### 斑马纹
基础的List用法
```tsx
/**
 * cn - 斑马纹
 *    -- 基础的List用法
 * en - Base
 *    -- Basic List usage
 */
import React from 'react';
import { List, TYPE } from 'shineout';

interface ListItem {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}
type ListProps = TYPE.List.Props<ListItem, ListItem>;
type ListData = ListProps['data'];
type ListRenderItem = ListProps['renderItem'];

const data: ListData = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    start: '2012-01-29',
    time: '01:42',
    salary: 115777,
    country: 'Reunion',
    office: 'Miami',
    office5: 'Istanbul',
    height: 113.74,
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    start: '2007-09-04',
    time: '03:26',
    salary: 396093,
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
    office5: 'Shenzhen',
    height: 82.13,
  },
  {
    id: 3,
    firstName: 'Dylan',
    lastName: 'Ratke',
    position: 'Development Lead',
    start: '2009-10-16',
    time: '01:45',
    salary: 236064,
    country: 'Peru',
    office: 'Boston',
    office5: 'Delhi',
    height: 179.53,
  },
  {
    id: 4,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    start: '2014-06-30',
    time: '02:17',
    salary: 338985,
    country: 'Peru',
    office: 'Chengdu',
    office5: 'Dallas-Fort Worth',
    height: 190.11,
  },
];

const App: React.FC = () => {
  const renderItem: ListRenderItem = (rowData) => (
    <div>{`Name: ${rowData.firstName}-${rowData.lastName}`}</div>
  );

  return <List keygen='id' striped bordered data={data} renderItem={renderItem} />;
};

export default App;

```
### 点击加载
通过使用 footer 属性，可实现加载更多功能
```tsx
/**
 * cn - 点击加载
 *    -- 通过使用 footer 属性，可实现加载更多功能
 * en - Load more
 *    -- Through use the footer attribute, you can load more functions
 */
import React, { useState, useEffect } from 'react';
import { List, Button, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface ListItem {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}
type ListProps = TYPE.List.Props<ListItem, ListItem>;
type ListRenderItem = ListProps['renderItem'];

const style: React.CSSProperties = {
  padding: 16,
  display: 'flex',
  lineHeight: '22px',
  alignItems: 'center',
  justifyContent: 'center',
};

const App: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ListItem[]>([]);

  const fetchData = (c: number) => {
    setLoading(true);
    user.fetch
      .get('List', { current: c, pageSize: 5, sorter: {}, username: '' })
      .then((_data: { data: ListItem[] }) => {
        setData([...data, ..._data.data]);
        setCurrent(c);
        setLoading(false);
      });
  };

  const onClick = () => {
    if (loading) return;

    fetchData(current + 1);
  };

  const renderItem: ListRenderItem = (rowData) => (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', fontSize: '14px' }}>
      <svg
        width='40'
        height='40'
        viewBox='0 0 40 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z'
          fill='#E8EBF0'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M19.8301 21.0204C22.46 21.0204 24.592 18.8884 24.592 16.2585C24.592 13.6286 22.46 11.4966 19.8301 11.4966C17.2002 11.4966 15.0682 13.6286 15.0682 16.2585C15.0682 18.8884 17.2002 21.0204 19.8301 21.0204ZM16.7628 22.7211C13.9482 22.7211 11.6665 25.0028 11.6665 27.8174C11.6665 28.1963 11.9737 28.5034 12.3525 28.5034H27.6471C28.026 28.5034 28.3332 28.1963 28.3332 27.8174C28.3332 25.0028 26.0515 22.7211 23.2369 22.7211H16.7628Z'
          fill='#B3B7C1'
        />
      </svg>
      <div style={{ flex: 1, minWidth: 0, margin: '0 12px' }}>
        <div style={{ fontWeight: 'bold' }}>List Title</div>
        <div>{rowData.position}</div>
      </div>
      <div>
        <Button type='primary' mode='text'>
          Preview
        </Button>
        <Button type='primary' mode='text'>
          Edit
        </Button>
        <Button type='primary' mode='text'>
          Delete
        </Button>
      </div>
    </div>
  );

  const renderFooter = () => (
    <div style={style}>
      <Button loading={loading} onClick={onClick} mode='text' type='primary'>
        load more
      </Button>
    </div>
  );

  useEffect(() => {
    fetchData(1);
  }, []);

  return <List keygen='id' data={data} bordered renderItem={renderItem} footer={renderFooter} />;
};

export default App;

```
### 滚动加载
设置 scrollLoading 属性，当滚动到底部时，会自动调用该属性
```tsx
/**
 * cn - 滚动加载
 *    -- 设置 scrollLoading 属性，当滚动到底部时，会自动调用该属性
 * en - scroll loading
 *    -- Set the scrollLoad property, when the scroll to the bottom, it will automatically call to change the property
 */
import React, { useState, useEffect } from 'react';
import { List, Button, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface ListItem {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}
type ListProps = TYPE.List.Props<ListItem, number>;
type ListRenderItem = ListProps['renderItem'];

const style: React.CSSProperties = { maxHeight: 300 };

const App: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ListItem[]>([]);

  const fetchData = (c: number) => {
    setLoading(true);
    user.fetch
      .get('List', { current: c, pageSize: 10, sorter: {}, username: '' })
      .then((_data: { data: ListItem[] }) => {
        setData([...data, ..._data.data]);
        setCurrent(c);
        setLoading(false);
      });
  };

  const scrollLoading = () => {
    if (current >= 10) return;
    fetchData(current + 1);
  };

  const renderItem: ListRenderItem = (rowData) => (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', fontSize: '14px' }}>
      <svg
        width='40'
        height='40'
        viewBox='0 0 40 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z'
          fill='#E8EBF0'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M19.8301 21.0204C22.46 21.0204 24.592 18.8884 24.592 16.2585C24.592 13.6286 22.46 11.4966 19.8301 11.4966C17.2002 11.4966 15.0682 13.6286 15.0682 16.2585C15.0682 18.8884 17.2002 21.0204 19.8301 21.0204ZM16.7628 22.7211C13.9482 22.7211 11.6665 25.0028 11.6665 27.8174C11.6665 28.1963 11.9737 28.5034 12.3525 28.5034H27.6471C28.026 28.5034 28.3332 28.1963 28.3332 27.8174C28.3332 25.0028 26.0515 22.7211 23.2369 22.7211H16.7628Z'
          fill='#B3B7C1'
        />
      </svg>
      <div style={{ flex: 1, minWidth: 0, margin: '0 12px' }}>
        <div style={{ fontWeight: 'bold' }}>List Title</div>
        <div>{rowData.position}</div>
      </div>
      <div>
        <Button type='primary' mode='text'>
          Preview
        </Button>
        <Button type='primary' mode='text'>
          Edit
        </Button>
        <Button type='primary' mode='text'>
          Delete
        </Button>
      </div>
    </div>
  );

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <List
      bordered
      keygen='id'
      format='id'
      data={data}
      style={style}
      loading={loading}
      renderItem={renderItem}
      scrollLoading={scrollLoading}
    />
  );
};

export default App;

```
### List.BaseItem 布局(废弃)
使用 List.BaseItem 组件，可使用经典布局方式快速布局
```tsx
/**
 * cn - List.BaseItem 布局(废弃)
 *    -- 使用 List.BaseItem 组件，可使用经典布局方式快速布局
 * en - List.BaseItem layout
 *    -- Use List.BaseItem component to quickly layout
 */
import React, { useState, useEffect } from 'react';
import { List, Button, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface ListItem {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}
type ListProps = TYPE.List.Props<ListItem, number>;
type ListRenderItem = ListProps['renderItem'];

const { BaseItem } = List;

const image =
  'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-06.png';

const App: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ListItem[]>([]);

  const fetchData = (c: number) => {
    setLoading(true);
    user.fetch
      .get('List', { current: c, pageSize: 10, sorter: {}, username: '' })
      .then((_data: { data: ListItem[] }) => {
        setData([...data, ..._data.data]);
        setCurrent(c);
        setLoading(false);
      });
  };

  const renderItem: ListRenderItem = (rowData) => (
    <BaseItem
      avatar={image}
      content={`${rowData.firstName}-${rowData.lastName}: position: ${rowData.position}, country: ${rowData.country}, office: ${rowData.office}`}
      desc={`From ${rowData.country}. Position in ${rowData.position}. Start datetime ${rowData.start}.`}
      extra={[
        <Button type='primary' mode='text' key='edit'>
          edit
        </Button>,
        <Button type='primary' mode='text' key='more'>
          more
        </Button>,
      ]}
    />
  );

  useEffect(() => {
    fetchData(current);
  }, []);

  return <List key='1' keygen='id' data={data} loading={loading} renderItem={renderItem} />;
};

export default App;

```
### 多列
设置 colNum
```tsx
/**
 * cn - 多列
 *    -- 设置 colNum
 * en - colNum
 *    -- set colNum
 */
import React from 'react';
import { List, TYPE, Button } from 'shineout';

interface ListItem {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}
type ListProps = TYPE.List.Props<ListItem, ListItem>;
type ListData = ListProps['data'];
type ListRenderItem = ListProps['renderItem'];

const data: ListData = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    start: '2012-01-29',
    time: '01:42',
    salary: 115777,
    country: 'Reunion',
    office: 'Miami',
    office5: 'Istanbul',
    height: 113.74,
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    start: '2007-09-04',
    time: '03:26',
    salary: 396093,
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
    office5: 'Shenzhen',
    height: 82.13,
  },
  {
    id: 3,
    firstName: 'Dylan',
    lastName: 'Ratke',
    position: 'Development Lead',
    start: '2009-10-16',
    time: '01:45',
    salary: 236064,
    country: 'Peru',
    office: 'Boston',
    office5: 'Delhi',
    height: 179.53,
  },
  {
    id: 4,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    start: '2014-06-30',
    time: '02:17',
    salary: 338985,
    country: 'Peru',
    office: 'Chengdu',
    office5: 'Dallas-Fort Worth',
    height: 190.11,
  },
];

const App: React.FC = () => {
  const renderItem: ListRenderItem = (rowData) => (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', fontSize: '14px' }}>
      <svg
        width='40'
        height='40'
        viewBox='0 0 40 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z'
          fill='#E8EBF0'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M19.8301 21.0204C22.46 21.0204 24.592 18.8884 24.592 16.2585C24.592 13.6286 22.46 11.4966 19.8301 11.4966C17.2002 11.4966 15.0682 13.6286 15.0682 16.2585C15.0682 18.8884 17.2002 21.0204 19.8301 21.0204ZM16.7628 22.7211C13.9482 22.7211 11.6665 25.0028 11.6665 27.8174C11.6665 28.1963 11.9737 28.5034 12.3525 28.5034H27.6471C28.026 28.5034 28.3332 28.1963 28.3332 27.8174C28.3332 25.0028 26.0515 22.7211 23.2369 22.7211H16.7628Z'
          fill='#B3B7C1'
        />
      </svg>
      <div style={{ flex: 1, minWidth: 0, margin: '0 12px' }}>
        <div style={{ fontWeight: 'bold' }}>List Title</div>
        <div>{rowData.position}</div>
      </div>
      <div>
        <Button type='primary' mode='text'>
          Preview
        </Button>
        <Button type='primary' mode='text'>
          Edit
        </Button>
        <Button type='primary' mode='text'>
          Delete
        </Button>
      </div>
    </div>
  );

  return (
    <List
      keygen='id'
      style={{ color: 'blue' }}
      className='hello'
      bordered
      data={data}
      renderItem={renderItem}
      colNum={2}
    />
  );
};

export default App;

```
### 禁用
设置 disabled
```tsx
/**
 * cn - 禁用
 *    -- 设置 disabled
 * en - Disabled
 *    -- set disabled
 */
import React, { useState, useEffect } from 'react';
import { List, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface ListItem {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}
type ListProps = TYPE.List.Props<ListItem, number[]>;
type ListOnChange = ListProps['onChange'];
type ListRenderItem = ListProps['renderItem'];

const App: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ListItem[]>([]);
  const [value, setValue] = useState<number[]>([1]);

  const fetchData = (c: number) => {
    setLoading(true);
    user.fetch
      .get('List', { current, pageSize: 5, sorter: {}, username: '' })
      .then((_data: { data: ListItem[] }) => {
        setData([...data, ..._data.data]);
        setCurrent(c);
        setLoading(false);
      });
  };

  const onChange: ListOnChange = (selectedValue) => {
    console.log('selectValue: ', selectedValue);
    setValue(selectedValue);
  };

  const renderItem: ListRenderItem = (rowData) => (
    <div>{`From ${rowData.country}. Name: ${rowData.firstName}-${rowData.lastName}`}</div>
  );

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <div>
      <List
        format='id'
        keygen='id'
        disabled
        bordered
        data={data}
        value={value}
        loading={loading}
        onChange={onChange}
        renderItem={renderItem}
      />
    </div>
  );
};

export default App;

```
### 无数据文本
set empty
```tsx
/**
 * cn -  无数据文本
 *    -- set empty
 * en - Empty
 *    -- set empty
 */
import React from 'react';
import { List, TYPE, Button } from 'shineout';

interface ListItem {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}
type ListProps = TYPE.List.Props<ListItem, ListItem>;
type ListRenderItem = ListProps['renderItem'];

const App: React.FC = () => {
  const renderItem: ListRenderItem = (rowData) => (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', fontSize: '14px' }}>
      <svg
        width='40'
        height='40'
        viewBox='0 0 40 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z'
          fill='#E8EBF0'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M19.8301 21.0204C22.46 21.0204 24.592 18.8884 24.592 16.2585C24.592 13.6286 22.46 11.4966 19.8301 11.4966C17.2002 11.4966 15.0682 13.6286 15.0682 16.2585C15.0682 18.8884 17.2002 21.0204 19.8301 21.0204ZM16.7628 22.7211C13.9482 22.7211 11.6665 25.0028 11.6665 27.8174C11.6665 28.1963 11.9737 28.5034 12.3525 28.5034H27.6471C28.026 28.5034 28.3332 28.1963 28.3332 27.8174C28.3332 25.0028 26.0515 22.7211 23.2369 22.7211H16.7628Z'
          fill='#B3B7C1'
        />
      </svg>
      <div style={{ flex: 1, minWidth: 0, margin: '0 12px' }}>
        <div style={{ fontWeight: 'bold' }}>List Title</div>
        <div>{rowData.position}</div>
      </div>
      <div>
        <Button type='primary' mode='text'>
          Preview
        </Button>
        <Button type='primary' mode='text'>
          Edit
        </Button>
        <Button type='primary' mode='text'>
          Delete
        </Button>
      </div>
    </div>
  );

  return <List keygen='id' bordered data={[]} empty={'no data'} renderItem={renderItem} />;
};

export default App;

```
## Guide
### 何时使用
聚合同类信息内容，方便快速浏览和查询
### 组件搭配使用
1、列表与加载搭配使用
2、列表与分页搭配使用 ，当信息过多、需在每页固定展示一定数量时，可让用户翻页查找数据
### 推荐/慎用示例
1、列表的操作建议保证在 3 个及以内，尽量不超出。超出使用下拉菜单收纳，不建议放出过多操作
2、当列表内包含多种类型内容，需要复杂的后台分类筛选和管理时，建议使用表格而非列表


# Menu
用于承载网站的架构，并提供跳转的菜单列表
## API
### menu
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|mode|\"inline\" / \"vertical\" / \"horizontal\" / \"vertical-auto\" |\"inline\"|菜单样式|
|data|object[]|[]|需要渲染成菜单的数据|
|theme|\"dark\" ||主题|
|height|string / number ||菜单高度|
|openKeys|(string / number)[]|[]|展开的菜单(受控)|
|caretColor|string ||三角展开符颜色|
|frontCaret|boolean ||前置实心三角展开符|
|inlineIndent|number |24|每一层缩进宽度|
|looseChildren|boolean |false|如果 children 有设置则菜单项可展开|
|keygen|/ ObjectKey<DataItem>  / ((data: DataItem, index?: number) => string / number)  / true|true|生成每一项key的辅助方法。为 true 时，以数据项本身作为key，相当于 (d => d)。为函数时，使用此函数返回值。为string时，使用这个string对应的数据值。如 \"id\"，相当于 (d => d.id)|
|defaultOpenKeys|(string / number)[]|[]|初始展开的菜单;如果需要设置此值,则需要设置keygen,此值为一个包含key的数组|
|parentSelectable|boolean |false|父级菜单是否可选中|
|onClick|((data: DataItem) => void) ||子菜单点击事件,参数为当条数据|
|active|((data: DataItem) => boolean) ||验证是否激活,参数为对应的数据对象,返回true则代表该菜单激活|
|disabled|((data: DataItem) => boolean) |d => d.disabled|是否禁用选项|
|frontCaretType|\"hollow\" / \"solid\" |\"solid\"|前置三角展开符类型|
|onOpenChange|((keys: Key[]) => void) ||菜单展开/收起回调|
|linkKey|((d: DataItem) => string) / ObjectKey<DataItem> ||需要注入子菜单的链接键值|
|renderItem|ObjectKey<DataItem> / ((data: DataItem, index: number) => ReactNode) |\"title\"|元素渲染方式,如果为字符串,则会以对应的值作为显示内容;如果为函数,则以函数返回的结果作为显示内容,函数参数为对应的数据对象|
## Example
### 基本用法
Menu 通过数据来生成菜单项
```tsx
/**
 * cn - 基本用法
 *    -- Menu 通过数据来生成菜单项
 * en - Base
 *    -- Menu generates menu items through data
 */

import React, { useState } from 'react';
import { Menu, TYPE } from 'shineout';

interface MenuItem {
  id: string;
  title: string;
  children?: MenuItem[];
}
type MenuProps = TYPE.Menu.Props<MenuItem, string>;
type MenuActive = MenuProps['active'];
type MenuRenderItem = MenuProps['renderItem'];

const data: MenuItem[] = [
  {
    id: '1',
    title: 'Navigation One',
  },
  {
    id: '3',
    title: 'Navigation Two',
    children: [
      {
        id: '4',
        title: 'Option 1',
      },
      {
        id: '5',
        title: 'Option 2',
      },
    ],
  },
  {
    id: '6',
    title: 'Navigation Three',
    children: [
      {
        id: '7',
        title: 'Option 3',
      },
      {
        id: '8',
        title: 'Option 4',
        children: [
          {
            id: '9',
            title: 'Optic 1',
          },
          {
            id: '10',
            title: 'Optic 2',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Navigation Four',
  },
  {
    id: '11',
    title: 'This is a very very very very long menu title',
  },
];

const App: React.FC = () => {
  const [active, setActive] = useState('1');

  const handleClick = (d: MenuItem) => setActive(d.id);

  const renderItem: MenuRenderItem = (d: MenuItem) => d.title;

  const checkActive: MenuActive = (d: MenuItem) => active === d.id;

  return (
    <div>
      <Menu
        keygen='id'
        data={data}
        inlineIndent={24}
        active={checkActive}
        onClick={handleClick}
        style={{ width: 256, border: '1px solid #e8ebf0' }}
        renderItem={renderItem}
      />
    </div>
  );
};

export default App;

```
### 链接
可以通过设置 linkKey 来渲染出对应的链接
```tsx
/**
 * cn - 链接
 *    --  可以通过设置 linkKey 来渲染出对应的链接
 * en - link
 *    -- Can render the corresponding link by setting linkKey
 */
import React from 'react';
import { Menu, TYPE } from 'shineout';

interface MenuItem {
  id: string;
  link: string;
  title: string;
}
type MenuProps = TYPE.Menu.Props<MenuItem, string>;
type MenuRenderItem = MenuProps['renderItem'];

const data: MenuItem[] = [
  {
    id: '1',
    title: 'Google',
    link: 'https://www.google.com',
  },
  {
    id: '2',
    title: 'strackoverflow',
    link: 'https://www.strackoverflow.com',
  },
  {
    id: '3',
    title: 'github',
    link: 'https://www.github.com',
  },
];

const App: React.FC = () => {
  const renderItem: MenuRenderItem = (d: MenuItem) => d.title;

  return (
    <Menu
      keygen='id'
      linkKey='link'
      data={data}
      renderItem={renderItem}
      style={{ width: 256, border: '1px solid #e8ebf0' }}
      inlineIndent={24}
    />
  );
};

export default App;

```
### 父菜单可选中
设置 parentSelectable 使父级菜单支持单独选中 <br /> 此时父级菜单左侧区域用于选中，偏右侧区域用于展开和收起子菜单
```tsx
/**
 * cn - 父菜单可选中
 *    -- 设置 parentSelectable 使父级菜单支持单独选中 <br /> 此时父级菜单左侧区域用于选中，偏右侧区域用于展开和收起子菜单
 * en - Parent Selectable
 *    -- Setting the parentSelectable property can make the parent menu trigger the onClick of the Menu after clicking
 */
import React, { useState } from 'react';
import { Menu, TYPE } from 'shineout';

interface MenuItem {
  id: string;
  title: string;
  children?: MenuItem[];
}
type MenuProps = TYPE.Menu.Props<MenuItem, string>;
type MenuActive = MenuProps['active'];
type MenuRenderItem = MenuProps['renderItem'];

const data: MenuItem[] = [
  {
    id: '1',
    title: 'Parent 1',
    children: [
      {
        id: '2',
        title: 'Option 2',
      },
      {
        id: '3',
        title: 'Option 3',
      },
    ],
  },
  {
    id: '4',
    title: 'Parent 4',
    children: [
      {
        id: '5',
        title: 'Option 5',
      },
      {
        id: '6',
        title: 'Option 6',
      },
    ],
  },
  {
    id: '7',
    title: 'Option 7',
  },
];

const App: React.FC = () => {
  const [active, setActive] = useState('1');

  const renderItem: MenuRenderItem = (d: MenuItem) => d.title;

  const checkActive: MenuActive = (d: MenuItem) => active === d.id;

  const handleClick = (d: MenuItem) => {
    setActive(d.id);
  };

  return (
    <Menu
      keygen='id'
      data={data}
      parentSelectable
      active={checkActive}
      onClick={handleClick}
      style={{ width: 256, border: '1px solid #e8ebf0' }}
      renderItem={renderItem}
    />
  );
};

export default App;

```
### 前置展开符
使用 frontCaret 来前置展开符
使用 frontCaretType 来设置展开图标类型
```tsx
/**
 * cn - 前置展开符
 *    -- 使用 frontCaret 来前置展开符
 *    -- 使用 frontCaretType 来设置展开图标类型
 * en - put the expander in front
 *    -- use frontCaret to put the expander in front
 *    -- Use frontCaretType to set the Icon type
 */
import React, { useState } from 'react';
import { Menu, TYPE } from 'shineout';

interface MenuItem {
  id: string;
  title: string;
  children?: MenuItem[];
}
type MenuProps = TYPE.Menu.Props<MenuItem, string>;
type MenuActive = MenuProps['active'];
type MenuRenderItem = MenuProps['renderItem'];

const data: MenuItem[] = [
  {
    id: '1',
    title: 'Navigation One',
  },
  {
    id: '3',
    title: 'Navigation Two',
    children: [
      {
        id: '4',
        title: 'Option 1',
      },
      {
        id: '5',
        title: 'Option 2',
      },
    ],
  },
  {
    id: '6',
    title: 'Navigation Three',
    children: [
      {
        id: '7',
        title: 'Option 3',
      },
      {
        id: '8',
        title: 'Option 4',
        children: [
          {
            id: '9',
            title: 'Optic 1',
          },
          {
            id: '10',
            title: 'Optic 2',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Navigation Four',
  },
];

const App: React.FC = () => {
  const [active, setActive] = useState('1');

  const handleClick = (d: MenuItem) => setActive(d.id);

  const renderItem: MenuRenderItem = (d: MenuItem) => d.title;

  const checkActive: MenuActive = (d: MenuItem) => active === d.id;

  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <Menu
        keygen='id'
        frontCaret
        frontCaretType='solid'
        data={data}
        inlineIndent={24}
        active={checkActive}
        onClick={handleClick}
        style={{ width: 256, border: '1px solid #e8ebf0' }}
        renderItem={renderItem}
      />
      <Menu
        keygen='id'
        frontCaret
        frontCaretType='hollow'
        data={data}
        inlineIndent={24}
        active={checkActive}
        onClick={handleClick}
        style={{ width: 256, border: '1px solid #e8ebf0' }}
        renderItem={renderItem}
      />
    </div>
  );
};

export default App;

```
### 禁用菜单
通过 disabled 属性可以禁用选项
```tsx
/**
 * cn - 禁用菜单
 *    -- 通过 disabled 属性可以禁用选项
 * en - Disabled
 *    --Disable the option by the disabled property
 */
import React, { useState } from 'react';
import { Menu, TYPE } from 'shineout';

interface MenuItem {
  id: string;
  title: string;
  disabled?: boolean;
  children?: MenuItem[];
}
type MenuProps = TYPE.Menu.Props<MenuItem, string>;
type MenuActive = MenuProps['active'];
type MenuOnClick = MenuProps['onClick'];
type MenuDisabled = MenuProps['disabled'];
type MenuRenderItem = MenuProps['renderItem'];

const data: MenuItem[] = [
  {
    id: '1',
    title: 'Navigation One',
  },
  {
    id: '3',
    title: 'Navigation Two',
    disabled: true,
    children: [
      {
        id: '4',
        title: 'Option 1',
      },
      {
        id: '5',
        title: 'Option 2',
      },
    ],
  },
  {
    id: '6',
    title: 'Navigation Three',
    children: [
      {
        id: '7',
        title: 'Option 3',
      },
      {
        id: '8',
        title: 'Option 4',
        children: [
          {
            id: '9',
            title: 'Optic 1',
          },
          {
            id: '10',
            title: 'Optic 2',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Navigation Four',
    disabled: true,
  },
];

const App: React.FC = () => {
  const [active, setActive] = useState(['1']);

  const renderItem: MenuRenderItem = (d: MenuItem) => d.title;

  const checkDisabled: MenuDisabled = (d: MenuItem) => !!d.disabled;

  const handleClick: MenuOnClick = (d: MenuItem) => setActive([d.id]);

  const checkActive: MenuActive = (d: MenuItem) => active.includes(d.id);

  return (
    <Menu
      data={data}
      keygen='id'
      mode='inline'
      inlineIndent={24}
      active={checkActive}
      onClick={handleClick}
      style={{ width: 256, border: '1px solid #e8ebf0' }}
      renderItem={renderItem}
      disabled={checkDisabled}
    />
  );
};

export default App;

```
### 受控
active 参数控制选中选项
```tsx
/**
 * cn - 受控
 *    -- active 参数控制选中选项
 * en - Controlled
 *    -- Set active property to control the actived option
 */
import React, { useState } from 'react';
import { Menu, TYPE } from 'shineout';

interface MenuItem {
  id: string;
  title: string;
  children?: MenuItem[];
}
type MenuProps = TYPE.Menu.Props<MenuItem, string>;
type MenuActive = MenuProps['active'];
type MenuOnClick = MenuProps['onClick'];
type MenuRenderItem = MenuProps['renderItem'];

const data: MenuItem[] = [
  {
    id: '1',
    title: 'Navigation One',
  },
  {
    id: '3',
    title: 'Navigation Two',
    children: [
      {
        id: '4',
        title: 'Option 1',
      },
      {
        id: '5',
        title: 'Option 2',
      },
    ],
  },
  {
    id: '6',
    title: 'Navigation Three',
    children: [
      {
        id: '7',
        title: 'Option 3',
      },
      {
        id: '8',
        title: 'Option 4',
        children: [
          {
            id: '9',
            title: 'Optic 1',
          },
          {
            id: '10',
            title: 'Optic 2',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Navigation Four',
  },
];

const App: React.FC = () => {
  const [active, setActive] = useState(['1']);

  const renderItem: MenuRenderItem = (d: MenuItem) => d.title;

  const handleClick: MenuOnClick = (d: MenuItem) => setActive([d.id]);

  const checkActive: MenuActive = (d: MenuItem) => active.includes(d.id);

  return (
    <Menu
      data={data}
      keygen='id'
      mode='inline'
      inlineIndent={24}
      active={checkActive}
      onClick={handleClick}
      style={{ width: 256, border: '1px solid #e8ebf0' }}
      defaultOpenKeys={['3']}
      renderItem={renderItem}
    />
  );
};
export default App;

```
### 自定义渲染
设置 renderItem 属性展现稍微复杂的内容
```tsx
/**
 * cn - 自定义渲染
 *    -- 设置 renderItem 属性展现稍微复杂的内容
 * en - RenderItem
 *    -- Set the renderItem property to show format content
 */
import React, { useState } from 'react';
import { Menu, TYPE } from 'shineout';

interface MenuItem {
  id: string;
  title: string;
  children?: MenuItem[];
}
interface IconList {
  [x: number]: React.ReactNode;
}
type MenuProps = TYPE.Menu.Props<MenuItem, string>;
type MenuActive = MenuProps['active'];
type MenuOnClick = MenuProps['onClick'];
type MenuRenderItem = MenuProps['renderItem'];

const homeIcon = (
  <svg width='1em' height='1em' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M12.0218 2.00024L12.0602 2.00181C12.0752 2.00272 12.0902 2.00396 12.1052 2.00555C12.1245 2.00759 12.1439 2.01021 12.1632 2.0134C12.1834 2.01674 12.2037 2.02076 12.224 2.02541C12.2448 2.0302 12.2653 2.03563 12.2858 2.04174C12.3283 2.05443 12.3704 2.07012 12.4115 2.08874L12.5207 2.14669L12.6238 2.21913L22.6089 10.2191C23.617 11.0268 22.4745 12.5198 21.4564 11.8501L21.3614 11.7809L20.8121 11.3406C20.7259 11.2715 20.6001 11.2854 20.531 11.3716C20.5025 11.4071 20.487 11.4512 20.487 11.4967L20.4874 20C20.4874 21.4529 19.5572 22.0052 18.6068 21.9933L18.4903 22H5.50965C4.47075 22 3.51262 21 3.51262 20L3.51228 11.4968C3.51228 11.3864 3.42273 11.2968 3.31227 11.2968C3.26677 11.2968 3.22262 11.3124 3.18713 11.3408L2.63862 11.7809C1.63051 12.5886 0.426888 11.1445 1.3028 10.2968L1.39108 10.2191L11.3762 2.21913L11.4793 2.14669C11.4818 2.14511 11.4844 2.14354 11.487 2.14199L11.3762 2.21913C11.4218 2.18266 11.4697 2.15074 11.5194 2.12338C11.5462 2.10862 11.5735 2.09517 11.6013 2.08305C11.6177 2.0759 11.6343 2.06919 11.651 2.06295C11.6756 2.05379 11.7003 2.04564 11.7253 2.03849C11.7402 2.03424 11.7551 2.03033 11.7702 2.02678C11.7978 2.02024 11.8258 2.01488 11.8539 2.01072C11.8674 2.00874 11.8807 2.00705 11.894 2.00563C11.9258 2.00224 11.9579 2.00037 11.99 2C12.0004 2 12.0111 2 12.0218 2.00024ZM11.6874 4.53046L5.69668 9.32987C5.57823 9.42477 5.5093 9.56833 5.5093 9.72011L5.50964 19.5C5.50966 19.7761 5.73352 20 6.00965 20H8.00484C8.28097 20 8.50482 19.7761 8.50487 19.5L8.5052 14C8.5052 13.4872 8.89066 13.0645 9.38726 13.0067L9.4893 13.0008C9.49891 13.0003 9.50852 13 9.51814 13H14.4963C15.0478 13 15.4948 13.4477 15.4948 14L15.4945 19.5C15.4944 19.7761 15.7183 20 15.9944 20C15.9944 20.0001 15.9944 20 15.9944 20L17.9903 20C18.2665 20 18.4903 19.7761 18.4903 19.5V9.72009C18.4903 9.56833 18.4214 9.42478 18.303 9.32988L12.3126 4.53047C12.1299 4.38408 11.8701 4.38408 11.6874 4.53046ZM12.4978 15H11.5022C10.9499 15 10.5022 15.4477 10.5022 16V19.5C10.5022 19.7761 10.7261 20 11.0022 20H12.9978C13.2739 20 13.4978 19.7761 13.4978 19.5V16C13.4978 15.4477 13.0501 15 12.4978 15Z'
      fill='currentColor'
    />
  </svg>
);

const tagIcon = (
  <svg width='1em' height='1em' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M13.9994 2.00219L19.7686 2.24C20.7799 2.28169 21.6007 3.07247 21.68 4.08162L22.1572 10.1534C22.203 10.7366 21.9912 11.3106 21.5775 11.7243L11.6922 21.6097C10.9111 22.3907 9.64478 22.3907 8.86373 21.6097L2.58579 15.3317C1.80474 14.5507 1.80474 13.2844 2.58579 12.5033L12.5028 2.58628C12.8981 2.19097 13.4408 1.97916 13.9994 2.00219ZM13.917 4.00049L4.70711 13.2104C4.31658 13.6009 4.31658 14.2341 4.70711 14.6246L9.57084 19.4884C9.96136 19.8789 10.5945 19.8789 10.9851 19.4884L20.1633 10.3101L19.7209 4.68044C19.7011 4.42816 19.4959 4.23046 19.2431 4.22004L13.917 4.00049ZM15.3854 5.83727C16.7661 5.83727 17.8854 6.95655 17.8854 8.33727C17.8854 9.71798 16.7661 10.8373 15.3854 10.8373C14.0047 10.8373 12.8854 9.71798 12.8854 8.33727C12.8854 6.95655 14.0047 5.83727 15.3854 5.83727ZM15.3854 7.83727C15.1093 7.83727 14.8854 8.06112 14.8854 8.33727C14.8854 8.61341 15.1093 8.83727 15.3854 8.83727C15.6615 8.83727 15.8854 8.61341 15.8854 8.33727C15.8854 8.06112 15.6615 7.83727 15.3854 7.83727Z'
      fill='currentColor'
    />
  </svg>
);

const githubIcon = (
  <svg width='1em' height='1em' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M12.0011 2.00049C6.47548 1.9982 2 6.5931 2 12.2644C2 16.7492 4.79969 20.5614 8.69869 21.9615C9.22377 22.0969 9.14334 21.7136 9.14334 21.452V19.6732C6.11127 20.0381 5.98838 17.9771 5.78505 17.6328C5.37392 16.9121 4.40197 16.7285 4.69244 16.3842C5.38286 16.0193 6.08669 16.4761 6.90225 17.7131C7.49212 18.6106 8.64283 18.4591 9.22601 18.3099C9.35337 17.7705 9.62596 17.2885 10.0013 16.9144C6.85979 16.3361 5.55044 14.3668 5.55044 12.0257C5.55044 10.8896 5.91465 9.84534 6.62965 9.00302C6.17384 7.61445 6.6721 6.42555 6.73914 6.24883C8.03731 6.12948 9.38688 7.20361 9.4919 7.28853C10.2292 7.08426 11.0716 6.97639 12.0145 6.97639C12.9619 6.97639 13.8065 7.08885 14.5506 7.29542C14.803 7.09803 16.0543 6.17538 17.2609 6.28784C17.3257 6.46457 17.8128 7.62592 17.3838 8.99613C18.1077 9.84075 18.4764 10.8942 18.4764 12.0326C18.4764 14.3783 17.1581 16.3498 14.0076 16.919C14.5327 17.4515 14.8589 18.1905 14.8589 19.0076V21.5897C14.8768 21.7962 14.8589 22.0005 15.1941 22.0005C19.1512 20.6303 22 16.7905 22 12.2667C22 6.5931 17.5223 2.00049 12.0011 2.00049Z'
      fill='currentColor'
    />
  </svg>
);

const flagIcon = (
  <svg width='1em' height='1em' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M20.8307 1.01559C21.0306 0.979794 21.224 1.00728 21.3942 1.08123C21.4003 1.08519 21.4073 1.08828 21.4143 1.09145C21.5175 1.13795 21.611 1.20233 21.6919 1.2799C21.697 1.28477 21.7021 1.28976 21.7072 1.29482L21.7221 1.31005C21.7996 1.39091 21.864 1.48449 21.9114 1.58697C21.9137 1.59469 21.9168 1.60169 21.9198 1.60872C22.0144 1.8233 22.0335 2.07618 21.9439 2.33228L21.9631 2.27191C21.9593 2.2857 21.9551 2.29942 21.9507 2.31306L21.9439 2.33228L15.2939 21.3323C14.9947 22.1871 13.8041 22.2357 13.4362 21.4081L9.79203 13.2089L1.59389 9.56574C0.805676 9.21542 0.812201 8.11879 1.55305 7.75669L1.66968 7.70807L20.6697 1.05807C20.6764 1.05573 20.683 1.05347 20.6897 1.05128C20.7026 1.04688 20.7163 1.04273 20.7301 1.03888C20.7588 1.03075 20.7868 1.02405 20.8147 1.01859C20.8176 1.01863 20.8206 1.01807 20.8236 1.01753L20.8307 1.01559ZM18.608 5.808L11.742 12.674L14.239 18.2909L18.608 5.808ZM17.195 4.391L4.71003 8.76193L10.327 11.259L17.195 4.391Z'
      fill='currentColor'
    />
  </svg>
);

const Icons: IconList = {
  6: tagIcon,
  1: homeIcon,
  3: flagIcon,
  2: githubIcon,
};

const data: MenuItem[] = [
  {
    id: '1',
    title: 'Navigation One',
  },
  {
    id: '3',
    title: 'Navigation Two',
    children: [
      {
        id: '4',
        title: 'Option 1',
      },
      {
        id: '5',
        title: 'Option 2',
      },
    ],
  },
  {
    id: '6',
    title: 'Navigation Three',
    children: [
      {
        id: '7',
        title: 'Option 3',
      },
      {
        id: '8',
        title: 'Option 4',
        children: [
          {
            id: '9',
            title: 'Optic 1',
          },
          {
            id: '10',
            title: 'Optic 2',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Navigation Four',
  },
];

const App: React.FC = () => {
  const [active, setActive] = useState(['1']);

  const renderItem: MenuRenderItem = (da) => {
    if (da.title.startsWith('Navigation')) {
      return (
        <>
          {Icons[Number(da.id)]}
          &nbsp;
          {` ${da.title}`}
        </>
      );
    }
    return da.title;
  };

  const handleClick: MenuOnClick = (d: MenuItem) => setActive([d.id]);

  const checkActive: MenuActive = (d: MenuItem) => active.includes(d.id);

  return (
    <Menu
      data={data}
      keygen='id'
      mode='inline'
      inlineIndent={24}
      active={checkActive}
      onClick={handleClick}
      style={{ width: 256, border: '1px solid #e8ebf0' }}
      defaultOpenKeys={['3']}
      renderItem={renderItem}
    />
  );
};

export default App;

```
### 点击事件
如果选项未设置单独的 onClick 事件，点击后会调用 Menu 定义的 onClick 事件
```tsx
/**
 * cn - 点击事件
 *    -- 如果选项未设置单独的 onClick 事件，点击后会调用 Menu 定义的 onClick 事件
 * en - Click
 *    -- If the data item set the onClick event, this event is called. Otherwise, the onClick event defined by Menu is called
 */
import React, { useState } from 'react';
import { Menu, Message, TYPE } from 'shineout';

interface MenuItem {
  id: string;
  title: string;
  children?: MenuItem[];
}
type MenuProps = TYPE.Menu.Props<MenuItem, string>;
type MenuActive = MenuProps['active'];
type MenuOnClick = MenuProps['onClick'];
type MenuRenderItem = MenuProps['renderItem'];

const data: MenuItem[] = [
  {
    id: '1',
    title: 'Navigation One',
  },
  {
    id: '3',
    title: 'Navigation Two',
    children: [
      {
        id: '4',
        title: 'Option 1',
      },
      {
        id: '5',
        title: 'Option 2',
      },
    ],
  },
  {
    id: '6',
    title: 'Navigation Three',
    children: [
      {
        id: '7',
        title: 'Option 3',
      },
      {
        id: '8',
        title: 'Option 4',
        children: [
          {
            id: '9',
            title: 'Optic 1',
          },
          {
            id: '10',
            title: 'Optic 2',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Navigation Four',
  },
];

const App: React.FC = () => {
  const [active, setActive] = useState(['1']);

  const renderItem: MenuRenderItem = (d: MenuItem) => d.title;

  const handleClick: MenuOnClick = (d: MenuItem) => {
    Message.info(`now select is ${d.title}`);
    setActive([d.id]);
  };

  const checkActive: MenuActive = (d: MenuItem) => active.includes(d.id);

  return (
    <Menu
      keygen='id'
      data={data}
      mode='inline'
      inlineIndent={24}
      active={checkActive}
      onClick={handleClick}
      style={{ width: 256, border: '1px solid #e8ebf0' }}
      defaultOpenKeys={['3']}
      renderItem={renderItem}
    />
  );
};

export default App;

```
### 水平布局
设置 mode 为 "horizontal"，显示为水平布局（子菜单在右侧弹出）
```tsx
/**
 * cn - 水平布局
 *    -- 设置 mode 为 "horizontal"，显示为水平布局（子菜单在右侧弹出）
 * en - Horizontal
 *    -- Set mode to "horizontal" to display it as horizontal layout (submenu pops up on the right)
 */
import React, { useState } from 'react';
import { Menu, TYPE } from 'shineout';

interface MenuItem {
  id: string;
  title: string;
  children?: MenuItem[];
}
type MenuProps = TYPE.Menu.Props<MenuItem, any>;
type MenuActive = MenuProps['active'];
type MenuOnClick = MenuProps['onClick'];
type MenuRenderItem = MenuProps['renderItem'];

const data: MenuItem[] = [
  {
    id: '1',
    title: 'Navigation One',
  },
  {
    id: '3',
    title: 'Navigation Two',
    children: [
      {
        id: '4',
        title: 'Option 1',
        children: [
          {
            id: '9',
            title: 'Optic 1',
          },
          {
            id: '10',
            title: 'Optic 2',
          },
        ],
      },
      {
        id: '5',
        title: 'Option 2',
      },
    ],
  },
  {
    id: '6',
    title: 'Navigation Three',
    children: [
      {
        id: '7',
        title: 'Option 3',
      },
      {
        id: '8',
        title: 'Option 4',
      },
    ],
  },
  {
    id: '2',
    title: 'Navigation Four',
  },
];

const App: React.FC = () => {
  const [active, setActive] = useState(['1']);

  const renderItem: MenuRenderItem = (d: MenuItem) => d.title;

  const handleClick: MenuOnClick = (d: MenuItem) => setActive([d.id]);

  const checkActive: MenuActive = (d: MenuItem) => active.includes(d.id);

  return (
    <Menu
      data={data}
      keygen='id'
      mode='horizontal'
      inlineIndent={24}
      active={checkActive}
      onClick={handleClick}
      renderItem={renderItem}
    />
  );
};

export default App;

```
### 垂直样式
设置 mode 为 "vertical"，显示为垂直布局
设置 mode 为 "vertical-auto" 可以自动选择弹出方向（上下）
```tsx
/**
 * cn - 垂直样式
 *    -- 设置 mode 为 "vertical"，显示为垂直布局
 *    -- 设置 mode 为 "vertical-auto" 可以自动选择弹出方向（上下）
 * en - Vertical
 *    -- Set mode to "vertical" to display it as vertical layout
 *    -- set 'vertical-auto' auto popup position
 */
import React, { useState } from 'react';
import { Menu, TYPE } from 'shineout';

interface MenuItem {
  id: string;
  title: string;
  onClick?: boolean;
  children?: MenuItem[];
}
type MenuProps = TYPE.Menu.Props<MenuItem, string>;
type MenuActive = MenuProps['active'];
type MenuOnClick = MenuProps['onClick'];
type MenuRenderItem = MenuProps['renderItem'];

const data: MenuItem[] = [
  {
    id: '1',
    title: 'Navigation One',
  },
  {
    id: '3',
    title: 'Navigation Two',
    onClick: true,
    children: [
      {
        id: '4',
        title: 'Option 1',
      },
      {
        id: '5',
        title: 'Option 2',
      },
    ],
  },
  {
    id: '21',
    title: 'Navigation 21',
  },
  {
    id: '22',
    title: 'Navigation 22',
  },
  {
    id: '23',
    title: 'Navigation 23',
  },
  {
    id: '24',
    title: 'Navigation 24',
  },
  {
    id: '25',
    title: 'Navigation 25',
  },
  {
    id: '26',
    title: 'Navigation 26',
  },
  {
    id: '27',
    title: 'Navigation 27',
  },
  {
    id: '28',
    title: 'Navigation 28',
  },
  {
    id: '29',
    title: 'Navigation 29',
  },
  {
    id: '30',
    title: 'Navigation 30',
    children: [
      {
        id: '7',
        title: 'Option 3',
      },
      {
        id: '8',
        title: 'Option 4',
        children: [
          {
            id: '9',
            title: 'Optic 1',
          },
          {
            id: '10',
            title: 'Optic 2',
          },
        ],
      },
    ],
  },
  {
    id: '31',
    title: 'Navigation 31',
  },
  {
    id: '32',
    title: 'Navigation 32',
  },
  {
    id: '33',
    title: 'Navigation 33',
  },
];

const App: React.FC = () => {
  const [active, setActive] = useState(['1']);

  const renderItem: MenuRenderItem = (d: MenuItem) => d.title;

  const handleClick: MenuOnClick = (d: MenuItem) => setActive([d.id]);

  const checkActive: MenuActive = (d: MenuItem) => active.includes(d.id);

  return (
    <Menu
      data={data}
      keygen='id'
      mode='vertical-auto'
      inlineIndent={24}
      active={checkActive}
      onClick={handleClick}
      renderItem={renderItem}
      style={{ width: 256, height: 300, border: '1px solid #e8ebf0' }}
    />
  );
};

export default App;

```
### 暗系主题
内置了一个暗色的主题，通过 theme 使用
```tsx
/**
 * cn - 暗系主题
 *    -- 内置了一个暗色的主题，通过 theme 使用
 * en - Dark theme
 *    -- The dark theme
 */
import React, { useState } from 'react';
import { Menu, TYPE } from 'shineout';

interface MenuItem {
  id: string;
  title: string;
  children?: MenuItem[];
}
type MenuProps = TYPE.Menu.Props<MenuItem, string>;
type MenuActive = MenuProps['active'];
type MenuOnClick = MenuProps['onClick'];
type MenuRenderItem = MenuProps['renderItem'];

const data: MenuItem[] = [
  {
    id: '1',
    title: 'Navigation One',
  },
  {
    id: '3',
    title: 'Navigation Two',
    children: [
      {
        id: '4',
        title: 'Option 1',
      },
      {
        id: '5',
        title: 'Option 2',
      },
    ],
  },
  {
    id: '6',
    title: 'Navigation Three',
    children: [
      {
        id: '7',
        title: 'Option 3',
      },
      {
        id: '8',
        title: 'Option 4',
        children: [
          {
            id: '9',
            title: 'Optic 1',
          },
          {
            id: '10',
            title: 'Optic 2',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Navigation Four',
  },
];

const App: React.FC = () => {
  const [active, setActive] = useState(['1']);

  const renderItem: MenuRenderItem = (d: MenuItem) => d.title;

  const handleClick: MenuOnClick = (d: MenuItem) => setActive([d.id]);

  const checkActive: MenuActive = (d: MenuItem) => active.includes(d.id);

  return (
    <div>
      <Menu
        data={data}
        keygen='id'
        theme='dark'
        active={checkActive}
        onClick={handleClick}
        style={{ width: 256 }}
        renderItem={renderItem}
        mode='vertical-auto'
      />
    </div>
  );
};

export default App;

```
## Guide
### 何时使用
用于承载网站的架构，并提供跳转的菜单列表
### 与布局相关
顶部导航菜单：作为页面一级导航出现，常见于信息展示类网站；\n 侧边导航菜单：可搭配顶部导航菜单作为二级菜单使用，也可作为一级菜单单独使用
### 组件尺寸
可根据实际业务中文本标签的长度来定义侧边导航的宽度。常见的有 200PX、220PX、240PX、260PX
### 使用原则
保持菜单扁平：扁平的层级结构可以让更多的功能第一时间暴露给用户，从而提高信息的触达效率和减少操作步长；\n 控制菜单项数量：根据米勒定律，用户平均能记忆 5-9 个项目。且项过多时会增长用户的选择时间，过多的菜单项也会让用户觉得系统内容繁多而产生畏惧心理
### 文案指南
文本标签需要清楚的概括模块内容，应该使用简洁的名词，例如：“首页”、“发现”、“钱包”等
### 推荐/慎用示例
导航菜单适用于系统级的功能导航，不应该使用在子模块的内容和功能组织，子模块的信息导航应该使用标签页组件


# Message
用户进行操作后，系统对该操作行为内容作出的反馈
## API
### Message
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|content|ReactNode||消息内容|
|duration|number |3|消息持续时间，单位秒；如果设置为 0，必须手动关闭|
### MessageOptions
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||类名|
|onClose|(() => void) ||关闭后回调事件|
|position|\"top\" / \"middle\" / \"top-left\" / \"top-right\" / \"bottom-left\" / \"bottom-right\" |\"top\"|消息显示的位置|
|title|string ||标题文字|
|hideClose|boolean |false|是否隐藏关闭按钮|
|top|string |\"auto\"|距离顶部的距离。注意，Message 容器距离顶部默认为 20px，如果需要距离顶部 0px，需要设置为 -20px|
|container|(() => HTMLElement) / HTMLElement |document.body|渲染的目标节点|
## Example
### 基本用法
Message 封装了一组全局函数，方便在任意地方调用，包括常规（不带/带icon）、Success、Warn、Error和关闭所有消息提醒
```tsx
/**
 * cn - 基本用法
 *    -- Message 封装了一组全局函数，方便在任意地方调用，包括常规（不带/带icon）、Success、Warn、Error和关闭所有消息提醒
 * en - Base
 *    -- Message has 6 static functions that are convenient to call anywhere, includes normal(with/without icon)、success、warn、error and close all messages
 */
import React from 'react';
import { Button, Message } from 'shineout';

const commonStyle = { marginInlineStart: '24px' };
const App: React.FC = () => (
  <div>
    <Button
      onClick={() => {
        Message.show('Some message.');
      }}
    >
      Show
    </Button>
    <Button
      style={commonStyle}
      onClick={() => {
        Message.info('This is a message of info.');
      }}
      type='primary'
    >
      Info
    </Button>
    <Button
      type='success'
      style={commonStyle}
      onClick={() => {
        Message.success('This is a message of success.');
      }}
    >
      Success
    </Button>
    <Button
      style={commonStyle}
      type='warning'
      onClick={() => {
        Message.warn('This is a message of warning.');
      }}
    >
      Warn
    </Button>
    <Button
      type='danger'
      style={commonStyle}
      onClick={() => {
        Message.error('This is a message of error.');
      }}
    >
      Error
    </Button>

    <Button
      style={commonStyle}
      onClick={() => {
        Message.close();
      }}
    >
      Close All
    </Button>
  </div>
);

export default App;

```
### 显示时长
通过 duration 属性可以控制消息显示的时长，默认为3秒；当设定为 0s 时，则需要用户手动关闭 Message
```tsx
/**
 * cn - 显示时长
 *    -- 通过 duration 属性可以控制消息显示的时长，默认为3秒；当设定为 0s 时，则需要用户手动关闭 Message
 * en - Duration
 *    -- Set duration property to control the duration of the message display. The default value is 3 seconds
 *    -- When duration is set to 0, the message will not hide automatically
 */
import React from 'react';
import { Button, Message } from 'shineout';

const s10 = () => Message.info('This message will close after 10 seconds.', 10);
const s0 = () => Message.error('This message will not close utill click the close icon.', 0);

const commonStyle = { marginInlineStart: '24px' };
const App: React.FC = () => (
  <div>
    <Button onClick={s10}>Duration 10 s.</Button>
    <Button onClick={s0} style={commonStyle}>
      Manually close
    </Button>
  </div>
);

export default App;

```
### 弹出位置
设置 positoin 参数，修改显示位置，可以实现消息提醒展示位置，可选值：top, middle, top-left, top-right, bottom-left, bottom-right
```tsx
/**
 * cn - 弹出位置
 *    -- 设置 positoin 参数，修改显示位置，可以实现消息提醒展示位置，可选值：top, middle, top-left, top-right, bottom-left, bottom-right
 * en - Notification
 *    -- Set position property to specify the pop-up layer location, optional value: top, middle, top-left, top-right, bottom-left, bottom-right
 */
import React, { useState } from 'react';
import { Button, Message, Radio, TYPE } from 'shineout';

type MessageOptions = TYPE.Message.Options;

const App: React.FC = () => {
  const [position, setPosition] = useState<MessageOptions['position']>('top-right');

  const show = () => {
    Message.info(<div style={{ width: 240 }}>some message.</div>, 3, {
      position,
      title: 'notify title',
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <Radio.Group
          keygen
          value={position}
          onChange={setPosition}
          data={['top', 'middle', 'top-left', 'top-right', 'bottom-left', 'bottom-right']}
        />
      </div>
      <Button onClick={show}>Show message.</Button>
    </div>
  );
};

export default App;

```
### 关闭回调
通过第三个参数[options]的 onClose 属性处理消息关闭回调。以下用例将在 Message 关闭后弹出新的 Message
```tsx
/**
 * cn - 关闭回调
 *    -- 通过第三个参数[options]的 onClose 属性处理消息关闭回调。以下用例将在 Message 关闭后弹出新的 Message
 * en - Close
 *    -- Set onClose to handle close event
 */
import React from 'react';
import { Button, Message } from 'shineout';

const App: React.FC = () => {
  const close = () => {
    Message.warn('Close this message will display another message.', 0, {
      onClose: () => {
        Message.info('You can close the message now.');
      },
    });
  };

  return <Button onClick={close}>Close callback</Button>;
};

export default App;

```
### 手动关闭
Message 会异步返回一个关闭函数，调用它来关闭当前 Messsage
```tsx
/**
 * cn - 手动关闭
 *    -- Message 会异步返回一个关闭函数，调用它来关闭当前 Messsage
 * en - Close
 *    -- Message return close func async
 */
import React from 'react';
import { Button, Message } from 'shineout';

const App: React.FC = () => {
  const msg = async () => {
    const close = await Message.success(
      <div>
        I will always show until &nbsp;
        <a onClick={() => close()}>manually closed</a>
      </div>,
      0,
      {
        title: 'Manual Close',
      },
    );
  };

  return <Button onClick={msg}>Manual Close</Button>;
};

export default App;

```
### 指定容器
使用 container 来指定 Message 渲染的目标节点
```tsx
/**
 * cn - 指定容器
 *    -- 使用 container 来指定 Message 渲染的目标节点
 * en - Target
 *    -- Set container to render target node
 */
import React, { useRef } from 'react';
import { Button, Message } from 'shineout';

const App: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div
        ref={container}
        id='container'
        style={{
          width: 100,
          height: 100,
          background: '#f4f5f8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          id='button'
          onClick={() => {
            Message.show('Some message.', 3, {
              container: container.current || undefined,
            });
          }}
        >
          Show
        </Button>
      </div>
    </div>
  );
};
export default App;

```
## Guide
### 何时使用
用来提供成功、警告和错误等反馈信息\n 不打断用户操作的轻量级提示方式
### 与布局相关
全局提示常见的有两种不同的弹出位置，分别为顶部、右上方


# Modal
Modal 对话框是一种临时窗口，通常在不想跳转页面的前提下，使用 Modal 展示次要内容或者操作
## API
### Modal
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|hideMask|boolean |false|是否隐藏遮罩|
|forceMask|boolean |false|是否强制设置遮罩透明度（多层Modal中，除第一层外的其他弹出层遮罩透明度会被调整为0.01）|
|top|string / number |10vh|弹框距离顶部距离|
|fullScreen|boolean |false|是否全屏展示|
|bodyStyle|CSSProperties ||扩展弹出层 body 的样式|
|footer|ReactNode||底部内容|
|maskCloseAble|boolean / null |true|点击遮罩层是否关闭对话框, 设置为 null 右上角关闭图标会保留|
|padding|string / number ||内容内边距|
|position|\"top\" / \"right\" / \"bottom\" / \"left\" ||弹出位置|
|title|ReactNode||弹出层的标题|
|visible|boolean |false|是否显示|
|width|string / number |500|弹出层宽度 （设置 position 后无效）|
|height|string / number ||对话框高度 （设置 position 后无效）|
|zIndex|number |1050|弹出层 z-index 值，注意：如果嵌套 Select 组件，并且 Select 组件含有 absolute 字段，需要修改 Select 的 z-index 的值|
|rootClassName|string ||弹出层的根元素类名, 为遮罩层的父元素|
|container|(() => HTMLElement / null) / HTMLElement / null |document.body|渲染的目标节点|
|moveable|boolean |false|是否可移动|
|maskBackground|string ||遮罩背景色，设置后透明度将失效|
|onClose|(() => void) ||弹出层关闭回调|
|destroy|boolean |false|关闭时是否销毁元素|
|hideClose|boolean ||是否隐藏关闭按钮|
|type|\"success\" / \"info\" / \"warning\" / \"error\" ||弹出层 title 显示状态 icon|
|zoom|boolean |false|是否开启 zoom 动画效果|
|esc|boolean |true|是否支持 esc 键关闭|
|events|object |{}|外层元素所接受的事件列表，可用于在 createPortal 场景中阻止冒泡|
|resizable|boolean |false|是否可调整大小|
|children|ReactNode||弹出层内容|
### ModalMethods
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|content|ReactNode||提示内容主体|
|onCancel|(() => void) ||点击取消按钮时触发事件，仅在 confirm 方法中有效|
|onOk|(() => void / Promise<any>) ||点击确定按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭Modal|
|text|{ ok?: string ; cancel?: string ; } |{ ok: \"Ok\", cancel: \"Cancel\" }|按钮文字|
|autoFocusButton|\"ok\" / \"cancel\" ||默认聚焦的按钮|
## Example
### 基本用法
最基本的组件用法
Modal 会在 document.body 中创建一个新的层显示弹出内容
关闭 Modal 时默认没有对组件进行销毁, 只是隐藏, 组件的状态会被保留。 如果不需要保留组件之前的状态, 可以设置 destroy 属性
```tsx
/**
 * cn - 基本用法
 *    -- 最基本的组件用法
 *    -- Modal 会在 document.body 中创建一个新的层显示弹出内容
 *    -- 关闭 Modal 时默认没有对组件进行销毁, 只是隐藏, 组件的状态会被保留。 如果不需要保留组件之前的状态, 可以设置 destroy 属性
 * en - Base
 *    -- The basic usage for component
 */
import React, { useState } from 'react';
import { Modal, Button } from 'shineout';

const App: React.FC = () => {
  const [content, setContent] = useState(1);
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    setContent(content + 1);
    console.log('clicked ok!');
  };

  const handleCancel = () => {
    setVisible(false);
    setContent(content + 1);
    console.log('clicked cancel');
  };

  return (
    <div>
      <Button onClick={show} mode='outline'>
        click me
      </Button>
      <Modal
        width={400}
        visible={visible}
        title='Modal Title'
        type='success'
        onClose={handleCancel}
        footer={[
          <Button key='cancel' mode='outline' onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key='ok' type='primary' onClick={handleOk}>
            Ok
          </Button>,
        ]}
      >
        {`you are visited ${content}`}
      </Modal>
    </div>
  );
};

export default App;

```
### 类型
Modal 内置了 4 个类型的样式：info（纯信息展示，不带有状态）、Success、Warn 和 Error，为了方便调用，设计为静态函数
```tsx
/**
 * cn - 类型
 *    -- Modal 内置了 4 个类型的样式：info（纯信息展示，不带有状态）、Success、Warn 和 Error，为了方便调用，设计为静态函数
 * en - Type
 *    -- Modal has 4 built in style
 */
import React from 'react';
import { Modal, Button } from 'shineout';

const App: React.FC = () => {
  const info = () => {
    Modal.info({
      title: 'This is a info message',
      content: 'this is  some information that user must know',
    });
  };

  const success = () => {
    Modal.success({
      title: 'This is a success message',
      content: 'this is some information that user successful operation',
    });
  };

  const warning = () => {
    Modal.warn({
      title: 'This is a warning message',
      content: 'this is  some information that user must know',
    });
  };

  const error = () => {
    Modal.error({
      title: 'This is a error message',
      content: 'this is some information that user attended',
    });
  };

  const show = () => {
    Modal.show({
      title: 'This is a message',
      content: 'this is show information',
    });
  };

  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Button onClick={show} mode='outline'>
        show
      </Button>
      <Button type='primary' onClick={info}>
        info
      </Button>
      <Button type='danger' onClick={error}>
        error
      </Button>
      <Button type='success' onClick={success}>
        success
      </Button>
      <Button type='warning' onClick={warning}>
        warning
      </Button>
    </div>
  );
};

export default App;

```
### 确认框
调用 confirm 函数可以快捷的显示确认框，便于用户操作；同时可以通过 text 配置 Modal 按钮文案，onOk 与 onClose 配置 Modal 确认和取消事件回调（当事件返回 Promise 时会等待 Promise resolve 后关闭 Modal）
```tsx
/**
 * cn - 确认框
 *    -- 调用 confirm 函数可以快捷的显示确认框，便于用户操作；同时可以通过 text 配置 Modal 按钮文案，onOk 与 onClose 配置 Modal 确认和取消事件回调（当事件返回 Promise 时会等待 Promise resolve 后关闭 Modal）
 * en - Confirm
 *    -- The confirmation modal dialog
 */
import React from 'react';
import { Modal, Button } from 'shineout';

const App: React.FC = () => {
  const confirm = () => {
    Modal.confirm({
      title: 'This is a confirm message',
      content: 'this is some information that user confirm',
      onOk: () =>
        new Promise((resolve) => {
          console.log('yes i know');
          setTimeout(() => resolve(true), 2000);
        }),
      text: { ok: 'Yes', cancel: 'No' },
    });
  };

  return (
    <div>
      <Button onClick={confirm} mode='outline'>
        confirm
      </Button>
    </div>
  );
};

export default App;

```
### 默认聚焦按钮
设置 autoFocusButton 可以在打开的时候默认聚焦到某个按钮, 再点击回车可以触发改按钮的点击事件, 方便用户进行键盘操作. 该属性仅在 Modal 的 methods 中生效
```tsx
/**
 * cn - 默认聚焦按钮
 *    -- 设置 autoFocusButton 可以在打开的时候默认聚焦到某个按钮, 再点击回车可以触发改按钮的点击事件, 方便用户进行键盘操作. 该属性仅在 Modal 的 methods 中生效
 * en - Default focus button
 *    -- Setting autoFocusButton can focus on a button by default when you open it, and then press Enter to trigger the click event of the button, which is convenient for the user to perform keyboard operation. This property only takes effect in Modal methods
 */
import React from 'react';
import { Modal, Button, Message } from 'shineout';

const App: React.FC = () => {
  const confirm = (type: 'cancel' | 'ok') => {
    Modal.confirm({
      title: 'This is a confirm message',
      content: `the ${type} button will be focus`,
      text: {
        ok: 'ok',
        cancel: 'cancel',
      },
      onOk: () => {
        Message.info('you chose the ok');
      },
      onCancel: () => {
        Message.info('you chose the cancel');
      },
      autoFocusButton: type,
    });
  };

  return (
    <div>
      <Button onClick={() => confirm('cancel')} mode='outline'>
        cancel
      </Button>
      <Button onClick={() => confirm('ok')} mode='outline'>
        ok
      </Button>
    </div>
  );
};

export default App;

```
### 全屏
使用 fullScreen 属性来使对话框全屏展示
```tsx
/**
 * cn - 全屏
 *    -- 使用 fullScreen 属性来使对话框全屏展示
 * en - Full Screen
 *    -- Use the fullScreen property to display the modal in full screen
 */
import React, { useState, useCallback } from 'react';
import {
  Form,
  Modal,
  Button,
  Input,
  Upload,
  Radio,
  Checkbox,
  DatePicker,
  Textarea,
} from 'shineout';
const Content = () => {
  return (
    <div>
      <Form
        defaultValue={{ name: 'zhangsan', email: 'zhangsan@qq.com', score: 3 }}
        onSubmit={(v) => {
          console.log('form submit', v);
        }}
        onChange={(v) => {
          console.log('form change', v);
        }}
        onReset={() => {
          console.log('form reset');
        }}
      >
        <Form.Item label='Name'>
          <Input name={'name'} placeholder='please input name' clearable />
        </Form.Item>
        <Form.Item label='Password'>
          <Input name={'password'} placeholder='please input password' clearable />
        </Form.Item>
        <Form.Item label='Email'>
          <Input name={'email'} clearable placeholder='please input email' />
        </Form.Item>
        <Form.Item label='Gendar'>
          <Radio.Group name='gendar' data={['male', 'female']} keygen />
        </Form.Item>
        <Form.Item label='Course'>
          <Checkbox.Group name='course' data={['chinese', 'maths', 'english', 'physics']} keygen />
        </Form.Item>
        <Form.Item label='Enrollment date'>
          <DatePicker name='date' placeholder={'please select date'} clearable showSelNow />
        </Form.Item>
        <Form.Item label='upload avatar'>
          <Upload.Image
            action='/api/upload'
            accept='image/*'
            name='file'
            htmlName='file'
            recoverAble
            leftHandler
            removeConfirm='Are you sure to delete it ?'
            limit={3}
            onSuccess={(_res, filem, data) => {
              return data;
            }}
          />
        </Form.Item>
        <Form.Item label='Address'>
          <Textarea name='address' />
        </Form.Item>

        <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
          <Form.Submit>Submit</Form.Submit>
          <Form.Reset>Reset</Form.Reset>
        </Form.Item>
      </Form>
    </div>
  );
};

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const cancel = useCallback(() => {
    setVisible(false);
  }, [visible]);

  const footer = () => (
    <Button type='primary' onClick={cancel}>
      OK
    </Button>
  );

  return (
    <div>
      <Modal title='Profile' fullScreen visible={visible} onClose={cancel} footer={footer()}>
        <Content></Content>
      </Modal>
      <Button mode='outline' onClick={() => setVisible(true)}>
        Full Screen
      </Button>
    </div>
  );
};

export default App;

```
### 指定目标
使用 container 来指定 Modal 渲染的目标节点
```tsx
/**
 * cn - 指定目标
 *    -- 使用 container 来指定 Modal 渲染的目标节点
 * en - Target
 *    -- set container to render target node
 */
import React, { useRef, useState } from 'react';
import { Modal, Button } from 'shineout';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const show = () => {
    setVisible(true);
  };

  const handleDismiss = () => {
    setVisible(false);
  };

  return (
    <div ref={wrapperRef}>
      <Button onClick={show} mode='outline'>
        click me
      </Button>
      <Modal
        container={wrapperRef.current || undefined}
        visible={visible}
        width={400}
        title='Modal Title'
        onClose={handleDismiss}
        footer={[
          <Button key='cancel' onClick={handleDismiss}>
            Cancel
          </Button>,
          <Button key='ok' type='primary' onClick={handleDismiss}>
            Ok
          </Button>,
        ]}
      >
        Modal mount after Button
      </Modal>
    </div>
  );
};

export default App;

```
### 表单
Modal 支持 Form 表单，并且支持 Form 的所有特性，表单提交可以使用 Modal.Submit 来代替 Button[type=submit]
```tsx
/**
 * cn - 表单
 *    -- Modal 支持 Form 表单，并且支持 Form 的所有特性，表单提交可以使用 Modal.Submit 来代替 Button[type=submit]
 * en - Form
 *    --The internal form of Modal can use Modal.Submit to trigger submit
 */
import React, { useState } from 'react';
import { Modal, Button, Form, Input, Message, TYPE } from 'shineout';

type FormProps = TYPE.Form.Props<any>;

const rules: FormProps['rules'] = {
  email: [
    { required: true, message: 'Please enter your email.' },
    { type: 'email', message: 'Please enter a valid email.' },
  ],
  password: [
    { required: true, message: 'Please enter password.' },
    { min: 7, message: 'Password must be at least {min} characters.' },
    { regExp: /[a-z]+/i, message: 'Password at least has one letter.' },
    // eslint-disable-next-line no-unused-vars
    (value: string, _formdata: any, callback: (v: boolean | Error) => void) => {
      if (/\d+/.test(value)) callback(true);
      else callback(new Error('Password at least has one numeral.'));
    },
  ],
};

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const footer = () => (
    <div>
      <Button onClick={handleClose} mode='outline'>
        Cancel
      </Button>
      <Modal.Submit type='primary'>Submit</Modal.Submit>
    </div>
  );

  const handleSubmit = (data: any) => {
    setVisible(false);
    Message.success(JSON.stringify(data));
  };

  return (
    <div>
      <Button mode='outline' onClick={show}>
        Modal Form
      </Button>

      <Modal visible={visible} width={456} title='Form' onClose={handleClose} footer={footer()}>
        <Form
          labelWidth={100}
          rules={rules}
          labelAlign='right'
          style={{ maxWidth: 400 }}
          onSubmit={handleSubmit}
        >
          <Form.Item required label='Email'>
            <Input name='email' />
          </Form.Item>

          <Form.Item required label='Password'>
            <Input name='password' type='password' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;

```
### 可移动/伸缩
设置 moveable 来使 Modal 可以按住头部移动, 设置 resizable 来自由调整 Modal 大小
```tsx
/**
 * cn - 可移动/伸缩
 *    -- 设置 moveable 来使 Modal 可以按住头部移动, 设置 resizable 来自由调整 Modal 大小
 * en - Moveable/resizable
 *    -- set moveable mark modal move by header, set resizable to resize modal
 */
import React, { useState } from 'react';
import { Modal, Button } from 'shineout';

const App: React.FC = () => {
  const [show, setShow] = useState(false);

  const footer = () => (
    <Button type='primary' onClick={() => setShow(false)}>
      Confirm
    </Button>
  );

  return (
    <div>
      <Button mode='outline' onClick={() => setShow(true)}>
        Moveable modal
      </Button>
      <Modal
        moveable
        resizable
        width={400}
        visible={show}
        title='Moveable'
        footer={footer()}
        onClose={() => setShow(false)}
      >
        drag title to move
      </Modal>
    </div>
  );
};

export default App;

```
### 多层 Modal
支持多层叠加 Modal
```tsx
/**
 * cn - 多层 Modal
 *    -- 支持多层叠加 Modal
 * en - Multistage
 *    -- Multi-layer Modal
 */
import React, { useState, Fragment } from 'react';
import { Modal, Button } from 'shineout';

const pickNumber = (ma = 65555, mi = 0, fixed = 2) => {
  let max = ma;
  let min = mi;
  if (typeof max === 'string') max = parseInt(max, 10);
  if (typeof min === 'string') min = parseInt(min, 10);

  const num = Math.random() * (max - min) + min;
  return parseFloat(num.toFixed(fixed));
};

const range = (end: number, start = 0) => {
  const delta = end - start;
  if (typeof delta !== 'number' || Number.isNaN(delta)) {
    console.error(new Error('end can not computed with start'));
  }
  return Array.from({ length: end - start }, (_v, k) => k + start);
};

const size = range(11, 0).map(() => [pickNumber(450, 380), pickNumber(400, 300)]);

const App: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const show = (v: number) => setCurrent(v);

  const footer = (i: number) => (
    <Button mode='outline' onClick={() => show(i)}>
      Close
    </Button>
  );

  return (
    <div>
      <Button mode='outline' onClick={() => show(1)}>
        click me
      </Button>

      {range(11, 1).map((i) => (
        <Modal
          key={i}
          width={size[i][0]}
          height={size[i][1]}
          footer={footer(i - 1)}
          visible={current >= i}
          title={`Modal Title ${i}`}
          onClose={() => {
            console.log('close', i);
            show(i - 1);
          }}
        >
          {`Level ${i}`}
          .
          <br />
          {i < 10 && (
            <Fragment>
              <Button mode='text' type='primary' onClick={() => show(i + 1)}>
                Next level
              </Button>
              <br />
              <br />
              <Button mode='text' type='primary' onClick={() => show(0)}>
                Close all
              </Button>
            </Fragment>
          )}
        </Modal>
      ))}
    </div>
  );
};

export default App;

```
### 点击空白关闭
默认点击对话框外部空白页面会关闭对话框
设置 maskCloseAble 属性为 false，禁用点击空白关闭，同时右上角的关闭图标也会隐藏
设置 maskCloseAble 属性为 null，禁用点击空白关闭，右上角的关闭图标会保留
```tsx
/**
 * cn - 点击空白关闭
 *    -- 默认点击对话框外部空白页面会关闭对话框
 *    -- 设置 maskCloseAble 属性为 false，禁用点击空白关闭，同时右上角的关闭图标也会隐藏
 *    -- 设置 maskCloseAble 属性为 null，禁用点击空白关闭，右上角的关闭图标会保留
 * en - Close
 *    -- By default, clicking on the blank page outside the Modal box will closes the Modal box
 *    -- Set maskCloseAble to false to disable the function that click mask to close and the close icon in the upper right corner will be hidden at the same time
 *    -- Set maskCloseAbel to null to disable the function that click mask to close and the close icon in the upper right corner will be preserved
 */
import React, { useState } from 'react';
import { Modal, Button, Radio } from 'shineout';

const list: { title: string; value: boolean | null }[] = [
  {
    title: 'false',
    value: false,
  },
  {
    title: 'true',
    value: true,
  },
  {
    title: 'null',
    value: null,
  },
];

const App: React.FC = () => {
  const [selected, setSelected] = useState(list[0]);
  const [visible, setVisible] = useState(false);

  const footer = () => (
    <Button mode='outline' onClick={() => setVisible(false)}>
      Close
    </Button>
  );

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBlock: 24 }}>
        <Radio.Group
          data={list}
          keygen='title'
          value={selected}
          renderItem='title'
          onChange={(c) => setSelected(c)}
          prediction={(v, d) => v.title === d.title}
          style={{ marginInlineEnd: 20 }}
        />
      </div>

      <Button mode='outline' onClick={() => setVisible(true)}>
        Open
      </Button>

      <Modal
        width={400}
        visible={visible}
        footer={footer()}
        title='Modal Title'
        maskCloseAble={selected.value}
        onClose={() => setVisible(false)}
      >
        The prop maskCloseAble is &nbsp;
        {selected.title}
        .
        <br />
        You must click the button to close the Modal.
      </Modal>
    </div>
  );
};

export default App;

```
### 附带图标
使用 type 属性来指定标题附带的图标
```tsx
/**
 * cn - 附带图标
 *    -- 使用 type 属性来指定标题附带的图标
 * en - Icon
 *    -- use type display type icon
 */
import React, { useState } from 'react';
import { Modal, Button, Radio, TYPE } from 'shineout';

type ModalProps = TYPE.Modal.Props;
type ModalType = ModalProps['type'];

const typeList: ModalType[] = ['info', 'success', 'warning', 'error'];

const App: React.FC = () => {
  const [type, setType] = useState<ModalType>('success');
  const [visible, setVisible] = useState(false);

  const handleOk = () => {
    setVisible(false);
    console.log('clicked ok!');
  };

  const handleCancel = () => {
    setVisible(false);
    console.log('clicked cancel');
  };

  const show = () => setVisible(true);

  const footer = () => [
    <Button key='cancel' onClick={handleCancel}>
      Cancel
    </Button>,

    <Button key='ok' type='primary' onClick={handleOk}>
      Ok
    </Button>,
  ];

  return (
    <div>
      <Radio.Group
        style={{ marginBottom: 24 }}
        data={typeList}
        value={type}
        keygen
        onChange={setType}
      />

      <Button mode='outline' onClick={show}>
        click me
      </Button>

      <Modal
        type={type}
        width={500}
        visible={visible}
        footer={footer()}
        onClose={handleCancel}
        title={`Modal Title with ${type} Icon`}
      >
        <span>Modal type: </span>
        <b>{type}</b>
      </Modal>
    </div>
  );
};
export default App;

```
### 缩放动画
设置 zoom 属性来开启缩放动画
```tsx
/**
 * cn - 缩放动画
 *    -- 设置 zoom 属性来开启缩放动画
 * en - Zoom
 *    -- Set the zoom property to enable zoom animation
 */
import React, { useState } from 'react';
import { Modal, Button } from 'shineout';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const handleClose = () => setVisible(false);

  const footer = () => (
    <Button key='ok' type='primary' onClick={() => setVisible(false)}>
      Ok
    </Button>
  );

  return (
    <div>
      <Button mode='outline' onClick={() => setVisible(true)}>
        Open
      </Button>

      <Modal
        zoom
        width={400}
        title='zoom'
        footer={footer()}
        visible={visible}
        onClose={handleClose}
      >
        Set the zoom property to enable zoom animation
      </Modal>
    </div>
  );
};

export default App;

```
### 位置（抽屉）
通过 position 可设置 Modal 弹出的位置，这时 Modal 就如 Drawer 一样。现支持 top、right、bottom 和 left 四个位置配置
```tsx
/**
 * cn - 位置（抽屉）
 *    -- 通过 position 可设置 Modal 弹出的位置，这时 Modal 就如 Drawer 一样。现支持 top、right、bottom 和 left 四个位置配置
 * en - Position
 *    -- Set position property to specify the pop-up position
 */
import React, { useState } from 'react';
import { Modal, Button, Form, Input, Radio, TYPE } from 'shineout';

type ModalProps = TYPE.Modal.Props;
type ModalPosition = ModalProps['position'];

const positionList: ModalPosition[] = ['top', 'right', 'bottom', 'left'];

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<ModalPosition>('right');

  const toggle = (v: boolean) => {
    setVisible(v);
  };

  const footer = () => (
    <div>
      <Button mode='outline' onClick={() => toggle(false)}>
        Cancel
      </Button>
      <Modal.Submit>Submit</Modal.Submit>
    </div>
  );
  return (
    <div>
      <Radio.Group
        keygen
        value={position}
        data={positionList}
        onChange={(p) => setPosition(p)}
        style={{ marginBottom: 24 }}
      />

      <Button onClick={() => toggle(true)}>click me</Button>

      <Modal
        title='Form'
        key={position}
        footer={footer()}
        visible={visible}
        position={position}
        onClose={() => toggle(false)}
      >
        <Form
          labelWidth={100}
          labelAlign='right'
          style={{ width: 500 }}
          onSubmit={() => toggle(false)}
        >
          <Form.Item required label='Email'>
            <Input name='email' />
          </Form.Item>

          <Form.Item required label='Password'>
            <Input name='password' type='password' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;

```
### bodystyle
bodystyle
```tsx
/**
 * cn - bodystyle
 *    -- bodystyle
 * en - bodystyle
 *    -- bodystyle
 */
import React, { useState } from 'react';
import { Modal, Button } from 'shineout';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const handleClose = () => setVisible(false);

  const footer = () => (
    <Button key='ok' type='primary' onClick={() => setVisible(false)}>
      Ok
    </Button>
  );
  return (
    <div>
      <Button mode='outline' onClick={() => setVisible(true)}>
        Open
      </Button>
      <Modal
        className='hi'
        zIndex={1000}
        style={{ color: 'green' }}
        zoom
        width={400}
        bodyStyle={{ height: '100px', background: '#ccc' }}
        title='zoom'
        footer={footer()}
        visible={visible}
        onClose={handleClose}
      >
        hello, how are you fine thank you and you, i am fine too, hello, how are you fine thank you
        and you, i am fine toohello, how are you fine thank you and you, i am fine toohello, how are
        you fine thank you and you, i am fine toohello, how are you fine thank you and you, i am
        fine toohello, how are you fine thank you and you, i am fine toohello, how are you fine
        thank you and you, i am fine toohello, how are you fine thank you and you, i am fine
        toohello, how are you fine thank you and you, i am fine toohello, how are you fine thank you
        and you, i am fine toohello, how are you fine thank you and you, i am fine too
      </Modal>
    </div>
  );
};

export default App;

```
### destroy
destroy
```tsx
/**
 * cn - destroy
 *    -- destroy
 * en - destroy
 *    -- destroy
 */
import React, { useEffect, useState } from 'react';
import { Modal, Button, Message } from 'shineout';

const Hello = () => {
  const [content, setContent] = useState(1);
  useEffect(() => {
    Message.info('mount');
    return () => {
      Message.info('unmount');
      console.log('unmount');
    };
  }, []);
  return <div onClick={() => setContent(content + 1)}>hello ${content}</div>;
};

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    console.log('clicked ok!');
  };

  const handleCancel = () => {
    setVisible(false);
    console.log('clicked cancel');
  };

  return (
    <div>
      <Button mode='outline' onClick={show}>
        click me
      </Button>
      <Modal
        width={400}
        visible={visible}
        destroy
        title='Modal Title'
        type='success'
        onClose={handleCancel}
        footer={[
          <Button key='cancel' onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key='ok' type='primary' onClick={handleOk}>
            Ok
          </Button>,
        ]}
      >
        <Hello />
      </Modal>
    </div>
  );
};

export default App;

```
### closeAll
closeAll
```tsx
/**
 * cn - closeAll
 *    -- closeAll
 * en - closeAll
 *    -- closeAll
 */
import React from 'react';
import { Modal, Button } from 'shineout';

let id = 0;

const App: React.FC = () => {
  const open = () => {
    let uid = id++;
    Modal.info({
      title: 'This is a info message',
      content: '哈哈哈哈',
      onClose: () => {
        console.log('close', uid);
      },
      footer: (
        <div>
          <Button mode='outline' onClick={() => Modal.closeAll()}>
            close all
          </Button>
          <Button onClick={open}> open ${uid} </Button>
        </div>
      ),
    });
  };

  return (
    <div>
      <Button mode='outline' onClick={open}>
        confirm
      </Button>
    </div>
  );
};

export default App;

```
### hideMask
hideMask
```tsx
/**
 * cn - hideMask
 *    -- hideMask
 * en - hideMask
 *    -- hideMask
 */
import React, { useState } from 'react';
import { Modal, Button } from 'shineout';

const App: React.FC = () => {
  const [content, setContent] = useState(1);
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    setContent(content + 1);
    console.log('clicked ok!');
  };

  const handleCancel = () => {
    setVisible(false);
    setContent(content + 1);
    console.log('clicked cancel');
  };

  return (
    <div>
      <Button mode='outline' onClick={show}>
        click me
      </Button>
      <Modal
        width={400}
        visible={visible}
        title='Modal Title'
        type='success'
        onClose={handleCancel}
        hideMask
        footer={[
          <Button mode='outline' key='cancel' onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key='ok' type='primary' onClick={handleOk}>
            Ok
          </Button>,
        ]}
      >
        {`you are visited ${content}`}
      </Modal>
    </div>
  );
};

export default App;

```
## Guide
### 何时使用
需要展示操作反馈或提示信息；\n 需要填写或展示相关信息，需中断用户操作，但不中断当前流程时
### 推荐/慎用示例
1、对话框的主要说明文字需明确表达其目的及操作的后果
2、对话框的按钮需使用可指引后果的操作词汇，而不是模棱两可的词汇
3、弹窗建议不超过 2 个
4、对话框的宽高可自定义，但当内容超过最大区域出现滚动条时，建议标题和按钮固定不动


# Pagination
显示当前数据所在页面，具有上下翻页、定位页面以及呈现总页数的功能
## API
### Pagination
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|style|CSSProperties ||自定义样式|
|className|string ||自定义类名|
|size|\"small\" / \"large\" / \"default\"|\"default\"|不同尺寸|
|align|\"left\" / \"center\" / \"right\" |\"left\"|排布方式|
|pageSize|number |10|每页数量|
|total|number |0|总条目数。如果 total 小于 0，隐藏分页|
|current|number ||当前页，如果传入值，组件为受控组件，必须通过 onChange 来处理回调|
|span|number |5|分页器页码按钮数量|
|defaultCurrent|number |1|初始页码|
|disabled|boolean |false|禁用|
|layout|(  / \"links\"  / \"list\"  / \"jumper\"  / \"simple\"  / ((props: PaginationProps) => ReactNode))[] |[\"links\"]|子组件布局，可选值为:\"links\": 页码；\"simple\": 简约页码(和links不要同时使用)；\"list\": 每页数量选择。\"jumper\": 跳转页码；function({ current, total, pageSize }): 匿名函数，用来信息展示|
|mode|\"text\" / \"outline\" |\"text\"|风格|
|onChange|((current: number, pageSize: number, sizeChange?: boolean ) => void) ||页码或每页显示数量改变时回调。current: 新的页码。pageSize: 每页数量|
|pageSizeList|number[] |[10, 20, 30, 50, 100]|每页数量可选列表|
|text|{  prev?: string , next?: string , page?: string , jumper?: string  } ||替换文案。prev: 上一页。next: 下一页。page: pageSizeList 文字。jumper: 跳转输入框文字, \"{input}\" 为输入框占位|
|simple|boolean ||是否使用简约模式|
## Example
### 基本用法
最基本的使用
```tsx
/**
 * cn - 基本用法
 *    -- 最基本的使用
 * en - Base
 *    -- The basic usage
 */
import { Pagination } from 'shineout';

export default () => {
  return <Pagination total={100} defaultCurrent={1} span={3}></Pagination>;
};

```
### 带总条数的
通过自定义 layout 属性展示总条数
```tsx
/**
 * cn - 带总条数的
 *    -- 通过自定义 layout 属性展示总条数
 * en - Total
 *    -- Show total by custom layout property
 */
import { Pagination } from 'shineout';

export default () => {
  const total = 500;
  const renderTotal = () => {
    return `total ${total}`;
  };
  const layout = [renderTotal, 'links'] as any;
  return <Pagination total={total} layout={layout} defaultCurrent={1} span={3}></Pagination>;
};

```
### 跳转
通过配置<span>layout</span>属性的<span>jumper</span>值展示跳转输入框，借助<span>text</span>属性自定义文案
```tsx
/**
 * cn - 跳转
 *    -- 通过配置`layout`属性的`jumper`值展示跳转输入框，借助`text`属性自定义文案
 * en - Jumper
 *    -- Show jumper by setting `jumper` value of `layout` property
 */
import { Pagination } from 'shineout';

export default () => {
  const total = 100;
  const layout = ['links', 'jumper'];
  const text = {
    jumper: 'Go to {input} Page',
  };
  return (
    <Pagination total={total} text={text} layout={layout} defaultCurrent={1} span={3}></Pagination>
  );
};

```
### 样式
配置<span>mode</span>属性切换不同风格的分页器，有文字、线框两种样式
```tsx
/**
 * cn - 样式
 *    -- 配置`mode`属性切换不同风格的分页器，有文字、线框两种样式
 * en - Mode
 *    -- Set `mode` property to change the style of pagination
 */
import { Pagination } from 'shineout';

export default () => {
  return (
    <div>
      <Pagination
        style={{ marginBottom: 24 }}
        total={100}
        mode='text'
        defaultCurrent={1}
        span={3}
      ></Pagination>
      <Pagination total={100} mode='outline' defaultCurrent={1} span={3}></Pagination>
    </div>
  );
};

```
### 尺寸
通过<span>size</span>属性设置分页器的尺寸
```tsx
/**
 * cn - 尺寸
 *    -- 通过`size`属性设置分页器的尺寸
 * en - Size
 *    -- Set the size of pagination by `size` property
 */
import { Pagination } from 'shineout';

export default () => {
  return (
    <div>
      <Pagination
        size='small'
        total={100}
        defaultCurrent={1}
        span={3}
        style={{ marginBottom: 24 }}
      ></Pagination>
      <Pagination total={100} defaultCurrent={1} span={3} style={{ marginBottom: 24 }}></Pagination>
      <Pagination size='large' total={100} defaultCurrent={1} span={3}></Pagination>
    </div>
  );
};

```
### 禁用
通过设置<span>disabled</span>属性禁用分页器
```tsx
/**
 * cn - 禁用
 *    -- 通过设置`disabled`属性禁用分页器
 * en - Disabled
 *    -- Set `disabled` property to disable pagination
 */
import { Pagination } from 'shineout';

export default () => {
  const total = 500;
  const renderTotal = () => {
    return `total ${total}`;
  };
  const text = {
    jumper: 'Go to {input} Page',
    page: ' / page',
  };

  const layout = [renderTotal, 'links', 'list', 'jumper'];
  return (
    <Pagination
      disabled
      total={total}
      layout={layout}
      text={text}
      defaultCurrent={1}
      span={3}
    ></Pagination>
  );
};

```
### 按钮数量
通过<span>span</span>属性设置按钮数量
```tsx
/**
 * cn - 按钮数量
 *    -- 通过`span`属性设置按钮数量
 * en - Span
 *    -- Set the number of buttons by `span` property
 */
import { Pagination } from 'shineout';

export default () => {
  return (
    <div>
      <Pagination total={100} defaultCurrent={1} span={5} style={{ marginBottom: 24 }}></Pagination>
      <Pagination total={1000} defaultCurrent={10} span={10}></Pagination>
    </div>
  );
};

```
### 位置
设置<span>align</span>属性调整分页器的位置，默认为left
```tsx
/**
 * cn - 位置
 *    -- 设置`align`属性调整分页器的位置，默认为left
 * en - Align
 *    -- Set the position of pagination by `align` property
 */
import { Pagination } from 'shineout';

export default () => {
  return (
    <div>
      <Pagination
        align='left'
        total={100}
        defaultCurrent={1}
        span={3}
        style={{ marginBottom: 24 }}
      ></Pagination>
      <Pagination
        align='center'
        total={100}
        defaultCurrent={1}
        span={3}
        style={{ marginBottom: 24 }}
      ></Pagination>
      <Pagination align='right' total={100} defaultCurrent={1} span={3}></Pagination>
    </div>
  );
};

```
### 自定义文案
通过编辑<span>text</span>属性的prev、next、jumper、page属性值自定义分页器文案
prev 上一页按钮文案
next 下一页按钮文案
page 每页数量列表选择器文案
jumper 跳转输入框文案，其中 {input} 占位符代表输入框
```tsx
/**
 * cn - 自定义文案
 *    -- 通过编辑`text`属性的prev、next、jumper、page属性值自定义分页器文案
 *    -- prev 上一页按钮文案
 *    -- next 下一页按钮文案
 *    -- page 每页数量列表选择器文案
 *    -- jumper 跳转输入框文案，其中 {input} 占位符代表输入框
 * en - Jumper
 *    -- Show jumper by setting `jumper` value of `layout` property
 *    -- prev Prev button text
 *    -- next Next button text
 *    -- page Page button text
 *    -- jumper Jumper text, the placeholder {input} represents the input box
 */
import { Pagination } from 'shineout';

export default () => {
  const info = ({
    current,
    pageSize,
    total,
  }: {
    current: number;
    pageSize: number;
    total: number;
  }) => {
    let to = current * pageSize;
    if (to > total) to = total;
    const from = (current - 1) * pageSize + 1;
    return `${from} to ${to} of ${total} items`;
  };
  const total = 256;
  const layout = ['links', 'list', info];
  const text = {
    prev: 'Previous',
    next: 'Next',
    page: ' / page',
  };

  return (
    <Pagination total={total} text={text} layout={layout} defaultCurrent={1} span={3}></Pagination>
  );
};

```
### 受控模式
设置<span>current</span>和<span>onChange</span>属性，可以作为受控组件使用
```tsx
/**
 * cn - 受控模式
 *    -- 设置`current`和`onChange`属性，可以作为受控组件使用
 * en - Controlled
 *    -- Set `current` and `onChange` property to use as a controlled component
 */
import { useState } from 'react';
import { Pagination, Input } from 'shineout';

export default () => {
  const [current, setCurrent] = useState(1);

  const handleCurrentChange = (v) => setCurrent(Number(v));

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <span style={{ fontSize: 14 }}>Jump to</span>
        <Input.Number
          min={1}
          max={10}
          value={current}
          onChange={handleCurrentChange}
          style={{ width: 80, marginLeft: 8 }}
        />
      </div>
      <Pagination total={100} span={3} current={current} onChange={setCurrent} />
    </div>
  );
};

```
### 极简模式
设置<span>simple</span>属性，可以使用极简模式
```tsx
/**
 * cn - 极简模式
 *    -- 设置`simple`属性，可以使用极简模式
 * en - Simple
 *    -- Set `simple` property to use simple mode
 */
import { Pagination } from 'shineout';

export default () => {
  return <Pagination simple defaultCurrent={1} pageSize={20} total={100}></Pagination>;
};

```
## Guide
### 何时使用
当数据内容较多，需要分页展示时；\n 当数据内容较多，需要分批加载时
### 与布局相关
1、当整页布局时，分页一般出现在模块下方，通常固定于页面底部右侧位置
2、当模块空间有限或数据量较少时，可使用极简样式
### 组件搭配使用
可与表格或列表搭配使用，帮助用户了解数据总量


# Popover
通常用于鼠标悬浮即显的操作，以及一般性的二次确认对话框承载
## API
### Popover.Confirm & Popover.Content
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|text|{ ok?: string ; cancel?: string ; } |{ ok: \"Ok\", cancel: \"Cancel\" }|按钮文字|
|onOk|(() => void / Promise<any>) ||点击确定按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭 Tooltip|
|onCancel|(() => void / Promise<any>) ||点击取消按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭 Tooltip|
|okType|/ \"default\"  / \"primary\"  / \"secondary\"  / \"danger\"  / \"warning\"  / \"success\"  / \"link\" |\"danger\"|确认按钮的类型，与 [Button](/components/Button) 类型相同|
|icon|ReactNode||自定义Icon|
|children|ReactNode||弹出显示内容|
|type|\"success\" / \"info\" / \"warning\" / \"danger\" / \"confirmwarning\" / \"error\" |\"confirmwarning\"|类型同 [Alert](/components/Alert) type 属性|
|title|ReactNode||标题|
### Popover
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|position|/ \"left-top\"  / \"left-bottom\"  / \"right-top\"  / \"right-bottom\"  / \"top-right\"  / \"top-left\"  / \"bottom-right\"  / \"bottom-left\"  / \"left\"  / \"right\"  / \"top\"  / \"bottom\" / \"auto\" ||弹出层位置。若不设置，则默认为 auto|
|priorityDirection|\"auto\" / \"vertical\" / \"horizontal\" |\"vertical\"|弹出位置优先级, 默认为左右优先, 只在未设置 position 时生效|
|mouseEnterDelay|number |0|移入显示延迟(毫秒)|
|mouseLeaveDelay|number |0|移除隐藏延迟(毫秒)|
|trigger|\"click\" / \"hover\" |\"hover\"|触发方式|
|destroy|boolean |false|关闭 Popover 后销毁内容 dom|
|visible|boolean ||是否可见(受控)|
|onVisibleChange|((open: boolean) => void) ||The event of visible change|
|onOpen|(() => void) ||Popover 弹出回调事件|
|onClose|(() => void) ||Popover 关闭时回调事件|
|children|ReactNode / ((close: () => void) => ReactNode)|index|弹出显示内容，如果内容为函数，则参数是主动关闭操作|
|getPopupContainer|(() => HTMLElement / null) ||自定义 Popover 容器，覆盖默认渲染在 body 下的行为, () => DOMElement|
|useTextStyle|boolean ||使用内置文本样式|
|type|\"info\" / \"success\" / \"warning\" / \"danger\" / \"error\" ||Type of popover|
|border|string ||弹出层边框颜色（含箭头）|
|background|string ||弹出层背景色（含箭头）|
|zIndex|number |1060|Popover 层级|
|showArrow|boolean |true|是否显示箭头|
|defaultVisible|boolean ||默认是否显示|
|clickToCancelDelay|boolean |false|MouseEnterDelay 内点击元素后取消弹出|
|scrollDismiss|boolean / (() => HTMLElement / null) |false|滚动来关闭气泡框，如果需要指定滚动元素，则通过函数返回|
## Example
### 基本用法
基本的用法，支持鼠标悬浮即显提示文字
```tsx
/**
 * cn - 基本用法
 *    -- 基本的用法，支持鼠标悬浮即显提示文字
 * en - Basic
 *    -- Basic usage, support mouse hover to show prompt text
 */
import React from 'react';
import { Button, Popover } from 'shineout';

export default () => {
  return (
    <Button>
      Hover
      <Popover>some Text</Popover>
    </Button>
  );
};

```
### 弹出位置
内置了十二个弹出的位置
```tsx
/**
 * cn - 弹出位置
 *    -- 内置了十二个弹出的位置
 * en - Position
 *    -- Twelve pop-up positions are built in
 */

import React from 'react';
import { Button, Popover, TYPE } from 'shineout';

type PopoverProps = TYPE.Popover.Props;
type PopoverPosition = PopoverProps['position'];

const positions: Array<PopoverPosition[]> = [
  [undefined, 'bottom-left', 'bottom', 'bottom-right', undefined],
  ['right-top', undefined, undefined, undefined, 'left-top'],
  ['right', undefined, undefined, undefined, 'left'],
  ['right-bottom', undefined, undefined, undefined, 'left-bottom'],
  [undefined, 'top-left', 'top', 'top-right', undefined],
];

const style: React.CSSProperties = {
  margin: 4,
  width: 100,
  display: 'inline-block',
};

const App: React.FC = () => (
  <div>
    {positions.map((row, i) => (
      <div key={i}>
        {row.map((p, j) =>
          p ? (
            <Button key={j} mode={'outline'} style={style}>
              <Popover trigger='click' position={p} useTextStyle>
                <div>i am popover content</div>
                <div>{p}</div>
              </Popover>
              {p}
            </Button>
          ) : (
            <div key={j} style={{ ...style, border: 0 }} />
          ),
        )}
      </div>
    ))}
  </div>
);

export default App;

```
### 点击触发
默认是移入组件触发，设置 trigger 为 'click'，可以改为点击触发
```tsx
/**
 * cn - 点击触发
 *    -- 默认是移入组件触发，设置 trigger 为 'click'，可以改为点击触发
 * en - Trigger
 *    -- Set the trigger property to change the trigger event to 'click'
 */
import React from 'react';
import { Button, Popover } from 'shineout';

const App: React.FC = () => (
  <Button>
    <Popover trigger='click'>hello shineout</Popover>
    Click me
  </Button>
);

export default App;

```
### 受控模式
可以通过 visible 去控制
```tsx
/**
 * cn - 受控模式
 *    -- 可以通过 visible 去控制
 * en -  control
 *    -- can be controlled by visible
 */
import React, { useState } from 'react';
import { Button, Popover, Switch } from 'shineout';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Switch value={visible} onChange={setVisible} />
        <span style={{ marginInlineStart: 8, fontSize: 14 }}>
          {!visible ? 'Turn on switch to display popover' : 'Turn off switch to hide popover'}{' '}
        </span>
      </div>
      <Button>
        <Popover
          position='right'
          visible={visible}
          onVisibleChange={(v) => {
            console.log('onVisibleChange', v);
          }}
        >
          Some text
        </Popover>
        Hover
      </Button>
    </div>
  );
};

export default App;

```
### 延迟
可以设置展示延时和关闭延时
```tsx
/**
 * cn - 延迟
 *    -- 可以设置展示延时和关闭延时
 * en - delay
 *    -- the hidden/show delay
 */
import React from 'react';
import { Button, Popover } from 'shineout';

const App: React.FC = () => (
  <Button>
    <Popover mouseEnterDelay={200} mouseLeaveDelay={1000}>
      Some text
    </Popover>
    Hover
  </Button>
);

export default App;

```
### 自定义容器
使用 getPopupContainer 指定渲染的目标容器
```tsx
/**
 * cn - 自定义容器
 *    -- 使用 getPopupContainer 指定渲染的目标容器
 * en - Custom container
 *    -- use getPopupContainer return target container
 */
import React from 'react';
import { Button, Popover } from 'shineout';

const buttonStyle: React.CSSProperties = { margin: '100px 0' };
const targetStyle: React.CSSProperties = { height: 200, overflowY: 'auto', position: 'relative' };

const App: React.FC = () => (
  <div id='popup-target' style={targetStyle}>
    <Button style={buttonStyle}>
      Scrollable
      <Popover trigger='click' getPopupContainer={() => document.querySelector('#popup-target')}>
        render in parent element
      </Popover>
    </Button>
  </div>
);

export default App;

```
### 禁用元素
当父元素被禁用，可以将 Popver 和禁用元素置于同一层级，并用元素将他们包裹
```tsx
/**
 * cn - 禁用元素
 *    -- 当父元素被禁用，可以将 Popver 和禁用元素置于同一层级，并用元素将他们包裹
 * en - Disabled
 *    -- When the parent element is disabled, you can place the Popver and the disabled element in the same hierarchy and wrap them with the element
 */
import React from 'react';
import { Button, Popover } from 'shineout';

const style: React.CSSProperties = { display: 'inline-block' };

const App: React.FC = () => (
  <div style={style}>
    <Popover>Disabled parent</Popover>

    <Button disabled>Disabled</Button>
  </div>
);

export default App;

```
### 样式
内置四种样式
```tsx
/**
 * cn - 样式
 *    -- 内置四种样式
 * en - Type
 *    -- Four styles are built in
 */
import React from 'react';
import { Popover, Button, TYPE } from 'shineout';

type PopoverProps = TYPE.Popover.Props;

const types: PopoverProps['type'][] = ['success', 'info', 'warning', 'danger'];

const App: React.FC = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    {types.map((t, i) => (
      <Button key={i} style={{ marginInlineStart: i === 0 ? 0 : 24 }}>
        <Popover type={t}>Some text</Popover>
        {t}
      </Button>
    ))}
  </div>
);

export default App;

```
### 确认
Popover.Confirm 提供弹出气泡式的确认框
```tsx
/**
 * cn - 确认
 *    -- Popover.Confirm 提供弹出气泡式的确认框
 * en - Confirm
 *    -- Popover.Confirm provide popover confirm
 */
import React from 'react';
import { Button, Popover, TYPE } from 'shineout';

type PopoverConfirmProps = TYPE.Popover.ConfirmProps;
type PopoverOnOk = PopoverConfirmProps['onOk'];

const App: React.FC = () => {
  const onOk: PopoverOnOk = () =>
    new Promise((resolve) => {
      console.log('ok');
      setTimeout(() => resolve(true), 2000);
    });

  return (
    <Button>
      <Popover.Confirm
        position='right'
        title='Tips'
        onCancel={() => console.log('cancel')}
        onOk={onOk}
      >
        Are you sure you want to delete this content ?
      </Popover.Confirm>
      Delete
    </Button>
  );
};

export default App;

```
### 关闭事件
content 属性可以为一个函数，会传递 close 函数，用来在弹出面板内部处理关闭事件
```tsx
/**
 * cn - 关闭事件
 *    -- content 属性可以为一个函数，会传递 close 函数，用来在弹出面板内部处理关闭事件
 * en - Close
 *    -- Set the content property to a function, you can handle the close event inside the popup panel
 */
import React from 'react';
import { Button, Popover, Message, TYPE } from 'shineout';

type PopoverProps = TYPE.Popover.Props;
type PopoverContentChildren = PopoverProps['children'];

const App: React.FC = () => {
  const content: PopoverContentChildren = (close: () => void) => (
    <div style={{ padding: 16 }}>
      <div>Are you sure you want to close this panel?</div>
      <div style={{ marginTop: 16, textAlign: 'right' }}>
        <Button
          size='small'
          onClick={() => {
            close();
            Message.success('Popover panel closed.');
          }}
        >
          close
        </Button>
      </div>
    </div>
  );

  return (
    <Button>
      <Popover position='right' trigger='click'>
        {content}
      </Popover>
      Click me
    </Button>
  );
};

export default App;

```
### 事件
提供了onOpen 和 onClose 事件
```tsx
/**
 * cn - 事件
 *    -- 提供了onOpen 和 onClose 事件
 * en - Events
 *    -- provider onOpen and onClose event
 */
import React from 'react';
import { Button, Popover, TYPE } from 'shineout';

type PopoverProps = TYPE.Popover.Props;
type PopoverOnOpen = PopoverProps['onOpen'];
type PopoverOnClose = PopoverProps['onClose'];

const App: React.FC = () => {
  const open: PopoverOnOpen = () => console.log('popover open');
  const close: PopoverOnClose = () => console.log('popover close');

  return (
    <Button>
      <Popover onOpen={open} onClose={close} trigger='click'>
        Some text
      </Popover>
      Click me
    </Button>
  );
};

export default App;

```
### 文本样式
当内容为 string 或者 设置 useTextStyle 为 true 时会有默认的文本样式
```tsx
/**
 * cn - 文本样式
 *    -- 当内容为 string 或者 设置 useTextStyle 为 true 时会有默认的文本样式
 * en - useTextStyle
 *    -- When the content is string or set useTextStyle to true, the default text style will be used
 */
import React from 'react';
import { Button, Popover } from 'shineout';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button>
        <Popover useTextStyle={false}>
          <div>hello</div>
        </Popover>
        defaultStyle
      </Button>

      <Button style={{ marginInlineStart: 24 }}>
        <Popover useTextStyle>
          <div>hello</div>
        </Popover>
        useTextStyle
      </Button>
    </div>
  );
};
export default App;

```
### destroy
当popover 卸载后删除dom
```tsx
/**
 * cn - destroy
 *    -- 当popover 卸载后删除dom
 */
import React from 'react';
import { Button, Popover } from 'shineout';

const App: React.FC = () => (
  <Button>
    <Popover destroy style={{ padding: '4px 8px' }}>
      Some text
    </Popover>
    Hover
  </Button>
);

export default App;

```
### 受控加载dom
当 popover 受控时，检查是否加载 dom
```tsx
/**
 * cn - 受控加载dom
 *    -- 当 popover 受控时，检查是否加载 dom
 */
import React, { useState } from 'react';
import { Button, Popover, TYPE } from 'shineout';

type PopoverProps = TYPE.Popover.Props;
type PopoverOnVisibleChange = PopoverProps['onVisibleChange'];

const style: React.CSSProperties = { width: 200, padding: 20 };

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const onVisibleChange: PopoverOnVisibleChange = (v) => setVisible(v);

  return (
    <div>
      <Button onClick={() => setVisible(!visible)}>{visible ? 'Close' : 'Open'}</Button>
      <Button>
        <Popover visible={visible} onVisibleChange={onVisibleChange} style={style}>
          Some text
        </Popover>
        Hover
      </Button>
    </div>
  );
};

export default App;

```
### 嵌套使用
使用多个 Popover 进行嵌套展示
```tsx
/**
 * cn - 嵌套使用
 *    -- 使用多个 Popover 进行嵌套展示
 * en - Nested of Popovers
 *    -- Using more than one Popover by nested
 */
import React, { useState } from 'react';
import { Button, Popover, TYPE } from 'shineout';

type PopoverProps = TYPE.Popover.Props;
type PopoverConfirmProps = TYPE.Popover.ConfirmProps;
type PopoverOnOk = PopoverConfirmProps['onOk'];
type PopoverText = PopoverConfirmProps['text'];
type PopoverOnCancel = PopoverConfirmProps['onCancel'];
type PopoverOnVisibleChange = PopoverProps['onVisibleChange'];

const style: React.CSSProperties = { padding: '4px 8px' };

const App: React.FC = () => {
  const [show, setshow] = useState(false);

  const text: PopoverText = { ok: 'Yes', cancel: 'No' };

  const onOk: PopoverOnOk = () =>
    new Promise((resolve) => {
      console.log('ok');
      setTimeout(() => resolve(true), 2000);
    });

  const onCancel: PopoverOnCancel = () => console.log('cancel');

  const onVisibleChange: PopoverOnVisibleChange = (v) => setshow(v);

  return (
    <Button>
      <Popover style={style} trigger='hover' onVisibleChange={onVisibleChange}>
        <Button>
          {show && (
            <Popover.Confirm onCancel={onCancel} onOk={onOk} text={text}>
              Hello Sheinout
            </Popover.Confirm>
          )}
          Nested
        </Button>
      </Popover>
      Hover
    </Button>
  );
};

export default App;

```
## Guide
### 何时使用
用户需要更多的附加信息时使用；\n 需要用户进行二次确认时。
### 与布局相关
气泡确认框出现的位置可根据当前页面具体需要来布局，出现位置应避免遮挡页面信息、或被遮挡。
### 推荐使用
Popover 气泡与 Tooltip 提示都拥有显示附加信息的功能，气泡能够承载标题、段落文本、链接、按钮等，因此在选择组件上，如果需要对附加信息元素进行操作，更推荐使用 Popover 气泡组件。
### 推荐/慎用示例
在引用组件时，气泡框内文本要保持语言统一，不能标题和内容使用中文，按钮使用英文。


# Progress
用户进行操作后，系统对该操作行为内容作出的反馈
## API
### Progress
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||最外层扩展样式|
|background|string |\"#e9ecef\"|背景色|
|children|ReactNode||附加内容|
|color|string / {  form?: string , to?: string  } |primary|前景色, 可以设置为对象变成渐变.|
|shape|\"line\" / \"circle\" / \"line-pop\" / \"line-inner\" |\"line\"|样式|
|size|number |100|进度条大小，仅对 circle 有效|
|strokeWidth|number |8|线框宽度|
|type|\"success\" / \"info\" / \"warning\" / \"danger\" ||内置配色|
|value|number |0|百分比值，0 <= value <= 100|
|strokeLinecap|\"butt\" / \"round\" / \"square\" / \"inherit\" ||进度条两端的描边形状|
|icon|boolean |false|是否显示图标|
|iconSize|number ||图标大小|
## Example
### 基本用法
最基本的用法
```tsx
/**
 * cn - 基本用法
 *    --  最基本的用法
 * en - Basic
 *    --  Basic Usage
 */
import React from 'react';
import { Progress } from 'shineout';

export default () => {
  return <Progress style={{ width: 400 }} value={75} />;
};

```
### 弹出展示
设置 shape="line-pop"，children 会通过弹出框展示
```tsx
/**
 * cn - 弹出展示
 *    --  设置 shape="line-pop"，children 会通过弹出框展示
 * en - Basic
 *    --  set shape="line-pop"，children will show in a popup
 */

import React, { useState } from 'react';
import { Progress, Button } from 'shineout';

let store = 0;

const App: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleClick = (num = store) => {
    let v = num;
    v += Math.random() * 12;
    if (v >= 100) {
      v = 100;
      setValue(v);
    } else {
      store = v;
      if (store > 100) {
        setValue(100);
        store = 0;
      } else {
        setValue(v);
        setTimeout(handleClick, 320);
      }
    }
  };

  return (
    <div style={{ width: 400 }}>
      <Progress value={value} shape='line-pop'>{`${parseInt(value.toString(), 10)}%`}</Progress>

      <br />

      <Button onClick={() => handleClick(0)}>Start</Button>
    </div>
  );
};

export default App;

```
### 进度条状态
内置了四种样式，通过 type 来调用
```tsx
/**
 * cn - 进度条状态
 *    -- 内置了四种样式，通过 type 来调用
 * en - Type
 *    -- There are 4 built-in style
 */
import React from 'react';
import { Progress } from 'shineout';

const App: React.FC = () => (
  <div style={{ width: 400 }}>
    <Progress value={100} type='success' />
    <br />
    <Progress value={90} type='info' />
    <br />
    <Progress value={80} type='warning' />
    <br />
    <Progress value={70} type='danger' />
  </div>
);

export default App;

```
### 环形进度条
设置 shape 为 'circle' 展示环形进度条
```tsx
/**
 * cn - 环形进度条
 *    -- 设置 shape 为 'circle' 展示环形进度条
 * en - Circle
 *    -- set shape to 'circle' to show circle progress
 */
import React from 'react';
import { Progress } from 'shineout';

const App: React.FC = () => (
  <div style={{ display: 'flex', gap: '32px' }}>
    <Progress value={60} shape='circle' type='info' size={64} strokeWidth={4}>
      {' '}
      60%{' '}
    </Progress>
    <Progress value={70} shape='circle' type='warning' size={64} strokeWidth={4} icon />
    <Progress value={80} shape='circle' type='success' size={64} strokeWidth={4} icon />
    <Progress value={90} shape='circle' type='danger' size={64} strokeWidth={4} icon />
  </div>
);

export default App;

```
### 内嵌进度条
设置 shape 为 'line-inner' 展示内嵌的进度条
```tsx
/**
 * cn - 内嵌进度条
 *    -- 设置 shape 为 'line-inner' 展示内嵌的进度条
 * en - Line inner
 *    -- set shape to 'line-inner' to show line inner progress
 */
import React from 'react';
import { Progress } from 'shineout';

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: 400 }}>
    <Progress value={0} shape='line-inner' type='info'>
      0%
    </Progress>
    <Progress value={5} shape='line-inner' type='info'>
      5%
    </Progress>
    <Progress value={40} shape='line-inner' type='info'>
      10%
    </Progress>
    <Progress value={50} shape='line-inner' type='warning'>
      50%
    </Progress>
    <Progress value={100} shape='line-inner' type='success'>
      100%
    </Progress>
    <Progress value={60} shape='line-inner' type='danger'>
      60%
    </Progress>
  </div>
);

export default App;

```
### 渐变色
当 color 为对象时可以设置渐变色, 推荐只使用两种颜色
```tsx
/**
 * cn - 渐变色
 *    -- 当 color 为对象时可以设置渐变色, 推荐只使用两种颜色
 * en - Gradient
 *    -- Gradient color can be set when color is an object, recommended only in two colors
 */
import React from 'react';
import { Progress } from 'shineout';

const blue = '#7949FF';
const green = '#19A9FA';

const App: React.FC = () => (
  <div style={{ width: 400 }}>
    <Progress
      value={40}
      color={{
        '0%': green,
        '100%': blue,
      }}
    >
      40%
    </Progress>
    <br />
    <Progress
      value={75}
      color={{
        from: green,
        to: blue,
      }}
      shape='line-inner'
    >
      75%
    </Progress>
    <br />
    <Progress
      value={60}
      color={{
        '0%': green,
        '100%': blue,
      }}
      shape='circle'
    >
      60%
    </Progress>
  </div>
);

export default App;

```
### 大小
通过 size 或 style 来控制大小
通过 strokeWidth 属性来控制线框宽度
通过 iconSize 属性来控制图标大小
```tsx
/**
 * cn - 大小
 *    -- 通过 size 或 style 来控制大小
 *    -- 通过 strokeWidth 属性来控制线框宽度
 *    -- 通过 iconSize 属性来控制图标大小
 * en - Size
 *    -- Set size or style to change the size of progress
 *   -- Set strokeWidth to change the width of line
 *  -- Set iconSize to change the size of icon
 */
import React, { useState } from 'react';
import { Progress, Radio } from 'shineout';

const sizeList = ['small', 'default', 'large'];
const App: React.FC = () => {
  const [size, setSize] = useState('default');

  return (
    <div>
      <Radio.Group
        keygen
        data={sizeList}
        value={size}
        onChange={setSize}
        style={{ marginBottom: 24 }}
      />
      {size === 'small' && (
        <>
          <Progress style={{ width: 400 }} strokeWidth={3} value={75}>
            <span style={{ fontSize: 12 }}>75%</span>
          </Progress>
          <Progress
            shape='line-inner'
            style={{ width: 400, marginTop: 24 }}
            strokeWidth={16}
            value={40}
          >
            <span style={{ fontSize: 12 }}>40%</span>
          </Progress>
          <Progress size={48} strokeWidth={4} shape='circle' value={60} style={{ marginTop: 24 }}>
            <span style={{ fontSize: 12 }}>60%</span>
          </Progress>
        </>
      )}
      {size === 'large' && (
        <>
          <Progress style={{ width: 400 }} strokeWidth={8} value={75}>
            <span style={{ fontSize: 16 }}>75%</span>
          </Progress>
          <Progress
            shape='line-inner'
            style={{ width: 400, marginTop: 24 }}
            strokeWidth={24}
            value={40}
          >
            <span>40%</span>
          </Progress>
          <Progress size={80} strokeWidth={4} shape='circle' value={60} style={{ marginTop: 24 }}>
            <span style={{ fontSize: 16 }}>60%</span>
          </Progress>
        </>
      )}
      {size === 'default' && (
        <>
          <Progress style={{ width: 400 }} value={75}>
            <span>75%</span>
          </Progress>
          <Progress shape='line-inner' style={{ width: 400, marginTop: 24 }} value={40}>
            <span>40%</span>
          </Progress>
          <Progress shape='circle' value={60} style={{ marginTop: 24 }}>
            <span>60%</span>
          </Progress>
        </>
      )}
    </div>
  );
};

export default App;

```
### 动态进度条
value 变更时动画效果演示
```tsx
/**
 * cn - 动态进度条
 *    -- value 变更时动画效果演示
 * en - Animation
 *    -- The animation for changing value
 */
import React, { useState } from 'react';
import { Button, Progress } from 'shineout';

let store = 0;

const App: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleClick = (num = store) => {
    let v = num;
    v += Math.random() * 12;
    if (v >= 100) {
      v = 100;
      setValue(v);
    } else {
      store = v;
      if (store > 100) {
        setValue(100);
        store = 0;
      } else {
        setValue(v);
        setTimeout(handleClick, 320);
      }
    }
  };

  return (
    <div>
      <div>
        <Progress style={{ width: 400 }} value={value}>
          <div style={{ width: 50 }}>{`${value.toFixed(0)}%`}</div>
        </Progress>
      </div>
      <div style={{ marginTop: 24 }}>
        <Progress shape='circle' type='success' value={value}>
          {`${value.toFixed(0)}%`}
        </Progress>
      </div>

      <Button onClick={() => handleClick(0)} style={{ marginTop: 24 }}>
        Start
      </Button>
    </div>
  );
};

export default App;

```
## Guide
### 何时使用
当某操作需要较长时间才能完成，需要给用户完成任务的明确预期时\n 当某操作在后台运行，需要显示该操作的实时进度时
### 基础用法
1、整个页面加载进度时，通常进度条放置在页面正中间
2、展示页面局部数据变化进度时，进度条组件放置在对应局部区块内。


# Radio
单选框代表从一组互斥的选项中仅选择一个选项
## API
### Radio.Group
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|size|\"small\" / \"large\" / \"default\"|\"default\"|不同尺寸|
|style|CSSProperties ||自定义样式|
|children|ReactNode||可以传入一组Radio|
|renderItem|ObjectKey<DataItem> / ((data: DataItem, index?: number ) => ReactNode) |d => d|为 string 时，返回 d\\[string]。 为 function 时，返回函数结果|
|prediction|((value: Value, data: DataItem) => boolean) |(value, data) => value === format(data)|默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配|
|format|ObjectKey<DataItem> / ((data: DataItem) => Value) |d => d|格式化 value, 默认值，返回原始数据。 为 string 时，会作为 key 从原始数据中获取值，相当于 (d) => d[format]; 为函数时，以函数返回结果作为 value|
|keygen|/ ObjectKey<DataItem>  / ((data: DataItem, index?: number) => string / number)  / true|index|生成每一项key的辅助方法 为 true 时，以数据项本身作为key，相当于 (d => d) 为函数时，使用此函数返回值 为string时，使用这个string对应的数据值。如 \"id\"，相当于 (d => d.id)|
|block|boolean ||默认为水平布局，设置 block 属性可以改为垂直布局|
|button|boolean / \"outline\" ||设置 button 属性可以展示为按钮样式|
|data|any[]||数据项|
|onChange|((value: Value, Data: DataItem) => void) ||值改变回调函数|
|value|any||在 Form中，value 会被表单接管，value 无效|
|defaultValue|Value ||默认值  和 value 类型相同|
|disabled|boolean / ((data: DataItem) => boolean) |false|如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项|
|name|Name ||Form 内存取数据的 key|
|beforeChange|((value: T) => void / T ) ||值改变前的回调，当返回值不为空时将作为组件的新值|
|reserveAble|boolean ||设置为 true 组件卸载后表单不自动删除数据|
|rules|RuleItem[]||校验规则 详见 [Rule](/components/rule)|
|onError|((error?: Error ) => void) ||rules 校验回调|
|bind|string[] ||当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用|
### Radio
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|onChange|((value: T) => void) ||改变选中状态时触发回调|
|checked|boolean / ((d: T) => boolean) ||checked 传入时为受控组件|
|onClick|((e: MouseEvent<HTMLInputElement, MouseEvent>) => void) ||勾选框点击回调|
|disabled|boolean |false|是否禁用|
|inputRef|Ref<HTMLInputElement> ||获取input dom|
|style|CSSProperties ||自定义样式|
|className|string ||自定义类名|
|size|\"small\" / \"large\" / \"default\"|\"default\"|不同尺寸|
|children|ReactNode||内容|
|htmlValue|T |true|选中后返回的值|
## Example
### 基本用法
最基础的 Radio
```tsx
/**
 * cn - 基本用法
 *    -- 最基础的 Radio
 * en - Base
 *    -- Simple Radio
 */
import React from 'react';
import { Radio } from 'shineout';

const App: React.FC = () => {
  const [value, setValue] = React.useState('');
  return (
    <Radio
      checked={value === 'option'}
      htmlValue={'option'}
      onChange={(v) => {
        setValue(v);
      }}
    >
      Option
    </Radio>
  );
};

export default App;

```
### 状态
checked 属性设置 Radio 选中状态； disabled 属性设置 Radio 禁用状态
```tsx
/**
 * cn - 状态
 *    -- checked 属性设置 Radio 选中状态； disabled 属性设置 Radio 禁用状态
 * en - Base
 *    -- checked property set the checked status of Radio; disabled property set the disabled status of Radio
 */
import React from 'react';
import { Radio } from 'shineout';

const App: React.FC = () => {
  return (
    <>
      <Radio checked={false}>OptionA</Radio>
      <Radio checked={true}>OptionB</Radio>
      <Radio checked={false} disabled>
        OptionC
      </Radio>
      <Radio checked={true} disabled>
        OptionD
      </Radio>
    </>
  );
};

export default App;

```
### 尺寸
设置 <span>size</span> 属性可以控制 Radio 的大小
```tsx
/**
 * cn - 尺寸
 *    -- 设置 `size` 属性可以控制 Radio 的大小
 * en - Size
 *    -- Set `size` property to change the size of Radio
 */
import React from 'react';
import { Radio } from 'shineout';

const App: React.FC = () => {
  return (
    <Radio.Group keygen block>
      <Radio size={'small'} htmlValue={'a'}>
        OptionA
      </Radio>
      <Radio htmlValue={'b'}>OptionB</Radio>
      <Radio size={'large'} htmlValue={'c'}>
        OptionC
      </Radio>
    </Radio.Group>
  );
};

export default App;

```
### 单选框组
Radio.Group 通过数据来生成一组单选框
```tsx
/**
 * cn - 单选框组
 *    -- Radio.Group 通过数据来生成一组单选框
 * en - Group
 *    -- Radio.Group generate a group of radios from an array
 */
import React from 'react';
import { Radio } from 'shineout';

type RadioGroupItem = string;

const data: RadioGroupItem[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

const App: React.FC = () => {
  return <Radio.Group keygen data={data} defaultValue='blue' renderItem={(d) => d} />;
};

export default App;

```
### 
将一组 Radio 放在 Radio.Group 中，以 React 组件方式调用
```tsx
/**
 * cn -
 *    -- 将一组 Radio 放在 Radio.Group 中，以 React 组件方式调用
 * en -
 *    -- A series of radios group by Radio.Group
 */
import React from 'react';
import { Radio } from 'shineout';

const data: string[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

const App: React.FC = () => (
  <>
    <Radio.Group
      keygen
      defaultValue='yellow'
      onChange={(...args) => {
        console.log(args);
      }}
    >
      {data.map((d) => (
        <Radio key={d} htmlValue={d}>
          {d}
        </Radio>
      ))}
    </Radio.Group>
  </>
);
export default App;

```
### 垂直布局
默认为水平布局，设置 block 属性可以改为垂直布局
```tsx
/**
 * cn - 垂直布局
 *    -- 默认为水平布局，设置 block 属性可以改为垂直布局
 * en - Vertical layout
 *    -- The default is horizontal layout and setting the block property can changed it to be vertical layout
 */
import React from 'react';
import { Radio } from 'shineout';

interface RadioGroupItem {
  id: number;
  color: string;
}

const data: RadioGroupItem[] = [
  { id: 1, color: 'red' },
  { id: 2, color: 'orange' },
  { id: 3, color: 'yellow' },
  { id: 4, color: 'green' },
  { id: 5, color: 'cyan' },
  { id: 6, color: 'blue' },
  { id: 7, color: 'violet' },
];

const App: React.FC = () => (
  <>
    <Radio.Group
      style={{}}
      keygen='id'
      data={data}
      format={'id'}
      defaultValue={3}
      renderItem='color'
    />
    <Radio.Group
      style={{ display: 'inline-block', marginTop: 24 }}
      block
      keygen='id'
      data={data}
      format={'id'}
      defaultValue={3}
      renderItem='color'
    />
  </>
);

export default App;

```
### 支持取消
使用组件形式来支持取消选中
```tsx
/**
 * cn - 支持取消
 *    -- 使用组件形式来支持取消选中
 * en - Cancel
 *    -- Use component list for toggle radio
 */
import React, { useState } from 'react';
import { Radio } from 'shineout';

type RadioGroupItem = string;

const data: string[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

const App: React.FC = () => {
  const [current, setCurrent] = useState<RadioGroupItem>('red');

  return (
    <Radio.Group keygen value={current}>
      {data.map((d) => (
        <Radio
          key={d}
          htmlValue={d}
          onClick={() => {
            if (current === d) {
              setCurrent('');
            } else {
              setCurrent(d);
            }
          }}
        >
          {d}
        </Radio>
      ))}
    </Radio.Group>
  );
};

export default App;

```
### 按钮单选框
设置 button 属性可以展示为按钮样式
```tsx
/**
 * cn - 按钮单选框
 *    -- 设置 button 属性可以展示为按钮样式
 * en - Button Radio
 *    -- set button to show button style
 */
import React from 'react';
import { Radio } from 'shineout';

const data = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const App: React.FC = () => (
  <>
    <Radio.Group button keygen data={data} defaultValue='Wednesday' />
    <br />
    <Radio.Group
      button
      keygen
      data={data}
      defaultValue='Wednesday'
      disabled
      style={{ marginTop: 24 }}
    />
  </>
);

export default App;

```
### 
设置 button 为 outline 可以展示透明背景的按钮样式
```tsx
/**
 * cn -
 *    -- 设置 button 为 outline 可以展示透明背景的按钮样式
 * en -
 *    -- set button with outline to show outline button style
 */
import React from 'react';
import { Radio } from 'shineout';

const data = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const App: React.FC = () => (
  <>
    <Radio.Group button='outline' keygen data={data} defaultValue='Wednesday' />
    <br />
    <Radio.Group
      button='outline'
      keygen
      data={data}
      defaultValue='Wednesday'
      disabled
      style={{ marginTop: 24 }}
    />
  </>
);

export default App;

```
### 按钮单选框尺寸
设置 size 可以控制按钮样式的大小
```tsx
/**
 * cn - 按钮单选框尺寸
 *    -- 设置 size 可以控制按钮样式的大小
 * en - Button size
 *    -- size to set button style size
 */
import React from 'react';
import { Radio } from 'shineout';

const data: string[] = ['red', 'orange', 'yellow'];

const App: React.FC = () => (
  <div>
    <Radio.Group size='small' button keygen data={data} defaultValue='red' />
    <br />
    <Radio.Group keygen button data={data} defaultValue='red' style={{ marginTop: 24 }} />
    <br />
    <Radio.Group
      size='large'
      button
      keygen
      data={data}
      defaultValue='red'
      style={{ marginTop: 24 }}
    />
    <br />
  </div>
);

export default App;

```
### Radio 组禁用
设置 disabled 为 true 时，禁用所有选项
```tsx
/**
 * cn - Radio 组禁用
 *    -- 设置 disabled 为 true 时，禁用所有选项
 * en - Radio Group Disabled
 *    -- Set disabled property is set to true, all the options is disabled
 */
import React from 'react';
import { Radio } from 'shineout';

const data: string[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

const App: React.FC = () => (
  <Radio.Group keygen disabled data={data} defaultValue='blue' renderItem={(d) => d} />
);

export default App;

```
### 
disabled 为函数时，根据函数返回结果实现有条件禁用
```tsx
/**
 * cn -
 *    -- disabled 为函数时，根据函数返回结果实现有条件禁用
 * en -
 *    -- When the disabled is a function, disbale the option that the function to return true
 */
import React from 'react';
import { Radio } from 'shineout';

const data: string[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

const App: React.FC = () => (
  <Radio.Group
    keygen
    data={data}
    disabled={(d) => d === 'yellow'}
    defaultValue='blue'
    renderItem={(d) => d}
  />
);

export default App;

```
## Guide
### 何时使用
用于在多个互斥的备选项中选中一个选项时
### 常见用法
在表单中进行数据选项的选择
### 组件搭配使用
在实际应用中，和其他组件一起布局，遵循整体左对齐、右对齐、横向居中、垂直居中对齐 4 种布局方式，注意统一业务系统中建议只用一种布局
### 推荐/慎用示例
1、在表单中不要用单选框开启一个功能，建议使用多选框或开关来开启或关闭一个功能，只有一个项目可供选择，也请考虑复选框
2、如果仅有两个相互排斥的选项，请将其合并到单个复选框（Checkbox）或开关(Switch)


# Rate
评分打星组件
## API
### Rate
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|allowHalf|boolean |false|是否允许半选|
|clearable|boolean |false|是否允许再次点击后清除|
|disabled|boolean |false|是否只读|
|max|number |5|选项最大值，整数|
|repeat|boolean |true|为 true 时，显示的选项为当前分值对应选项的复制|
|size|string / number |20|图标大小|
|text|ReactNode[] ||附加文字|
|value|number |0|选中的 key （受控)|
|defaultValue|number ||默认值  和 value 类型相同|
|onChange|((value?: number ) => void) ||值改变回调|
|background|ReactElement / string / Array<string / ReactElement>||未选中元素背景|
|front|ReactElement / string / Array<string / ReactElement>|background|选中元素背景|
|name|Name ||Form 内存取数据的 key|
|beforeChange|((value: T) => void / T ) ||值改变前的回调，当返回值不为空时将作为组件的新值|
|reserveAble|boolean ||设置为 true 组件卸载后表单不自动删除数据|
|rules|RuleItem[]||校验规则 详见 [Rule](/components/rule)|
|onError|((error?: Error ) => void) ||rules 校验回调|
|bind|string[] ||当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用|
### RateFunction
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|background|ReactElement / string / Array<string / ReactElement>||未选中元素背景|
|front|ReactElement / string / Array<string / ReactElement>||选中元素背景|
## Example
### 基本用法
Rate 为一个函数，创建一个指定图标或文字的 Rate 组件，供多处复用
```tsx
/**
 * cn - 基本用法
 *    -- Rate 为一个函数，创建一个指定图标或文字的 Rate 组件，供多处复用
 * en - Base
 *    -- Rate is a function that creates a new custom Rate component that specifies an icon or text
 */
import React from 'react';
import { Rate } from 'shineout';

const star = (
  <svg viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path d='M8.276 7.825L1.85649 8.7559L1.74278 8.77878C1.00761 8.96968 0.736859 9.90915 1.30093 10.4606L5.953 15.008L4.84231 21.3268L4.82911 21.4327C4.77288 22.2003 5.59415 22.7575 6.29763 22.3824L11.999 19.343L17.7023 22.3825L17.7988 22.4279C18.5105 22.7194 19.2948 22.1128 19.1578 21.3281L18.054 15.008L22.6997 10.46L22.7779 10.3745C23.2586 9.78723 22.9242 8.86973 22.1443 8.75601L15.758 7.825L12.895 2.05544C12.5264 1.31273 11.4661 1.31545 11.1013 2.06004L8.276 7.825Z' />
  </svg>
);

const StarRate = Rate(star, star);

const App: React.FC = () => <StarRate />;

export default App;

```
### 半星
Rate 是否允许半星
```tsx
/**
 * cn - 半星
 *    -- Rate 是否允许半星
 * en - Semi selection
 *    -- Rate whether to allow semi selection
 */

import React from 'react';
import { Rate } from 'shineout';

const star = (
  <svg viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path d='M8.276 7.825L1.85649 8.7559L1.74278 8.77878C1.00761 8.96968 0.736859 9.90915 1.30093 10.4606L5.953 15.008L4.84231 21.3268L4.82911 21.4327C4.77288 22.2003 5.59415 22.7575 6.29763 22.3824L11.999 19.343L17.7023 22.3825L17.7988 22.4279C18.5105 22.7194 19.2948 22.1128 19.1578 21.3281L18.054 15.008L22.6997 10.46L22.7779 10.3745C23.2586 9.78723 22.9242 8.86973 22.1443 8.75601L15.758 7.825L12.895 2.05544C12.5264 1.31273 11.4661 1.31545 11.1013 2.06004L8.276 7.825Z' />
  </svg>
);

const StarRate = Rate(star, star);

const App: React.FC = () => <StarRate allowHalf defaultValue={3.5} />;

export default App;

```
### 大小
通过 size 属性可以设置大小
```tsx
/**
 * cn - 大小
 *    -- 通过 size 属性可以设置大小
 * en - Size
 *    -- Set the size through the size property
 */

import React from 'react';
import { Rate } from 'shineout';

const star = (
  <svg viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path d='M8.276 7.825L1.85649 8.7559L1.74278 8.77878C1.00761 8.96968 0.736859 9.90915 1.30093 10.4606L5.953 15.008L4.84231 21.3268L4.82911 21.4327C4.77288 22.2003 5.59415 22.7575 6.29763 22.3824L11.999 19.343L17.7023 22.3825L17.7988 22.4279C18.5105 22.7194 19.2948 22.1128 19.1578 21.3281L18.054 15.008L22.6997 10.46L22.7779 10.3745C23.2586 9.78723 22.9242 8.86973 22.1443 8.75601L15.758 7.825L12.895 2.05544C12.5264 1.31273 11.4661 1.31545 11.1013 2.06004L8.276 7.825Z' />
  </svg>
);

const StarRate = Rate(star, star);

const App: React.FC = () => (
  <div>
    <div style={{ marginBottom: 8 }}>16px</div>
    <StarRate size={16} style={{ marginBottom: 32 }} />
    <div style={{ marginBottom: 8 }}>24px</div>
    <StarRate size={24} />
  </div>
);

export default App;

```
### 附加文字
text 属性可以为每个选项附加文字
```tsx
/**
 * cn - 附加文字
 *    -- text 属性可以为每个选项附加文字
 * en - Text
 *    -- Set text property to append text to each item
 */

import React from 'react';
import { Rate } from 'shineout';

const star = (
  <svg viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path d='M8.276 7.825L1.85649 8.7559L1.74278 8.77878C1.00761 8.96968 0.736859 9.90915 1.30093 10.4606L5.953 15.008L4.84231 21.3268L4.82911 21.4327C4.77288 22.2003 5.59415 22.7575 6.29763 22.3824L11.999 19.343L17.7023 22.3825L17.7988 22.4279C18.5105 22.7194 19.2948 22.1128 19.1578 21.3281L18.054 15.008L22.6997 10.46L22.7779 10.3745C23.2586 9.78723 22.9242 8.86973 22.1443 8.75601L15.758 7.825L12.895 2.05544C12.5264 1.31273 11.4661 1.31545 11.1013 2.06004L8.276 7.825Z' />
  </svg>
);

const StarRate = Rate(star, star);

const App: React.FC = () => (
  <StarRate allowHalf defaultValue={4} text={['poor', 'fair', 'good', 'very good', 'excellent']} />
);

export default App;

```
### 只读
设置 disabled 标示为只读，只读状态下，value可以传入小数
```tsx
/**
 * cn - 只读
 *    -- 设置 disabled 标示为只读，只读状态下，value可以传入小数
 * en - Disabled
 *    -- Set disabled to true make it be read-only. When disabled, value can be passed in decimals
 */

import React from 'react';
import { Rate } from 'shineout';

const star = (
  <svg viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path d='M8.276 7.825L1.85649 8.7559L1.74278 8.77878C1.00761 8.96968 0.736859 9.90915 1.30093 10.4606L5.953 15.008L4.84231 21.3268L4.82911 21.4327C4.77288 22.2003 5.59415 22.7575 6.29763 22.3824L11.999 19.343L17.7023 22.3825L17.7988 22.4279C18.5105 22.7194 19.2948 22.1128 19.1578 21.3281L18.054 15.008L22.6997 10.46L22.7779 10.3745C23.2586 9.78723 22.9242 8.86973 22.1443 8.75601L15.758 7.825L12.895 2.05544C12.5264 1.31273 11.4661 1.31545 11.1013 2.06004L8.276 7.825Z' />
  </svg>
);

const StarRate = Rate(star, star);

const App: React.FC = () => <StarRate value={3.6} disabled />;

export default App;

```
### 分级显示
创建组件时可以使用数组显示不同分数下的选项，这种情况下，不支持带小数的value
```tsx
/**
 * cn - 分级显示
 *    -- 创建组件时可以使用数组显示不同分数下的选项，这种情况下，不支持带小数的value
 * en - Array
 *    -- You can use arrays to display items with different scores when creating components. In this case, values with decimals are not supported
 */
import React from 'react';
import { Rate } from 'shineout';

const defaultIcon = (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M12 1C18.07 1 23 5.93 23 12C23 18.07 18.07 23 12 23C5.93 23 1 18.07 1 12C1 5.93 5.93 1 12 1ZM15.675 14.658H8.508C8.24281 14.658 7.9885 14.7634 7.80099 14.9509C7.61349 15.1385 7.50815 15.3928 7.50815 15.658C7.50815 15.9232 7.61349 16.1775 7.80099 16.3651C7.9885 16.5526 8.24281 16.658 8.508 16.658H15.675C15.8063 16.658 15.9364 16.6322 16.0577 16.5819C16.1791 16.5317 16.2893 16.458 16.3822 16.3652C16.4751 16.2723 16.5488 16.1621 16.599 16.0407C16.6493 15.9194 16.6752 15.7893 16.6752 15.658C16.6752 15.5267 16.6493 15.3966 16.599 15.2753C16.5488 15.1539 16.4751 15.0437 16.3822 14.9508C16.2893 14.858 16.1791 14.7843 16.0577 14.7341C15.9364 14.6838 15.8063 14.658 15.675 14.658ZM7.5 8C6.675 8 6 8.675 6 9.5C6 10.325 6.675 11 7.5 11C8.325 11 9 10.325 9 9.5C9 8.675 8.325 8 7.5 8ZM16.5 8C15.675 8 15 8.656 15 9.5C15 10.325 15.675 11 16.5 11C17.325 11 18 10.325 18 9.5C18 8.675 17.325 8 16.5 8Z'
      fill='#E8EBF0'
    />
  </svg>
);

const cryIcon = (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M11.9995 1.02002C18.0645 1.02002 22.9795 5.93502 22.9795 12C22.9795 18.065 18.0655 22.98 11.9995 22.98C5.93353 22.98 1.01953 18.066 1.01953 12C1.01953 5.93402 5.93353 1.02002 11.9995 1.02002ZM12.1195 12.34C9.16953 12.34 6.51753 13.673 5.36253 15.91C5.27799 16.0915 5.26685 16.2986 5.33144 16.4881C5.39603 16.6776 5.53135 16.8348 5.70913 16.9268C5.88691 17.0189 6.09338 17.0387 6.2854 16.982C6.47742 16.9254 6.64013 16.7968 6.73953 16.623C7.63253 14.895 9.74353 13.903 12.1195 13.903C14.5495 13.903 16.7065 14.909 17.4845 16.593C17.5716 16.7791 17.7288 16.9233 17.9217 16.9941C18.1146 17.0649 18.3277 17.0566 18.5145 16.971C18.7008 16.8841 18.8451 16.727 18.9158 16.5339C18.9865 16.3408 18.9777 16.1277 18.8915 15.941C17.8655 13.72 15.1435 12.34 12.1195 12.34ZM8.97553 8.63502C8.84854 8.63115 8.72234 8.65635 8.60657 8.70869C8.4908 8.76103 8.38852 8.83913 8.30753 8.93702C8.13853 9.15402 7.93053 9.41702 7.46353 9.41702C6.99353 9.41702 6.78753 9.15502 6.62153 8.93902C6.54049 8.84055 6.43796 8.76194 6.32182 8.70925C6.20568 8.65655 6.07901 8.63116 5.95153 8.63502C5.77999 8.62837 5.61049 8.67406 5.46553 8.76602C5.37883 8.82199 5.3047 8.89537 5.24784 8.9815C5.19099 9.06763 5.15265 9.16464 5.13525 9.26637C5.11786 9.36809 5.12179 9.47232 5.1468 9.57245C5.17181 9.67258 5.21735 9.76642 5.28053 9.84802C5.79253 10.512 6.44253 10.981 7.46353 10.981C8.48353 10.981 9.12853 10.513 9.64353 9.85102C9.91353 9.50602 9.86553 9.03802 9.46053 8.76602C9.31571 8.6746 9.14669 8.62895 8.97553 8.63502ZM18.2755 8.63502C18.1484 8.631 18.022 8.65612 17.906 8.70847C17.7901 8.76081 17.6876 8.83899 17.6065 8.93702C17.4375 9.15402 17.2295 9.41702 16.7625 9.41702C16.2925 9.41702 16.0865 9.15502 15.9205 8.93902C15.8395 8.84055 15.737 8.76194 15.6208 8.70925C15.5047 8.65655 15.378 8.63116 15.2505 8.63502C15.079 8.62837 14.9095 8.67406 14.7645 8.76602C14.6778 8.82199 14.6037 8.89537 14.5468 8.9815C14.49 9.06763 14.4516 9.16464 14.4343 9.26637C14.4169 9.36809 14.4208 9.47232 14.4458 9.57245C14.4708 9.67258 14.5163 9.76642 14.5795 9.84802C15.0925 10.512 15.7415 10.981 16.7625 10.981C17.7825 10.981 18.4275 10.513 18.9425 9.85102C19.2125 9.50602 19.1645 9.03802 18.7595 8.76602C18.6147 8.6746 18.4457 8.62895 18.2745 8.63502H18.2755Z'
      fill='#F78C35'
    />
  </svg>
);

const normallyIcon = (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M12 1C18.07 1 23 5.93 23 12C23 18.07 18.07 23 12 23C5.93 23 1 18.07 1 12C1 5.93 5.93 1 12 1ZM15.675 14.658H8.508C8.24281 14.658 7.9885 14.7634 7.80099 14.9509C7.61349 15.1385 7.50815 15.3928 7.50815 15.658C7.50815 15.9232 7.61349 16.1775 7.80099 16.3651C7.9885 16.5526 8.24281 16.658 8.508 16.658H15.675C15.8063 16.658 15.9364 16.6322 16.0577 16.5819C16.1791 16.5317 16.2893 16.458 16.3822 16.3652C16.4751 16.2723 16.5488 16.1621 16.599 16.0407C16.6493 15.9194 16.6752 15.7893 16.6752 15.658C16.6752 15.5267 16.6493 15.3966 16.599 15.2753C16.5488 15.1539 16.4751 15.0437 16.3822 14.9508C16.2893 14.858 16.1791 14.7843 16.0577 14.7341C15.9364 14.6838 15.8063 14.658 15.675 14.658ZM7.5 8C6.675 8 6 8.675 6 9.5C6 10.325 6.675 11 7.5 11C8.325 11 9 10.325 9 9.5C9 8.675 8.325 8 7.5 8ZM16.5 8C15.675 8 15 8.656 15 9.5C15 10.325 15.675 11 16.5 11C17.325 11 18 10.325 18 9.5C18 8.675 17.325 8 16.5 8Z'
      fill='#F78C35'
    />
  </svg>
);

const happyIcon = (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M12 1C18.075 1 23 5.925 23 12C23 18.075 18.075 23 12 23C5.925 23 1 18.075 1 12C1 5.925 5.925 1 12 1ZM17.204 12.355H6.796C6.71831 12.3549 6.64135 12.3701 6.56953 12.3997C6.49771 12.4293 6.43244 12.4729 6.37745 12.5277C6.32247 12.5826 6.27885 12.6478 6.24908 12.7196C6.21932 12.7914 6.204 12.8683 6.204 12.946C6.204 13.7071 6.35392 14.4608 6.64519 15.164C6.93647 15.8672 7.3634 16.5062 7.90161 17.0444C8.43982 17.5826 9.07876 18.0095 9.78197 18.3008C10.4852 18.5921 11.2389 18.742 12 18.742C12.7611 18.742 13.5148 18.5921 14.218 18.3008C14.9212 18.0095 15.5602 17.5826 16.0984 17.0444C16.6366 16.5062 17.0635 15.8672 17.3548 15.164C17.6461 14.4608 17.796 13.7071 17.796 12.946C17.796 12.8683 17.7807 12.7914 17.7509 12.7196C17.7212 12.6478 17.6775 12.5826 17.6225 12.5277C17.5676 12.4729 17.5023 12.4293 17.4305 12.3997C17.3587 12.3701 17.2817 12.3549 17.204 12.355ZM7.42 7.269C7.23042 7.26397 7.04175 7.29696 6.86513 7.36604C6.68851 7.43511 6.52751 7.53886 6.39164 7.67117C6.25577 7.80348 6.14778 7.96167 6.07405 8.1364C6.00031 8.31113 5.96232 8.49885 5.96232 8.6885C5.96232 8.87815 6.00031 9.06588 6.07405 9.2406C6.14778 9.41533 6.25577 9.57352 6.39164 9.70583C6.52751 9.83814 6.68851 9.94189 6.86513 10.011C7.04175 10.08 7.23042 10.113 7.42 10.108C7.79661 10.108 8.15779 9.95839 8.42409 9.69209C8.69039 9.42579 8.84 9.06461 8.84 8.688C8.84 8.31139 8.69039 7.95021 8.42409 7.68391C8.15779 7.41761 7.79661 7.268 7.42 7.268V7.269ZM16.42 7.269C16.2304 7.26397 16.0417 7.29696 15.8651 7.36604C15.6885 7.43511 15.5275 7.53886 15.3916 7.67117C15.2558 7.80348 15.1478 7.96167 15.074 8.1364C15.0003 8.31113 14.9623 8.49885 14.9623 8.6885C14.9623 8.87815 15.0003 9.06588 15.074 9.2406C15.1478 9.41533 15.2558 9.57352 15.3916 9.70583C15.5275 9.83814 15.6885 9.94189 15.8651 10.011C16.0417 10.08 16.2304 10.113 16.42 10.108C16.7966 10.108 17.1578 9.95839 17.4241 9.69209C17.6904 9.42579 17.84 9.06461 17.84 8.688C17.84 8.31139 17.6904 7.95021 17.4241 7.68391C17.1578 7.41761 16.7966 7.268 16.42 7.268V7.269Z'
      fill='#F78C35'
    />
  </svg>
);

const background = defaultIcon;

const front = [cryIcon, cryIcon, normallyIcon, happyIcon, happyIcon];
const TextRate = Rate(background, front);

export default function () {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <TextRate size={24} defaultValue={5} />
      <TextRate size={24} defaultValue={4} />
      <TextRate size={24} defaultValue={3} />
      <TextRate size={24} defaultValue={2} />
      <TextRate size={24} defaultValue={1} />
      <TextRate size={24} defaultValue={0} />
    </div>
  );
}

```
### 不重复选项
默认情况下，会重复显示当前分值对应的选项，设置 repeat 属性为 false 可以按分值显示不同选项
```tsx
/**
 * cn - 不重复选项
 *    -- 默认情况下，会重复显示当前分值对应的选项，设置 repeat 属性为 false 可以按分值显示不同选项
 * en - No Repeat
 *    -- By default, the item corresponding to the current value is displayed repeatedly. Set repeat property to false to display different item by value
 */

import React from 'react';
import { Rate } from 'shineout';

const LetterRate = Rate(['A', 'B', 'C', 'D', 'E'], ['A', 'B', 'C', 'D', 'E']);
const NumberRate = Rate(['1', '2', '3', '4', '5'], ['1', '2', '3', '4', '5']);

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <LetterRate repeat={false} defaultValue={3} />
    <NumberRate repeat={false} defaultValue={3} />
  </div>
);

export default App;

```
### 最大值
通过 max 属性设置选项最大值，默认为 5
```tsx
/**
 * cn - 最大值
 *    -- 通过 max 属性设置选项最大值，默认为 5
 * en - Max
 *    -- Set the maximum value of the option through the max attribute. The default value is 5
 */
import React from 'react';
import { Rate } from 'shineout';

const star = (
  <svg viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path d='M8.276 7.825L1.85649 8.7559L1.74278 8.77878C1.00761 8.96968 0.736859 9.90915 1.30093 10.4606L5.953 15.008L4.84231 21.3268L4.82911 21.4327C4.77288 22.2003 5.59415 22.7575 6.29763 22.3824L11.999 19.343L17.7023 22.3825L17.7988 22.4279C18.5105 22.7194 19.2948 22.1128 19.1578 21.3281L18.054 15.008L22.6997 10.46L22.7779 10.3745C23.2586 9.78723 22.9242 8.86973 22.1443 8.75601L15.758 7.825L12.895 2.05544C12.5264 1.31273 11.4661 1.31545 11.1013 2.06004L8.276 7.825Z' />
  </svg>
);

const StarRate = Rate(star, star);

const App: React.FC = () => <StarRate max={10} defaultValue={3} />;

export default App;

```
### 颜色
在创建组件时设置颜色
```tsx
/**
 * cn - 颜色
 *    -- 在创建组件时设置颜色
 * en - Icon color
 *    -- Set the color when the component is created
 */
import React from 'react';
import { Rate } from 'shineout';

const getColorStar = (color: string) => (
  <svg viewBox='0 0 24 24' fill={color} xmlns='http://www.w3.org/2000/svg'>
    <path d='M8.276 7.825L1.85649 8.7559L1.74278 8.77878C1.00761 8.96968 0.736859 9.90915 1.30093 10.4606L5.953 15.008L4.84231 21.3268L4.82911 21.4327C4.77288 22.2003 5.59415 22.7575 6.29763 22.3824L11.999 19.343L17.7023 22.3825L17.7988 22.4279C18.5105 22.7194 19.2948 22.1128 19.1578 21.3281L18.054 15.008L22.6997 10.46L22.7779 10.3745C23.2586 9.78723 22.9242 8.86973 22.1443 8.75601L15.758 7.825L12.895 2.05544C12.5264 1.31273 11.4661 1.31545 11.1013 2.06004L8.276 7.825Z' />
  </svg>
);

const heartBg = getColorStar('currentColor');
const heart = getColorStar('#ff4d4f');
const HeartRate = Rate(heartBg, heart);

const App: React.FC = () => <HeartRate defaultValue={2} />;

export default App;

```
### 清除
通过 clearable 属性可以设置再次点击清除 value
```tsx
/**
 * cn - 清除
 *    -- 通过 clearable 属性可以设置再次点击清除 value
 * en - clear
 *    -- Set the clearable to clear value when click again
 */
import React from 'react';
import { Rate } from 'shineout';

const star = (
  <svg viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path d='M8.276 7.825L1.85649 8.7559L1.74278 8.77878C1.00761 8.96968 0.736859 9.90915 1.30093 10.4606L5.953 15.008L4.84231 21.3268L4.82911 21.4327C4.77288 22.2003 5.59415 22.7575 6.29763 22.3824L11.999 19.343L17.7023 22.3825L17.7988 22.4279C18.5105 22.7194 19.2948 22.1128 19.1578 21.3281L18.054 15.008L22.6997 10.46L22.7779 10.3745C23.2586 9.78723 22.9242 8.86973 22.1443 8.75601L15.758 7.825L12.895 2.05544C12.5264 1.31273 11.4661 1.31545 11.1013 2.06004L8.276 7.825Z' />
  </svg>
);

const StarRate = Rate(star, star);

const App: React.FC = () => <StarRate clearable />;

export default App;

```
## Guide



# Rule
Shineout Form 内部定义了一套数据校验机制，在 Form 内的组件上通过 rules 属性进行配置。
## API
### required
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|message|string ||报错提示|
### min
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|min|number||最小值|
|message|string ||报错提示|
### max
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|max|number||最大值|
|message|string ||报错提示|
### range
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|min|number||最小值|
|max|number||最大值|
|message|string ||报错提示|
### regExp
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|reg|string / RegExp||正则表达式|
|message|string ||报错提示|
### type
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|message|string ||报错提示|
### custom
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|value|any||值|
|formValue|object ||form 值|
|callback|((result: true / Error) => void) ||回调|
## Example
### required
必填校验函数
```tsx
/**
 * cn - required
 *    -- 必填校验函数
 * en - required
 *    -- Basic Spin usage
 */
import React from 'react';
import { Form, Input, Rule } from 'shineout';

const rule = Rule();
export default () => {
  return (
    <Form style={{ maxWidth: 500 }}>
      <Form.Item label='name' required>
        <Input name='name' title='name' rules={[rule.required()]} />
      </Form.Item>
      <Form.Item label='age' required>
        <Input name='age' rules={[rule.required('age required')]} />
      </Form.Item>
      <Form.Item label='address' required>
        <Input name='address' rules={[{ required: true, message: 'address required' }]} />
      </Form.Item>
      <Form.Item label=''>
        <Form.Submit>Submit</Form.Submit>
      </Form.Item>
    </Form>
  );
};

```
### min
最小值校验，会根据 Field 的 type 自动判断校验类型为字符串、数字或选项
```tsx
/**
 * cn - min
 *    -- 最小值校验，会根据 Field 的 type 自动判断校验类型为字符串、数字或选项
 * en - min
 *    -- min value validation, the validation type is automatically determined according to the type of Field
 */
import React from 'react';
import { Form, Input, Rule } from 'shineout';

const rule = Rule();
export default () => {
  return (
    <Form style={{ maxWidth: 500 }}>
      <Form.Item label='name' required>
        <Input name='name' title='name' rules={[rule.required(), rule.min(2)]} />
      </Form.Item>
      <Form.Item label='age' required>
        <Input.Number name='age' title='age' rules={[rule.required(), rule.min(18)]} />
      </Form.Item>
      <Form.Item label='address' required>
        <Input.Number
          name='address'
          title='address'
          rules={[rule.required(), { min: 3, message: 'address must be at least three characters' }]}
        />
      </Form.Item>
      <Form.Item label=''>
        <Form.Submit>Submit</Form.Submit>
      </Form.Item>
    </Form>
  );
};

```
### max
最大值校验，会根据 Field 的 type 自动判断校验类型为字符串、数字或选项
```tsx
/**
 * cn - max
 *    -- 最大值校验，会根据 Field 的 type 自动判断校验类型为字符串、数字或选项
 * en - max
 *    -- max value validation, the validation type is automatically determined according to the type of Field
 */
import React from 'react';
import { Form, Input, Rule } from 'shineout';

const rule = Rule();
export default () => {
  return (
    <Form style={{ maxWidth: 500 }}>
      <Form.Item label='name' required>
        <Input name='name' title='name' rules={[rule.required(), rule.max(5)]} />
      </Form.Item>
      <Form.Item label='age' required>
        <Input.Number name='age' title='age' rules={[rule.required(), rule.max(100)]} />
      </Form.Item>
      <Form.Item label='address' required>
        <Input.Number
          name='address'
          title='address'
          rules={[rule.required(), { max: 3, message: 'address must be at least three characters' }]}
        />
      </Form.Item>
      <Form.Item label=''>
        <Form.Submit>Submit</Form.Submit>
      </Form.Item>
    </Form>
  );
};

```
### range
数值范围校验，会根据 Field 的 type 自动判断校验类型为字符串、数字或选项
```tsx
/**
 * cn - range
 *    -- 数值范围校验，会根据 Field 的 type 自动判断校验类型为字符串、数字或选项
 * en - range
 *    -- Range value validation, the validation type is automatically determined according to the type of Field
 */
import React from 'react';
import { Form, Input, Rule } from 'shineout';

const rule = Rule();
export default () => {
  return (
    <Form style={{ maxWidth: 500 }}>
      <Form.Item label='name' required>
        <Input name='name' title='name' rules={[rule.required(), rule.range(1, 5)]} />
      </Form.Item>
      <Form.Item label='age' required>
        <Input.Number name='age' title='age' rules={[rule.required(), rule.range(18, 100)]} />
      </Form.Item>
      <Form.Item label=''>
        <Form.Submit>Submit</Form.Submit>
      </Form.Item>
    </Form>
  );
};

```
### type
内置了常用的类型校验
```tsx
/**
 * cn - type
 *    -- 内置了常用的类型校验
 * en - type
 *    -- Built-in type validation
 */
import React from 'react';
import { Form, Input, Rule } from 'shineout';

const rule = Rule();
export default () => {
  return (
    <Form style={{ maxWidth: 500 }}>
      <Form.Item label='name' required>
        <Input name='email' rules={[rule.required(), rule.email('email is invalid')]} />
      </Form.Item>
      <Form.Item label='age' required>
        <Input name='age' rules={[rule.required(), rule.integer('Please enter a valid age')]} />
      </Form.Item>
      <Form.Item label='price' required>
        <Input name='price' rules={[rule.required(), rule.number('Please enter a valid price')]} />
      </Form.Item>
      <Form.Item label='url' required>
        <Input name='url' rules={[rule.required(), rule.url('The url is not valid')]} />
      </Form.Item>
      <Form.Item label=''>
        <Form.Submit>Submit</Form.Submit>
      </Form.Item>
    </Form>
  );
};

```
### regExp
正则表达式校验
```tsx
/**
 * cn - regExp
 *    -- 正则表达式校验
 * en - regExp
 *    -- Regular expression validation
 */
import React from 'react';
import { Form, Input, Rule } from 'shineout';

const rule = Rule();
export default () => {
  return (
    <Form style={{ maxWidth: 500 }}>
      <Form.Item label='tel' required>
        <Input
          name='tel'
          rules={[rule.required(), rule.regExp('^[\\d\\s ().-]+$', 'Please enter a valid tel')]}
        />
      </Form.Item>
      <Form.Item label=''>
        <Form.Submit>Submit</Form.Submit>
      </Form.Item>
    </Form>
  );
};

```
### 自定义校验
使用函数自定义校验规则
```tsx
/**
 * cn - 自定义校验
 *    -- 使用函数自定义校验规则
 * en - Custom
 *    -- Custom validation rules using function
 */
import React from 'react';
import { Form, Input, Rule } from 'shineout';

const rule = Rule({
  tel: (value, _formData, callback, _props) => {
    if (!value) return callback(new Error('Please enter your phone number'));
    if (!/^[0-9\s ().-]+$/.test(value)) return callback(new Error('Please enter a valid phone number'));
    return callback(true);
  },
});
export default () => {
  return (
    <Form style={{ maxWidth: 500 }}>
      <Form.Item label='tel' required>
        <Input name='tel' rules={[rule.tel]} />
      </Form.Item>
      <Form.Item label=''>
        <Form.Submit>Submit</Form.Submit>
      </Form.Item>
    </Form>
  );
};

```
## Guide



# Select
用于收纳大量选项的信息录入类组件
## API
### Select
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|value|any||在 Form 中，value 会被表单接管，value 无效|
|data|DataItem[]||选项数据|
|treeData|Object[]||树形结构数据项，[{children: []}]|
|defaultValue|Value ||默认值 通过 Value 类型|
|separator|string ||多选情况下设置后，value 会处理为 separator 分隔的字符串|
|multiple|boolean |false|是否是多选|
|childrenKey|ObjectKey<DataItem> |\"children\"|指定子数据的属性名|
|disabled|boolean / ((data: DataItem) => boolean) |false|如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项|
|prediction|((value: Value, Data: DataItem) => boolean) |(val, d) => val===format(d)|默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配|
|format|((data: DataItem) => Value extends (infer U)[] ? U : Value) / ObjectKey<DataItem> |d => d|格式化 value, 默认值，返回原始数据。 为 string 时，会作为 key 从原始数据中获取值，相当于 (d) => d[format]; 为函数时，以函数返回结果作为 value|
|onChange|((value: Value, data?: DataItem / DataItem[] , checked?: boolean ) => void) ||值改变回调|
|groupBy|((item: DataItem, index?: number , data?: DataItem[] ) => string) ||分组|
|filterSameChange|boolean |||
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|size|\"small\" / \"large\" / \"default\"|\"default\"|不同尺寸|
|status|\"error\" ||组件状态|
|innerTitle|ReactNode||内嵌标题|
|absolute|boolean / (() => HTMLElement / null) |false|为 true 时，选项弹出层在 DOM 中独立 render; 为函数时，返回值作为弹出层容器|
|zIndex|number |1000|选项列表 z-index 值, 需要配合 absolute|
|emptyText|string ||自定义 empty 文案|
|keygen|/ ObjectKey<DataItem>  / ((data: DataItem, index?: number) => string / number)  / true|index|生成 key 的辅助方法, 为函数时，使用此函数返回值, 为 string 时，使用这个 string 对应的数据值。如 \"id\"，相当于 (d) => d.id|
|inputable|boolean |false|可输入|
|clearable|boolean |false|是否显示清除数据图标|
|placeholder|string ||占位文字|
|loading|boolean / ReactNode|false|数据加载中，为true时会展示一个默认的 [Spin](/components/Spin) 组件，可以传入一个自定义的Spin代替|
|header|ReactNode||自定义渲染列表头部内容|
|footer|ReactNode||自定义渲染列表底部内容|
|renderOptionList|((list: ReactNode, info: { loading?: ReactNode; }) => ReactNode) ||自定义渲染下拉列表|
|underline|boolean |false|是否只展示下边框|
|open|boolean ||控制浮层显隐|
|width|string / number ||选择框的宽度|
|height|string / number ||下拉列表的高度|
|optionWidth|string / number |100%|下拉列表的宽度|
|itemsInView|number |10|单次 render 的最大行数。Select 采用了lazy render 的方式来优化在大量数据下的性能，如果你的表格显示的高度超出了 10 条，可以调整 itemsInView|
|lineHeight|number |32|选项高度。列表项使用虚拟列表渲染，当选项高度改变时，应该通过 lineHeight 来指定正确高度|
|position|\"auto\" / \"bottom-left\" / \"top-left\" ||弹出框位置|
|columns|number |1|columns 大于 1 时，选项展示为多列布局模式|
|columnsTitle|ReactNode||多列选项多选时的标题文字|
|noCache|boolean |false|是否开启数据缓存，如果数据存在动态更新的情况建议开启|
|showArrow|boolean |true|是否显示下拉箭头，仅针对单选情况|
|focusSelected|boolean |true|onFilter 在多选情况下点击选项后是否选中过滤文本|
|trim|boolean |false|trim 为 true 时，失去焦点时会自动删除空白字符|
|columnWidth|number |160|columns 大于 1 时，选项展示为多列布局模式|
|maxLength|number ||Select 输入框输入字符串最大长度|
|autoAdapt|boolean |false|下拉列表宽度根据内容自由展开|
|compressed|boolean / \"no-repeat\" |false|将选中值合并，只在多选模式下有效; 为 \"no-repeat\" 时弹出框中不重复展示值|
|compressedBound|number ||开启多选后，指定允许展示标签数量，超过后将折叠|
|compressedClassName|string ||多选合并展示弹出框的类名|
|hideCreateOption|boolean |false|在使用创建选项时，在选项列表中隐藏该选项，回车后直接选中|
|filterSingleSelect|boolean |false|当筛选数据仅为一条时，失焦后直接选中该条数据。仅在 Filter 下有效|
|defaultExpanded|(string / number)[]||默认展开的节点 key（非受控）|
|defaultExpandAll|boolean |false|默认展开全部子节点, 仅树形数据下有效|
|expanded|(string / number)[]||展开的节点 key(受控)|
|showHitDescendants|boolean |false|筛选后是否展示命中节点的后代节点|
|convertBr|string / ((text: string) => string) |\" \"|用来转化粘贴文本中的换行|
|resultClassName|string / ((value: DataItem) => string) ||选中结果内容容器的className|
|renderItem|ObjectKey<DataItem> / ((data: DataItem, index?: number ) => ReactNode) |d => d|为 string 时，返回 d[string]。 为 function 时，返回函数结果|
|renderResult|((data: DataItem, index?: number ) => ReactNode) |renderItem|为 选中后在结果中显示的内容，默认和 renderItem 相同|
|renderUnmatched|((value: Value extends (infer U)[] ? U : Value) => ReactNode) ||渲染未匹配值的方式|
|onBlur|((e: any) => void) ||blur 事件回调|
|onFocus|((e: any) => void) ||focus 事件回调|
|onFilter|((text: string, from?: string ) => void / ((data: DataItem) => boolean) ) ||onFilter 不为空时，可以输入过滤数据。onFilter 如果返回一个函数，使用这个函数做前端过滤。如果不返回，可以自行做后端过滤|
|onCreate|boolean / ((input: string / DataItem) => string / DataItem) ||如果设置了 onCreate 事件，组件为可输入状态。onCreate 为函数时，将此函数返回值作为新的选项拆入最上方。onCreate 为 true 时，使用默认函数 text => text|
|onEnterExpand|((e: KeyboardEvent<HTMLDivElement>) => boolean) ||回车触发下拉框展开的时候调用|
|onCollapse|((collapse: boolean) => void) ||下拉列表展开/收起回调|
|onExpand|((value: (string / number)[]) => void) ||节点展开回调，参数为当前展开节点 key 数组|
|onFilterWidthCreate|((data: DataItem, createdData: DataItem, key: string / number) => boolean) ||新增 api ，开启 onFilter 和 onCreate 时，用于比对是否已经存在相同的数据，默认用输入的值和 keygen 值比对|
|emptyAfterSelect|boolean |false|选中后是否清空输入框内容|
|filterDelay|number |400|毫秒。用户输入触发 fitler 事件的延时|
|loader|((key: string / number, data: DataItem) => void) ||设置 loader 属性后，未定义 children 的节点视为动态加载节点，点击展开触发 loader事件，children 为 null 或者长度为 0 视为叶子节点|
|onAdvancedFilter|((text: string) => (data: DataItem) => boolean) ||高级筛选模式，可针对当前层级在筛选结果和原始数据间切换|
|reFocus|boolean |false|存在 onFilter 和 onCreate，选中 Option，自动 focus Input|
|popover|PopoverProps[\"position\"]||校验信息弹出位置|
|popoverProps|PopoverProps ||校验或者tip弹框接受的属性|
|name|Name ||Form 内存取数据的 key|
|beforeChange|((value: T) => void / T ) ||值改变前的回调，当返回值不为空时将作为组件的新值|
|reserveAble|boolean ||设置为 true 组件卸载后表单不自动删除数据|
|rules|RuleItem[]||校验规则 详见 [Rule](/components/rule)|
|onError|((error?: Error ) => void) ||rules 校验回调|
|bind|string[] ||当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用|
## Example
### 基本用法
Select 通过<span>data</span>属性设置数据源，通过<span>keygen</span>属性设置key生成器，通过<span>renderItem</span>属性设置渲染函数
```tsx
/**
 * cn - 基本用法
 *    -- Select 通过`data`属性设置数据源，通过`keygen`属性设置key生成器，通过`renderItem`属性设置渲染函数
 * en - Basic
 *    --
 */
import React from 'react';
import { Select } from 'shineout';
import { primitiveData } from './static/mock';

export default () => {
  return (
    <div>
      <Select width={300} clearable data={primitiveData} keygen placeholder='Select Color' />
    </div>
  );
};

```
### 多选
设置<span>multiple</span>属性允许开启多选功能
```tsx
/**
 * cn - 多选
 *    -- 设置`multiple`属性允许开启多选功能
 * en - Multiple
 *    -- Set `multiple` to enable multiple selection
 */
import React from 'react';
import { Select } from 'shineout';

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  return (
    <div>
      <Select
        width={300}
        multiple
        onChange={(v) => console.log(v)}
        data={data}
        keygen
        placeholder='Select Color'
        clearable
      />
    </div>
  );
};

```
### 
多选下设置<span>compressed</span>属性，结果不换行，超出折叠显示
```tsx
/**
 * cn -
 *    -- 多选下设置`compressed`属性，结果不换行，超出折叠显示
 * en -
 *    -- Set `compressed` to prevent wrapping and will be displayed beyond the fold when multiple
 */
import React from 'react';
import { Select } from 'shineout';

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  return (
    <div>
      <Select
        width={300}
        multiple
        onChange={(v) => console.log(v)}
        data={data}
        keygen
        placeholder='Select Color'
        compressed
        clearable
      />
    </div>
  );
};

```
### 自动撑开列表
设置<span>autoAdapt</span>属性，列表会随内容宽度自动撑开
```tsx
/**
 * cn - 自动撑开列表
 *    -- 设置`autoAdapt`属性，列表会随内容宽度自动撑开
 * en - autoAdapt
 *    -- Set the `autoAdapt` property, the list will automatically expand with the content width
 */
import React from 'react';
import { Select } from 'shineout';

export default () => {
  const data = [
    'red',
    'loooooooooooooooooooooooooooooooooooooooooooong',
    'yellow',
    'green',
    'cyan',
    'blue',
    'violet',
    'pink',
  ];
  return (
    <div>
      <Select width={300} autoAdapt data={data} keygen placeholder='Select Color' clearable />
    </div>
  );
};

```
### 数据格式化
设置<span>format</span>属性，可以对数据进行格式化，format为字符串时，会从数据中取对应的值；为函数时，会使用函数返回值
注意，复杂数据格式化时，需要配置<span>prediction</span>辅助比对函数用于比较复杂类型的数据
```tsx
/**
 * cn - 数据格式化
 *    -- 设置`format`属性，可以对数据进行格式化，format为字符串时，会从数据中取对应的值；为函数时，会使用函数返回值
 *    -- 注意，复杂数据格式化时，需要配置`prediction`辅助比对函数用于比较复杂类型的数据
 * en - Format
 *    -- Set the format property to format the data. When the format is a string, the corresponding value will be taken from the data. When the format is a function, the return value of the function will be used
 *    -- Note that when formatting complex data, you need to configure the prediction auxiliary comparison function to compare complex types of data
 */
import React from 'react';
import { Select, TYPE } from 'shineout';

type SelectProps = TYPE.Select.Props<DataItem, string>;

interface DataItem {
  id: string;
  name: string;
}

const data: DataItem[] = [];
for (let i = 0; i < 15; i++) {
  data.push({
    id: `id-${i}`,
    name: `Label ${i}`,
  });
}

export default () => {
  const prediction: SelectProps['prediction'] = (v, d) => v === d.id;

  const renderItem: SelectProps['renderItem'] = (d) => d.name;

  return (
    <div>
      <Select
        width={300}
        data={data}
        keygen='id'
        format='id'
        prediction={prediction}
        placeholder='Select Color'
        renderItem={renderItem}
        clearable
      />
    </div>
  );
};

```
### 
设置<span>separator</span>属性支持多选时以分隔符分合并或解析值
```tsx
/**
 * cn -
 *    -- 设置`separator`属性支持多选时以分隔符分合并或解析值
 * en -
 *    -- Set the `separator` property to merge or parse values with a separator when multiple selection is supported
 */
import React, { useState } from 'react';
import { Select } from 'shineout';
import { primitiveData } from './static/mock';
import Code from './static/code';

export default () => {
  const [value, setValue] = useState('orange~blue');
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: 100 }}>
        <Select
          width={300}
          multiple
          value={value}
          separator='~'
          onChange={setValue}
          data={primitiveData}
          keygen
          placeholder='Select Color'
          renderItem={(d) => d}
          clearable
        />
      </div>
      <Code value={value}></Code>
    </div>
  );
};

```
### 大数据性能
内置虚拟列表，支持大数据渲染，本例展示10万条数据
```tsx
/**
 * cn - 大数据性能
 *    -- 内置虚拟列表，支持大数据渲染，本例展示10万条数据
 * en - Big data
 *    -- Select has built-in virtual list to support big data rendering, this example shows 100,000 pieces of data
 */
import React from 'react';
import { Select, TYPE } from 'shineout';

type SelectProps = TYPE.Select.Props<DataItem, string>;

interface DataItem {
  id: string;
  name: string;
}

const data: DataItem[] = [];

for (let i = 0; i < 100000; i++) {
  data.push({
    id: `id-${i}`,
    name: `标签 ${i}`,
  });
}

const renderItem: SelectProps['renderItem'] = (d) => d.name;

export default () => {
  return (
    <div>
      <Select
        width={300}
        data={data}
        keygen='id'
        placeholder='Select Tag'
        renderItem={renderItem}
        clearable
      />
    </div>
  );
};

```
### 尺寸大小
设置 <span>size</span> 属性改变输入框组件的尺寸大小。内置三种尺寸：small、default、large
```tsx
/**
 * cn - 尺寸大小
 *    -- 设置 `size` 属性改变输入框组件的尺寸大小。内置三种尺寸：small、default、large
 * en - Size
 *    -- Set the size property to change the size of the input box component. There are three built-in sizes available: small, default, and large.
 */

import React from 'react';
import { Select } from 'shineout';

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

export default () => {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Select width={240} size='small' placeholder='Select Color' data={data} keygen clearable />
      <Select
        width={240}
        placeholder='Select Color'
        data={data}
        keygen
        renderItem={(d) => d}
        clearable
      />
      <Select width={240} placeholder='Select Color' size='large' data={data} keygen clearable />
    </div>
  );
};

```
### 数据分组
设置<span>groupBy</span>分组函数，对数据进行分组
```tsx
/**
 * cn - 数据分组
 *    -- 设置`groupBy`分组函数，对数据进行分组
 * en - Group
 *    -- Set the `groupBy` function to group the data
 */
import React from 'react';
import { Select, TYPE } from 'shineout';

type SelectProps = TYPE.Select.Props<DataItem, string>;
interface DataItem {
  value: string;
  group: string;
}

export default () => {
  const data: DataItem[] = [
    { value: 'Mars', group: '3' },
    { value: 'China', group: '2' },
    { value: 'Beijing', group: '1' },
    { value: 'Shanghai', group: '1' },
  ];

  const groupBy: SelectProps['groupBy'] = (d) => {
    if (d.group === '1') return 'City';
    if (d.group === '2') return 'Country';
    return 'Other';
  };

  return (
    <Select
      width={300}
      data={data}
      placeholder='Select a city'
      keygen='value'
      format='value'
      prediction={(v, d) => v === d.value}
      renderItem='value'
      style={{ width: 240 }}
      groupBy={groupBy}
      clearable
    />
  );
};

```
### 禁用/禁用选项
通过设置<span>disabled</span>属性可以禁用组件。disabled为函数时，支持禁用单个选项
```tsx
/**
 * cn - 禁用/禁用选项
 *    -- 通过设置`disabled`属性可以禁用组件。disabled为函数时，支持禁用单个选项
 * en - Disabled
 *    -- Set the `disabled` property to disable the component. When `disabled` is a function, support disabling a single option
 */
import React from 'react';
import { Select } from 'shineout';

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, width: 624 }}>
      <Select width={300} disabled data={data} keygen placeholder='Select Color' clearable />
      <Select
        width={300}
        disabled={(d) => d === 'orange'}
        data={data}
        keygen
        placeholder='Select Color'
        clearable
      />
      <Select
        compressed
        multiple
        value={['red', 'orange']}
        width={300}
        disabled
        data={data}
        keygen
        placeholder='Select Color'
        clearable
      />
      <Select
        multiple
        compressed
        defaultValue={['red', 'orange']}
        width={300}
        disabled={(d) => d === 'orange'}
        data={data}
        keygen
        placeholder='Select Color'
        clearable
      />
    </div>
  );
};

```
### 树形数据

```tsx
/**
 * cn - 树形数据
 *    --
 * en - Tree Data
 *    --
 */
import React from 'react';
import { Select, TYPE } from 'shineout';

type SelectProps = TYPE.Select.Props<DataItem, string>;

type DataItem = {
  id: string;
  title: string;
  children?: DataItem[];
};

export default () => {
  const treeData: SelectProps['treeData'] = [
    {
      id: '1',
      title: 'node 1',
      children: [
        {
          id: '1-1',
          title: 'node 1-1',
          children: [
            { id: '1-1-1', title: 'node 1-1-1' },
            { id: '1-1-2', title: 'node 1-1-2' },
          ],
        },
        { id: '1-2', title: 'node 1-2' },
      ],
    },
    {
      id: '2',
      title: 'node 2',
    },
    { id: '3', title: 'node 3', children: [{ id: '3-1', title: 'node 3-1' }] },
    { id: '4', title: 'node 4' },
  ];

  const prediction: SelectProps['prediction'] = (v, d) => v === d.id;

  const renderItem: SelectProps['renderItem'] = (d) => d.title;

  return (
    <div>
      <Select
        width={260}
        childrenKey='children'
        treeData={treeData}
        keygen='id'
        format='id'
        placeholder='Select Color'
        prediction={prediction}
        renderItem={renderItem}
        clearable
      />
    </div>
  );
};

```
### 创建选项

```tsx
/**
 * cn - 创建选项
 *    --
 * en - Create option
 *    --
 */
import React from 'react';
import { Select } from 'shineout';

type DataItem = {
  id: string;
  name: string;
};

const data: DataItem[] = [];
for (let i = 0; i < 15; i++) {
  data.push({
    id: `id-${i}`,
    name: `标签 ${i}`,
  });
}

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  return (
    <div>
      <Select
        multiple
        hideCreateOption
        width={300}
        data={data}
        onCreate
        height={250}
        keygen
        placeholder='Select Color'
        clearable
      />
    </div>
  );
};

```
### 过滤数据（本地）
设置<span>onFilter</span>属性且返回内容为函数时，会根据返回的过滤函数对本地数据进行过滤
```tsx
/**
 * cn - 过滤数据（本地）
 *    -- 设置`onFilter`属性且返回内容为函数时，会根据返回的过滤函数对本地数据进行过滤
 * en - Filter data (local)
 *    -- Set the `onFilter` property and return the content as a function, the local data will be filtered according to the returned filter function
 */
import React from 'react';
import { Select, TYPE } from 'shineout';

type SelectProps = TYPE.Select.Props<string, string>;

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  const handleFilter: SelectProps['onFilter'] = (v) => (d) => d.indexOf(v) >= 0;

  return (
    <div>
      <Select
        width={300}
        data={data}
        keygen
        placeholder='Select Color'
        onFilter={handleFilter}
        clearable
      />
    </div>
  );
};

```
### 过滤数据（服务端）
设置<span>onFilter</span>属性且不返回内容时，可以根据输入的内容自行进行过滤，并根据后端接口返回的数据重新设置data
```tsx
/**
 * cn - 过滤数据（服务端）
 *    -- 设置`onFilter`属性且不返回内容时，可以根据输入的内容自行进行过滤，并根据后端接口返回的数据重新设置data
 * en - Filter data (server)
 *    -- Set the `onFilter` property and do not return the content, you can filter according to the input content, and reset the data according to the data returned by the backend interface
 */
import React, { useState, useEffect } from 'react';
import { Select, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

type SelectProps = TYPE.Select.Props<DataItem, string>;

interface DataItem {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

export default () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = (text: string) => {
    user.fetch.get('user', { username: text, sorter: {} }).then((res: { data: DataItem[] }) => {
      setData(res.data);
      setLoading(false);
    });
  };

  const handleFilter: SelectProps['onFilter'] = (text) => {
    setLoading(true);
    getData(text);
  };

  const renderItem: SelectProps['renderItem'] = (d) => `${d.firstName}-${d.lastName}`;

  useEffect(() => {
    getData('');
  }, []);

  return (
    <div>
      <Select
        loading={loading}
        width={300}
        data={data}
        keygen='id'
        placeholder='Select Color'
        renderItem={renderItem}
        onFilter={handleFilter}
        clearable
      />
    </div>
  );
};

```
### 树形数据过滤
通过设置<span>onFilter</span>和<span>treeData</span>可以对树形数据进行过滤
```tsx
/**
 * cn - 树形数据过滤
 *    -- 通过设置`onFilter`和`treeData`可以对树形数据进行过滤
 * en - Tree data filter
 *    -- Set onFilter and treeData to filter tree data
 */
import React from 'react';
import { Select, TYPE } from 'shineout';

type SelectProps = TYPE.Select.Props<DataItem, string>;

type DataItem = {
  id: string;
  title: string;
  children?: DataItem[];
};

export default () => {
  const treeData: DataItem[] = [
    {
      id: '1',
      title: 'node 1',
      children: [
        {
          id: '1-1',
          title: 'node 1-1',
          children: [
            { id: '1-1-1', title: 'node 1-1-1' },
            { id: '1-1-2', title: 'node 1-1-2' },
          ],
        },
        { id: '1-2', title: 'node 1-2' },
      ],
    },
    {
      id: '2',
      title: 'node 2',
    },
    { id: '3', title: 'node 3', children: [{ id: '3-1', title: 'node 3-1' }] },
    { id: '4', title: 'node 4' },
  ];

  const handleFilter: SelectProps['onFilter'] = (text) => (d) => {
    return d.title.indexOf(text) >= 0;
  };

  const renderItem: SelectProps['renderItem'] = (d) => d.title;

  const prediction: SelectProps['prediction'] = (v, d) => v === d.id;

  return (
    <div>
      <Select
        width={260}
        childrenKey='children'
        treeData={treeData}
        keygen='id'
        format='id'
        onFilter={handleFilter}
        placeholder='Select Color'
        prediction={prediction}
        renderItem={renderItem}
        clearable
      />
    </div>
  );
};

```
### 绝对定位
如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染。（非必要情况下不建议）
```tsx
/**
 * cn - 绝对定位
 *    -- 如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染。（非必要情况下不建议）
 * en - Absolute
 *    -- If the parent container of the option popup layer is blocked, you can set the absolute property to render the popup option in a separate layer. (Not recommended unless necessary)
 */
import React from 'react';
import { Select } from 'shineout';

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];
const styleAbsolute: React.CSSProperties = {
  padding: 10,
  height: 100,
  width: '100%',
  overflow: 'hidden',
};

export default () => {
  return (
    <div style={styleAbsolute}>
      <Select width={120} keygen data={data} placeholder='default' clearable />
      <Select
        style={{ marginLeft: 16 }}
        width={300}
        absolute
        multiple
        keygen
        data={data}
        placeholder='Select user'
        clearable
      />
    </div>
  );
};

```
### 多列选择
基础的使用方法
```tsx
/**
 * cn - 多列选择
 *    -- 基础的使用方法
 * en - Basic
 *    -- Basic usage
 */
import React, { useState, useEffect } from 'react';
import { Select, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

type SelectProps = TYPE.Select.Props<DataItem, string>;

interface DataItem {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

export default () => {
  const [data, setData] = useState<DataItem[]>([]);

  const renderItem: SelectProps['renderItem'] = (d) => `${d.firstName}-${d.lastName}`;

  useEffect(() => {
    user.fetch.get('user', { username: '', sorter: {} }).then((res: { data: DataItem[] }) => {
      setData(res.data);
    });
  }, []);

  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <Select
        width={300}
        data={data}
        keygen='id'
        columns={4}
        placeholder='Select Color'
        renderItem={renderItem}
        clearable
      />
      <Select
        multiple
        compressed
        compressedBound={2}
        width={300}
        data={data}
        keygen='id'
        columns={4}
        placeholder='Select Color'
        renderItem={renderItem}
        clearable
      />
    </div>
  );
};

```
### 内嵌标题
通过配置<span>innerTitle</span>可以渲染内嵌标题
```tsx
/**
 * cn - 内嵌标题
 *    -- 通过配置`innerTitle`可以渲染内嵌标题
 * en - Inner title
 *    -- Set `innerTitle` to render inner title
 */
import React from 'react';
import { Select } from 'shineout';

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  return (
    <div>
      <Select innerTitle='Select Color' width={300} data={data} keygen clearable />
    </div>
  );
};

```
### 加载中
设置<span>loading</span>为true时会展示一个默认的Spin组件，可以传入一个自定义的Spin代替
```tsx
/**
 * cn - 加载中
 *    -- 设置`loading`为true时会展示一个默认的Spin组件，可以传入一个自定义的Spin代替
 * en - Loading
 *    -- Set `loading` to true will show a default Spin component, you can pass a custom Spin to replace it
 */
import React from 'react';
import { Select } from 'shineout';

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  return (
    <div>
      <Select loading width={300} data={data} keygen placeholder='Select Color' clearable />
    </div>
  );
};

```
### 自定义列表布局
通过设置<span>header</span>属性可以自定义列表头部区域内容
通过设置<span>footer</span>属性可以自定义列表底部区域内容
<span>renderOptionList</span>可以自定义列表内容，并将列表实例抛出
```tsx
/**
 * cn - 自定义列表布局
 *    -- 通过设置`header`属性可以自定义列表头部区域内容
 *    -- 通过设置`footer`属性可以自定义列表底部区域内容
 *    -- `renderOptionList`可以自定义列表内容，并将列表实例抛出
 * en - Header
 *    -- Set `header` to customize the content of the header area
 */
import React, { useState } from 'react';
import { Select } from 'shineout';

const defaultData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];

export default () => {
  const [data, setData] = useState(defaultData);

  const handleAppend = () => {
    setData(['new color', ...data]);
  };

  const addMore = (
    <div
      style={{
        height: 32,
        backgroundColor: '#197AFA',
        color: '#ffffff',
        padding: '5px 12px',
        boxSizing: 'border-box',
      }}
      onClick={handleAppend}
    >
      + add
    </div>
  );

  return (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <Select
        header={addMore}
        width={300}
        data={data}
        keygen
        placeholder='Select Color'
        clearable
      />
      <Select
        footer={addMore}
        width={300}
        data={data}
        keygen
        placeholder='Select Color'
        clearable
      />
      <Select
        keygen
        width={300}
        clearable
        data={data}
        placeholder='Select Color'
        renderOptionList={(s) => (
          <div>
            {addMore}
            <div>{s}</div>
            {addMore}
          </div>
        )}
      />
    </div>
  );
};

```
### 加载中
设置<span>loading</span>为true时会展示一个默认的Spin组件，可以传入一个自定义的Spin代替
```tsx
/**
 * cn - 加载中
 *    -- 设置`loading`为true时会展示一个默认的Spin组件，可以传入一个自定义的Spin代替
 * en - Loading
 *    -- Set `loading` to true will show a default Spin component, you can pass a custom Spin to replace it
 */
import React from 'react';
import { Select } from 'shineout';

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  return (
    <div>
      <Select loading width={300} data={data} keygen placeholder='Select Color' clearable />
    </div>
  );
};

```
### 自定义选中结果
通过<span>renderResult</span>可以自定义选中结果的渲染
```tsx
/**
 * cn - 自定义选中结果
 *    -- 通过`renderResult`可以自定义选中结果的渲染
 * en - renderResult
 *    -- Set `renderResult` to custom render the result
 */
import React from 'react';
import { Select } from 'shineout';

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  const renderResult = (d: string) => {
    return `i love ${d}`;
  };
  return (
    <div>
      <Select
        width={300}
        renderResult={renderResult}
        data={data}
        keygen
        placeholder='Select Color'
        clearable
      />
    </div>
  );
};

```
### 渲染未匹配值
通过<span>renderUnmatched</span>属性可以渲染未匹配的值
```tsx
/**
 * cn - 渲染未匹配值
 *    -- 通过`renderUnmatched`属性可以渲染未匹配的值
 * en - renderUnmatched
 *    -- The unmatched value can be rendered through the `renderUnmatched` property
 */
import React from 'react';
import { Select, TYPE } from 'shineout';

type SelectProps = TYPE.Select.Props<string, string>;

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];

  const renderUnmatched: SelectProps['renderUnmatched'] = (v) => {
    return `I am ${v} color`;
  };

  return (
    <div>
      <Select
        width={300}
        defaultValue='redddd'
        renderUnmatched={renderUnmatched}
        data={data}
        keygen
        placeholder='Select Color'
        clearable
      />
    </div>
  );
};

```
### tip
test tip
```tsx
/**
 * cn - tip
 *    -- test tip
 * en - tip
 *    -- test tip
 */
import React from 'react';
import { Select } from 'shineout';
import { primitiveData } from './static/mock';

export default () => {
  return (
    <div>
      <Select tip='i am a tip' width={300} data={primitiveData} keygen placeholder='Select Color' />
      <Select status='error' width={300} data={primitiveData} keygen placeholder='Select Color' />
      <Select
        error={'error'}
        popover
        width={300}
        data={primitiveData}
        keygen
        placeholder='Select Color'
      />
    </div>
  );
};

```
### empty
test empty
```tsx
/**
 * cn - empty
 *    -- test empty
 * en - empty
 *    -- test empty
 */
import React from 'react';
import { Select } from 'shineout';

export default () => {
  return (
    <div>
      <Select
        width={300}
        data={[]}
        keygen
        placeholder='Select Color'
      />
    </div>
  );
};

```
### 限制过滤字符长度
设置<span>maxLength</span>属性可以限制输入过滤字符的长度
```tsx
/**
 * cn - 限制过滤字符长度
 *    -- 设置`maxLength`属性可以限制输入过滤字符的长度
 * en - maxLength
 *    -- Set `maxLength` property can limit the length of the input filter characters
 */
import React from 'react';
import { Select, TYPE } from 'shineout';

type SelectProps = TYPE.Select.Props<string, string>;

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  const handleFilter: SelectProps['onFilter'] = (v) => (d) => d.indexOf(v) >= 0;

  return (
    <div>
      <Select
        maxLength={2}
        width={300}
        data={data}
        keygen
        placeholder='Select Color'
        onFilter={handleFilter}
        clearable
      />
    </div>
  );
};

```
## Guide
### 何时使用
需要在有限的空间展示大量选项，并从中选取单个或多个选项时
### 常见用法
常见在搜索、表单中使用
### 与页面布局相关
选择器下拉面板出现时，应确保其布局在页面可视区内
### 多列选项
选项很多的时候，建议使用多列选项，因为它在可视区域内能显示更多的选项
### 最大宽高
最大高度 7 行，内容高度超出时，垂直滚动显示。选项过多时，不建议横向出现滚动条，建议减少列数
### 推荐/慎用示例
1、下拉选项很多的时候，建议优先模糊搜索
2、多选的情况下，下拉选项很多的时候，建议使用分列选项样式
3、已选选项很多的时候，建议合并选项或增大选择器的宽度，不建议折行
4、为了方便阅读，建议每列等宽，且不建议截断选项内容以及换行，可减少列数或增大容器宽度使内容完整显示


# Slider
滑动型输入器，帮助用户在连续或间断的区间内，通过滑动来选择一个数值或范围数值的控件
## API
### Slider
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|valueTipType|\"always\" / \"hover\" |\"always\"|展示当前值的方式,默认为常驻展示|
|autoHide|boolean |false|是否自动隐藏当前值和刻度|
|formatScale|false / ((value: number, index?: number ) => string / number) |v => v|格式化显示刻度，为 false 时，不显示刻度|
|formatValue|false / ((value: number) => string) |v => v|格式化显示当前值，为 false 时，不显示当前值|
|height|number |200|高度，仅在 vertical 为 true 情况下有效|
|onChange|((value: Value) => void) ||值改变时回调函数|
|scale|number[] |[0, 100]|取值范围，长度 >= 2 的数组|
|step|number |1|步长，必须大于等于0；为0时，只能选取 scale 指定的值|
|value|number / number[]||当前值|
|defaultValue|Value ||默认值|
|vertical|boolean |false|是否垂直|
|range|boolean |false|是否显示双滑块|
|disabled|boolean |false|是否禁用组件|
|onIncrease|(() => void) ||拖动超过最大值事件|
|name|Name ||Form 内存取数据的 key|
|beforeChange|((value: T) => void / T ) ||值改变前的回调，当返回值不为空时将作为组件的新值|
|reserveAble|boolean ||设置为 true 组件卸载后表单不自动删除数据|
|rules|RuleItem[]||校验规则 详见 [Rule](/components/rule)|
|onError|((error?: Error ) => void) ||rules 校验回调|
|bind|string[] ||当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用|
## Example
### 基本用法
最基本的用法
```tsx
/**
 * cn - 基本用法
 *    -- 最基本的用法
 * en - Base
 *    -- The basic usage
 */
import React from 'react';
import { Slider } from 'shineout';

const App: React.FC = () => <Slider defaultValue={50} />;

export default App;

```
### 范围选择
设置 range 属性显示为双滑块，输入(返回)值为长度为 2 的数组
```tsx
/**
 * cn - 范围选择
 *    -- 设置 range 属性显示为双滑块，输入(返回)值为长度为 2 的数组
 * en - Range
 *    -- Set the range property to display double sliders, and value is an array of length 2
 */
import React from 'react';
import { Slider } from 'shineout';

const App: React.FC = () => <Slider range defaultValue={[25, 75]} />;

export default App;

```
### 区间
设置 scale 属性可以自定义区间
```tsx
/**
 * cn - 区间
 *    -- 设置 scale 属性可以自定义区间
 * en - Scale
 *    -- Set the scale property to customize the interval
 */
import React from 'react';
import { Slider } from 'shineout';

const App: React.FC = () => <Slider scale={[0, 10, 100, 250, 500, 1000]} />;

export default App;

```
### 带输入框
和数组输入框保持同步
```tsx
/**
 * cn - 带输入框
 *    -- 和数组输入框保持同步
 * en - Input
 *    -- change with number input
 */
import React, { useState } from 'react';
import { Slider, Input } from 'shineout';

const container: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const slider: React.CSSProperties = {
  flex: 1,
  marginInlineEnd: 28,
};

const App: React.FC = () => {
  const [value, setValue] = useState<number | undefined>(50);

  return (
    <div style={container}>
      <Slider value={value} onChange={(n) => setValue(n)} style={slider} />
      <Input.Number
        digits={0}
        width={100}
        max={100}
        value={value}
        onChange={(n) => {
          if (n === '') {
            setValue(undefined);
          } else {
            setValue(Number(n || 0));
          }
        }}
      />
    </div>
  );
};

export default App;

```
### 格式化
通过 formatScale 属性自定义刻度显示信息
通过 formatValue 属性自定义值显示信息
```tsx
/**
 * cn - 格式化
 *    -- 通过 formatScale 属性自定义刻度显示信息
 *    -- 通过 formatValue 属性自定义值显示信息
 * en - Format
 *    -- Set the formatScale property to customize the display scale
 *    -- Set the formatValue property to customize the display value
 */
import React from 'react';
import { Slider, TYPE } from 'shineout';

type SliderProps = TYPE.Slider.Props<number[]>;
type SliderFormatValue = SliderProps['formatValue'];

const pad = (i: number) => (i < 10 ? `0${i}` : i);

const format: SliderFormatValue = (v: number) => {
  const value = v + 540;
  const hours = Math.floor(value / 60);
  return `${pad(hours)}:${pad(value - hours * 60)}`;
};

const App: React.FC = () => (
  <Slider
    range
    formatScale={format}
    formatValue={format}
    defaultValue={[33, 216]}
    scale={[0, 60, 120, 180, 240, 300, 360, 420, 480, 540]}
  />
);

export default App;

```
### 步长
设置 step 属性，定义拖动的步长，默认为 1
```tsx
/**
 * cn - 步长
 *    -- 设置 step 属性，定义拖动的步长，默认为 1
 * en - Step
 *    -- Set the step property to define the step size of the drag and the default value is 1
 */
import React from 'react';
import { Slider } from 'shineout';

const App: React.FC = () => <Slider step={0.05} range defaultValue={[0.05, 0.25]} scale={[0, 1]} />;

export default App;

```
### 
step 设定为 0 时，只能取 scale 内定义的值
```tsx
/**
 * cn -
 *    -- step 设定为 0 时，只能取 scale 内定义的值
 * en -
 *    -- When the step is set to 0, only the value defined in scale can be taken
 */
import React from 'react';
import { Slider } from 'shineout';

const App: React.FC = () => (
  <Slider
    step={0}
    scale={[0.8, 1, 1.2, 1.4, 1.7, 2, 2.4, 2.8, 3.3, 4, 4.8, 5.6, 6.7, 8, 9.5, 11, 13, 16]}
  />
);

export default App;

```
### 隐藏信息
autoHide 选项为 true 时，自动隐藏当前值和刻度
```tsx
/**
 * cn - 隐藏信息
 *    -- autoHide 选项为 true 时，自动隐藏当前值和刻度
 * en - Hide value
 *    -- When then autoHide property is true, automatically hide current values and scales
 */
import React from 'react';
import { Slider } from 'shineout';

const App: React.FC = () => (
  <Slider autoHide defaultValue={4} scale={[1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]} step={1} />
);

export default App;

```
### 
如果要彻底不显示刻度和当前值，设置 formatValue 和 fotmatScale 为 false
```tsx
/**
 * cn -
 *    -- 如果要彻底不显示刻度和当前值，设置 formatValue 和 fotmatScale 为 false
 * en -
 *    -- Set formatValue and fotmatScale to false to hide the scale and current values completely
 */
import React from 'react';
import { Slider } from 'shineout';

const App: React.FC = () => (
  <Slider defaultValue={4} step={1} formatValue={false} formatScale={false} />
);

export default App;

```
### 禁用
设置 disabled 属性，禁用组件
```tsx
/**
 * cn - 禁用
 *    -- 设置 disabled 属性，禁用组件
 * en - Disabled
 *    -- Set the disabled property to disable the component
 */
import React from 'react';
import { Slider } from 'shineout';

const App: React.FC = () => <Slider range disabled defaultValue={[25, 75]} />;

export default App;

```
### 垂直
设置 vertical 属性，修改组件为垂直方向
```tsx
/**
 * cn - 垂直
 *    -- 设置 vertical 属性，修改组件为垂直方向
 * en - Vertical
 *    -- Set the vertical property to change the component vertical
 */
import React from 'react';
import { Slider, TYPE } from 'shineout';

type SliderProps = TYPE.Slider.Props<number | number[]>;
type SliderFormatScale = SliderProps['formatScale'];

const App: React.FC = () => {
  const formatTemp: SliderFormatScale = (v: number) => `${v}℃`;

  return (
    <div>
      <Slider vertical defaultValue={50} />
      <Slider range vertical defaultValue={[12, 70]} />
      <Slider
        vertical
        defaultValue={18}
        scale={[0, 20, 40, 60, 100]}
        formatValue={false}
        formatScale={formatTemp}
      />
      <Slider autoHide range vertical defaultValue={[12, 70]} />
      <Slider disabled range vertical defaultValue={[12, 70]} />
    </div>
  );
};

export default App;

```
### 增长
允许拖动到最右边的时候进行增长
```tsx
/**
 * cn - 增长
 *    -- 允许拖动到最右边的时候进行增长
 * en - onIncrease
 *    -- can increase the maximum infinitely while dragging
 */
import React, { useState } from 'react';
import { Slider, TYPE } from 'shineout';

type SliderProps = TYPE.Slider.Props<number | number[]>;
type SliderScale = SliderProps['scale'];
type SliderOnIncrease = SliderProps['onIncrease'];

const App: React.FC = () => {
  const [scale1, setScale1] = useState<SliderScale>([0, 100]);
  const [scale2, setScale2] = useState<SliderScale>([0, 100]);

  const onIncrease1: SliderOnIncrease = () => setScale1([0, scale1![1] + 1]);
  const onIncrease2: SliderOnIncrease = () => setScale2([0, scale2![1] + 5]);

  return (
    <div>
      <Slider
        scale={scale1}
        defaultValue={50}
        onIncrease={onIncrease1}
        style={{ marginBottom: '24px' }}
      />
      <Slider range scale={scale2} defaultValue={[20, 50]} onIncrease={onIncrease2} />
    </div>
  );
};

export default App;

```
### 悬浮提示
设置 tipType 为 hover，鼠标悬浮时显示当前值
```tsx
/**
 * cn - 悬浮提示
 *    -- 设置 tipType 为 hover，鼠标悬浮时显示当前值
 * en - HoverTip
 *    -- Set tipType to hover, the current value is displayed when the mouse is hovered
 */
import React from 'react';
import { Slider } from 'shineout';

const App: React.FC = () => <Slider defaultValue={50} valueTipType='hover' />;

export default App;

```
## Guide
### 何时使用
在数值输入过程中，需要提供实时的可视化数据比例反馈时
### 与页面布局相关
在表单中使用，通常布局在表单内部，关联其他表单项进行数据输入
在整个页面中使用，通常布局在页面内容区下方，通过调整滑块控制内容区域
### 组件搭配使用
与数值输入框搭配使用时，能帮用户对数值进行精确输入、快速的调整
### 推荐/慎用示例
滑块宽度过小时，建议增加输入框
可选的数值范围较大时，建议增加输入框，避免刻度密集造成视觉辨识和操作困难


# Spin
用于页面和区块的加载中状态 至 页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑
## API
### Spin
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|children|ReactNode||作为包裹元素使用|
|tip|ReactNode||提示文案|
|size|string / number |40|尺寸|
|name|/ \"default\"  / \"chasing-dots\"  / \"cube-grid\"  / \"double-bounce\"  / \"fading-circle\"  / \"four-dots\"  / \"plane\"  / \"pulse\"  / \"ring\"  / \"scale-circle\"  / \"three-bounce\"  / \"wave\"  / \"chasing-ring\" ||类型|
|color|string ||颜色|
|mode|\"vertical\" / \"horizontal\" |\"vertical\"|布局模式|
|loading|boolean |false|是否为加载中|
## Example
### 基本用法
基础 Spin 用法
```tsx
/**
 * cn - 基本用法
 *    -- 基础 Spin 用法
 * en - Basic
 *    -- Basic Spin usage
 */
import React from 'react';
import { Spin } from 'shineout';

export default () => {
  return (
    <div style={{ width: 20 }}>
      <Spin name='chasing-dots' />
    </div>
  );
};

```
### 
通过配置 <span>name</span> ，可以设置不同的动画效果, 通过配置 <span>size</span> 可以设置动画大小
```tsx
/**
 * cn -
 *    -- 通过配置 `name` ，可以设置不同的动画效果, 通过配置 `size` 可以设置动画大小
 * en -
 *    -- Set different animation effects by configuring `name`, and set animation size by configuring `size`
 */
import React from 'react';
import { Spin } from 'shineout';

export default () => {
  const names1 = [
    // 'default',
    'chasing-dots',
    'cube-grid',
    'double-bounce',
    'fading-circle',
    'four-dots',
    'plane',
  ];

  const names2 = ['pulse', 'ring', 'scale-circle', 'three-bounce', 'wave', 'chasing-ring'];

  const renderTip = (name: string) => {
    return (
      <span style={{ fontSize: 12, lineHeight: '20px', display: 'inline-block' }}>
        {name}
      </span>
    );
  };
  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: 65, marginBottom: 32 }}>
        {names1.map((name, index) => (
          <div key={index} style={{ width: '16%' }}>
            <Spin name={name as any} size={16} tip={renderTip(name)} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: 65 }}>
        {names2.map((name, index) => (
          <div key={index} style={{ width: '16%' }}>
            <Spin key={index} name={name as any} size={16} tip={renderTip(name)} />
          </div>
        ))}
      </div>
    </div>
  );
};

```
### 布局模式
在设置 <span>tip</span> 文案后，可以通过配置 <span>mode</span> 实现不同的布局模式：horizontal 水平布局、vertical 垂直布局
```tsx
/**
 * cn - 布局模式
 *    -- 在设置 `tip` 文案后，可以通过配置 `mode` 实现不同的布局模式：horizontal 水平布局、vertical 垂直布局
 * en - Basic
 *    -- After setting the `tip` text, you can use the `mode` property to set the layout mode: horizontal or vertical
 */
import React from 'react';
import { Spin } from 'shineout';

export default () => {
  const renderTip = () => {
    return <span style={{ fontSize: 12 }}>Loading...</span>;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <div style={{ width: 100 }}>
        <Spin name='ring' size={16} mode='vertical' tip={renderTip()} />
      </div>
      <div style={{ width: 100 }}>
        <Spin name='ring' size={16} mode='horizontal' tip={renderTip()} />
      </div>
    </div>
  );
};

```
### 对容器使用
Spin 可以当作容器使用，只需将它包裹在外层即可
```tsx
/**
 * cn - 对容器使用
 *    -- Spin 可以当作容器使用，只需将它包裹在外层即可
 * en - Wrapper
 *    -- Spin can be used as a container, just wrap it in the outer layer
 */
import React, { useEffect } from 'react';
import { Spin } from 'shineout';

export default () => {
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);
  return (
    <Spin
      size={20}
      tip={<span style={{ fontSize: 14 }}>loading...</span>}
      name='ring'
      mode='vertical'
      loading={loading}
    >
      <div
        style={{
          width: '100%',
          fontWeight: 300,
          border: '1px solid #E8EBF0',
          padding: 16,
          boxSizing: 'border-box',
        }}
      >
        <p
          style={{
            width: '20%',
            height: 18,
            background: '#E8EBF0',
            borderRadius: 2,
            marginBottom: 16,
          }}
        ></p>
        <p
          style={{
            width: '100%',
            height: 18,
            borderRadius: 2,
            background: '#E8EBF0',
            marginBottom: 16,
          }}
        ></p>
        <p style={{ width: '100%', height: 18, borderRadius: 2, background: '#E8EBF0' }}></p>
      </div>
    </Spin>
  );
};

```
### 自定义文案
通过配置 <span>tip</span> 属性来自定义文案
```tsx
/**
 * cn - 自定义文案
 *    -- 通过配置 `tip` 属性来自定义文案
 * en - Tip
 *    -- Set the `tip` property to customize the text
 */
import React from 'react';
import { Spin } from 'shineout';

export default () => {
  const renderTip = () => {
    return <div style={{ fontSize: 14 }}>This may take a while...</div>;
  };
  return (
    <div style={{ width: 200 }}>
      <Spin name='ring' size={24} tip={renderTip()} />
    </div>
  );
};

```
## Guide
### 何时使用
当页面局部或全部处于数据处理的等待中，需要让用户清晰感知到当前状态时
### 基础用法
页面加载时，位于加载内容区域的正中间
### 推荐使用示例
小尺寸适用于组件内加载场景，中尺寸适用于容器如卡片、表格等区域的加载场景，大尺寸适用于页面全屏加载场景


# Steps
提示用户进度以及当前的步骤，用于引导用户按照步骤完成任务的导航条
## API
### Step
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|current|number ||当前步数|
|labelPlacement|\"horizontal\" / \"vertical\" |\"vertical\"|标签描述文字放置的位置|
|direction|\"horizontal\" / \"vertical\" |\"horizontal\"|步骤条方向|
|size|\"small\" / \"large\" / \"default\"|\"default\"|不同尺寸|
|type|\"default\" / \"dot\" / \"arrow\" |\"default\"|节点样式类型|
|onChange|((index: number) => void) ||步骤切换的回调,配置该属性可让步骤条可点击|
|className|string ||节点类名|
|style|CSSProperties ||自定义样式|
|currentStatus|\"wait\" / \"process\" / \"finish\" / \"error\" ||当前步数节点状态|
|index|number ||当前节点索引|
|id|any||当前节点id,可用于点击回调|
|status|\"wait\" / \"process\" / \"finish\" / \"error\" ||节点状态|
|renderIcon|((index: number, status?: \"wait\" / \"process\" / \"finish\" / \"error\" ) => ReactNode) ||自定义节点图标|
|title|ReactNode / ((index: number, status: \"wait\" / \"process\" / \"finish\" / \"error\") => ReactNode)||节点标题|
|disabled|boolean / ((index: number) => boolean) ||当前步骤节点是否被禁用|
|description|ReactNode||节点描述|
|onClick|((e: MouseEvent<HTMLElement, MouseEvent>, index: number, id: any) => void) ||点击回调|
### Steps
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|size|\"small\" / \"large\" / \"default\"|\"default\"|不同尺寸|
|children|ReactNode||子元素|
|direction|\"horizontal\" / \"vertical\" |\"horizontal\"|步骤条方向|
|type|\"default\" / \"dot\" / \"arrow\" |\"default\"|节点样式类型|
|labelPlacement|\"horizontal\" / \"vertical\" |\"vertical\"|标签描述文字放置的位置|
|status|\"wait\" / \"process\" / \"finish\" / \"error\" ||当前步数节点状态|
|current|number |0|当前步数|
|renderIcon|((index: number, status?: \"wait\" / \"process\" / \"finish\" / \"error\" ) => ReactNode) ||自定义节点图标|
|onChange|((index: number) => void) ||步骤切换的回调,配置该属性可让步骤条可点击|
## Example
### 基本用法
步骤条基础用法
```tsx
/**
 * cn - 基本用法
 *    -- 步骤条基础用法
 * en - Basic
 *    -- Basic steps
 */
import React from 'react';
import { Steps } from 'shineout';

export default () => {
  return (
    <div style={{ width: 500 }}>
      <Steps current={1}>
        <Steps.Step title='Succeeded' />
        <Steps.Step title='Processing' />
        <Steps.Step title='Pending' />
      </Steps>
    </div>
  );
};

```
### 尺寸
步骤条支持三种尺寸small、default、large
```tsx
/**
 * cn - 尺寸
 *    -- 步骤条支持三种尺寸small、default、large
 * en - Size
 *    -- Steps support three sizes: small, default, large
 */
import React from 'react';
import { Steps } from 'shineout';

export default () => {
  return (
    <div style={{ width: 500 }}>
      <Steps size='small' current={1} style={{ marginBottom: 32 }}>
        <Steps.Step title='Succeeded' />
        <Steps.Step title='Processing' />
        <Steps.Step title='Pending' />
      </Steps>
      <Steps current={1} style={{ marginBottom: 32 }}>
        <Steps.Step title='Succeeded' />
        <Steps.Step title='Processing' />
        <Steps.Step title='Pending' />
      </Steps>
      <Steps size='large' current={1}>
        <Steps.Step title='Succeeded' />
        <Steps.Step title='Processing' />
        <Steps.Step title='Pending' />
      </Steps>
    </div>
  );
};

```
### 描述信息
通过配置<span>description</span>属性可以设置步骤条的描述信息
```tsx
/**
 * cn - 描述信息
 *    -- 通过配置`description`属性可以设置步骤条的描述信息
 * en - Description
 *    -- Set description by `description` property
 */
import React from 'react';
import { Steps } from 'shineout';

export default () => {
  return (
    <div style={{ width: 500 }}>
      <Steps current={1}>
        <Steps.Step title='Succeeded' description='This is a description' />
        <Steps.Step title='Processing' description='This is a description' />
        <Steps.Step title='Pending' description='This is a description' />
      </Steps>
    </div>
  );
};

```
### 节点状态
通过指定<span>status</span>属性可以设置步骤条节点的状态
注意，step 的 status 优先级高于 steps 的 status
```tsx
/**
 * cn - 节点状态
 *    -- 通过指定`status`属性可以设置步骤条节点的状态
 *    -- 注意，step 的 status 优先级高于 steps 的 status
 * en - Status
 *    -- Set step status by `status` property
 *    -- Note that the status of the step has a higher priority than the status of the steps
 */
import React from 'react';
import { Steps } from 'shineout';

export default () => {
  return (
    <div style={{ width: 500 }}>
      <Steps current={1}>
        <Steps.Step title='Succeeded' />
        <Steps.Step title='Error' status='error' />
        <Steps.Step title='Pending' />
      </Steps>
    </div>
  );
};

```
### 自定义图标
通过<span>renderIcon</span>属性可以自定义渲染步骤条节点的图标
```tsx
/**
 * cn - 自定义图标
 *    -- 通过`renderIcon`属性可以自定义渲染步骤条节点的图标
 * en - Custom icon
 *    -- Set custom icon by `renderIcon` property
 */
import React from 'react';
import { Steps } from 'shineout';
import { successIcon, warningIcon, iconWait } from './static/icon';

export default () => {
  const renderIcon = (index: number, status: any) => {
    if (status === 'wait') {
      return iconWait;
    }
    if (status === 'finish') {
      return successIcon;
    }
    if (status === 'process') {
      return warningIcon;
    }
    return index + 1;
  };
  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <Steps current={1} renderIcon={renderIcon}>
        <Steps.Step title='Step1' />
        <Steps.Step title='Step2' />
        <Steps.Step title='Step3' />
        <Steps.Step title='Step4' />
      </Steps>
    </div>
  );
};

```
### 不同风格的步骤条
通过<span>type</span>属性可以设置不同风格的步骤条
```tsx
/**
 * cn - 不同风格的步骤条
 *    -- 通过`type`属性可以设置不同风格的步骤条
 * en - Type
 *    -- Set different style of steps by `type` property
 */
import React from 'react';
import { Steps } from 'shineout';

export default () => {
  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <div style={{ width: 500 }}>
        <Steps current={1} type='dot' style={{ marginBottom: 32 }}>
          <Steps.Step title='Succeeded' />
          <Steps.Step title='Complete information' />
          <Steps.Step title='Pending' />
        </Steps>
        <Steps current={1} type='dot' style={{ marginBottom: 32 }}>
          <Steps.Step title='Succeeded' description='This is a description' />
          <Steps.Step
            title='Complete information'
            description='Please fill in your home address and phone number'
          />
          <Steps.Step title='Pending' description='This is a description' />
        </Steps>
      </div>
      <div style={{ minWidth: 700 }}>
        <Steps current={1} type='arrow' style={{ marginBottom: 32 }}>
          <Steps.Step title='Succeeded' />
          <Steps.Step title='Complete information' />
          <Steps.Step title='Pending' />
        </Steps>
        <Steps current={1} type='arrow'>
          <Steps.Step title='Succeeded' description='This is a description' />
          <Steps.Step
            title='Complete information'
            description='Please fill in your home address and phone number'
          />
          <Steps.Step title='Pending' description='This is a description' />
        </Steps>
      </div>
    </div>
  );
};

```
### 垂直布局
通过<span>direction</span>属性可以设置步骤条的布局方向
```tsx
/**
 * cn - 垂直布局
 *    -- 通过`direction`属性可以设置步骤条的布局方向
 * en - Direction
 *    -- Set direction by `direction` property
 */
import React from 'react';
import { Steps } from 'shineout';

export default () => {
  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <div
        style={{ width: 500, display: 'flex', gap: 32, marginBottom: 24, alignItems: 'flex-start' }}
      >
        <Steps current={1} direction='vertical'>
          <Steps.Step title='Succeeded' />
          <Steps.Step title='Processing' />
          <Steps.Step title='Pending' />
        </Steps>
        <Steps current={1} direction='vertical'>
          <Steps.Step title='Succeeded' description='This is a description' />
          <Steps.Step title='Processing' description='This is a description' />
          <Steps.Step title='Pending' description='This is a description' />
        </Steps>
      </div>

      <div style={{ width: 500, display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <Steps current={1} type='dot' direction='vertical'>
          <Steps.Step title='Succeeded' />
          <Steps.Step title='Processing' />
          <Steps.Step title='Pending' />
        </Steps>

        <Steps current={1} type='dot' direction='vertical'>
          <Steps.Step title='Succeeded' description='This is a description' />
          <Steps.Step title='Processing' description='This is a description' />
          <Steps.Step title='Pending' description='This is a description' />
        </Steps>
      </div>
    </div>
  );
};

```
### 标签位置
默认样式的步骤条支持通过设置<span>labelPlacement</span>属性可以设置标签的位置
```tsx
/**
 * cn - 标签位置
 *    -- 默认样式的步骤条支持通过设置`labelPlacement`属性可以设置标签的位置
 * en - Label placement
 *    -- Set the position of the label by `labelPlacement` property
 */
import React from 'react';
import { Steps } from 'shineout';

export default () => {
  return (
    <div style={{ width: 500 }}>
      <Steps current={1} labelPlacement='horizontal'>
        <Steps.Step title='Succeeded' description='This is a description' />
        <Steps.Step title='Processing' description='This is a description' />
        <Steps.Step title='Pending' description='This is a description' />
      </Steps>
    </div>
  );
};

```
### 可点击
配置<span>onChange</span>属性可以让步骤条可点击，点击后会触发回调函数，参数为当前步骤的索引和状态
步骤条状态：wait、process、finish、error
```tsx
/**
 * cn - 可点击
 *    -- 配置`onChange`属性可以让步骤条可点击，点击后会触发回调函数，参数为当前步骤的索引和状态
 *    -- 步骤条状态：wait、process、finish、error
 * en - onChange
 *    -- Set `onChange` property to make steps clickable, and the callback function will be called when the step is clicked, the parameters are the index and status of the current step
 */
import React, { useState } from 'react';
import { Steps } from 'shineout';

export default () => {
  const [current, setCurrent] = useState(1);

  const renderTitle = (index: number, status: 'wait' | 'process' | 'finish' | 'error') => {
    if (status === 'finish') return 'Succeeded';
    if (status === 'process') return 'Processing';
    if (status === 'wait') return 'Pending';
    return 'Eerror';
  };

  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <Steps current={current} onChange={setCurrent}>
        <Steps.Step title={renderTitle} />
        <Steps.Step title={renderTitle} />
        <Steps.Step title={renderTitle} />
        <Steps.Step title={renderTitle} />
        <Steps.Step title={renderTitle} />
      </Steps>
    </div>
  );
};

```
## Guide
### 何时使用
数据内容需要分步骤显示，通过步骤让用户对整个流程有所预期时；\n 任务无法一次完成，需要呈现任务进度以及当前步骤时
### 常见用法
1、水平步骤条应从左到右依次展示步骤流程，常见的完整流程包含 3 种步骤：已完成、进行中、未完成
2、在当前流程出现失败或告警状态时，对应步骤条图标可变为红色，起到突出提示的作用
3、垂直步骤条可按需选择顺序（从上往下）或者倒序（从下往上）展示步骤流程
### 节点可自定义
适用于节点需要自定义图标、纯数字的场景
### 推荐/慎用示例
1、当页面、模块宽度有限或步骤数较多时，不建议使用横向滚动条，可精简步骤数或考虑选用默认垂直步骤条、点状垂直步骤条


# Sticky
Sticky 在屏幕滚动时，保持元素在屏幕可见区域
## API
### Sticky
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||扩展样式。触发浮动后的默认 zIndex 为900，修改 style的 zIndex 来改变。|
|bottom|number ||距离底部多少偏移量触发|
|target|string / HTMLElement / null ||自定义附着的目标。可以传入 HTMLElement 或者 css selector，target 必须为 Sticky 组件的祖先节点|
|parent|HTMLElement / null ||sticky 父级元素, 当父元素离开视窗时，sticky 将失效|
|top|number ||距离顶部多少偏移量触发|
|css|boolean |false|是否采用 css 方式实现附着效果|
|onChange|((isSticky: boolean) => void) ||吸附效果时，触发该回调，当使用原生 sticky 时该方法无效|
|children|ReactNode||子元素|
## Example
### 基本用法
附着在顶部 20px
```tsx
/**
 * cn - 基本用法
 *    -- 附着在顶部 20px
 * en - Basic
 *    -- Sticky 20px to top
 */
import React, { useRef } from 'react';
import { Alert, Sticky } from 'shineout';

const App: React.FC = () => {
  const elRef = useRef(null);
  return (
    <div
      ref={elRef}
      style={{
        height: 300,
        backgroundColor: '#f4f5f8',
        backgroundImage:
          'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), ' +
          'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px',
      }}
    >
      <Sticky top={200} parent={elRef.current}>
        <Alert>Sticky 200px to top</Alert>
      </Sticky>
    </div>
  );
};

export default App;

```
### 容器内固定
附着在元素内
```tsx
/**
 * cn - 容器内固定
 *    -- 附着在元素内
 * en - Element
 *    -- Sticky to element
 */
import React, { useRef } from 'react';
import { Alert, Sticky } from 'shineout';

const App: React.FC = () => {
  const Element = useRef(null);

  return (
    <div style={{ position: 'relative', zIndex: 0 }}>
      <div id='sticky_element' ref={Element} style={{ height: 400, overflow: 'auto' }}>
        <div
          style={{
            height: 1600,
            backgroundColor: '#f4f5f8',
            backgroundImage:
              'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), ' +
              'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px',
          }}
        >
          <div style={{ height: 600 }}></div>
          <Sticky top={0} bottom={0} target='#sticky_element'>
            <Alert style={{ marginBottom: 0 }} type='info'>
              Sticky to element
            </Alert>
          </Sticky>
        </div>
      </div>
    </div>
  );
};

export default App;

```
### 底部固定
附着在底部
```tsx
/**
 * cn - 底部固定
 *    -- 附着在底部
 * en - Bottom
 *    -- Sticky to bottom
 */
import React, { useRef } from 'react';
import { Alert, Sticky } from 'shineout';

const App: React.FC = () => {
  const elRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      ref={elRef}
      style={{
        backgroundColor: '#f4f5f8',
        backgroundImage:
          'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), ' +
          'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px',
      }}
    >
      <div style={{ height: 300 }}></div>
      <Sticky bottom={0} parent={elRef.current}>
        <Alert style={{ marginBottom: 0 }}>Sticky at bottom.</Alert>
      </Sticky>
    </div>
  );
};

export default App;

```
## Guide



# Switch
用于两个互斥选项，用来打开或关闭选项的选择控件。
## API
### Switch
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|checked|boolean ||当前选中状态，checked 传入时为受控组件|
|onChange|((value: boolean) => void) ||改变回调,Checked 表示选中状态|
|onClick|((e: MouseEvent<HTMLInputElement, MouseEvent>) => void) ||勾选框点击回调|
|disabled|boolean |false|是否禁用|
|inputRef|Ref<HTMLInputElement> ||获取input dom|
|style|CSSProperties ||自定义样式|
|className|string ||自定义类名|
|size|\"small\" / \"large\" / \"default\"|\"default\"|不同尺寸|
|content|[ReactNode, ReactNode] ||选中和未选中时的内容|
|loading|boolean |false|加载中|
|value|boolean ||Checked 未设置的情况下， checked = value|
|defaultValue|boolean ||默认值 和 value 类型相同|
|name|Name ||Form 内存取数据的 key|
|beforeChange|((value: T) => void / T ) ||值改变前的回调，当返回值不为空时将作为组件的新值|
|reserveAble|boolean ||设置为 true 组件卸载后表单不自动删除数据|
|rules|RuleItem[]||校验规则 详见 [Rule](/components/rule)|
|onError|((error?: Error ) => void) ||rules 校验回调|
|bind|string[] ||当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用|
## Example
### 基本用法
最基础的用法
```tsx
/**
 * cn - 基本用法
 *    -- 最基础的用法
 * en - Base
 *    -- The basic usage
 */
import React from 'react';
import { Switch } from 'shineout';

const App: React.FC = () => {
  return <Switch />;
};

export default App;

```
### 禁用状态
设置 disabled 属性 可以设置禁用状态
```tsx
/**
 * cn - 禁用状态
 *    -- 设置 disabled 属性 可以设置禁用状态
 * en - Disabled
 *    -- Set disabled property to disable the Switch
 */
import React from 'react';
import { Switch } from 'shineout';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 24 }}>
      <Switch value={true} disabled />
      <Switch value={false} disabled />
    </div>
  );
};

export default App;

```
### 尺寸
设置 <span>size</span> 属性可以调整组件尺寸
```tsx
/**
 * cn - 尺寸
 *    -- 设置 `size` 属性可以调整组件尺寸
 * en - Base
 *    -- Set the size property to adjust the size of the component
 */
import React from 'react';
import { Switch } from 'shineout';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'center' }}>
      <Switch size={'small'} />
      <Switch />
      <Switch size={'large'} />
    </div>
  );
};

export default App;

```
### 加载中
设置 <span>loading</span> 属性可以让 Switch 处于加载状态
```tsx
/**
 * cn - 加载中
 *    -- 设置 `loading` 属性可以让 Switch 处于加载状态
 * en - Base
 *    -- Set `loading` property to make Switch loading
 */
import React from 'react';
import { Switch } from 'shineout';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'center' }}>
      <Switch loading value />
      <Switch loading />
    </div>
  );
};

export default App;

```
### 自定义文案
自定义开关打开（关闭）时需要显示的文字和图标
```tsx
/**
 * cn - 自定义文案
 *    -- 自定义开关打开（关闭）时需要显示的文字和图标
 * en - Custom content
 *    -- Customize the text and icon to display when the switch is on (off)
 */
import React from 'react';
import { Switch } from 'shineout';

const App: React.FC = () => (
  <div>
    <Switch defaultValue content={['ON', 'OFF']} />
  </div>
);

export default App;

```
## Guide
### 何时使用
需要表示开关状态或仅有两种状态之间的切换时\n 需要操作后立即生效时
### 组件搭配使用
与 modal 搭配使用，当开启或关闭开关会带来操作风险时，可利用对话框进行二次确认
### 推荐/慎用示例
开关文案要准确简洁，只需表达所控制的内容，避免加入逻辑词语或与开关作用相反的内容


# Table
展示行列数据，用于数据收集展示、分析整理、操作处理
## API
### Table
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|scrollLeft|number ||当开启虚拟列表时生效|
|rowHeight|number |40|单行表格的预期高度，只是一个大概的估值，用来展示滚动条|
|hover|boolean |true|数据行鼠标悬浮高亮效果|
|empty|ReactNode|getLocale(\"Data not found\")|空数据文案|
|cellSelectable|boolean |false|是否启用 ctrl/cmd + click 选中单元格|
|height|number ||表格高度，与 style.height 作用相同|
|onScroll|((x: number, y: number, left: number) => void) ||滚动条滚动后回调函数；\nx: 横向滚动比(0 <= x <= 1)\ny: 纵向滚动比(0 <= y <= 1)|
|pagination|PaginationProps ||展示分页 详见 [Pagination](/components/Pagination)|
|loading|ReactNode|false|数据加载中，为true时会展示一个默认的 [Spin](/components/Spin) 组件，可以传入一个自定义的Spin代替|
|virtual|boolean ||是否使用虚拟列表|
|rowsInView|number |20|单次 render的 最大行数。Table 采用了 lazy render 的方式来优化在大量数据下的性能，如果你的表格显示的高度超出了20条，可以调整 rowsInView 的值。为 0 表示单次 render 所有数据。|
|size|\"small\" / \"large\" / \"default\" |\"default\"|表格尺寸|
|radio|boolean |false|是否为单选|
|verticalAlign|\"top\" / \"middle\" |\"top\"|单元格内容垂直对齐方式|
|children|ReactNode||传入原生 tr td, 只使用样式|
|width|number ||表格总宽度，默认为容器宽度，不可小于 columns 中设置的 width 之和|
|columns|TableColumn[]|[]|数组，见 TableColumn|
|disabled|boolean / ((d: DataItem) => boolean) ||如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项|
|treeEmptyExpand|boolean |false|树形表格子数据为空时依然展示展开按钮|
|rowClickAttr|string / boolean / string[] |[\"*\"]|设置行内元素的 attribute 来按需触发 onRowClick, \"*\"表示接受行点击触发|
|onRowClick|((rowData: DataItem, index: number, fireAttr?: string / boolean ) => void) ||行点击事件; data: 当前行数据; index: 当前行索引|
|striped|boolean ||是否显示交错斑马底纹|
|rowClassName|(rowData: DataItem, index: number) => string / undefined||指定单行className|
|rowEvents|object||tr 事件监听器集合|
|data|object[]||数据|
|showSelectAll|boolean |true|是否显示全选|
|bordered|boolean |false|是否显示外边框|
|treeCheckAll|boolean |false|全选时是否将子孙数据选中|
|renderSorter|((params: {  status?: \"asc\" / \"desc\" / null , triggerAsc: () => void, triggerDesc: () => void }) => ReactNode) ||自定义排序图标|
|hideHeader|boolean |false|是否隐藏表头|
|summary|({  render: () => ReactNode, colSpan?: number , rowSpan?: number  })[] / ({  render: () => ReactNode, colSpan?: number , rowSpan?: number  })[][] ||底部信息可用于总结|
|sticky|boolean / { top: number; } ||表头是否附着顶部，为 true 时距离顶部为0，为对象时属性值参考 [Sticky](/components/Sticky) 组件|
|tableRef|((table: TableRef) => void) ||Table 实例（请谨慎使用：仅虚拟列表支持）|
|onRowSelect|((rows: Value) => void) ||选择行。rows为选中的数据。如果需要数据需要格式化的处理，建议配置 format 和 prediction|
|defaultTreeExpandKeys|(string / number)[] ||默认展开行(非受控)|
|onTreeExpand|((openKeys: (string / number)[], data: Item, expand: boolean, index: number) => void) ||当设置 treeExpandKeys 后，展开行时会触发该回调，keys 为展开的行|
|treeExpandKeys|(string / number)[] ||树形数据展开行，受控|
|sorter|((sortName: string, sorter: \"asc\" / \"desc\", sortedList: ({  order: \"asc\" / \"desc\", manual: boolean, key: string / number, weight?: number  })[]) => void / ((a: Item, b: Item) => number) ) |alphaSort(Column.sorter, sorter)|表格统一排序函数，参数分别为 Column.sorter 和 排序方式;\n支持多列排序，sorter传入对象{ rule: string | function, weight: number }, rule为排序规则，为字符串时参考单列排序的用法, weight 为权重，指明排序的优先级。\n多列排序时，sortedList 返回所有参与排序的字段信息|
|onSortCancel|((preType: \"asc\" / \"desc\", key: string / number, orders: ({  order: \"asc\" / \"desc\", weight?: number , key: string / number, manual: boolean })[], sorter: string) => void) ||排序取消事件|
|columnResizable|boolean ||设置 columnResizable 为 true，使所有列可伸缩|
|onColumnResize|(columns: TableColumn[]) => void||列宽伸缩后的回调|
|dataChangeResize|boolean |false|数据发生变化后是否重新计算列宽|
|expandKeys|(string / number)[] ||展开行受控|
|keygen|/ ObjectKey<DataItem>  / ((data: DataItem, index?: number) => string / number)||生成每一项key的辅助方法\n为函数时，使用此函数返回值\n为string时，使用这个string对应的数据值。如 \"id\"，相当于 (d => d.id)|
|value|any||当前选中值，格式和 onRowSelect 返回值一致|
|format|ObjectKey<DataItem> / ((data: DataItem) => Value extends (infer U)[] ? U : Value) |d => d|格式化 value, 默认值，返回原始数据。 为 string 时，会作为 key 从原始数据中获取值，相当于 (d) => d\\[format]; 为函数时，以函数返回结果作为 value。|
|prediction|((value: Value extends (infer U)[] ? U : Value, data: DataItem) => boolean) |(val, d) => val===format(d)|默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配|
### columns
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|align|\"left\" / \"center\" / \"right\"|\"left\"|单元格内容排布方式|
|colSpan|((row: DataItem, index: number) => number) ||合并列控制函数，row为单行数据，返回值一个整数，标明需要合并的列数|
|defaultOrder|\"asc\" / \"desc\" ||默认排序规则|
|fixed|\"left\" / \"right\" ||固定列,如果相邻的多列需要锁定，只需指定最外侧的 column 即可|
|group|ReactNode / ReactNode[]||表头分组，相邻的相同 group 会生成一个新的表头|
|hide|boolean ||只针对行展开列有效，表示是否隐藏该列|
|key|string / number ||列的key，默认使用 index|
|minWidth|number ||最小列宽|
|maxWidth|number ||最大可拖动列宽|
|filterAll|((data: DataItem[]) => DataItem[]) ||全选时用来筛除数据，仅当 type=\"checkbox\" 时有效|
|render|ObjectKey<DataItem> / function(d, id, instance)||表格内容生成函数，返回渲染的内容,  data 当前行的数据，index 当前索引，instance 当 type=\"checkbox\" 时会传入 Checkbox 实例\n为了使用方便，可以传入一个数据的key，如 \"id\"，相当于 (d) => { return d.id }|
|rowSpan|((prevRowData: DataItem, nextRowData: DataItem) => boolean) ||根据函数返回的结果（boolean）判断是否合并行，a、b为相邻的两行数据。|
|sorter|string / ((order: \"asc\" / \"desc\") => void / ((prevRowData: DataItem, nextRowData: DataItem) => number)) / {  rule: string / ((sorter: ({  order: \"asc\" / \"desc\", manual: boolean, key: string / number, weight?: number  })[]) => void), weight: number } ||sorter 不为空时，这一列会出现排序 icon。order的值为[\"asc\", \"desc\"]\n字符串表示排序依据字段，作为第一个参数传入Table.sorter\n为 Sorter 对象\n前端排序，返回一个排序函数，参考 Array.sort。(旧用法)\n服务端排序，不要返回值，自行处理即可。(旧用法)|
|title|ReactNode / ((rowData: DataItem[]) => ReactNode)||表头显示内容|
|treeColumnsName|ObjectKey<DataItem> ||树形表格子数据字段名|
|treeIndent|number |25|每一层缩进宽度|
|type|\"expand\" / \"row-expand\" / \"checkbox\" ||特殊用途列\nexpand: 行展开列，render 函数返回函数时，表示此行可以展开，内容为此函数返回结果。\nrow-expand: 同 expand。不同为点击行内空白区域也可以折叠/展开行。\ncheckbox: 选择列，仅用于固定选择列的场景|
|width|number ||列宽|
|className|string ||列对应的类名|
|style|CSSProperties ||td 样式|
|onClick|((d: DataItem, isExpand: boolean) => void) ||列点击事件|
|columnResizable|false ||单独设置某一列不可拖动|
## Example
### 基本用法
基础的表格用法。推荐 columns 写为常量，以提升性能
```tsx
/**
 * cn - 基本用法
 *    -- 基础的表格用法。推荐 columns 写为常量，以提升性能
 * en - Base
 *    -- Basic table usage
 */
import React from 'react';
import { Table, TYPE } from 'shineout';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    start: '2012-01-29',
    time: '01:42',
    salary: 115777,
    country: 'Reunion',
    office: 'Miami',
    office5: 'Istanbul',
    height: 113.74,
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    start: '2007-09-04',
    time: '03:26',
    salary: 396093,
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
    office5: 'Shenzhen',
    height: 82.13,
  },
  {
    id: 3,
    firstName: 'Dylan',
    lastName: 'Ratke',
    position: 'Development Lead',
    start: '2009-10-16',
    time: '01:45',
    salary: 236064,
    country: 'Peru',
    office: 'Boston',
    office5: 'Delhi',
    height: 179.53,
  },
  {
    id: 4,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    start: '2014-06-30',
    time: '02:17',
    salary: 338985,
    country: 'Peru',
    office: 'Chengdu',
    office5: 'Dallas-Fort Worth',
    height: 190.11,
  },
];

const columns: TableColumnItem[] = [
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

export default () => {
  return (
    <div>
      <Table keygen='id' columns={columns} data={data} />
    </div>
  );
};

```
### 边框和底纹
通过 striped 显示交错底纹；通过 bordered 显示边框
```tsx
/**
 * cn - 边框和底纹
 *    -- 通过 striped 显示交错底纹；通过 bordered 显示边框
 * en - Style
 *    -- Set striped to add zebra-striping; Set bordered to add borders
 */
import React from 'react';
import { Table, TYPE } from 'shineout';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    start: '2012-01-29',
    time: '01:42',
    salary: 115777,
    country: 'Reunion',
    office: 'Miami',
    office5: 'Istanbul',
    height: 113.74,
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    start: '2007-09-04',
    time: '03:26',
    salary: 396093,
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
    office5: 'Shenzhen',
    height: 82.13,
  },
  {
    id: 3,
    firstName: 'Dylan',
    lastName: 'Ratke',
    position: 'Development Lead',
    start: '2009-10-16',
    time: '01:45',
    salary: 236064,
    country: 'Peru',
    office: 'Boston',
    office5: 'Delhi',
    height: 179.53,
  },
  {
    id: 4,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    start: '2014-06-30',
    time: '02:17',
    salary: 338985,
    country: 'Peru',
    office: 'Chengdu',
    office5: 'Dallas-Fort Worth',
    height: 190.11,
  },
];

const columns: TableColumnItem[] = [
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

export default () => {
  return (
    <div>
      <Table keygen='id' columns={columns} data={data} bordered striped />
    </div>
  );
};

```
### 尺寸类型
设置 size 为 small 显示紧凑表格，large 为显示松散表格
```tsx
/**
 * cn - 尺寸类型
 *    -- 设置 size 为 small 显示紧凑表格，large 为显示松散表格
 * en - Size
 *    -- Set size to small to display compact table, large to display loose table
 */
import React from 'react';
import { Radio, Table, TYPE } from 'shineout';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    start: '2012-01-29',
    time: '01:42',
    salary: 115777,
    country: 'Reunion',
    office: 'Miami',
    office5: 'Istanbul',
    height: 113.74,
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    start: '2007-09-04',
    time: '03:26',
    salary: 396093,
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
    office5: 'Shenzhen',
    height: 82.13,
  },
  {
    id: 3,
    firstName: 'Dylan',
    lastName: 'Ratke',
    position: 'Development Lead',
    start: '2009-10-16',
    time: '01:45',
    salary: 236064,
    country: 'Peru',
    office: 'Boston',
    office5: 'Delhi',
    height: 179.53,
  },
  {
    id: 4,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    start: '2014-06-30',
    time: '02:17',
    salary: 338985,
    country: 'Peru',
    office: 'Chengdu',
    office5: 'Dallas-Fort Worth',
    height: 190.11,
  },
];

const columns: TableColumnItem[] = [
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

const sizeList = ['small', 'default', 'large'];
export default () => {
  const [size, setSize] = React.useState<'small' | 'large' | 'default'>('default');
  return (
    <div>
      <Radio.Group
        keygen
        data={sizeList}
        value={size}
        onChange={setSize}
        style={{ marginBottom: 24 }}
      />
      <Table keygen='id' size={size} columns={columns} data={data} />
    </div>
  );
};

```
### 表头分组
Table 会自动合并相邻相同 group 的表头
```tsx
/**
 * cn - 表头分组
 *    -- Table 会自动合并相邻相同 group 的表头
 * en - Column group
 *    -- Table automatically merges headers with adjacent and identical groups
 */
import React from 'react';
import { Table, TYPE } from 'shineout';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}
type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    start: '2012-01-29',
    time: '01:42',
    salary: 115777,
    country: 'Reunion',
    office: 'Miami',
    office5: 'Istanbul',
    height: 113.74,
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    start: '2007-09-04',
    time: '03:26',
    salary: 396093,
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
    office5: 'Shenzhen',
    height: 82.13,
  },
  {
    id: 3,
    firstName: 'Dylan',
    lastName: 'Ratke',
    position: 'Development Lead',
    start: '2009-10-16',
    time: '01:45',
    salary: 236064,
    country: 'Peru',
    office: 'Boston',
    office5: 'Delhi',
    height: 179.53,
  },
  {
    id: 4,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    start: '2014-06-30',
    time: '02:17',
    salary: 338985,
    country: 'Peru',
    office: 'Chengdu',
    office5: 'Dallas-Fort Worth',
    height: 190.11,
  },
];

const name = (
  <span style={{ background: '#E8EBF0', display: 'block', lineHeight: '40px', color: '#141737' }}>
    Name
  </span>
);

const other = <span>Other</span>;

const columns: TableColumnItem[] = [
  { title: 'First Name', render: 'firstName', group: [name, 'True Name'] },
  { title: 'Last Name', render: 'lastName', group: [name, 'True Name'] },
  { title: 'Nick Name', render: () => 'nickname', group: name },
  { title: 'Country', render: 'country' },
  { title: 'Office', render: 'office', group: other },
  { title: 'Position', render: 'position', group: other },
];

const App: React.FC = () => <Table bordered keygen='id' columns={columns} data={data} />;

export default App;

```
### 固定表头
当 table 设置高度后，表头会固定在顶部
```tsx
/**
 * cn - 固定表头
 *    -- 当 table 设置高度后，表头会固定在顶部
 * en - Fixed head
 *    -- When the table sets the height, the header will be fixed at the top
 */
import React from 'react';
import { Table, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}
type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = user.fetchSync(20);

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary($)',
    align: 'right',
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const App: React.FC = () => (
  <Table keygen='id' style={{ height: 300 }} columns={columns} data={data} width={1500} />
);

export default App;

```
### 固定列
设置 column 的 fixed 属性，可以固定列。只在设置了表格的 width 属性，并且 width 大于外部容器情况下才会生效
```tsx
/**
 * cn - 固定列
 *    -- 设置 column 的 fixed 属性，可以固定列。只在设置了表格的 width 属性，并且 width 大于外部容器情况下才会生效
 * en - Fixed column
 *    -- Set the fixed property of the column can fix the column; Only take effect if the table's width property is set and width is greater than the external container
 */
import React from 'react';
import { Table, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}
type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = user.fetchSync(20);

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 50 },
  {
    title: 'First Name',
    group: 'Name',
    render: 'firstName',
    width: 120,
  },
  {
    title: 'Last Name',
    fixed: 'left',
    group: 'Name',
    render: 'lastName',
    width: 120,
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary($)',
    fixed: 'right',
    align: 'right',
    width: 100,
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const App: React.FC = () => (
  <Table bordered keygen='id' width={1500} style={{ height: 300 }} columns={columns} data={data} />
);

export default App;

```
### 大数据量表格
Table内部对大量数据的渲染做了lazy render的优化。这个例子加载了10000条，55列数据。可以通过设置rowsInView调整单次最多render的行数，默认为20
```tsx
/**
 * cn - 大数据量表格
 *    -- Table内部对大量数据的渲染做了lazy render的优化。这个例子加载了10000条，55列数据。可以通过设置rowsInView调整单次最多render的行数，默认为20
 * en - Large data
 *    -- The rendering of large amounts of data in the Table has been optimized by lazy render. This example loads 10000 pieces and 55 columns of data
 *    -- You can set rowsInView property to change the number of rows in rendering. The default value is 20
 */
import React from 'react';
import { Table, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}
type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = user.fetchSync(10000);

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 80 },
  {
    title: 'Name',
    fixed: 'left',
    render: (d) => <div style={{ height: d.height }}>{`${d.firstName} ${d.lastName}`}</div>,
    width: 160,
  },
  { title: 'Country', render: 'country', width: 200 },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start', width: 140 },
];

for (let i = 0; i < 50; i++) {
  columns.push({
    title: `${i + 1}($)`,
    align: 'right',
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  });
}

const App: React.FC = () => (
  <Table
    verticalAlign='top'
    virtual
    keygen='id'
    width={6400}
    style={{ height: 600 }}
    columns={columns}
    data={data}
    rowsInView={20}
    bordered
  />
);

export default App;

```
### 虚拟滚动
虚拟列表提供了一个 scrollToIndex 方法滚动到指定行
```tsx
/**
 * cn - 虚拟滚动
 *    -- 虚拟列表提供了一个 scrollToIndex 方法滚动到指定行
 * en - scrollToIndex
 *    -- The virtual list table provides a scrollToIndex method to scroll to the specified row
 */
import React, { useState, useEffect } from 'react';
import { Input, Table, Form, TYPE, Button } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = user.fetchSync(10000);

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 80 },
  {
    title: 'Name',
    fixed: 'left',
    render: (d) => (
      <div id={`name_${d.id}`} style={{ height: d.height }}>
        {`${d.firstName} ${d.lastName}`}
      </div>
    ),
    width: 160,
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start', width: 140 },
];

const App: React.FC = () => {
  const [table, setTable] = useState<any>();

  const [state, setState] = useState({
    index: 25,
  });

  const handleScroll = () => {
    if (table)
      table.scrollToIndex(state.index - 1, () => {
        const el: HTMLElement = document.querySelector(`#name_${state.index}`)!;
        if (el) {
          el.style.color = 'red';
        }
      });
  };

  const handleIndexChange = ({ index }: { index: number }) => {
    setState({ index });
  };

  useEffect(() => {
    setTimeout(handleScroll);
  }, [state]);

  return (
    <div>
      <Form style={{ marginBottom: 24 }} defaultValue={state} inline onSubmit={handleIndexChange}>
        <Input.Number min={1} max={10000} width={100} name='index' />
        <Button type='primary' htmlType='submit'>
          Scroll
        </Button>
      </Form>

      <Table
        keygen='id'
        bordered
        data={data}
        virtual
        width={1400}
        rowsInView={10}
        columns={columns}
        style={{ height: 500 }}
        tableRef={(t) => setTable(t)}
      />
    </div>
  );
};

export default App;

```
### 加载中
设置 loading 属性可以将表格状态设置为加载中
```tsx
/**
 * cn - 加载中
 *    -- 设置 loading 属性可以将表格状态设置为加载中
 * en - Loading
 *    -- Set the loading property can set the table state to loading
 */
import React from 'react';
import { Table, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}
type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = user.fetchSync(8);

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

const App: React.FC = () => {
  return <Table keygen='id' loading columns={columns} data={data} />;
};

export default App;

```
### 排序
设置 Table 的 sorter 属性统一指定排序函数
设置 column 的 sorter 标示此列需要排序并指定依据字段，会作为第一个参数传入排序函数
defaultOrder 指定该列默认排序规则
sorter 返回一个 sort 函数时，使用这个函数对数据进行内部排序
后端或自行排序用户自行处理，sorter 函数不要返回结果
```tsx
/**
 * cn - 排序
 *    -- 设置 Table 的 sorter 属性统一指定排序函数
 *    -- 设置 column 的 sorter 标示此列需要排序并指定依据字段，会作为第一个参数传入排序函数
 *    -- defaultOrder 指定该列默认排序规则
 *    -- sorter 返回一个 sort 函数时，使用这个函数对数据进行内部排序
 *    -- 后端或自行排序用户自行处理，sorter 函数不要返回结果
 * en - Sorter
 *    -- Set the sorter property of Table to indicate the method of table sort
 *    -- Set the sorter property of Column to indicate the sort key string, will pass to table sorter method
 *    -- Set defaultOrder mark defualt order
 *    -- When the sorter returns a function, use this function to sort data internally
 *    -- Server-side or self-sorting is is handled by the user, do not return results
 */
import React from 'react';
import { Table, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  age: number;
  salary: number;
  office: string;
  country: string;
  position: string;
  lastName: string;
  firstName: string;
}
type TableProps = TYPE.Table.Props<TableRowData, TableRowData>;
type TableSorter = TableProps['sorter'];
type TableColumnOrder = TYPE.Table.ColumnOrder;
type TableOnSortCancel = TableProps['onSortCancel'];
type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = user.fetchSync(10);

const columns: TableColumnItem[] = [
  {
    title: 'Name',
    fixed: 'left',
    sorter: 'firstName',
    defaultOrder: 'asc',
    render: (d) => `${d.firstName} ${d.lastName}`,
  },
  { title: 'Age', render: 'age', sorter: 'age', align: 'right', },
  { title: 'Position', render: 'position' },
  {
    title: 'Salary($)',
    align: 'right',
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const App: React.FC = () => {
  const sorter: {
    [x: string]: any;
  } = {
    age: (order: TableColumnOrder) => (a: TableRowData, b: TableRowData) =>
      order === 'asc' ? a.age - b.age : b.age - a.age,
    firstName: (order: TableColumnOrder) => (a: TableRowData, b: TableRowData) =>
      order === 'asc'
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName),
  };

  const handleSorter: TableSorter = (name, order) => sorter[name](order);

  const handleCancel: TableOnSortCancel = (prevType, index) => {
    console.log('sort cancel : ', prevType, index);
  };

  return (
    <Table
      striped
      data={data}
      keygen='id'
      columns={columns}
      sorter={handleSorter}
      onSortCancel={handleCancel}
    />
  );
};

export default App;

```
### 自定义排序图标
设置 Table 的 renderSorter 属性来自定义图标
```tsx
/**
 * cn - 自定义排序图标
 *    -- 设置 Table 的 renderSorter 属性来自定义图标
 * en - Sorter
 *    -- Set the renderSorter property of the Table to customize the icon
 */
import React from 'react';
import { Table, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  age: number;
  salary: number;
  office: string;
  country: string;
  position: string;
  lastName: string;
  firstName: string;
}
type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;
type TableProps = TYPE.Table.Props<TableRowData, TableRowData>;
type TableSorter = TableProps['sorter'];
type TableColumnOrder = TYPE.Table.ColumnOrder;
type TableRenderSorter = TableProps['renderSorter'];
type TableOnSortCancel = TableProps['onSortCancel'];
type TableSorterParam = TYPE.Table.RenderSorterParam;

const data: TableRowData[] = user.fetchSync(10);
const columns: TableColumnItem[] = [
  {
    title: 'Name',
    fixed: 'left',
    sorter: 'firstName',
    defaultOrder: 'asc',
    render: (d) => `${d.firstName} ${d.lastName}`,
  },
  { title: 'Age', render: 'age', sorter: 'age', align: 'right' },
  { title: 'Position', render: 'position' },
  {
    title: 'Salary($)',
    align: 'right',
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const commonStyle: React.CSSProperties = {
  cursor: 'pointer',
  width: '8px',
  height: '5px',
  display: 'flex',
  alignItems: 'center',
};

const App: React.FC = () => {
  const sorter: {
    [x: string]: any;
  } = {
    age: (order: TableColumnOrder) => (a: TableRowData, b: TableRowData) =>
      order === 'asc' ? a.age - b.age : b.age - a.age,
    firstName: (order: TableColumnOrder) => (a: TableRowData, b: TableRowData) =>
      order === 'asc'
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName),
  };

  const renderSorter: TableRenderSorter = ({
    status,
    triggerAsc,
    triggerDesc,
  }: TableSorterParam) => (
    <>
      <div
        style={{
          ...commonStyle,
          color: status === 'asc' ? '#197afa' : '#999da8',
        }}
        onClick={triggerAsc}
      >
        <svg
          fill='currentColor'
          width='8'
          height='5'
          viewBox='0 0 8 5'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M3.59594 0.183058C3.80193 -0.0422441 4.12606 -0.0595753 4.35023 0.131065L4.40406 0.183058L7.83263 3.93306C8.05579 4.17714 8.05579 4.57286 7.83263 4.81694C7.62664 5.04224 7.30251 5.05958 7.07834 4.86893L7.02451 4.81694L4.40409 1.95128C4.18088 1.70732 3.81912 1.70732 3.59591 1.95128L0.975489 4.81694C0.769499 5.04224 0.445367 5.05958 0.2212 4.86893L0.167368 4.81694C-0.0386232 4.59164 -0.0544688 4.23712 0.119831 3.99194L0.167368 3.93306L3.59594 0.183058Z' />
        </svg>
      </div>
      <div
        style={{
          ...commonStyle,
          color: status === 'desc' ? '#197afa' : '#999da8',
          marginTop: 4,
        }}
        onClick={triggerDesc}
      >
        <svg
          width='8'
          height='5'
          viewBox='0 0 8 5'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M3.59594 4.81694C3.80193 5.04224 4.12606 5.05958 4.35023 4.86893L4.40406 4.81694L7.83263 1.06694C8.05579 0.822864 8.05579 0.427136 7.83263 0.183058C7.62664 -0.042244 7.30251 -0.0595751 7.07834 0.131065L7.02451 0.183058L4.40409 3.04872C4.18088 3.29268 3.81912 3.29268 3.59591 3.04872L0.975489 0.183058C0.769499 -0.042244 0.445367 -0.0595751 0.2212 0.131065L0.167368 0.183058C-0.0386232 0.408361 -0.0544688 0.76288 0.119831 1.00806L0.167368 1.06694L3.59594 4.81694Z' />
        </svg>
      </div>
    </>
  );

  const handleSorter: TableSorter = (name, order) => sorter[name](order);

  const handleCancel: TableOnSortCancel = (prevType, index) => {
    console.log('sort cancel : ', prevType, index);
  };
  return (
    <Table
      striped
      data={data}
      keygen='id'
      columns={columns}
      sorter={handleSorter}
      onSortCancel={handleCancel}
      renderSorter={renderSorter}
    />
  );
};

export default App;

```
### 多列排序
设置 column 的 sorter 为一个对象，对象的rule属性同单列排序的sorter，weight表示排序权重，值越大表示排序优先级越高
支持多列默认排序，为需要默认排序的列设置defaultOrder
sorter 返回一个 sort 函数时，使用这个函数对数据进行内部排序
后端或自行排序用户自行处理，sorter 函数不要返回结果
```tsx
/**
 * cn - 多列排序
 *    -- 设置 column 的 sorter 为一个对象，对象的rule属性同单列排序的sorter，weight表示排序权重，值越大表示排序优先级越高
 *    -- 支持多列默认排序，为需要默认排序的列设置defaultOrder
 *    -- sorter 返回一个 sort 函数时，使用这个函数对数据进行内部排序
 *    -- 后端或自行排序用户自行处理，sorter 函数不要返回结果
 * en - multiple Sorter
 *    -- Set the sorter property of Table to indicate the method of table sort
 *    -- Set the sorter of column to an object, the rule attribute of the object is the same as the sorter of single column sorting, weight indicates the sorting weight, the larger the value, the higher the sorting priority
 *    -- Support multi-column default sorting, set defaultOrder for columns that need default sorting
 *    -- When the sorter returns a function, use this function to sort data internally
 *    -- Server-side or self-sorting is is handled by the user, do not return results
 */
import React from 'react';
import { Table, TYPE } from 'shineout';

interface TableRowData {
  id: number;
  age: number;
  salary: number;
  office: string;
  country: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;
type TableProps = TYPE.Table.Props<TableRowData, TableRowData>;
type TableSorter = TableProps['sorter'];
type TableColumnOrder = TYPE.Table.ColumnOrder;
type TableOnSortCancel = TableProps['onSortCancel'];

const data: TableRowData[] = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    salary: 115777,
    country: 'Reunion',
    office: 'Miami',
    age: 20,
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    salary: 396093,
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
    age: 20,
  },
  {
    id: 3,
    firstName: 'Dylan',
    lastName: 'Ratke',
    position: 'Development Lead',
    salary: 236064,
    country: 'Peru',
    office: 'Boston',
    age: 25,
  },
  {
    id: 4,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    salary: 338985,
    country: 'Peru',
    office: 'Chengdu',
    age: 26,
  },
];
const columns: TableColumnItem[] = [
  {
    title: 'Name',
    fixed: 'left',
    render: (d) => `${d.firstName} ${d.lastName}`,
  },
  {
    title: 'Age',
    render: 'age',
    sorter: {
      rule: 'age',
      weight: 2,
    },
    align: 'right',
    defaultOrder: 'asc',
  },
  { title: 'Position', render: 'position' },
  {
    title: 'Salary($)',
    align: 'right',
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
    sorter: { rule: 'salary', weight: 1 },
    defaultOrder: 'desc',
  },
];

const sorter: {
  [x: string]: any;
} = {
  age: (order: TableColumnOrder) => (a: TableRowData, b: TableRowData) =>
    order === 'asc' ? a.age - b.age : b.age - a.age,
  salary: (order: TableColumnOrder) => (a: TableRowData, b: TableRowData) =>
    order === 'asc' ? a.salary - b.salary : b.salary - a.salary,
};

const App: React.FC = () => {
  const handleSorter: TableSorter = (name, order) => sorter[name](order);

  const handleCancel: TableOnSortCancel = (prevType, index) => {
    console.log('sort cancel : ', prevType, index);
  };

  return (
    <Table
      striped
      data={data}
      keygen='id'
      columns={columns}
      sorter={handleSorter}
      onSortCancel={handleCancel}
    />
  );
};

export default App;

```
### 分页
前端分页的情况下, 设置 pagination 显示分页，没有设置 onChange 处理数据的情况下，会自动对数据进行分页
pagination 的参数和 Pagination 组件一致
```tsx
/**
 * cn - 分页
 *    -- 前端分页的情况下, 设置 pagination 显示分页，没有设置 onChange 处理数据的情况下，会自动对数据进行分页
 *    -- pagination 的参数和 Pagination 组件一致
 * en - Pagination
 *    -- Set the pagination property to show the pagination and if not set onChange property, the data is automatically paged
 *    -- The parameters of pagination are consistent with the Pagination component
 */
import React, { useState } from 'react';
import { Table, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = user.fetchSync(1000);

const App: React.FC = () => {
  const [current, setCurrent] = useState<number>(1);

  const handlePageChange = (c: number) => {
    setCurrent(c);
  };

  const columns: TableColumnItem[] = [
    {
      title: 'id',
      render: 'id',
      width: 70,
      sorter: (order) => {
        handlePageChange(1);
        return (a, b) => {
          if (order === 'asc') return a.id - b.id;
          return b.id - a.id;
        };
      },
    },
    {
      title: 'First Name',
      group: 'Name',
      render: 'firstName',
      width: 100,
    },
    {
      title: 'Last Name',
      fixed: 'left',
      group: 'Name',
      render: 'lastName',
      width: 120,
      sorter: (order) => {
        handlePageChange(1);
        return (a, b) => {
          if (order === 'asc') return a.lastName.localeCompare(b.lastName);
          return b.lastName.localeCompare(a.lastName);
        };
      },
    },
    { title: 'Country', render: 'country' },
    { title: 'Position', render: 'position' },
    { title: 'Office', render: 'office' },
    { title: 'Start Date', render: 'start' },
    {
      title: 'Salary($)',
      align: 'right',
      fixed: 'right',
      width: 100,
      render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
    },
  ];

  return (
    <Table
      keygen='id'
      data={data}
      width={1500}
      columns={columns}
      // bordered
      pagination={{
        current,
        layout: ['links', 'list'],
        onChange: handlePageChange,
        pageSizeList: [10, 15, 20],
        text: {
          page: '/ page',
        },
      }}
    />
  );
};

export default App;

```
### 
后端分页的情况下, 在 pagination 的 onChange 中处理（获取）数据，可以实现服务端分页
```tsx
/**
 * cn -
 *    -- 后端分页的情况下, 在 pagination 的 onChange 中处理（获取）数据，可以实现服务端分页
 * en -
 *    -- Processing (acquiring) data in pagination's onChange realizes the pagination of server-side
 */
import React, { useState, useEffect } from 'react';
import { Table, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;
type TableColumnOrder = TYPE.Table.ColumnOrder;

const App: React.FC = () => {
  const [total, setTotal] = useState(0);
  const [sorter, setSorter] = useState({});
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TableRowData[]>([]);

  const fetchData = () => {
    setLoading(true);
    user.fetch.get('user', { sorter, current, pageSize, username: '' }).then((res) => {
      setData(res.data);
      setLoading(false);
      setTotal(res.total);
    });
  };

  const handleSorter = (name: string, order: TableColumnOrder) => {
    setSorter({ name, order });
    setCurrent(1);
  };

  const handlePageChange = (c: number, p: number) => {
    setCurrent(c);
    setPageSize(p);
  };

  const columns: TableColumnItem[] = [
    {
      width: 80,
      title: 'id',
      render: 'id',
      sorter: (order) => handleSorter('id', order),
    },
    {
      width: 100,
      group: 'Name',
      title: 'First Name',
      render: 'firstName',
    },
    {
      width: 120,
      fixed: 'left',
      group: 'Name',
      render: 'lastName',
      title: 'Last Name',
      sorter: (order) => handleSorter('lastName', order),
    },
    { title: 'Country', render: 'country' },
    { title: 'Office', render: 'office' },
    { title: 'Start Date', render: 'start', sorter: (order) => handleSorter('start', order) },
  ];

  useEffect(() => {
    fetchData();
  }, [current, pageSize, sorter]);

  return (
    <Table
      bordered
      virtual
      keygen='id'
      data={data}
      loading={loading}
      columns={columns}
      style={{ height: 400 }}
      pagination={{
        total,
        current,
        pageSize,
        layout: ['links', 'list'],
        onChange: handlePageChange,
        pageSizeList: [10, 15, 20, 100],
      }}
    />
  );
};

export default App;

```
### 滚动加载
onScroll 事件会返回当前滚动条位置 (float 类型，[0,1])，可以据此实现滚动加载数据
```tsx
/**
 * cn - 滚动加载
 *    -- onScroll 事件会返回当前滚动条位置 (float 类型，[0,1])，可以据此实现滚动加载数据
 * en - onScroll
 *    -- The onScroll event returns the current position(float,[0,1]) of the scroll bar
 */
import React, { useState, useEffect } from 'react';
import { Table, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const App: React.FC = () => {
  const [pageSize] = useState(20);
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TableRowData[]>([]);

  const fetchData = () => {
    setLoading(true);
    user.fetch.get('table', { current, pageSize, sorter: {}, username: '' }).then((res) => {
      setData([...data, ...res.data]);
      setLoading(false);
    });
  };

  const handleScroll = (_left: number, top: number) => {
    if (top === 1 && !loading) {
      setCurrent(current + 1);
    }
  };

  const columns: TableColumnItem[] = [
    { title: 'id', render: 'id', width: 70 },
    {
      width: 100,
      group: 'Name',
      title: 'First Name',
      render: 'firstName',
    },
    {
      width: 120,
      fixed: 'left',
      group: 'Name',
      title: 'Last Name',
      render: 'lastName',
    },
    { title: 'Country', render: 'country' },
    { title: 'Office', render: 'office' },
    { title: 'Start Date', render: 'start' },
  ];

  useEffect(() => {
    fetchData();
  }, [pageSize, current]);

  return (
    <Table
      bordered
      virtual
      keygen='id'
      data={data}
      loading={loading}
      columns={columns}
      verticalAlign='middle'
      style={{ height: 450 }}
      onScroll={handleScroll}
    />
  );
};

export default App;

```
### 合并行/列
设置 column 的 rowSpan 可以合并行，rowSpan 为函数，会传入相邻的两行数据，根据此函数返回结果(bool)判断是否合并行
设置 column 的 colSpan 可以合并列，colSpan 为函数，传入参数为当前行数据，函数返回结果为需要向后合并的列数，不合并返回 1
一个单元格同时指定了rowSpan和colSpan时，如果两行的colSpan计算结果不同，这两行不会合并
```tsx
/**
 * cn - 合并行/列
 *    -- 设置 column 的 rowSpan 可以合并行，rowSpan 为函数，会传入相邻的两行数据，根据此函数返回结果(bool)判断是否合并行
 *    -- 设置 column 的 colSpan 可以合并列，colSpan 为函数，传入参数为当前行数据，函数返回结果为需要向后合并的列数，不合并返回 1
 *    -- 一个单元格同时指定了rowSpan和colSpan时，如果两行的colSpan计算结果不同，这两行不会合并
 * en - rowSpan & colSpan
 *    -- - Set column's rowSpan property to merge rows. The rowSpan property is a function that passed in two adjacent rows of data and determine whether to merge or not
 *    -- - Set column's colSpan property to merge columns. The colSpan property is a function that passed in current row of data and the result returned by this function is as the number of columns that need to be merged
 *    -- - When a cell specifies both rowSpan and colSpan, if the colSpan's calculation results of the two rows are different, the two rows will not be merged
 */
import React from 'react';
import { Table, TYPE } from 'shineout';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = [
  {
    id: 8850,
    firstName: 'Kyler',
    lastName: 'Corkery',
    position: 'Systems Administrator',
    start: '2010-03-22',
    time: '01:49',
    salary: 492227,
    country: 'Bulgaria',
    office: 'Accra',
    office5: 'Pune',
    height: 163.5,
  },
  {
    id: 9656,
    firstName: 'Blanca',
    lastName: 'Beatty',
    position: 'Integration Specialist',
    start: '2010-03-24',
    time: '08:41',
    salary: 197056,
    country: 'Hong Kong',
    office: 'Qingdao',
    office5: 'Fuzhou',
    height: 165.15,
  },
  {
    id: 1263,
    firstName: 'Deondre',
    lastName: 'Steuber',
    position: 'Accountant',
    start: '2010-03-25',
    time: '08:15',
    salary: 399963,
    country: 'Ghana',
    office: 'Lagos',
    office5: 'Fuzhou',
    height: 137.43,
  },
  {
    id: 1487,
    firstName: 'Sister',
    lastName: 'Auer',
    position: 'Support Engineer',
    start: '2010-03-25',
    time: '08:52',
    salary: 172989,
    country: 'Falkland Islands (Malvinas)',
    office: 'Washington',
    office5: 'Qingdao',
    height: 157.17,
  },
  {
    id: 5844,
    firstName: 'Brett',
    lastName: 'Harvey',
    position: 'System Architect',
    start: '2010-03-25',
    time: '01:36',
    salary: 253785,
    country: 'Norfolk Island',
    office: 'London',
    office5: 'Fuzhou',
    height: 131.22,
  },
  {
    id: 8620,
    firstName: 'Geovany',
    lastName: 'Gulgowski',
    position: 'Support Engineer',
    start: '2010-03-25',
    time: '07:20',
    salary: 134985,
    country: 'Bulgaria',
    office: 'San Paulo',
    office5: 'Chongqing',
    height: 86.96,
  },
  {
    id: 7323,
    firstName: 'Luz',
    lastName: 'Homenick',
    position: 'Technical Author',
    start: '2010-03-26',
    time: '12:53',
    salary: 380952,
    country: 'Botswana',
    office: 'Qingdao',
    office5: 'Qingdao',
    height: 132.83,
  },
  {
    id: 9831,
    firstName: 'Oma',
    lastName: 'Hoeger',
    position: 'Regional Director',
    start: '2010-03-26',
    time: '02:42',
    salary: 390428,
    country: 'Nauru',
    office: 'Abidjan',
    office5: 'Chongqing',
    height: 158.7,
  },
  {
    id: 1230,
    firstName: 'Lillie',
    lastName: 'Aufderhar',
    position: 'Technical Author',
    start: '2010-03-27',
    time: '05:43',
    salary: 71278,
    country: 'Norfolk Island',
    office: 'Riyadh',
    office5: 'Fuzhou',
    height: 133.9,
  },
  {
    id: 4014,
    firstName: 'Dominic',
    lastName: 'Thiel',
    position: 'Developer',
    start: '2010-03-27',
    time: '01:25',
    salary: 361583,
    country: 'Nauru',
    office: 'Alexandria',
    office5: 'Xian',
    height: 109.25,
  },
];

const columns: TableColumnItem[] = [
  {
    title: 'id',
    render: 'id',
    width: 70,
  },
  {
    title: 'First Name',
    group: 'Name',
    render: 'firstName',
    rowSpan: (a, b) => a.firstName === b.firstName,
  },
  { title: 'Last Name', group: 'Name', render: 'lastName' },
  {
    title: 'Start Date',
    width: 120,
    render: 'start',
    rowSpan: (a, b) => a.start === b.start,
    colSpan: (d) => {
      const hour = parseInt(d.time.slice(0, 2), 10);
      if (hour > 21 || hour < 9) return 2;
      return 1;
    },
  },
  { title: 'Time', render: 'time' },
  { title: 'Office', render: 'office5' },
];

const App: React.FC = () => <Table bordered data={data} keygen='id' columns={columns} />;

export default App;

```
### 选择行
设置 onRowSelect 属性，会自动添加选择列
```tsx
/**
 * cn - 选择行
 *    -- 设置 onRowSelect 属性，会自动添加选择列
 * en - Select
 *    -- Set the onRowSelect property will automatically add a column with checkbox
 */
import React, { useState } from 'react';
import { Table, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;
type TableProps = TYPE.Table.Props<TableRowData, TableRowData[]>;
type TableOnRowSelect = TableProps['onRowSelect'];

const data: TableRowData[] = user.fetchSync(20);

const columns: TableColumnItem[] = [
  {
    type: 'checkbox',
    width: 10,
  },
  {
    title: 'id',
    render: 'id',
    width: 60,
  },
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}`, width: 160 },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

const App: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState([data[2]]);
  const handelRowSelect: TableOnRowSelect = (v) => {
    setSelectedValue(v);
  };

  return (
    <div>
      <Table
        data={data}
        keygen='id'
        columns={columns}
        value={selectedValue}
        style={{ height: 300 }}
        onRowSelect={handelRowSelect}
        prediction={(v, d) => v.id === d.id}
      />
      <div style={{ marginTop: 24, fontSize: 14 }}>{`selected rows: [${selectedValue
        .map((v) => v.id)
        .join(', ')}]`}</div>
    </div>
  );
};

export default App;

```
### 选择行格式化
使用 format，可以格式化返回的数据
```tsx
/**
 * cn - 选择行格式化
 *    -- 使用 format，可以格式化返回的数据
 * en - Select format
 *    -- Set format property to format the returned value
 */
import React, { useState } from 'react';
import { Table, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;
type TableProps = TYPE.Table.Props<TableRowData, string[]>;
type TableOnRowSelect = TableProps['onRowSelect'];

const data: TableRowData[] = user.fetchSync(20);
const value = [2, 3, 5].map((i) => `${data[i].firstName} ${data[i].lastName}`);

const columns: TableColumnItem[] = [
  {
    width: 60,
    title: 'id',
    render: 'id',
  },
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}`, width: 160 },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

const App: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handelRowSelect: TableOnRowSelect = (v) => {
    setSelectedValue(v);
  };
  return (
    <div>
      <Table
        keygen='id'
        data={data}
        columns={columns}
        value={selectedValue}
        style={{ height: 300 }}
        onRowSelect={handelRowSelect}
        format={(d) => `${d.firstName} ${d.lastName}`}
      />
      <div style={{ wordBreak: 'break-all', marginTop: 24, fontSize: 14 }}>
        selected rows:
        {JSON.stringify(selectedValue)}
      </div>
    </div>
  );
};

export default App;

```
### 单选
设置 radio 属性实现单选效果
```tsx
/**
 * cn - 单选
 *    -- 设置 radio 属性实现单选效果
 * en - Select signle
 *    -- Set the radio attribute to achieve the radio effect
 */
import React, { useState } from 'react';
import { Table, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;
type TableProps = TYPE.Table.Props<TableRowData, number>;
type TableOnRowSelect = TableProps['onRowSelect'];

const data: TableRowData[] = user.fetchSync(20);

const columns: TableColumnItem[] = [
  {
    width: 60,
    title: 'id',
    render: 'id',
  },
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}`, width: 160 },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

const App: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState(3);

  const handelRowSelect: TableOnRowSelect = (v) => {
    setSelectedValue(v);
  };
  return (
    <Table
      keygen='id'
      radio
      data={data}
      columns={columns}
      value={selectedValue}
      style={{ height: 300 }}
      onRowSelect={handelRowSelect}
      format='id'
    />
  );
};

export default App;

```
### 选择行合并
给 type 为 checkbox 的列设置 rowSpan 属性，可以合并选择行
```tsx
/**
 * cn - 选择行合并
 *    -- 给 type 为 checkbox 的列设置 rowSpan 属性，可以合并选择行
 * en - Select row span
 *    -- Set the rowSpan property of the column with type checkbox to merge the selection row
 */
import React, { useState } from 'react';
import { Table, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;
type TableProps = TYPE.Table.Props<TableRowData, number[]>;
type TableOnRowSelect = TableProps['onRowSelect'];

const data: TableRowData[] = user.fetchSync(20);

const rowSpan = (a: TableRowData, _next: TableRowData) => a.id % 3 === 0;
const columns: TableColumnItem[] = [
  {
    type: 'checkbox',
    rowSpan,
  },
  {
    width: 60,
    title: 'id',
    render: 'id',
  },
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}`, width: 160 },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

const App: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState([2, 3, 5]);

  const handelRowSelect: TableOnRowSelect = (v) => {
    setSelectedValue(v);
  };
  return (
    <div>
      <Table
        keygen='id'
        data={data}
        columns={columns}
        value={selectedValue}
        style={{ height: 300 }}
        onRowSelect={handelRowSelect}
        format={'id'}
      />
      <div style={{ wordBreak: 'break-all', marginTop: 24, fontSize: 14 }}>
        selected rows:
        {JSON.stringify(selectedValue)}
      </div>
    </div>
  );
};

export default App;

```
### 选择行禁用
disabled 属性设置为 true 时禁用全部, 设置为函数时禁用指定行
```tsx
/**
 * cn - 选择行禁用
 *    -- disabled 属性设置为 true 时禁用全部, 设置为函数时禁用指定行
 * en - Select disabled
 *    -- Set disabled to true to disable all, set to a function to disable a specific row
 */
import React, { useState } from 'react';
import { Table, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;
type TableProps = TYPE.Table.Props<TableRowData, number[]>;
type TableOnRowSelect = TableProps['onRowSelect'];

const data: TableRowData[] = user.fetchSync(20);

const rowSpan = (a: TableRowData, _next: TableRowData) => a.id % 3 === 0;
const columns: TableColumnItem[] = [
  {
    type: 'checkbox',
    rowSpan,
  },
  {
    width: 60,
    title: 'id',
    render: 'id',
  },
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}`, width: 160 },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

const App: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState([2, 3, 5]);

  const handelRowSelect: TableOnRowSelect = (v) => {
    setSelectedValue(v);
  };
  return (
    <div>
      <Table
        keygen='id'
        disabled={(d) => d.id === 3}
        data={data}
        columns={columns}
        value={selectedValue}
        style={{ height: 300 }}
        onRowSelect={handelRowSelect}
        format={'id'}
      />
      <div style={{ wordBreak: 'break-all', marginTop: 24, fontSize: 14 }}>
        selected rows:
        {JSON.stringify(selectedValue)}
      </div>
    </div>
  );
};

export default App;

```
### 可伸缩列
设置 columnResizable，使所有列可伸缩。<br />可在columns中设置某一列 columnResizable: false 来取消伸缩该列。
```tsx
/**
 * cn - 可伸缩列
 *    -- 设置 columnResizable，使所有列可伸缩。<br />可在columns中设置某一列 columnResizable: false 来取消伸缩该列。
 * en - Fixed head
 *    -- Set the columnResizable property to make all columns resizable. set columnResizable: false on columns item to cancel resizable
 */
import React from 'react';
import { Table, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = user.fetchSync(20);

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', fixed: 'left', maxWidth: 300, minWidth: 100 },
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start', columnResizable: false },
  {
    title: 'Salary($)',
    align: 'right',
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const App: React.FC = () => (
  <Table
    columnResizable
    virtual
    height={300}
    width={1200}
    keygen='id'
    columns={columns}
    bordered
    data={data}
  />
);

export default App;

```
### 可展开
需要展开行时，可以增加一个 type 为 'expand' 的 column，render 函数返回函数时，表示此行可以展开，内容为此函数返回结果
```tsx
/**
 * cn - 可展开
 *    -- 需要展开行时，可以增加一个 type 为 'expand' 的 column，render 函数返回函数时，表示此行可以展开，内容为此函数返回结果
 * en - Expand
 *    -- Add a column with type 'expand' and the render function returns a function, that means the row can be expanded. The content is the result returned by this function
 */
import React from 'react';
import { Table, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = user.fetchSync(100);

const columns: TableColumnItem[] = [
  {
    width: 10,
    type: 'row-expand',
    render: (d) => {
      if (d.salary < 300000) return undefined;
      return () => (
        <div style={{ padding: '8px 12px', wordBreak: 'break-all' }}>{JSON.stringify(d)}</div>
      );
    },
  },
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary($)',
    align: 'right',
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const App: React.FC = () => (
  <Table
    keygen='id'
    data={data}
    columns={columns}
    style={{ height: 300 }}
    onRowClick={(d, i) => console.log(d, i)}
  />
);

export default App;

```
### 可展开受控
受控,当传入一个expandKeys时,展开会变成受控的,需要自行在column里面的onClick去处理
```tsx
/**
 * cn - 可展开受控
 *    -- 受控,当传入一个expandKeys时,展开会变成受控的,需要自行在column里面的onClick去处理
 * en -
 *    -- When an expandKeys is provided, the expansion becomes controlled and needs to be processed by the onClick in the column
 */
import React, { useState } from 'react';
import { Table, Checkbox, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = user.fetchSync(5);

const App: React.FC = () => {
  const [expandKeys, setExpandKeys] = useState([1]);

  const columns: TableColumnItem[] = [
    { title: 'id', render: 'id', width: 50 },
    {
      type: 'expand',
      onClick: (d, isExpand) => {
        if (isExpand) setExpandKeys([...expandKeys, d.id]);
        else setExpandKeys(expandKeys.filter((k) => k !== d.id));
      },
      render: (d) => {
        if (d.id > 5) return undefined;
        return () => (
          <div style={{ padding: '8px 12px', wordBreak: 'break-all' }}>{JSON.stringify(d)}</div>
        );
      },
    },
    { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
    { title: 'Office', render: 'office' },
    { title: 'Start Date', render: 'start' },
    {
      title: 'Salary($)',
      align: 'right',
      render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
    },
  ];

  return (
    <div>
      <Checkbox.Group
        style={{ marginBottom: 24 }}
        keygen='id'
        value={expandKeys}
        onChange={setExpandKeys}
      >
        {[1, 2, 3, 4, 5].map((d) => (
          <Checkbox key={d} htmlValue={d}>{`展开第 ${d} 行`}</Checkbox>
        ))}
      </Checkbox.Group>

      <Table
        expandKeys={expandKeys}
        data={data}
        keygen='id'
        style={{ height: 300 }}
        columns={columns}
      />
    </div>
  );
};

export default App;

```
### 行样式
通过 rowClassName 设置单行样式（使用了 rowClassName 必须给 td 指定背景色）
```tsx
/**
 * cn - 行样式
 *    -- 通过 rowClassName 设置单行样式（使用了 rowClassName 必须给 td 指定背景色）
 * en - Row ClassName
 *    -- Set the rowClassName property to set row style. (You must specify td background-color when the rowClassName is set)
 */
import React from 'react';
import { Table, TYPE } from 'shineout';
import { user } from '@sheinx/mock';
import { createUseStyles } from 'react-jss';

const useStyle = createUseStyles(
  {
    danger: {
      'table & td': {
        backgroundColor: '#fff1f0',
      },
    },
    success: {
      'table & td': {
        backgroundColor: '#f6ffed',
      },
    },
  },
  { name: 'custom-table' },
);

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;
type TableProps = TYPE.Table.Props<TableRowData, TableRowData[]>;
type TableRowClassName = TableProps['rowClassName'];

const data: TableRowData[] = user.fetchSync(5);

const columns: TableColumnItem[] = [
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary($)',
    align: 'right',
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const App: React.FC = () => {
  const classes = useStyle();

  const rowClassName: TableRowClassName = (d) => {
    if (d.id === 2) return classes.danger;
    if (d.id === 3) return classes.success;
    return undefined;
  };
  return <Table keygen='id' columns={columns} data={data} rowClassName={rowClassName} />;
};

export default App;

```
### 行内元素点击
设置 rowClickAttr，可以使行内元素的点击事件触发onRowClick
```tsx
/**
 * cn - 行内元素点击
 *    -- 设置 rowClickAttr，可以使行内元素的点击事件触发onRowClick
 * en - Base
 *    -- Set the rowClickAttr to trigger an onRowClick event for an element
 */
import React, { useState } from 'react';
import { Table, Radio, Button, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const dataList = user.fetchSync(4);

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  {
    title: 'Operation',
    render: () => (
      <span>
        <Button data-info size='small'>
          <span data-info>info</span>
        </Button>
        &nbsp;
        <Button data-call type='primary' size='small'>
          <span data-call>call</span>
        </Button>
      </span>
    ),
  },
];

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [attrs, setAttrs] = useState(['*']);

  const handleClick = () => setCount(count + 1);

  const handleChange = (v: string[]) => setAttrs(v);

  return (
    <div>
      <Table
        rowClickAttr={attrs}
        onRowClick={handleClick}
        keygen='id'
        columns={columns}
        data={dataList}
      />
      <div style={{ marginTop: 12, fontSize: 14, lineHeight: '22px' }}>
        <span>rowClickAttr：</span>
        <Radio.Group
          keygen
          value={attrs}
          onChange={handleChange}
          data={['data-info', 'data-call', '*']}
          style={{ display: 'inline-block', verticalAlign: 'middle' }}
        />
      </div>
      <div style={{ fontSize: 14 }}>
        <span>onRowClick call count： </span>
        <span>{count}</span>
      </div>
    </div>
  );
};
export default App;

```
### 树形数据
支持树形数据的展示，通过 columns.treeColumnsName 指定子数据字段名，同时在该列自动添加 展开/收起 按钮。\n 通过 columns.treeIndent 指定每一层缩进宽度。\n 备注：当展开列内容过长时，单元格会自动换行。可以通过 width 设定足够的长度来避免
```tsx
/**
 * cn - 树形数据
 *    -- 支持树形数据的展示，通过 columns.treeColumnsName 指定子数据字段名，同时在该列自动添加 展开/收起 按钮。\n 通过 columns.treeIndent 指定每一层缩进宽度。\n 备注：当展开列内容过长时，单元格会自动换行。可以通过 width 设定足够的长度来避免
 * en - Tree Data
 *    -- Support Tree Data
 */
import React from 'react';
import { Table, TYPE } from 'shineout';

interface TableRowData {
  id: number;
  office: string;
  country: string;
  position: string;
  lastName: string;
  firstName: string;
  children?: TableRowData[];
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    country: 'Reunion',
    office: 'Miami',
    children: [
      {
        id: 6,
        firstName: 'Ialu',
        lastName: 'Opis',
        position: 'Finalick Designer',
        country: 'Tokiy',
        office: 'Miami',
        children: [
          {
            id: 3,
            firstName: 'Dylan',
            lastName: 'Ratke',
            position: 'Development Lead',
            country: 'Peru',
            office: 'Boston',
            children: [
              {
                id: 10,
                firstName: 'Danil',
                lastName: 'Forun',
                position: 'Development Lead',
                country: 'Deini',
                office: 'Conty',
              },
            ],
          },
        ],
      },
      {
        id: 7,
        firstName: 'Foak',
        lastName: 'Resilt',
        position: 'Dcaoko Designer',
        country: 'Moran',
        office: 'Korosal',
      },
      {
        id: 8,
        firstName: 'Jest',
        lastName: 'Rokio',
        position: 'Fmaiil Mail',
        country: 'Moran',
        office: 'Ticko',
        children: [
          {
            id: 9,
            firstName: 'Domo',
            lastName: 'Wang',
            position: 'Ameri Kich',
            country: 'Moran',
            office: 'Fiour',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
  },
  {
    id: 11,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    country: 'Peru',
    office: 'Chengdu',
    children: [
      {
        id: 12,
        firstName: 'Dylan',
        lastName: 'Ratke',
        position: 'Development Lead',
        country: 'Peru',
        office: 'Boston',
      },
    ],
  },
  {
    id: 13,
    firstName: 'Wolo',
    lastName: 'Casho',
    position: 'Developer',
    country: 'Franch',
    office: 'Jiangsu',
  },
  {
    id: 14,
    firstName: 'Lou',
    lastName: 'Woch',
    position: 'Befined',
    country: 'China',
    office: 'Beijing',
    children: [
      {
        id: 15,
        firstName: 'Oos',
        lastName: 'Wargen',
        position: 'UX Designer',
        country: 'Upck',
        office: 'Andwarea',
      },
    ],
  },
  {
    id: 16,
    firstName: 'Endted',
    lastName: 'Wang',
    position: 'Ameri Kich',
    country: 'Moran',
    office: 'Fiour',
    children: [
      {
        id: 17,
        firstName: 'Oos',
        lastName: 'Wargen',
        position: 'UX Designer',
        country: 'Upck',
        office: 'Andwarea',
      },
    ],
  },
  {
    id: 18,
    firstName: 'Danil',
    lastName: 'Forun',
    position: 'Development Lead',
    country: 'Deini',
    office: 'Conty',
  },
];

const columns: TableColumnItem[] = [
  {
    title: 'Name',
    render: (d) => `${d.firstName} ${d.lastName}`,
    width: 300,
    treeIndent: 22,
    treeColumnsName: 'children',
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

const App: React.FC = () => (
  <Table bordered height={300} keygen='id' columns={columns} data={data} />
);

export default App;

```
### 
设置 treeCheckAll, 支持递归选择子数据
```tsx
/**
 * cn -
 *    -- 设置 treeCheckAll, 支持递归选择子数据
 * en -
 *    -- Set treeCheckAll to deep check children
 */
import React from 'react';
import { Table, TYPE } from 'shineout';

interface TableRowData {
  id: number;
  office: string;
  country: string;
  position: string;
  lastName: string;
  firstName: string;
  children?: TableRowData[];
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    country: 'Reunion',
    office: 'Miami',
    children: [
      {
        id: 6,
        firstName: 'Ialu',
        lastName: 'Opis',
        position: 'Finalick Designer',
        country: 'Tokiy',
        office: 'Miami',
        children: [
          {
            id: 3,
            firstName: 'Dylan',
            lastName: 'Ratke',
            position: 'Development Lead',
            country: 'Peru',
            office: 'Boston',
            children: [
              {
                id: 10,
                firstName: 'Danil',
                lastName: 'Forun',
                position: 'Development Lead',
                country: 'Deini',
                office: 'Conty',
              },
            ],
          },
        ],
      },
      {
        id: 7,
        firstName: 'Foak',
        lastName: 'Resilt',
        position: 'Dcaoko Designer',
        country: 'Moran',
        office: 'Korosal',
      },
      {
        id: 8,
        firstName: 'Jest',
        lastName: 'Rokio',
        position: 'Fmaiil Mail',
        country: 'Moran',
        office: 'Ticko',
        children: [
          {
            id: 9,
            firstName: 'Domo',
            lastName: 'Wang',
            position: 'Ameri Kich',
            country: 'Moran',
            office: 'Fiour',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
  },
  {
    id: 11,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    country: 'Peru',
    office: 'Chengdu',
    children: [
      {
        id: 12,
        firstName: 'Dylan',
        lastName: 'Ratke',
        position: 'Development Lead',
        country: 'Peru',
        office: 'Boston',
      },
    ],
  },
];

const columns: TableColumnItem[] = [
  {
    title: 'Name',
    render: (d) => `${d.firstName} ${d.lastName}`,
    width: 300,
    treeColumnsName: 'children',
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

const App: React.FC = () => (
  <Table
    bordered
    defaultTreeExpandKeys={[1]}
    keygen='id'
    format='id'
    data={data}
    treeCheckAll
    columns={columns}
    onRowSelect={(selected) => console.log(selected)}
  />
);

export default App;

```
### 
使用 treeExpandKeys 和 onTreeExpand 使展开行受控
```tsx
/**
 * cn -
 *    -- 使用 treeExpandKeys 和 onTreeExpand 使展开行受控
 * en -
 *    -- Use treeExpandKeys and onTreeExpand to control the expand row
 */
import React, { useState } from 'react';
import { Table, TYPE } from 'shineout';

interface TableRowData {
  id: number;
  office: string;
  country: string;
  position: string;
  lastName: string;
  firstName: string;
  children?: TableRowData[];
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;
type TableProps = TYPE.Table.Props<TableRowData, TableRowData>;
type TableOnTreeExpand = TableProps['onTreeExpand'];

const data: TableRowData[] = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    country: 'Reunion',
    office: 'Miami',
    children: [
      {
        id: 6,
        firstName: 'Ialu',
        lastName: 'Opis',
        position: 'Finalick Designer',
        country: 'Tokiy',
        office: 'Miami',
        children: [
          {
            id: 3,
            firstName: 'Dylan',
            lastName: 'Ratke',
            position: 'Development Lead',
            country: 'Peru',
            office: 'Boston',
            children: [
              {
                id: 10,
                firstName: 'Danil',
                lastName: 'Forun',
                position: 'Development Lead',
                country: 'Deini',
                office: 'Conty',
              },
            ],
          },
        ],
      },
      {
        id: 7,
        firstName: 'Foak',
        lastName: 'Resilt',
        position: 'Dcaoko Designer',
        country: 'Moran',
        office: 'Korosal',
      },
      {
        id: 8,
        firstName: 'Jest',
        lastName: 'Rokio',
        position: 'Fmaiil Mail',
        country: 'Moran',
        office: 'Ticko',
        children: [
          {
            id: 9,
            firstName: 'Domo',
            lastName: 'Wang',
            position: 'Ameri Kich',
            country: 'Moran',
            office: 'Fiour',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
  },
  {
    id: 11,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    country: 'Peru',
    office: 'Chengdu',
    children: [
      {
        id: 12,
        firstName: 'Dylan',
        lastName: 'Ratke',
        position: 'Development Lead',
        country: 'Peru',
        office: 'Boston',
      },
    ],
  },
  {
    id: 13,
    firstName: 'Wolo',
    lastName: 'Casho',
    position: 'Developer',
    country: 'Franch',
    office: 'Jiangsu',
  },
  {
    id: 14,
    firstName: 'Lou',
    lastName: 'Woch',
    position: 'Befined',
    country: 'China',
    office: 'Beijing',
    children: [
      {
        id: 15,
        firstName: 'Oos',
        lastName: 'Wargen',
        position: 'UX Designer',
        country: 'Upck',
        office: 'Andwarea',
      },
    ],
  },
  {
    id: 16,
    firstName: 'Endted',
    lastName: 'Wang',
    position: 'Ameri Kich',
    country: 'Moran',
    office: 'Fiour',
    children: [
      {
        id: 17,
        firstName: 'Oos',
        lastName: 'Wargen',
        position: 'UX Designer',
        country: 'Upck',
        office: 'Andwarea',
      },
    ],
  },
  {
    id: 18,
    firstName: 'Danil',
    lastName: 'Forun',
    position: 'Development Lead',
    country: 'Deini',
    office: 'Conty',
  },
];

const columns: TableColumnItem[] = [
  {
    title: 'Name',
    render: (d) => `${d.firstName} ${d.lastName}`,
    width: 300,
    treeColumnsName: 'children',
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

const App: React.FC = () => {
  const [expands, setExpands] = useState<(number | string)[]>([1]);

  const handleExpand: TableOnTreeExpand = (keys) => {
    console.log(keys);
    setExpands(keys);
  };

  return (
    <Table
      bordered
      virtual
      keygen='id'
      data={data}
      height={300}
      columns={columns}
      treeExpandKeys={expands}
      onTreeExpand={handleExpand}
    />
  );
};

export default App;

```
### 只使用样式
使用原生的tr, td来显示表格
```tsx
/**
 * cn - 只使用样式
 *    -- 使用原生的tr, td来显示表格
 * en - Style only
 *    -- Use the native tr and td to display the table
 */
import React from 'react';
import { Table } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

const data: TableRowData[] = user.fetchSync(6);

const App: React.FC = () => (
  <Table striped keygen='id'>
    <thead>
      <tr>
        <th>Name</th>
        <th>Office</th>
        <th>Start Date</th>
        <th style={{ textAlign: 'right' }}>Salary($)</th>
      </tr>
    </thead>
    <tbody>
      {data.map((d) => (
        <tr key={d.id}>
          <td>{`${d.firstName} ${d.lastName}`}</td>
          <td>{d.office}</td>
          <td>{d.start}</td>
          <td style={{ textAlign: 'right' }}>{`${d.salary
            .toString()
            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default App;

```
### 表头附着
在滚屏场景下，可以设置 sticky 属性使表头附着顶部
```tsx
/**
 * cn - 表头附着
 *    -- 在滚屏场景下，可以设置 sticky 属性使表头附着顶部
 * en - Sticky Header
 *    -- Use the sticky attribute to sticky the header
 */
import React from 'react';
import { Table, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = user.fetchSync(20);

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary($)',
    align: 'right',
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const App: React.FC = () => {
  return <Table sticky={{ top: 190 }} data={data} columns={columns} keygen='id' />;
};

export default App;

```
### 单元格选中
通过 cellSelectable 属性来启用 ctrl/cmd + click 选中单元格
```tsx
/**
 * cn - 单元格选中
 *    -- 通过 cellSelectable 属性来启用 ctrl/cmd + click 选中单元格
 * en - Cell selectable
 *    -- whether to enable ctrl/cmd + click check
 */
import React from 'react';
import { Table, TYPE } from 'shineout';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    start: '2012-01-29',
    time: '01:42',
    salary: 115777,
    country: 'Reunion',
    office: 'Miami',
    office5: 'Istanbul',
    height: 113.74,
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    start: '2007-09-04',
    time: '03:26',
    salary: 396093,
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
    office5: 'Shenzhen',
    height: 82.13,
  },
  {
    id: 3,
    firstName: 'Dylan',
    lastName: 'Ratke',
    position: 'Development Lead',
    start: '2009-10-16',
    time: '01:45',
    salary: 236064,
    country: 'Peru',
    office: 'Boston',
    office5: 'Delhi',
    height: 179.53,
  },
  {
    id: 4,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    start: '2014-06-30',
    time: '02:17',
    salary: 338985,
    country: 'Peru',
    office: 'Chengdu',
    office5: 'Dallas-Fort Worth',
    height: 190.11,
  },
];

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary',
    render: (d) => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const App: React.FC = () => (
  <Table keygen='id' width={1500} columns={columns} data={data} cellSelectable />
);

export default App;

```
### 单元格选中
通过 cellSelectable 属性来启用 ctrl/cmd + click 选中单元格
```tsx
/**
 * cn - 单元格选中
 *    -- 通过 cellSelectable 属性来启用 ctrl/cmd + click 选中单元格
 * en - Cell selectable
 *    -- whether to enable ctrl/cmd + click check
 */
import React from 'react';
import { Table, TYPE } from 'shineout';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    start: '2012-01-29',
    time: '01:42',
    salary: 115777,
    country: 'Reunion',
    office: 'Miami',
    office5: 'Istanbul',
    height: 113.74,
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    start: '2007-09-04',
    time: '03:26',
    salary: 396093,
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
    office5: 'Shenzhen',
    height: 82.13,
  },
  {
    id: 3,
    firstName: 'Dylan',
    lastName: 'Ratke',
    position: 'Development Lead',
    start: '2009-10-16',
    time: '01:45',
    salary: 236064,
    country: 'Peru',
    office: 'Boston',
    office5: 'Delhi',
    height: 179.53,
  },
  {
    id: 4,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    start: '2014-06-30',
    time: '02:17',
    salary: 338985,
    country: 'Peru',
    office: 'Chengdu',
    office5: 'Dallas-Fort Worth',
    height: 190.11,
  },
];

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary($)',
    align: 'right',
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const App: React.FC = () => (
  <Table keygen='id' width={1500} columns={columns} data={data} cellSelectable />
);

export default App;

```
### 拖动行
通过 rowEvents 属性来自定义拖拽事件
```tsx
/**
 * cn - 拖动行
 *    -- 通过 rowEvents 属性来自定义拖拽事件
 * en - drag row
 *    -- customize drag events through the rowEvents property
 */
import React, { useState, useRef, useCallback } from 'react';
import { Table, TYPE } from 'shineout';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    exampleDragable: {
      cursor: 'move',
    },
    exampleDragIn: {
      '& td': {
        borderBottom: '2px dashed #197AFA !important',
      },
    },
  },
  { name: 'table-example-drag' },
);

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    start: '2012-01-29',
    time: '01:42',
    salary: 115777,
    country: 'Reunion',
    office: 'Miami',
    office5: 'Istanbul',
    height: 113.74,
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    start: '2007-09-04',
    time: '03:26',
    salary: 396093,
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
    office5: 'Shenzhen',
    height: 82.13,
  },
  {
    id: 3,
    firstName: 'Dylan',
    lastName: 'Ratke',
    position: 'Development Lead',
    start: '2009-10-16',
    time: '01:45',
    salary: 236064,
    country: 'Peru',
    office: 'Boston',
    office5: 'Delhi',
    height: 179.53,
  },
  {
    id: 4,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    start: '2014-06-30',
    time: '02:17',
    salary: 338985,
    country: 'Peru',
    office: 'Chengdu',
    office5: 'Dallas-Fort Worth',
    height: 190.11,
  },
];

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary($)',
    align: 'right',
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const findNearestDOM = (el: HTMLElement, tagName: string) => {
  let node: any = el;
  while (node.tagName !== tagName && node.tagName !== 'BODY') {
    node = node.parentNode;
  }
  return node;
};
const findIndex = (el: HTMLElement) => {
  const tbody = findNearestDOM(el, 'TBODY');
  const nodes = Array.prototype.slice.call(tbody.children);

  return nodes.indexOf(el);
};

const App: React.FC = () => {
  const [d, setD] = useState(data);
  const classes = useStyles();
  const [target, setTarget] = useState<number | null>();
  const ref = useRef<{
    startIndex?: number;
    dragging?: boolean;
    current: { dragging?: boolean; startIndex?: number };
  }>({ current: {} });

  const dragStartHandler = useCallback((e: React.DragEvent) => {
    if (ref.current.dragging) return;
    ref.current.dragging = true;
    ref.current.startIndex = findIndex(e.target as HTMLElement);
  }, []);

  const dragEnterHandler = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const tr = findNearestDOM(e.target as HTMLElement, 'TR');
    const index = findIndex(tr);
    setTarget(index);
  }, []);

  const dragOverHandler = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const dragEndHandler = useCallback((e: React.DragEvent) => {
    console.log('dragEnd', e.target);
    ref.current.dragging = false;
    setTarget(null);
  }, []);

  const dropHandler = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const tr = findNearestDOM(e.target as HTMLTableRowElement, 'TR');
      const start = ref.current.startIndex;
      const end = findIndex(tr);
      if (start === end) return;
      const source = d[start!];
      const r = [...d];
      console.log(start, end);
      r.splice(start!, 1);
      r.splice(end, 0, source);
      setD(r);
    },
    [d],
  );

  return (
    <Table
      data={d}
      keygen='id'
      cellSelectable
      columns={columns}
      rowClassName={(_row, index) =>
        `${index === target ? classes.exampleDragIn : ''} ${classes.exampleDragable}`
      }
      rowEvents={{
        draggable: true,
        onDrop: dropHandler,
        onDragEnd: dragEndHandler,
        onDragOver: dragOverHandler,
        onDragStart: dragStartHandler,
        onDragEnter: dragEnterHandler,
      }}
    />
  );
};

export default App;

```
### 句柄拖拽
通过 rowEvents 属性来自定义拖拽事件
```tsx
/**
 * cn - 句柄拖拽
 *    -- 通过 rowEvents 属性来自定义拖拽事件
 * en - handle drag
 *    -- customize drag events through the rowEvents property
 */
import React, { useState, useRef, useCallback } from 'react';
import { Table, TYPE } from 'shineout';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    exampleDragIn: {
      '& td': {
        borderBottom: '2px dashed #197AFA !important',
      },
    },
  },
  { name: 'table-example-drag' },
);

let canDrag = false;

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    start: '2012-01-29',
    time: '01:42',
    salary: 115777,
    country: 'Reunion',
    office: 'Miami',
    office5: 'Istanbul',
    height: 113.74,
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    start: '2007-09-04',
    time: '03:26',
    salary: 396093,
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
    office5: 'Shenzhen',
    height: 82.13,
  },
  {
    id: 3,
    firstName: 'Dylan',
    lastName: 'Ratke',
    position: 'Development Lead',
    start: '2009-10-16',
    time: '01:45',
    salary: 236064,
    country: 'Peru',
    office: 'Boston',
    office5: 'Delhi',
    height: 179.53,
  },
  {
    id: 4,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    start: '2014-06-30',
    time: '02:17',
    salary: 338985,
    country: 'Peru',
    office: 'Chengdu',
    office5: 'Dallas-Fort Worth',
    height: 190.11,
  },
];

const columns: TableColumnItem[] = [
  {
    title: '',
    render: () => {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            minHeight: '14px',
          }}
        >
          <span
            style={{ cursor: 'move', height: '14px', lineHeight: 1 }}
            onMouseEnter={() => {
              canDrag = true;
            }}
            onMouseLeave={() => {
              canDrag = false;
            }}
          >
            <svg
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M16 17C17.1046 17 18 17.8954 18 19C18 20.1046 17.1046 21 16 21C14.8954 21 14 20.1046 14 19C14 17.8954 14.8954 17 16 17ZM8 17C9.10457 17 10 17.8954 10 19C10 20.1046 9.10457 21 8 21C6.89543 21 6 20.1046 6 19C6 17.8954 6.89543 17 8 17ZM16 10C17.1046 10 18 10.8954 18 12C18 13.1046 17.1046 14 16 14C14.8954 14 14 13.1046 14 12C14 10.8954 14.8954 10 16 10ZM8 10C9.10457 10 10 10.8954 10 12C10 13.1046 9.10457 14 8 14C6.89543 14 6 13.1046 6 12C6 10.8954 6.89543 10 8 10ZM16 3C17.1046 3 18 3.89543 18 5C18 6.10457 17.1046 7 16 7C14.8954 7 14 6.10457 14 5C14 3.89543 14.8954 3 16 3ZM8 3C9.10457 3 10 3.89543 10 5C10 6.10457 9.10457 7 8 7C6.89543 7 6 6.10457 6 5C6 3.89543 6.89543 3 8 3Z'
                fill='#B3B7C1'
              />
            </svg>
          </span>
        </div>
      );
    },
    width: 40,
  },
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary($)',
    align: 'right',
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const findNearestDOM = (el: HTMLElement, tagName: string) => {
  let node: any = el;
  while (node.tagName !== tagName && node.tagName !== 'BODY') {
    node = node.parentNode;
  }
  return node;
};
const findIndex = (el: HTMLElement) => {
  const tbody = findNearestDOM(el, 'TBODY');
  const nodes = Array.prototype.slice.call(tbody.children);

  return nodes.indexOf(el);
};

const App: React.FC = () => {
  const [d, setD] = useState(data);
  const classes = useStyles();
  const [target, setTarget] = useState<number | null>();
  const ref = useRef<{
    startIndex?: number;
    dragging?: boolean;
    current: { dragging?: boolean; startIndex?: number };
  }>({ current: {} });

  const dragStartHandler = useCallback((e: React.DragEvent) => {
    if (!canDrag) {
      e.preventDefault();
      return;
    }
    if (ref.current.dragging) return;
    ref.current.dragging = true;
    ref.current.startIndex = findIndex(e.target as HTMLElement);
  }, []);

  const dragEnterHandler = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const tr = findNearestDOM(e.target as HTMLElement, 'TR');
    const index = findIndex(tr);
    setTarget(index);
  }, []);

  const dragOverHandler = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const dragEndHandler = useCallback((e: React.DragEvent) => {
    console.log('dragEnd', e.target);
    ref.current.dragging = false;
    setTarget(null);
  }, []);

  const dropHandler = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const tr = findNearestDOM(e.target as HTMLTableRowElement, 'TR');
      const start = ref.current.startIndex;
      const end = findIndex(tr);
      if (start === end) return;
      const source = d[start!];
      const r = [...d];
      console.log(start, end);
      r.splice(start!, 1);
      r.splice(end, 0, source);
      setD(r);
    },
    [d],
  );

  return (
    <Table
      data={d}
      keygen='id'
      cellSelectable
      columns={columns}
      rowClassName={(_row, index) => `${index === target ? classes.exampleDragIn : ''}`}
      rowEvents={{
        draggable: true,
        onDrop: dropHandler,
        onDragEnd: dragEndHandler,
        onDragOver: dragOverHandler,
        onDragStart: dragStartHandler,
        onDragEnter: dragEnterHandler,
      }}
    />
  );
};

export default App;

```
### 底部总结栏
通过 summary 属性来渲染底部信息
```tsx
/**
 * cn - 底部总结栏
 *    -- 通过 summary 属性来渲染底部信息
 * en - footer summary
 *    -- Render bottom information through the summary property
 */
import React from 'react';
import { Table, TYPE } from 'shineout';

interface TableRowData {
  id: number;
  height: number;
  salary: number;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

type TableProps = TYPE.Table.Props<TableRowData, number[]>;

const data: TableRowData[] = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    salary: 115777,
    height: 113.74,
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    salary: 396093,
    height: 82.13,
  },
  {
    id: 3,
    firstName: 'Dylan',
    lastName: 'Ratke',
    salary: 236064,
    height: 179.53,
  },
  {
    id: 4,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    salary: 338985,
    height: 190.11,
  },
];

const columns: TableColumnItem[] = [
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'height', render: 'height' },
  {
    title: 'Salary($)',
    align: 'right',
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const summary: TableProps['summary'] = [
  [
    {
      render: () => <span>Total</span>,
    },
    {
      render: () => <span>{1347016}</span>,
    },
    {
      render: () => <span>{2341312}</span>,
    },
  ],
  [
    {
      render: () => <span>Balance</span>,
    },
    {
      render: () => <span>{1234}</span>,
      colSpan: 2,
    },
  ],
];

const App: React.FC = () => (
  <Table bordered data={data} keygen='id' cellSelectable columns={columns} summary={summary} />
);

export default App;

```
### 
固定列用法
```tsx
/**
 * cn -
 *    -- 固定列用法
 * en -
 *    -- Fixed column usage
 */
import React from 'react';
import { Table, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}
type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

type TableProps = TYPE.Table.Props<TableRowData, number[]>;

const data: TableRowData[] = user.fetchSync(20);

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 50 },
  {
    title: 'First Name',
    group: 'Name',
    render: 'firstName',
    width: 120,
  },
  {
    title: 'Last Name',
    fixed: 'left',
    group: 'Name',
    render: 'lastName',
    width: 120,
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary($)',
    align: 'right',
    fixed: 'right',
    width: 100,
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const summary: TableProps['summary'] = [
  [
    { render: () => <span>Summary</span>, colSpan: 3 },
    { render: () => <span>summary content</span>, colSpan: 4 },
    { render: () => <span>summary2</span> },
  ],
];

const App: React.FC = () => (
  <Table
    bordered
    keygen='id'
    width={1500}
    style={{ height: 300 }}
    columns={columns}
    data={data}
    summary={summary}
  />
);

export default App;

```
### 排序 (旧)
设置 column 的 sorter 属性标示此列需要排序
sorter 返回一个 sort 函数时，使用这个函数对数据进行内部排序
后端或自行排序用户自行处理，sorter 函数不要返回结果
```tsx
/**
 * cn - 排序 (旧)
 *    -- 设置 column 的 sorter 属性标示此列需要排序
 *    -- sorter 返回一个 sort 函数时，使用这个函数对数据进行内部排序
 *    -- 后端或自行排序用户自行处理，sorter 函数不要返回结果
 * en - Sorter (Out of date)
 *    -- Set the sorter property of column to indicate that this column can be sorted
 *    -- When the sorter returns a function, use this function to sort data internally
 *    -- Server-side or self-sorting is is handled by the user, do not return results
 */
import React from 'react';
import { Table, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = user.fetchSync(1000);

const columns: TableColumnItem[] = [
  {
    title: 'id',
    render: 'id',
    width: 80,
    sorter: (order) => (a, b) => {
      if (order === 'asc') return a.id - b.id;
      return b.id - a.id;
    },
  },
  {
    title: 'Name',
    fixed: 'left',
    render: (d) => `${d.firstName} ${d.lastName}`,
    width: 160,
    sorter: (order) => (a, b) => {
      if (order === 'asc') return a.firstName.localeCompare(b.firstName);
      return b.firstName.localeCompare(a.firstName);
    },
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
];

const App: React.FC = () => (
  <Table
    striped
    keygen='id'
    virtual
    data={data}
    width={1200}
    rowsInView={10}
    columns={columns}
    style={{ maxHeight: 400 }}
  />
);

export default App;

```
### 无数据
empty
```tsx
/**
 * cn - 无数据
 *    -- empty
 * en - empty
 *    -- empty
 */
import React from 'react';
import { Table, TYPE } from 'shineout';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = [];

const columns: TableColumnItem[] = [
  {
    title: 'id',
    render: 'id',
    width: 80,
    fixed: 'left',
  },
  {
    title: 'Name',
    fixed: 'left',
    render: (d) => `${d.firstName} ${d.lastName}`,
    width: 160,
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start', fixed: 'right' },
];

const App: React.FC = () => (
  <Table
    striped
    keygen='id'
    data={data}
    width={1200}
    rowsInView={10}
    columns={columns}
    style={{ height: 400 }}
  />
);

export default App;

```
### 隐藏表头
hideHeader 隐藏表头
```tsx
/**
 * cn - 隐藏表头
 *    -- hideHeader 隐藏表头
 * en - Hide headers
 *    -- set hideHeader to hide headers
 */
import React from 'react';
import { Table, TYPE } from 'shineout';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    start: '2012-01-29',
    time: '01:42',
    salary: 115777,
    country: 'Reunion',
    office: 'Miami',
    office5: 'Istanbul',
    height: 113.74,
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    start: '2007-09-04',
    time: '03:26',
    salary: 396093,
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
    office5: 'Shenzhen',
    height: 82.13,
  },
  {
    id: 3,
    firstName: 'Dylan',
    lastName: 'Ratke',
    position: 'Development Lead',
    start: '2009-10-16',
    time: '01:45',
    salary: 236064,
    country: 'Peru',
    office: 'Boston',
    office5: 'Delhi',
    height: 179.53,
  },
  {
    id: 4,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    start: '2014-06-30',
    time: '02:17',
    salary: 338985,
    country: 'Peru',
    office: 'Chengdu',
    office5: 'Dallas-Fort Worth',
    height: 190.11,
  },
];

const columns: TableColumnItem[] = [
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

export default () => {
  return (
    <div>
      <Table keygen='id' columns={columns} data={data} hideHeader bordered virtual />
    </div>
  );
};

```
### 禁用hover
set hover to false
```tsx
/**
 * cn - 禁用hover
 *    -- set hover to false
 * en - Disable hover
 *    -- set hover to false
 */
import React from 'react';
import { Table, TYPE } from 'shineout';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    start: '2012-01-29',
    time: '01:42',
    salary: 115777,
    country: 'Reunion',
    office: 'Miami',
    office5: 'Istanbul',
    height: 113.74,
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    start: '2007-09-04',
    time: '03:26',
    salary: 396093,
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
    office5: 'Shenzhen',
    height: 82.13,
  },
  {
    id: 3,
    firstName: 'Dylan',
    lastName: 'Ratke',
    position: 'Development Lead',
    start: '2009-10-16',
    time: '01:45',
    salary: 236064,
    country: 'Peru',
    office: 'Boston',
    office5: 'Delhi',
    height: 179.53,
  },
  {
    id: 4,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    start: '2014-06-30',
    time: '02:17',
    salary: 338985,
    country: 'Peru',
    office: 'Chengdu',
    office5: 'Dallas-Fort Worth',
    height: 190.11,
  },
];

const columns: TableColumnItem[] = [
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

export default () => {
  return (
    <div>
      <Table keygen='id' columns={columns} data={data} bordered virtual hover={false} />
    </div>
  );
};

```
### 列对齐方式
columns 对象增加 align 属性，设置列对齐方式
```tsx
/**
 * cn - 列对齐方式
 *    -- columns 对象增加 align 属性，设置列对齐方式
 * en - Column align
 *    -- Set the align property of the columns object to set the column alignment
 */
import React from 'react';
import { Table, TYPE } from 'shineout';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    start: '2012-01-29',
    time: '01:42',
    salary: 115777,
    country: 'Reunion',
    office: 'Miami',
    office5: 'Istanbul',
    height: 113.74,
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    start: '2007-09-04',
    time: '03:26',
    salary: 396093,
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
    office5: 'Shenzhen',
    height: 82.13,
  },
  {
    id: 3,
    firstName: 'Dylan',
    lastName: 'Ratke',
    position: 'Development Lead',
    start: '2009-10-16',
    time: '01:45',
    salary: 236064,
    country: 'Peru',
    office: 'Boston',
    office5: 'Delhi',
    height: 179.53,
  },
  {
    id: 4,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    start: '2014-06-30',
    time: '02:17',
    salary: 338985,
    country: 'Peru',
    office: 'Chengdu',
    office5: 'Dallas-Fort Worth',
    height: 190.11,
  },
];

const columns: TableColumnItem[] = [
  {
    title: 'Name',
    render: (d) => `${d.firstName} ${d.lastName}`,
    align: 'right',
    className: 'hello',
    style: { color: 'red' },
  },
  { title: 'Country', render: 'country', align: 'center' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

export default () => {
  return (
    <div>
      <Table keygen='id' columns={columns} data={data} bordered virtual hover={false} />
    </div>
  );
};

```
## Guide
### 何时使用
需展示的信息内容较多，为方便用户浏览和获取批量数据时；\n 需要对数据进行排序、搜索、筛选、分页等操作时；\n 需要对数据进行归纳、分类，便于用户快速了解其中的差异与变化、关联和区别时
### 组件搭配使用
与筛选、搜索搭配使用，按一定的数据维度进行筛选
### 组件常见用法
当单元格字段较长时，可设置字段超过一定行数打点处理，鼠标悬停时气泡显示全部内容
操作列中，空间不足情况下可设置展示 2 个高频操作，其余做隐藏处理
### 推荐/慎用示例
关于列宽：不要出现有的列过分预留宽度，有的列宽小到要换行或省略信息的情况
### 内容样式举例
1、数字、金额保留两位小数并右对齐，内容单位统一的情况下，将单位在表头统一显示
2、年月日时分尽量保证不换行，不得已要换行时，需保证年月日在同一行，时分在同一行


# Tabs
用来分隔内容上有关联但属于不同类别的数据集合，具有全局导航的作用
## API
### Tabs.Panel
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|id|string / number ||选填，默认为 index|
|tab|ReactNode|index|标签标题内容|
|disabled|boolean |false|是否禁用|
|children|ReactNode||Panel 内容|
|splitColor|string ||分割线颜色,仅在shape=line的时候生效|
|color|string ||标签页文字颜色，仅当 shape 为 \"card\" 时生效|
|activeBackground|string ||背景色，会覆盖 Tabs 的activeBackground|
### Tabs
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|lazy|boolean |true|是否开启懒加载|
|shape|\"button\" / \"line\" / \"bordered\" / \"card\" / \"dash\" / \"fill\" |\"card\"|Shape 不为空时，activeBackground 等颜色参数将会无效，当shape为bordered时，指向card|
|children|ReactNode||子元素,必须为 Panel 元素|
|extra|ReactNode||额外内容|
|splitColor|string ||分割线颜色,替代原有border属性|
|hideSplit|boolean ||是否隐藏分割线|
|collapsible|boolean ||是否可折叠|
|defaultCollapsed|boolean ||默认折叠状态,当 collapsible 设置为 true 时生效|
|autoFill|boolean ||自动填充内容区域,当position为left-top, right-top且shape为非button和fill时默认开启，其他情况需手动控制|
|switchToTop|boolean ||切换 tab 将自动滚动到 Tabs|
|sticky|number / boolean / StickyProps ||开启头部附着|
|position|/ \"top-left\"  / \"top-right\"  / \"bottom-left\"  / \"bottom-right\"  / \"left-top\"  / \"left-bottom\"  / \"right-top\"  / \"right-bottom\" ||选项卡位置|
|activeBackground|string ||选中标签背景色|
|inactiveBackground|string ||未选中标签背景色|
|tabBarStyle|CSSProperties ||tab bar 的样式对象|
|onChange|((key: string / number) => void) ||标签选中时触发回调事件|
|color|string ||标签页文字颜色，仅当 shape 为 \"card\" 时生效|
|active|string / number ||当前选中标签页（受控）|
|defaultActive|string / number |0|默认选中标签页（非受控）|
## Example
### 基本用法
选项卡的基本用法
```tsx
/**
 * cn - 基本用法
 *    -- 选项卡的基本用法
 * en - Basic
 *    -- Basic usage of Tabs
 */
import { Tabs } from 'shineout';

export default () => {
  const tabs = [];
  for (let i = 0; i < 3; i++) {
    tabs.push({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` });
  }
  return (
    <div style={{ height: 100 }}>
      <Tabs shape='line' defaultActive={0}>
        {tabs.map((tab, index) => {
          return (
            <Tabs.Panel key={index} tab={tab.title}>
              <div style={{ padding: 16, height: '100%', fontSize: 14 }}>{tab.content}</div>
            </Tabs.Panel>
          );
        })}
      </Tabs>
    </div>
  );
};

```
### 不同样式
选项卡有三种样式，可通过 <span>shape</span> 属性设置，card 卡片，line 线条，button 按钮, fill 填充, dash 短线
```tsx
/**
 * cn - 不同样式
 *    -- 选项卡有三种样式，可通过 `shape` 属性设置，card 卡片，line 线条，button 按钮, fill 填充, dash 短线
 * en - Shape
 *    -- There are three shapes for tabs, you can set the `shape` property to change it
 */
import { useState } from 'react';
import { Tabs, Radio } from 'shineout';

export default () => {
  const [shape, setShape] = useState('line');
  const shapes = ['line', 'card', 'button', 'fill', 'dash'];

  const tabs = [];
  for (let i = 0; i < 3; i++) {
    tabs.push({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` });
  }

  return (
    <div>
      <Radio.Group
        keygen
        data={shapes}
        value={shape}
        onChange={setShape}
        style={{ marginBottom: 24 }}
      />
      <div style={{ height: 100 }}>
        <Tabs shape={shape as any} defaultActive={0}>
          {tabs.map((tab, index) => {
            return (
              <Tabs.Panel key={index} tab={tab.title}>
                <div style={{ padding: 16, height: '100%', fontSize: 14 }}>{tab.content}</div>
              </Tabs.Panel>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

```
### 不同位置
通过设置 <span>position</span> 属性来控制选项卡的位置
当 <span>shape</span> 为 button 或 fill 时，仅支持 top-left, top-right, bottom-left, bottom-right 四个位置
目前支持的位置有 top-left, top-right, bottom-left, bottom-right, left-top, right-top 六种布局
```tsx
/**
 * cn - 不同位置
 *    -- 通过设置 `position` 属性来控制选项卡的位置
 *    -- 当 `shape` 为 button 或 fill 时，仅支持 top-left, top-right, bottom-left, bottom-right 四个位置
 *    -- 目前支持的位置有 top-left, top-right, bottom-left, bottom-right, left-top, right-top 六种布局
 * en - Position
 *    -- Set the position of the tab through the `position` property. When the `shape` is button or fill, only the four positions of top-left, top-right, bottom-left, bottom-right are supported
 *    -- Currently supported positions are top-left, top-right, bottom-left, bottom-right, left-top, right-top
 */
import { useState } from 'react';
import { Tabs, Radio, Form } from 'shineout';

export default () => {
  const [shape, setShape] = useState('line');
  const [position, setPosition] = useState('top-left');
  const shapes = ['line', 'card', 'button', 'fill', 'dash'];
  const positions = [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
    'left-top',
    'right-top',
  ];

  const tabs = [];
  for (let i = 0; i < 3; i++) {
    tabs.push({
      title: `Tab ${i + 1}`,
      content:
        i === 1
          ? 'Joy in living comes from having fine emotions, trusting them, giving them the freedom of a bird in the open. Joy in living can never be assumed as a pose, or put on from the outside as a mask. People who have this joy do not need to talk about it; they radiate it. They just live out their joy and let it splash its sunlight and glow into other lives as naturally as bird sings. We can never get it by working for it directly. It comes, like happiness, to those who are aiming at something higher. It is a byproduct of great, simple living. The joy of living comes from what we put into living, not from what we seek to get from it. As you travel through life there are always those times when decisions just have to be made when the choices are hard, and solutions seem scarce and the rain seems to soak your parade!Joy in living comes from having fine emotions, trusting them, giving them the freedom of a bird in the open. Joy in living can never be assumed as a pose, or put on from the outside as a mask. People who have this joy do not need to talk about it; they radiate it. They just live out their joy and let it splash its sunlight and glow into other lives as naturally as bird sings. We can never get it by working for it directly. It comes, like happiness, to those who are aiming at something higher. It is a byproduct of great, simple living. The joy of living comes from what we put into living, not from what we seek to get from it. As you travel through life there are always those times when decisions just have to be made when the choices are hard, and solutions seem scarce and the rain seems to soak your parade!'
          : `Content of Tab ${i + 1}`,
    });
  }

  return (
    <div>
      <Form labelWidth={65} labelAlign='left'>
        <Form.Item label='Position:' style={{ marginBottom: 16 }}>
          <Radio.Group keygen data={positions} value={position} onChange={setPosition} />
        </Form.Item>

        <Form.Item label='Type:' style={{ marginBottom: 24 }}>
          <Radio.Group keygen data={shapes} value={shape} onChange={setShape} />
        </Form.Item>
      </Form>

      <div style={{ height: 150 }}>
        <Tabs shape={shape as any} position={position as any} autoFill defaultActive={0}>
          {tabs.map((tab, index) => {
            return (
              <Tabs.Panel key={index} tab={tab.title} disabled={index === tabs.length - 1}>
                <div style={{ padding: 16, fontSize: 14 }}>{tab.content}</div>
              </Tabs.Panel>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

```
### 受控
通过设置 <span>active</span> 属性来控制选项卡的激活状态
```tsx
/**
 * cn - 受控
 *    -- 通过设置 `active` 属性来控制选项卡的激活状态
 * en - Control
 *    -- Set the `active` property to control the active state of the tab
 */
import { useState } from 'react';
import { Tabs, Radio } from 'shineout';

export default () => {
  const [active, setActive] = useState<string | number>(1);
  const actives = [0, 1, 2];
  const tabs = [];

  for (let i = 0; i < 3; i++) {
    tabs.push({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` });
  }

  return (
    <div>
      <Radio.Group
        keygen
        data={actives}
        value={active}
        renderItem={(v) => `Tab ${v + 1}`}
        onChange={setActive}
        style={{ marginBottom: 24 }}
      />
      <div style={{ height: 100 }}>
        <Tabs shape='line' active={active} onChange={setActive}>
          {tabs.map((tab, index) => {
            return (
              <Tabs.Panel key={index} tab={tab.title}>
                <div style={{ padding: 16, height: '100%', fontSize: 14 }}>{tab.content}</div>
              </Tabs.Panel>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

```
### 自动填充
设置 <span>autoFill</span> 属性后，选项卡会自动填充父元素的宽度
```tsx
/**
 * cn - 自动填充
 *    -- 设置 `autoFill` 属性后，选项卡会自动填充父元素的宽度
 * en - autoFill
 *    -- Set the `autoFill` property, the tab will automatically fill the width of the parent element
 */
import { Tabs } from 'shineout';

export default () => {
  const tabs = [];
  for (let i = 0; i < 3; i++) {
    tabs.push({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` });
  }

  return (
    <div style={{ height: 150 }}>
      <Tabs shape='line' autoFill defaultActive={0}>
        {tabs.map((tab, index) => {
          return (
            <Tabs.Panel key={index} tab={tab.title}>
              <div
                style={{
                  padding: 12,
                  height: '100%',
                  fontSize: 14,
                  lineHeight: '20px',
                }}
              >
                Joy in living comes from having fine emotions, trusting them, giving them the
                freedom of a bird in the open. Joy in living can never be assumed as a pose, or put
                on from the outside as a mask. People who have this joy do not need to talk about
                it; they radiate it. They just live out their joy and let it splash its sunlight and
                glow into other lives as naturally as bird sings. We can never get it by working for
                it directly. It comes, like happiness, to those who are aiming at something higher.
                It is a byproduct of great, simple living. The joy of living comes from what we put
                into living, not from what we seek to get from it. As you travel through life there
                are always those times when decisions just have to be made when the choices are
                hard, and solutions seem scarce and the rain seems to soak your parade!
              </div>
            </Tabs.Panel>
          );
        })}
      </Tabs>
    </div>
  );
};

```
### 额外内容
通过配置 <span>extra</span> 属性，允许传入额外的内容
```tsx
/**
 * cn - 额外内容
 *    -- 通过配置 `extra` 属性，允许传入额外的内容
 * en - extra
 *    -- Set the `extra` property to add extra content
 */
import { Tabs, Button } from 'shineout';

export default () => {
  const tabs = [];
  for (let i = 0; i < 3; i++) {
    tabs.push({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` });
  }

  const renderExtra = () => {
    return (
      <Button mode='text' type='primary'>
        extra operation
      </Button>
    );
  };

  return (
    <div style={{ height: 100 }}>
      <Tabs shape='line' defaultActive={0} extra={renderExtra()}>
        {tabs.map((tab, index) => {
          return (
            <Tabs.Panel key={index} tab={tab.title}>
              <div style={{ padding: 16, height: '100%', fontSize: 14 }}>{tab.content}</div>
            </Tabs.Panel>
          );
        })}
      </Tabs>
    </div>
  );
};

```
### 滚动
当 Tabs 数量过多时，将自动开启滚动功能
```tsx
/**
 * cn - 滚动
 *    -- 当 Tabs 数量过多时，将自动开启滚动功能
 * en - Scroll
 *    -- When there are too many Tabs, the scroll function will be automatically enabled
 */
import { Tabs } from 'shineout';

export default () => {
  const tabs = [];
  for (let i = 0; i < 100; i++) {
    tabs.push({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` });
  }
  return (
    <div style={{ height: 100 }}>
      <Tabs shape='line' defaultActive={0}>
        {tabs.map((tab, index) => {
          return (
            <Tabs.Panel key={index} tab={tab.title}>
              <div style={{ padding: 16, height: '100%', fontSize: 14 }}>{tab.content}</div>
            </Tabs.Panel>
          );
        })}
      </Tabs>
    </div>
  );
};

```
### 折叠
通过设置 <span>collapsible</span> 属性折叠面板区域
```tsx
/**
 * cn - 折叠
 *    -- 通过设置 `collapsible` 属性折叠面板区域
 * en - Collapsible
 *    -- Set the `collapsible` property to collapse the panel area
 */
import { Tabs } from 'shineout';

export default () => {
  const renderIcon = () => {
    return (
      <svg
        width='14'
        height='14'
        viewBox='0 0 14 14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M9.33333 0.583374C9.88789 0.583374 10.4468 1.11488 10.4964 1.67055L10.5 1.75004V2.33337H11.0833C11.6379 2.33337 12.1968 2.86488 12.2464 3.42055L12.25 3.50004V12.8334C12.25 13.2408 11.8466 13.5155 11.4748 13.3844L11.4132 13.3587L7.875 11.6515L4.33683 13.3587C3.99148 13.5254 3.59669 13.3191 3.51518 12.9676L3.50366 12.9L3.5 12.8334V11.168L2.58683 11.6087C2.24148 11.7754 1.84669 11.5691 1.76518 11.2176L1.75366 11.15L1.75 11.0834V1.75004C1.75 1.209 2.31633 0.637838 2.84192 0.587033L2.91667 0.583374H9.33333ZM10.7917 3.50004H4.95833C4.81515 3.50004 4.69606 3.60322 4.67137 3.73928L4.66667 3.79171V11.4396C4.66667 11.4834 4.67657 11.5268 4.69564 11.5663C4.75786 11.6953 4.90254 11.7577 5.03582 11.7208L5.08508 11.7022L7.47075 10.5508L7.6215 10.4785C7.7359 10.4233 7.86383 10.4075 7.98596 10.4312L8.05839 10.4501L8.11974 10.4749L8.13701 10.4826L10.298 11.525L10.6649 11.7022C10.7045 11.7213 10.7478 11.7312 10.7917 11.7312C10.9349 11.7312 11.0539 11.628 11.0786 11.492L11.0833 11.4396V3.79171C11.0833 3.63062 10.9527 3.50004 10.7917 3.50004ZM9.04167 1.75004H3.20833C3.06515 1.75004 2.94606 1.85322 2.92137 1.98928L2.91667 2.04171V9.68956C2.91667 9.73345 2.92657 9.77677 2.94564 9.8163C3.00787 9.94526 3.15254 10.0077 3.28582 9.9708L3.33508 9.95225L3.5 9.87237V3.50004C3.5 2.96452 4.05684 2.38834 4.59063 2.33707L4.66667 2.33337H9.33333V2.04171C9.33333 1.89852 9.23016 1.77944 9.09409 1.75474L9.04167 1.75004Z'
          fill='#666C7C'
        />
      </svg>
    );
  };

  return (
    <div>
      <Tabs shape='line' defaultActive={0} collapsible>
        <Tabs.Panel tab='Tab 1'>
          <div style={{ padding: 16, fontSize: 14 }}>
            Joy in living comes from having fine emotions, trusting them, giving them the freedom of
            a bird in the open. Joy in living can never be assumed as a pose, or put on from the
            outside as a mask. People who have this joy do not need to talk about it; they radiate
            it. They just live out their joy and let it splash its sunlight and glow into other
            lives as naturally as bird sings. We can never get it by working for it directly. It
            comes, like happiness, to those who are aiming at something higher. It is a byproduct of
            great, simple living. The joy of living comes from what we put into living, not from
            what we seek to get from it. As you travel through life there are always those times
            when decisions just have to be made when the choices are hard, and solutions seem scarce
            and the rain seems to soak your parade!
          </div>
        </Tabs.Panel>
        <Tabs.Panel
          tab={
            <span style={{ marginLeft: 4, display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: 4 }}>Tab2</span>
              {renderIcon()}
            </span>
          }
        >
          <div style={{ padding: 16, fontSize: 14 }}>Content of Tab 2</div>
        </Tabs.Panel>
        <Tabs.Panel
          tab={
            <span style={{ marginLeft: 4, display: 'flex', alignItems: 'center' }}>
              {renderIcon()}
              <span style={{ marginLeft: 4 }}>Tab3</span>
            </span>
          }
        >
          <div style={{ padding: 16, fontSize: 14 }}>Content of Tab 3</div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

```
### 头部附着
sticky 属性会开启头部附着功能；sticky=true时，开启附着在顶部；sticky=number时，代表附着顶部，且距离顶部的间距；sticky=StickyProps时，参数将传入 Sticky 组件内；switchToTop 属性支持是否自动滚动到Tabs
```tsx
/**
 * cn - 头部附着
 *    -- sticky 属性会开启头部附着功能；sticky=true时，开启附着在顶部；sticky=number时，代表附着顶部，且距离顶部的间距；sticky=StickyProps时，参数将传入 Sticky 组件内；switchToTop 属性支持是否自动滚动到Tabs
 * en - Sticky header
 *    -- The sticky property will enable the sticky header feature; when sticky=true, the header will be attached to the top; when sticky=number, it means that the header is attached to the top and the distance from the top; when sticky=StickyProps, the parameters will be passed to the Sticky component; the switchToTop property supports whether to automatically scroll to Tabs
 */
import React, {useRef} from 'react'
import { Tabs } from 'shineout';

const App: React.FC = () => {
  const Element = useRef(null);
  const tabs = [];
  for (let i = 0; i < 3; i++) {
    tabs.push({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` });
  }

  return (
    <div style={{ position: 'relative', zIndex: 0 }}>
      <div id='sticky_element' ref={Element} style={{ height: 400, overflow: 'auto' }}>
        <div
          style={{
            height: 1600,
            backgroundColor: '#f4f5f8',
            backgroundImage:
              'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), ' +
              'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px',
          }}
        >
          <div style={{ height: 200 }}></div>
          <Tabs shape='line' defaultActive={0} sticky style={{ backgroundColor: '#fff' }} inactiveBackground='#fff'>
            {tabs.map((tab, index) => {
              return (
                <Tabs.Panel key={index} tab={tab.title}>
                  <div style={{ padding: 16, height: 100, fontSize: 14 }}>{tab.content}</div>
                </Tabs.Panel>
              );
            })}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default App;
```
## Guide
### 何时使用
当页面的内容信息量较多时可以用标签页对其分类，一方面可以提升查找信息的效率，另一方面可以精简用户单次获取到的信息量，让用户更能够专注于当前已显示的内容
### 与布局相关
遇到页面多层级时，可以将不同样式、不同方向的标签页进行组合来让页面层次更加清晰
### 推荐/慎用示例
1、建议结合业务场景，给予标签足够的宽度和高度，避免限制宽度过窄导致截断标签文案，或标签点击面积过小
2、当标签过多无法在一行展示完整时，不要让选项卡换行，也不要让选项卡内的文字换行，可以考虑使用滑动展示


# Tag
标签是一种灵活、常用的分类方式，对关键词进行标记、分类或选择
## API
### Tag
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|style|CSSProperties ||自定义样式|
|className|string ||自定义类名|
|size|\"small\" / \"large\" / \"default\"|\"default\"|不同尺寸|
|mode|\"bright\" / \"outline\" / \"fill\" / \"brightOutline\" |\"bright\"|标签样式|
|disabled|boolean |false|是否禁用|
|color|/ \"default\"  / \"info\"  / \"success\"  / \"warning\"  / \"danger\"  / \"orange\"  / \"purple\"  / \"cyan\"  / \"magenta\"  / \"indigo\"  / \"tangerine\"  / \"neon\" |\"default\"|标签颜色,代替原有type属性，支持更多色系|
|shape|\"rounded\" |\"default\"|标签形状|
|backgroundColor|string ||背景色,可以自行的设置标签的背景色|
|children|ReactNode||内容，文字或react组件|
|onCompleted|((value: string) => void) ||Tag 编辑完成时触发该事件（children 必须为 string）|
|onClick|((e: MouseEvent<HTMLDivElement, MouseEvent>) => void) ||点击 tag 事件|
|onClose|boolean / ((e: MouseEvent<HTMLDivElement, MouseEvent>) => void / Promise<any>) ||当 onClose 为空时，不显示关闭。如果需要关闭又不需要处理回调，设置为 true 即可|
|closable|boolean / \"only\" |||
|onKeyUp|((e: KeyboardEvent<HTMLInputElement>) => void) ||可编辑输入框 keyUp 事件|
|onEnterPress|((value: string, e: KeyboardEvent<HTMLInputElement>) => void) ||可编辑输入框回车事件|
### Tag.Input
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|style|CSSProperties ||自定义样式|
|className|string ||自定义类名|
|size|\"small\" / \"large\" / \"default\"|\"default\"|不同尺寸|
|onKeyUp|((e: KeyboardEvent<HTMLInputElement>) => void) ||KeyUp 事件回调|
|onEnterPress|((value: string, e: KeyboardEvent<HTMLInputElement>) => void) ||EnterPress 事件回调|
|onFocus|((e: FocusEvent<HTMLInputElement, Element>) => void) ||Focus 事件回调|
|onBlur|((value: string, e: FocusEvent<HTMLInputElement, Element>) => void) ||Blur 事件回调|
|onChange|((value?: string ) => void) ||Value 改变回调|
|value|string ||受控|
## Example
### 基本用法
标签常用的 5 种基本功能，默认、信息、危险、警告、成功
注意，<span>type</span> 属性将弃用，请使用 <span>color</span> 属性
```tsx
/**
 * cn - 基本用法
 *    -- 标签常用的 5 种基本功能，默认、信息、危险、警告、成功
 *    -- 注意，`type` 属性将弃用，请使用 `color` 属性
 * en - Base
 *    -- The five basic functions of the tag, default, info, danger, warning, success
 *   -- Note that the `type` property will be deprecated, please use the `color` property
 */

import { Tag } from 'shineout';
export default () => {
  const TagColor = ['default', 'info', 'danger', 'warning', 'success'];

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div>
      {TagColor.map((item, index) => (
        <Tag key={index} color={item as any}>
          {capitalizeFirstLetter(item)}
        </Tag>
      ))}
    </div>
  );
};

```
### 标签尺寸
标签尺寸分为 小、中、大 3 种
```tsx
/**
 * cn - 标签尺寸
 *    -- 标签尺寸分为 小、中、大 3 种
 * en - Size
 *    -- The size of the tag is divided into small, default and large
 */

import { Tag } from 'shineout';
export default () => {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Tag size='small'>Small</Tag>
        <Tag>Default</Tag>
        <Tag size='large'>Large</Tag>
      </div>
      <div>
        <Tag size='small' onClose>
          Small
        </Tag>
        <Tag onClose>Default</Tag>
        <Tag size='large' onClose>
          Large
        </Tag>
      </div>
    </div>
  );
};

```
### 标签样式
标签样式分为 亮色、填充、线框、亮色线框 4 种
```tsx
/**
 * cn - 标签样式
 *    -- 标签样式分为 亮色、填充、线框、亮色线框 4 种
 * en - Mode
 *    -- The mode of the tag is divided into bright, fill, outline, brightOutline line 4 kinds
 */

import { Tag } from 'shineout';
export default () => {
  const TagColor = ['default', 'info', 'danger', 'warning', 'success'];
  const TagMode = ['bright', 'fill', 'outline', 'brightOutline'];

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div>
      {TagMode.map((mode, midx) => {
        return (
          <div key={midx} style={{ marginBottom: midx === TagMode.length - 1 ? 0 : 24 }}>
            {TagColor.map((color, cidx) => (
              <Tag mode={mode as any} key={cidx} color={color as any}>
                {capitalizeFirstLetter(color)}
              </Tag>
            ))}
          </div>
        );
      })}
    </div>
  );
};

```
### 多色标签
除常用 5 种常用的基本功能色外，组件还提供了其他色系的标签
注意，<span>type</span> 属性将弃用，<span>color</span> 属性同样支持 type 同属性值的样式
```tsx
/**
 * cn - 多色标签
 *    -- 除常用 5 种常用的基本功能色外，组件还提供了其他色系的标签
 *    -- 注意，`type` 属性将弃用，`color` 属性同样支持 type 同属性值的样式
 * en - Color
 *    -- In addition to the five basic functions of the commonly used tag, the component also provides tags of other colors
 *    -- Note that the `type` property will be deprecated, and the `color` property also supports the style of the same property value as type
 */

import { Tag } from 'shineout';
export default () => {
  const TagColor = ['tangerine', 'magenta', 'purple', 'indigo', 'cyan', 'neon', 'lemon', 'orange'];
  const TagMode = ['bright', 'fill', 'outline', 'brightOutline'];

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div>
      {TagMode.map((mode, midx) => {
        return (
          <div key={midx} style={{ marginBottom: 24 }}>
            {TagColor.map((color, cidx) => (
              <Tag mode={mode as any} key={cidx} color={color as any}>
                {capitalizeFirstLetter(color)}
              </Tag>
            ))}
          </div>
        );
      })}
    </div>
  );
};

```
### 可删除和添加标签
通过数组生成tags，动态增改
```tsx
/**
 * cn - 可删除和添加标签
 *    -- 通过数组生成tags，动态增改
 * en - Delete and add tags
 *    -- Generate tags through arrays, dynamically increase and change
 */

import { useState } from 'react';
import { Tag } from 'shineout';
export default () => {
  const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3']);
  const [inputVisible, setInputVisible] = useState(false);

  const remove = (removedTag: string) => {
    const t = tags.filter((tag: string) => tag !== removedTag);
    setTags(t);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputBlur = (value: string) => {
    let newTags = tags;
    if (value && tags.indexOf(value) === -1) {
      newTags = [...tags, value];
    }
    setTags(newTags);
    setInputVisible(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', height: 24 }}>
        {tags.map((a) => (
          <Tag key={a} disabled={a === 'Tag 3' ? true : false} onClose={() => remove(a)}>
            {a}
          </Tag>
        ))}

        {inputVisible ? (
          <Tag.Input style={{ marginLeft: 8 }} onBlur={handleInputBlur} size='small' />
        ) : (
          <Tag
            style={{ cursor: 'pointer', borderStyle: 'dashed' }}
            onClick={showInput}
            mode='outline'
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ color: '#666C7C', marginRight: 4 }}>+ </div>
              <div>Add Tag</div>
            </div>
          </Tag>
        )}
      </div>
    </div>
  );
};

```
### 可编辑标签
通过设置 <span>onCompleted</span> 属性开启编辑模式，编辑完成后会调用该函数，参数为编辑后的值
```tsx
/**
 * cn - 可编辑标签
 *    -- 通过设置 `onCompleted` 属性开启编辑模式，编辑完成后会调用该函数，参数为编辑后的值
 * en - onCompleted
 *    -- Set the `onCompleted` property to enable edit mode, and the function will be called after editing is completed, and the parameter is the edited value
 */

import { useState } from 'react';
import { Tag } from 'shineout';
export default () => {
  const [value, setValue] = useState('Abc');

  return (
    <div>
      <Tag
        onCompleted={(val) => {
          setValue(val);
        }}
        onClose={() => {
          console.log('close');
        }}
      >
        {value}
      </Tag>
    </div>
  );
};

```
### 标签形状
通过设置 <span>shape</span> 属性可以设置标签的形状，可选值为 rounded 全圆角形
```tsx
/**
 * cn - 标签形状
 *    -- 通过设置 `shape` 属性可以设置标签的形状，可选值为 rounded 全圆角形
 * en - Shape
 *    -- The shape of the tag can be set by setting the `shape` property. The optional value is rounded
 */

import { Tag } from 'shineout';
export default () => {
  return (
    <div>
      <Tag>Default</Tag>
      <Tag shape='rounded'>Rounded</Tag>
    </div>
  );
};

```
## Guide
### 何时使用
当需要准确、具体地标记事物的属性和维度时；\n 便于用户分类查找、定位以及系统识别时
### 与布局相关
在页面中尽量避免一次展示过多的标签，如遇特殊情况建议最多展示权重较高的 3-5 个，并将其余标签收起，鼠标悬停查看
### 组件搭配使用
与图片搭配使用时注意不要在图片上堆砌太多标签，避免图片被遮挡
### 推荐/慎用示例
1、标签文字不宜过长，做到精简但又避免过渡精简导致用户产生疑惑
2、标签不宜添加过多，太多的标签会使用户不宜阅读和查找
3、同类型、同视觉权重的标签应尽量保持一致，避免标签颜色过多，同时颜色一致的标签尽量就近放置
4、当多个标签组合使用时，需与「布局组件」结合使用，防止换行时左边出现留白，产生与第一行对不齐的情况


# Textarea
用户可以在文本框内输入或编辑文字。
## API
### Textarea
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|value|string ||defaultValue 和 value 可以同时设置，defaultValue 会被value覆盖|
|onChange|((value: string) => void) ||值改变回调函数|
|defaultValue|string ||默认值  和 value 类型相同|
|onBlur|FocusEventHandler<Element> ||失去焦点后的回调|
|onFocus|FocusEventHandler<Element> ||focus 事件回调函数|
|onClick|MouseEventHandler<Element> ||click 事件回调函数|
|disabled|boolean |false|是否禁用|
|textareaRef|Ref<HTMLTextAreaElement> ||获取textarea dom|
|size|\"small\" / \"large\" / \"default\"|\"default\"|不同尺寸|
|name|string ||Form 内存取数据的 key|
|status|\"error\" ||组件状态|
|underline|boolean |false|是否只展示下边框|
|border|boolean |true|是否展示边框|
|resize|boolean |false|是否可以伸缩高度|
|onEnterPress|((value: string, e: KeyboardEvent<Element>) => void) ||回车键的回调函数|
|autosize|boolean |false|高度是否随内容自动变化|
|info|number / ((value: string ) => ReactNode / Error) ||提示信息|
|maxHeight|string / number ||输入框的最大高度, 超过之后会出现滚动条|
|trim|boolean |false|Trim 为 true 时，失去焦点时会自动删除空白字符|
|renderFooter|((value?: string ) => ReactNode) ||渲染 textarea footer|
|width|string / number ||输入框宽度|
|delay|number ||用户输入触发 onChange 和校验间隔时间，单位 毫秒|
|popover|PopoverProps[\"position\"]||校验信息弹出位置|
|popoverProps|PopoverProps ||校验或者tip弹框接受的属性|
|beforeChange|((value: T) => void / T ) ||值改变前的回调，当返回值不为空时将作为组件的新值|
|onError|((error?: Error ) => void) ||rules 校验回调|
|reserveAble|boolean ||设置为 true 组件卸载后表单不自动删除数据|
|rules|RuleItem[]||校验规则 详见 [Rule](/components/rule)|
|bind|string[] ||当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用|
## Example
### 基本用法
基础 textarea 用法
```tsx
/**
 * cn - 基本用法
 *    --基础 textarea 用法
 * en - Base
 *    --Base Textarea
 */
import { Textarea } from 'shineout';

export default () => {
  return <Textarea autoFocus placeholder='input something' />;
};

```
### 拖动高度
设置 resize 属性可以拖动改变高度
```tsx
/**
 * cn - 拖动高度
 *    -- 设置 resize 属性可以拖动改变高度
 * en - resize
 *    -- Set the resize property to change the height by dragging
 */
import { Textarea } from 'shineout';

export default () => {
  return <Textarea placeholder='input something' resize />;
};

```
### 尺寸
提供了三种尺寸 small default large
```tsx
/**
 * cn - 尺寸
 *    -- 提供了三种尺寸 small default large
 * en - Size
 *    -- There are three sizes: small, default, and large
 */
import React from 'react';
import { Textarea } from 'shineout';

const style: React.CSSProperties = { width: 120, marginInlineEnd: 24 };

const App: React.FC = () => (
  <div>
    <Textarea size='small' rows={3} style={style} placeholder='small size' />
    <Textarea style={style} rows={3} placeholder='default size' />
    <Textarea size='large' rows={3} style={style} placeholder='large size' />
  </div>
);

export default App;

```
### 自适应高度
autosize 为 true 时， rows 为最小高度，如果要设置最大高度，使用 maxHeight 即可
```tsx
/**
 * cn - 自适应高度
 *    -- autosize 为 true 时， rows 为最小高度，如果要设置最大高度，使用 maxHeight 即可
 * en - Adaptive height
 *    -- autosize 为 true 时， rows 为最小高度，如果要设置最大高度，使用 maxHeight 即可
 */
import { Textarea } from 'shineout';

export default () => {
  return (
    <Textarea
      autosize
      rows={2}
      placeholder='Please enter content, the height can be automatically adjusted'
      maxHeight={150}
    />
  );
};

```
### 信息
设置 info 为数字, 设定最大长度，用户 focus 时会显示用户已输入文字长度。
如果超出长度， 则会报错. 不会隐藏。
```tsx
/**
 * cn - 信息
 *    -- 设置 info 为数字, 设定最大长度，用户 focus 时会显示用户已输入文字长度。
 *    -- 如果超出长度， 则会报错. 不会隐藏。
 * en - Info
 *    -- Set info to number, set the maximum length, and the user's focus shows the length of text that the user has entered
 *    -- If the length is exceeded, the error is reported. It is not hidden
 * 
 */
import React from 'react';
import { Textarea } from 'shineout';

const App: React.FC = () => <Textarea rows={4} trim placeholder='input something' info={10} />;

export default App;

```
### 自定义信息
可以通过设置 info 为函数去自定义提示信息
```tsx
/**
 * cn - 自定义信息
 *    -- 可以通过设置 info 为函数去自定义提示信息
 *     -- 如果 info 返回类型为 Error，不会隐藏。
 * en - Custom Info
 *    -- can customize the info by setting info as a function
 *    -- if the functio return an Error , the info doesn't hide
 */
import React from 'react';
import { Textarea } from 'shineout';

const renderInfo = (value?: string) => {
  if (!value || value.length === 0) return null;
  const text = `total is  ${value.length}`;
  if (value.length <= 20) return text;
  return new Error(text);
};

const App: React.FC = () => (
  <Textarea rows={4} trim placeholder='input something' info={renderInfo} />
);

export default App;

```
### 渲染底部信息
渲染 textarea footer
```tsx
/**
 * cn - 渲染底部信息
 *    -- 渲染 textarea footer
 * en - RenderFooter
 *    -- render textarea footer
 */
import React from 'react';
import { Textarea } from 'shineout';

function renderFooter(text: string = '') {
  const style: React.CSSProperties = {
    color: text.length > 20 ? 'var(--danger-6,#CC3D3A)' : 'inherit',
  };
  return (
    <div style={{ textAlign: 'right', color: 'var(--neutral-text-2, #b3b7c1)' }}>
      <span style={style}>{text.length}</span> / 20
    </div>
  );
}

const App: React.FC = () => (
  <Textarea rows={3} renderFooter={renderFooter} placeholder='input something' />
);

export default App;

```
### Rules

```tsx
/**
 * cn - Rules
 *   --
 * en - Rules
 *    --
 */
import { Rule, Textarea } from 'shineout';

const rule = Rule();
export default () => {
  return (
    <Textarea
      rules={[rule.required('必填')]}
      tip={'input something'}
      placeholder='input something'
    />
  );
};

```
### innerTitle

```tsx
/**
 * cn - innerTitle
 *   --
 * en - innerTitle
 *    --
 */
import { Rule, Textarea } from 'shineout';

const rule = Rule();
export default () => {
  return (
    <Textarea
      rows={1}
      innerTitle={'hello world'}
      rules={[rule.required('必填')]}
      placeholder='input something'
    />
  );
};

```
## Guide
### 何时使用
当用户有多行信息输入的需求时，可使用该组件，支持设置最大文案长度以及字数统计
### 常见用法
可在表单录入多行文本信息时使用
### 页面布局
在实际应用中，和其他组件一起布局，遵循整体左对齐、右对齐、横向居中、垂直居中对齐 4 种布局方式，注意统一业务系统中建议只用一种布局
### 组合用法
常见组合用法搭配其他输入类组件和提交按钮使用
### 限制高度
当文本内容较多时，建议定义文本框最大高度，内容滚动查看
### 推荐/慎用示例
当用户录入较短信息内容，或其他多个信息字段时，请勿用多行文本框，推荐使用输入框或选择器


# Tooltip
鼠标悬停、聚焦或点击在某个组件时，弹出的文字提示。主要用来显示文字提示，如果需要显示更多内容，请使 Popover
## API
### Tooltip
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|trigger|\"hover\" / \"click\" / \"focus\" |\"hover\"|弹出方式|
|position|/ \"left-top\"  / \"left-bottom\"  / \"right-top\"  / \"right-bottom\"  / \"top-right\"  / \"top-left\"  / \"bottom-right\"  / \"bottom-left\"  / \"left\"  / \"right\"  / \"top\"  / \"bottom\" / \"auto\" |\"auto\"|弹出层位置|
|priorityDirection|\"auto\" / \"vertical\" / \"horizontal\" |\"vertical\"|弹出位置优先级, 默认为上下优先, 只在未设置 position 时生效|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|delay|number |0|弹出延迟|
|children|ReactNode||子元素只能为一个 ReactElement|
|animation|boolean |true|弹出是否使用动画|
|disabledChild|boolean |false|使被禁用的元素正常显示提示|
|tip|ReactNode||弹出文字|
|type|\"default\" / \"light\" / \"primary\" / \"success\" / \"warning\" / \"danger\" |default|样式|
## Example
### 基本用法
children 只能为一个 ReactElement 并且不可以使用 Fragment
内置了四个弹出方向
```tsx
/**
 * cn - 基本用法
 *    -- children 只能为一个 ReactElement 并且不可以使用 Fragment
 *    -- 内置了四个弹出方向
 * en - Base
 *    -- children can only be a ReactElement and cannot be a Fragment
 *    -- There are four pop-up directions built in
 */
import React from 'react';
import { Tooltip, Button } from 'shineout';

const App: React.FC = () => (
  <div>
    <Tooltip tip='hello world' trigger='hover'>
      <Button type='primary'>hover me</Button>
    </Tooltip>
  </div>
);
export default App;

```
### 弹出位置
内置了十二个弹出的位置
```tsx
/**
 * cn - 弹出位置
 *    -- 内置了十二个弹出的位置
 * en - Position
 *    -- Twelve pop-up positions are built in
 * 
 */

import React from 'react';
import { Button, Tooltip, TYPE } from 'shineout';

type PopoverProps = TYPE.Popover.Props;
type PopoverPosition = PopoverProps['position'];

const positions: Array<PopoverPosition[]> = [
  [undefined, 'bottom-left', 'bottom', 'bottom-right', undefined],
  ['right-top', undefined, undefined, undefined, 'left-top'],
  ['right', undefined, undefined, undefined, 'left'],
  ['right-bottom', undefined, undefined, undefined, 'left-bottom'],
  [undefined, 'top-left', 'top', 'top-right', undefined],
];

const style: React.CSSProperties = {
  margin: 4,
  width: 100,
  display: 'inline-block',
};

const App: React.FC = () => (
  <div>
    {positions.map((row, i) => (
      <div key={i}>
        {row.map((p, j) =>
          p ? (
            <Tooltip
              key={j}
              position={p}
              tip={
                <div>
                  <div>i am popover content</div>
                  <div>{p}</div>
                </div>
              }
            >
              <Button key={j} mode={'outline'} style={style}>
                {p}
              </Button>
            </Tooltip>
          ) : (
            <div key={j} style={{ ...style, border: 0 }} />
          ),
        )}
      </div>
    ))}
  </div>
);

export default App;

```
### 点击触发
默认触发事件为 hover，如果需要点击触发，可以设置 <span>trigger</span> 为 'click'
```tsx
/**
 * cn - 点击触发
 *    -- 默认触发事件为 hover，如果需要点击触发，可以设置 `trigger` 为 'click'
 * en - Click
 *    -- Set the trigger property to change the `trigger` event to 'click'
 */
import React from 'react';
import { Tooltip, Button } from 'shineout';

const App: React.FC = () => (
  <div>
    <Tooltip tip='Some text.' trigger='click'>
      <Button type='primary'>click me</Button>
    </Tooltip>
  </div>
);
export default App;

```
### 聚焦触发
需要聚焦触发，可以设置 <span>trigger</span> 为 'focus', children 需要是一个可以聚焦的元素
```tsx
/**
 * cn - 聚焦触发
 *    -- 需要聚焦触发，可以设置 `trigger` 为 'focus', children 需要是一个可以聚焦的元素
 * en - Focus
 *    -- Set the trigger property to change the `trigger` event to 'focus'
 * 
 */
import React from 'react';
import { Tooltip, Input } from 'shineout';

const App: React.FC = () => (
  <div>
    <Tooltip tip='Some text.' trigger='focus'>
      <Input style={{ width: 300 }} />
    </Tooltip>
  </div>
);
export default App;

```
### 禁用元素
设置 disabledChild 来使内部禁用的元素正常工作
```tsx
/**
 * cn - 禁用元素
 *    -- 设置 disabledChild 来使内部禁用的元素正常工作
 * en - Disabled
 *    -- Set disabledChild make disabled child work
 */
import React from 'react';
import { Button, Tooltip } from 'shineout';

const App: React.FC = () => (
  <div>
    <Tooltip tip='Some text.' disabledChild>
      <Button disabled>Disabled</Button>
    </Tooltip>
  </div>
);
export default App;

```
### 主题色
通过 <span>type</span> 设置主题色
```tsx
/**
 * cn - 主题色
 *    -- 通过 `type` 设置主题色
 * en - Type
 *    -- Set the type property to change the theme color
 * 
 * 
 */
import React from 'react';
import { Tooltip, Button } from 'shineout';

const App: React.FC = () => (
  <div style={{ display: 'flex' }}>
    <Tooltip tip='This is tooltip content'>
      <Button style={{ marginRight: 24 }} type='secondary'>
        default
      </Button>
    </Tooltip>
    <Tooltip tip='This is tooltip content' type='light'>
      <Button style={{ marginRight: 24 }} type='default' mode='outline'>
        light
      </Button>
    </Tooltip>
    <Tooltip tip='This is tooltip content' type='primary'>
      <Button style={{ marginRight: 24 }} type='primary'>
        primary
      </Button>
    </Tooltip>
    <Tooltip tip='This is tooltip content' type='success'>
      <Button style={{ marginRight: 24 }} type='success'>
        success
      </Button>
    </Tooltip>
    <Tooltip tip='This is tooltip content' type='warning'>
      <Button style={{ marginRight: 24 }} type='warning'>
        warning
      </Button>
    </Tooltip>
    <Tooltip tip='This is tooltip content' type='danger'>
      <Button style={{ marginRight: 24 }} type='danger'>
        danger
      </Button>
    </Tooltip>
  </div>
);
export default App;

```
### 在 Scroll 中滚动会自动Tooltip更新位置
Scroll 中滚动
```tsx
/**
 * cn - 在 Scroll 中滚动会自动Tooltip更新位置
 *    -- Scroll 中滚动
 * en - Scrolling in Scroll will automatically update the Tooltip position
 *    -- Scroll in Scroll
 */
// todo 参考原来的例子
// import React from 'react'
// import { Table, Tooltip, TYPE } from 'shineout'
// import { fetchSync } from 'doc/data/user'
//
// interface TableRowData {
//   id: number
//   time: string
//   start: string
//   height: number
//   salary: number
//   office: string
//   country: string
//   office5: string
//   position: string
//   lastName: string
//   firstName: string
// }
// type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>
//
// const data: TableRowData[] = fetchSync(20)
//
// const columns: TableColumnItem[] = [
//   { title: 'id', render: 'id', width: 50 },
//   {
//     title: 'First Name',
//     group: 'Name',
//     render: 'firstName',
//     width: 120,
//   },
//   {
//     title: 'Country',
//     render: d => (
//       <Tooltip tip="hello" trigger="click">
//         <span className="self-country">{d.country}</span>
//       </Tooltip>
//     ),
//   },
//   { title: 'Position', render: 'position' },
//   { title: 'Office', render: 'office' },
//   { title: 'Start Date', render: 'start' },
//   {
//     title: 'Salary',
//     fixed: 'right',
//     width: 100,
//     render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
//   },
// ]
//
// const App: React.FC = () => (
//   <Table bordered fixed="both" keygen="id" width={1500} style={{ height: 300 }} columns={columns} data={data} />
// )
//
// export default App

```
## Guide
### 何时使用
无需常驻展示，需要鼠标移入来展示文字解释说明时
### 组件常见用法
在表单中或高级搜索时使用，通常位于填写项标题后方
文本内容较少的提示默认使用黑色文本箭头提示框，场景有帮助疑问图标的 hover 显示、截断文字的 hover 显示
### 推荐/慎用示例
文字提示信息不宜过多，一般不超过三行。当提示内容较多的时候，更适合使用气泡组件


# Transfer
在两栏中移动元素，完成选择行为，左栏是“源”，右边是“目标”
## API
### Transfer
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|value|Value ||显示在右侧框数据的值集合|
|data|DataItem[]|index|数据源|
|selectedKeys|(string / number)[] ||被勾选的列表, 勾选的值均使用的是 keygen 的结果|
|defaultSelectedKeys|(string / number)[] ||默认被勾选的列表|
|defaultValue|Value ||默认值  和 value 类型相同|
|format|((data: DataItem) => Value[number]) / ObjectKey<DataItem> |d => d|格式化 value, 默认值，返回原始数据。 为 string 时，会作为 key 从原始数据中获取值，相当于 (d) => d[format]; 为函数时，以函数返回结果作为 value|
|keygen|/ ObjectKey<DataItem>  / ((data: DataItem, index?: number) => string / number)  / true |index|生成每一项key的辅助方法 为 true 时，以数据项本身作为key，相当于 (d => d) 为函数时，使用此函数返回值 为string时，使用这个string对应的数据值。如 \"id\"，相当于 (d => d.id)|
|simple|boolean |false|是否开启简单模式|
|disabled|boolean / ((data: DataItem) => boolean) ||如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项|
|prediction|((value: Value[number], Data: DataItem) => boolean) ||默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配|
|onChange|((value: Value, currentData: DataItem / DataItem[], isTarget: boolean) => void) ||改变回调,参数为当前选中值|
|onFilter|((text: string, data: DataItem, isSource: boolean) => boolean) ||筛选函数, 参数为: 输入文本, 数据, 是否为左侧数据|
|onSearch|((text: string, isSource: boolean) => void) ||输入框值变化的回调, 参数为: 输入文本, 是否为左侧数据|
|onSelectChange|((sourceKeys: (string / number)[], targetKeys?: (string / number)[] ) => void) / ((selectKeys: (string / number)[]) => void) ||勾选触发的方法|
|size|\"small\" / \"large\" / \"default\"|\"default\"|不同尺寸|
|style|CSSProperties ||自定义样式|
|className|string ||自定义类名|
|listHeight|number |186|列表高度|
|lineHeight|number |34|列表行高|
|renderItem|ObjectKey<DataItem> / ((data: DataItem) => ReactNode) |d => d|为 string 时，返回 d[string] 为 function 时，返回函数结果|
|itemClass|string ||选项 className|
|empty|ReactNode||无内容的展示|
|rowsInView|number |20|一次加载的数据条数|
|listClassName|string ||列表扩展的 class|
|listStyle|CSSProperties ||列表扩展的样式|
|titles|[ReactNode, ReactNode] ||两侧的标题, 顺序是从左到右|
|footers|[ReactNode, ReactNode] ||底部元素, 顺序是从左到右|
|operations|[ReactNode, ReactNode] ||操作元素, 顺序是从上到下|
|operationIcon|boolean |true|是否显示操作按钮的图标|
|loading|boolean / [boolean, boolean] ||加载中, 如果需要两侧加载中状态不一致, 需要传入数组|
|searchPlaceholder|string / [string, string] ||搜索框占位|
|renderFilter|((filterProps: FilterProps) => ReactNode) ||自定义过滤器渲染|
|children|((props: { onSelected: ((string / number)[]) => void; direction: \"left\" / \"right\"; selectedKeys: (string / number)[]; value: Value; filterText: string; }) => ReactNode)||自定义渲染内容|
|name|Name ||Form 内存取数据的 key|
|beforeChange|((value: T) => void / T ) ||值改变前的回调，当返回值不为空时将作为组件的新值|
|reserveAble|boolean ||设置为 true 组件卸载后表单不自动删除数据|
|rules|RuleItem[]||校验规则 详见 [Rule](/components/rule)|
|onError|((error?: Error ) => void) ||rules 校验回调|
|bind|string[] ||当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用|
## Example
### 基本用法
基础 Transfer 使用
```tsx
/**
 * cn - 基本用法
 *    -- 基础 Transfer 使用
 * en - Base
 *    -- Base Transfer
 */
import { Transfer } from 'shineout';

const data: { id: string; name: string }[] = [];

for (let i = 0; i < 10; i++) {
  data.push({
    id: `id-${i}`,
    name: `name-${i + 1}`,
  });
}

export default () => {
  return <Transfer data={data} keygen='id' listHeight={232} renderItem='name'></Transfer>;
};

```
### 尺寸
内置三种尺寸，small、default、large
```tsx
/**
 * cn - 尺寸
 *    -- 内置三种尺寸，small、default、large
 * en - Size
 *    -- There are three built-in sizes, small, default, and large
 */
import { useState } from 'react';
import { Transfer, Radio } from 'shineout';

const data: { id: string; name: string }[] = [];
const radios = ['small', 'default', 'large'];

for (let i = 0; i < 10; i++) {
  data.push({
    id: `id-${i}`,
    name: `name-${i + 1}`,
  });
}

export default () => {
  const [radio, setRadio] = useState<'small' | 'default' | 'large'>('default');

  return (
    <div>
      <Radio.Group
        style={{ marginBottom: 24 }}
        keygen
        value={radio}
        onChange={setRadio}
        data={radios}
      ></Radio.Group>
      <Transfer data={data} size={radio} keygen='id' listHeight={232} renderItem='name'></Transfer>
    </div>
  );
};

```
### 简单模式
通过开启 <span>simple</span> 属性，可以使用简单模式
简单模式下<span>selectedKeys</span>和<span>onSelectChange</span>不生效
```tsx
/**
 * cn - 简单模式
 *    -- 通过开启 `simple` 属性，可以使用简单模式
 *    -- 简单模式下`selectedKeys`和`onSelectChange`不生效
 * en - Simple
 *    -- By turning on the `simple` property, you can use the simple mode. In simple mode, `selectKeys` and `onSelectChange` are not valid
 *    -- In simple mode, `selectKeys` and `onSelectChange` are not valid
 */
import { Transfer } from 'shineout';

const data: { id: string; name: string }[] = [];

for (let i = 0; i < 10; i++) {
  data.push({
    id: `id-${i}`,
    name: `name-${i + 1}`,
  });
}

export default () => {
  return (
    <Transfer
      simple
      data={data}
      defaultValue={['id-7', 'id-8', 'id-9']}
      keygen='id'
      format='id'
      listHeight={232}
      renderItem='name'
    ></Transfer>
  );
};

```
### 筛选
通过<span>onFilter</span>属性设置自定义筛选方法
```tsx
/**
 * cn - 筛选
 *    -- 通过`onFilter`属性设置自定义筛选方法
 * en - Filter
 *    -- Set custom filter method through the `onFilter` property
 */
import { Transfer } from 'shineout';

const data: { id: string; name: string }[] = [];

for (let i = 0; i < 10; i++) {
  data.push({
    id: `id-${i}`,
    name: `name-${i + 1}`,
  });
}

export default () => {
  const handleFilter = (text: string, item: { id: string; name: string }) => {
    return item.name.indexOf(text) > -1;
  };
  return (
    <Transfer
      data={data}
      keygen='id'
      listHeight={188}
      renderItem='name'
      searchPlaceholder='Input search text'
      onFilter={handleFilter}
    ></Transfer>
  );
};

```
### 自定义渲染筛选
通过<span>renderFilter</span>获取过滤参数实现自定义渲染过滤区域
```tsx
/**
 * cn - 自定义渲染筛选
 *    -- 通过`renderFilter`获取过滤参数实现自定义渲染过滤区域
 * en - Custom render filter
 *    -- Use `renderFilter` to get the filter parameters to achieve custom rendering of the filter area
 */
import { Transfer, Input } from 'shineout';

const data: { id: string; name: string }[] = [];

interface FilterProps {
  text?: string;
  disabled: boolean;
  onFilter?: (text: string) => void;
  placeholder?: string;
  isSrouce?: boolean;
}

for (let i = 0; i < 10; i++) {
  data.push({
    id: `id-${i}`,
    name: `name-${i + 1}`,
  });
}

export default () => {
  const handleFilter = (text: string, item: { id: string; name: string }) => {
    return item.name.indexOf(text) > -1;
  };

  const renderFilter = (filterProps: FilterProps) => {
    return (
      <div style={{ display: 'flex' }}>
        <Input
          placeholder='Custom filter'
          onChange={filterProps.onFilter as (text?: string) => void}
        />
      </div>
    );
  };

  return (
    <Transfer
      data={data}
      keygen='id'
      listHeight={188}
      renderItem='name'
      searchPlaceholder='Input search text'
      onFilter={handleFilter}
      renderFilter={renderFilter}
    ></Transfer>
  );
};

```
### 自定义渲染
支持自定义渲染标题、按钮、底部内容区域
```tsx
/**
 * cn - 自定义渲染
 *    -- 支持自定义渲染标题、按钮、底部内容区域
 * en - Custom render
 *    -- Support custom rendering of title, button, and bottom content area
 */
import { Transfer, Button } from 'shineout';

const data: { id: string; name: string }[] = [];

for (let i = 0; i < 10; i++) {
  data.push({
    id: `id-${i}`,
    name: `name-${i + 1}`,
  });
}

export default () => {
  const renderFooter = () => {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '8px 12px',
          boxSizing: 'border-box',
        }}
      >
        <Button type='secondary'>Button</Button>
      </div>
    );
  };

  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <div style={{ minWidth: 530 }}>
        <Transfer
          titles={['Source', 'Target']}
          footers={[renderFooter(), renderFooter()]}
          data={data}
          keygen='id'
          operations={['To right', 'To left']}
          listHeight={184}
          renderItem='name'
        ></Transfer>
      </div>
    </div>
  );
};

```
### 加载中
设置<span>loading</span>属性可以显示加载中状态
```tsx
/**
 * cn - 加载中
 *    -- 设置`loading`属性可以显示加载中状态
 * en - Loading
 *    -- Set the `loading` property to display the loading state
 */
import { Transfer } from 'shineout';

const data: { id: string; name: string }[] = [];

for (let i = 0; i < 10; i++) {
  data.push({
    id: `id-${i}`,
    name: `name-${i + 1}`,
  });
}

export default () => {
  return <Transfer data={data} loading keygen='id' listHeight={232} renderItem='name'></Transfer>;
};

```
### 
<span>loading</span>属性支持数组类型，可以对每个列表设置不同的加载状态
```tsx
/**
 * cn -
 *    -- `loading`属性支持数组类型，可以对每个列表设置不同的加载状态
 * en -
 *    -- The `loading` property supports array types, which can set different loading states for each list
 */
import { Transfer } from 'shineout';

const data: { id: string; name: string }[] = [];

for (let i = 0; i < 10; i++) {
  data.push({
    id: `id-${i}`,
    name: `name-${i + 1}`,
  });
}

export default () => {
  return (
    <Transfer
      data={data}
      loading={[true, false]}
      keygen='id'
      listHeight={232}
      renderItem='name'
    ></Transfer>
  );
};

```
### 受控
支持组件受控
可以通过<span>format</span>属性指定最终获取的数据类型，默认返回选中的数据项
```tsx
/**
 * cn - 受控
 *    -- 支持组件受控
 *    -- 可以通过`format`属性指定最终获取的数据类型，默认返回选中的数据项
 * en - Controlled
 *    -- The value of Transfer can be controlled
 *   -- The data type of the final value can be specified by the `format` property. The default is to return the selected data item
 */
import { useState } from 'react';
import { Transfer } from 'shineout';

const data: { id: string; name: string }[] = [];

for (let i = 0; i < 10; i++) {
  data.push({
    id: `id-${i}`,
    name: `name-${i + 1}`,
  });
}

export default () => {
  const [value, setValue] = useState([]);

  const handleChange = (v: { id: string; name: string }) => {
    setValue(v);
  };

  return (
    <div>
      <Transfer
        data={data}
        value={value}
        onChange={handleChange}
        keygen='id'
        listHeight={232}
        renderItem='name'
      ></Transfer>
    </div>
  );
};

```
### 勾选受控
勾选项支持受控
注意，勾选项返回值为<span>keygen</span>所组成的数组
```tsx
/**
 * cn - 勾选受控
 *    -- 勾选项支持受控
 *    -- 注意，勾选项返回值为`keygen`所组成的数组
 * en - Selected control
 *    -- The selected item supports controlled
 *    -- Note that the return value of the selected item is an array of `keygen`
 */
import { useState } from 'react';
import { Transfer } from 'shineout';

const data: { id: string; name: string }[] = [];

for (let i = 0; i < 10; i++) {
  data.push({
    id: `id-${i}`,
    name: `name-${i + 1}`,
  });
}

export default () => {
  const [selectedKeys, setSelectedKeys] = useState([]);

  const handleSelectedChange = (source, target) => {
    setSelectedKeys([...source, ...target]);
  };

  return (
    <div>
      <Transfer
        data={data}
        selectedKeys={selectedKeys}
        onSelectChange={handleSelectedChange}
        keygen='id'
        listHeight={232}
        renderItem='name'
      ></Transfer>
    </div>
  );
};

```
### 大数据性能
Transfer 默认开启虚拟列表，支持大数据渲染
本例数据量为10万
```tsx
/**
 * cn - 大数据性能
 *    -- Transfer 默认开启虚拟列表，支持大数据渲染
 *    -- 本例数据量为10万
 * en - Big data
 *    -- Transfer turns on virtual list by default, supports rendering of large data
 *    -- The amount of data in this example is 100,000
 */
import { Transfer } from 'shineout';

const data: { id: string; name: string }[] = [];

for (let i = 0; i < 100000; i++) {
  data.push({
    id: `id-${i}`,
    name: `name-${i + 1}`,
  });
}

export default () => {
  return <Transfer data={data} keygen='id' listHeight={232} renderItem='name'></Transfer>;
};

```
## Guide
### 何时使用
对一组数据进行两种状态的分类，并在多个可选项中进行多选时
### 与组件搭配使用
1、与搜索框搭配使用，方便用户快速找到想要的数据
2、与树结构搭配使用，可在选项数据有父子层级结构时，提供更清晰的选择能力
3、大数据下，与分页搭配使用


# Tree
用于承载有父子关系的结构化内容，提供内容层级的展示
## API
### Tree
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|active|string / number ||激活节点的key|
|value|Value ||选中的 key （受控）|
|defaultValue|(string / number)[] ||默认选中的 key （非受控）|
|data|DataItem[]||数据，子节点为 children，如果 children 值为 null 或 长度为 0 时，视为叶子节点|
|expanded|(string / number)[] ||展开的节点 key(受控)|
|defaultExpanded|(string / number)[] ||默认展开的节点 key（非受控）|
|defaultExpandAll|boolean |false|默认展开所有节点|
|disabled|boolean / ((item: DataItem) => boolean) |false|显示选择框时有效，为 true 时，所有节点禁用选择，为函数时，根据函数返回结果确定是否禁用|
|keygen|/ ObjectKey<DataItem>  / ((data: DataItem, index: string) => string / number)|index|生成 key 的辅助方法, 为函数时，使用此函数返回值, 为 string 时，使用这个 string 对应的数据值。如 \"id\"，相当于 (d) => d.id|
|childrenKey|ObjectKey<DataItem> |\"children\"|指定子数据的属性名|
|mode|0 / 1 / 2 / 3 / 4 |1|选中值模式，未设置值为单选 0: 只返回完全选中的节点，包含父节点 1: 返回全部选中的节点和半选中的父节点 2: 只返回选中的子节点 3: 如果父节点选中，只返回父节点 4: 所选即所得|
|dataUpdate|boolean |true|是否监听 data 变化更新数据|
|unmatch|boolean ||是否开启不匹配模式|
|onExpand|((value: (string / number)[]) => void) ||节点展开回调，参数为当前展开节点 key 数组|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|line|boolean |true|是否显示连接线|
|iconClass|string ||展开/收起按钮的类名|
|nodeClass|string / ((data: DataItem) => string) ||节点的class，如果是函数，参数为该节点数据|
|contentClass|string / ((data: DataItem) => string) ||内容样式|
|leafClass|string ||叶子节点的 class, 函数的参数为该条叶子节点数据|
|expandIcons|(ReactNode / ((d: DataItem) => ReactNode))[] ||自定义展开/收起按钮|
|childrenClass|string / ((data: DataItem) => string) ||子节点 class, 函数的参数为该条叶子节点数据|
|onDrop|((data: DataItem[], key: string / number, targetKey: string / number, position: number) => void) ||设置 onDrop 属性时，为可拖动状态|
|doubleClickExpand|boolean |false|双击是否展开节点|
|parentClickExpand|boolean |false|点击父节点展开|
|dragImageSelector|string / ((data?: DataItem ) => string) ||定义拖拽图片的选择器|
|renderItem|/ ((item: DataItem, expanded: boolean, active: boolean, id: string / number) => ReactNode)  / ObjectKey<DataItem>|index|为 string 时，返回 d[string]。 为 function 时，返回函数结果|
|onChange|((value: Value) => void) ||设置 onChange 属性时，显示 选择框。参数为当前选中值，和 mode 属性相关|
|dragImageStyle|CSSProperties ||拖拽图片的原生 style 样式|
|dragSibling|boolean ||是否只能平级拖拽|
|dragHoverExpand|boolean |false|拖拽时自动展开含有子节点的节点|
|inlineNode|boolean |false|节点是否内联|
|highlight|boolean |true|点击节点高亮|
|loader|((key: string / number, data: DataItem) => void) ||设置 loader 属性后，未定义 children 的节点视为动态加载节点，点击展开触发 loader事件，children 为 null 或者长度为 0 视为叶子节点|
|onClick|((data: DataItem, id: string / number, path?: {  children: (string / number)[], path: (string / number)[], isDisabled: boolean, indexPath: number[], index: number } ) => void) ||节点点击事件|
|onDragStart|((e: DragEvent<Element>, data: DataItem) => void) ||拖拽开始事件|
|onDragEnd|((e: DragEvent<Element>, data: DataItem) => void) ||拖拽结束事件|
|onDragOver|((e: DragEvent<Element>, data: DataItem) => void) ||拖拽经过事件|
|onDragLeave|((e: DragEvent<Element>, data: DataItem) => void) ||拖拽离开事件|
## Example
### 基本用法
基础 Tree 组件用法，当配置 <span>children</span> 字段时，允许展开和收起节点
```tsx
/**
 * cn - 基本用法
 *    -- 基础 Tree 组件用法，当配置 `children` 字段时，允许展开和收起节点
 * en - Base
 *    -- Basic usage of Tree component. When the `children` field is configured, it allows expanding and collapsing nodes
 */

import { Tree, TYPE } from 'shineout';
type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

export default () => {
  const data = [
    {
      id: '0',
      children: [
        {
          id: '0-0',
          children: [
            {
              id: '0-0-0',
            },
            {
              id: '0-0-1',
              children: [
                {
                  id: '0-0-1-0',
                },
              ],
            },
          ],
        },
        {
          id: '0-1',
          children: [
            {
              id: '0-1-0',
            },
          ],
        },
      ],
    },
  ];

  const renderItem: TreeProps['renderItem'] = (node) => {
    return `node ${node.id}`;
  };

  return (
    <div>
      <Tree data={data} keygen='id' renderItem={renderItem}></Tree>
    </div>
  );
};

```
### 尺寸
基础 Tree 组件用法，当配置 <span>children</span> 字段时，允许展开和收起节点
```tsx
/**
 * cn - 尺寸
 *    -- 基础 Tree 组件用法，当配置 `children` 字段时，允许展开和收起节点
 * en - Size
 *    -- Basic usage of Tree component. When the `children` field is configured, it allows expanding and collapsing nodes
 */

import { Tree, TYPE } from 'shineout';
type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

export default () => {
  const data: DataItem[] = [
    {
      id: '0',
      children: [
        {
          id: '0-0',
          children: [
            {
              id: '0-0-0',
            },
          ],
        },
        {
          id: '0-1',
          children: [
            {
              id: '0-1-0',
            },
          ],
        },
      ],
    },
  ];

  const renderItem: TreeProps['renderItem'] = (node) => {
    return `node ${node.id}`;
  };

  return (
    <div>
      <Tree data={data} keygen='id' renderItem={renderItem}></Tree>
    </div>
  );
};

```
### 无连接线
设置 line 为 false，不显示连接线
```tsx
/**
 * cn - 无连接线
 *    -- 设置 line 为 false，不显示连接线
 * en - line
 *    -- Set line to false to hide the connection line
 */

import { Tree, TYPE } from 'shineout';
type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

export default () => {
  const data: DataItem[] = [
    {
      id: '0',
      children: [
        {
          id: '0-0',
          children: [
            {
              id: '0-0-0',
              children: [
                {
                  id: '0-0-0-0',
                },
              ],
            },
          ],
        },
        {
          id: '0-1',
          children: [
            {
              id: '0-1-0',
            },
          ],
        },
      ],
    },
  ];

  const renderItem: TreeProps['renderItem'] = (node: any) => {
    return <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>;
  };

  return (
    <div>
      <Tree
        defaultExpanded={['0', '0-0']}
        line={false}
        data={data}
        keygen='id'
        renderItem={renderItem}
      ></Tree>
    </div>
  );
};

```
### 控制展开
基础 Tree 组件用法，当配置 <span>children</span> 字段时，允许展开和收起节点
```tsx
/**
 * cn - 控制展开
 *    -- 基础 Tree 组件用法，当配置 `children` 字段时，允许展开和收起节点
 * en - expand
 *    -- Basic usage of Tree component. When the `children` field is configured, it allows expanding and collapsing nodes
 * 
 */
import { useState } from 'react';
import { Tree, Button, TYPE } from 'shineout';
import { createNestedArray, getIds } from './utils';

type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

export default () => {
  const data: DataItem[] = createNestedArray([2, 2, 2]);
  const [expanded, setExpanded] = useState<TreeProps['expanded']>([]);

  const renderItem: TreeProps['renderItem'] = (node) => {
    return <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>;
  };

  const handleExpandAll = () => {
    setExpanded(getIds(data));
  };

  const handleCloseAll = () => {
    setExpanded([]);
  };

  const handleExpand: TreeProps['onExpand'] = (ids) => {
    setExpanded([...ids]);
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Button size='small' mode='outline' type='secondary' onClick={handleExpandAll}>
          Expand all
        </Button>
        <Button size='small' mode='outline' type='secondary' onClick={handleCloseAll}>
          Collapse all
        </Button>
      </div>
      <Tree
        line={false}
        data={data}
        expanded={expanded}
        onExpand={handleExpand}
        keygen='id'
        renderItem={renderItem}
      ></Tree>
    </div>
  );
};

```
### 禁用状态
基础 Tree 组件用法，当配置 <span>children</span> 字段时，允许展开和收起节点
```tsx
/**
 * cn - 禁用状态
 *    -- 基础 Tree 组件用法，当配置 `children` 字段时，允许展开和收起节点
 * en - disabled
 *    -- Basic usage of Tree component. When the `children` field is configured, it allows expanding and collapsing nodes
 */

import { useState } from 'react';
import { Tree, TYPE } from 'shineout';
type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

export default () => {
  const data: DataItem[] = [
    {
      id: '0',
      children: [
        {
          id: '0-0',
          children: [
            {
              id: '0-0-0',
            },
          ],
        },
        {
          id: '0-1',
          children: [
            {
              id: '0-1-0',
            },
          ],
        },
        {
          id: '0-2',
          children: [
            {
              id: '0-2-0',
            },
          ],
        },
      ],
    },
  ];

  const [value, setValue] = useState<TreeProps['value']>([]);

  const renderItem: TreeProps['renderItem'] = (node) => {
    return <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>;
  };

  const isDisabled: TreeProps['disabled'] = (node) => {
    return node.id === '0-0';
  };

  const handleChange: TreeProps['onChange'] = (keys) => {
    setValue(keys);
  };

  return (
    <div>
      <Tree
        line={false}
        value={value}
        data={data}
        keygen='id'
        mode={0}
        defaultExpanded={['0']}
        onChange={handleChange}
        disabled={isDisabled}
        renderItem={renderItem}
      ></Tree>
    </div>
  );
};

```
### 可选择树
配置 <span>onChange</span> 以及 <span>value</span> 属性开启数据选择功能
配置 <span>mode</span> 属性返回不同结构的数据：
模式为 0 时，返回完全选中的节点，包含父节点
模式为 1 时，返回选中、半选中的节点
模式为 2 时，只返回叶子节点
模式为 3 时，只返回完全选中的父节点
模式为 4 时，所选即所得
```tsx
/**
 * cn - 可选择树
 *    -- 配置 `onChange` 以及 `value` 属性开启数据选择功能
 *    -- 配置 `mode` 属性返回不同结构的数据：
 *    -- 模式为 0 时，返回完全选中的节点，包含父节点
 *    -- 模式为 1 时，返回选中、半选中的节点
 *    -- 模式为 2 时，只返回叶子节点
 *    -- 模式为 3 时，只返回完全选中的父节点
 *    -- 模式为 4 时，所选即所得
 * en - line
 *    -- Set line to false to hide the connection line
 */

import { useState } from 'react';
import { Tree, Radio, TYPE } from 'shineout';
import { createNestedArray } from './utils';

type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

const data: DataItem[] = createNestedArray([5, 1, 2]);

export default () => {
  const radio = [
    {
      mode: 'full',
      value: 0,
    },
    {
      mode: 'half',
      value: 1,
    },
    {
      mode: 'child only',
      value: 2,
    },
    {
      mode: 'shallow',
      value: 3,
    },
    {
      mode: 'freedom',
      value: 4,
    },
  ];

  const [value, setValue] = useState<TreeProps['value']>([]);
  const [mode, setMode] = useState<0 | 1 | 2 | 3 | 4>(0);

  const renderItem = (node: any) => {
    return <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>;
  };

  const handleChange: TreeProps['onChange'] = (v) => {
    setValue(v);
  };

  const handleModeChange = (v: any) => {
    setMode(v.value);
    setValue([]);
  };

  return (
    <div>
      <Radio.Group
        size='small'
        keygen='value'
        prediction={(item, v) => item === v.value}
        value={mode}
        onChange={handleModeChange}
        renderItem={(item) => `模式 ${item.value}`}
        data={radio}
        style={{ marginBottom: 24 }}
      />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <Tree
            key={mode}
            line={false}
            value={value}
            data={data}
            mode={mode}
            keygen='id'
            renderItem={renderItem}
            onChange={handleChange}
          ></Tree>
        </div>
        <pre
          style={{
            flex: 1,
            margin: 10,
            background: '#1d1d1d',
            color: '#94d5fc',
            borderRadius: 4,
            padding: 10,
          }}
        >
          <div style={{ marginBottom: 10 }}>
            <code style={{ color: '#5D8E4E' }}>
              <span>/</span>
              <span>/</span> DataItem[]
            </code>
          </div>
          {value && value.length > 0 && <code>{JSON.stringify(value, null, 2)}</code>}
          {!value || (value.length === 0 && <code style={{ color: '#757575' }}>no data</code>)}
        </pre>
      </div>
    </div>
  );
};

```
### 动态加载
动态加载节点
```tsx
/**
 * cn - 动态加载
 *    -- 动态加载节点
 * en - Loader
 *    -- Basic usage of Tree component. When the `children` field is configured, it allows expanding and collapsing nodes
 */
import { useState } from 'react';
import { Tree, TYPE } from 'shineout';
import { produce } from 'immer';

type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

export default () => {
  const initData = ['0', '1', '2', '3', '4'].map((i) => ({ id: i }));
  const [data, setData] = useState(initData);
  const [value, setValue] = useState<TreeProps['value']>([]);

  const renderItem = (node: any) => {
    return <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>;
  };

  const createRange = () => Array.from({ length: Math.round(Math.random() * 4) }, (_, i) => i);

  const handleChange: TreeProps['onChange'] = (v) => {
    setValue(v);
  };

  const handleLoader: TreeProps['loader'] = (key) => {
    const nextData = produce(data, (draft) => {
      const path: string[] = key.toString().split(',');
      let target: any = draft;
      path.forEach((pid, i) => {
        target = target.find((d: any) => d.id === pid);
        if (i < path.length - 1) target = target.children;
      });
      target.children = [...createRange().map((i) => ({ id: `${target.id}-${i}` }))];
    });
    setTimeout(() => setData(nextData), 1000);
  };

  return (
    <div>
      <Tree
        value={value}
        line={false}
        onChange={handleChange}
        loader={handleLoader}
        data={data}
        keygen={(node, parentKey) => `${parentKey},${node.id}`.replace(/^,/, '')}
        renderItem={renderItem}
      ></Tree>
    </div>
  );
};

```
### 可拖拽
设置 <span>onDrop</span> 属性，可以拖拽节点
设置 <span>dragSibling</span> 属性，将限制节点拖拽范围至兄弟节点之间
```tsx
/**
 * cn - 可拖拽
 *    -- 设置 `onDrop` 属性，可以拖拽节点
 *    -- 设置 `dragSibling` 属性，将限制节点拖拽范围至兄弟节点之间
 * en - Drag
 *    -- Set the `onDrop` property to drag the node.
 *    -- Set the `dragSibling` property to limit the node drag range to between sibling nodes
 */

import { useState } from 'react';
import { Tree, TYPE } from 'shineout';
import { createNestedArray } from './utils';

type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

const d: DataItem[] = createNestedArray([4, 1, 1]);

export default () => {
  const [data, setData] = useState(d);

  const renderItem: TreeProps['renderItem'] = (node) => {
    return <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>;
  };

  const handleDrag: TreeProps['onDrop'] = (data) => {
    setData(data);
  };

  return (
    <div>
      <Tree
        line={false}
        data={data}
        onDragStart={(v) => console.log(v)}
        keygen='id'
        renderItem={renderItem}
        onDrop={handleDrag}
      ></Tree>
    </div>
  );
};

```
### 自定义拖拽样式
通过设置 <span>dragImageStyle</span> 属性为处于拖拽中跟随鼠标的节点添加样式
```tsx
/**
 * cn - 自定义拖拽样式
 *    -- 通过设置 `dragImageStyle` 属性为处于拖拽中跟随鼠标的节点添加样式
 * en - Drag Style
 *    -- Set the `dragImageStyle` property to add style to the node that follows the mouse during dragging
 */

import { useState } from 'react';
import { Tree, TYPE } from 'shineout';
import { createNestedArray } from './utils';

type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

export default () => {
  const [data, setData] = useState<TreeProps['data']>(createNestedArray([5, 2, 2]));

  const renderItem: TreeProps['renderItem'] = (node) => {
    return <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>;
  };

  const handleDrag: TreeProps['onDrop'] = (data) => {
    setData(data);
  };

  return (
    <div>
      <Tree
        dragImageStyle={{ background: '#F1FAEB', border: '2px dashed #74D13D' }}
        line={false}
        data={data}
        keygen='id'
        renderItem={renderItem}
        onDrop={handleDrag}
      ></Tree>
    </div>
  );
};

```
### 点击高亮
设置 <span>highlight</span> 属性后在点击节点时高亮
```tsx
/**
 * cn - 点击高亮
 *    -- 设置 `highlight` 属性后在点击节点时高亮
 * en - Highlight
 *    -- Set the `highlight` property to highlight the node when clicked
 */

import { Tree, TYPE } from 'shineout';
import { createNestedArray } from './utils';

type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

export default () => {
  const data: DataItem[] = createNestedArray([5, 1, 1]);

  const renderItem: TreeProps['renderItem'] = (node) => {
    return <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>;
  };

  return (
    <div>
      <Tree line={false} highlight data={data} keygen='id' renderItem={renderItem}></Tree>
    </div>
  );
};

```
## Guide
### 何时使用
当需要操作的内容需要层级或父子结构展示信息时。
### 与布局相关
在表格、表单页面中，树通常放置于内容区左侧，与右侧内容产生联动。
### 组件搭配使用
与按钮搭配使用，可以通过按钮对树进行管理。按钮控制全局可放置标题右侧、或底部常驻，控制局部可放置在对应结点上。


# Tree-select
用清晰的层级结构来展示层级信息，便于用户根据数据之间的关系来逐级找到相应的节点及数据
## API
### TreeSelect
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|size|\"small\" / \"large\" / \"default\"|\"default\"|不同尺寸|
|status|\"error\" ||组件状态|
|innerTitle|ReactNode||内嵌标题|
|filterSameChange|boolean |false|当两次选择的值相同时不触发 onChange|
|absolute|boolean / (() => HTMLElement / null) |false|为 true 时，选项弹出层在 DOM 中独立 render; 为函数时，返回值作为弹出层容器|
|zIndex|number |1000|选项列表 z-index 值, 需要配合 absolute|
|emptyText|string ||自定义 empty 文案|
|loading|boolean / ReactNode|false|数据加载中，为true时会展示一个默认的 [Spin](/components/Spin) 组件，可以传入一个自定义的Spin代替|
|placeholder|string ||value 为空时的占位符|
|compressedBound|number ||开启多选后，指定允许展示标签数量，超过后将折叠|
|compressedClassName|string ||多选合并展示弹出框的类名|
|clearable|boolean |false|是否可清除值|
|renderUnmatched|((data: Value extends (infer U)[] ? U : Value) => ReactNode) ||渲染未匹配值的方式|
|data|DataItem[] |[]|数据源|
|keygen|ObjectKey<DataItem> / ((data: DataItem, parentKey: string / number) => string / number)||生成 key 的辅助方法, 为函数时，使用此函数返回值, 为 string 时，使用这个 string 对应的数据值。如 \"id\"，相当于 (d) => d.id|
|getComponentRef|((ref: ComponentRef<DataItem, Value>) => void) / { current?: ComponentRef<DataItem, Value> ; } ||获取组件的一些方法 目前只支持 getDataByValues|
|onFilter|((text: string) => void) ||onFilter 不为空时，可以输入过滤数据。 onFilter 如果返回一个函数，使用这个函数做前端过滤。 如果不返回，可以自行做后端过滤|
|empty|ReactNode||无数据时的占位内容|
|multiple|boolean |false|是否是多选|
|onBlur|((e?: any) => void) ||blur 事件回调函数|
|onFocus|((e?: any) => void) ||focus 事件回调函数|
|disabled|boolean / ((data: DataItem) => boolean) |false|为 true 时，所有节点禁用选择，为函数时，根据函数返回结果确定是否禁用|
|renderResult|((data: DataItem) => ReactNode) |renderItem|选中后在结果中显示的内容，默认和 renderItem 相同|
|mode|0 / 1 / 2 / 3 / 4 |1|选中值模式，未设置值为单选 0: 只返回完全选中的节点，包含父节点 1: 返回全部选中的节点和半选中的父节点 2: 只返回选中的子节点 3: 如果父节点选中，只返回父节点 4: 所选即所得|
|height|number |300|列表高度|
|onCollapse|((collapse: boolean) => void) ||下拉列表展开/收起回调|
|showHitDescendants|boolean |false|筛选后是否展示命中节点的后代节点|
|position|\"auto\" / \"bottom-left\" / \"top-left\" ||弹出位置|
|onEnterExpand|((e: KeyboardEvent<HTMLDivElement>) => boolean) ||回车触发下拉框展开的时候调用|
|onChange|((value: Value, selected?: DataItem / {  IS_NOT_MATCHED_VALUE: boolean, value: any } , path?: (string / number)[] ) => void) ||参数 为 当前选中值|
|onChangeAddition|((params: { current?: DataItem / UnMatchedData / (DataItem / UnMatchedData)[] ; checked?: 0 / 1 / 2 ; data?: DataItem / UnMatchedData / (DataItem / UnMatchedData)[] / null ; }) => void) ||onChange 额外参数 (current 为点击的节点的数据， data 为当前选中的数据， checked 为多选状态下是选中还是取消)|
|value|Value ||选中的 key （受控），多选时必须为array|
|defaultValue|Value ||默认值  和 value 类型相同|
|compressed|boolean / \"no-repeat\" |false|将选中值合并，只在多选模式下有效；为 \"no-repeat\" 时弹出框中不重复展示值|
|open|boolean ||控制浮层显隐|
|line|boolean |false|是否显示连接线|
|width|string / number ||输入框宽度|
|underline|boolean |false|是否只展示下边框|
|border|boolean |false|是否展示边框|
|showArrow|boolean |true|是否展示箭头|
|childrenKey|ObjectKey<DataItem> |\"children\"|指定子数据的属性名|
|focusSelected|boolean |true|onFilter 在多选情况下点击选项后是否选中过滤文本|
|resultClassName|string / ((value: DataItem) => string) ||选中结果内容容器的className|
|loader|((key: string / number, data: DataItem) => void) ||设置 loader 属性后，未定义 children 的节点视为动态加载节点，点击展开触发 loader事件，children 为 null 或者长度为 0 视为叶子节点|
|maxLength|number ||Select 输入框输入字符串最大长度|
|defaultExpanded|(string / number)[]||默认展开的节点 key（非受控）|
|defaultExpandAll|boolean |false|默认展开全部子节点, 仅树形数据下有效|
|parentClickExpand|boolean |false|点击父节点展开|
|expanded|(string / number)[]||展开的节点 key(受控)|
|trim|boolean |false|trim 为 true 时，失去焦点时会自动删除空白字符|
|unmatch|boolean |true|是否展示data中不存在的值|
|renderItem|ObjectKey<DataItem> / ((data: DataItem, expanded: boolean, active: boolean, id: string / number) => ReactNode)|index|为 string 时，返回 d[string]。 为 function 时，返回函数结果|
|onAdvancedFilter|((text: string) => (data: DataItem) => boolean) ||高级筛选模式，可针对当前层级在筛选结果和原始数据间切换|
|onExpand|((value: (string / number)[]) => void) ||节点展开回调，参数为当前展开节点 key 数组|
|popover|PopoverProps[\"position\"]||校验信息弹出位置|
|popoverProps|PopoverProps ||校验或者tip弹框接受的属性|
|name|Name ||Form 内存取数据的 key|
|beforeChange|((value: T) => void / T ) ||值改变前的回调，当返回值不为空时将作为组件的新值|
|reserveAble|boolean ||设置为 true 组件卸载后表单不自动删除数据|
|rules|RuleItem[]||校验规则 详见 [Rule](/components/rule)|
|onError|((error?: Error ) => void) ||rules 校验回调|
|bind|string[] ||当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用|
### TreeSelectRef
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|getDataByValues|(values: Value) => Value extends any[] ? (DataItem / UnMatchedData)[] : DataItem / UnMatchedData||获取 value 对应的 data|
## Example
### 基本用法
基础的 TreeSelect 用法
默认<span>childrenKey</span>属性值为 'children'
单选模式下 TreeSelect 遵循<span>mode</span>属性规则，详见mode属性说明
```tsx
/**
 * cn - 基本用法
 *    -- 基础的 TreeSelect 用法
 *    -- 默认`childrenKey`属性值为 'children'
 *    -- 单选模式下 TreeSelect 遵循`mode`属性规则，详见mode属性说明
 * en - Basic
 *    -- Basic usage of TreeSelect
 *    -- The default value of the `childrenKey` property is 'children'
 *    -- In single selection `mode`, TreeSelect follows the mode attribute rules, see the mode attribute description for details
 */
import React, { useState } from 'react';
import { TreeSelect, TYPE } from 'shineout';

interface DataItem {
  id: string;
  title: string;
  children?: DataItem[];
}

type TreeSelectProps = TYPE.TreeSelect.Props<DataItem, string[]>;

const data: DataItem[] = [
  {
    id: '1',
    title: '1',
    children: [
      {
        id: '1-1',
        title: '1-1',
        children: [
          { id: '1-1-1', title: '1-1-1' },
          { id: '1-1-2', title: '1-1-2' },
        ],
      },
      { id: '1-2', title: '1-2' },
    ],
  },
  {
    id: '2',
    title: '2',
    children: [
      { id: '2-1', title: '2-1' },
      { id: '2-2', title: '2-2' },
    ],
  },
  { id: '3', title: '3', children: [{ id: '3-1', title: '3-1' }] },
];

export default () => {
  const [value, setValue] = useState<TreeSelectProps['value']>([]);

  const handleChange: TreeSelectProps['onChange'] = (v) => {
    setValue(v);
  };

  return (
    <div>
      <TreeSelect
        width={300}
        value={value}
        onChange={handleChange}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
      ></TreeSelect>
    </div>
  );
};

```
### 多选
开启<span>multiple</span>属性后，可以选择多个节点
注意，开启多选模式后，最终数据结果遵循<span>mode</span>属性规则，详见mode属性说明
```tsx
/**
 * cn - 多选
 *    -- 开启`multiple`属性后，可以选择多个节点
 *    -- 注意，开启多选模式后，最终数据结果遵循`mode`属性规则，详见mode属性说明
 * en - Multiple
 *    -- Set `multiple` to true, you can select multiple nodes
 */
import React, { useState } from 'react';
import { TreeSelect, TYPE } from 'shineout';

interface DataItem {
  id: string;
  title: string;
  children?: DataItem[];
}

type TreeSelectProps = TYPE.TreeSelect.Props<DataItem, string[]>;

const data: DataItem[] = [
  {
    id: '1',
    title: '1',
    children: [
      {
        id: '1-1',
        title: '1-1',
        children: [
          { id: '1-1-1', title: '1-1-1' },
          { id: '1-1-2', title: '1-1-2' },
        ],
      },
      { id: '1-2', title: '1-2' },
    ],
  },
  {
    id: '2',
    title: '2',
    children: [
      { id: '2-1', title: '2-1' },
      { id: '2-2', title: '2-2' },
    ],
  },
  { id: '3', title: '3', children: [{ id: '3-1', title: '3-1' }] },
];

export default () => {
  const [value, setValue] = useState<TreeSelectProps['value']>([]);

  const handleChange: TreeSelectProps['onChange'] = (v) => {
    setValue(v);
  };

  return (
    <div>
      <TreeSelect
        multiple
        width={300}
        value={value}
        onChange={handleChange}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
      ></TreeSelect>
    </div>
  );
};

```
### 
使用<span>compressed</span>属性可以合并选中结果
```tsx
/**
 * cn -
 *    -- 使用`compressed`属性可以合并选中结果
 * en -
 *    -- Set `compressed` to true, you can merge the selected results
 */
import React, { useState } from 'react';
import { TreeSelect, TYPE } from 'shineout';

interface DataItem {
  id: string;
  title: string;
  children?: DataItem[];
}

type TreeSelectProps = TYPE.TreeSelect.Props<DataItem, string[]>;

const data: DataItem[] = [
  {
    id: '1',
    title: '1',
    children: [
      {
        id: '1-1',
        title: '1-1',
        children: [
          { id: '1-1-1', title: '1-1-1' },
          { id: '1-1-2', title: '1-1-2' },
        ],
      },
      { id: '1-2', title: '1-2' },
    ],
  },
  {
    id: '2',
    title: '2',
    children: [
      { id: '2-1', title: '2-1' },
      { id: '2-2', title: '2-2' },
    ],
  },
  { id: '3', title: '3', children: [{ id: '3-1', title: '3-1' }] },
];

export default () => {
  const [value, setValue] = useState<TreeSelectProps['value']>([]);

  const handleChange: TreeSelectProps['onChange'] = (v) => {
    setValue(v);
  };

  return (
    <div>
      <TreeSelect
        multiple
        width={300}
        value={value}
        compressed
        onChange={handleChange}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
      ></TreeSelect>
    </div>
  );
};

```
### 过滤数据（本地）
设置<span>onFilter</span>属性且返回内容为函数时，会根据返回的过滤函数对本地数据进行过滤
如果<span>onFilter</span>不返回函数，可根据输入内容自行进行远程查询数据
```tsx
/**
 * cn - 过滤数据（本地）
 *    -- 设置`onFilter`属性且返回内容为函数时，会根据返回的过滤函数对本地数据进行过滤
 *    -- 如果`onFilter`不返回函数，可根据输入内容自行进行远程查询数据
 * en - Filter data (local)
 *    -- Set the `onFilter` property and return the content as a function, the local data will be filtered according to the returned filter function
 */
import React, { useState } from 'react';
import { TreeSelect, TYPE } from 'shineout';

interface DataItem {
  id: string;
  title: string;
  children?: DataItem[];
}

type TreeSelectProps = TYPE.TreeSelect.Props<DataItem, string>;

const data: DataItem[] = [
  {
    id: '1',
    title: '1',
    children: [
      {
        id: '1-1',
        title: '1-1',
        children: [
          { id: '1-1-1', title: '1-1-1' },
          { id: '1-1-2', title: '1-1-2' },
        ],
      },
      { id: '1-2', title: '1-2' },
    ],
  },
  {
    id: '2',
    title: '2',
    children: [
      { id: '2-1', title: '2-1' },
      { id: '2-2', title: '2-2' },
    ],
  },
  { id: '3', title: '3', children: [{ id: '3-1', title: '3-1' }] },
];

export default () => {
  const [value, setValue] = useState<TreeSelectProps['value']>('');

  const handleFilter = (text: string) => (d: DataItem) => d.title.indexOf(text) > -1;

  const handleChange: TreeSelectProps['onChange'] = (v) => {
    setValue(v);
  };

  return (
    <div>
      <TreeSelect
        width={300}
        onFilter={handleFilter}
        mode={1}
        value={value}
        onChange={handleChange}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node?.title}`}
        data={data}
        placeholder='Please select content'
      />
    </div>
  );
};

```
### 高级筛选
高级筛选模式下，可针对当前层级在筛选结果和原始数据间切换
设置 onAdvancedFilter 属性开启高级筛选，仅支持前端筛选
```tsx
/**
 * cn - 高级筛选
 *    -- 高级筛选模式下，可针对当前层级在筛选结果和原始数据间切换
 *    -- 设置 onAdvancedFilter 属性开启高级筛选，仅支持前端筛选
 * en - Advanced Filter
 *    -- In the advanced filter mode, you can switch between the filter results and the original data for the current level by pressing the button
 *    -- Set the onAdvancedFilter property to enable advanced filtering, only front-end filtering is supported
 */

import React from 'react';
import { TreeSelect } from 'shineout';

interface DataItem {
  value: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
          {
            value: 'gulou',
          },
        ],
      },
      {
        value: 'suzhou',
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
          {
            value: 'feixi',
          },
        ],
      },
      {
        value: 'maanshan',
      },
    ],
  },
];

export default () => {
  return (
    <div>
      <TreeSelect
        width={300}
        showHitDescendants
        placeholder='Please select content'
        onAdvancedFilter={(text) => (d) => d.value.indexOf(text) > -1}
        clearable
        keygen='value'
        renderItem='value'
        data={data}
      />
    </div>
  );
};

```
### 动态加载
通过设置<span>loader</span>函数实现动态加载节点
```tsx
/**
 * cn - 动态加载
 *    -- 通过设置`loader`函数实现动态加载节点
 * en - Loader
 *    -- Basic usage of Tree component. When the `children` field is configured, it allows expanding and collapsing nodes
 */
import React from 'react';
import { produce } from 'immer';
import { TreeSelect } from 'shineout';

interface DataItem {
  id: string;
  children?: DataItem[];
}

const initData: DataItem[] = ['0', '1', '2', '3', '4'].map((i) => ({ id: i }));

let index = 0;
const App = () => {
  const [data, setData] = React.useState(initData);
  const loader = (key: any) => {
    setTimeout(() => {
      const nextData = produce(data, (d: DataItem[]) => {
        d[parseInt(key, 10)].children = Array(6)
          .fill(0)
          .map(() => ({ id: `-${index++}`, children: [] }));
      });
      setData(nextData);
    }, 500);
  };

  return (
    <TreeSelect
      placeholder='Please select content'
      width={300}
      multiple
      loader={loader}
      keygen='id'
      renderItem={(node) => `node ${node.id}`}
      data={data}
    />
  );
};

export default App;

```
### 禁用

```tsx
/**
 * cn - 禁用
 *      -- 设置`disabled`属性禁用组件
 * en - Disabled
 *     -- Set the disabled property to disable the component
 */
import React from 'react';
import { TreeSelect } from 'shineout';

interface DataItem {
  id: string;
  title: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    id: '1',
    title: '1',
    children: [
      {
        id: '1-1',
        title: '1-1',
        children: [
          { id: '1-1-1', title: '1-1-1' },
          { id: '1-1-2', title: '1-1-2' },
        ],
      },
      { id: '1-2', title: '1-2' },
    ],
  },
  {
    id: '2',
    title: '2',
    children: [
      { id: '2-1', title: '2-1' },
      { id: '2-2', title: '2-2' },
    ],
  },
  {
    id: '3',
    title: '3',
    children: [
      { id: '3-1', title: '3-1' },
      { id: '3-2', title: '3-2' },
    ],
  },
];
export default () => {
  return (
    <div>
      <TreeSelect
        width={300}
        disabled
        clearable
        style={{ width: 250 }}
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
      />

      <TreeSelect
        style={{ marginLeft: 24 }}
        width={300}
        disabled={(v) => v.title.startsWith('2-')}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
      />
    </div>
  );
};

```
### 内嵌标题
通过配置<span>innerTitle</span>可以渲染内嵌标题
```tsx
/**
 * cn - 内嵌标题
 *    -- 通过配置`innerTitle`可以渲染内嵌标题
 * en - Inner title
 *    -- Set `innerTitle` to render inner title
 */
import React from 'react';
import { TreeSelect } from 'shineout';

interface DataItem {
  id: string;
  title: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    id: '1',
    title: '1',
    children: [
      {
        id: '1-1',
        title: '1-1',
        children: [
          { id: '1-1-1', title: '1-1-1' },
          { id: '1-1-2', title: '1-1-2' },
        ],
      },
      { id: '1-2', title: '1-2' },
    ],
  },
  {
    id: '2',
    title: '2',
    children: [
      { id: '2-1', title: '2-1' },
      { id: '2-2', title: '2-2' },
    ],
  },
  { id: '3', title: '3', children: [{ id: '3-1', title: '3-1' }] },
];

export default () => {
  return (
    <div>
      <TreeSelect
        innerTitle='Please select content'
        width={300}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
      ></TreeSelect>
    </div>
  );
};

```
### 渲染未匹配值
通过<span>renderUnmatched</span>属性可以渲染未匹配的值
```tsx
/**
 * cn - 渲染未匹配值
 *    -- 通过`renderUnmatched`属性可以渲染未匹配的值
 * en - renderUnmatched
 *    -- The unmatched value can be rendered through the `renderUnmatched` property
 */
import React from 'react';
import { TreeSelect } from 'shineout';

interface DataItem {
  id: string;
  title: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    id: '1',
    title: '1',
    children: [
      {
        id: '1-1',
        title: '1-1',
        children: [
          { id: '1-1-1', title: '1-1-1' },
          { id: '1-1-2', title: '1-1-2' },
        ],
      },
      { id: '1-2', title: '1-2' },
    ],
  },
  {
    id: '2',
    title: '2',
    children: [
      { id: '2-1', title: '2-1' },
      { id: '2-2', title: '2-2' },
    ],
  },
  { id: '3', title: '3', children: [{ id: '3-1', title: '3-1' }] },
];

export default () => {
  const renderUnmatched = (item: any) => {
    return `I'm unmatched ${item}`;
  };

  return (
    <div>
      <TreeSelect
        width={300}
        data={data}
        defaultValue='item'
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        renderUnmatched={renderUnmatched}
        placeholder='Please select content'
      ></TreeSelect>
    </div>
  );
};

```
### 尺寸
有 small, default, large 三种尺寸，默认为 small
```tsx
/**
 * cn - 尺寸
 *    -- 有 small, default, large 三种尺寸，默认为 small
 * en - Size
 *    -- There are three sizes: small, default, and large. The default value is small
 */
import React, { useState } from 'react';
import { TreeSelect, TYPE } from 'shineout';

type TreeSelectProps = TYPE.TreeSelect.Props<DataItem, string>;

interface DataItem {
  id: string;
  title: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    id: '1',
    title: '1',
    children: [
      {
        id: '1-1',
        title: '1-1',
        children: [
          { id: '1-1-1', title: '1-1-1' },
          { id: '1-1-2', title: '1-1-2' },
        ],
      },
      { id: '1-2', title: '1-2' },
    ],
  },
  {
    id: '2',
    title: '2',
    children: [
      { id: '2-1', title: '2-1' },
      { id: '2-2', title: '2-2' },
    ],
  },
  { id: '3', title: '3', children: [{ id: '3-1', title: '3-1' }] },
];

export default () => {
  const [value, setValue] = useState<TreeSelectProps['value']>();

  const handleChange: TreeSelectProps['onChange'] = (v) => {
    setValue(v);
  };

  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 24 }}>
      <TreeSelect
        size='small'
        width={300}
        value={value}
        onChange={handleChange}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
      ></TreeSelect>
      <TreeSelect
        width={300}
        value={value}
        onChange={handleChange}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
      ></TreeSelect>
      <TreeSelect
        size='large'
        width={300}
        value={value}
        onChange={handleChange}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
      ></TreeSelect>
    </div>
  );
};

```
### tip
test tip
```tsx
/**
 * cn - tip
 *    -- test tip
 * en - tip
 *    -- test tip
 */
import React from 'react';
import { TreeSelect } from 'shineout';

interface DataItem {
  id: string;
  title: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    id: '1',
    title: '1',
    children: [
      {
        id: '1-1',
        title: '1-1',
        children: [
          { id: '1-1-1', title: '1-1-1' },
          { id: '1-1-2', title: '1-1-2' },
        ],
      },
      { id: '1-2', title: '1-2' },
    ],
  },
  {
    id: '2',
    title: '2',
    children: [
      { id: '2-1', title: '2-1' },
      { id: '2-2', title: '2-2' },
    ],
  },
  { id: '3', title: '3', children: [{ id: '3-1', title: '3-1' }] },
];
export default () => {
  return (
    <div>
      <TreeSelect
        tip='i am a tip'
        width={300}
        data={data}
        renderItem={'title'}
        keygen='id'
        placeholder='Select Color'
      />
      <TreeSelect
        status='error'
        width={300}
        data={data}
        renderItem={'title'}
        keygen='id'
        placeholder='Select Color'
      />
      <TreeSelect
        error={'error'}
        popover
        width={300}
        renderItem={'title'}
        data={data}
        keygen='id'
        placeholder='Select Color'
      />
    </div>
  );
};

```
## Guide
### 何时使用
常见的应用方式包括导航、选择、锚点定位、组织架构等。在不同的应用场景下，树形结构的表现形式、所包含的元素、可用的操作都有所不同
### 组件搭配使用
与搜索功能搭配使用，通过关键词筛选数据内容，便于用户在树结构中快速找到所需信息
### 推荐/慎用示例
1、当树选择项较多时，默认折叠树层级结构，快速定位目标一级选项
2、尽量避免层级过多，如遇特殊情况可以适当撑宽容器宽度，或在容器宽度内让文字做换行处理，而不是出现横向滚动条或截断


# Upload
用户可传输文件或提交相应的内容 (本页中的示例服务端限制为 10 KB，大于此限制的文件会上传失败)
## API
### Upload.Button
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|size|\"small\" / \"large\" / \"default\" |\"default\"|按钮尺寸|
|type|/ \"default\"  / \"primary\"  / \"secondary\"  / \"danger\"  / \"warning\"  / \"success\"  / \"link\" |\"default\"|按钮类型|
|placeholder|ReactNode||按钮默认内容|
|loading|ReactNode||上传中按钮的内容，如果是字符串默认会有spin loading|
### Upload.Image
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|width|number |80|上传图片容器宽度|
|height|number |80|上传图片容器高度|
### Upload
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|onChange|((value: T[]) => void) ||值改变回调(上传成功，删除)。values: 数组, 其每个值是 onSuccess 的返回值|
|value|any[]||defaultValue 和 value 可以同时设置，defaultValue 会被value覆盖 在 Form 中，value会被表单接管，value 无效|
|accept|string ||上传文件类型, 和标准一致, 详见[accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)|
|action|string / ((file: File) => string) ||上传地址|
|beforeUpload|((file: File) => Promise<any>) ||上传前的回调|
|validatorHandle|boolean / ((error: any, file: File) => boolean) |true|是否处理校验失败的情况, 如果提供一个函数, 则以函数的返回值判断是否处理此 error|
|headers|object||请求头部信息|
|htmlName|string ||服务端接收的 filename，不填使用 name|
|limit|number |100|最大上传文件数|
|responseType|XMLHttpRequestResponseType ||设置 xhr.responseType|
|request|(options: UploadOptions) => Xhr / void||自定义上传方法。 options: 上传的配置|
|params|object||上传参数|
|withCredentials|boolean |false|是否携带 cookie|
|onStart|((file: File) => void) ||开始上传的回调函数|
|onProgress|false / ((fileInfo: FileRecord) => any) ||上传中进度|
|onSuccess|((res: any, file: File, data?: any, xhr?: XhrResult ) => ValueItem / Error) ||上传成功事件\nres: 上传接口返回结果\nfile: 选择的文件\ndata: 请求的数据\nxhr: 返回的 response|
|onHttpError|((xhr: XhrResult, file: File) => string ) ||上传出错事件(props 中为 onHttpError)|
|filesFilter|((fileList: File[]) => File[]) ||文件选中后的筛选，用户可自定义最终需要上传的文件列表。需返回一个新的文件列表|
|validator|Validator||上传前文件校验，详见下方 Validator|
|forceAccept|string ||在使用时关闭了 accept 提供的文件类型过滤后，强制对文件类型进行校验（值同accept)|
|onErrorRemove|((xhr: XhrResult, file: File, fileInfo?: any) => void) ||上传失败图片删除之后的回调|
|beforeCancel|((file: FileRecord) => void) ||取消文件上传前的回调|
|recoverAble|boolean |false|是否可以恢复已删除的value|
|disabled|boolean |false|是否禁用|
|beforeRemove|((value: ValueItem) => Promise<any>) ||删除前的确认，返回一个Promise用于最终确定是否删除|
|ignorePreview|boolean ||是否忽略上传图片预览|
|className|string ||自定义类名|
|style|CSSProperties ||自定义样式|
|showUploadList|boolean |true|是否展示上传列表|
|drop|boolean |false|是否开启拖拽上传文件|
|multiple|boolean |false|文件多选|
|children|ReactNode||上传占位内容|
|webkitdirectory|string / boolean ||同原生 input 标签的 webkitdirectory 属性|
|defaultValue|T[] ||默认值|
|renderResult|((data: any) => ReactNode) |a => a|结果展示|
|canDelete|boolean / ((item: T, index: number) => boolean) |true|文件是否可以删除|
|customResult|ComponentType<{ value: any; files: any; onValueRemove: (index: number) => void; onFileRemove: (id: string) => void; }> ||自定义Result 组件|
|forceAcceptErrorMsg|string ||forceAccept 类型校验失败后自定义错误提示|
|removeConfirm|string / PopoverConfirmProps ||是否在删除文件和图片前弹出确认|
|listType|\"text\" / \"image\" |\"text\"|展示类型|
|leftHandler|boolean |false|添加图片视图是否在左侧展示|
|imageStyle|CSSProperties |{width: 80, height: 80}|图片选择框的样式|
|renderContent|((res: any, item: T, index: number, values: T[]) => ReactNode) ||自定义渲染上传的图片|
|onPreview|((url: string, value: T, index: number, values: T[], fun: { preview: () => void; }) => void) ||自定义预览图片操作，默认为画廊展示|
|name|Name ||Form 内存取数据的 key|
|beforeChange|((value: T) => void / T ) ||值改变前的回调，当返回值不为空时将作为组件的新值|
|reserveAble|boolean ||设置为 true 组件卸载后表单不自动删除数据|
|rules|RuleItem[]||校验规则 详见 [Rule](/components/rule)|
|onError|((error?: Error ) => void) ||rules 校验回调|
|bind|string[] ||当值改变是会联动校验 bind 中的字段, 需要配合 Form 使用|
### UploadOptions
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|url|string||上传地址从 action 中获取|
|name|string||formData 中存的字段名|
|withCredentials|boolean|false|是否携带 cookie|
|responseType|XMLHttpRequestResponseType ||同 props 中的 responseType|
|file|File||传入文件|
|headers|object||请求头部信息|
|onError|(xhr: XhrResult) => void||上传出错事件(props 中为 onHttpError)|
|onLoad|(xhr: XhrResult) => void||上传事件|
|onProgress|(event: ProgressEvent<EventTarget>, msg?: string ) => any||上传中进度|
|onStart|((file: File) => void) ||开始上传事件|
|onSuccess|((res?: string , file?: File , data?: any, xhr?: XhrResult ) => Error / T) ||上传成功事件|
|params|object||上传参数|
### Validator
|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|customValidator|((file: File) => void / Promise<any> / Error) ||自定义校验|
|ext|((ext: string) => void / Promise<any> / Error) ||判断后缀名，传入参数为文件后缀，校验失败返回 Error|
|imageSize|(image: { width: number; height: number; }) => void / Error||只对 Image 有效，判断图片尺寸，校验失败返回 Error|
|size|((size: number) => void / Promise<any> / Error) ||判断文件大小，校验失败返回 Error|
## Example
### 基本用法
基础的文件上传, onSuccess 的返回值会作为 value 传给 onChange
```tsx
/**
 * cn - 基本用法
 *    -- 基础的文件上传, onSuccess 的返回值会作为 value 传给 onChange
 * en - Base
 *    -- Basic usage for uploading file, the onSuccess's returns will be the onChange params

 */
import React from 'react';
import { Button, Upload } from 'shineout';
import { UploadIcon } from './static/icon';


const App: React.FC = () => {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <Upload
      action='//jsonplaceholder.typicode.com/posts'
      accept='image/*'
      value={value}
      htmlName='file'
      onSuccess={(_res, file) => file.name}
      onChange={(v) => {
        setValue(v);
      }}
    >
      <Button mode={'outline'}>
        <UploadIcon style={{ marginInlineEnd: 4 }} />
        Upload file
      </Button>
    </Upload>
  );
};
export default App;

```
### 上传图片
使用 Upload.Image 处理带预览的图片上
```tsx
/**
 * cn - 上传图片
 *    -- 使用 Upload.Image 处理带预览的图片上
 * en - Upload Image
 *    -- Basic usage for uploading file, the onSuccess's returns will be the onChange params

 */
import React from 'react';
import { Upload } from 'shineout';

const App: React.FC = () => {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <Upload.Image
      action='//jsonplaceholder.typicode.com/posts'
      accept='image/*'
      value={value}
      htmlName='file'
      recoverAble
      leftHandler
      removeConfirm='Are you sure to delete it ?'
      limit={3}
      onSuccess={(_res, filem, data) => {
        return data;
      }}
      onChange={(v) => {
        setValue(v);
      }}
    />
  );
};
export default App;

```
### 按钮上传
使用 Upload.Button 展示单个文件的上传进度
```tsx
/**
 * cn - 按钮上传
 *    -- 使用 Upload.Button 展示单个文件的上传进度
 * en - Button
 *    -- Use Upload.Button to show the upload progress of individual files
 */
import React from 'react';
import { Upload } from 'shineout';

const App: React.FC = () => (
  <Upload.Button
    type={'primary'}
    action='//jsonplaceholder.typicode.com/posts'
    name='file'
    onSuccess={(_res, file) => file.name}
    loading='Uploading...'
    placeholder='Click to upload'
  />
);

export default App;

```
### 自定义结果
默认展示的结果和 value 里面所存储的值是一样的, 如果有需求需要, 可以用 renderResult 自行处理
```tsx
/**
 * cn - 自定义结果
 *    -- 默认展示的结果和 value 里面所存储的值是一样的, 如果有需求需要, 可以用 renderResult 自行处理
 * en - Custom result
 *    -- The result of the default display is the same as the value stored in the value. If there is a need, you can use the renderResult to handle it yourself

 */
import React from 'react';
import { Button, Upload } from 'shineout';
import { UploadIcon } from './static/icon';

const App: React.FC = () => {
  const [value, setValue] = React.useState<{ name: string }[]>([]);

  return (
    <Upload
      action='//jsonplaceholder.typicode.com/posts'
      accept='image/*'
      value={value}
      htmlName='file'
      renderResult={(f) => f.name}
      onSuccess={(_res, file) => ({
        name: file.name,
      })}
      onChange={(v) => {
        setValue(v);
      }}
      limit={3}
    >
      <Button mode={'outline'}>
        <UploadIcon style={{ marginInlineEnd: 4 }} />
        Upload file
      </Button>
    </Upload>
  );
};

export default App;

```
### 自定义图片
使用  renderContent 可以自定义上传之后的图片结果.
```tsx
/**
 * cn - 自定义图片
 *    -- 使用  renderContent 可以自定义上传之后的图片结果.
 * en - Custom Image
 *    -- Use renderContent to customize the image results after uploading
 */
import React from 'react';
import { Message, Upload } from 'shineout';


const App: React.FC = () => (
  <Upload.Image
    action='//jsonplaceholder.typicode.com/posts'
    accept='image/*'
    name='file'
    leftHandler
    onSuccess={(_res, _file, data) => ({ data })}
    renderResult={(f) => f.data}
    limit={3}
    renderContent={(d, v, i, values) => {
      console.log(d, v, i, values);
      return (
        <div onClick={() => Message.info('i am click')}>
          <img width='100%' src={d} alt='not found' />
        </div>
      );
    }}
  />
);

export default App;

```
### 删除确认
设置 removeConfirm 属性来开启删除前确认
```tsx
/**
 * cn - 删除确认
 *    -- 设置 removeConfirm 属性来开启删除前确认
 * en - Remove Confirm
 *    -- Set the removeConfirm property to enable confirmation before deleting
 */
import React from 'react';
import { Button, Upload } from 'shineout';
import { UploadIcon } from './static/icon';

const df = [
  {
    name: 'mountain.png',
    data: 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
  },
];

const App: React.FC = () => (
  <div>
    <Upload
      defaultValue={df}
      action='//jsonplaceholder.typicode.com/posts'
      renderResult={(d) => d.name}
      onSuccess={(_res, file) => ({ name: file.name })}
      removeConfirm='Are you sure to delete it ?'
    >
      <Button mode={'outline'}>
        <UploadIcon style={{ marginInlineEnd: 4 }} />
        Upload file
      </Button>
    </Upload>
    <Upload.Image
      leftHandler
      style={{ marginTop: 24 }}
      defaultValue={df}
      action='//jsonplaceholder.typicode.com/posts'
      renderResult={(d) => d.data}
      onSuccess={(_res, file, data) => ({ data })}
      removeConfirm='Are you sure to delete it ?'
    />
  </div>
);

export default App;

```
### 撤销删除
设置 recoverAble 属性来开启撤销删除
```tsx
/**
 * cn - 撤销删除
 *    -- 设置 recoverAble 属性来开启撤销删除
 * en - Recover Delete
 *    -- Set the recoverAble property to enable recover delete
 */
import React from 'react';
import { Button, Upload } from 'shineout';
import { UploadIcon } from './static/icon';

const df = [
  {
    name: 'mountain.png',
    data: 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
  },
];
const App: React.FC = () => (
  <div>
    <Upload
      defaultValue={df}
      action='//jsonplaceholder.typicode.com/posts'
      recoverAble
      renderResult={(d) => d.name}
      onSuccess={(_res, file) => ({ name: file.name })}
    >
      <Button mode={'outline'}>
        <UploadIcon style={{ marginInlineEnd: 4 }} />
        Upload file
      </Button>
    </Upload>
    <Upload.Image
      leftHandler
      style={{ marginTop: 24 }}
      defaultValue={df}
      action='//jsonplaceholder.typicode.com/posts'
      renderResult={(d) => d.data}
      onSuccess={(_res, file, data) => ({ data, name: file.name })}
      recoverAble
    />
  </div>
);

export default App;

```
### 校验尺寸
通过 validator.imageSize 校验图片长宽，本例为 200px * 100px
```tsx
/**
 * cn - 校验尺寸
 *    -- 通过 validator.imageSize 校验图片长宽，本例为 200px * 100px
 * en - Validator Image Size
 *    -- Set validator.imageSize to validate the width and height of the image
 */
import React from 'react';
import { Upload } from 'shineout';
import { AddIcon } from './static/icon';

const App: React.FC = () => (
  <Upload.Image
    action='//jsonplaceholder.typicode.com/posts'
    accept='image/*'
    name='file'
    leftHandler
    onSuccess={(_res, _file, data) => ({ data })}
    width={400}
    height={200}
    renderResult={(f) => f.data}
    validator={{
      imageSize: (img) =>
        img.width !== 200 || img.height !== 100 ? new Error('only allow 200px * 100px') : undefined,
      ext: (ext) =>
        ['jpg', 'png'].includes(ext) ? undefined : new Error('File extension must be jpg or png'),
    }}
  >
    <div style={{ padding: '50px 16px' }}>
      <div style={{ margin: 'auto', fontSize: 12, textAlign: 'center', lineHeight: '16px' }}>
        <AddIcon />
        <div style={{ marginTop: 16, color: '#666c7c' }}>Upload Image</div>
        <div style={{ marginTop: 4, color: '#999DA8' }}>Allow size 200 * 100</div>
      </div>
    </div>
  </Upload.Image>
);
export default App;

```
### 文件大小
文件大小校验，本例为 10KB
```tsx
/**
 * cn - 文件大小
 *    -- 文件大小校验，本例为 10KB
 * en -
 *    -- Set validator.size to validate the size of the file. This example is 10KB
 */
import React from 'react';
import { Button, Upload } from 'shineout';
import { UploadIcon } from './static/icon';

const App: React.FC = () => (
  <div>
    <Upload
      action='//jsonplaceholder.typicode.com/posts'
      accept='image/*'
      multiple
      name='file'
      onSuccess={(_res, file) => file.name}
      validator={{
        size: (s) => (s > 10240 ? new Error('max file size is 10KB') : undefined),
      }}
      validatorHandle={(error, file) => {
        console.log(error, file);
        return true;
      }}
    >
      <Button mode={'outline'}>
        <UploadIcon style={{ marginInlineEnd: 4 }} />
        Upload file
      </Button>
    </Upload>
  </div>
);
export default App;

```
### 异常处理
onHttpError 用来处理上传到服务器返回的异常
```tsx
/**
 * cn - 异常处理
 *    -- onHttpError 用来处理上传到服务器返回的异常
 * en - Error
 *    -- Set onHttpError to handle exceptions returned by uploading to the server
 */
import React from 'react';
import { Button, Upload } from 'shineout';
import { UploadIcon } from './static/icon';

const App: React.FC = () => (
  <div>
    <Upload
      action='/path-no-exist'
      accept='image/*'
      name='file'
      onSuccess={(_res, file) => file.name}
      onHttpError={(xhr) => {
        console.log(xhr);
        if (xhr.status === 404) return 'Url not found.';
        return 'Upload Fail.';
      }}
      limit={3}
    >
      <Button mode={'outline'}>
        <UploadIcon style={{ marginInlineEnd: 4 }} />
        Upload file
      </Button>
    </Upload>
  </div>
);

export default App;

```
### 自定义上传
通过 request 函数，替代默认上传方法
```tsx
/**
 * cn - 自定义上传
 *    -- 通过 request 函数，替代默认上传方法
 * en - Custom Request
 *    -- Set request property to use your own XMLHttpRequest
 */
import React from 'react';
import { Button, TYPE, Upload } from 'shineout';
import { UploadIcon } from './static/icon';

type ValueItem = { name: string };
type UploadProps = TYPE.Upload.Props<ValueItem>;

const request: UploadProps['request'] = (options) => {
  const { file, onLoad, onError, onProgress } = options;
  const xhr = new XMLHttpRequest();
  xhr.open('post', '//jsonplaceholder.typicode.com/posts');

  const data = new FormData();
  data.append('test', file);
  xhr.upload.onprogress = onProgress;
  xhr.onload = () => onLoad(xhr);
  xhr.onerror = () => onError({ statusText: 'error message' });
  xhr.send(data);

  return xhr;
};

const App: React.FC = () => (
  <Upload
    accept='image/*'
    onSuccess={(_res, file) => ({ name: `upload ${file.name}` })}
    limit={3}
    request={request}
    renderResult={(d) => d.name}
  >
    <Button mode={'outline'}>
      <UploadIcon style={{ marginInlineEnd: 4 }} />
      Upload file
    </Button>
  </Upload>
);

export default App;

```
### 
使用 request 略过上传过程
```tsx
/**
 * cn -
 *    -- 使用 request 略过上传过程
 * en -
 *    -- ignore request with request
 */
import React from 'react';
import { Button, TYPE, Upload } from 'shineout';
import { UploadIcon } from './static/icon';

type ValueItem = { name: string; src: string };
type UploadProps = TYPE.Upload.Props<ValueItem>;
const request: UploadProps['request'] = (options) => {
  const { file, onLoad, onError } = options;
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    onLoad({ status: 200, response: reader.result });
  });
  reader.addEventListener('error', () => {
    onError({ statusText: 'Oops, something went wrong' });
  });
  reader.readAsDataURL(file);
};

const App: React.FC = () => (
  <Upload
    accept='image/*'
    onSuccess={(dataURL, file) => ({ name: file.name, src: dataURL })}
    request={request}
    renderResult={(d) => d.name}
    limit={3}
  >
    <Button mode={'outline'}>
      <UploadIcon style={{ marginInlineEnd: 4 }} />
      Upload file
    </Button>
  </Upload>
);
export default App;

```
### 
此事例演示通过自定义函数压缩文件后上传
```tsx
/**
 * cn -
 *    -- 此事例演示通过自定义函数压缩文件后上传
 * en -
 *    -- Zip file and upload
 */
import React from 'react';
import { Button, TYPE, Upload } from 'shineout';
import { UploadIcon } from './static/icon';
import JSZip from 'jszip';

type ValueItem = { name: string };
type UploadProps = TYPE.Upload.Props<ValueItem>;
const request: UploadProps['request'] = (options) => {
  const { file, onLoad, onError, onProgress } = options;

  const xhr = new XMLHttpRequest();
  xhr.open('post', '//jsonplaceholder.typicode.com/posts');

  // @ts-ignore
  const zip = new JSZip();
  zip.file(file.name, file);
  zip
    .generateInternalStream({ type: 'blob' })
    .accumulate((e) => {
      // @ts-ignore
      onProgress(e, 'zipping...');
    })
    .then((content: Blob) => {
      const zipFile = new File([content], `${file.name}.zip`);
      const data = new FormData();
      data.append('file', zipFile);
      xhr.upload.onprogress = (m) => onProgress(m, 'sending...');
      xhr.onload = () => onLoad(xhr);
      xhr.onerror = () => onError({ statusText: 'error message' });
      xhr.send(data);
    });

  return xhr;
};

const App: React.FC = () => (
  <Upload
    onSuccess={(_res, file) => ({ name: `upload ${file.name}` })}
    limit={3}
    style={{ width: 300 }}
    request={request}
    renderResult={(d) => d.name}
  >
    <Button mode={'outline'}>
      <UploadIcon style={{ marginInlineEnd: 4 }} />
      Upload file
    </Button>
  </Upload>
);
export default App;

```
### 默认值
默认值示例
```tsx
/**
 * cn - 默认值
 *    -- 默认值示例
 * en - defaultValue
 *    -- defaultValue example
 */
import React from 'react';
import { Button, Upload } from 'shineout';
import { UploadIcon } from './static/icon';

const defaultValue = [
  {
    name: 'test file.png',
    url: '../../../images/1_s.jpg',
  },
];
const App: React.FC = () => (
  <div>
    <Upload
      action='//jsonplaceholder.typicode.com/posts'
      accept='image/*'
      multiple
      limit={2}
      name='file'
      onSuccess={(_res, file) => ({ name: file.name })}
      style={{ width: 300, marginBottom: 30 }}
      defaultValue={defaultValue}
      renderResult={(f) => f.name}
    >
      <Button mode={'outline'}>
        <UploadIcon style={{ marginInlineEnd: 4 }} />
        Upload file
      </Button>
    </Upload>
  </div>
);

export default App;

```
### 拖拽上传
设置 drop 来支持拖拽上传
```tsx
/**
 * cn - 拖拽上传
 *    -- 设置 drop 来支持拖拽上传
 * en - Drag and Drop
 *    -- set drop to Drag files to upload
 */
import React from 'react';
import { Upload } from 'shineout';
import { AddIcon, ImageIcon } from './static/icon';

const DraggerImage: React.FC = () => (
  <Upload.Image
    action='//jsonplaceholder.typicode.com/posts'
    multiple
    name='file'
    onSuccess={(_res, _file, data) => data}
    width={200}
    height={156}
    leftHandler
    drop
  >
    <div style={{ textAlign: 'center', padding: '50px 16px', fontSize: 12, lineHeight: '16px' }}>
      <ImageIcon style={{ fontSize: 20, marginBottom: 16 }} />
      <p style={{ margin: '0' }}>Click or drag image to upload</p>
    </div>
  </Upload.Image>
);

const DraggerFile: React.FC = () => (
  <Upload
    action='//jsonplaceholder.typicode.com/posts'
    multiple
    name='file'
    onSuccess={(_res, file) => file.name}
    limit={3}
    style={{ width: 400 }}
    drop
  >
    <div
      style={{
        height: 200,
        boxSizing: 'border-box',
        padding: '50px 16px',
        fontSize: 12,
        lineHeight: '16px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AddIcon style={{ fontSize: 20, marginBottom: 16 }} />
      <p style={{ margin: '0' }}>Click or drag file to this area to upload</p>
    </div>
  </Upload>
);

const App: React.FC = () => (
  <div>
    <DraggerFile />
    <div style={{ marginTop: 24 }} />
    <DraggerImage />
  </div>
);

export default App;

```
### 图片禁用

```tsx
/**
 * cn - 图片禁用
 *    --
 * en - Image Disabled
 *    --

 */
import React from 'react';
import { Upload } from 'shineout';

const df = [
  {
    name: 'mountain.png',
    data: 'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
  },
];
const App: React.FC = () => {
  return (
    <Upload.Image
      action='//jsonplaceholder.typicode.com/posts'
      leftHandler
      accept='image/*'
      defaultValue={df}
      renderResult={(d) => d.data}
      htmlName='file'
      disabled
      onSuccess={(_res, file, data) => {
        return {
          name: file.name,
          data: data,
        };
      }}
    />
  );
};
export default App;

```
### 禁用

```tsx
/**
 * cn - 禁用
 *    --
 * en - Disabled
 *    --

 */
import React from 'react';
import { Button, Upload } from 'shineout';
import { UploadIcon } from './static/icon';

const App: React.FC = () => {
  return (
    <Upload
      action='//jsonplaceholder.typicode.com/posts'
      defaultValue={['1.png']}
      accept='image/*'
      htmlName='file'
      disabled
      onSuccess={(_res, file) => file.name}
    >
      <Button mode={'outline'} disabled>
        <UploadIcon style={{ marginInlineEnd: 4 }} />
        Upload file
      </Button>
    </Upload>
  );
};
export default App;

```
### 提交校验
当有文件正在上传或者上传失败的时候会阻止提交
```tsx
/**
 * cn - 提交校验
 *    -- 当有文件正在上传或者上传失败的时候会阻止提交
 * en - Form validate
 *    --

 */
import React from 'react';
import { Button, Form, Upload } from 'shineout';
import { UploadIcon } from './static/icon';

const App: React.FC = () => {
  return (
    <Form
      onSubmit={(d) => {
        console.log('onSubmit', d);
      }}
    >
      <Upload
        action='//jsonplaceholder.typicode.com/posts/404'
        defaultValue={['1.png']}
        showUploadList={true}
        accept='image/*'
        name='file'
        onSuccess={(_res, file) => file.name}
        onHttpError={(xhr) => {
          if (xhr.status === 404) return 'Url not found.';
          return 'Upload Fail.';
        }}
      >
        <Button mode={'outline'}>
          <UploadIcon style={{ marginInlineEnd: 4 }} />
          Upload file
        </Button>
      </Upload>
      <Button mode={'outline'} htmlType={'submit'} style={{ marginTop: 8 }}>
        Submit
      </Button>
    </Form>
  );
};
export default App;

```
## Guide
### 何时使用
需要对文件进行导入或上传时
### 常见用法
需要呈现清晰的上传状态，包含初始状态、拖拽状态、上传过程、上传成功和上传失败等
### 推荐/慎用示例
上传图片按钮建议始终保持在左侧
