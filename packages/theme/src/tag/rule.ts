const tagRules = {
  type: [
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
    ['', 'outline'],
    ['', 'disabled'],
    ['font-color', 'background-color', 'border-color'],
  ],
  size: [
    ['', 'small', 'large'],
    ['font-size', 'border-radius', 'padding-x', 'padding-y', 'height'],
  ],
};

module.exports = {
  tagRules,
};
