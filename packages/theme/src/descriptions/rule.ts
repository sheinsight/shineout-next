// 此文件受脚本控制，修改后将自动同步 type.ts descriptions.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and descriptions.ts files.

/**
 * token 规则
 * 用于生成 token 的规则，修改保存后将自动更新 token。
 * 规则变量名称为 组件名称 + Rules。请勿修改变量命名，否则将导致 token 无法生成。
 */
const descriptionsRules = {
  size: [
    ['default', 'small', 'large', 'title'],
    ['font-size', 'padding-x', 'padding-y'],
  ],
  color: [['label', 'value', 'title', 'extra'], ['font-color']],
  weight: [['title', 'label', 'value'], ['font-weight']],
  height: [['title'], ['line-height', 'height']],
};

module.exports = {
  descriptionsRules,
};
