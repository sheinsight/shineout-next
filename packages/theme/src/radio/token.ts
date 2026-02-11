// 此文件受脚本控制，修改后将自动同步 type.ts radio.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and radio.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const radioTokenDescription = {
  radio: '单选框',
  button: '按钮模式',
  outline: '线框模式',
  gap: '间距',
  block: '块级',
  checked: '选中状态下的',
  wrapper: '包裹层',
  fill: '填充色',
  dark: '暗色模式',
  label: '文案',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts radio.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 radioRules 强关联，非 radioRules 规则内的 token 需手动增加或删减。
 */
const radioTokenValue = {};

const radioTokenExtraValue = {
  gap: 'Spacing-24',
  block: { gap: 'Spacing-12' },
  icon: {
    width: 'Font-14',
    gap: 'Spacing-8',
    border: { width: 'Border-2' },
    inner: { size: 'Size-3' },
    background: { color: 'Neutral-fill-1' },
    color: 'Neutral-border-2',
    disabled: { background: { color: 'Neutral-fill-2' }, color: 'Neutral-border-1' },
    hover: { background: { color: 'Neutral-fill-1' }, color: 'Neutral-text-3' },
    checked: {
      background: { color: 'Neutral-fill-1' },
      color: 'Brand-6',
      disabled: { background: { color: 'Neutral-fill-1' }, color: 'Brand-3' },
    },
    wrapper: { fill: 'Neutral-fill-2', dark: 'Neutral-fill-3' },
  },
  indicator: {
    margin: {
      top: 'Spacing-4',
    }
  },
  padding: { y: 'Spacing-4' },
  button: {
    padding: { y: 'Spacing-4', x: 'Spacing-12' },
    border: { color: 'Neutral-border-2' }
  },
  small: {
    icon: { width: 'Font-12', gap: '', border: { width: 'Border-1' }, inner: { size: 'Size-3' } },
    label: { font: { size: 'Font-12' } },
    padding: { y: 'Spacing-1' },
    button: {
      padding: { y: 'Spacing-1', x: 'Spacing-8' },
    },
  },
  large: {
    icon: { width: 'Font-16', gap: '', border: { width: 'Border-2' } },
    label: { font: { size: 'Font-16' } },
    padding: { y: 'Spacing-7' },
    button: {
      padding: { y: 'Spacing-7', x: 'Spacing-16' },
    },
  },
  label: {
    font: { color: 'Neutral-text-5', size: 'Font-14' },
    disabled: { font: { color: 'Neutral-text-2' } },
  },

};

module.exports = {
  radioTokenValue,
  radioTokenExtraValue,
  radioTokenDescription,
};
