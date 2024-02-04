/**
 * cn - 格式化
 *    -- 传入值可为 日期对象，时间戳，字符串，通过format 属性可以定义返回值的格式.
 *    -- 支持通过 formatResult 属性单独格式化值展示格式.
 *    -- 注: 我们使用dayjs格式化
 * en - Format
 *    -- The format attribute defines the format of the return value.
 *    -- support formatResult attribute to format the display format separately.
 *    -- tip: we use dayjs format
 */
import React, { useState } from 'react';
import { DatePicker, Input, TYPE } from 'shineout';

type DatePickerProps = TYPE.DatePicker.Props;
type DatePickerValue = TYPE.DatePicker.Value;
type DatePickerFormat = DatePickerProps['format'];

type InputProps = TYPE.Input.Props;
type InputOnChange = InputProps['onChange'];

const App: React.FC = () => {
  const [value, setValue] = useState<DatePickerValue>(new Date());
  const [format, setFormat] = useState<DatePickerFormat>('YYYY-M-D HH:mm');
  const [formatResult, setFormatResult] = useState<DatePickerFormat>('YY/MM/DD');
  const [formatResultValue, setFormatResultValue] = useState<DatePickerValue>(new Date());

  const handleFormatChange: InputOnChange = (v) => setFormat(v);

  const handleFormatResultChange: InputOnChange = (v) => setFormatResult(v);

  return (
    <div>
      <DatePicker
        value={value}
        format={format}
        type='datetime'
        placeholder='format date'
        style={{ marginBottom: 24 }}
        onChange={setValue}
      />

      <Input.Group width={240} style={{ marginBottom: 32 }}>
        <Input style={{ flex: 1 }} value='format' disabled />
        <Input
          style={{ flex: 3 }}
          placeholder='格式化'
          value={format}
          onChange={handleFormatChange}
        />
      </Input.Group>

      <DatePicker
        type='datetime'
        format='YYYY-MM-DD HH:mm:ss'
        placeholder='format date'
        value={formatResultValue}
        formatResult={formatResult}
        onChange={setFormatResultValue}
        style={{ marginBottom: 24 }}
      />

      <Input.Group width={240} style={{ marginBottom: 24 }} disabled>
        <Input style={{ flex: 1 }} value='value' />
        <Input style={{ flex: 3 }} placeholder='值' value={String(formatResultValue)} />
      </Input.Group>

      <Input.Group width={240}>
        <Input style={{ flex: 3 }} value='formatResult' disabled />
        <Input
          style={{ flex: 4 }}
          placeholder='展示格式化'
          value={formatResult}
          onChange={handleFormatResultChange}
        />
      </Input.Group>
    </div>
  );
};

export default App;
