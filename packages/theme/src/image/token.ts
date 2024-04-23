// 此文件受脚本控制，修改后将自动同步 type.ts image.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and image.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const imageTokenDescription = {
  image: '图片',
  group: '组',
  rounded: '圆角模式',
  cricle: '圆形模式',
  thumbnail: '图框模式',
  error: '加载错误时的',
  placeholder: '加载中的',
  nearly: '相邻之间的',
  mask: '遮罩层',
  spin: '加载中的旋转图标',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts image.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 imageRules 强关联，非 imageRules 规则内的 token 需手动增加或删减。
 */
const imageTokenValue = {
  circle: { border: { radius: 'Radius-50%', color: 'Neutral-border-1' } },
  rounded: { border: { radius: 'Radius-4', color: 'Neutral-border-1' } },
  thumbnail: { border: { radius: 'Radius-4', color: 'Neutral-border-1' } },
  placeholder: { background: { color: 'Neutral-fill-2' }, font: { color: '', size: '' } },
  error: {
    background: { color: 'Neutral-fill-2' },
    font: { color: 'Neutral-text-4', size: 'Font-12' },
  },
  group: { nearly: { margin: 'Margin-8' } },
  mask: { background: { color: 'Mask-fill-1' } },
  background: { color: 'Neutral-fill-2' },
};

const imageTokenExtraValue = {
  spin: {
    color: 'Neutral-text-2',
  },
};

module.exports = {
  imageTokenValue,
  imageTokenExtraValue,
  imageTokenDescription,
};
