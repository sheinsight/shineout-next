---
title: Input
nav:
  title: View
group:
  title: Form
---

# Input 输入框

用户可以在文本框内输入或编辑文字。

## Basic Usage

基本用法

```jsx
import { Input } from '@soui/view';
export default () => <Input placeholder='Label' />;
```

## Left & Right

通过 `left` 或 `right` 自定义左侧和右侧额外内容

```jsx
import { Input } from '@soui/view';
export default () => <Input left='Left' right='Right' placeholder='Input' />;
```

## Password

密码输入框具有显示、隐藏内容功能

```jsx
import { Input } from '@soui/view';
export default () => (
  <div>
    <Input placeholder='Username' style={{ marginBottom: 12 }} />
    <Input type='password' placeholder='Password' />
  </div>
);
```

## Clearable

是否支持一键清空

```jsx
import { Input } from '@soui/view';
export default () => <Input onClear={() => console.log('Clear')} clearable placeholder='Label' />;
```

## Group Usage

组用法

```jsx
import { Input } from '@soui/view';
import { StyleProvider } from '@soui/view';
export default () => (
  <StyleProvider theme={{ components: { input: { borderRadius: 0 } } }}>
    <Input.Group>
      <Input placeholder='Label1' style={{ flex: 1 }} />
      <Input placeholder='Label2' style={{ flex: 1 }} />
    </Input.Group>
  </StyleProvider>
);
```

## Custom Style

自定义样式

```jsx
import { Input, getInputStyle } from '@soui/view';
import immer from 'immer';
import { StyleProvider } from '@soui/view';
const cs = getInputStyle((s) =>
  immer(s, (draft) => {
    draft.wrapper['& input'].color = 'red';
  }),
);
export default () => <Input customStyle={cs} placeholder='Label1' style={{ flex: 1 }} />;
```
