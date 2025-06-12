export interface CommonTokens {
  /**
   * @type {string}
   * @categoty string
   * @default 'calc( 1em + 8px )'
   * @description 动态行高，根据当前的字体大小 + 8px
   */
  lineHeightDynamic: string;
  /**
   * @type {string}
   * @categoty string
   * @default 'calc( max(1em, 14px) + 8px )'
   * @description 最小动态行高，根据当前的字体大小 + 8px，但字体大小小于 14px 时，使用 14px 计算
   */
  lineHeightDynamicMin: string;
  /**
   * @type {string}
   * @categoty string
   * @default '3px'
   * @description 较粗边框宽度
   */
  defaultBorder: string;
  /**
   * @type {string}
   * @categoty string
   * @default '4px'
   * @description icon 悬浮后的圆形背景边距
   */
  iconCirclePadding: string;
  /**
   * @type {string}
   * @categoty string
   * @default 'transparent'
   * @description 透明
   */
  transparent: string;
}
