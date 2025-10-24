// 此文件受脚本控制，修改后将自动同步 type.ts tag.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and tag.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const tagTokenDescription = {
  tag: '标签',
  outline: '线框风格',
  disabled: '禁用状态的',
  info: '提示色',
  magenta: '洋红色',
  brown: '明黄色',
  purple: '紫色',
  indigo: '靛蓝色',
  cyan: '青色',
  neon: '荧光色',
  lemon: '柠檬色',
  tangerine: '橘红色',
  fill: '填充风格',
  input: '输入框',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts tag.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 tagRules 强关联，非 tagRules 规则内的 token 需手动增加或删减。
 */
const tagTokenValue = {};

const tagTokenExtraValue = {

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
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: 'Brand-3' } },
        hover: { background: { color: 'Brand-1' }, font: { color: 'Brand-6' } },
      },
    },
    fill: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Brand-6' },
      border: { color: 'Brand-6' },
      disabled: {
        font: { color: 'Neutral-text-1' },
        background: { color: 'Brand-3' },
        border: { color: 'Brand-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: '' } },
        hover: { background: { color: 'Brand-5' }, font: { color: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: 'Brand-6' },
      disabled: { background: { color: '' }, font: { color: 'Brand-3' } },
      hover: { background: { color: 'Brand-2' }, font: { color: '' } },
    },
  },
  default: {
    line:  { height: 'Line-height-dynamic' },
    font: { color: 'Neutral-text-5' },
    background: { color: 'Neutral-fill-2' },
    border: { color: 'Neutral-fill-2' },
    disabled: {
      font: { color: 'Neutral-text-2' },
      background: { color: 'Neutral-fill-2' },
      border: { color: 'Neutral-fill-2' },
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
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: '' } },
        hover: { background: { color: '' }, font: { color: '' } },
      },
    },
    fill: {
      font: { color: 'Neutral-text-5' },
      background: { color: 'Neutral-fill-3' },
      border: { color: 'Neutral-fill-3' },
      disabled: {
        font: { color: 'Neutral-text-2' },
        background: { color: 'Neutral-fill-3' },
        border: { color: 'Neutral-fill-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: '' } },
        hover: { background: { color: 'Neutral-fill-4' }, font: { color: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: 'Neutral-text-4' },
      disabled: { background: { color: '' }, font: { color: 'Neutral-text-2' } },
      hover: { background: { color: 'Neutral-fill-3' }, font: { color: 'Neutral-text-5' } },
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
      font: { color: 'Success-6' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Success-6' },
      disabled: {
        font: { color: 'Success-3' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Success-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: 'Success-3' } },
        hover: { background: { color: 'Success-2' }, font: { color: '' } },
      },
    },
    fill: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Success-6' },
      border: { color: 'Success-6' },
      disabled: {
        font: { color: 'Neutral-text-1' },
        background: { color: 'Success-3' },
        border: { color: 'Success-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: '' } },
        hover: { background: { color: 'Success-5' }, font: { color: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: 'Success-6' },
      disabled: { background: { color: '' }, font: { color: 'Success-3' } },
      hover: { background: { color: 'Success-2' }, font: { color: '' } },
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
      font: { color: 'Warning-6' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Warning-6' },
      disabled: {
        font: { color: 'Warning-3' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Warning-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: '' } },
        hover: { background: { color: '' }, font: { color: '' } },
      },
    },
    fill: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Warning-6' },
      border: { color: 'Warning-6' },
      disabled: {
        font: { color: 'Neutral-text-1' },
        background: { color: 'Warning-3' },
        border: { color: 'Warning-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: 'Warning-6' },
        disabled: { background: { color: '' }, font: { color: '' } },
        hover: { background: { color: 'Warning-5' }, font: { color: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: '' },
      disabled: { background: { color: '' }, font: { color: 'Warning-3' } },
      hover: { background: { color: 'Warning-2' }, font: { color: '' } },
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
      font: { color: 'Danger-6' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Danger-6' },
      disabled: {
        font: { color: 'Danger-3' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Danger-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: '' } },
        hover: { background: { color: '' }, font: { color: '' } },
      },
    },
    fill: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Danger-6' },
      border: { color: 'Danger-6' },
      disabled: {
        font: { color: 'Neutral-text-1' },
        background: { color: 'Danger-3' },
        border: { color: 'Danger-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: '' } },
        hover: { background: { color: 'Danger-5' }, font: { color: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: 'Danger-6' },
      disabled: { background: { color: '' }, font: { color: 'Danger-3' } },
      hover: { background: { color: 'Danger-2' }, font: { color: '' } },
    },
  },
  magenta: {
    font: { color: 'Magenta-6' },
    background: { color: 'Magenta-1' },
    border: { color: 'Magenta-1' },
    disabled: {
      font: { color: 'Magenta-3' },
      background: { color: 'Magenta-1' },
      border: { color: 'Magenta-1' },
    },
    outline: {
      font: { color: 'Magenta-6' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Magenta-6' },
      disabled: {
        font: { color: 'Magenta-3' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Magenta-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: '' } },
        hover: { background: { color: '' }, font: { color: '' } },
      },
    },
    fill: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Magenta-6' },
      border: { color: 'Magenta-6' },
      disabled: {
        font: { color: 'Neutral-text-1' },
        background: { color: 'Magenta-3' },
        border: { color: 'Magenta-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: '' } },
        hover: { background: { color: 'Magenta-5' }, font: { color: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: 'Magenta-6' },
      disabled: { background: { color: '' }, font: { color: 'Magenta-3' } },
      hover: { background: { color: 'Magenta-2' }, font: { color: '' } },
    },
  },
  brown: {
    font: { color: 'Brown-6' },
    background: { color: 'Brown-1' },
    border: { color: 'Brown-1' },
    disabled: {
      font: { color: 'Brown-3' },
      background: { color: 'Brown-1' },
      border: { color: 'Brown-1' },
    },
    outline: {
      font: { color: 'Brown-6' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Brown-6' },
      disabled: {
        font: { color: 'Brown-3' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Brown-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: '' } },
        hover: { background: { color: '' }, font: { color: '' } },
      },
    },
    fill: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Brown-6' },
      border: { color: 'Brown-6' },
      disabled: {
        font: { color: 'Neutral-text-1' },
        background: { color: 'Brown-3' },
        border: { color: 'Brown-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: '' } },
        hover: { background: { color: 'Brown-5' }, font: { color: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: 'Brown-6' },
      disabled: { background: { color: '' }, font: { color: 'Brown-3' } },
      hover: { background: { color: 'Brown-2' }, font: { color: '' } },
    },
  },
  purple: {
    font: { color: 'Purple-6' },
    background: { color: 'Purple-1' },
    border: { color: 'Purple-1' },
    disabled: {
      font: { color: 'Purple-3' },
      background: { color: 'Purple-1' },
      border: { color: 'Purple-1' },
    },
    outline: {
      font: { color: 'Purple-6' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Purple-6' },
      disabled: {
        font: { color: 'Purple-3' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Purple-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: '' } },
        hover: { background: { color: '' }, font: { color: '' } },
      },
    },
    fill: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Purple-6' },
      border: { color: 'Purple-6' },
      disabled: {
        font: { color: 'Neutral-text-1' },
        background: { color: 'Purple-3' },
        border: { color: 'Purple-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: '' } },
        hover: { background: { color: 'Purple-5' }, font: { color: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: 'Purple-6' },
      disabled: { background: { color: '' }, font: { color: 'Purple-3' } },
      hover: { background: { color: 'Purple-2' }, font: { color: '' } },
    },
  },
  indigo: {
    font: { color: 'Indigo-6' },
    background: { color: 'Indigo-1' },
    border: { color: 'Indigo-1' },
    disabled: {
      font: { color: 'Indigo-3' },
      background: { color: 'Indigo-1' },
      border: { color: 'Indigo-1' },
    },
    outline: {
      font: { color: 'Indigo-6' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Indigo-6' },
      disabled: {
        font: { color: 'Indigo-3' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Indigo-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: '' } },
        hover: { background: { color: '' }, font: { color: '' } },
      },
    },
    fill: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Indigo-6' },
      border: { color: 'Indigo-6' },
      disabled: {
        font: { color: 'Neutral-text-1' },
        background: { color: 'Indigo-3' },
        border: { color: 'Indigo-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: '' } },
        hover: { background: { color: 'Indigo-5' }, font: { color: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: 'Indigo-6' },
      disabled: { background: { color: '' }, font: { color: 'Indigo-3' } },
      hover: { background: { color: 'Indigo-2' }, font: { color: '' } },
    },
  },
  cyan: {
    font: { color: 'Cyan-6' },
    background: { color: 'Cyan-1' },
    border: { color: 'Cyan-1' },
    disabled: {
      font: { color: 'Cyan-3' },
      background: { color: 'Cyan-1' },
      border: { color: 'Cyan-1' },
    },
    outline: {
      font: { color: 'Cyan-6' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Cyan-6' },
      disabled: {
        font: { color: 'Cyan-3' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Cyan-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: '' } },
        hover: { background: { color: '' }, font: { color: '' } },
      },
    },
    fill: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Cyan-6' },
      border: { color: 'Cyan-6' },
      disabled: {
        font: { color: 'Neutral-text-1' },
        background: { color: 'Cyan-3' },
        border: { color: 'Cyan-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: '' } },
        hover: { background: { color: 'Cyan-5' }, font: { color: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: 'Cyan-6' },
      disabled: { background: { color: '' }, font: { color: 'Cyan-3' } },
      hover: { background: { color: 'Cyan-2' }, font: { color: '' } },
    },
  },
  neon: {
    font: { color: 'Neon-6' },
    background: { color: 'Neon-1' },
    border: { color: 'Neon-1' },
    disabled: {
      font: { color: 'Neon-3' },
      background: { color: 'Neon-1' },
      border: { color: 'Neon-1' },
    },
    outline: {
      font: { color: 'Neon-6' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Neon-6' },
      disabled: {
        font: { color: 'Neon-3' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Neon-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: '' } },
        hover: { background: { color: '' }, font: { color: '' } },
      },
    },
    fill: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Neon-6' },
      border: { color: 'Neon-6' },
      disabled: {
        font: { color: 'Neutral-text-1' },
        background: { color: 'Neon-3' },
        border: { color: 'Neon-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: '' } },
        hover: { background: { color: 'Neon-5' }, font: { color: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: 'Neon-6' },
      disabled: { background: { color: '' }, font: { color: 'Neon-3' } },
      hover: { background: { color: 'Neon-2' }, font: { color: '' } },
    },
  },
  lemon: {
    font: { color: 'Lemon-6' },
    background: { color: 'Lemon-1' },
    border: { color: 'Lemon-1' },
    disabled: {
      font: { color: 'Lemon-3' },
      background: { color: 'Lemon-1' },
      border: { color: 'Lemon-1' },
    },
    outline: {
      font: { color: 'Lemon-6' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Lemon-6' },
      disabled: {
        font: { color: 'Lemon-3' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Lemon-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: '' } },
        hover: { background: { color: '' }, font: { color: '' } },
      },
    },
    fill: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Lemon-6' },
      border: { color: 'Lemon-6' },
      disabled: {
        font: { color: 'Neutral-text-1' },
        background: { color: 'Lemon-3' },
        border: { color: 'Lemon-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: '' } },
        hover: { background: { color: 'Lemon-5' }, font: { color: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: 'Lemon-6' },
      disabled: { background: { color: '' }, font: { color: 'Lemon-3' } },
      hover: { background: { color: 'Lemon-2' }, font: { color: '' } },
    },
  },
  tangerine: {
    font: { color: 'Tangerine-6' },
    background: { color: 'Tangerine-1' },
    border: { color: 'Tangerine-1' },
    disabled: {
      font: { color: 'Tangerine-3' },
      background: { color: 'Tangerine-1' },
      border: { color: 'Tangerine-1' },
    },
    outline: {
      font: { color: 'Tangerine-6' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Tangerine-6' },
      disabled: {
        font: { color: 'Tangerine-3' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Tangerine-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: '' } },
        hover: { background: { color: '' }, font: { color: '' } },
      },
    },
    fill: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Tangerine-6' },
      border: { color: 'Tangerine-6' },
      disabled: {
        font: { color: 'Neutral-text-1' },
        background: { color: 'Tangerine-3' },
        border: { color: 'Tangerine-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        disabled: { background: { color: '' }, font: { color: '' } },
        hover: { background: { color: 'Tangerine-5' }, font: { color: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: 'Tangerine-6' },
      disabled: { background: { color: '' }, font: { color: 'Tangerine-3' } },
      hover: { background: { color: 'Tangerine-2' }, font: { color: '' } },
    },
  },
  font: { size: 'Font-12', weight: 'Weight-regular' },
  border: { radius: 'Radius-small' },
  padding: { x: 'Spacing-6', y: 'Spacing-0' },
  height: 'Size-11',
  small: {
    font: { size: 'Font-12', weight: 'Weight-regular' },
    border: { radius: 'Radius-small' },
    padding: { x: 'Spacing-4', y: '' },
    height: 'Size-10',
    input: { padding: { x: 'Spacing-4', y: '' }, font: { size: 'Font-12' } },
    line:  { height: 'Line-height-dynamic' }
  },
  large: {
    font: { size: 'Font-14', weight: 'Weight-regular' },
    border: { radius: 'Radius-default' },
    padding: { x: 'Spacing-12', y: 'Spacing-2' },
    height: 'Size-14',
    input: { padding: { x: 'Spacing-4', y: '' }, font: { size: 'Font-14' } },
    line:  { height: 'Line-height-dynamic' }
  },
  input: { padding: { x: 'Spacing-4', y: '' }, font: { size: 'Font-12' } },
};

module.exports = {
  tagTokenValue,
  tagTokenExtraValue,
  tagTokenDescription,
};
