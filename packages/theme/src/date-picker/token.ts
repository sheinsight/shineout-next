// 此文件受脚本控制，修改后将自动同步 type.ts datePicker.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and datePicker.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const datePickerTokenDescription = {
  date: '日期',
  picker: '选择器',
  header: '头部',
  panel: '面板',
  shadow: '阴影',
  icon: '图标',
  hot: '热区',
  body: '主体',
  footer: '底部',
  left: '左侧',
  right: '右侧',
  cell: '单元格',
  range: '范围',
  other: '边界',
  week: '周',
  year: '年',
  month: '月',
  quarter: '季度',
  day: '日',
  time: '时间',
  datetime: '日期时间',
  list: '列表',
  gap: '间距',
  item: '项',
  quick: '快捷选择',
  placeholder: '占位符',
  result: '结果',
  text: '文本',
  top: '顶部',
  bottom: '底部',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts datePicker.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 datePickerRules 强关联，非 datePickerRules 规则内的 token 需手动增加或删减。
 */
const datePickerTokenValue = {};

const datePickerTokenExtraValue = {
  font: { size: '14/regular', color: 'Neutral-text-5' },
  border: { radius: 'Radius-4', color: 'Neutral-border-2' },
  padding: { x: 'Padding-8', y: 'Padding-4' },
  icon: { size: 'Size-7', color: 'Neutral-text-4' },
  small: {
    font: { size: '12/regular' },
    border: { radius: '' },
    padding: { x: 'Padding-8', y: 'Padding-1' },
  },
  large: { font: { size: 'Font-16' }, padding: { x: 'Padding-12', y: 'Padding-7' } },
  placeholder: { color: 'Neutral-text-2' },
  background: { color: 'Neutral-fill-1' },
  clear: { color: 'Neutral-text-3' },
  hover: { border: { color: 'Brand-6' }, clear: { color: 'Neutral-text-4' } },
  focus: { border: { color: 'Brand-7' }, shadow: 'Brand-2' },
  disabled: {
    font: { color: 'Neutral-text-2' },
    placeholder: { color: 'Neutral-text-2' },
    border: { color: 'Neutral-border-1' },
    background: { color: 'Neutral-fill-2' },
  },
  result: {
    text: {
      border: { radius: 'Radius-4' },
      padding: { x: 'Padding-4' },
      small: { padding: { x: 'Padding-4' } },
      large: { padding: { x: 'Padding-10' } },
      active: { background: { color: 'Brand-1' } },
    },
  },
  error: { border: { color: 'Danger-6' }, focus: { shadow: 'Danger-1' } },
  panel: {
    title: { padding: { top: 'Padding-10' }, font: { size: '14/regular' } },
    color: 'Neutral-text-5',
    background: { color: 'Neutral-fill-1' },
    shadow: 'Shadow-2',
    radius: 'Radius-4',
    margin: 'Margin-24',
    border: 'Neutral-border-1',
    header: {
      font: { size: '14/regular' },
      padding: { x: 'Padding-12', y: 'Padding-8' },
      border: { color: 'Neutral-border-1' },
      icon: {
        color: 'Neutral-text-5',
        width: 'Size-7',
        hot: { width: 'Size-13' },
        hover: { background: { color: 'Neutral-fill-3' } },
      },
      title: { padding: { x: 'Padding-4' } },
    },
    body: { padding: { x: 'Padding-16', y: 'Padding-16' }, font: { size: '14/regular' } },
    footer: {
      padding: { x: 'Padding-16', y: 'Padding-10' },
      left: { font: { size: '14/regular' } },
      right: { font: { size: '14/regular' } },
    },
  },
  cell: {
    color: 'Neutral-text-5',
    hot: { height: 'Size-12' },
    height: 'Size-16',
    hover: { color: 'Neutral-text-5', background: { color: 'Neutral-fill-3' } },
    active: {
      color: 'Neutral-text-1',
      background: { color: 'Brand-6' },
      hover: { background: { color: 'Brand-2' } },
    },
    disabled: { color: 'Neutral-text-2', background: { color: 'Neutral-fill-2' } },
    range: { background: { color: 'Brand-1' } },
    other: { color: 'Neutral-text-2' },
    header: { color: 'Neutral-text-4' },
    margin: { y: 'Margin-4' },
  },
  time: {
    panel: { padding: { x: 'Padding-12', y: 'Padding-7' } },
    list: { gap: 'Margin-8' },
    item: {
      height: 'Size-15',
      border: { radius: 'Radius-4' },
      padding: { y: '2px' },
      background: { color: 'Neutral-fill-1' },
      color: 'Neutral-text-5',
      active: { background: { color: 'Brand-1' }, color: 'Brand-6' },
      disabled: { color: 'Neutral-text-2' },
      hover: { background: { color: 'Neutral-fill-2' } },
    },
  },
  quick: {
    panel: {
      padding: { x: 'Padding-8', y: 'Padding-12' },
      gap: 'Margin-8',
      item: {
        font: { size: '12/regular' },
        padding: { x: 'Padding-12', y: 'Padding-2' },
        hover: { background: { color: 'Neutral-fill-2' } },
      },
    },
  },
};

module.exports = {
  datePickerTokenValue,
  datePickerTokenExtraValue,
  datePickerTokenDescription,
};
