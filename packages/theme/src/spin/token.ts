// 此文件受脚本控制，修改后将自动同步 type.ts spin.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and spin.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const spinTokenDescription = {
  spin: '加载动画',
  vertical: '垂直模式下与提示文字的',
  horizontal: '水平模式下与提示文字的',
  tip: '提示文案',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts spin.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 spinRules 强关联，非 spinRules 规则内的 token 需手动增加或删减。
 */
const spinTokenValue = {};

const spinTokenExtraValue = {
  tip: { font: { color: 'Brand-6', size: 'Font-14' } },
  vertical: { margin: 'Spacing-4' },
  horizontal: { margin: 'Spacing-4' },
  color: 'Brand-6',
  background: { color: 'Neutral-fill-1' },
};

module.exports = {
  spinTokenValue,
  spinTokenExtraValue,
  spinTokenDescription,
};
