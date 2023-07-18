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
  font: { color: '', size: '14/regular' },
  background: { color: '' },
  border: { color: '', radius: 'Radius-4' },
  disabled: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
  hover: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
  active: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
  focus: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
  outline: {
    font: { color: '' },
    background: { color: '' },
    border: { color: '' },
    disabled: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    hover: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    active: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    focus: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
  },
  padding: { x: 'Padding-8', y: 'Padding-5' },
  small: {
    font: { size: '12/regular' },
    border: { radius: 'Radius-4' },
    padding: { x: 'Padding-8', y: 'Padding-2' },
  },
  large: {
    font: { size: '16/regular' },
    border: { radius: 'Radius-4' },
    padding: { x: 'Padding-12', y: 'Padding-8' },
  },
};

const dropdownTokenExtraValue = {};

module.exports = {
  dropdownTokenValue,
  dropdownTokenExtraValue,
  dropdownTokenDescription,
};
