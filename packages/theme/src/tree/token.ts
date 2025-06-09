// 此文件受脚本控制，修改后将自动同步 type.ts tree.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and tree.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const treeTokenDescription = {
  tree: '树组件',
  nearly: '相邻的',
  drag: '拖拽时的',
  text: '文字',
  checkbox: '复选框',
  item: '节点',
  content: '节点容器',
  line: '连接线',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts tree.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 treeRules 强关联，非 treeRules 规则内的 token 需手动增加或删减。
 */
const treeTokenValue = {
  font: { size: 'Font-14', weight: 'Weight-regular', color: 'Neutral-text-5' },
  line: { height: 'Size-18', background: { color: 'Neutral-fill-3' } },
  small: { font: { size: 'Font-12' }, line: { height: 'Size-14' } },
  large: { font: { size: 'Font-16' }, line: { height: 'Size-22' } },
  padding: { x: 'Spacing-8', y: 'Spacing-1' },
  item: {
    background: { color: '' },
    font: { color: 'Neutral-text-4' },
    hover: { background: { color: 'Neutral-fill-2' }, font: { color: 'Neutral-text-4' } },
    active: { background: { color: 'Neutral-fill-4' }, font: { color: 'Neutral-text-4' } },
    disabled: { background: { color: '' }, font: { color: 'Neutral-text-2' } },
  },
  content: {
    background: { color: '' },
    font: { color: '' },
    hover: { background: { color: 'Neutral-fill-2' }, font: { color: 'Neutral-text-5' } },
    active: {
      background: { color: 'Brand-1' },
      font: { color: 'Brand-6' },
      border: { radius: 'Radius-2' },
    },
    disabled: { background: { color: 'Transprent' }, font: { color: 'Neutral-text-5' } },
    border: { radius: 'Radius-lesser' },
  },
  drag: { border: { color: 'Brand-6' }, background: { color: 'Brand-1' } },
  nearly: { margin: '', small: { margin: '' }, large: { margin: '' } },
};

const treeTokenExtraValue = {
  text: { padding: { y: 'Spacing-2', x: 'Spacing-4' } },
  checkbox: { margin: { x: 'Spacing-8' } },
};

module.exports = {
  treeTokenValue,
  treeTokenExtraValue,
  treeTokenDescription,
};
