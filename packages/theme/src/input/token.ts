// 此文件受脚本控制，修改后将自动同步 type.ts input.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and input.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const inputTokenDescription = { input: '输入框', inner: '内嵌', title: '标题模式' };

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts input.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 inputRules 强关联，非 inputRules 规则内的 token 需手动增加或删减。
 */
const inputTokenValue = {
  font: { color: '', size: '' },
  background: { color: 'Neutral-Fill-1' },
  border: { color: '', radius: '', width: '' },
  clear: { icon: '' },
  disabled: {
    font: { color: '' },
    background: { color: '' },
    border: { color: '' },
    clear: { icon: '' },
  },
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
  height: '',
  line: { height: '' },
  inner: { title: '' },
  padding: { x: '', y: '' },
  small: {
    height: { undefined: '' },
    font: { size: '' },
    border: { radius: '', width: '' },
    line: { height: '' },
    inner: { title: '' },
    clear: { icon: '' },
    padding: { x: '', y: '' },
    prefix: { padding: { x: '', y: '' } },
    suffix: { padding: { x: '', y: '' } },
  },
  large: {
    height: '',
    font: { size: '' },
    border: { radius: '', width: '' },
    line: { height: '' },
    inner: { title: '' },
    clear: { icon: '' },
    padding: { x: '', y: '' },
    prefix: { padding: { x: '', y: '' } },
    suffix: { padding: { x: '', y: '' } },
  },
  prefix: { font: { color: '' }, background: { color: '' }, padding: { x: '', y: '' } },
  suffix: { font: { color: '' }, background: { color: '' }, padding: { x: '', y: '' } },
  icon: { font: { color: '' }, background: { color: '' } },
};

const inputTokenExtraValue = {};

module.exports = {
  inputTokenValue,
  inputTokenExtraValue,
  inputTokenDescription,
};
