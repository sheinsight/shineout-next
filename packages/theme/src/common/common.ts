import { CommonTokens } from './type';

const common: CommonTokens = {
  lineHeightDynamic: 'Line-height-dynamic',
  lineHeightDynamicMin: 'Line-height-dynamic-min',
  defaultBorder: 'Border-1',
  iconCirclePadding: 'Padding-4',
  transparent: 'transparent',
  // 未设置 Background-popup 时回退到 Neutral-fill-1，兼容仅覆盖 Neutral-fill-* 的暗黑主题
  backgroundPopup: 'Neutral-fill-1',
  backgroundLayout: 'Background-layout',
};

export default common;
