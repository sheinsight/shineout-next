const buttonTokenDescription = {
  button: '按钮',
  Nearly: '相邻之间的',
  Text: '文本模式',
  Outline: '线框模式',
};

const buttonRules = {
  color: [
    ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
    ['', 'disabled', 'hover', 'active', 'focus'],
    ['font-color', 'background-color', 'border-color'],
  ],
  size: [
    ['', 'small', 'large'],
    ['font-size', 'border-radius', 'padding-x', 'padding-y'],
  ],
  type: [
    ['outline', 'text', 'dash'],
    ['disabled', 'hover', 'active', 'focus'],
    ['font-color', 'background-color', 'border-color'],
  ],
  shape: [['', 'small', 'large'], ['round', 'circle', 'square'], ['border-radius']],
  extra_nearly_margin: [['nearly-margin']],
};

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
};

module.exports = {
  buttonRules,
  buttonTokenValue,
  buttonTokenDescription,
};
