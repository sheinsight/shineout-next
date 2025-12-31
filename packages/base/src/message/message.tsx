'use client';
import React, { useEffect, useState } from 'react';
import Alert from '../alert';
import { MessageItemType, MessageProps } from './message.type';
import clsx from 'clsx';
import { util } from '@sheinx/hooks';
import { MessageOptions } from './func.type';

const { getUidStr, getDataAttribute, produce } = util;

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
  timeoutMap: { [key: string]: NodeJS.Timeout };
}) => {
  const { messages, jssStyle, position, timeoutMap } = props;

  const [timeoutByIdMap, setTimeoutByIdMap] = useState<{ [key: string]: NodeJS.Timeout }>(
    timeoutMap,
  );
  useEffect(() => {
    setTimeoutByIdMap(timeoutMap);
  }, [Object.keys(timeoutMap).length]);

  // hooks
  const styles = jssStyle?.message?.();
  const handleClassName = (position: string | undefined, closeMsg: boolean) => {
    return clsx(styles?.item, closeMsg ? styles?.itemDismissed : styles?.itemShow);
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
    <div className={clsx(styles?.rootClass, styles?.wrapper)} {...getDataAttribute({ position })}>
      {[
        messages.map(
          ({
            id,
            type,
            content,
            dismiss,
            h,
            title,
            top,
            className,
            position,
            hideClose,
            duration,
          }) => (
            <div
              key={id}
              className={`${handleClassName(position, !!dismiss)} ${className}`}
              style={handleStyle(!!dismiss, h || 0, position)!}
              onMouseEnter={() => {
                if (timeoutByIdMap[id]) {
                  clearTimeout(timeoutByIdMap[id]);
                }
              }}
              onMouseLeave={() => {
                if (duration > 0) {
                  const closeTimeDelay = setTimeout(() => {
                    props.onClose(id, dismissDuration, props.cachedHeight[id]);
                  }, duration * 1000);
                  setTimeoutByIdMap((prev) => ({
                    ...prev,
                    [id]: closeTimeDelay,
                  }));
                }
              }}
              ref={(el) => {
                if (el && !dismiss) {
                  props.cachedHeight[id] = el.offsetHeight;
                }
              }}
            >
              <Alert
                className={styles?.message}
                jssStyle={jssStyle}
                closable={!hideClose && 'only'}
                onClose={() => {
                  props.onClose(id, dismissDuration, props.cachedHeight[id]);
                }}
                icon={type !== 'default'}
                style={{ top }}
                title={title}
                type={type === 'default' ? undefined : type}
                {...util.getDataAttribute({ type: 'message' })}
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
  timeoutMap: Record<string, NodeJS.Timeout>;
  messages: Array<MessageItemType>;
  constructor(props: MessageProps) {
    super(props);
    this.state = {
      messages: [],
    };
    this.messages = []

    this.cachedHeight = {};
    this.timeoutMap = {};
    this.removeMessage = this.removeMessage.bind(this);
    this.closeMessageForAnimation = this.closeMessageForAnimation.bind(this);
  }

  setMessages(messages: Array<MessageItemType>) {
    this.messages = messages;
    this.setState({ messages });
  }

  addMessage(msg: Omit<MessageItemType, 'id'>) {
    const id = getUidStr();
    const newMessages = produce(this.messages, (messages) => {
      messages.push(Object.assign({ id }, msg));
    });
    this.setMessages(newMessages);

    if (msg.duration > 0) {
      const closeTimeDelay = setTimeout(() => {
        this.closeMessageForAnimation(id, dismissDuration, this.cachedHeight[id]);
      }, msg.duration * 1000);
      this.timeoutMap[id] = closeTimeDelay;
    }
    return this.closeMessageForAnimation.bind(this, id, dismissDuration, 200);
  }

  removeMessage(id: string) {
    let callback;
    const messages = this.messages.filter((m) => {
      if (m.id !== id) return true;
      if (m.onClose) {
        callback = m.onClose;
      }
      return false;
    });

    if (messages.length === 0) {
      this.props.onDestroy?.();
    } else {
      this.setMessages(messages);
    }

    if (callback) (callback as () => void)();
  }

  closeMessageForAnimation(id: string, duration?: number, msgHeight?: number) {
    // duration animation duration time
    const newMessages = produce(this.messages, (messages) => {
      messages.forEach((m: MessageItemType) => {
        if (m.id === id) {
          m.dismiss = true;
          m.h = msgHeight || 0;
        }
      });
    });
    this.setMessages(newMessages);
    setTimeout(() => {
      this.removeMessage(id);
    }, duration);
  }

  render() {
    const { messages } = this.state;
    const { jssStyle } = this.props;
    return (
      <MessagePure
        messages={messages}
        jssStyle={jssStyle}
        cachedHeight={this.cachedHeight}
        timeoutMap={this.timeoutMap}
        position={this.props.position || 'top'}
        onClose={this.closeMessageForAnimation}
      />
    );
  }
}

export default Message;
