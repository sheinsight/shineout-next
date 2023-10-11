import { MessageFuncArg, MessageOptions, MessageType, PositionType } from './func.type';
import { destroy, getComponent } from './manager';

let defaultOptions: MessageOptions & {
  duration?: number;
  top?: string;
} = {};

const create =
  (type: MessageType) =>
  (
    content: MessageFuncArg['content'],
    duration?: MessageFuncArg['duration'],
    options?: MessageOptions,
  ) => {
    const mo = Object.assign({}, defaultOptions, options);
    const duration1 = [duration, defaultOptions.duration, 3].find((d) => typeof d === 'number')!;
    const {
      onClose,
      position = 'top',
      title,
      className = '',
      top = 'auto',
      hideClose,
      container,
      jssStyle,
    } = mo;
    return getComponent({ position, container, jssStyle }).then((messager) =>
      messager.addMessage({
        content,
        duration: duration1,
        type,
        onClose,
        title,
        className,
        top,
        position,
        hideClose,
      }),
    );
  };

export default {
  show: create('default'),
  success: create('success'),
  info: create('info'),
  warn: create('warning'),
  warning: create('warning'),
  danger: create('danger'),
  error: create('danger'),
  close: (key?: PositionType) => {
    if (key) destroy(key);
    else {
      (
        ['top', 'middle', 'top-left', 'top-right', 'bottom-left', 'bottom-right'] as PositionType[]
      ).forEach((k) => {
        destroy(k);
      });
    }
  },
  setOptions: (options: MessageOptions) => {
    defaultOptions = options;
  },
};
