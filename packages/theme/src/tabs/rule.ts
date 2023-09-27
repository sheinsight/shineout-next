// 此文件受脚本控制，修改后将自动同步 type.ts tabs.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and tabs.ts files.

/**
 * token 规则
 * 用于生成 token 的规则，修改保存后将自动更新 token。
 * 规则变量名称为 组件名称 + Rules。请勿修改变量命名，否则将导致 token 无法生成。
 */
const tabsRules = {
  status: [
    ['', 'active', 'hover', 'disabled', 'click'],
    ['font-color', 'background-color', 'border-color'],
  ],
  size: [['tab'], ['padding-x', 'padding-y', 'font-size', 'border-radius']],
  extra_nearly: [['nearly'], ['margin']],
  extra_line: [
    ['line', 'line-inner', 'fill', 'fill-inner'],
    ['padding-x', 'padding-y'],
  ],
  extra_split: [['split'], ['border-color']],
  extra_prev_next: [['action'], ['vertical', 'horizontal'], ['padding-x', 'padding-y']],
};

module.exports = {
  tabsRules,
};
