// 此文件受脚本控制，修改后将自动同步 type.ts modal.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and modal.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const modalTokenDescription = {
  modal: '对话框',
  panel: '面板',
  shadow: '阴影',
  gap: '间距',
  header: '头部区域',
  close: '关闭icon的',
  start: '（左侧）',
  end: '（右侧）',
  top: '顶部距离',
  title: '标题的',
  drawer: '抽屉模式',
  body: '主区域',
  footer: '底部区域',
  mask: '遮罩层',
  light: '浅色',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts modal.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 modalRules 强关联，非 modalRules 规则内的 token 需手动增加或删减。
 */
const modalTokenValue = { font: { size: 'Font-14' } };

const modalTokenExtraValue = {
  mask: { background: 'rgba(2, 11, 24, 0.3)', light: { background: 'rgba(2, 11, 24, 0.01)' } },
  panel: {
    padding: { y: 'Spacing-24', x: 'Spacing-24' },
    background: 'Neutral-fill-1',
    shadow: 'Shadow-3',
    border: 'Neutral-border-1',
    gap: 'Spacing-16',
    radius: 'Radius-default',
    font: { size: 'Font-14' },
  },
  header: {
    icon: { margin: { end: 'Spacing-8', top: 'Spacing-3' }, size: 'Size-9' },
    close: {
      margin: { x: { start: 'Spacing-16' } },
      size: 'Size-8',
      top: 'Size-2',
      color: 'Neutral-text-4',
      background: { color: 'Neutral-fill-2' },
    },
    font: { size: 'Font-16', weight: 'Weight-medium', color: 'Neutral-text-5' },
  },
  body: { font: { color: 'Neutral-text-5', weight: 'Weight-regular', size: 'Font-14' } },
  drawer: {
    title: {
      padding: { y: 'Spacing-12', x: 'Spacing-16' },
      background: { color: 'Neutral-fill-2' },
    },
    body: { padding: { y: 'Spacing-16', x: 'Spacing-16' } },
    footer: { padding: { y: 'Spacing-16', x: 'Spacing-16' } },
    close: { background: { color: 'Neutral-fill-3' } },
  },
};

module.exports = {
  modalTokenValue,
  modalTokenExtraValue,
  modalTokenDescription,
};
