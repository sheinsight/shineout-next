// 此文件受脚本控制，修改后将自动同步 type.ts modal.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and modal.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const modalTokenDescription = { modal: 'xxx' };

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts modal.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 modalRules 强关联，非 modalRules 规则内的 token 需手动增加或删减。
 */
const modalTokenValue = { font: { size: '14/regular' } };

const modalTokenExtraValue = {
  mask: {
    background: 'rgba(2, 11, 24, 0.3)',
    light: {
      background: 'rgba(2, 11, 24, 0.01)',
    },
  },
  panel: {
    padding: { y: 'Padding-24', x: 'Padding-24' },
    background: 'Neutral-fill-1',
    shadow: 'Shadow-2',
    gap: 'Padding-16',
    radius: 'Radius-4',
    font: { size: '14/regular' },
  },
  header: {
    icon: { margin: { end: 'Margin-8', top: 'Size-2' }, size: 'Size-8' },
    close: {
      margin: { x: { start: 'Margin-16' } },
      size: 'Size-8',
      top: 'Size-2',
      color: 'Neutral-text-4',
      background: { color: 'Neutral-fill-2' },
    },
    font: { size: '16/regular' },
  },
  drawer: {
    title: {
      padding: { y: 'Padding-12', x: 'Padding-16' },
      background: { color: 'Neutral-fill-2' },
    },
    body: {
      padding: { y: 'Padding-16', x: 'Padding-16' },
    },
    footer: {
      padding: { y: 'Padding-16', x: 'Padding-16' },
    },
    close: {
      background: { color: 'Neutral-fill-3' },
    },
  },
};

module.exports = {
  modalTokenValue,
  modalTokenExtraValue,
  modalTokenDescription,
};
