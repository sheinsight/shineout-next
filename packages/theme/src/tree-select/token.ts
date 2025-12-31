// 此文件受脚本控制，修改后将自动同步 type.ts treeSelect.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and treeSelect.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const treeSelectTokenDescription = {
  tree: '树',
  select: '选择器',
  option: '选项',
  inner: '容器的',
  placeholder: '占位符的',
  shadow: '阴影',
  result: '选中结果框',
  text: '文本区域的',
  panel: '下拉面板的',
  column: '多列模式下的',
  title: '标题',
  group: '分组模式下的',
  more: '合并弹层的',
  right: '（右侧）',
  header: '下拉列表的头部区域',
  content: '选项容器',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts treeSelect.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 treeSelectRules 强关联，非 treeSelectRules 规则内的 token 需手动增加或删减。
 */
const treeSelectTokenValue = { font: { size: 'Font-14' } };

const treeSelectTokenExtraValue = {
  font: { size: 'Font-14', color: 'Neutral-text-5' },
  border: { radius: 'Radius-default', color: 'Neutral-border-2' },
  padding: { x: 'Spacing-8', y: 'Spacing-2' },
  icon: { size: 'Size-7', color: 'Neutral-text-4', disabled: { color: 'Neutral-text-2' } },
  tag: { margin: { y: 'Spacing-2', right: 'Spacing-4' } },
  small: {
    font: { size: 'Font-12' },
    border: { radius: '' },
    padding: { x: 'Spacing-8', y: 'Spacing-1' },
    option: { inner: { padding: { x: 'Spacing-8', y: 'Spacing-2' } } },
    clear: { icon: { size: 'Font-12' } },
  },
  large: {
    font: { size: 'Font-16' },
    padding: { x: 'Spacing-12', y: 'Spacing-3' },
    option: { inner: { padding: { x: 'Spacing-12', y: 'Spacing-8' } } },
    clear: { icon: { size: 'Font-16' } },
    placeholder: { margin: { y: 'Spacing-4' } },
  },
  inner: { padding: { x: 'Spacing-8', y: 'Spacing-5' } },
  placeholder: { color: 'Neutral-text-2', margin: { y: 'Spacing-2' } },
  background: { color: 'Neutral-fill-1' },
  clear: {
    color: 'Neutral-text-3',
    padding: 'Spacing-8',
    hover: { color: 'Neutral-text-4' },
    icon: { size: 'Font-14' },
  },
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
      border: { radius: 'Radius-default' },
      padding: { x: 'Spacing-4' },
      small: { padding: { x: 'Spacing-4' } },
      large: { padding: { x: 'Spacing-10' } },
      active: { background: { color: 'Brand-1' } },
    },
  },
  error: { border: { color: 'Danger-6' }, focus: { shadow: 'Danger-1' } },
  panel: {
    color: 'Neutral-text-5',
    background: { color: 'Neutral-fill-1' },
    shadow: 'Shadow-2',
    radius: 'Radius-default',
    border: 'Neutral-border-1',
  },
  content: {
    hover: { font: { color: 'Neutral-text-5' }, background: { color: 'Neutral-fill-2' } },
    active: { font: { color: 'Brand-6' }, background: { color: 'Brand-1' } },
    disabled: {
      font: { color: 'Neutral-text-2' },
      background: { color: 'Transprent' },
      hover: { background: { color: 'Neutral-fill-2' } },
    },
  },
  option: {
    height: 'Size-16',
    padding: { x: 'Spacing-4', y: 'Spacing-1' },
    active: { color: 'Brand-6', background: { color: 'Brand-1' } },
    font: { color: 'Neutral-text-5' },
    inner: {
      padding: { x: 'Spacing-8', y: 'Spacing-5', right: 'Size-15' },
      border: { radius: 'Radius-lesser' },
    },
    hover: { background: { color: 'Neutral-fill-2' } },
    disabled: { color: 'Neutral-text-2', background: { color: 'Neutral-fill-1' } },
  },
  more: { padding: { x: 'Spacing-8', y: 'Spacing-6' } },
  header: { padding: 'Spacing-8', border: { color: 'Neutral-border-1' } },
  group: {
    title: {
      font: { color: 'Neutral-text-3', size: 'Font-12' },
      padding: { x: 'Spacing-12', y: 'Spacing-6' },
    },
  },
  column: { padding: 'Spacing-8', option: { margin: 'Spacing-8' } },
};

module.exports = {
  treeSelectTokenValue,
  treeSelectTokenExtraValue,
  treeSelectTokenDescription,
};
