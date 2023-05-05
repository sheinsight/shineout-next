import { Input } from '@shined/ui';
import { useInputStyle } from '@shined/shineout-style';
export default () => {
  const jssStyle = useInputStyle();
  return (
    <div>
      <Input
        jssStyle={jssStyle}
        onChange={(v) => {
          console.log('input onchange', v);
        }}
        clearable
        placeholder='Username'
        status={'error'}
      />
    </div>
  );
};
