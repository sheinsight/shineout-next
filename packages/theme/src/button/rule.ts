// 此文件受脚本控制，修改后将自动同步 type.ts button.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and button.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const buttonTokenDescription = {
  button: '按钮',
  nearly: '相邻之间的',
  text: '文本模式',
  outline: '线框模式',
};

/**
 * token 规则
 * 用于生成 token 的规则，修改保存后将自动更新 token。
 * 规则变量名称为 组件名称 + Rules。请勿修改变量命名，否则将导致 token 无法生成。
 */
const buttonRules = {
  color: [
    ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
    ['', 'outline', 'text', 'dash'],
    ['', 'disabled', 'hover', 'active', 'focus'],
    ['font-color', 'background-color', 'border-color'],
  ],
  size: [
    ['', 'small', 'large'],
    ['font-size', 'border-radius', 'padding-x', 'padding-y'],
  ],
  shape: [['', 'small', 'large'], ['round', 'circle', 'square'], ['border-radius']],
  extra_nearly_margin: [['nearly-margin']],
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts button.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 buttonRules 强关联，非 buttonRules 规则内的 token 需手动增加或删减。
 */
const buttonTokenValue = {
  default: {
    font: { color: 'Neutral-text-1' },
    background: { color: 'Secondary-5' },
    border: { color: 'Secondary-5' },
    disabled: {
      font: { color: 'Neutral-text-2' },
      background: { color: 'Neutral-fill-2' },
      border: { color: 'Neutral-fill-2' },
    },
    hover: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Brand-6' },
    },
    active: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Brand-7' },
    },
    focus: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Brand-6' },
    },
    text: {},
  },
  primary: {
    outline: {
      font: { color: 'Brand-6' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Brand-6' },
      disabled: {
        font: { color: 'Brand-3' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Brand-3' },
      },
      hover: {
        font: { color: 'Brand-5' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Brand-5' },
      },
      active: {
        font: { color: 'Brand-7' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Brand-7' },
      },
      focus: {
        font: { color: 'Brand-5' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Brand-5' },
      },
    },
  },
  success: {
    outline: {
      font: { color: 'Success-5' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Success-5' },
      disabled: {
        font: { color: 'Success-3' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Success-3' },
      },
      hover: {
        font: { color: 'Success-4' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Success-4' },
      },
      active: {
        font: { color: 'Success-6' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Success-6' },
      },
      focus: {
        font: { color: 'Success-4' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Success-4' },
      },
    },
  },
  warning: {
    outline: {
      font: { color: 'Warning-5' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Warning-5' },
      disabled: {
        font: { color: 'Warning-3' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Warning-3' },
      },
      hover: {
        font: { color: 'Warning-4' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Warning-4' },
      },
      active: {
        font: { color: 'Warning-6' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Warning-6' },
      },
      focus: {
        font: { color: 'Warning-4' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Warning-4' },
      },
    },
  },
  danger: {
    outline: {
      font: { color: 'Danger-5' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Danger-5' },
      disabled: {
        font: { color: 'Danger-3' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Danger-3' },
      },
      hover: {
        font: { color: 'Danger-4' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Danger-4' },
      },
      active: {
        font: { color: 'Danger-6' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Danger-6' },
      },
      focus: {
        font: { color: 'Danger-4' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Danger-4' },
      },
    },
  },
  font: { size: '14/regular', color: 'Color-Primary-500' },
  border: { radius: 'Radius-4' },
  padding: { y: 'Padding-5', x: 'Padding-8' },
  small: {
    font: { size: '12/regular' },
    border: { radius: 'Radius-4' },
    padding: { y: 'Padding-2', x: 'Padding-8' },
    round: { border: { radius: 'Radius-1000' } },
    circle: { border: { radius: 'Radius-50%' } },
    square: { border: { radius: 'Radius-4' } },
  },
  large: {
    font: { size: '16/regular' },
    border: { radius: 'Radius-4' },
    padding: { y: 'Padding-8', x: 'Padding-12' },
    round: { border: { radius: 'Radius-1000' } },
    circle: { border: { radius: 'Radius-50%' } },
    square: { border: { radius: 'Radius-4' } },
  },
  round: { border: { radius: 'Radius-1000' } },
  circle: { border: { radius: 'Radius-50%' } },
  square: { border: { radius: 'Radius-4' } },
  nearly: { margin: 'Margin-8' },
};

module.exports = {
  buttonRules,
  buttonTokenValue,
  buttonTokenDescription,
};
