import { ModalSubmit } from '@sheinx/base';
import { useButtonStyle } from '@sheinx/shineout-style';
import { ButtonProps } from '../button/button.type';

const jssStyle = {
  button: useButtonStyle,
};

const Submit = (props: ButtonProps) => {
  return <ModalSubmit jssStyle={jssStyle} {...props} />;
};

export default Submit;
