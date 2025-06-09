/**
 * cn - form onchange
 *    -- 调试用的，在这个例子基础上随便改吧
 * en - Test Form
 *    -- Test Form
 */
import { Form, Input, DatePicker, Select } from 'shineout';
import { useState } from 'react';

export default () => {
  const data = [1, 2];
  const [formValue, setFormValue] = useState<Record<string, any>>({});

  return (
    <div>
      <Form
        value={formValue}
        onChange={(vv) => {
          console.log(111, vv);
          setFormValue(vv);
        }}
      >
        <Form.Item label='时间类型'>
          <Select
            name='timeType'
            clearable
            data={data}
            keygen
            onChange={(v) => {
              const tempValue = {
                ...formValue,
                effectiveTimeEnd: '',
                timeType: v,
              };
              // 为红色则name赋值
              if (v === 1) {
                console.log(222);
                tempValue.effectiveTimeEnd = '2099-12-31 23:59:00';
              }
              console.log(333, tempValue);
              setFormValue(tempValue);
            }}
          />
        </Form.Item>
        <Form.Item label='生效时间'>
          {formValue.timeType === 1 ? (
            <Input.Group style={{ width: '100%' }}>
              <DatePicker
                type='datetime'
                format='YYYY-MM-DD HH:mm'
                defaultTime='00:00:00'
                name='effectiveTimeBegin'
                placeholder={'开始时间'}
              />
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 8px' }}>~</div>
              <div style={{ padding: '5px 8px' }}>{formValue.effectiveTimeEnd?.slice(0, 16)}</div>
            </Input.Group>
          ) : (
            <DatePicker
              type='datetime'
              range
              name={['effectiveTimeBegin', 'effectiveTimeEnd']}
              reserveAble
              defaultTime={['00:00:00', '23:59:00']}
              placeholder={['开始时间', '结束时间']}
              format='YYYY-MM-DD HH:mm'
            />
          )}
        </Form.Item>
      </Form>
    </div>
  );
};
