import { Message, MessageFuncArg, MessageOptions as MessageOptionsUnStyle } from '@sheinx/base';
import { useAlertStyle, useMessageStyle } from '@sheinx/shineout-style';

export type MessageOptions = Omit<MessageOptionsUnStyle, 'jssStyle'>;
const createMessage = (
  type: 'show' | 'success' | 'info' | 'warn' | 'warning' | 'danger' | 'error',
) => {
  return (
    content: MessageFuncArg['content'],
    duration?: MessageFuncArg['duration'],
    options: MessageOptions = {},
  ) =>
    Message[type](content, duration, {
      ...options,
      jssStyle: {
        message: useMessageStyle,
        alert: useAlertStyle,
      },
    });
};
const MessageWithStyle = {
  ...Message,
  show: createMessage('show'),
  success: createMessage('success'),
  info: createMessage('info'),
  warn: createMessage('warn'),
  warning: createMessage('warning'),
  danger: createMessage('danger'),
  error: createMessage('error'),
};

export default MessageWithStyle;
