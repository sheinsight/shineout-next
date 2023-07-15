// 此文件受脚本控制，修改后将自动同步 type.ts dropdown.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and dropdown.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const dropdownTokenDescription = { dropdown: '下拉菜单', outline: '线框模式下' };

/**
 * token 规则
 * 用于生成 token 的规则，修改保存后将自动更新 token。
 * 规则变量名称为 组件名称 + Rules。请勿修改变量命名，否则将导致 token 无法生成。
 */
const dropdownRules = {
  color: [
    ['primary', 'secondary', 'success', 'warning', 'danger'],
    ['', 'outline'],
    ['', 'disabled', 'hover', 'active', 'focus'],
    ['font-color', 'background-color', 'border-color'],
  ],
  size: [
    ['', 'small', 'large'],
    ['font-size', 'border-radius', 'padding-x', 'padding-y'],
  ],
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts dropdown.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 dropdownRules 强关联，非 dropdownRules 规则内的 token 需手动增加或删减。
 */
const dropdownTokenValue = {
  primary: {
    font: { color: 'Neutral-text-5' },
    background: { color: 'Brand-5' },
    border: { color: 'Brand-5' },
    disabled: {
      font: { color: 'Neutral-text-2' },
      background: { color: 'Brand-3' },
      border: { color: 'Brand-3' },
    },
    hover: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Brand-4' },
      border: { color: 'Brand-4' },
    },
    active: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Brand-6' },
      border: { color: 'Brand-6' },
    },
    focus: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Brand-4' },
      border: { color: 'Brand-4' },
    },
  },
  secondary: {
    font: { color: 'Neutral-text-1' },
    background: { color: 'Secondary-5' },
    border: { color: 'Secondary-5' },
    disabled: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Secondary-3' },
      border: { color: 'Secondary-3' },
    },
    hover: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Secondary-4' },
      border: { color: 'Secondary-4' },
    },
    active: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Secondary-6' },
      border: { color: 'Secondary-6' },
    },
    focus: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Secondary-4' },
      border: { color: 'Secondary-4' },
    },
  },
  success: {
    font: { color: 'Neutral-text-1' },
    background: { color: 'Success-5' },
    border: { color: 'Success-5' },
    disabled: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Success-3' },
      border: { color: 'Success-3' },
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
  },
  warning: {
    font: { color: 'Neutral-text-1' },
    background: { color: 'Warning-5' },
    border: { color: 'Warning-5' },
    disabled: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Warning-3' },
      border: { color: 'Warning-3' },
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
  },
  danger: {
    font: { color: 'Neutral-text-1' },
    background: { color: 'Danger-5' },
    border: { color: 'Danger-5' },
    disabled: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Danger-3' },
      border: { color: 'Danger-3' },
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
  },
  font: { size: '14/regular' },
  border: { radius: 'Radius-4' },
  padding: { y: 'Padding-5', x: 'Padding-8' },
  small: {
    font: { size: '12/regular' },
    border: { radius: 'Radius-4' },
    padding: { y: 'Padding-2', x: 'Padding-8' },
  },
  large: {
    font: { size: '16/regular' },
    border: { radius: 'Radius-4' },
    padding: { y: 'Padding-8', x: 'Padding-12' },
  },
  outline: {
    primary: {
      disabled: {
        background: { color: 'Brand-3' },
        border: { color: 'Brand-3' },
        font: { color: 'Neutral-text-1' },
      },
      hover: {
        background: { color: 'Brand-4' },
        border: { color: 'Brand-4' },
        font: { color: 'Neutral-text-1' },
      },
      active: {
        background: { color: 'Brand-6' },
        border: { color: 'Brand-6' },
        font: { color: 'Neutral-text-1' },
      },
      focus: {
        background: { color: 'Brand-4' },
        border: { color: 'Brand-4' },
        font: { color: 'Neutral-text-1' },
      },
      background: { color: 'Brand-5' },
      border: { color: 'Brand-5' },
      font: { color: 'Neutral-text-1' },
    },
    success: {
      disabled: {
        background: { color: 'Success-3' },
        border: { color: 'Success-3' },
        font: { color: 'Neutral-text-1' },
      },
      hover: {
        background: { color: 'Success-4' },
        border: { color: 'Success-4' },
        font: { color: 'Neutral-text-1' },
      },
      active: {
        background: { color: 'Success-6' },
        border: { color: 'Success-6' },
        font: { color: 'Neutral-text-1' },
      },
      focus: {
        background: { color: 'Success-4' },
        border: { color: 'Success-4' },
        font: { color: 'Neutral-text-1' },
      },
      background: { color: 'Success-5' },
      border: { color: 'Success-5' },
      font: { color: 'Neutral-text-1' },
    },
    warning: {
      disabled: {
        background: { color: 'Warning-3' },
        border: { color: 'Warning-3' },
        font: { color: 'Neutral-text-1' },
      },
      hover: {
        background: { color: 'Warning-4' },
        border: { color: 'Warning-4' },
        font: { color: 'Neutral-text-1' },
      },
      active: {
        background: { color: 'Warning-6' },
        border: { color: 'Warning-6' },
        font: { color: 'Neutral-text-1' },
      },
      focus: {
        background: { color: 'Warning-4' },
        border: { color: 'Warning-4' },
        font: { color: 'Neutral-text-1' },
      },
      background: { color: 'Warning-5' },
      border: { color: 'Warning-5' },
      font: { color: 'Neutral-text-1' },
    },
    danger: {
      disabled: {
        background: { color: 'Danger-3' },
        border: { color: 'Danger-3' },
        font: { color: 'Neutral-text-1' },
      },
      hover: {
        background: { color: 'Danger-4' },
        border: { color: 'Danger-4' },
        font: { color: 'Neutral-text-1' },
      },
      active: {
        background: { color: 'Danger-6' },
        border: { color: 'Danger-6' },
        font: { color: 'Neutral-text-1' },
      },
      focus: {
        background: { color: 'Danger-4' },
        border: { color: 'Danger-4' },
        font: { color: 'Neutral-text-1' },
      },
      background: { color: 'Danger-5' },
      border: { color: 'Danger-5' },
      font: { color: 'Neutral-text-1' },
    },
    secondary: {
      disabled: {
        background: { color: 'Secondary-3' },
        border: { color: 'Secondary-3' },
        font: { color: 'Neutral-text-1' },
      },
      hover: {
        background: { color: 'Secondary-4' },
        border: { color: 'Secondary-4' },
        font: { color: 'Neutral-text-1' },
      },
      active: {
        background: { color: 'Secondary-6' },
        border: { color: 'Secondary-6' },
        font: { color: 'Neutral-text-1' },
      },
      focus: {
        background: { color: 'Secondary-4' },
        border: { color: 'Secondary-4' },
        font: { color: 'Neutral-text-1' },
      },
      background: { color: 'Secondary-5' },
      border: { color: 'Secondary-5' },
      font: { color: 'Neutral-text-1' },
    },
  },
};

module.exports = {
  dropdownRules,
  dropdownTokenValue,
  dropdownTokenDescription,
};
