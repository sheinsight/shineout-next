import React from 'react';
import Alert from '../alert';
import { MessageItemType, MessageProps } from './message.type';
import classNames from 'classnames';
import { util } from '@sheinx/hooks';
import { produce } from 'immer';
import { MessageOptions } from './func.type';

const { getUidStr, getDataAttribute } = util;

const dismissDuration = 200;
interface MessageState {
  messages: Array<MessageItemType>;
}

const MessagePure = (props: {
  messages: Array<MessageItemType>;
  jssStyle?: MessageOptions['jssStyle'];
  onClose: (id: string, duration: number, h: number) => void;
  cachedHeight: { [key: string]: number };
  position: string;
}) => {
  const { messages, jssStyle, position } = props;
  // hooks
  const styles = jssStyle?.message?.();
  const handleClassName = (position: string | undefined, closeMsg: boolean) => {
    return classNames(styles?.item, closeMsg ? styles?.itemDismissed : styles?.itemShow);
  };
  const handleStyle = (closeMsg: boolean, h: number, position: string) => {
    // eslint-disable-next-line eqeqeq
    if (!closeMsg || h == null) {
      return null;
    }
    let styles = {};
    // if bottom, switch left or right
    switch (position) {
      case 'bottom-right':
      case 'bottom-left':
        break;
      default:
        styles = {
          zIndex: -1,
          opacity: 0,
          marginTop: -h,
        };
        break;
    }

    return styles;
  };

  return (
    <div className={styles?.wrapper} {...getDataAttribute({ position })}>
      {[
        messages.map(
          ({ id, type, content, dismiss, h, title, top, className, position, hideClose }) => (
            <div
              key={id}
              className={`${handleClassName(position, !!dismiss)} ${className}`}
              style={handleStyle(!!dismiss, h || 0, position)!}
              ref={(el) => {
                if (el && !dismiss) {
                  props.cachedHeight[id] = el.offsetHeight;
                }
              }}
            >
              <Alert
                className={styles?.message}
                jssStyle={jssStyle}
                closable={'only'}
                hideClose={hideClose}
                onClose={() => {
                  props.onClose(id, dismissDuration, props.cachedHeight[id]);
                }}
                icon={type !== 'default'}
                iconSize={title ? 20 : 14}
                style={{ top }}
                title={title}
                type={type === 'default' ? undefined : type}
              >
                {content}
              </Alert>
            </div>
          ),
        ),
      ]}
    </div>
  );
};

class Message extends React.PureComponent<MessageProps, MessageState> {
  cachedHeight: Record<string, number>;
  constructor(props: MessageProps) {
    super(props);
    this.state = {
      messages: [],
    };
    this.cachedHeight = {};

    this.removeMessage = this.removeMessage.bind(this);
    this.closeMessageForAnimation = this.closeMessageForAnimation.bind(this);
  }

  addMessage(msg: Omit<MessageItemType, 'id'>) {
    const id = getUidStr();
    this.setState(
      produce((state) => {
        state.messages.push(Object.assign({ id }, msg));
      }),
    );
    console.log('addMessage', msg);

    if (msg.duration > 0) {
      setTimeout(() => {
        this.closeMessageForAnimation(id, dismissDuration, this.cachedHeight[id]);
      }, msg.duration * 1000);
    }
    return this.closeMessageForAnimation.bind(this, id, dismissDuration, 200);
  }

  removeMessage(id: string) {
    let callback;
    const messages = this.state.messages.filter((m) => {
      if (m.id !== id) return true;
      if (m.onClose) {
        callback = m.onClose;
      }
      return false;
    });

    if (messages.length === 0) {
      this.props.onDestroy?.();
    } else {
      this.setState({ messages });
    }

    if (callback) (callback as () => void)();
  }

  closeMessageForAnimation(id: string, duration?: number, msgHeight?: number) {
    if (!duration) {
      this.removeMessage(id);
      return;
    }

    // duration animation duration time
    this.setState(
      produce((state) => {
        state.messages.forEach((m: MessageItemType) => {
          if (m.id === id) {
            m.dismiss = true;
            m.h = msgHeight || 0;
          }
        });
      }),
    );
    setTimeout(() => {
      this.removeMessage(id);
    }, duration);
  }

  closeEvent(id: string, duration: number) {
    if (duration === 0) {
      return this.removeMessage.bind(this, id);
    }

    return undefined;
  }

  render() {
    const { messages } = this.state;
    const { jssStyle } = this.props;
    return (
      <MessagePure
        messages={messages}
        jssStyle={jssStyle}
        cachedHeight={this.cachedHeight}
        position={this.props.position || 'top'}
        onClose={this.closeMessageForAnimation}
      />
    );
  }
}

export default Message;
