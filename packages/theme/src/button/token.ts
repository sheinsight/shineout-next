// 此文件受脚本控制，修改后将自动同步 type.ts button.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and button.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const buttonTokenDescription = { button: '按钮' };

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts button.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 buttonRules 强关联，非 buttonRules 规则内的 token 需手动增加或删减。
 */
const buttonTokenValue = {
  primary: {
    font: { color: 'Neutral-text-1' },
    background: { color: 'Brand-6' },
    border: { color: 'Brand-6' },
    disabled: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Brand-3' },
      border: { color: 'Brand-3' },
    },
    hover: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Brand-5' },
      border: { color: 'Brand-5' },
    },
    active: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Brand-7' },
      border: { color: 'Brand-7' },
    },
    focus: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Brand-5' },
      border: { color: 'Brand-5' },
    },
  },
  secondary: {
    font: { color: 'Neutral-text-4' },
    background: { color: 'Neutral-fill-3' },
    border: { color: 'Neutral-fill-3' },
    disabled: {
      font: { color: 'Neutral-text-2' },
      background: { color: 'Brand-3' },
      border: { color: 'Brand-3' },
    },
    hover: {
      font: { color: 'Neutral-text-4' },
      background: { color: 'Neutral-fill-2' },
      border: { color: 'Neutral-fill-2' },
    },
    active: {
      font: { color: 'Neutral-text-4' },
      background: { color: 'Neutral-fill-5' },
      border: { color: 'Neutral-fill-5' },
    },
    focus: {
      font: { color: 'Neutral-text-4' },
      background: { color: 'Neutral-fill-4' },
      border: { color: 'Neutral-fill-4' },
    },
  },
  success: {
    font: { color: 'Neutral-text-1' },
    background: { color: 'Success-5' },
    border: { color: 'Success-5' },
    disabled: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Success-5' },
      border: { color: 'Success-5' },
    },
    hover: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Success-4' },
      border: { color: 'Success-4' },
    },
    active: {
      font: { color: 'Neutral-text-4' },
      background: { color: 'Success-6' },
      border: { color: 'Success-6' },
    },
    focus: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Success-4' },
      border: { color: 'Success-4' },
    },
  },
  warning: {
    font: { color: 'Neutral-text-1' },
    background: { color: 'Warning-5' },
    border: { color: 'Warning-5' },
    disabled: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Warning-5' },
      border: { color: 'Warning-5' },
    },
    hover: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Warning-4' },
      border: { color: 'Warning-4' },
    },
    active: {
      font: { color: 'Neutral-text-4' },
      background: { color: 'Warning-6' },
      border: { color: 'Warning-6' },
    },
    focus: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Warning-4' },
      border: { color: 'Warning-4' },
    },
  },
  danger: {
    font: { color: 'Neutral-text-1' },
    background: { color: 'Danger-5' },
    border: { color: 'Danger-5' },
    disabled: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Danger-5' },
      border: { color: 'Danger-5' },
    },
    hover: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Danger-4' },
      border: { color: 'Danger-4' },
    },
    active: {
      font: { color: 'Neutral-text-4' },
      background: { color: 'Danger-6' },
      border: { color: 'Danger-6' },
    },
    focus: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Danger-4' },
      border: { color: 'Danger-4' },
    },
  },
  font: { size: '14/regular' },
  border: { radius: 'Radius-4' },
  padding: { x: 'Padding-8', y: 'Padding-5' },
  small: {
    font: { size: '12/regular' },
    border: { radius: 'Radius-4' },
    padding: { x: 'Padding-8', y: 'Padding-2' },
    round: { border: { radius: 'Radius-1000' } },
    circle: { border: { radius: 'Radius-50%' } },
    square: { border: { radius: 'Radius-4' } },
  },
  large: {
    font: { size: '16/regular' },
    border: { radius: 'Radius-4' },
    padding: { x: 'Padding-12', y: 'Padding-8' },
    round: { border: { radius: 'Radius-1000' } },
    circle: { border: { radius: 'Radius-50%' } },
    square: { border: { radius: 'Radius-4' } },
  },
  round: { border: { radius: 'Radius-1000' } },
  circle: { border: { radius: 'Radius-50%' } },
  square: { border: { radius: 'Radius-2' } },
};

const buttonTokenExtraValue = {};

module.exports = {
  buttonTokenValue,
  buttonTokenExtraValue,
  buttonTokenDescription,
};
