// 此文件受脚本控制，修改后将自动同步 type.ts table.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and table.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const tableTokenDescription = { table: 'xxx' };

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts table.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 tableRules 强关联，非 tableRules 规则内的 token 需手动增加或删减。
 */
const tableTokenValue = {};

const tableTokenExtraValue = {
  font: {
    size: '14/regular',
  },
  cell: {
    padding: {
      x: 'Padding-12',
      y: 'Padding-8',
    },
    border: { color: 'Neutral-border-1' },
  },
  small: {
    cell: {
      padding: {
        x: 'Padding-8',
        y: 'Padding-4',
      },
    },
  },
  large: {
    cell: {
      padding: {
        x: 'Padding-16',
        y: 'Padding-12',
      },
    },
  },

  thead: {
    background: { color: 'Neutral-fill-2' },
    font: { color: 'Neutral-text-5' },
  },
  tbody: {
    background: { color: 'Neutral-fill-1' },
    striped: { background: { color: 'Neutral-fill-2' } },
    hover: { background: { color: 'Brand-1' } },
    font: { color: 'Neutral-text-5' },
  },
  sorter: {
    color: 'Neutral-text-3',
    hover: { color: 'Neutral-text-4' },
    active: { color: 'Brand-6' },
  },
};

module.exports = {
  tableTokenValue,
  tableTokenExtraValue,
  tableTokenDescription,
};
