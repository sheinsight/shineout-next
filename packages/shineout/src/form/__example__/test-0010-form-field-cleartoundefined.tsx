/**
 * cn - Form.Field-clearToUndefined
 *    -- 设置后，可清空默认值为undefined
 * en - Form.Field-clearToUndefined
 *    -- Set to true, the default value can be cleared to undefined
 */
import { useState } from 'react';
import { Button, Form, Select } from 'shineout';

export default () => {
  const [value, setValue] = useState({})
  console.log(value)
  return (
    <div>
      <Form
        // defaultValue={{
        //   selectColor: 'green'
        // }}
        value={value}
        removeUndefined={false}
        onChange={(v) => {
          setValue(v)
          console.log('form change', v);
        }}
      >
        <Button onClick={() => {
          setValue(prev => ({
            ...prev,
            selectColor: undefined,
          }))
        }}>set selectColor undefined</Button>
        <Form.Item label='selectColor'>
          <Form.Field name="selectColor" defaultValue='blue' clearToUndefined>
            <Select
              keygen
              clearable
              width={300}
              data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink']}
              placeholder='Select Color'
            />
          </Form.Field>
          {/* <Select
            keygen
            clearable
            width={300}
            name='selectColor'
            defaultValue='blue'
            data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink']}
            placeholder='Select Color'
          /> */}
        </Form.Item>
        {/* <Form.Item label='inputText'>
          <Input
            clearable
            width={300}
            name='inputText'
            defaultValue='blue'
            placeholder='inputText'
          />
        </Form.Item> */}
      </Form>
    </div>
  );
};