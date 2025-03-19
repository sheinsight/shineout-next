/**
 * cn -
 *    -- Form 通过 value 和 onChange 方式处理数据后，依然想要只监听 names 包含的字段变化
 *    -- 这种情况下，设置Form.Flow的 watch 属性为 true
 * en - Flow
 *    -- For performance reasons, internal data of the Form is isolated and changing one component does not trigger another component to change
 *    -- If one component depends on another component's value, place it in the Flow component
 */
import React from 'react';
import { Form, Input } from 'shineout';


const App: React.FC = () => {
  const [value, setValue] = React.useState({});
  const [count, setCount] = React.useState(0);

  return (
    <Form value={value} onChange={setValue} onSubmit={(d) => console.log(d)}>
      <Form.Item label='First Name'>
        <Input name='firstName' delay={0} defaultValue='Harry' clearable />
      </Form.Item>

      <Form.Item label='Last Name'>
        <Input name='lastName' delay={0} defaultValue='Potter' clearable />
      </Form.Item>

      <Form.Flow names={['firstName']} strict>
        {
          (datum) => {
            // setCount(count + 1);
            console.log('======================')
            console.log('flow-2-rendered: >>')
            console.log('======================')
            return (
              <Form.Item label='联动渲染'>
                <div style={{ lineHeight: '32px' }}>{`${datum?.get('firstName')}-${datum?.get('lastName')}`} {count}</div>
              </Form.Item>
            );
          }
        }
      </Form.Flow>
      <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
        <Form.Button>Sumbit</Form.Button>
      </Form.Item>
    </Form>
  );
}

export default App;
