## 3.5.3-beta.2
2024-11-28

### 🐞 BugFix

- 修复 `DatePicker` 在设置 `inputable` 和 `range` 后开始时间可以输入非法值的问题 ([#826](https://github.com/sheinsight/shineout-next/pull/826))

## 3.5.1
2024-11-14

### 🐞 BugFix

- 修复 `DatePicker` 组件 `align` 属性失效的问题(Regression: since v3.4.1) ([#799](https://github.com/sheinsight/shineout-next/pull/799))

## 3.4.6
2024-11-05

### 🐞 BugFix

- 修复 `DatePicker` 禁用后可聚焦的问题 ([#778](https://github.com/sheinsight/shineout-next/pull/778))

## 3.4.4
2024-10-28

### 💎 Enhancement

- `DatePicker` 快速选择配置项新增 `immediate` 属性支持选择后立刻关闭面板 ([#745](https://github.com/sheinsight/shineout-next/pull/745))

### 🐞 BugFix

- 修复 `Datepicker` 组件 key 值书写问题，解决 React 18.3.0 以上版本 key 字段报错的问题 ([#726](https://github.com/sheinsight/shineout-next/pull/726))

## 3.4.1
2024-09-20

### 🐞 BugFix

- 优化 `Datepicker` 的结果展示区域，改为不换行展示 ([#680](https://github.com/sheinsight/shineout-next/pull/680))

## 3.4.0
2024-09-19

### 🆕 Feature
- `Datepicker` 新增needConfirm属性: 是否开启手动确认按钮，开启后只有点击确认按钮才会提交选择的值。 ([#650](https://github.com/sheinsight/shineout-next/pull/650))
- `Datepicker` 新增clearToUndefined，点击清除后返回undefined ([#644](https://github.com/sheinsight/shineout-next/pull/644))



## 3.3.7
2024-09-11

### 🐞 BugFix

- 修复 `Datepicker` 的defaultPickerValue的第二位不生效的问题 ([#660](https://github.com/sheinsight/shineout-next/pull/660))


## 3.3.6
2024-08-28

### 🐞 BugFix

- 修复 `Datepicker` 快速选择固定值无法高亮的问题 ([#620](https://github.com/sheinsight/shineout-next/pull/620))

## 3.3.3
2024-08-15

### 🐞 BugFix

- 修复 `Datepicker` 聚焦但不打开面板场景下无法回填原值的问题 ([#604](https://github.com/sheinsight/shineout-next/pull/604))

## 3.3.0
2024-07-23

### 🐞 BugFix

- 修复 `DatePicker` 在range为number的情况下，开始时间可以大于结束时间的问题 ([#579](https://github.com/sheinsight/shineout-next/pull/579))

## 3.2.3
2024-06-25

### 🐞 BugFix

- 修复 `DatePicker` 日期时间范围选择双击日期时的计算逻辑和 2.x 版本保持一致 ([#543](https://github.com/sheinsight/shineout-next/pull/543))

## 3.1.27
2024-06-06

### 🐞 BugFix

- 修复 `DatePicker` 值为空时无法点击选择 0 的问题 ([#507](https://github.com/sheinsight/shineout-next/pull/507))

## 3.0.10
2024-05-06

### 💅 Style

-  `DatePicker` 高度支持被内容撑开 ([#410](https://github.com/sheinsight/shineout-next/pull/410))

## 3.0.8
2024-04-26

### 🐞 BugFix

- 修复 `DatePicker` 范围选择双击可以选中禁用日期的问题 ([#400](https://github.com/sheinsight/shineout-next/pull/400))


## 3.0.5
2024-04-24

### 🐞 BugFix

- 修复 `DatePicker` 回退箭头方向反了的问题 ([#392](https://github.com/sheinsight/shineout-next/pull/392))

