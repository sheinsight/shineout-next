import { RadioProps as UnStyledRadioProps } from '@sheinx/base';
export type RadioProps<T> = Omit<UnStyledRadioProps<T>, 'jssStyle'>;
