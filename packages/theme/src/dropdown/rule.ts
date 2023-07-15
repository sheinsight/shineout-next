const dropdownTokenDescription = { dropdown: '下拉菜单', outline: '线框模式下' };

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
