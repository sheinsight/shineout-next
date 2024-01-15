// 此文件受脚本控制，修改后将自动同步 type.ts radio.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and radio.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const radioTokenDescription = { radio: '单选框', button: '按钮模式', outline: '线框模式' };

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts radio.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 radioRules 强关联，非 radioRules 规则内的 token 需手动增加或删减。
 */
const radioTokenValue = {};

const radioTokenExtraValue = {
  gap: 'Margin-24',
  block: { gap: 'Margin-12' },
  icon: {
    width: 'Size-7',
    gap: 'Margin-8',
    border: { width: 'Border-2' },
    inner: { size: 'Size-3' },
    background: { color: 'Neutral-fill-1' },
    color: 'Neutral-border-2',
    disabled: { background: { color: 'Neutral-fill-2' }, color: 'Neutral-border-1' },
    hover: { background: { color: 'Neutral-fill-1' }, color: 'Neutral-text-3' },
    checked: {
      background: { color: 'Neutral-fill-1' },
      color: 'Brand-6',
      disabled: { background: { color: 'Neutral-fill-2' }, color: 'Neutral-border-2' },
    },
    wrapper: { fill: 'Neutral-fill-2' },
  },
  padding: { y: 'Padding-4' },
  small: {
    icon: { width: 'Size-6', gap: '', border: { width: 'Border-1' }, inner: { size: 'Size-3' } },
    label: { font: { size: '12/regular' } },
    padding: { y: 'Padding-1' },
  },
  large: {
    icon: { width: 'Size-8', gap: '', border: { width: 'Border-2' }, inner: { size: 'Size-3.5' } },
    label: { font: { size: '16/regular' } },
    padding: { y: 'Padding-7' },
  },
  label: {
    font: { color: 'Neutral-text-5', size: '14/regular' },
    disabled: { font: { color: 'Neutral-text-2' } },
  },
};

module.exports = {
  radioTokenValue,
  radioTokenExtraValue,
  radioTokenDescription,
};
