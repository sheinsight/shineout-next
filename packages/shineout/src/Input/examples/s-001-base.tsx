import { Input } from 'shineout';
export default () => {
  return (
    <div>
      <Input
        onChange={(v) => {
          console.log('input onchange', v);
        }}
        clearable
        placeholder='email'
      />
    </div>
  );
};
