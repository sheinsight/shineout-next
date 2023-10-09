import { Alert } from '@sheinx/base';
import { useAlertStyle } from '@sheinx/shineout-style';
import { AlertProps } from './alert.type';

const jssStyle = {
  alert: useAlertStyle,
};
export default (props: AlertProps) => {
  return <Alert {...props} jssStyle={jssStyle} />;
};
