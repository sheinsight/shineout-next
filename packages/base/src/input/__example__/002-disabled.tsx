import { Input } from '@sheinx/base';
import { useInputStyle } from '@sheinx/shineout-style';

export default () => {
  const style = useInputStyle();
  return (
    <div>
      <Input jssStyle={{ input: style }} disabled />
    </div>
  );
};
