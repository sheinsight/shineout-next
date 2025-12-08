// 此文件受脚本控制，修改后将自动同步 type.ts tabs.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and tabs.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const tabsTokenDescription = {
  tabs: '标签页',
  tab: '页签',
  nearly: '相邻之间的',
  click: '鼠标按下时的',
  inner: '内部容器的',
  line: '长线条模式',
  fill: '填充模式',
  split: '分割线',
  action: '操作按钮',
  extra: '附加内容',
  card: '卡片模式',
  arrow: '箭头icon',
  vertical: '垂直模式',
  horizontal: '水平模式',
  checked: '选中状态',
  top: '上',
  bottom: '下',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts tabs.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 tabsRules 强关联，非 tabsRules 规则内的 token 需手动增加或删减。
 */
const tabsTokenValue = {};

const tabsTokenExtraValue = {
  font: { color: 'Neutral-text-5' },
  background: { color: 'Neutral-fill-2' },
  border: { color: 'Neutral-border-1' },
  active: {
    font: { color: 'Brand-6' },
    background: { color: 'Neutral-fill-1' },
    border: { color: '' },
  },
  hover: { font: { color: '' }, background: { color: 'Neutral-fill-2' }, border: { color: '' } },
  disabled: {
    font: { color: 'Neutral-text-2' },
    background: { color: 'Neutral-fill-1' },
    border: { color: '' },
  },
  click: { font: { color: '' }, background: { color: 'Neutral-fill-4' }, border: { color: '' } },
  tab: {
    padding: { x: 'Spacing-15', y: 'Spacing-9' },
    font: { size: 'Font-14' },
    border: { radius: 'Radius-default' },
  },
  nearly: { margin: 'Spacing-4' },
  line: {
    padding: { x: 'Spacing-8', top: 'Spacing-6', bottom: 'Spacing-6' },
    hr: { background: { color: 'Neutral-border-1' } },
    after: { background: { color: 'Brand-6' } },
    inner: { padding: { x: 'Spacing-8', y: 'Spacing-4' } },
    font: { color: 'Neutral-text-5', weight: 'Weight-regular', size: 'Font-14' },
    background: { color: 'transparent' },
    active: { font: { color: '', weight: '' }, background: { color: 'Neutral-fill-3' } },
    checked: {
      font: { color: 'Brand-6', size: 'Font-14', weight: 'Weight-medium' },
      background: { color: 'transparent' },
    },
    hover: {
      font: { color: '', weight: '', size: 'Font-14' },
      background: { color: 'Neutral-fill-2' },
    },
    disabled: { font: { color: 'Neutral-text-2', weight: '' }, background: { color: '' } },
  },
  fill: {
    padding: { x: 'Spacing-4', y: 'Spacing-4' },
    inner: { padding: { x: 'Spacing-16', y: 'Spacing-5' } },
    font: { color: 'Neutral-text-5', weight: 'Weight-regular', size: 'Font-14' },
    background: { color: 'Neutral-fill-2' },
    active: {
      font: { color: '', weight: 'Weight-medium', size: 'Font-14' },
      background: { color: 'Neutral-fill-4' },
    },
    checked: {
      font: { color: 'Brand-6', size: 'Font-14', weight: 'Weight-medium' },
      background: { color: 'Neutral-fill-1' },
    },
    hover: { font: { color: '', weight: '' }, background: { color: 'Neutral-fill-3' } },
    disabled: { font: { color: 'Neutral-text-2', weight: '' }, background: { color: '' } },
  },
  dash: {
    font: { color: '', weight: 'Weight-regular', size: 'Font-14' },
    background: { color: '' },
    active: {
      font: { color: '', weight: 'Weight-medium', size: 'Font-14' },
      background: { color: '' },
    },
    hover: { font: { color: '', weight: '' }, background: { color: '' } },
    disabled: { font: { color: '', weight: '' }, background: { color: '' } },
  },
  card: {
    padding: { x: 'Spacing-15', y: 'Spacing-9' },
    font: { color: 'Neutral-text-5', weight: 'Weight-regular', size: 'Font-14' },
    background: { color: 'Neutral-fill-2' },
    active: {
      font: { color: '', weight: 'Weight-medium', size: 'Font-14' },
      background: { color: 'Neutral-fill-4' },
    },
    border: { color: 'Neutral-border-1' },
    checked: {
      font: { color: 'Brand-6', size: 'Font-14', weight: 'Weight-medium' },
      background: { color: 'Neutral-fill-1' },
    },
    hover: { font: { color: '', weight: '' }, background: { color: 'Neutral-fill-3' } },
    disabled: {
      font: { color: 'Neutral-text-2', weight: '' },
      background: { color: 'Neutral-fill-2' },
    },
  },
  split: { border: { color: 'Neutral-border-2' } },
  action: {
    vertical: { padding: { x: 'Spacing-7', y: 'Spacing-4' } },
    horizontal: { padding: { x: 'Spacing-7', y: 'Spacing-8' } },
  },
  extra: { fill: { hover: { background: { color: 'Neutral-fill-3' } } } },
  arrow: { font: { color: 'Neutral-text-4', size: 'Font-14' } },
  badge: { margin: 'Spacing-0' },
};

module.exports = {
  tabsTokenValue,
  tabsTokenExtraValue,
  tabsTokenDescription,
};
