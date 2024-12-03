/**
 * cn - 调试用基础 Form
 *    -- 调试用的，在这个例子基础上随便改吧
 * en - Test Form
 *    -- Test Form
 */
import { useState, useEffect } from 'react';
import { Form, Input, Rule, DatePicker, Divider } from 'shineout';

const NameInput = (props) => {
  const { value, onChange } = props;

  const handleChange = (v, index) => {
    const nextValue = [...value];
    nextValue[index] = v;
    // console.log('nextValue', nextValue);
    onChange(nextValue);
  };

  return (
    <Input.Group>
      <Input value={value![0]} width={120} onChange={(v) => handleChange(v, 0)} clearable />
      <Input value={value![1]} width={120} onChange={(v) => handleChange(v, 1)} clearable />
    </Input.Group>
  );
};

const A = () => {
  const [value, setValue] = useState({});

  const handleSubmit = (v) => {
    console.log('submit', v);
  };

  const handleChange = (v) => {
    console.log('onChange', v);
    setValue(v);
  };

  const handleReset = () => {};

  // 模拟调用接口后，把 Form.FieldSed 的 defaultValue 字段值干掉，换句话说让首次初始化白干了
  const initValue = () => {
    setTimeout(() => {
      setValue({ b: '233' });
      console.log('init complated');
    }, 3000);
  };

  useEffect(() => {
    initValue();
  }, []);

  return (
    <div>
      <Form value={value} onChange={handleChange} onReset={handleReset} onSubmit={handleSubmit}>
        <Form.Item label='a'>
          <Form.FieldSet name='a' defaultValue={[{}]}>
            {() => {
              return (
                <div>
                  <Input name='a1'></Input>
                  <Input name='a2'></Input>
                </div>
              );
            }}
          </Form.FieldSet>
        </Form.Item>

        <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
          <Form.Submit>Submit</Form.Submit>
          <Form.Reset>Reset</Form.Reset>
        </Form.Item>
      </Form>
    </div>
  );
};

const B = () => {
  const [value, setValue] = useState({
    nameObj: {
      firstName: 'Harry1',
      lastName: 'Potter2',
    },
  });

  const handleSubmit = (v) => {
    console.log('submit', v);
  };

  const handleChange = (v) => {
    console.log(v);
    setValue(v);
  };

  const handleReset = () => {};

  return (
    <div>
      <Form value={value} onChange={handleChange} onReset={handleReset} onSubmit={handleSubmit}>
        <Form.Field name={['nameObj.firstName', 'nameObj.lastName']}>
          <NameInput />
        </Form.Field>

        <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
          <Form.Submit>Submit</Form.Submit>
          <Form.Reset>Reset</Form.Reset>
        </Form.Item>
      </Form>
    </div>
  );
};

const C = () => {
  const [value, setValue] = useState({
    formValue: {
      email: '',
      password: '',
    },
  });

  const rules = Rule({
    isDisabled: (v, formV, callback, p) => {
      console.log('rule', formV);
      callback(true);
    },
  });

  return (
    <Form
      labelWidth={65}
      value={value}
      onChange={(v) => {
        setValue(v);
      }}
    >
      <Form.Item label='Email'>
        <Input
          name='formValue.email'
          clearable
          rules={[
            rules.required,
            (_, formData, cb) => {
              console.log('formData', formData);
              cb(true);
            },
          ]}
        />
      </Form.Item>

      <Form.Item label='Password'>
        <Input name='formValue.password' type='password' clearable />
      </Form.Item>

      <Form.Item>
        <DatePicker rules={[rules.isDisabled]} range name={['start', 'end']}></DatePicker>
      </Form.Item>
    </Form>
  );
};

export default () => {
  return (
    <>
      <A></A>
      <Divider></Divider>
      <B></B>
      <Divider></Divider>
      <C></C>
    </>
  );
};
