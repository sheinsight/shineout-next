## 3.8.0-beta.34
2025-08-14
### 🐞 BugFix

- 修复 `Checkbox` 外层套 `<label>` 标签时双重触发导致无法正常勾选的问题 ([#1307](https://github.com/sheinsight/shineout-next/pull/1307))

## 3.6.0
2025-02-14
### 🐞 BugFix

- 修复 `Checkbox` 在Form中使用且传了name时, Checkbox的onChange会触发两次的问题（Regression: since v3.4.3）([#955](https://github.com/sheinsight/shineout-next/pull/955))

## 3.5.8
2025-02-13
### 🐞 BugFix

- 修复 `Checkbox` 触发两次 `onChange` 的问题（Regression: since v3.5.6） ([#929](https://github.com/sheinsight/shineout-next/pull/929))

## 3.5.6
2025-01-06
### 🐞 BugFix

- 修复 `Checkbox.Group` 在嵌套情况下影响内部选中状态的问题 ([#907](https://github.com/sheinsight/shineout-next/pull/907))

## 3.4.4
2024-10-28
### 🐞 BugFix

- 修复 `Checkbox.Group` 在React 18.3.0以上版本中报defaultProps告警的问题 ([#725](https://github.com/sheinsight/shineout-next/pull/725))


## 3.4.3
2024-10-14
### 🐞 BugFix

- 修复`Checkbox`在createPortal中使用时，无法改变勾选状态的问题 ([#710](https://github.com/sheinsight/shineout-next/pull/710))
- 修复 `Checkbox.Group` 在未传递 `data` 情况下使用 Checkbox 时 disabled 属性失效的问题
 ([#697](https://github.com/sheinsight/shineout-next/pull/697))

## 3.3.7
2024-09-04
### 🐞 BugFix

- 修复 `Checkbox.Group` 的children中的 `Checkbox` 的onChange不触发的问题 ([#638](https://github.com/sheinsight/shineout-next/pull/638))


## 3.3.0
2024-07-23
### 🐞 BugFix

- 修复 `Checkbox.Group` 设置 `size` 属性不生效的问题 ([#582](https://github.com/sheinsight/shineout-next/pull/582))
