/**
 * cn - 测试FieldSet销毁
 *    -- 调试用的，在这个例子基础上随便改吧
 * en - Test Form
 *    -- Test Form
 */
import { useEffect, useRef } from 'react';
import { Button, Form, Input } from 'shineout';

const CustomInput = (props) => {
  useEffect(() => {
    return () => {
      console.count('destroy');
    };
  }, []);
  return <Input {...props} />;
};


const AA = () => {
  const formRef = useRef();

  return (
    <>
      <Button onClick={() => formRef.current.set({ list: [{ a: 1 }] })}>set form value</Button>
      <Form
        formRef={(ref) => {
          formRef.current = ref;
        }}
      >
        <Form.FieldSet name='list'>
          {({}) => (
            <Form.Field name='a'>
              <CustomInput />
            </Form.Field>
          )}
        </Form.FieldSet>
      </Form>
    </>
  );
};

export default AA;
