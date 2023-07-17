// 此文件受脚本控制，修改后将自动同步 type.ts input.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and input.ts files.

/**
 * token 规则
 * 用于生成 token 的规则，修改保存后将自动更新 token。
 * 规则变量名称为 组件名称 + Rules。请勿修改变量命名，否则将导致 token 无法生成。
 */
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

module.exports = {
  inputRules,
};
