const buttonRules = {
  color: [
    ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'link'],
    ['', 'outline', 'text', 'dashed'],
    ['', 'disabled', 'hover', 'active', 'focus'],
    ['font-color', 'background-color', 'border-color'],
  ],
  size: [
    ['', 'small', 'large'],
    ['font-size', 'border-radius', 'padding-x', 'padding-y', 'height', 'font-weight'],
  ],
  group: [
    ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
    ['', 'outline', 'text', 'dashed'],
    ['split'],
    ['', 'disabled', 'hover', 'active', 'focus'],
    ['background-color'],
  ],
  shape: [
    ['', 'small', 'large'],
    ['round', 'circle', 'square'],
    ['border-radius', 'size'],
  ],
  extra_nearly_margin: [['nearly-margin']],
  extra_nearly_spin_margin: [['spin-margin']],
};

module.exports = {
  buttonRules,
};
