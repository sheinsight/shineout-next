/**
 * cn - 尺寸
 *    -- 内置了三种尺寸，small、default、large
 * en - Size
 *    -- There are three built-in size: small、default、large.
 */
import React from 'react';
import { DatePicker, TYPE, Radio } from 'shineout';

type DatePickerProps = TYPE.DatePicker.Props;
type DatePickerSize = DatePickerProps['size'];

const Size: DatePickerSize[] = ['small', 'default', 'large'];

const App: React.FC = () => {
  const [size, setSize] = React.useState<DatePickerSize>('default');
  return (
    <div>
      <Radio.Group
        button={'outline'}
        data={Size}
        value={size}
        onChange={setSize}
        keygen
        style={{ marginBottom: 24 }}
      />
      <br />
      <DatePicker size={size} type='date' style={{ marginBottom: 16 }} /> <br />
      <DatePicker size={size} type='datetime' style={{ marginBottom: 16 }} /> <br />
      <DatePicker size={size} type='date' range style={{ marginBottom: 16 }} /> <br />
      <DatePicker size={size} type='datetime' range style={{ marginBottom: 16 }} />
    </div>
  );
};

export default App;
