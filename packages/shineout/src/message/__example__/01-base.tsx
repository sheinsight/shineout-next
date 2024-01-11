/**
 * cn - 基本用法
 *    -- Message 封装了一组全局函数，方便在任意地方调用，包括常规（不带/带icon）、Success、Warn、Error和关闭所有消息提醒。
 * en - Base
 *    -- Message has 6 static functions that are convenient to call anywhere, includes normal(with/without icon)、success、warn、error and close all messages
 */
import React from 'react';
import { Button, Message } from 'shineout';

const commonStyle = { marginInlineStart: '24px' };
const App: React.FC = () => (
  <div>
    <Button
      onClick={() => {
        Message.show('Some message.');
      }}
    >
      Show
    </Button>
    <Button
      style={commonStyle}
      onClick={() => {
        Message.info('This is a message of info.');
      }}
      type='primary'
    >
      Info
    </Button>
    <Button
      type='success'
      style={commonStyle}
      onClick={() => {
        Message.success('This is a message of success.');
      }}
    >
      Success
    </Button>
    <Button
      style={commonStyle}
      type='warning'
      onClick={() => {
        Message.warn('This is a message of warning.');
      }}
    >
      Warn
    </Button>
    <Button
      type='danger'
      style={commonStyle}
      onClick={() => {
        Message.error('This is a message of error.');
      }}
    >
      Error
    </Button>

    <Button
      style={commonStyle}
      onClick={() => {
        Message.close();
      }}
    >
      Close All
    </Button>
  </div>
);

export default App;
