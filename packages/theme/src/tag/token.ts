// 此文件受脚本控制，修改后将自动同步 type.ts tag.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and tag.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const tagTokenDescription = { tag: '标签', outline: '线框模式' };

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts tag.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 tagRules 强关联，非 tagRules 规则内的 token 需手动增加或删减。
 */
const tagTokenValue = {
  info: {
    font: { color: 'Brand-6' },
    background: { color: 'Brand-1' },
    border: { color: 'Brand-1' },
    disabled: {
      font: { color: 'Brand-3' },
      background: { color: 'Brand-1' },
      border: { color: 'Brand-1' },
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
    },
  },
  default: {
    font: { color: 'Neutral-text-5' },
    background: { color: 'Neutral-fill-2' },
    border: { color: 'Neutral-fill-2' },
    disabled: {
      font: { color: 'Neutral-text-2' },
      background: { color: 'Neutral-fill-2' },
      border: { color: 'Neutral-fill-2' },
    },
    outline: {
      font: { color: 'Neutral-text-4' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Neutral-border-2' },
      disabled: {
        font: { color: 'Neutral-text-2' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Neutral-border-2' },
      },
    },
  },
  success: {
    font: { color: 'Success-6' },
    background: { color: 'Success-1' },
    border: { color: 'Success-1' },
    disabled: {
      font: { color: 'Success-3' },
      background: { color: 'Success-1' },
      border: { color: 'Success-1' },
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
    },
  },
  warning: {
    font: { color: 'Warning-6' },
    background: { color: 'Warning-1' },
    border: { color: 'Warning-1' },
    disabled: {
      font: { color: 'Warning-3' },
      background: { color: 'Warning-1' },
      border: { color: 'Warning-1' },
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
    },
  },
  danger: {
    font: { color: 'Danger-6' },
    background: { color: 'Danger-1' },
    border: { color: 'Danger-1' },
    disabled: {
      font: { color: 'Danger-3' },
      background: { color: 'Danger-1' },
      border: { color: 'Danger-1' },
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
    },
  },
  magenta: {
    font: { color: '' },
    background: { color: '' },
    border: { color: '' },
    disabled: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    outline: {
      font: { color: '' },
      background: { color: '' },
      border: { color: '' },
      disabled: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    },
  },
  orange: {
    font: { color: '' },
    background: { color: '' },
    border: { color: '' },
    disabled: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    outline: {
      font: { color: '' },
      background: { color: '' },
      border: { color: '' },
      disabled: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    },
  },
  purple: {
    font: { color: '' },
    background: { color: '' },
    border: { color: '' },
    disabled: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    outline: {
      font: { color: '' },
      background: { color: '' },
      border: { color: '' },
      disabled: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    },
  },
  indigo: {
    font: { color: '' },
    background: { color: '' },
    border: { color: '' },
    disabled: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    outline: {
      font: { color: '' },
      background: { color: '' },
      border: { color: '' },
      disabled: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    },
  },
  cyan: {
    font: { color: '' },
    background: { color: '' },
    border: { color: '' },
    disabled: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    outline: {
      font: { color: '' },
      background: { color: '' },
      border: { color: '' },
      disabled: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    },
  },
  neon: {
    font: { color: '' },
    background: { color: '' },
    border: { color: '' },
    disabled: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    outline: {
      font: { color: '' },
      background: { color: '' },
      border: { color: '' },
      disabled: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    },
  },
  lemon: {
    font: { color: '' },
    background: { color: '' },
    border: { color: '' },
    disabled: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    outline: {
      font: { color: '' },
      background: { color: '' },
      border: { color: '' },
      disabled: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    },
  },
  tangerine: {
    font: { color: '' },
    background: { color: '' },
    border: { color: '' },
    disabled: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    outline: {
      font: { color: '' },
      background: { color: '' },
      border: { color: '' },
      disabled: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    },
  },
  font: { size: '12/regular' },
  border: { radius: 'Radius-2' },
  padding: { x: 'Padding-6', y: 'Padding-2' },
  height: 'Size-12',
  small: {
    font: { size: '12/regular' },
    border: { radius: 'Radius-2' },
    padding: { x: 'Padding-4', y: '' },
    height: 'Size-10',
  },
  large: {
    font: { size: '14/regular' },
    border: { radius: 'Radius-4' },
    padding: { x: 'Padding-12', y: 'Padding-3' },
    height: 'Size-20',
  },
};

const tagTokenExtraValue = {};

module.exports = {
  tagTokenValue,
  tagTokenExtraValue,
  tagTokenDescription,
};
