// 此文件受脚本控制，修改后将自动同步 type.ts alert.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and alert.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const alertTokenDescription = { alert: '提示框', info: '提示色' };

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts alert.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 alertRules 强关联，非 alertRules 规则内的 token 需手动增加或删减。
 */
const alertTokenValue = {
  info: {
    background: { color: 'Brand-1' },
    border: { color: 'Brand-2' },
    font: { color: 'Brand-6' },
  },
  success: {
    background: { color: 'Success-1' },
    border: { color: 'Success-2' },
    font: { color: 'Success-6' },
  },
  warning: {
    background: { color: 'Warning-1' },
    border: { color: 'Warning-2' },
    font: { color: 'Warning-6' },
  },
  danger: {
    background: { color: 'Danger-1' },
    border: { color: 'Danger-2' },
    font: { color: 'Danger-6' },
  },
  font: { size: '14/regular', color: 'Neutral-text-5' },
  padding: { x: 'Padding-16', y: 'Padding-7' },
  border: { radius: 'Radius-4' },
  nearly: { margin: 'Margin-8' },
  title: { font: { size: '16/regular' } },
  close: { font: { color: 'Neutral-text-4' } },
};

const alertTokenExtraValue = {};

module.exports = {
  alertTokenValue,
  alertTokenExtraValue,
  alertTokenDescription,
};
