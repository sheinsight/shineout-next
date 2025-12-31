// 此文件受脚本控制，修改后将自动同步 type.ts table.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and table.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const tableTokenDescription = {
  table: '表格',
  cell: '单元格',
  fixed: '固定列',
  thead: '表头',
  tbody: '表格主体',
  striped: '斑马纹',
  shadow: '阴影',
  expand: '展开',
  sorter: '排序icon的',
  pagination: '分页器的',
  tfoot: '表格底部的',
  resize: '拖拽时的',
  selection: '选择状态下的',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts table.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 tableRules 强关联，非 tableRules 规则内的 token 需手动增加或删减。
 */
const tableTokenValue = { font: { size: '' } };

const tableTokenExtraValue = {
  font: { size: 'Font-14' },
  cell: {
    padding: { x: 'Spacing-12', y: 'Spacing-8' },
    border: { color: 'Neutral-border-1' },
    font: { size: 'Font-14', weight: 'Weight-regular' },
  },
  small: {
    thead: { font: { size: 'Font-14', weight: 'Weight-medium' } },
    cell: {
      padding: { x: 'Spacing-8', y: 'Spacing-4' },
      font: { size: 'Font-14', weight: 'Weight-regular' },
    },
  },
  large: {
    thead: { font: { size: 'Font-14', weight: 'Weight-medium' } },
    cell: {
      padding: { x: 'Spacing-16', y: 'Spacing-16' },
      font: { size: 'Font-14', weight: 'Weight-regular' },
    },
  },
  fixed: { shadow: 'rgba(2,11,24,.1)' },
  thead: {
    background: { color: 'Neutral-fill-2' },
    font: { size: 'Font-14', weight: 'Weight-medium', color: 'Neutral-text-5' },
  },
  tbody: {
    background: { color: 'Neutral-fill-1' },
    striped: { background: { color: 'Neutral-fill-2' } },
    hover: { background: { color: 'Indigo-1' } },
    active: { background: { color: 'Brand-1' } },
    font: { color: 'Neutral-text-5' },
  },
  tfoot: {
    background: { color: 'Neutral-fill-2' },
    font: { color: 'Neutral-text-5', weight: 'Weight-regular' },
  },
  expand: {
    icon: {
      size: 'Size-7',
      color: 'Neutral-text-2',
      hover: { background: { color: 'Neutral-fill-3' } },
    },
    background: { color: 'Neutral-fill-2' },
  },
  sorter: {
    color: 'Neutral-text-3',
    hover: { color: 'Neutral-text-4' },
    active: { color: 'Brand-6' },
  },
  filter: {
    header: { padding: { x: 'Spacing-12', y: 'Spacing-12' } },
    body: { padding: { x: 'Spacing-12', y: 'Spacing-8' } },
    footer: { padding: { x: 'Spacing-12', y: 'Spacing-8' }, border: { color: 'Neutral-border-1' } },
    input: {
      margin: { bottom: 'Spacing-8' },
      icon: { size: 'Font-14', color: 'Neutral-text-4', margin: { right: 'Spacing-8' } },
    },
    icon: {
      color: 'Neutral-text-3',
      hover: { color: 'Neutral-text-4', background: { color: 'Neutral-fill-3' } },
      active: { color: 'Brand-6' },
      padding: 'Spacing-4',
      size: 'Font-14',
    },
  },
  resize: { color: 'Brand-7' },
  selection: { border: { color: 'Brand-6' } },
  pagination: { margin: { y: 'Spacing-12' } },
};

module.exports = {
  tableTokenValue,
  tableTokenExtraValue,
  tableTokenDescription,
};
