const dropdownTokenDescription = {
  dropdown: '下拉菜单',
  Outline: '线框模式下',
};

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

const dropdownTokenValue = {
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
  },
  Font: {
    Size: '14/regular',
  },
  Border: {
    Radius: 'Radius-4',
  },
  Padding: {
    X: 'Padding-8',
    Y: 'Padding-5',
  },

  Primary: {
    Disabled: {
      Background: {
        Color: 'Brand-3',
      },
      Border: {
        Color: 'Brand-3',
      },
      Font: {
        Color: 'Neutral-text-2',
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
      Color: 'Neutral-text-5',
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

  Outline: {
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
  },
};

module.exports = {
  dropdownRules,
  dropdownTokenValue,
  dropdownTokenDescription,
};
