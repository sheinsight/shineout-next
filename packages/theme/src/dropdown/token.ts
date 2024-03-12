// 此文件受脚本控制，修改后将自动同步 type.ts dropdown.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and dropdown.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const dropdownTokenDescription = { dropdown: '下拉菜单', outline: '线框模式下' };

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts dropdown.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 dropdownRules 强关联，非 dropdownRules 规则内的 token 需手动增加或删减。
 */
const dropdownTokenValue = {
  list: {
    border: { radius: 'Radius-4', color: 'Neutral-border-1', width: 'Border-1' },
    padding: { x: 'Padding-4', y: 'Padding-4' },
    font: { size: '14/regular', color: 'Neutral-text-5' },
    small: {
      border: { radius: 'Radius-4' },
      padding: { x: 'Padding-4', y: 'Padding-4' },
      font: { size: '12/regular' },
    },
    large: {
      border: { radius: 'Radius-4' },
      padding: { x: 'Padding-4', y: 'Padding-4' },
      font: { size: '16/regular' },
    },
    background: { color: 'Neutral-fill-1' },
    box: { shadow: 'Shadow-2' },
  },
  option: {
    padding: { x: 'Padding-8', y: 'Padding-5' },
    small: { padding: { x: 'Padding-8', y: 'Padding-2' } },
    large: { padding: { x: 'Padding-12', y: 'Padding-8' } },
    background: { color: 'Neutral-fill-1' },
    font: { color: 'Neutral-text-5' },
    hover: { background: { color: 'Neutral-fill-2' }, font: { color: 'Neutral-text-5' } },
    active: { background: { color: 'Neutral-fill-3' }, font: { color: 'Neutral-text-5' } },
    select: { background: { color: 'Brand-1' }, font: { color: 'Brand-6' } },
    disabled: { background: { color: 'Neutral-fill-1' }, font: { color: 'Neutral-text-2' } },
    group: {
      padding: { x: 'Padding-8', top: 'Padding-10', bottom: 'Padding-2' },
      font: { size: '12/regular', color: 'Neutral-text-3' },
      small: { x: 'Padding-8', top: 'Padding-4', bottom: '' },
      large: { x: 'Padding-12', top: 'Padding-14', bottom: 'Padding-4' },
    },
    divider: {
      background: { color: 'Neutral-border-1' },
      padding: { x: 'Padding-8', y: 'Padding-2' },
      height: 'Border-1',
    },
  },
  column: { padding: { x: 'Padding-4', y: 'Padding-4' } },
};

const dropdownTokenExtraValue = { caret: { margin: { left: 'Margin-4' } } };

module.exports = {
  dropdownTokenValue,
  dropdownTokenExtraValue,
  dropdownTokenDescription,
};
