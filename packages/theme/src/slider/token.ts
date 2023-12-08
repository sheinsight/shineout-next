// 此文件受脚本控制，修改后将自动同步 type.ts slider.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and slider.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const sliderTokenDescription = { slider: 'xxx' };

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts slider.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 sliderRules 强关联，非 sliderRules 规则内的 token 需手动增加或删减。
 */
const sliderTokenValue = {};

const sliderTokenExtraValue = {
  font: {
    size: '12/regular',
  },
  track: {
    size: 'Size-2',
    background: { color: 'Neutral-fill-2' },
    active: {
      background: { color: 'Brand-6' },
    },
    disabled: {
      background: { color: 'Neutral-fill-4' },
    },
  },
  indicator: {
    size: 'Size-6',
    background: { color: 'Neutral-fill-1' },
    border: { color: 'Brand-6', size: 'Border-2' },
    active: {
      background: { color: 'Brand-6' },
    },
    disabled: {
      border: { color: 'Neutral-border-2' },
      background: { color: 'Neutral-fill-1' },
    },
  },
  value: {
    background: { color: 'Neutral-fill-1' },
  },
  scale: {
    line: {
      size: 'Size-3',
      background: { color: 'Neutrall-border-1' },
    },
    margin: {
      y: 'Margin-4',
    },
    font: {
      color: 'Neutrall-text-4',
      size: '12/regular',
    },
  },
};

module.exports = {
  sliderTokenValue,
  sliderTokenExtraValue,
  sliderTokenDescription,
};
