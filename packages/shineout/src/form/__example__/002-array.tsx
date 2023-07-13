/**
 * cn - 数组name
 *    --
 * en - 数组name
 *    --
 */
import { Form, Input } from 'shineout';
import { produce } from 'immer';

const NameInput = (props: any) => {
  const { value, onChange } = props;

  const handleLastName = (v: string | undefined) => {
    const newValue = produce(props.value, (draft: any[]) => {
      draft[1] = v;
    });
    onChange(newValue);
  };
  const handleFirstName = (v: string | undefined) => {
    const newValue = produce(props.value, (draft: any[]) => {
      draft[0] = v;
    });
    onChange(newValue);
  };

  return (
    <div>
      <Input value={value![0]} width={120} onChange={handleFirstName} />
      -
      <Input value={value![1]} width={120} onChange={handleLastName} />
    </div>
  );
};

export default () => {
  return (
    <div>
      <Form
        defaultValue={{ email: 'zhangsan@qq.com' }}
        onSubmit={(v) => {
          console.log('form submit', v);
        }}
        onChange={(v) => {
          console.log('form change', v);
        }}
        onReset={() => {
          console.log('form reset');
        }}
      >
        <Form.Item label='name'>
          <Form.Field
            rules={[
              (value: string | undefined, _: any, callback: any) => {
                console.log(value, _);
                if (!value) {
                  callback(new Error('name is required'));
                }
                if (value && value.length > 10) {
                  callback(new Error('name length must less than 10'));
                }
                callback(true);
              },
            ]}
            name={['first', 'last']}
          >
            <NameInput />
          </Form.Field>
        </Form.Item>
        <Form.Item label='email'>
          <Input name={'email'} clearable placeholder='please input email' />
        </Form.Item>

        <button type={'submit'}>提交</button>
        <button type={'reset'}>重置</button>
      </Form>
    </div>
  );
};
