const radioTokenDescription = { radio: '单选框', Button: '按钮模式', Outline: '线框模式' };

const radioRules = {
  color: [
    ['', 'button'],
    ['', 'outline', 'disabled', 'focus', 'hover'],
    ['font-color', 'background-color', 'border-color'],
  ],
  size: [
    ['', 'small', 'large'],
    ['font-size', 'border-radius', 'line-height', 'padding-x', 'padding-y'],
  ],
};

const radioTokenValue = {
  font: { color: '', size: '' },
  background: { color: '' },
  border: { color: '', radius: '' },
  outline: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
  disabled: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
  focus: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
  hover: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
  button: {
    font: { color: '' },
    background: { color: '' },
    border: { color: '' },
    outline: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    disabled: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    focus: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
    hover: { font: { color: '' }, background: { color: '' }, border: { color: '' } },
  },
  line: { height: '' },
  padding: { x: '', y: '' },
  small: {
    font: { size: '' },
    border: { radius: '' },
    line: { height: '' },
    padding: { x: '', y: '' },
  },
  large: {
    font: { size: '' },
    border: { radius: '' },
    line: { height: '' },
    padding: { x: '', y: '' },
  },
};

module.exports = {
  radioRules,
  radioTokenValue,
  radioTokenDescription,
};
