/**
 * cn - Group的校验
 *    -- 配置 `status` 属性可以展示错误状态
 *    -- 配置 `seperate` 属性也有相应的校验效果
 *    -- 配置 `keepErrorHeight` 属性可以保持错误提示的高度
 * en - Group validate
 *    -- The `status` property of Input.Group can be used to display error status
 *    -- The `seperate` property also has the corresponding verification effect
 *    -- The `keepErrorHeight` property can keep the height of the error prompt
 */

import React from 'react';
import { Input, Form, Button, Rule } from 'shineout';
import { add, cancel } from '../../form/__example__/011-fieldset-loop';

const rules = Rule();

const App: React.FC = () => (
  <Form labelWidth='100' keepErrorHeight>
    <Form.Item label='Home1' required>
      <Form.Field name='url1' rules={[rules.required, rules.url('url is invalid')]}>
        {({ value, error, onChange }) => (
          <Input.Group style={{ width: 340 }} status={error ? 'error' : undefined}>
            <b>http://</b>
            <Input value={value} onChange={onChange} placeholder='i am not seperate input group' />
          </Input.Group>
        )}
      </Form.Field>
    </Form.Item>

    <Form.Item label='Home2' required>
      <Input.Group style={{ width: 340 }} seperate>
        <Form.Field name='url2' rules={[rules.required]}>
          <Input placeholder='i am seperate input group' />
        </Form.Field>
        <b>.com</b>
      </Input.Group>
    </Form.Item>

    <Form.Item label='Friends' required>
      <Form.FieldSet
        name='friends'
        empty={(insert) => {
          return (
            <Button type='primary' mode='outline' onClick={() => insert({ name: '' })}>
              + Add new friends
            </Button>
          );
        }}
        defaultValue={[{ name: 'Hermione Granger', age: '16' }, {}]}
      >
        {({ onAppend, onRemove }) => (
          <div style={{ display: 'flex' }}>
            <Form.Item>
              <Input
                name='name'
                placeholder='Name'
                title='Friend name'
                rules={[rules.required('Name is required')]}
                style={{ width: 180 }}
                clearable
              />
            </Form.Item>
            <div style={{ height: 32, lineHeight: '30px', padding: '0 4px' }}>-</div>
            <Form.Item>
              <Input
                name='age'
                type='number'
                placeholder='Age'
                rules={[rules.required('Age is required')]}
                title='Friend age'
                style={{ width: 90 }}
                clearable
              />
            </Form.Item>
            <div style={{ height: 32, display: 'flex', alignItems: 'center' }}>
              <a
                style={{ margin: '0 12px', lineHeight: 1, cursor: 'pointer' }}
                onClick={() => onAppend({ name: '', age: '16' })}
              >
                {add}
              </a>
              <a style={{ lineHeight: 1, cursor: 'pointer' }} onClick={onRemove}>
                {cancel}
              </a>
            </div>
          </div>
        )}
      </Form.FieldSet>
    </Form.Item>
  </Form>
);

export default App;
