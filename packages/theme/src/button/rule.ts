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

module.exports = {
  buttonRules,
};
