// 此文件受脚本控制，修改后将自动同步 type.ts collapse.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and collapse.ts files.

/**
 * token 规则
 * 用于生成 token 的规则，修改保存后将自动更新 token。
 * 规则变量名称为 组件名称 + Rules。请勿修改变量命名，否则将导致 token 无法生成。
 */
const collapseRules = {
  size: [
    ['wrapper', 'header', 'content'],
    [
      'border-size',
      'border-radius',
      'line-height',
      'gap',
      'padding-x',
      'padding-y',
      'font-size',
      'weight',
      'icon-width',
      'padding-left',
      'padding-right',
      'extra-gap',
    ],
  ],
  color: [
    ['wrapper', 'active', 'header', 'content', 'disabled'],
    ['border-color', 'color', 'background-color'],
  ],
};

module.exports = {
  collapseRules,
};
