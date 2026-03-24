## 3.9.12-beta.4
2026-03-24
### 💅 Style
- 修正多个色系的 Design Token 颜色值，对齐 Ai 组件库设计规范，涉及 `Cyan`、`Indigo`、`Lemon`、`Magenta`、`Neon`、`Brown`、`Purple`、`Tangerine`、`Warning` 等色系 ([#1662](https://github.com/sheinsight/shineout-next/pull/1662))

## 3.9.9-beta.6
2026-01-30
### 💅 Style
- 优化多个组件的样式细节和交互体验，修复 `ButtonGroup`、`Cascader` 等组件的若干问题 ([#1611](https://github.com/sheinsight/shineout-next/pull/1611))

## 3.9.8-beta.3
2026-01-16
### 💅 Style
- 优化多个组件的RTL模式样式 ([#1585](https://github.com/sheinsight/shineout-next/pull/1585))


## 3.9.7-beta.9
2026-01-13
### 💅 Style
- 优化 normalize 和 jss-insertion-point 标签，增加 data-alita-ignore 属性，避免被微前端框架删除 ([#1578](https://github.com/sheinsight/shineout-next/pull/1578))

## 3.9.7-beta.6
2026-01-12
### 🐞 BugFix
- 修复树形数据类的组件可能报 "Cannot read properties of undefined (reading 'children')" 错误的问题 ([#1575](https://github.com/sheinsight/shineout-next/pull/1575))


## 3.9.5-beta.8
2025-12-29

### 🐞 BugFix
-  修复 `Select`、`TreeSelect`、`Cascader` 非 string 类型的 `placeholder` 在有输入值时重复显示了的问题 ([#1551](https://github.com/sheinsight/shineout-next/pull/1551))


## 3.9.5-beta.2
2025-12-23

### 🐞 BugFix
- 修复弹出层类组件在 CSS zoom 嵌套环境下使用 `absolute` 属性时位置偏移的问题 ([#1545](https://github.com/sheinsight/shineout-next/pull/1545))([#1546](https://github.com/sheinsight/shineout-next/pull/1546))


## 3.9.4-beta.7
2025-12-17
### 💅 Style
- 优化框类组件小尺寸字号下 `innerTitle` 的样式表现 ([#1536](https://github.com/sheinsight/shineout-next/pull/1536))


## 3.9.4-beta.5
2025-12-15

### 🐞 BugFix
-  修复 `Select`、`TreeSelect`、`Cascader` 设置 `onFilter` 时，非 string 类型的 `placeholder` 不显示的问题 ([#1534](https://github.com/sheinsight/shineout-next/pull/1534))


## 3.9.3-beta.9
2025-12-09

### 💅 Style
- `setJssConfig` 支持设置 styleAttributes 属性 ([#1515](https://github.com/sheinsight/shineout-next/pull/1515))


## 3.9.3-beta.1
2025-12-08

### 💅 Style
- 重构多个组件的图标尺寸 token，从固定尺寸改为基于字体尺寸 ([#1505](https://github.com/sheinsight/shineout-next/pull/1505))


## 3.9.1-beta.6
2025-11-26

### 🆕 Feature
-  `Select`、`TreeSelect`、`Cascader` 组件新增 `popupClassName` 属性 ([#1489](https://github.com/sheinsight/shineout-next/pull/1489))


## 3.9.0-beta.33
2025-11-25

### 💎 Enhancement
-  新增 utils.validate 方法的导出 ([#1479](https://github.com/sheinsight/shineout-next/pull/1479))


## 3.9.0-beta.32
2025-11-24

### 💎 Enhancement
-  框类选择组件的结果增加原生title属性的显示 ([#1479](https://github.com/sheinsight/shineout-next/pull/1479))

## 3.9.0-beta.29
2025-11-18

### 💎 Enhancement
- 优化组件动画过程中的交互响应，避免动画期间触发不必要的事件和重渲染([#1469](https://github.com/sheinsight/shineout-next/pull/1469))


## 3.9.0-beta.27
2025-11-17

### 💅 Style
- `Switch`、`Spin` 组件增强样式 token 配置([#1465](https://github.com/sheinsight/shineout-next/pull/1465))


## 3.9.0-beta.18
2025-11-05

### 🚀 Performance
- 升级 `reactive` 包，修复潜在的Symbol变量覆盖问题 ([#1450](https://github.com/sheinsight/shineout-next/pull/1450))


## 3.9.0-beta.17
2025-11-05

### 💅 Style
- style包新增 normalizeStyle、normalizeStyleId、jssInsertionPointId的导出 ([#1448](https://github.com/sheinsight/shineout-next/pull/1448))

## 3.9.0-beta.9
2025-10-24

### 💎 Enhancement
- 增强 `setToken` 功能,支持设置 CSS 自定义属性(CSS Variables)格式的变量(如 `--variable-name`) ([#1421](https://github.com/sheinsight/shineout-next/pull/1421))

## 3.8.8-beta.1
2025-10-27

### 💎 Enhancement

- 支持自定义 data 属性透传至对应 DOM 节点 ([#1429](https://github.com/sheinsight/shineout-next/pull/1429))

## 3.8.0-beta.16
2025-07-08

### 💅 Style
- 优化 `normalize` 和 `jss` 样式的插入位置，默认插入到 `document.head` 最前面 ([#1231](https://github.com/sheinsight/shineout-next/pull/1231))


## 3.8.0-beta.10
2025-07-08

### 💎 Enhancement
- 增加 `Radio` 和 `Checkbox` 的选中动画效果 ([#1230](https://github.com/sheinsight/shineout-next/pull/1230))

## 3.8.0-beta.4
2025-06-17

### 🐞 BugFix
- 修复 `utils` 导出名称错误的问题 ([#1187](https://github.com/sheinsight/shineout-next/pull/1187))


## 3.7.4-beta.1
2025-06-20

### 💎 Enhancement
- `setToken` 新增忽略扩展样式开关 `ignoreExtra` 用于屏蔽兼容老版本组件的额外 cssvar ([#1196](https://github.com/sheinsight/shineout-next/pull/1196))

## 3.7.0
2025-05-07

### 🆕 Feature
- 新增 `Skeleton` 骨架屏组件 ([#1100](https://github.com/sheinsight/shineout-next/pull/1100))

## 3.5.8
2025-01-20

### 💎 Enhancement
- 新增 `icons` 的导出: 所有组件内置的svg图标数据，可用于自定义图标 ([#931](https://github.com/sheinsight/shineout-next/pull/931))

## 3.5.4
2024-12-12

### 🆕 Feature
- 新增 `scopeNormalizeStyle` 方法，用于在组件外部重置初始化样式的作用域 ([#857](https://github.com/sheinsight/shineout-next/pull/857))

## 3.5.3
2024-12-04

### 💎 Enhancement
- 优化所有组件，加上统一格式的根className，例如'soui-button'

## 3.4.3
2024-10-14

### 💎 Enhancement
- 优化 `setConfig` 中 `spin` 的配置项，支持全局配置更多内容

## 3.4.0
2024-09-19

### 🆕 Feature
- 新增 `Badge` 徽标组件
- 新增 `Link` 链接组件

## 3.2.0
2024-06-14
### 🎨 Theme
- `Table` 新增不同尺寸下的文字、字重 token
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

## 3.1.29
2024-06-11
### 🐞 BugFix
- 修复主题 token 变量名错误的问题  ([#517](https://github.com/sheinsight/shineout-next/pull/517))

## 3.1.21
2024-05-31
### 🐞 BugFix
- `setConfig` 设置 `delay: 0` 无效的问题  ([#491](https://github.com/sheinsight/shineout-next/pull/491))

## 3.1.20
2024-05-30
### 🐞 BugFix
- `delay` 默认值设为 `200` 和 2.x 版本保持一致 ([#490](https://github.com/sheinsight/shineout-next/pull/490))

## 3.1.13
2024-05-20
### 🐞 BugFix
- 修复 SSR 场景下的一些报错 ([#459](https://github.com/sheinsight/shineout-next/pull/459))

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

