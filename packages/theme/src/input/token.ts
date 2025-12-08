// 此文件受脚本控制，修改后将自动同步 type.ts input.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and input.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const inputTokenDescription = {
  input: '输入框',
  inner: '内嵌',
  title: '标题模式',
  placeholder: '占位符',
  toggle: '反转',
  shadow: '阴影',
  info: '基础',
  group: '组合模式',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts input.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 inputRules 强关联，非 inputRules 规则内的 token 需手动增加或删减。
 */
const inputTokenValue = {};

const inputTokenExtraValue = {
  font: { size: 'Font-14', color: 'Neutral-text-5', weight: 'Weight-regular' },
  border: { radius: 'Radius-default', color: 'Neutral-border-2', width: 'Border-1' },
  padding: { x: 'Spacing-8', y: 'Spacing-4' },
  icon: { size: 'Font-14', color: 'Neutral-text-4' },
  small: {
    font: { size: 'Font-12' },
    border: { radius: '' },
    padding: { x: 'Spacing-8', y: 'Spacing-1' },
    icon: { size: 'Font-12' },
  },
  large: {
    font: { size: 'Font-16' },
    border: { radius: '' },
    padding: { x: 'Spacing-12', y: 'Spacing-7' },
    icon: { size: 'Font-16' },
  },
  placeholder: { color: 'Neutral-text-2', font: { weight: 'Weight-regular' } },
  background: { color: 'Neutral-fill-1' },
  shadow: '',
  clear: { color: 'Neutral-text-3' },
  toggle: { color: 'Neutral-text-4' },
  hover: {
    font: { color: '' },
    placeholder: { color: '' },
    border: { color: 'Brand-6' },
    background: { color: 'Neutral-fill-1' },
    shadow: '',
    clear: { color: 'Neutral-text-4' },
    toggle: { color: 'Neutral-text-5' },
    icon: { color: 'Brand-6' },
  },
  focus: {
    font: { color: '' },
    placeholder: { color: '' },
    border: { color: 'Brand-7' },
    background: { color: 'Neutral-fill-1' },
    shadow: 'Brand-2',
    clear: { color: '' },
    toggle: { color: '' },
    icon: { color: '' },
  },
  disabled: {
    font: { color: 'Neutral-text-2' },
    placeholder: { color: 'Neutral-text-2' },
    border: { color: 'Neutral-border-1' },
    background: { color: 'Neutral-fill-2' },
    shadow: '',
    clear: { color: '' },
    toggle: { color: '' },
    icon: { color: '' },
    hover: {
      font: { color: '' },
      placeholder: { color: '' },
      border: { color: '' },
      background: { color: '' },
      shadow: '',
      clear: { color: '' },
      toggle: { color: '' },
      icon: { color: '' },
    },
    focus: {
      font: { color: '' },
      placeholder: { color: '' },
      border: { color: '' },
      background: { color: '' },
      shadow: '',
      clear: { color: '' },
      toggle: { color: '' },
      icon: { color: '' },
    },
  },
  error: {
    font: { color: '' },
    placeholder: { color: '' },
    border: { color: 'Danger-6' },
    background: { color: 'Neutral-fill-1' },
    shadow: '',
    clear: { color: '' },
    toggle: { color: '' },
    icon: { color: '' },
    hover: {
      font: { color: '' },
      placeholder: { color: '' },
      border: { color: 'Danger-6' },
      background: { color: 'Neutral-fill-1' },
      shadow: '',
      clear: { color: '' },
      toggle: { color: '' },
      icon: { color: '' },
    },
    focus: {
      font: { color: '' },
      placeholder: { color: '' },
      border: { color: 'Danger-6' },
      background: { color: 'Neutral-fill-1' },
      shadow: 'Danger-1',
      clear: { color: '' },
      toggle: { color: '' },
      icon: { color: '' },
    },
  },
  group: { font: { color: 'Neutral-text-5', background: { color: 'Neutral-fill-2' } } },
  info: {
    font: { color: 'Brand-6' },
    background: { color: 'Neutral-fill-1' },
    border: { color: 'Neutral-border-2' },
    error: {
      font: { color: 'Danger-6' },
      background: { color: 'Danger-1' },
      border: { color: 'Danger-6' },
    },
  },
  inner: {
    padding: { x: 'Spacing-8', y: 'Spacing-1' },
    font: { size: 'Font-14', color: 'Neutral-text-4' },
    place: { font: { color: 'Neutral-text-4' } },
    small: { padding: { x: 'Spacing-8', y: 'Spacing-1' }, font: { size: 'Font-12' } },
    large: { padding: { x: 'Spacing-12', y: 'Spacing-3' }, font: { size: 'Font-16' } },
    top: {
      font: { size: 'Font-12' },
      small: { font: { size: 'Font-12' } },
      large: { font: { size: 'Font-14' } },
    },
  },
};

module.exports = {
  inputTokenValue,
  inputTokenExtraValue,
  inputTokenDescription,
};
