/**
 * cn - 类型
 *    -- Modal 内置了 4 个类型的样式：info（纯信息展示，不带有状态）、Success、Warn 和 Error，为了方便调用，设计为静态函数。
 * en - Type
 *    -- Modal has 4 built in style.
 */
import React from 'react';
import { Modal, Button } from 'shineout';

const App: React.FC = () => {
  const info = () => {
    Modal.info({
      title: 'This is a info message',
      content: 'this is  some information that user must know',
    });
  };

  const success = () => {
    Modal.success({
      title: 'This is a success message',
      content: 'this is some information that user successful operation',
    });
  };

  const warning = () => {
    Modal.warn({
      title: 'This is a warning message',
      content: 'this is  some information that user must know',
    });
  };

  const error = () => {
    Modal.error({
      title: 'This is a error message',
      content: 'this is some information that user attended',
    });
  };

  const show = () => {
    Modal.show({
      title: 'This is a message',
      content: 'this is show information',
    });
  };

  return (
    <div>
      <Button onClick={show} mode='outline'>
        show
      </Button>
      <Button onClick={info} mode='outline'>
        info
      </Button>
      <Button onClick={error} mode='outline'>
        error
      </Button>
      <Button onClick={success} mode='outline'>
        success
      </Button>
      <Button onClick={warning} mode='outline'>
        warning
      </Button>
    </div>
  );
};

export default App;
