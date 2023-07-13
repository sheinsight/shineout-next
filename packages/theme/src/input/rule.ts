const inputTokenDescription = {
  input: '输入框',
  Inner: '内嵌',
  Title: '标题模式',
};

const inputRules = {
  color: [
    ['', 'disabled', 'focus', 'hover', 'error'],
    ['font-color', 'background-color', 'border-color', 'clear-icon-color'],
  ],
  size: [
    ['', 'small', 'large'],
    [
      'height',
      'font-size',
      'border-radius',
      'border-width',
      'line-height',
      'inner-title-height',
      'inner-title-border-radius',
      'inner-title-line-height',
      'clear-icon-font-size',
      'padding-x',
      'padding-y',
    ],
  ],
  extra_prefix_suffix_color: [
    ['prefix', 'suffix'],
    ['font-color', 'background-color'],
  ],
  extra_prefix_suffix_layout: [
    ['', 'small', 'large'],
    ['prefix', 'suffix'],
    ['padding-x', 'padding-y'],
  ],
  extra_icon_color: [['icon'], ['font-color', 'background-color']],
};

const inputTokenValue = {
  Prefix: {
    Padding: {},
  },
  Suffix: {
    Padding: {},
  },
  Background: {
    Color: 'Neutral-Fill-1',
  },
};

module.exports = {
  inputRules,
  inputTokenValue,
  inputTokenDescription,
};
