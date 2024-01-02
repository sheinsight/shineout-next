// 此文件受脚本控制，修改后将自动同步 type.ts tag.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and tag.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const tagTokenDescription = {
  tag: '标签',
  outline: '线框模式',
  disabled: '禁用状态的',
  info: '提示色',
  magenta: '洋红色',
  orange: '橘黄色',
  purple: '紫色',
  indigo: '靛蓝色',
  cyan: '青色',
  neon: '荧光色',
  lemon: '柠檬色',
  tangerine: '橘红色',
};

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
      icon: {
        background: { color: '' },
        font: { color: '' },
        height: { undefined: '' },
        disabled: {
          background: { color: '' },
          font: { color: 'Brand-3' },
          height: { undefined: '' },
        },
        hover: {
          background: { color: 'Brand-1' },
          font: { color: 'Brand-6' },
          height: { undefined: '' },
        },
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
        height: { undefined: '' },
        disabled: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
        hover: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: '' },
      height: { undefined: '' },
      disabled: {
        background: { color: '' },
        font: { color: 'Brand-3' },
        height: { undefined: '' },
      },
      hover: { background: { color: 'Brand-2' }, font: { color: '' }, height: { undefined: '' } },
    },
  },
  default: {
    font: { color: 'Neutral-text-5' },
    background: { color: 'Neutral-fill-2' },
    border: { color: 'Neutral-fill-2' },
    disabled: {
      font: { color: 'Neutral-text-2' },
      background: { color: 'Neutral-fill-3' },
      border: { color: 'Neutral-fill-3' },
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
      icon: {
        background: { color: '' },
        font: { color: '' },
        height: { undefined: '' },
        disabled: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
        hover: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
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
        height: { undefined: '' },
        disabled: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
        hover: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: '' },
      height: { undefined: '' },
      disabled: {
        background: { color: '' },
        font: { color: 'Neutral-text-2' },
        height: { undefined: '' },
      },
      hover: {
        background: { color: 'Neutral-fill-3' },
        font: { color: 'Neutral-text-5' },
        height: { undefined: '' },
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
      icon: {
        background: { color: '' },
        font: { color: '' },
        height: { undefined: '' },
        disabled: {
          background: { color: '' },
          font: { color: 'Success-3' },
          height: { undefined: '' },
        },
        hover: {
          background: { color: 'Success-2' },
          font: { color: '' },
          height: { undefined: '' },
        },
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
        height: { undefined: '' },
        disabled: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
        hover: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: '' },
      height: { undefined: '' },
      disabled: {
        background: { color: '' },
        font: { color: 'Success-3' },
        height: { undefined: '' },
      },
      hover: { background: { color: 'Success-2' }, font: { color: '' }, height: { undefined: '' } },
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
      icon: {
        background: { color: '' },
        font: { color: '' },
        height: { undefined: '' },
        disabled: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
        hover: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
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
        font: { color: '' },
        height: { undefined: '' },
        disabled: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
        hover: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: '' },
      height: { undefined: '' },
      disabled: {
        background: { color: '' },
        font: { color: 'Warning-3' },
        height: { undefined: '' },
      },
      hover: { background: { color: 'Warning-2' }, font: { color: '' }, height: { undefined: '' } },
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
      icon: {
        background: { color: '' },
        font: { color: '' },
        height: { undefined: '' },
        disabled: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
        hover: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
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
        height: { undefined: '' },
        disabled: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
        hover: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: '' },
      height: { undefined: '' },
      disabled: {
        background: { color: '' },
        font: { color: 'Danger-3' },
        height: { undefined: '' },
      },
      hover: { background: { color: 'Danger-2' }, font: { color: '' }, height: { undefined: '' } },
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
      font: { color: 'Magenta-5' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Magenta-5' },
      disabled: {
        font: { color: 'Magenta-3' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Magenta-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        height: { undefined: '' },
        disabled: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
        hover: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
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
        height: { undefined: '' },
        disabled: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
        hover: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: '' },
      height: { undefined: '' },
      disabled: {
        background: { color: '' },
        font: { color: 'Magenta-3' },
        height: { undefined: '' },
      },
      hover: { background: { color: 'Magenta-2' }, font: { color: '' }, height: { undefined: '' } },
    },
  },
  orange: {
    font: { color: 'Orange-6' },
    background: { color: 'Orange-1' },
    border: { color: 'Orange-1' },
    disabled: {
      font: { color: 'Orange-3' },
      background: { color: 'Orange-1' },
      border: { color: 'Orange-1' },
    },
    outline: {
      font: { color: 'Orange-5' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Orange-5' },
      disabled: {
        font: { color: 'Orange-3' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Orange-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        height: { undefined: '' },
        disabled: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
        hover: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
      },
    },
    fill: {
      font: { color: 'Neutral-text-1' },
      background: { color: 'Orange-6' },
      border: { color: 'Orange-6' },
      disabled: {
        font: { color: 'Neutral-text-1' },
        background: { color: 'Orange-3' },
        border: { color: 'Orange-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        height: { undefined: '' },
        disabled: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
        hover: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: '' },
      height: { undefined: '' },
      disabled: {
        background: { color: '' },
        font: { color: 'Orange-3' },
        height: { undefined: '' },
      },
      hover: { background: { color: 'Orange-2' }, font: { color: '' }, height: { undefined: '' } },
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
      font: { color: 'Purple-5' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Purple-5' },
      disabled: {
        font: { color: 'Purple-3' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Purple-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        height: { undefined: '' },
        disabled: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
        hover: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
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
        height: { undefined: '' },
        disabled: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
        hover: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: '' },
      height: { undefined: '' },
      disabled: {
        background: { color: '' },
        font: { color: 'Purple-3' },
        height: { undefined: '' },
      },
      hover: { background: { color: 'Purple-2' }, font: { color: '' }, height: { undefined: '' } },
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
      font: { color: 'Indigo-5' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Indigo-5' },
      disabled: {
        font: { color: 'Indigo-3' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Indigo-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        height: { undefined: '' },
        disabled: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
        hover: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
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
        height: { undefined: '' },
        disabled: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
        hover: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: '' },
      height: { undefined: '' },
      disabled: {
        background: { color: '' },
        font: { color: 'Indigo-3' },
        height: { undefined: '' },
      },
      hover: { background: { color: 'Indigo-2' }, font: { color: '' }, height: { undefined: '' } },
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
      font: { color: 'Cyan-5' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Cyan-5' },
      disabled: {
        font: { color: 'Cyan-3' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Cyan-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        height: { undefined: '' },
        disabled: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
        hover: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
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
        height: { undefined: '' },
        disabled: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
        hover: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: '' },
      height: { undefined: '' },
      disabled: { background: { color: '' }, font: { color: 'Cyan-3' }, height: { undefined: '' } },
      hover: { background: { color: 'Cyan-2' }, font: { color: '' }, height: { undefined: '' } },
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
      font: { color: 'Neon-5' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Neon-5' },
      disabled: {
        font: { color: 'Neon-3' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Neon-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        height: { undefined: '' },
        disabled: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
        hover: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
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
        height: { undefined: '' },
        disabled: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
        hover: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: '' },
      height: { undefined: '' },
      disabled: { background: { color: '' }, font: { color: 'Neon-3' }, height: { undefined: '' } },
      hover: { background: { color: 'Neon-2' }, font: { color: '' }, height: { undefined: '' } },
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
      font: { color: 'Lemon-5' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Lemon-5' },
      disabled: {
        font: { color: 'Lemon-3' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Lemon-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        height: { undefined: '' },
        disabled: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
        hover: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
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
        height: { undefined: '' },
        disabled: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
        hover: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: '' },
      height: { undefined: '' },
      disabled: {
        background: { color: '' },
        font: { color: 'Lemon-3' },
        height: { undefined: '' },
      },
      hover: { background: { color: 'Lemon-2' }, font: { color: '' }, height: { undefined: '' } },
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
      font: { color: 'Tangerine-5' },
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Tangerine-5' },
      disabled: {
        font: { color: 'Tangerine-3' },
        background: { color: 'Neutral-fill-1' },
        border: { color: 'Tangerine-3' },
      },
      icon: {
        background: { color: '' },
        font: { color: '' },
        height: { undefined: '' },
        disabled: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
        hover: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
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
        height: { undefined: '' },
        disabled: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
        hover: { background: { color: '' }, font: { color: '' }, height: { undefined: '' } },
      },
    },
    icon: {
      background: { color: '' },
      font: { color: '' },
      height: { undefined: '' },
      disabled: {
        background: { color: '' },
        font: { color: 'Tangerine-3' },
        height: { undefined: '' },
      },
      hover: {
        background: { color: 'Tangerine-2' },
        font: { color: '' },
        height: { undefined: '' },
      },
    },
  },
  font: { size: '12/regular' },
  border: { radius: 'Radius-3' },
  padding: { x: 'Padding-6', y: 'Padding-2' },
  height: 'Size-11',
  small: {
    font: { size: '12/regular' },
    border: { radius: 'Radius-2' },
    padding: { x: 'Padding-4', y: '' },
    height: 'Size-10',
    input: { padding: { x: 'Padding-4', y: '' }, font: { size: '12/regular' } },
  },
  large: {
    font: { size: '14/regular' },
    border: { radius: 'Radius-4' },
    padding: { x: 'Padding-12', y: 'Padding-3' },
    height: 'Size-14',
    input: { padding: { x: 'Padding-4', y: '' }, font: { size: '14/regular' } },
  },
  input: { padding: { x: 'Padding-4', y: '' }, font: { size: '12/regular' } },
};

const tagTokenExtraValue = {};

module.exports = {
  tagTokenValue,
  tagTokenExtraValue,
  tagTokenDescription,
};
