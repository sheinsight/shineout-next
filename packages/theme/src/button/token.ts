// 此文件受脚本控制，修改后将自动同步 type.ts button.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and button.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const buttonTokenDescription = {
  button: '按钮',
  dash: '虚框模式',
  outline: '线框模式',
  text: '文本模式',
  nearly: '相邻之间的',
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
    font: { color: '' },
    background: { color: '' },
    border: { color: '' },
    disabled: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    hover: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    active: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    focus: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    outline: {
      font: { color: '' },
      background: { color: '' },
      border: { color: '' },
      disabled: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
      hover: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
      active: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
      focus: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    },
    text: {
      font: { color: '' },
      background: { color: '' },
      border: { color: '' },
      disabled: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
      hover: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
      active: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
      focus: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    },
    dash: {
      font: { color: '' },
      background: { color: '' },
      border: { color: '' },
      disabled: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
      hover: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
      active: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
      focus: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    },
  },
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
    text: {
      font: { color: 'Brand-6' },
      background: { color: '' },
      border: { color: '' },
      disabled: { font: { color: 'Brand-3' }, background: { color: '' }, border: { color: '' } },
      hover: {
        font: { color: 'Brand-6' },
        background: { color: 'Neutral-fill-2' },
        border: { color: 'Neutral-fill-2' },
      },
      active: {
        font: { color: 'Brand-6' },
        background: { color: 'Neutral-fill-3' },
        border: { color: 'Neutral-fill-3' },
      },
      focus: {
        font: { color: 'Brand-6' },
        background: { color: 'Neutral-fill-2' },
        border: { color: 'Neutral-fill-2' },
      },
    },
    dash: {
      font: { color: 'Brand-6' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Brand-6' },
      disabled: {
        font: { color: 'Brand-3' },
        background: { color: 'Neutral-fill-1' },
        border: { color: '' },
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
  secondary: {
    font: { color: 'Neutral-text-4' },
    background: { color: 'Neutral-fill-3' },
    border: { color: 'Neutral-fill-3' },
    disabled: {
      font: { color: 'Neutral-text-2' },
      background: { color: 'Neutral-fill-2' },
      border: { color: 'Neutral-fill-2' },
    },
    hover: {
      font: { color: 'Neutral-text-4' },
      background: { color: 'Neutral-fill-4' },
      border: { color: 'Neutral-fill-4' },
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
    outline: {
      font: { color: 'Neutral-text-5' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Neutral-border-2' },
      disabled: {
        font: { color: 'Neutral-text-2' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Neutral-border-2' },
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
    text: {
      font: { color: 'Neutral-text-5' },
      background: { color: '' },
      border: { color: '' },
      disabled: {
        font: { color: 'Neutral-text-2' },
        background: { color: '' },
        border: { color: '' },
      },
      hover: {
        font: { color: 'Neutral-text-4' },
        background: { color: 'Neutral-fill-2' },
        border: { color: 'Neutral-fill-2' },
      },
      active: {
        font: { color: 'Neutral-text-4' },
        background: { color: 'Neutral-fill-3' },
        border: { color: 'Neutral-fill-3' },
      },
      focus: {
        font: { color: 'Neutral-text-4' },
        background: { color: 'Neutral-fill-2' },
        border: { color: 'Neutral-fill-2' },
      },
    },
    dash: {
      font: { color: 'Neutral-text-5' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Neutral-border-2' },
      disabled: {
        font: { color: 'Neutral-text-2' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Neutral-border-2' },
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
      font: { color: 'Neutral-text-1' },
      background: { color: 'Success-6' },
      border: { color: 'Success-6' },
    },
    focus: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Success-4' },
      border: { color: 'Success-4' },
    },
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
    text: {
      font: { color: 'Success-5' },
      background: { color: '' },
      border: { color: '' },
      disabled: { font: { color: 'Success-3' }, background: { color: '' }, border: { color: '' } },
      hover: {
        font: { color: 'Success-5' },
        background: { color: 'Neutral-fill-2' },
        border: { color: '' },
      },
      active: {
        font: { color: 'Success-5' },
        background: { color: 'Neutral-fill-3' },
        border: { color: '' },
      },
      focus: {
        font: { color: 'Success-5' },
        background: { color: 'Neutral-fill-2' },
        border: { color: '' },
      },
    },
    dash: {
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
      font: { color: 'Neutral-text-1' },
      background: { color: 'Warning-6' },
      border: { color: 'Warning-6' },
    },
    focus: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Warning-4' },
      border: { color: 'Warning-4' },
    },
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
    text: {
      font: { color: 'Warning-5' },
      background: { color: '' },
      border: { color: '' },
      disabled: { font: { color: 'Warning-3' }, background: { color: '' }, border: { color: '' } },
      hover: {
        font: { color: 'Warning-5' },
        background: { color: 'Neutral-fill-2' },
        border: { color: '' },
      },
      active: {
        font: { color: 'Warning-5' },
        background: { color: 'Neutral-fill-3' },
        border: { color: '' },
      },
      focus: {
        font: { color: 'Warning-5' },
        background: { color: 'Neutral-fill-2' },
        border: { color: '' },
      },
    },
    dash: {
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
      font: { color: 'Neutral-text-1' },
      background: { color: 'Danger-6' },
      border: { color: 'Danger-6' },
    },
    focus: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Danger-4' },
      border: { color: 'Danger-4' },
    },
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
    text: {
      font: { color: 'Danger-5' },
      background: { color: '' },
      border: { color: '' },
      disabled: { font: { color: 'Danger-3' }, background: { color: '' }, border: { color: '' } },
      hover: {
        font: { color: 'Danger-5' },
        background: { color: 'Neutral-fill-2' },
        border: { color: '' },
      },
      active: {
        font: { color: 'Danger-5' },
        background: { color: 'Neutral-fill-3' },
        border: { color: '' },
      },
      focus: {
        font: { color: 'Danger-5' },
        background: { color: 'Neutral-fill-2' },
        border: { color: '' },
      },
    },
    dash: {
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
  nearly: { margin: '' },
};

const buttonTokenExtraValue = {};

module.exports = {
  buttonTokenValue,
  buttonTokenExtraValue,
  buttonTokenDescription,
};
