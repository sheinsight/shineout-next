// 此文件受脚本控制，修改后将自动同步 type.ts button.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and button.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const buttonTokenDescription = { button: '按钮' };

/**
 * token 规则
 * 用于生成 token 的规则，修改保存后将自动更新 token。
 * 规则变量名称为 组件名称 + Rules。请勿修改变量命名，否则将导致 token 无法生成。
 */
const buttonRules = {
  color: [
    ['primary', 'secondary', 'success', 'warning', 'danger'],
    ['', 'disabled', 'hover', 'active', 'focus'],
    ['font-color', 'background-color', 'border-color'],
  ],
  size: [
    ['', 'small', 'large'],
    ['font-size', 'border-radius', 'padding-x', 'padding-y'],
  ],
  shape: [['', 'small', 'large'], ['round', 'circle', 'square'], ['border-radius']],
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts button.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 buttonRules 强关联，非 buttonRules 规则内的 token 需手动增加或删减。
 */
const buttonTokenValue = {
  font: { size: '14/regular' },
  border: { radius: 'Radius-4' },
  padding: { y: 'Padding-5', x: 'Padding-8' },
  small: {
    font: { size: '12/regular' },
    border: { radius: 'Radius-4' },
    padding: { y: 'Padding-2', x: 'Padding-8' },
    round: { border: { radius: 'Radius-1000' } },
    circle: { border: { radius: 'Radius-50%' } },
    square: { border: { radius: 'Radius-4' } },
  },
  large: {
    font: { size: '16/regular' },
    border: { radius: 'Radius-4' },
    padding: { y: 'Padding-8', x: 'Padding-12' },
    round: { border: { radius: 'Radius-1000' } },
    circle: { border: { radius: 'Radius-50%' } },
    square: { border: { radius: 'Radius-4' } },
  },
  round: { border: { radius: 'Radius-1000' } },
  circle: { border: { radius: 'Radius-50%' } },
  square: { border: { radius: 'Radius-2' } },
};

module.exports = {
  buttonRules,
  buttonTokenValue,
  buttonTokenDescription,
};
