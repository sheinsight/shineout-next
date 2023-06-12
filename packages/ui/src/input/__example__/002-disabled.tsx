import { Input } from '@sheinx/ui';
import { useInputStyle } from '@sheinx/shineout-style';
export default () => {
  const jssStyle = useInputStyle();
  return (
    <div>
      <Input jssStyle={jssStyle} disabled />
    </div>
  );
};
