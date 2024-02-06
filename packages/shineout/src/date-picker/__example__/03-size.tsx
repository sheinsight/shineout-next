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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Radio.Group button={'outline'} data={Size} value={size} onChange={setSize} keygen />
      <DatePicker size={size} type='date' showSelNow />
      <DatePicker size={size} type='datetime' showSelNow />
      <DatePicker size={size} type='date' range showSelNow />
      <DatePicker size={size} type='datetime' range showSelNow />
    </div>
  );
};

export default App;
