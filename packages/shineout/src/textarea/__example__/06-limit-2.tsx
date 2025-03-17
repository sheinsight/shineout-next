/**
 * cn -
 *    -- 设置 `limit` 为函数，可以自定义右下角的字数统计显示
 *    -- 输入达到最大字数后，可以继续输入
 * en -
 *    -- Set the `limit` to a function to customize the display of the word count
 */
import React from 'react';
import { Textarea } from 'shineout';

const max = 100
const App: React.FC = () => {
  const [value, setValue] = React.useState('');

  const error = value.length > max ? 'error' : undefined;
  return (
    <Textarea
      status={error}
      limit={(text) => (
        <span>
          最大字数：
          <span
            style={{
              color: error ? 'var(--soui-danger-6,#EB4242)' : 'var(--soui-brand-6,#197AFA)',
            }}
          >
            {text?.length || 0}
          </span> / {max}
        </span>
      )}
      value={value}
      onChange={setValue}
      placeholder='input something'
    />
  );
};

export default App;
