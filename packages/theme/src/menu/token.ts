// 此文件受脚本控制，修改后将自动同步 type.ts menu.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and menu.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const menuTokenDescription = { menu: 'xxx' };

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts menu.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 menuRules 强关联，非 menuRules 规则内的 token 需手动增加或删减。
 */
const menuTokenValue = {};

const menuTokenExtraValue = {
  font: { size: '14/regular', color: 'Neutral-text-5' },
  icon: {
    color: 'Neutral-text-4',
  },
  item: {
    background: { color: 'Neutral-fill-1' },
    font: { color: 'Neutral-text-5' },
    hover: {
      background: { color: 'Neutral-fill-2' },
      font: { color: 'Neutral-text-5' },
    },
    active: {
      background: { color: 'Brand-1' },
      hover: { background: { color: 'Brand-2' } },
      font: { color: 'Brand-6' },
    },
    disabled: {
      background: { color: 'Neutral-fill-1' },
      font: { color: 'Neutral-text-2' },
    },
  },
  title: {
    padding: { x: '16px', y: '9px' },
  },
  expand: {
    width: '46px',
    size: '14px',
    hover: {
      background: { color: 'Neutral-fill-3' },
    },
  },
  children: {
    box: {
      shadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    },
  },
  dark: {
    font: { color: 'Neutral-text-1' },
    item: {
      background: { color: 'Neutral-fill-10' },
      font: { color: 'Neutral-text-1' },
      hover: {
        background: { color: 'Brand-9' },
        font: { color: 'Neutral-text-1' },
      },
      active: {
        background: { color: 'Brand-6' },
        font: { color: 'Neutral-text-1' },
      },
      open: {
        background: { color: 'Neutral-fill-9' },
        font: { color: 'Neutral-text-1' },
      },
      disabled: {
        background: { color: 'Neutral-fill-10' },
        font: { color: 'Neutral-text-4' },
      },
    },
  },
};

module.exports = {
  menuTokenValue,
  menuTokenExtraValue,
  menuTokenDescription,
};
