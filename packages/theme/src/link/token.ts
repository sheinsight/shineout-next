// 此文件受脚本控制，修改后将自动同步 type.ts link.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and link.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const linkTokenDescription = { link: '链接组件的' };

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts link.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 linkRules 强关联，非 linkRules 规则内的 token 需手动增加或删减。
 */
const linkTokenValue = {
  default: { font: { size: 'Font-14' } },
  small: { font: { size: 'Font-12' } },
  large: { font: { size: 'Font-16' } },
  font: { color: 'Neutral-text-5' },
  primary: {
    font: { color: 'Brand-6' },
    disabled: { font: { color: 'Brand-3' } },
    hover: { font: { color: 'Brand-5' } },
    active: { font: { color: 'Brand-7' } },
  },
  secondary: {
    font: { color: 'Neutral-text-5' },
    disabled: { font: { color: 'Neutral-text-2' } },
    hover: { font: { color: 'Brand-5' } },
    active: { font: { color: 'Brand-7' } },
  },
  danger: {
    font: { color: 'Danger-6' },
    disabled: { font: { color: 'Danger-3' } },
    hover: { font: { color: 'Danger-5' } },
    active: { font: { color: 'Danger-7' } },
  },
  warning: {
    font: { color: 'Warning-6' },
    disabled: { font: { color: 'Warning-3' } },
    hover: { font: { color: 'Warning-5' } },
    active: { font: { color: 'Warning-7' } },
  },
  success: {
    font: { color: 'Success-6' },
    disabled: { font: { color: 'Success-3' } },
    hover: { font: { color: 'Success-5' } },
    active: { font: { color: 'Success-7' } },
  },
};

const linkTokenExtraValue = {};

module.exports = {
  linkTokenValue,
  linkTokenExtraValue,
  linkTokenDescription,
};
