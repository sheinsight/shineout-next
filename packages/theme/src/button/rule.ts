const buttonTokenDescription = {
  button: '按钮',
};

const buttonRules = {
  color: [
    ['primary', 'secondary', 'success', 'warning', 'danger'],
    ['', 'disabled', 'hover', 'active', 'focus'],
    ['font-color', 'background-color', 'border-color'],
  ],
  size: [
    ['', 'small', 'large'],
    ['font-size', 'border-radius', 'padding-x', 'padding-y'],
  ],
  shape: [['', 'small', 'large'], ['round', 'circle', 'square'], ['border-radius']],
};

const buttonTokenValue = {
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
};

module.exports = {
  buttonRules,
  buttonTokenValue,
  buttonTokenDescription,
};
