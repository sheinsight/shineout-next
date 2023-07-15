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
  Default: {
    Disabled: {
      Background: {
        Color: 'Neutral-fill-2',
      },
      Border: {
        Color: 'Neutral-fill-2',
      },
      Font: {
        Color: 'Neutral-text-2',
      },
    },
    Hover: {
      Background: {
        Color: 'Neutral-fill-1',
      },
      Border: {
        Color: 'Brand-6',
      },
      Font: {
        Color: 'Neutral-text-1',
      },
    },
    Active: {
      Background: {
        Color: 'Neutral-fill-1',
      },
      Border: {
        Color: 'Brand-7',
      },
      Font: {
        Color: 'Neutral-text-1',
      },
    },
    Focus: {
      Background: {
        Color: 'Neutral-fill-1',
      },
      Border: {
        Color: 'Brand-6',
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
    Text: {},
  },
  Small: {
    Font: {
      Size: '12/regular',
    },
    Border: {
      Radius: 'Radius-4',
    },
    Padding: {
      X: 'Padding-8',
      Y: 'Padding-2',
    },
    Round: {
      Border: {
        Radius: 'Radius-1000',
      },
    },
    Circle: {
      Border: {
        Radius: 'Radius-50%',
      },
    },
    Square: {
      Border: {
        Radius: 'Radius-4',
      },
    },
  },
  Large: {
    Font: {
      Size: '16/regular',
    },
    Border: {
      Radius: 'Radius-4',
    },
    Padding: {
      X: 'Padding-12',
      Y: 'Padding-8',
    },
    Round: {
      Border: {
        Radius: 'Radius-1000',
      },
    },
    Circle: {
      Border: {
        Radius: 'Radius-50%',
      },
    },
    Square: {
      Border: {
        Radius: 'Radius-4',
      },
    },
  },
  Font: {
    Size: '14/regular',
    Color: 'Color-Primary-500',
  },
  Border: {
    Radius: 'Radius-4',
  },
  Padding: {
    X: 'Padding-8',
    Y: 'Padding-5',
  },
  Round: {
    Border: {
      Radius: 'Radius-1000',
    },
  },
  Circle: {
    Border: {
      Radius: 'Radius-50%',
    },
  },
  Square: {
    Border: {
      Radius: 'Radius-4',
    },
  },
  Nearly: {
    Margin: 'Margin-8',
  },
  Primary: {
    Outline: {
      Disabled: {
        Background: {
          Color: 'Neutral-fill-1',
        },
        Border: {
          Color: 'Brand-3',
        },
        Font: {
          Color: 'Brand-3',
        },
      },
      Hover: {
        Background: {
          Color: 'Neutral-fill-1',
        },
        Border: {
          Color: 'Brand-5',
        },
        Font: {
          Color: 'Brand-5',
        },
      },
      Active: {
        Background: {
          Color: 'Neutral-fill-1',
        },
        Border: {
          Color: 'Brand-7',
        },
        Font: {
          Color: 'Brand-7',
        },
      },
      Focus: {
        Background: {
          Color: 'Neutral-fill-1',
        },
        Border: {
          Color: 'Brand-5',
        },
        Font: {
          Color: 'Brand-5',
        },
      },
      Background: {
        Color: 'Neutral-fill-1',
      },
      Border: {
        Color: 'Brand-6',
      },
      Font: {
        Color: 'Brand-6',
      },
    },
  },
};

module.exports = {
  buttonRules,
  buttonTokenValue,
  buttonTokenDescription,
};
