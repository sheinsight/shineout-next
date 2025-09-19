/**
 * cn - 不同值展示效果
 *    -- 有值时，clearable 属性下，showClear 控制是否显示清空按钮
 * en -  Different value display effects
 *    -- When there is a value, under the clearable property, showClear controls whether to display the clear button
 */
import React from 'react';
import { Input } from 'shineout';

const App: React.FC = () => {
  return (
    <>
      空值<Input width={300}  clearable placeholder='input something' showClear   value='' /><br />
      有值 showClear true<Input width={300}  clearable placeholder='input something' showClear   value='11111111111' /><br />
      有值 showClear false<Input width={300}  clearable placeholder='input something'    value='11111111111' /><br />
      值为0 showClear true<Input width={300}  clearable placeholder='input number' showClear  value={0} /><br />
      值为0 showClear false<Input width={300}  clearable placeholder='input number'   value={0} /><br />
      值为null showClear true<Input width={300}  clearable placeholder='input null' showClear  value={null} /><br />
      值为null showClear false<Input width={300}  clearable placeholder='input null'   value={null} /><br />
      值为undefined showClear true<Input width={300}  clearable placeholder='input undefined' showClear  value={undefined} /><br />
      值为undefined showClear false<Input width={300}  clearable placeholder='input undefined'   value={undefined} /><br />
    </>
  )
};

export default App;
