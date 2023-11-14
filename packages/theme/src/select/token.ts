// 此文件受脚本控制，修改后将自动同步 type.ts select.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and select.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const selectTokenDescription = {
  select: '选择器',
  placeholder: '占位符',
  result: '结果',
  text: '文本',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts select.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 selectRules 强关联，非 selectRules 规则内的 token 需手动增加或删减。
 */
const selectTokenValue = { font: { size: '14/regular' } };

const selectTokenExtraValue = {
  font: { size: '14/regular', color: 'Neutral-text-5' },
  border: { radius: 'Radius-4', color: 'Neutral-border-2' },
  padding: { x: 'Padding-8', y: 'Padding-4' },
  icon: { size: 'Size-7', color: 'Neutral-text-4' },
  small: {
    font: { size: '12/regular' },
    border: { radius: '' },
    padding: { x: 'Padding-8', y: 'Padding-1' },
  },
  large: { font: { size: '16/regular' }, padding: { x: 'Padding-12', y: 'Padding-7' } },
  placeholder: { color: 'Neutral-text-2' },
  background: { color: 'Neutral-fill-1' },
  clear: { color: 'Neutral-text-3' },
  hover: { border: { color: 'Brand-6' }, clear: { color: 'Neutral-text-4' } },
  focus: { border: { color: 'Brand-7' }, shadow: 'Brand-2' },
  disabled: {
    font: { color: 'Neutral-text-2' },
    placeholder: { color: 'Neutral-text-2' },
    border: { color: 'Neutral-border-2' },
    background: { color: 'Neutral-fill-2' },
  },
  result: {
    text: {
      border: { radius: 'Radius-4' },
      padding: { x: 'Padding-4' },
      small: { padding: { x: 'Padding-4' } },
      large: { padding: { x: 'Padding-10' } },
      active: { background: { color: 'Brand-1' } },
    },
  },
  error: { border: { color: 'Danger-6' }, focus: { shadow: 'Danger-1' } },
  panel: {
    color: 'Neutral-text-5',
    background: { color: 'Neutral-fill-1' },
    shadow: 'Shadow-2',
    radius: 'Radius-4',
  },
};

module.exports = {
  selectTokenValue,
  selectTokenExtraValue,
  selectTokenDescription,
};
