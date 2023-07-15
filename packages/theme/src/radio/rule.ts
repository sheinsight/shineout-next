// 此文件受脚本控制，修改后将自动同步 type.ts radio.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and radio.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const radioTokenDescription = { radio: '单选框', button: '按钮模式', outline: '线框模式' };

/**
 * token 规则
 * 用于生成 token 的规则，修改保存后将自动更新 token。
 * 规则变量名称为 组件名称 + Rules。请勿修改变量命名，否则将导致 token 无法生成。
 */
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

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts radio.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 radioRules 强关联，非 radioRules 规则内的 token 需手动增加或删减。
 */
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
  padding: { y: '', x: '' },
  small: {
    font: { size: '' },
    border: { radius: '' },
    line: { height: '' },
    padding: { y: '', x: '' },
  },
  large: {
    font: { size: '' },
    border: { radius: '' },
    line: { height: '' },
    padding: { y: '', x: '' },
  },
};

module.exports = {
  radioRules,
  radioTokenValue,
  radioTokenDescription,
};
