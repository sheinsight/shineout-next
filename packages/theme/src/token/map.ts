const tokenDescriptionMap = {
  color: '颜色',
  border: '边框',
  background: '背景',

  line: '行',
  font: '字体',
  size: '字号',
  radius: '圆角',
  width: '宽度',
  height: '高度',

  hover: '鼠标移入时的',
  active: '鼠标点击时的',
  focus: '鼠标聚焦时的',
  disabled: '禁用时的',
  error: '错误状态的',

  primary: '主要色',
  success: '成功色',
  warning: '警告色',
  danger: '危险色',
  secondary: '次要色',
  link: '链接色',

  small: '小尺寸',
  default: '默认尺寸',
  large: '大尺寸',

  round: '药丸形',
  square: '方形',
  circle: '圆形',

  padding: '内边距',
  margin: '外边距',
  x: '（水平方向）',
  y: '（垂直方向）',

  prefix: '前缀',
  suffix: '后缀',

  icon: '图标',
  clear: '清除',

  inner: '内嵌',
  title: '标题模式',
};

const tokenValueMap = {
  primary: {
    disabled: {
      background: {
        color: 'Brand-3',
      },
      border: {
        color: 'Brand-3',
      },
      font: {
        color: 'Neutral-text-1',
      },
    },
    hover: {
      background: {
        color: 'Brand-4',
      },
      border: {
        color: 'Brand-4',
      },
      font: {
        color: 'Neutral-text-1',
      },
    },
    active: {
      background: {
        color: 'Brand-6',
      },
      border: {
        color: 'Brand-6',
      },
      font: {
        color: 'Neutral-text-1',
      },
    },
    focus: {
      background: {
        color: 'Brand-4',
      },
      border: {
        color: 'Brand-4',
      },
      font: {
        color: 'Neutral-text-1',
      },
    },
    background: {
      color: 'Brand-5',
    },
    border: {
      color: 'Brand-5',
    },
    font: {
      color: 'Neutral-text-1',
    },
  },
  success: {
    disabled: {
      background: {
        color: 'Success-3',
      },
      border: {
        color: 'Success-3',
      },
      font: {
        color: 'Neutral-text-1',
      },
    },
    hover: {
      background: {
        color: 'Success-4',
      },
      border: {
        color: 'Success-4',
      },
      font: {
        color: 'Neutral-text-1',
      },
    },
    active: {
      background: {
        color: 'Success-6',
      },
      border: {
        color: 'Success-6',
      },
      font: {
        color: 'Neutral-text-1',
      },
    },
    focus: {
      background: {
        color: 'Success-4',
      },
      border: {
        color: 'Success-4',
      },
      font: {
        color: 'Neutral-text-1',
      },
    },
    background: {
      color: 'Success-5',
    },
    border: {
      color: 'Success-5',
    },
    font: {
      color: 'Neutral-text-1',
    },
  },
  warning: {
    disabled: {
      background: {
        color: 'Warning-3',
      },
      border: {
        color: 'Warning-3',
      },
      font: {
        color: 'Neutral-text-1',
      },
    },
    hover: {
      background: {
        color: 'Warning-4',
      },
      border: {
        color: 'Warning-4',
      },
      font: {
        color: 'Neutral-text-1',
      },
    },
    active: {
      background: {
        color: 'Warning-6',
      },
      border: {
        color: 'Warning-6',
      },
      font: {
        color: 'Neutral-text-1',
      },
    },
    focus: {
      background: {
        color: 'Warning-4',
      },
      border: {
        color: 'Warning-4',
      },
      font: {
        color: 'Neutral-text-1',
      },
    },
    background: {
      color: 'Warning-5',
    },
    border: {
      color: 'Warning-5',
    },
    font: {
      color: 'Neutral-text-1',
    },
  },
  danger: {
    disabled: {
      background: {
        color: 'Danger-3',
      },
      border: {
        color: 'Danger-3',
      },
      font: {
        color: 'Neutral-text-1',
      },
    },
    hover: {
      background: {
        color: 'Danger-4',
      },
      border: {
        color: 'Danger-4',
      },
      font: {
        color: 'Neutral-text-1',
      },
    },
    active: {
      background: {
        color: 'Danger-6',
      },
      border: {
        color: 'Danger-6',
      },
      font: {
        color: 'Neutral-text-1',
      },
    },
    focus: {
      background: {
        color: 'Danger-4',
      },
      border: {
        color: 'Danger-4',
      },
      font: {
        color: 'Neutral-text-1',
      },
    },
    background: {
      color: 'Danger-5',
    },
    border: {
      color: 'Danger-5',
    },
    font: {
      color: 'Neutral-text-1',
    },
  },
  secondary: {
    disabled: {
      background: {
        color: 'Secondary-3',
      },
      border: {
        color: 'Secondary-3',
      },
      font: {
        color: 'Neutral-text-1',
      },
    },
    hover: {
      background: {
        color: 'Secondary-4',
      },
      border: {
        color: 'Secondary-4',
      },
      font: {
        color: 'Neutral-text-1',
      },
    },
    active: {
      background: {
        color: 'Secondary-6',
      },
      border: {
        color: 'Secondary-6',
      },
      font: {
        color: 'Neutral-text-1',
      },
    },
    focus: {
      background: {
        color: 'Secondary-4',
      },
      border: {
        color: 'Secondary-4',
      },
      font: {
        color: 'Neutral-text-1',
      },
    },
    background: {
      color: 'Secondary-5',
    },
    border: {
      color: 'Secondary-5',
    },
    font: {
      color: 'Neutral-text-1',
    },
  },
  small: {
    line: {
      height: undefined,
    },
    font: {
      size: undefined,
    },
    border: {
      Radius: undefined,
      Width: undefined,
    },
    padding: {
      x: undefined,
      y: undefined,
    },
    margin: {
      x: undefined,
      y: undefined,
    },
  },
  default: {
    line: {
      height: undefined,
    },
    font: {
      size: undefined,
    },
    border: {
      Radius: undefined,
      Width: undefined,
    },
    padding: {
      x: undefined,
      y: undefined,
    },
    margin: {
      x: undefined,
      y: undefined,
    },
  },
  Large: {
    line: {
      height: undefined,
    },
    font: {
      size: undefined,
    },
    border: {
      Radius: undefined,
      Width: undefined,
    },
    padding: {
      x: undefined,
      y: undefined,
    },
    margin: {
      x: undefined,
      y: undefined,
    },
  },
  disabled: {
    background: {
      color: 'Neutral-Fill-2',
    },
    border: {
      // figma 存在文案大小写问题
      color: 'Neutral-border-2',
    },
    font: {
      color: 'Neutral-text-2',
    },
  },
  border: {
    color: 'Neutral-border-2',
  },
  background: {
    color: 'Neutral-Fill-3',
  },
};

module.exports = {
  tokenDescriptionMap,
  tokenValueMap,
};
