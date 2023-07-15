const buttonTokenDescription = { button: '按钮' };

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
  font: { size: '14/regular' },
  border: { radius: 'Radius-4' },
  padding: { y: 'Padding-5', x: 'Padding-8' },
  small: {
    font: { size: '12/regular' },
    border: { radius: 'Radius-4' },
    padding: { y: 'Padding-2', x: 'Padding-8' },
    round: { border: { radius: 'Radius-1000' } },
    circle: { border: { radius: 'Radius-50%' } },
    square: { border: { radius: 'Radius-4' } },
  },
  large: {
    font: { size: '16/regular' },
    border: { radius: 'Radius-4' },
    padding: { y: 'Padding-8', x: 'Padding-12' },
    round: { border: { radius: 'Radius-1000' } },
    circle: { border: { radius: 'Radius-50%' } },
    square: { border: { radius: 'Radius-4' } },
  },
  round: { border: { radius: 'Radius-1000' } },
  circle: { border: { radius: 'Radius-50%' } },
  square: { border: { radius: 'Radius-2' } },
};

module.exports = {
  buttonRules,
  buttonTokenValue,
  buttonTokenDescription,
};
