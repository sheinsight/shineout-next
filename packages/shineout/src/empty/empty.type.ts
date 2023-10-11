import { EmptyProps as UnStyledEmptyProps } from '@sheinx/base';

export type EmptyProps = Omit<UnStyledEmptyProps, 'jssStyle'>;
