import { RadioProps as UnStyledRadioProps } from '@sheinx/base';

/**
 * @title Radio
 * @sort 1
 */
export type RadioProps<T> = Omit<UnStyledRadioProps<T>, 'jssStyle'>;
