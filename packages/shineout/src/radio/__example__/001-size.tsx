/**
 * cn - 尺寸
 *    -- 设置 `size` 属性可以控制 Radio 的大小
 * en - Size
 *    -- Set `size` property to change the size of Radio
 */
import React from 'react';
import { Radio } from 'shineout';

const App: React.FC = () => {
  return (
    <Radio.Group keygen block>
      <Radio size={'small'} htmlValue={'a'}>
        OptionA
      </Radio>
      <Radio htmlValue={'b'}>OptionB</Radio>
      <Radio size={'large'} htmlValue={'c'}>
        OptionC
      </Radio>
    </Radio.Group>
  );
};

export default App;
