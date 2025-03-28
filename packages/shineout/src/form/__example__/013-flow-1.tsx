/**
 * cn - 联动
 *    -- 在通常情况下，Form 不通过 value 和 onChange 方式处理数据，只是在 submit 的时候获取数据提交
 *    -- 这种情况下，需要联动时，可以使用 Flow 组件来实现。如果设置了 names 属性，只监听 names 包含的字段变化，如果没有设置，会监听 Form 内所有数据的变化
 * en - Flow
 *    -- For performance reasons, internal data of the Form is isolated and changing one component does not trigger another component to change
 *    -- If one component depends on another component's value, place it in the Flow component
 */
import React from 'react';
import { Form, Input, Checkbox, DatePicker, Rule } from 'shineout';

const rule = Rule();

const App: React.FC = () => (
  <Form onSubmit={(d) => console.log(d)}>
    <Form.Item label='First Name'>
      <Input name='firstName' delay={0} defaultValue='Harry' clearable />
    </Form.Item>

    <Form.Item label='Last Name'>
      <Input name='lastName' delay={0} defaultValue='Potter' clearable />
    </Form.Item>

    <Form.Item label='Full Name'>
      <Form.Flow names={['firstName', 'lastName']}>
        {(datum) => {
          console.log('======================')
          console.log('flow-1 rendered: >>')
          console.log('======================')
          return (
            <div style={{ lineHeight: '32px' }}>{`${datum?.get('firstName')}-${datum?.get(
              'lastName',
            )}`}</div>
          )
        }}
      </Form.Flow>
    </Form.Item>

    <Form.Item label='Password'>
      <Input name='password' type='password' clearable />
    </Form.Item>

    <Form.Item label=''>
      <Checkbox defaultValue name='showAge'>
        Show age
      </Checkbox>
      <Checkbox name='showColors'>Show colors</Checkbox>
      <Form.Flow names={[]}>
        {(datum) => (
          <Checkbox
            name='dateRange'
            beforeChange={() => datum?.set({ startDate: undefined, endDate: undefined })}
          >
            Date range
          </Checkbox>
        )}
      </Form.Flow>
    </Form.Item>

    <Form.Flow names={['showAge']}>
      {(datum) =>
        datum?.get('showAge') && (
          <Form.Item required label='Age' tip='between 18 and 60'>
            <Input
              name='age'
              digits={0}
              title='age'
              type='number'
              defaultValue='18'
              style={{ width: 100 }}
              clearable
              rules={[rule.range(18, 60)]}
            />
          </Form.Item>
        )
      }
    </Form.Flow>

    <Form.Flow>
      {(datum) =>
        datum?.get('showColors') && (
          <Form.Item required label='Favorite Colors'>
            <Checkbox.Group
              keygen={(c) => c}
              name='colors'
              data={['red', 'yellow', 'green', 'blue', 'pink']}
            />
          </Form.Item>
        )
      }
    </Form.Flow>

    <Form.Item label='Date' tip=''>
      <Form.Flow names={['dateRange']}>
        {(datum) =>
          datum?.get('dateRange') === true ? (
            <DatePicker key='r' range name={['startDate', 'endDate']} type='date' />
          ) : (
            <DatePicker key='s' name='startDate' type='date' />
          )
        }
      </Form.Flow>
    </Form.Item>

    <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
      <Form.Button>Sumbit</Form.Button>
    </Form.Item>
  </Form>
);

export default App;
