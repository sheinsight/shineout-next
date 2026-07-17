import { WatermarkProps as UnStyledWatermarkProps } from '@sheinx/base';

/**
 * @title Watermark
 */
export type WatermarkProps = Omit<UnStyledWatermarkProps, 'jssStyle'>;

export type { WatermarkContent, WatermarkFont, WatermarkText } from '@sheinx/base';
