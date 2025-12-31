// 此文件受脚本控制，修改后将自动同步 type.ts textarea.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and textarea.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const textareaTokenDescription = {
  textarea: '多行文本框',
  placeholder: '占位符',
  shadow: '阴影',
  info: '基础',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts textarea.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 textareaRules 强关联，非 textareaRules 规则内的 token 需手动增加或删减。
 */
const textareaTokenValue = {
  font: { size: '', color: '' },
  border: { radius: '', color: '' },
  padding: { x: '', y: '' },
  small: { font: { size: '' }, border: { radius: '' }, padding: { x: '', y: '' } },
  large: { font: { size: '' }, border: { radius: '' }, padding: { x: '', y: '' } },
  placeholder: { color: '' },
  background: { color: '' },
  shadow: '',
  hover: {
    font: { color: '' },
    placeholder: { color: '' },
    border: { color: '' },
    background: { color: '' },
    shadow: '',
  },
  focus: {
    font: { color: '' },
    placeholder: { color: '' },
    border: { color: '' },
    background: { color: '' },
    shadow: '',
  },
  disabled: {
    font: { color: '' },
    placeholder: { color: '' },
    border: { color: '' },
    background: { color: '' },
    shadow: '',
    hover: {
      font: { color: '' },
      placeholder: { color: '' },
      border: { color: '' },
      background: { color: '' },
      shadow: '',
    },
    focus: {
      font: { color: '' },
      placeholder: { color: '' },
      border: { color: '' },
      background: { color: '' },
      shadow: '',
    },
  },
  error: {
    font: { color: '' },
    placeholder: { color: '' },
    border: { color: '' },
    background: { color: '' },
    shadow: '',
    hover: {
      font: { color: '' },
      placeholder: { color: '' },
      border: { color: '' },
      background: { color: '' },
      shadow: '',
    },
    focus: {
      font: { color: '' },
      placeholder: { color: '' },
      border: { color: '' },
      background: { color: '' },
      shadow: '',
    },
  },
  info: {
    font: { color: '' },
    background: { color: '' },
    border: { color: '' },
    error: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
  },
};

const textareaTokenExtraValue = {
  font: { size: 'Font-14', color: 'Neutral-text-5' },
  border: { radius: 'Radius-default', color: 'Neutral-border-2' },
  padding: { x: 'Spacing-8', y: 'Spacing-4' },
  small: {
    font: { size: 'Font-12' },
    border: { radius: '' },
    padding: { x: 'Spacing-8', y: 'Spacing-1' },
  },
  large: {
    font: { size: 'Font-16' },
    border: { radius: '' },
    padding: { x: 'Spacing-12', y: 'Spacing-7' },
  },
  placeholder: { color: 'Neutral-text-2' },
  background: { color: 'Neutral-fill-1' },
  shadow: '',
  hover: {
    font: { color: '' },
    placeholder: { color: '' },
    border: { color: 'Brand-6' },
    background: { color: '' },
    shadow: '',
  },
  focus: {
    font: { color: '' },
    placeholder: { color: '' },
    border: { color: 'Brand-7' },
    background: { color: '' },
    shadow: 'Brand-2',
  },
  disabled: {
    font: { color: 'Neutral-text-2' },
    placeholder: { color: 'Neutral-text-2' },
    border: { color: 'Neutral-border-1' },
    background: { color: 'Neutral-fill-2' },
    shadow: '',
    hover: {
      font: { color: '' },
      placeholder: { color: '' },
      border: { color: '' },
      background: { color: '' },
      shadow: '',
    },
    focus: {
      font: { color: '' },
      placeholder: { color: '' },
      border: { color: '' },
      background: { color: '' },
      shadow: '',
    },
  },
  error: {
    font: { color: '' },
    placeholder: { color: '' },
    border: { color: 'Danger-6' },
    background: { color: '' },
    shadow: '',
    hover: {
      font: { color: '' },
      placeholder: { color: '' },
      border: { color: '' },
      background: { color: '' },
      shadow: '',
    },
    focus: {
      font: { color: '' },
      placeholder: { color: '' },
      border: { color: '' },
      background: { color: '' },
      shadow: 'Danger-1',
    },
  },
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
  limit: { font: { color: 'Neutral-text-3', size: 'Font-12' } },
  clear: { color: 'Neutral-text-3', size: 'Size-7', hover: { color: 'Neutral-text-4' } },
};

module.exports = {
  textareaTokenValue,
  textareaTokenExtraValue,
  textareaTokenDescription,
};
