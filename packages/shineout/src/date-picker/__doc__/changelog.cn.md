## 3.8.0-beta.47
2025-08-27

### 🐞 BugFix
- 修复 `DatePicker` 的 `range` 设置了name为数组的场景下强制在 `onPickerChange` 中设置name对应值为undefined后，结果框中无法选中值的问题 ([#1326](https://github.com/sheinsight/shineout-next/pull/1326))

## 3.8.0-beta.30
2025-08-14

### 🐞 BugFix
- 修复 `DatePicker` 的时间范围选择器设置的 `min` 、 `max`、`defaultTime` 属性不生效的问题 ([#1301](https://github.com/sheinsight/shineout-next/pull/1301))


## 3.7.8-beta.2
2025-07-22

### 💎 Enhancement
- `DatePicker` 增强 `disabledTime` 在开启 `range` 且为函数模式下的返回参数 ([#1259](https://github.com/sheinsight/shineout-next/pull/1259))

## 3.7.7-beta.2
2025-07-15

### 🐞 BugFix
- 修复 `DatePicker` 设置了不包含时间相关的 `format` 格式后，时间面板依然可弹出但无选项的问题 ([#1243](https://github.com/sheinsight/shineout-next/pull/1243))
## 3.7.5-beta.5
2025-07-02

### 🐞 BugFix
- 修复 `DatePicker` 的 `formatResult` 属性在 `type` 为 `month` 时，切换月份时展示结果不正确的问题 ([#1220](https://github.com/sheinsight/shineout-next/pull/1220))


## 3.7.4-beta.6
2025-06-25

### 🐞 BugFix
- 修复 `DatePicker` 可输入模式下的快速选择，二次选值后不生效的问题（Regression: since v3.7.3） ([#1207](https://github.com/sheinsight/shineout-next/pull/1207))


## 3.7.3-beta.8
2025-06-20

### 🐞 BugFix
- 修复 `DatePicker` 在开启 `allowSingle` 时可能引发表单死循环的问题 ([#1194](https://github.com/sheinsight/shineout-next/pull/1194))

## 3.7.3-beta.5
2025-06-17

### 🐞 BugFix
- 修复 `DatePicker` 设置 `allowSingle` 后无法点击已选日期取消选中的问题 ([#1183](https://github.com/sheinsight/shineout-next/pull/1183))

## 3.7.3-beta.2
2025-06-16

### 💎 Enhancement
- `DatePicker` 的可输入模式支持宽松的日期格式，例如"2025-06-16 18:00"和"2025-06-16 18" ([#1180](https://github.com/sheinsight/shineout-next/pull/1180))

## 3.7.0-beta.32
2025-05-28

### 💎 Enhancement
- `DatePicker` 的时间选择器修改为默认展示，且直接选择时间后日期部分自动选择为当天，增加弹出动画 ([#1129](https://github.com/sheinsight/shineout-next/pull/1129))

## 3.6.7-beta.6
2025-05-26

### 🐞 BugFix

- 修复 `DatePicker` 在设置了和 `format` 格式不相符的 `defaultValue` 后会触发多次 onChange 的问题 # ([#1125](https://github.com/sheinsight/shineout-next/pull/1125))

## 3.6.6-beta.6
2025-05-09

### 🐞 BugFix

- 修复 `DatePicker` 的 `open` 受控用法下，`onChange` 多了一次调用的问题 ([#1107](https://github.com/sheinsight/shineout-next/pull/1107))

## 3.6.2-beta.3
2025-04-01

### 🐞 BugFix

- 修复 `DatePicker` 可输入模式下输入新的日期后，使用触控板的轻触关闭弹出层时获取不到最新值的问题 ([#1025](https://github.com/sheinsight/shineout-next/pull/1025))

## 3.6.2-beta.2
2025-03-31

### 🐞 BugFix
- 修复 `DatePicker` 的`date` 类型在开启 `inputable` 和 `range`之后，开始日期输入了比结束日期更大值之后可以回车提交的问题  ([#1026](https://github.com/sheinsight/shineout-next/pull/1026))


## 3.6.1-beta.5
2025-03-26

### 🐞 BugFix

- 修复 `DatePicker` 弹出层的层级低于其他absolute元素的问题（Regression： since v3.6.0） ([#1015](https://github.com/sheinsight/shineout-next/pull/1015))

## 3.6.0
2025-03-20

### 🐞 BugFix

- 修复 `DatePicker` 的 `formatResult`函数格式的自定义结果展示不生效的问题 ([#1002](https://github.com/sheinsight/shineout-next/pull/1002))
- 修复 `DatePicker` 的 `open` 受控用法下，onCollapse回调函数可能不触发而导致无法选择的问题 ([#1002](https://github.com/sheinsight/shineout-next/pull/1002))
- 修复 `DatePicker` 仅开启 `needConfirm` 属性情况下不展示今天按钮的问题 ([#983](https://github.com/sheinsight/shineout-next/pull/983))
- 修复 `DatePicker` 小尺寸模式下“今天按钮”不上下居中的问题 ([#983](https://github.com/sheinsight/shineout-next/pull/983))

### 💎 Enhancement
- `DatePicker` 周选择器的结果末尾追加“周”字 ([#1002](https://github.com/sheinsight/shineout-next/pull/1002))

## 3.5.6
2025-01-06

### 🐞 BugFix

- 修复 `DatePicker` 在开启 `range` 和 `open` 属性后第一次点击无法选择日期的问题 ([#897](https://github.com/sheinsight/shineout-next/pull/897))

## 3.5.4
2024-12-12

### 🐞 BugFix

- 修复 `DatePicker` 开启 `quickSelect` 模式下选择快速选项后清空值的问题 ([#855](https://github.com/sheinsight/shineout-next/pull/855))
- 修复 `DatePicker` 开启 `inputable` 和 `range` 后无法输入合法日期的问题 ([#853](https://github.com/sheinsight/shineout-next/pull/853))


## 3.5.3
2024-12-04

### 🐞 BugFix

- 修复 `DatePicker` 在打开过日期选择面板后，然后切换多语言后显示的星期顺序不正确的问题 ([#846](https://github.com/sheinsight/shineout-next/pull/846))
- 修复 `DatePicker` 从 setLocale获取到的 `startOfWeek` 不是0时，展示的星期顺序不正确的问题 ([#845](https://github.com/sheinsight/shineout-next/pull/845))
- 修复 `DatePicker` 在设置 `inputable` 和 `range` 后开始时间可以输入非法值的问题 ([#826](https://github.com/sheinsight/shineout-next/pull/826))


## 3.5.1
2024-11-14

### 🐞 BugFix

- 修复 `DatePicker` 的 `align` 属性失效的问题(Regression: since v3.4.1) ([#799](https://github.com/sheinsight/shineout-next/pull/799))

## 3.4.6
2024-11-05

### 🐞 BugFix

- 修复 `DatePicker` 禁用后可聚焦的问题 ([#778](https://github.com/sheinsight/shineout-next/pull/778))

## 3.4.4
2024-10-28

### 💎 Enhancement

- `DatePicker` 快速选择配置项新增 `immediate` 属性支持选择后立刻关闭面板 ([#745](https://github.com/sheinsight/shineout-next/pull/745))

### 🐞 BugFix

- 修复 `DatePicker` 的 key 值书写问题，解决 React 18.3.0 以上版本 key 字段报错的问题 ([#726](https://github.com/sheinsight/shineout-next/pull/726))

## 3.4.1
2024-09-20

### 🐞 BugFix

- 优化 `DatePicker` 的结果展示区域，改为不换行展示 ([#680](https://github.com/sheinsight/shineout-next/pull/680))

## 3.4.0
2024-09-19

### 🆕 Feature
- `DatePicker` 新增needConfirm属性: 是否开启手动确认按钮，开启后只有点击确认按钮才会提交选择的值。 ([#650](https://github.com/sheinsight/shineout-next/pull/650))
- `DatePicker` 新增clearToUndefined，点击清除后返回undefined ([#644](https://github.com/sheinsight/shineout-next/pull/644))



## 3.3.7
2024-09-11

### 🐞 BugFix

- 修复 `DatePicker` 的defaultPickerValue的第二位不生效的问题 ([#660](https://github.com/sheinsight/shineout-next/pull/660))


## 3.3.6
2024-08-28

### 🐞 BugFix

- 修复 `DatePicker` 快速选择固定值无法高亮的问题 ([#620](https://github.com/sheinsight/shineout-next/pull/620))

## 3.3.3
2024-08-15

### 🐞 BugFix

- 修复 `DatePicker` 聚焦但不打开面板场景下无法回填原值的问题 ([#604](https://github.com/sheinsight/shineout-next/pull/604))

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

