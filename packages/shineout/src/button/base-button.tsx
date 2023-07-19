import { Button } from '@sheinx/base';
import { useButtonStyle } from '@sheinx/shineout-style';
import { BaseButtonProps } from './button.type';

export default (props: BaseButtonProps) => {
  const {} = props;
  const jssStyle = useButtonStyle();

  return (
    <Button
      jssStyle={jssStyle}
      // ...
    />
  );
};
