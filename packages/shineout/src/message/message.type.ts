import { MessageOptions as UnStyledMessageProps } from '@sheinx/base';

export type MessageOptions = Omit<UnStyledMessageProps, 'jssStyle'>;
