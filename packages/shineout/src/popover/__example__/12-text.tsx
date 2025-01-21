/**
 * cn - 文本样式
 *    -- 当内容为 string 或者 设置 useTextStyle 为 true 时会有默认的文本样式
 * en - useTextStyle
 *    -- When the content is string or set useTextStyle to true, the default text style will be used
 */
import React from 'react';
import { Button, Popover } from 'shineout';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button mode="outline">
        <Popover useTextStyle={false}>
          <div>hello</div>
        </Popover>
        defaultStyle
      </Button>

      <Button mode="outline">
        <Popover useTextStyle>
          <div>hello</div>
        </Popover>
        useTextStyle
      </Button>
    </div>
  );
};
export default App;
