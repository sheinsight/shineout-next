// 此文件受脚本控制，修改后将自动同步 type.ts transfer.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and transfer.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const transferTokenDescription = {
  transfer: '穿梭框',
  icon: '图标',
  nearly: '相邻',
  item: '选项',
  header: '头部区域的',
  empty: '空状态的',
  checkbox: '复选框',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts transfer.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 transferRules 强关联，非 transferRules 规则内的 token 需手动增加或删减。
 */
const transferTokenValue = {};

const transferTokenExtraValue = {
  font: { size: 'Font-14', color: 'Neutral-text-5' },
  header: {
    height: 'Size-23',
    background: { color: 'Neutral-fill-2' },
    border: { color: 'Transparent' },
  },
  small: { font: { size: 'Font-12' }, header: { height: 'Size-22' } },
  large: { font: { size: 'Font-16' }, header: { height: 'Size-24' } },
  border: { color: 'Neutral-border-1', radius: 'Radius-default' },
  icon: {
    color: 'Neutral-text-4',
    background: { color: 'Neutral-fill-3' },
    nearly: { margin: 'Spacing-8' },
  },
  disabled: { border: { color: '' }, font: { color: 'Neutral-text-2' }, icon: { color: '' } },
  empty: { border: { color: '' }, font: { color: 'Neutral-text-3' }, icon: { color: '' } },
  background: { color: 'Neutral-fill-1' },
  footer: { background: { color: 'Neutral-fill-1' }, border: { color: 'Neutral-border-1' } },
  item: {
    hover: { background: { color: 'Neutral-fill-2' } },
    border: { radius: 'Radius-default' },
  },
  remove: { icon: { color: 'Neutral-text-4' } },
  checkbox: { hover: { background: { color: 'Neutral-fill-3' } } },
};

module.exports = {
  transferTokenValue,
  transferTokenExtraValue,
  transferTokenDescription,
};
