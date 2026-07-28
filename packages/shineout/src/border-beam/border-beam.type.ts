import type { BorderBeamProps as UnStyledBorderBeamProps } from '@sheinx/base';

/**
 * @title BorderBeam
 */
export type BorderBeamProps = Omit<UnStyledBorderBeamProps, 'jssStyle'>;

export type { BorderBeamColor, BorderBeamGradient, BorderBeamGradientItem } from '@sheinx/base';
