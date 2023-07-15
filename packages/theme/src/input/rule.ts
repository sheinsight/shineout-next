const inputTokenDescription = { input: '输入框', inner: '内嵌', title: '标题模式' };

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
  font: { color: '', size: '' },
  background: { color: 'Neutral-Fill-1' },
  clear: { icon: '' },
  focus: {
    font: { color: '' },
    background: { color: '' },
    border: { color: '' },
    clear: { icon: '' },
  },
  hover: {
    font: { color: '' },
    background: { color: '' },
    border: { color: '' },
    clear: { icon: '' },
  },
  error: {
    font: { color: '' },
    background: { color: '' },
    border: { color: '' },
    clear: { icon: '' },
  },
  height: {},
  line: { height: '' },
  inner: { title: '' },
  padding: { y: '' },
  large: {
    height: {},
    font: { size: '' },
    border: { width: '' },
    line: { height: '' },
    inner: { title: '' },
    clear: { icon: '' },
    padding: { y: '' },
    prefix: { padding: { y: '' } },
    suffix: { padding: { y: '' } },
  },
  prefix: { font: { color: '' }, background: { color: '' }, padding: { y: '' } },
  suffix: { font: { color: '' }, background: { color: '' }, padding: { y: '' } },
  icon: { font: { color: '' }, background: { color: '' } },
};

module.exports = {
  inputRules,
  inputTokenValue,
  inputTokenDescription,
};
