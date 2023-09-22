/**
 * cn - 范围选择
 *    -- 设置 range 属性可以选择范围，输入和返回的 value 为长度为 2 的数组
 * en - Range
 *    --Set the range property to select range, the input value and return value is an array of length 2.
 */
import React from 'react';
import { DatePicker, Radio, TYPE } from 'shineout';

type DateType = TYPE.DatePicker.Props['type'];
const types: DateType[] = ['date', 'week', 'month', 'quarter', 'year', 'time', 'datetime'];

const App: React.FC = () => {
  const [type, setType] = React.useState<DateType>('date');
  return (
    <div>
      <Radio.Group
        button={'outline'}
        data={types}
        value={type}
        onChange={setType}
        keygen
        style={{ marginBottom: 24 }}
      />
      <br />
      <DatePicker type={type} />
    </div>
  );
};
export default App;
