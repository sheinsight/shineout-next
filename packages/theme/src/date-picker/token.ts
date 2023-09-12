// 此文件受脚本控制，修改后将自动同步 type.ts datePicker.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and datePicker.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const datePickerTokenDescription = { datePicker: 'xxx' };

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts datePicker.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 datePickerRules 强关联，非 datePickerRules 规则内的 token 需手动增加或删减。
 */
const datePickerTokenValue = {
  font: { size: '14/regular', color: 'Neutral-text-5' },
  border: { radius: 'Radius-4', color: 'Neutral-border-2' },
  padding: { x: 'Padding-8', y: 'Padding-4' },
  icon: { size: 'Size-7' },
  small: {
    font: { size: '12/regular' },
    border: { radius: '' },
    padding: { x: 'Padding-8', y: 'Padding-1' },
    icon: { size: '' },
  },
  large: {
    font: { size: '16/regular' },
    border: { radius: '' },
    padding: { x: 'Padding-12', y: 'Padding-7' },
    icon: { size: '' },
  },
  placeholder: { color: 'Neutral-text-2' },
  background: { color: 'Neutral-fill-1' },
  shadow: '',
  clear: { color: 'Neutral-text-3' },
  hover: {
    font: { color: '' },
    placeholder: { color: '' },
    border: { color: 'Brand-6' },
    background: { color: '' },
    shadow: '',
    clear: { color: 'Neutral-text-4' },
  },
  focus: {
    font: { color: '' },
    placeholder: { color: '' },
    border: { color: 'Brand-7' },
    background: { color: '' },
    shadow: 'Brand-2',
    clear: { color: '' },
  },
  disabled: {
    font: { color: 'Neutral-text-2' },
    placeholder: { color: 'Neutral-text-2' },
    border: { color: 'Neutral-border-2' },
    background: { color: 'Neutral-fill-2' },
    shadow: '',
    clear: { color: '' },
    hover: {
      font: { color: '' },
      placeholder: { color: '' },
      border: { color: '' },
      background: { color: '' },
      shadow: '',
      clear: { color: '' },
    },
    focus: {
      font: { color: '' },
      placeholder: { color: '' },
      border: { color: '' },
      background: { color: '' },
      shadow: '',
      clear: { color: '' },
    },
  },
  error: {
    font: { color: '' },
    placeholder: { color: '' },
    border: { color: 'Danger-6' },
    background: { color: '' },
    shadow: '',
    clear: { color: '' },
    hover: {
      font: { color: '' },
      placeholder: { color: '' },
      border: { color: '' },
      background: { color: '' },
      shadow: '',
      clear: { color: '' },
    },
    focus: {
      font: { color: '' },
      placeholder: { color: '' },
      border: { color: '' },
      background: { color: '' },
      shadow: 'Danger-1',
      clear: { color: '' },
    },
  },
  picker: { color: '', background: { color: '' }, shadow: '' },
  day: {
    padding: { x: '', y: '' },
    small: { padding: { x: '', y: '' } },
    large: { padding: { x: '', y: '' } },
  },
};

const datePickerTokenExtraValue = {};

module.exports = {
  datePickerTokenValue,
  datePickerTokenExtraValue,
  datePickerTokenDescription,
};
