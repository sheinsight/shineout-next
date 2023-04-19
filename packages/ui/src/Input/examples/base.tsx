import { Input } from '@shined/ui';
import { useInputStyle } from '@shined/shineout-style';
export default () => {
  const jssStyle = useInputStyle();
  return (
    <div>
      <Input
        jssStyle={jssStyle}
        onChange={(v) => {
          console.log(v);
        }}
        clearable
        placeholder='Username'
        style={{ marginBottom: 12 }}
      />
    </div>
  );
};
