// 此文件受脚本控制，修改后将自动同步 type.ts tooltip.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and tooltip.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const tooltipTokenDescription = { tooltip: '文字提示', shadow: '阴影', light: '亮色模式' };

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts tooltip.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 tooltipRules 强关联，非 tooltipRules 规则内的 token 需手动增加或删减。
 */
const tooltipTokenValue = {
  font: { size: '' },
  padding: { x: '', y: '' },
  border: { radius: '' },
  color: '',
  background: { color: '' },
};

const tooltipTokenExtraValue = {
  font: { size: 'Font-12' },
  padding: { x: 'Spacing-8', y: 'Spacing-5' },
  border: { radius: 'Radius-lesser' },
  color: 'Neutral-text-1',
  shadow: 'Shadow-2',
  background: { color: 'Neutral-fill-9' },
  light: {
    color: 'Neutral-text-5',
    background: { color: 'Neutral-fill-1' },
    border: { color: 'Neutral-border-1' },
  },
  primary: { color: 'Brand-6', background: { color: 'Brand-1' } },
  success: { color: 'Success-7', background: { color: 'Success-1' } },
  warning: { color: 'Warning-7', background: { color: 'Warning-1' } },
  danger: { color: 'Danger-7', background: { color: 'Danger-1' } },
};

module.exports = {
  tooltipTokenValue,
  tooltipTokenExtraValue,
  tooltipTokenDescription,
};
