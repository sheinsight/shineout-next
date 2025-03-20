/**
 * cn - 确认选择
 *    -- 设置`needConfirm`属性后开启手动确认按钮。默认会在选择值或者失去焦点时提交。
 * en - Select confirm
 *    -- Select confirm
 */
import React from 'react';
import { Checkbox, DatePicker, Radio, TYPE } from 'shineout';

type DateType = TYPE.DatePicker.Props['type'];
const types: DateType[] = ['date', 'week', 'month', 'quarter', 'year', 'time', 'datetime'];

const App: React.FC = () => {
  const [dateValue, setDateValue] = React.useState<Date | Date[]>();
  const [type, setType] = React.useState<DateType>('date');
  const [isRange, setIsRange] = React.useState(true);
  const [isConfirm, setIsConfirm] = React.useState(true);
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <Radio.Group keygen button={'outline'} data={types} value={type} onChange={setType} />
        <Checkbox value={isRange} onChange={(v) => setIsRange(!!v)} style={{ margin: 0 }}>
          范围选择
        </Checkbox>
        <Checkbox value={isConfirm} onChange={(v) => setIsConfirm(!!v)} style={{ margin: 0 }}>
          启用确认
        </Checkbox>
      </div>
      <br />
      <DatePicker
        type={type}
        defaultTime={['00:00:00', '23:59:59']}
        range={isRange}
        showSelNow
        value={dateValue}
        onChange={(v) => {
          console.log('外部的onChange: ', v);
          setDateValue(v);
        }}
        clearable
        needConfirm={isConfirm}
      />
    </div>
  );
};
export default App;
