// 此文件受脚本控制，修改后将自动同步 type.ts switch.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and switch.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const switchTokenDescription = {
  switch: '开关',
  fill: '填充色',
  shadow: '阴影',
  text: '文案',
  loading: '加载模式下的',
  checked: '打开状态下的',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts switch.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 switchRules 强关联，非 switchRules 规则内的 token 需手动增加或删减。
 */
const switchTokenValue = {};

const switchTokenExtraValue = {
  font: { size: 'Font-14', color: 'Neutral-text-4' },
  padding: { x: 'Spacing-2', y: 'Spacing-2' },
  circle: { size: 'Size-9', fill: 'Neutral-text-1', shadow: 'Shadow-3' },
  width: 'Size-21',
  text: {
    padding: { left: 'Spacing-8', right: 'Spacing-4' },
  },
  small: {
    font: { size: 'Font-12' },
    padding: { x: 'Spacing-2', y: 'Spacing-2' },
    circle: { size: 'Size-6' },
    width: 'Size-14',
    text: {
      padding: { left: 'Spacing-4', right: 'Spacing-2' },
    }
  },
  large: {
    font: { size: 'Font-16' },
    padding: { x: 'Spacing-2', y: 'Spacing-2' },
    circle: { size: 'Size-12' },
    width: 'Size-27',
  },
  background: { color: 'Neutral-fill-4' },
  disabled: {
    background: { color: 'Neutral-fill-3' },
    circle: { checked: {fill: 'Brand-1', shadow: ''}, unchecked: {fill: 'Neutral-fill-2', shadow: ''} },
    font: { color: 'Neutral-text-2' },
  },
  loading: {
    background: { color: 'Neutral-fill-2' },
    circle: { fill: 'Neutral-fill-3', shadow: '' },
    font: { color: 'Neutral-text-2' },
  },
  checked: {
    background: { color: 'Brand-6' },
    circle: { fill: 'Neutral-fill-1', shadow: '' },
    font: { color: 'Neutral-text-1' },
    disabled: {
      background: { color: 'Brand-3' },
      circle: { fill: 'Neutral-fill-1', shadow: '' },
      font: { color: 'Neutral-text-1' },
    },
    loading: {
      background: { color: 'Brand-3' },
      circle: { fill: 'Brand-3', shadow: '' },
      font: { color: 'Neutral-text-1' },
    },
  },
};

module.exports = {
  switchTokenValue,
  switchTokenExtraValue,
  switchTokenDescription,
};
