// 此文件受脚本控制，修改后将自动同步 type.ts form.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and form.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const formTokenDescription = {
  form: '表单',
  horizontal: '水平模式',
  vertical: '垂直模式',
  text: '带文字',
  item: '项',
  end: '（后部）',
  start: '（前部）',
  label: '标签',
  tip: '提示信息',
  min: '最小',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts form.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 formRules 强关联，非 formRules 规则内的 token 需手动增加或删减。
 */
const formTokenValue = {};

const formTokenExtraValue = {
  item: {
    font: { size: 'Font-14', color: 'Neutral-text-5' },
    margin: { y: { end: 'Spacing-12' }, x: { end: 'Spacing-16' } },
    label: {
      width: '140px',
      padding: { y: 'Spacing-5' },
      margin: { x: { end: 'Spacing-8' } },
      top: { padding: { y: 'Spacing-4' } },
      font: { weight: 'Weight-regular', color: 'Neutral-text-5' },
    },
    danger: { font: { size: 'Font-12', color: 'Danger-6', weight: 'Weight-regular' } },
    tip: {
      min: { height: 'Size-10' },
      font: { size: 'Font-12', color: 'Neutral-text-3', weight: 'Weight-regular' },
      margin: { top: 'Spacing-0' },
    },
  },
};

module.exports = {
  formTokenValue,
  formTokenExtraValue,
  formTokenDescription,
};
