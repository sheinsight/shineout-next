// 此文件受脚本控制，修改后将自动同步 type.ts avatar.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and avatar.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const avatarTokenDescription = { avatar: '头像' };

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts avatar.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 avatarRules 强关联，非 avatarRules 规则内的 token 需手动增加或删减。
 */
const avatarTokenValue = {};

const avatarTokenExtraValue = {
  width: 'Size-16',
  height: 'Size-16',
  background: { color: 'Neutral-fill-3' },
  font: { size: 'font-14', color: 'Neutral-text-4', weight: 'Weight-medium' },
  small: { width: 'Size-12', height: 'Size-12', font: { size: 'font-12' } },
  large: { width: 'Size-20', height: 'Size-20', font: { size: 'font-16' } },
  circle: { border: { radius: 'Radius-circle' } },
  max: {
    font: { color: 'Neutral-text-5', weight: 'Weight-regular' },
    hover: { color: 'Neutral-text-1', background: { color: 'Brand-6' } },
  },
  popover: { padding: 'Spacing-16' },
  square: { border: { radius: 'Radius-default' } },
  group: {
    border: { width: 'Border-2', color: 'Neutral-fill-1' },
    offset: { margin: 'Spacing-8' },
  },
};

module.exports = {
  avatarTokenValue,
  avatarTokenExtraValue,
  avatarTokenDescription,
};
