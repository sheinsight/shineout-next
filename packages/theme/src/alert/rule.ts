// 此文件受脚本控制，修改后将自动同步 type.ts alert.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and alert.ts files.

/**
 * token 规则
 * 用于生成 token 的规则，修改保存后将自动更新 token。
 * 规则变量名称为 组件名称 + Rules。请勿修改变量命名，否则将导致 token 无法生成。
 */
const alertRules = {
  color: [
    ['info', 'success', 'warning', 'danger'],
    ['background-color', 'border-color', 'font-color'],
  ],
  size: [['font-size', 'font-color', 'padding-x', 'padding-y', 'border-radius']],
  extra_margin: [['nearly'], ['margin']],
  extra_title: [['title'], ['font-size']],
  extra_close: [['close'], ['font-color']],
};

module.exports = {
  alertRules,
};
