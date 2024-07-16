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
  listSize: [
    ['list'],
    ['', 'small', 'large'],
    ['border-radius', 'padding-x', 'padding-y', 'font-size', 'font-weight'],
  ],
  listColor: [['list'], ['background-color', 'border-color', 'font-color', 'box-shadow']],
  listOption: [['list'], ['border-width']],
  ListOptionSize: [['option'], ['', 'small', 'large'], ['padding-x', 'padding-y']],
  listOptionColor: [
    ['option'],
    ['', 'hover', 'active', 'select', 'disabled'],
    ['background-color', 'font-color'],
  ],
  listOptionBorder: [['option'], ['border-radius']],
  listOptionFont: [['option'], ['font-weight']],
  Column: [['column'], ['padding-x', 'padding-y']],
  OptionGroup: [
    ['option'],
    ['group'],
    [
      'padding-x',
      'padding-top',
      'padding-bottom',
      'font-size',
      'font-color',
      'font-weight',
      'small-x',
      'small-top',
      'small-bottom',
      'large-x',
      'large-top',
      'large-bottom',
    ],
  ],
  OptionDivider: [
    ['option'],
    ['divider'],
    ['background-color', 'padding-x', 'padding-y', 'height'],
  ],
};

module.exports = {
  dropdownRules,
  dropdownTokenDescription,
};
