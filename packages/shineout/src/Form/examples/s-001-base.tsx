import { Input, Form } from 'shineout';
export default () => {
  return (
    <div>
      <Form
        defaultValue={{ email: 'spana@qq.com' }}
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
        <Input
          style={{ width: 300, margin: 10, display: 'inline-flex' }}
          name={'name'}
          clearable
          placeholder='please input name'
        />
        <Input
          style={{ width: 300, margin: 10, display: 'inline-flex' }}
          name={'email'}
          clearable
          placeholder='please input email'
        />

        <button type={'submit'}>提交</button>
        <button type={'reset'}>重置</button>
      </Form>
    </div>
  );
};
