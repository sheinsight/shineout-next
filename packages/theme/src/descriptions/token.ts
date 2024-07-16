// 此文件受脚本控制，修改后将自动同步 type.ts descriptions.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and descriptions.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const descriptionsTokenDescription = {
  descriptions: '描述列表',
  label: '标签的',
  value: '值的',
  bottom: '底部',
  right: '右部',
  inline: '内联',
  gap: '间距',
  weight: '字重',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts descriptions.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 descriptionsRules 强关联，非 descriptionsRules 规则内的 token 需手动增加或删减。
 */
const descriptionsTokenValue = {
  title: {
    padding: { top: '', bottom: 'Spacing-12', left: '', right: '' },
    small: { size: 'Font-14' },
    default: { size: 'Font-16' },
    large: { size: 'Font-18' },
    color: 'Neutral-text-5',
    font: { weight: 'Weight-medium' },
    gap: 'Size-2',
  },
  label: {
    padding: { top: '', bottom: 'Spacing-12', left: '', right: 'Spacing-8' },
    color: 'Neutral-text-4',
  },
  value: {
    padding: { top: '', bottom: 'Spacing-12', left: '', right: '' },
    color: 'Neutral-text-5',
  },
  border: {
    small: { size: '' },
    default: { size: 'Border-1' },
    large: { size: '' },
    color: 'Neutral-border-1',
    radius: 'Radius-lesser',
    right: { size: '1px', x: '', y: '' },
    bottom: { size: '1px', x: '', y: '' },
    padding: { size: '', x: 'Spacing-12', y: 'Spacing-8' },
  },
  font: { small: { size: 'Font-12' }, default: { size: 'Font-14' }, large: { size: 'Font-16' } },
  extra: { color: '' },
  background: { color: 'Neutral-fill-2' },
  cell: { gap: 'Spacing-0' },
  inline: { border: { padding: { x: 'Spacing-8', y: 'Spacing-12' } } },
  vertical: { padding: { bottom: 'Spacing-2' } },
};

const descriptionsTokenExtraValue = {};

module.exports = {
  descriptionsTokenValue,
  descriptionsTokenExtraValue,
  descriptionsTokenDescription,
};
