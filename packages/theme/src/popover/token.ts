// 此文件受脚本控制，修改后将自动同步 type.ts popover.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and popover.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const popoverTokenDescription = {
  popover: '气泡',
  warning: '警告',
  info: '提示',
  error: '错误',
  confirm: '确认',
  shadow: '阴影',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts popover.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 popoverRules 强关联，非 popoverRules 规则内的 token 需手动增加或删减。
 */
const popoverTokenValue = {};
const popoverTokenExtraValue = {
  font: { size: 'Font-14', weight: 'Weight-regular', color: 'Neutral-text-5' },
  padding: { x: 'Spacing-8', y: 'Spacing-8' },
  radius: 'Radius-default',
  border: { width: 'Border-1', color: 'Neutral-border-1' },
  background: { color: 'Neutral-fill-1' },
  shadow: 'Shadow-2',
  success: {
    font: { color: '' },
    background: { color: 'Success-1' },
    shadow: '',
    border: { color: 'Success-2' },
  },
  warning: {
    font: { color: '' },
    background: { color: 'Warning-1' },
    shadow: '',
    border: { color: 'Warning-2' },
  },
  info: {
    font: { color: '' },
    background: { color: 'Brand-1' },
    shadow: '',
    border: { color: 'Brand-2' },
  },
  danger: {
    font: { color: '' },
    background: { color: 'Danger-1' },
    shadow: '',
    border: { color: 'Danger-2' },
  },
  error: {
    font: { color: 'Danger-7' },
    background: { color: 'Danger-1' },
    shadow: '',
    border: { color: 'Danger-1' },
  },
  confirm: {
    font: { size: '' },
    padding: { x: 'Spacing-16', y: 'Spacing-16' },
    margin: { y: 'Spacing-16' },
    background: { color: 'transparent' },
    title: { font: { size: 'Font-14' } },
  },
};

module.exports = {
  popoverTokenValue,
  popoverTokenExtraValue,
  popoverTokenDescription,
};
