// 此文件受脚本控制，修改后将自动同步 type.ts list.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and list.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const listTokenDescription = {
  list: '列表',
  item: '选项',
  pagination: '分页器',
  striped: '斑马纹的',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts list.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 listRules 强关联，非 listRules 规则内的 token 需手动增加或删减。
 */
const listTokenValue = { font: { size: '' } };

const listTokenExtraValue = {
  font: { size: 'Font-14', color: 'Neutral-text-5' },
  border: { color: 'Neutral-border-1', radius: 'Radius-lesser', width: 'Border-1' },
  item: { padding: { y: 'Spacing-12', x: 'Spacing-16' }, background: { color: 'Transparent' } },
  small: { item: { padding: { y: 'Spacing-8', x: 'Spacing-12' } }, font: { size: 'Font-14' } },
  large: { item: { padding: { y: 'Spacing-16', x: 'Spacing-20' } }, font: { size: 'Font-14' } },
  pagination: { margin: { y: 'Spacing-12' } },
  striped: { background: { color: 'Neutral-fill-2' } },
};

module.exports = {
  listTokenValue,
  listTokenExtraValue,
  listTokenDescription,
};
