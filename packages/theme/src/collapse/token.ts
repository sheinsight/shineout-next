// 此文件受脚本控制，修改后将自动同步 type.ts collapse.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and collapse.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const collapseTokenDescription = {
  collapse: '折叠面板',
  extra: '右侧附加内容',
  wrapper: '整体容器（包含头部内容）',
  gap: '间距',
  header: '头部区域',
  weight: '字重',
  content: '内部容器',
  left: '（左侧）',
  right: '（右侧）',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts collapse.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 collapseRules 强关联，非 collapseRules 规则内的 token 需手动增加或删减。
 */
const collapseTokenValue = {};

const collapseTokenExtraValue = {
  icon: {
    color: 'Neutral-text-4',
    hover: { background: { color: 'Neutral-fill-2' } },
    active: { background: { color: 'Neutral-fill-3' } },
  },
  extra: { margin: 'Spacing-24' },
  wrapper: {
    border: { size: 'Border-1', radius: 'Radius-default', color: 'Neutral-border-1' },
    line: { height: '' },
    gap: 'Size-12',
    padding: { x: 'Spacing-16', y: 'Spacing-12', left: '', right: '' },
    font: { size: '' },
    weight: '',
    icon: { width: '' },
    extra: { gap: '' },
    color: 'Neutral-border-1',
    background: { color: 'Neutral-fill-1' },
  },
  header: {
    border: { size: '', radius: '', color: 'Neutral-border-1' },
    line: { height: 'Size-11' },
    gap: 'Spacing-8',
    padding: { x: '', y: '', left: '', right: '' },
    font: { size: 'Font-14', weight: 'Weight-regular' },
    icon: { width: 'Size-7' },
    extra: { gap: 'Size-5' },
    color: 'Neutral-text-5',
    background: { color: '' },
  },
  content: {
    border: { size: '', radius: '', color: '' },
    line: { height: 'Size-11' },
    gap: 'Spacing-24',
    padding: { x: '', y: 'Spacing-12', left: 'Spacing-38', right: 'Spacing-16' },
    font: { size: 'Font-14', weight: 'Weight-regular' },
    icon: { width: '' },
    extra: { gap: '' },
    color: 'Neutral-text-4',
    background: { color: 'Neutral-fill-2' },
  },
  active: { border: { color: '' }, color: '', background: { color: '' } },
  disabled: { border: { color: '' }, color: 'Neutral-text-2', background: { color: '' } },
};

module.exports = {
  collapseTokenValue,
  collapseTokenExtraValue,
  collapseTokenDescription,
};
