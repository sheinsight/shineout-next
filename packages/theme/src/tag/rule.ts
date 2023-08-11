const tagRules = {
  color: [
    [
      'info',
      'default',
      'success',
      'warning',
      'danger',
      'magenta',
      'orange',
      'purple',
      'indigo',
      'cyan',
      'neon',
      'lemon',
      'tangerine',
    ],
    ['', 'outline', 'fill'],
    ['', 'disabled'],
    ['font-color', 'background-color', 'border-color'],
  ],
  size: [
    ['', 'small', 'large'],
    ['font-size', 'border-radius', 'padding-x', 'padding-y', 'height'],
  ],
  input: [['', 'small', 'large'], ['input'], ['padding-x', 'padding-y', 'font-size']],
  icon: [
    [
      'info',
      'default',
      'success',
      'warning',
      'danger',
      'magenta',
      'orange',
      'purple',
      'indigo',
      'cyan',
      'neon',
      'lemon',
      'tangerine',
    ],
    ['', 'outline', 'fill'],
    ['', 'disabled'],
    ['icon'],
    ['background-color'],
  ],
};

module.exports = {
  tagRules,
};
