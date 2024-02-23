/**
 * cn - 单选框组
 *    -- Radio.Group 通过数据来生成一组单选框
 * en - Group
 *    -- Radio.Group generate a group of radios from an array
 */
import React from 'react';
import { Radio } from 'shineout';

type RadioGroupItem = string;

const data: RadioGroupItem[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

const App: React.FC = () => {
  return <Radio.Group keygen data={data} defaultValue='blue' renderItem={(d) => d} />;
};

export default App;
