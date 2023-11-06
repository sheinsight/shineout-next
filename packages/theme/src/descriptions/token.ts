// 此文件受脚本控制，修改后将自动同步 type.ts descriptions.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and descriptions.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const descriptionsTokenDescription = { descriptions: '描述列表', label: '标签的' };

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts descriptions.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 descriptionsRules 强关联，非 descriptionsRules 规则内的 token 需手动增加或删减。
 */
const descriptionsTokenValue = {
  default: { font: { size: '' }, padding: { top: '', bottom: '', left: '', right: '' } },
  title: {
    font: { size: '16/medium', weight: '500' },
    padding: { top: '', bottom: '', left: '', right: '' },
    color: 'Neutral-text-5',
    gap: 'Size-2',
  },
  border: {
    font: { size: '1px' },
    padding: { top: 'Padding-12', bottom: 'Padding-12', left: 'Padding-8', right: 'Padding-8' },
    color: 'Neutral-border-1',
    radius: 'Size-2',
    right: { size: '0.5px' },
    bottom: { size: '0.5px' },
  },
  label: {
    font: { size: '' },
    padding: { top: '', bottom: 'Padding-12', left: '', right: 'Padding-8' },
    color: 'Neutral-text-4',
  },
  value: {
    font: { size: '' },
    padding: { top: '', bottom: 'Padding-12', left: '', right: '' },
    color: 'Neutral-text-5',
  },
  extra: { color: '' },
  background: { color: 'Neutral-fill-2' },
  inline: { border: { padding: { x: 'Padding-8', y: 'Padding-12' } } },
};

const descriptionsTokenExtraValue = {};

module.exports = {
  descriptionsTokenValue,
  descriptionsTokenExtraValue,
  descriptionsTokenDescription,
};
