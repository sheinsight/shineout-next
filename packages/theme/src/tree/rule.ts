// 此文件受脚本控制，修改后将自动同步 type.ts tooltip.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and tooltip.ts files.

/**
 * token 规则
 * 用于生成 token 的规则，修改保存后将自动更新 token。
 * 规则变量名称为 组件名称 + Rules。请勿修改变量命名，否则将导致 token 无法生成。
 */
const treeRules = {
  size: [
    ['', 'small', 'large'],
    ['font-size', 'line-height'],
  ],
  font: [['font'], ['weight']],
  color: [['font-color']],
  line: [['line'], ['background-color']],
  layout: [['padding-x', 'padding-y']],
  item: [['item'], ['', 'hover', 'active', 'disabled'], ['background-color', 'font-color']],
  content: [['content'], ['', 'hover', 'active', 'disabled'], ['background-color', 'font-color', 'border-radius']],
  drag: [['drag'], ['border-color', 'background-color']],
  extra_icon_margin: [['nearly'], ['', 'small', 'large'], ['margin']],
  extra_content: [['content'], ['border-radius']],
};

module.exports = {
  treeRules,
};
