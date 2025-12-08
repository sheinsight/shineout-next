// 此文件受脚本控制，修改后将自动同步 type.ts dropdown.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and dropdown.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const dropdownTokenDescription = {
  dropdown: '下拉菜单',
  outline: '线框模式下',
  caret: '箭头icon的',
  left: '（左侧）',
  list: '列表',
  box: '',
  shadow: '阴影',
  option: '选项',
  select: '选中状态的',
  group: '分组',
  top: '（顶部）',
  bottom: '（底部）',
  column: '多列平铺模式下每列的',
  divider: '分割线',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts dropdown.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 dropdownRules 强关联，非 dropdownRules 规则内的 token 需手动增加或删减。
 */
const dropdownTokenValue = {};

const dropdownTokenExtraValue = {
  list: {
    border: { radius: 'Radius-default', color: 'Neutral-border-1', width: 'Border-1' },
    padding: { x: 'Spacing-4', y: 'Spacing-4' },
    font: { size: 'Font-14', weight: 'Weight-regular', color: 'Neutral-text-5' },
    small: {
      border: { radius: 'Radius-default' },
      padding: { x: 'Spacing-4', y: 'Spacing-4' },
      font: { size: 'Font-12', weight: '' },
    },
    large: {
      border: { radius: 'Radius-default' },
      padding: { x: 'Spacing-4', y: 'Spacing-4' },
      font: { size: 'Font-16', weight: '' },
    },
    background: { color: 'Neutral-fill-1' },
    box: { shadow: 'Shadow-2' },
  },
  option: {
    padding: { x: 'Spacing-8', y: 'Spacing-5' },
    small: { padding: { x: 'Spacing-8', y: 'Spacing-2' } },
    large: { padding: { x: 'Spacing-12', y: 'Spacing-8' } },
    background: { color: 'Neutral-fill-1' },
    font: { color: 'Neutral-text-5', weight: 'Weight-regular' },
    hover: { background: { color: 'Neutral-fill-2' }, font: { color: 'Neutral-text-5' } },
    active: { background: { color: 'Neutral-fill-3' }, font: { color: 'Neutral-text-5' } },
    select: { background: { color: 'Brand-1' }, font: { color: 'Brand-6' } },
    disabled: { background: { color: 'Neutral-fill-1' }, font: { color: 'Neutral-text-2' } },
    border: { radius: 'Radius-2' },
    group: {
      padding: { x: 'Spacing-8', top: 'Font-14', bottom: 'Spacing-2' },
      font: { size: 'Font-12', color: 'Neutral-text-3', weight: 'Weight-regular' },
      small: { x: 'Spacing-8', top: 'Spacing-4', bottom: '' },
      large: { x: 'Spacing-12', top: 'Font-16', bottom: 'Spacing-4', font: { size: 'Font-14' } },
    },
    divider: {
      background: { color: 'Neutral-border-1' },
      padding: { x: 'Spacing-8', y: 'Spacing-2' },
      height: 'Border-1',
    },
  },
  column: { padding: { x: 'Spacing-4', y: 'Spacing-4' } },
  caret: { margin: { left: 'Spacing-4' } },
};

module.exports = {
  dropdownTokenValue,
  dropdownTokenExtraValue,
  dropdownTokenDescription,
};
