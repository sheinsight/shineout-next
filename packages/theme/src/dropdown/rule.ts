// 此文件受脚本控制，修改后将自动同步 type.ts dropdown.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and dropdown.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const dropdownTokenDescription = { dropdown: '下拉菜单', List: '下拉菜单列表', Option: '选项' };

/**
 * token 规则
 * 用于生成 token 的规则，修改保存后将自动更新 token。
 * 规则变量名称为 组件名称 + Rules。请勿修改变量命名，否则将导致 token 无法生成。
 */
const dropdownRules = {
  listOptionCommon: [['list'], ['border-width', 'aaa']],
  listSize: [
    ['list'],
    ['', 'small', 'large'],
    ['border-radius', 'padding-x', 'padding-y', 'font-size'],
  ],
  listColor: [['list'], ['background-color', 'border-color', 'font-color', 'box-shadow']],
  ListOptionSize: [['listOption'], ['', 'small', 'large'], ['padding-x', 'padding-y']],
  listOptionColor: [
    ['list-option'],
    ['', 'focus', 'active', 'select', 'disabled'],
    ['background-color', 'border-color', 'font-color'],
  ],
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts dropdown.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 dropdownRules 强关联，非 dropdownRules 规则内的 token 需手动增加或删减。
 */
const dropdownTokenValue = {
  list: {
    border: { width: 'Border-1', radius: 'Radius-4', color: 'Neutral-border-1' },
    aaa: '',
    padding: { y: 'Padding-4', x: 'Padding-4' },
    font: { size: '14/regular', color: 'Neutral-text-5' },
    small: {
      border: { radius: 'Radius-4' },
      padding: { y: 'Padding-4', x: 'Padding-4' },
      font: { size: '12/regular' },
    },
    large: {
      border: { radius: 'Radius-4' },
      padding: { y: 'Padding-4', x: 'Padding-4' },
      font: { size: '16/regular' },
    },
    background: { color: 'Neutral-fill-1' },
    box: { shadow: 'Shadow-1' },
  },
  listOption: {
    padding: { y: '' },
    small: { padding: { y: '' } },
    large: { padding: { y: '' } },
    background: { color: '' },
    border: { color: '' },
    font: { color: '' },
    focus: { background: { color: '' }, border: { color: '' }, font: { color: '' } },
    active: { background: { color: '' }, border: { color: '' }, font: { color: '' } },
    select: { background: { color: '' }, border: { color: '' }, font: { color: '' } },
    disabled: { background: { color: '' }, border: { color: '' }, font: { color: '' } },
  },
  listoption: {
    padding: { y: '' },
    small: { padding: { y: '' } },
    large: { padding: { y: '' } },
    background: { color: '' },
    border: { color: '' },
    font: { color: '' },
    focus: { background: { color: '' }, border: { color: '' }, font: { color: '' } },
    active: { background: { color: '' }, border: { color: '' }, font: { color: '' } },
    select: { background: { color: '' }, border: { color: '' }, font: { color: '' } },
    disabled: { background: { color: '' }, border: { color: '' }, font: { color: '' } },
  },
};

module.exports = {
  dropdownRules,
  dropdownTokenValue,
  dropdownTokenDescription,
};
