// 此文件受脚本控制，修改后将自动同步 type.ts descriptions.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and descriptions.ts files.

/**
 * token 规则
 * 用于生成 token 的规则，修改保存后将自动更新 token。
 * 规则变量名称为 组件名称 + Rules。请勿修改变量命名，否则将导致 token 无法生成。
 */
const descriptionsRules = {
  size: [
    ['default', 'title', 'border', 'label', 'value'],
    ['font-size', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right'],
  ],
  color: [['label', 'value', 'title', 'extra', 'background', 'border'], ['color']],
  weight: [['title'], ['font-weight']],
  gap: [['title'], ['gap']],
  radius: [['border'], ['radius']],
  border: [['border-right', 'border-bottom'], ['size']],
  Inline: [['inline-border'], ['padding-x', 'padding-y']],
};

module.exports = {
  descriptionsRules,
};
