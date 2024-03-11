/**
 * cn - 状态
 *    -- checked 属性设置 Radio 选中状态； disabled 属性设置 Radio 禁用状态
 * en - Base
 *    -- checked property set the checked status of Radio; disabled property set the disabled status of Radio
 */
import React from 'react';
import { Radio } from 'shineout';

const App: React.FC = () => {
  return (
    <>
      <Radio checked={false}>OptionA</Radio>
      <Radio checked={true}>OptionB</Radio>
      <Radio checked={false} disabled>
        OptionC
      </Radio>
      <Radio checked={true} disabled>
        OptionD
      </Radio>
    </>
  );
};

export default App;
