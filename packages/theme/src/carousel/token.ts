// 此文件受脚本控制，修改后将自动同步 type.ts carousel.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and carousel.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const carouselTokenDescription = {
  carousel: '轮播图',
  arrow: '箭头',
  indicator: '指示器',
  wrapper: '容器',
  gap: '间距',
  slider: '滑块',
  number: '数字',
  outer: '在外侧',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts carousel.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 carouselRules 强关联，非 carouselRules 规则内的 token 需手动增加或删减。
 */
const carouselTokenValue = { font: { size: 'Font-14' } };

const carouselTokenExtraValue = {
  arrow: {
    margin: 'Spacing-18',
    size: 'Size-12',
    icon: { size: 'Size-10' },
    background: { color: 'rgba(255, 255, 255, 0.2)' },
    border: { radius: 'Radius-default' },
    font: { color: 'Neutral-text-1' },
    hover: { background: { color: 'rgba(255, 255, 255, 0.4)' } },
  },
  indicator: {
    background: { color: 'Neutral-fill-4' },
    active: { background: { color: 'Neutral-fill-1' } },
    wrapper: { height: 'Size-20' },
    circle: { width: 'Size-3', gap: 'Spacing-8' },
    line: { width: 'Size-6', height: 'Size-2', gap: 'Spacing-4' },
    bar: { width: 'Size-12', height: 'Size-2' },
    arrow: { size: 'Size-8', color: 'Neutral-fill-4', hover: { color: 'Neutral-fill-1' } },
    number: { color: 'Neutral-fill-1', font: { size: 'Font-14' } },
    outer: {
      background: { color: 'Neutral-fill-4' },
      active: { background: { color: 'Neutral-fill-6' } },
      arrow: { color: 'Neutral-text-4', hover: { color: 'Neutral-text-2' } },
      number: { color: 'Neutral-text-4' },
    },
  },
};

module.exports = {
  carouselTokenValue,
  carouselTokenExtraValue,
  carouselTokenDescription,
};
