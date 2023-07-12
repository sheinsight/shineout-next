const radioTokenDescription = {
  radio: '单选框',
  Button: '按钮模式',
  Outline: '线框模式',
};

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

const radioTokenValue = {};

module.exports = {
  radioRules,
  radioTokenValue,
  radioTokenDescription,
};
