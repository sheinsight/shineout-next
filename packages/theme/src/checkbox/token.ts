// 此文件受脚本控制，修改后将自动同步 type.ts checkbox.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and checkbox.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const checkboxTokenDescription = {
  checkbox: '单选框',
  button: '按钮模式',
  outline: '线框模式',
  gap: '间距',
  Activedisabled: '选中禁用',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts checkbox.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 checkboxRules 强关联，非 checkboxRules 规则内的 token 需手动增加或删减。
 */
const checkboxTokenValue = {
  icon: {
    border: { color: 'Neutral-border-1', radius: 'Radius-2', width: 'Border-2' },
    background: { color: 'Neutral-fill-1' },
    color: 'transparent',
    disabled: {
      border: { color: 'Neutral-border-1' },
      background: { color: 'Neutral-fill-2' },
      color: 'transparent',
    },
    hover: {
      border: { color: 'Neutral-border-2' },
      background: { color: 'Neutral-fill-1' },
      color: 'transparent',
    },
    active: {
      border: { color: 'Brand-6' },
      background: { color: 'Brand-6' },
      color: 'Neutral-fill-1',
    },
    activedisabled: {
      border: { color: 'Brand-3' },
      background: { color: 'Brand-3' },
      color: 'Neutral-fill-1',
    },
    gap: 'Margin-8',
    circle: { fill: 'Neutral-fill-2' },
  },
  label: {
    font: { color: 'Neutral-text-5', size: '14/regular' },
    disabled: { font: { color: 'Neutral-text-2' } },
    gap: 'Margin-24',
  },
};

const checkboxTokenExtraValue = {};

module.exports = {
  checkboxTokenValue,
  checkboxTokenExtraValue,
  checkboxTokenDescription,
};
