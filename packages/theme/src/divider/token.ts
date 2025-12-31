// 此文件受脚本控制，修改后将自动同步 type.ts divider.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and divider.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const dividerTokenDescription = {
  divider: '分割线',
  horizontal: '水平模式',
  vertical: '垂直模式',
  text: '带文字',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts divider.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 dividerRules 强关联，非 dividerRules 规则内的 token 需手动增加或删减。
 */
const dividerTokenValue = {};

const dividerTokenExtraValue = {
  font: { size: 'Font-12', color: 'Neutral-text-5', weight: 'Weight-regular' },
  border: { color: 'Neutral-border-1', width: 'Border-1' },
  horizontal: { margin: { y: 'Spacing-24' }, text: { margin: { y: 'Spacing-16' } } },
  vertical: { margin: { x: 'Spacing-12' } },
  text: { padding: { x: 'Spacing-12' } },
};

module.exports = {
  dividerTokenValue,
  dividerTokenExtraValue,
  dividerTokenDescription,
};
