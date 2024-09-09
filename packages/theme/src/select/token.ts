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
  option: '选项',
  right: '(右侧)',
  inner: '内部容器的',
  clear: '清除按钮的',
  more: '折叠内容的',
  header: '列表头部的',
  group: '分组',
  title: '标题的',
  column: '多列模式下',
  shadow: '阴影',
  panel: '下拉面板的',
  top: '（顶部）',
  tag: '标签的',
  bottom: '（底部）',
  loading: '加载状态下的',
  spin: '加载组件',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts select.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 selectRules 强关联，非 selectRules 规则内的 token 需手动增加或删减。
 */
const selectTokenValue = { font: { size: 'Font-14' } };

const selectTokenExtraValue = {
  font: { size: 'Font-14', color: 'Neutral-text-5', weight: 'Weight-regular' },
  border: { radius: 'Radius-default', color: 'Neutral-border-2', width: 'Border-1' },
  padding: { x: 'Spacing-8', y: 'Spacing-2' },
  icon: { size: 'Size-7', color: 'Neutral-text-4' },
  tag: {
    margin: {
      y: 'Spacing-2',
      right: 'Spacing-4',
    },
  },
  small: {
    font: { size: 'Font-12' },
    border: { radius: '' },
    padding: { x: 'Spacing-8', y: 'Spacing-1' },
    option: {
      inner: {
        padding: { x: 'Spacing-8', y: 'Spacing-2' },
      },
    },
  },
  large: {
    font: { size: 'Font-16' },
    padding: { x: 'Spacing-12', y: 'Spacing-3' },
    option: {
      inner: {
        padding: { x: 'Spacing-12', y: 'Spacing-8' },
      },
    },
    placeholder: {
      margin: { y: 'Spacing-4' },
    },
  },
  inner: {
    padding: { x: 'Spacing-8', y: 'Spacing-5' },
  },
  placeholder: { color: 'Neutral-text-2', margin: { y: 'Spacing-2' } },
  background: { color: 'Neutral-fill-1' },
  clear: { color: 'Neutral-text-3', padding: 'Spacing-8' },
  hover: {
    border: { color: 'Brand-6' },
    clear: { color: 'Neutral-text-4' },
    background: { color: 'Neutral-fill-1' },
  },
  focus: {
    border: { color: 'Brand-7' },
    shadow: 'Brand-2',
    background: { color: 'Neutral-fill-1' },
  },
  disabled: {
    icon: { color: 'Neutral-text-2' },
    font: { color: 'Neutral-text-2' },
    placeholder: { color: 'Neutral-text-2' },
    border: { color: 'Neutral-border-1' },
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
  error: {
    border: { color: 'Danger-6' },
    background: { color: 'Neutral-fill-1' },
    focus: {
      shadow: 'Danger-1',
      background: { color: 'Neutral-fill-1' },
      border: { color: 'Danger-6' },
    },
    hover: { background: { color: 'Neutral-fill-1' }, border: { color: 'Danger-6' } },
  },
  panel: {
    color: 'Neutral-text-5',
    background: { color: 'Neutral-fill-1' },
    shadow: 'Shadow-2',
    radius: 'Radius-default',
    border: 'Neutral-border-1',
  },
  option: {
    height: 'Size-16',
    background: { color: 'Neutral-fill-1' },
    font: {
      color: 'Neutral-text-5',
    },
    padding: { x: 'Spacing-4', y: 'Spacing-1' },
    active: {
      color: 'Brand-6',
      background: { color: 'Brand-1' },
    },
    inner: {
      padding: { x: 'Spacing-8', y: 'Spacing-5', right: 'Size-15' },
      border: { radius: 'Radius-lesser' },
    },
    hover: {
      background: { color: 'Neutral-fill-2' },
      font: {
        color: 'Neutral-text-5',
      },
    },
    disabled: { color: 'Neutral-text-2', background: { color: 'Neutral-fill-1' } },
  },
  more: {
    padding: 'Spacing-8',
  },
  header: {
    padding: { x: 'Spacing-8', y: 'Spacing-8' },
    border: {
      color: 'Neutral-border-1',
    },
  },
  group: {
    title: {
      font: { color: 'Neutral-text-3', size: 'Font-12', weight: 'Weight-regular' },
      padding: { x: 'Spacing-12', top: 'Spacing-10', bottom: 'Spacing-2' },
      small: { x: 'Spacing-8', top: 'Spacing-4' },
      large: { x: 'Spacing-12', top: 'Spacing-14', bottom: 'Spacing-4' },
    },
  },
  column: {
    padding: 'Spacing-8',
    option: {
      margin: 'Spacing-8',
    },
    border: {
      radius: 'Radius-default',
    },
    background: { color: 'Neutral-fill-2' },
  },
  loading: {
    spin: {
      color: 'Brand-6',
    },
  },
  empty: {
    font: {
      color: 'Neutral-text-2',
    },
  },
};

module.exports = {
  selectTokenValue,
  selectTokenExtraValue,
  selectTokenDescription,
};
