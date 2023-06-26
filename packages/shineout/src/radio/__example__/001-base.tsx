/**
 * cn - 基本用法
 *    -- Radio.Group 通过数据来生成一组单选框。
 * en - Base
 *    -- Radio.Group generate a group of radios from an array.
 */
import React from 'react';
import { Radio } from 'shineout';

type RadioGroupItem = string;

const data: RadioGroupItem[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

const App: React.FC = () => {
  const renderItem = (color: string) => {
    const style = { borderBottom: `solid 1px ${color}`, paddingBottom: 2 };

    return <span style={style}>{color}</span>;
  };

  return <Radio.Group keygen data={data} defaultValue='blue' renderItem={renderItem} />;
};

export default App;
