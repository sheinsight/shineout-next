const tokenDescription = {
  Color: '颜色',
  Border: '边框',
  Background: '背景',

  Line: '行',
  Font: '字体',
  Size: '字号',
  Radius: '圆角',
  Width: '宽度',
  Height: '高度',

  Hover: '鼠标移入时的',
  Active: '鼠标点击时的',
  Focus: '鼠标聚焦时的',
  Disabled: '禁用时的',
  Error: '错误状态的',

  Primary: '主要颜色',
  Success: '成功色',
  Warning: '警告色',
  Danger: '危险色',
  Secondary: '次要色',
  Link: '链接色',

  Small: '小尺寸',
  Default: '默认尺寸',
  Large: '大尺寸',

  Round: '药丸形',
  Square: '方形',
  Circle: '圆形',

  Padding: '内边距',
  Margin: '外边距',
  X: '（水平方向）',
  Y: '（垂直方向）',

  Prefix: '前缀',
  Suffix: '后缀',

  Icon: '图标',
  Clear: '清除',

  Inner: '内嵌',
  Title: '标题模式',

  button: '按钮',
  input: '输入框',
};

const tokenValueMap = {
  Primary: {
    Disabled: {
      Background: {
        Color: 'Brand-3',
      },
      Border: {
        Color: 'Brand-3',
      },
      Font: {
        Color: 'Neutral-text-1',
      },
    },
    Hover: {
      Background: {
        Color: 'Brand-4',
      },
      Border: {
        Color: 'Brand-4',
      },
      Font: {
        Color: 'Neutral-text-1',
      },
    },
    Active: {
      Background: {
        Color: 'Brand-6',
      },
      Border: {
        Color: 'Brand-6',
      },
      Font: {
        Color: 'Neutral-text-1',
      },
    },
    Focus: {
      Background: {
        Color: 'Brand-4',
      },
      Border: {
        Color: 'Brand-4',
      },
      Font: {
        Color: 'Neutral-text-1',
      },
    },
    Background: {
      Color: 'Brand-5',
    },
    Border: {
      Color: 'Brand-5',
    },
    Font: {
      Color: 'Neutral-text-1',
    },
  },
  Success: {
    Disabled: {
      Background: {
        Color: 'Success-3',
      },
      Border: {
        Color: 'Success-3',
      },
      Font: {
        Color: 'Neutral-text-1',
      },
    },
    Hover: {
      Background: {
        Color: 'Success-4',
      },
      Border: {
        Color: 'Success-4',
      },
      Font: {
        Color: 'Neutral-text-1',
      },
    },
    Active: {
      Background: {
        Color: 'Success-6',
      },
      Border: {
        Color: 'Success-6',
      },
      Font: {
        Color: 'Neutral-text-1',
      },
    },
    Focus: {
      Background: {
        Color: 'Success-4',
      },
      Border: {
        Color: 'Success-4',
      },
      Font: {
        Color: 'Neutral-text-1',
      },
    },
    Background: {
      Color: 'Success-5',
    },
    Border: {
      Color: 'Success-5',
    },
    Font: {
      Color: 'Neutral-text-1',
    },
  },
  Warning: {
    Disabled: {
      Background: {
        Color: 'Warning-3',
      },
      Border: {
        Color: 'Warning-3',
      },
      Font: {
        Color: 'Neutral-text-1',
      },
    },
    Hover: {
      Background: {
        Color: 'Warning-4',
      },
      Border: {
        Color: 'Warning-4',
      },
      Font: {
        Color: 'Neutral-text-1',
      },
    },
    Active: {
      Background: {
        Color: 'Warning-6',
      },
      Border: {
        Color: 'Warning-6',
      },
      Font: {
        Color: 'Neutral-text-1',
      },
    },
    Focus: {
      Background: {
        Color: 'Warning-4',
      },
      Border: {
        Color: 'Warning-4',
      },
      Font: {
        Color: 'Neutral-text-1',
      },
    },
    Background: {
      Color: 'Warning-5',
    },
    Border: {
      Color: 'Warning-5',
    },
    Font: {
      Color: 'Neutral-text-1',
    },
  },
  Danger: {
    Disabled: {
      Background: {
        Color: 'Danger-3',
      },
      Border: {
        Color: 'Danger-3',
      },
      Font: {
        Color: 'Neutral-text-1',
      },
    },
    Hover: {
      Background: {
        Color: 'Danger-4',
      },
      Border: {
        Color: 'Danger-4',
      },
      Font: {
        Color: 'Neutral-text-1',
      },
    },
    Active: {
      Background: {
        Color: 'Danger-6',
      },
      Border: {
        Color: 'Danger-6',
      },
      Font: {
        Color: 'Neutral-text-1',
      },
    },
    Focus: {
      Background: {
        Color: 'Danger-4',
      },
      Border: {
        Color: 'Danger-4',
      },
      Font: {
        Color: 'Neutral-text-1',
      },
    },
    Background: {
      Color: 'Danger-5',
    },
    Border: {
      Color: 'Danger-5',
    },
    Font: {
      Color: 'Neutral-text-1',
    },
  },
  Secondary: {
    Disabled: {
      Background: {
        Color: 'Secondary-3',
      },
      Border: {
        Color: 'Secondary-3',
      },
      Font: {
        Color: 'Neutral-text-1',
      },
    },
    Hover: {
      Background: {
        Color: 'Secondary-4',
      },
      Border: {
        Color: 'Secondary-4',
      },
      Font: {
        Color: 'Neutral-text-1',
      },
    },
    Active: {
      Background: {
        Color: 'Secondary-6',
      },
      Border: {
        Color: 'Secondary-6',
      },
      Font: {
        Color: 'Neutral-text-1',
      },
    },
    Focus: {
      Background: {
        Color: 'Secondary-4',
      },
      Border: {
        Color: 'Secondary-4',
      },
      Font: {
        Color: 'Neutral-text-1',
      },
    },
    Background: {
      Color: 'Secondary-5',
    },
    Border: {
      Color: 'Secondary-5',
    },
    Font: {
      Color: 'Neutral-text-1',
    },
  },
  Small: {
    Line: {
      Height: '???',
    },
    Font: {
      Size: '???',
    },
    Border: {
      Radius: '???',
      Width: '???',
    },
    Padding: {
      X: '???',
      Y: '???',
    },
    Margin: {
      X: '???',
      Y: '???',
    },
  },
  Default: {
    Line: {
      Height: '???',
    },
    Font: {
      Size: '???',
    },
    Border: {
      Radius: '???',
      Width: '???',
    },
    Padding: {
      X: '???',
      Y: '???',
    },
    Margin: {
      X: '???',
      Y: '???',
    },
  },
  Large: {
    Line: {
      Height: '???',
    },
    Font: {
      Size: '???',
    },
    Border: {
      Radius: '???',
      Width: '???',
    },
    Padding: {
      X: '???',
      Y: '???',
    },
    Margin: {
      X: '???',
      Y: '???',
    },
  },
};

module.exports = {
  tokenDescription,
  tokenValueMap,
};
