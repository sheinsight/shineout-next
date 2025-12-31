// 此文件受脚本控制，修改后将自动同步 type.ts badge.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and badge.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const badgeTokenDescription = { badge: '徽标', count: '数值' };

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts badge.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 badgeRules 强关联，非 badgeRules 规则内的 token 需手动增加或删减。
 */
const badgeTokenValue = { font: { size: '' } };

const badgeTokenExtraValue = {
  badge: {
    font: { size: 'Font-12', color: 'Neutral-text-1' },
    background: { color: 'Danger-6' },
    border: { radius: 'Radius-full' },
  },
  count: { padding: { x: 'Spacing-4' }, height: 'Size-10' },
  small: { count: { height: 'Size-8' } },
  dot: { width: 'Size-3' },
  text: { margin: { left: 'Spacing-8' }, font: { color: 'Neutral-text-5' } },
  default: { background: { color: 'Neutral-fill-5' } },
  warning: { background: { color: 'Warning-6' } },
  success: { background: { color: 'Success-6' } },
  error: { background: { color: 'Danger-6' } },
  processing: { background: { color: 'Brand-6' } },
};

module.exports = {
  badgeTokenValue,
  badgeTokenExtraValue,
  badgeTokenDescription,
};
