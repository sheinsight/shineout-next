import { MessageProps as UnStyledMessageProps } from '@sheinx/base';

export type MessageProps = Omit<UnStyledMessageProps, 'jssStyle'>;
