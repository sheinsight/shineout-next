## 3.2.0-rc.2
2024-05-13
### 🎨 Theme
- `Input` 新增 error 状态下的边框、背景 token
- `Datepicker` 组件触发器 token 同步 `Input`
- `Cascader` 组件触发器 token 同步 `Input`
- `TreeSelect` 组件触发器 token 同步 `Input`
- `Select` 组件触发器 token 同步 `Input`

### 🆕 Feature

- `Cascader` 新增 adjust 属性，支持取消自动调整展开，强制指定方向
- `Datepicker` 新增 adjust 属性，支持取消自动调整展开，强制指定方向
- `Dropdown` 新增 adjust 属性，支持取消自动调整展开，强制指定方向
- `TreeSelect` 新增 adjust 属性，支持取消自动调整展开，强制指定方向

## 3.1.2
2024-05-10
### 💎 Enhancement
- 调整组件默认的 Spin 类型为 `ring` ([#422](https://github.com/sheinsight/shineout-next/pull/422))

## 3.1.0
2024-05-09

### 🆕 Feature

- 所有组件支持 `rtl` 模式

### 🐞 BugFix

- 修复 `Table` 虚拟列表拖动到底部可能展示不全的问题

### 💎 Enhancement
- 优化 `Table` 固定表头的样式

### 💅 Style

- 优化 `Alert` `Form.Item` `Modal` `Popover` `Tooltip` `Upload` 单词换行样式 ([#375](https://github.com/sheinsight/shineout-next/pull/375))

### 🆎 Type

### 🎨 Theme

- 移除 `regular` 和 `medium` token，替换为 `font` 系列 token 并替换组件中所有引用
- 移除 `padding` 和 `margin` token，替换为 `spacing` 系列 token 并替换组件中所有引用
- 调整 `Button` 组件 `spacing` `radius` `weight` 类型 token 引用
- 调整 `setToken` 支持更新组件 token

