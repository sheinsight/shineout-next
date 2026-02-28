## 3.9.10-beta.4
2026-02-28
### 🚀 Performance
- 优化 `Menu` inline 模式下子菜单的渲染性能，未展开的子菜单不渲染 DOM，展开后保留 ([#1635](https://github.com/sheinsight/shineout-next/pull/1635))

### 💎 Enhancement
- `Menu` 使用 `active` 且非受控时，自动展开激活项的父级菜单 ([#1635](https://github.com/sheinsight/shineout-next/pull/1635))

## 3.9.8-beta.16
2026-01-23
### 🐞 BugFix
- 修复 `Menu` 的前置展开符的缩进问题 ([#1603](https://github.com/sheinsight/shineout-next/pull/1603))


## 3.9.7-beta.7
2026-01-12
### 🐞 BugFix
- 修复 `Menu` 的折叠图标在Safari浏览器中不显示的问题 ([#1576](https://github.com/sheinsight/shineout-next/pull/1576))


## 3.9.6-beta.2
2025-12-30

### 🆕 Feature
- `Menu` 新增 `getItemProps` 属性，支持为每个菜单项添加自定义属性（如埋点属性） ([#1555](https://github.com/sheinsight/shineout-next/pull/1555))
- `Menu` 支持在数据项中直接配置 `data-*` 属性并应用到对应的 DOM 元素上 ([#1555](https://github.com/sheinsight/shineout-next/pull/1555))


## 3.9.2-beta.2
2025-12-02

### 🆕 Feature
- `Menu` 新增 `inlineAnimate` 属性，支持 inline 模式下的子菜单折叠展开动画 ([#1484](https://github.com/sheinsight/shineout-next/pull/1484))([#1495](https://github.com/sheinsight/shineout-next/pull/1495))


## 3.8.6-beta.6
2025-10-11

### 💎 Enhancement
- 优化 `Menu` 垂直模式下子级菜单高度超出窗口后的展示效果 ([#1404](https://github.com/sheinsight/shineout-next/pull/1404))

## 3.4.0
2024-09-19

### 🆕 Feature
- `Menu` 新增父节点激活状态下的文字颜色 token ([#659](https://github.com/sheinsight/shineout-next/pull/659))


## 3.3.3
2024-08-07

### 🐞 BugFix
- 修复 `Menu` 水平模式下高度100%的问题


## 3.3.0
2024-07-23

### 🐞 BugFix
- 修复 `Menu.Search` 的 `collapse` 属性拼写错误的问题 ([#585](https://github.com/sheinsight/shineout-next/pull/585))


### 🆕 Feature
- `Menu` 支持水平模式的暗系主题 ([#505](https://github.com/sheinsight/shineout-next/pull/505))


## 3.2.2
2024-06-21

### 🐞 BugFix
- 修复 `Menu` content 缺少了 `flex` 样式  ([#537](https://github.com/sheinsight/shineout-next/pull/537))

- 修复 `Menu` 当传入 `linkKey` 属性，如果数据取不到 `link` 控制台会报错的问题  ([#529](https://github.com/sheinsight/shineout-next/pull/529))


## 3.2.1
2024-06-17

### 🐞 BugFix
- 修复 `Menu` 引入组件路径错误的问题 ([#526](https://github.com/sheinsight/shineout-next/pull/526))


## 3.2.0
2024-06-13

### 🆕 Feature

- `Menu` 新增 `Collapse` 属性支持折叠功能 ([#505](https://github.com/sheinsight/shineout-next/pull/505))
- `Menu` 支持 `renderIcon` 属性支持渲染图标  ([#505](https://github.com/sheinsight/shineout-next/pull/505))
- `Menu` 支持 `header` 属性渲染顶部内容  ([#505](https://github.com/sheinsight/shineout-next/pull/505))
