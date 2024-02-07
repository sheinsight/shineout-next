import { RadioProps as UnStyledRadioProps } from '@sheinx/base';

/**
 * @title Radio
 */
export type RadioProps<T> = Omit<UnStyledRadioProps<T>, 'jssStyle'>;
