// 此文件受脚本控制，修改后将自动同步 type.ts card.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and card.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const cardTokenDescription = {
  card: '卡片',
  indicator: '指示器',
  header: '头部',
  extra: '额外内容的',
  gap: '间距',
  shadow: '阴影',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts card.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 cardRules 强关联，非 cardRules 规则内的 token 需手动增加或删减。
 */
const cardTokenValue = { font: { size: 'Font-14' } };

const cardTokenExtraValue = {
  background: {
    color: 'Neutral-fill-1',
  },
  shadow: 'Shadow-2',
  border: {
    width: 'Border-1',
    color: 'Neutral-border-1',
    radius: 'Radius-4',
  },
  font: {
    color: 'Neutral-text-5',
    size: 'Font-14',
  },
  padding: { x: 'Spacing-16', y: 'Spacing-12' },
  title: {
    font: {
      size: 'Font-16',
    },
  },
  header: {
    gap: '8px',
    extra: {
      margin: { x: 'Spacing-16' },
    },
  },
  indicator: {
    size: 'Size-7',
    color: 'Neutral-text-4',
  },
  body: {},
};

module.exports = {
  cardTokenValue,
  cardTokenExtraValue,
  cardTokenDescription,
};
