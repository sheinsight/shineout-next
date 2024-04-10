const tagRules = {
  color: [
    [
      'info',
      'default',
      'success',
      'warning',
      'danger',
      'magenta',
      'brown',
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
      'brown',
      'purple',
      'indigo',
      'cyan',
      'neon',
      'lemon',
      'tangerine',
    ],
    ['', 'outline', 'fill'],
    ['icon'],
    ['', 'disabled', 'hover'],
    ['background-color', 'font-color'],
  ],
};

module.exports = {
  tagRules,
};
