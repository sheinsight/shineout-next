import { useMemo } from 'react';
import { Alert } from '@sheinx/base';
import { useAlertStyle } from '@sheinx/shineout-style';
import { AlertProps } from './alert.type';

export default (props: AlertProps) => {
  const alertStyle = useAlertStyle();
  const jssStyle = useMemo(() => ({ alert: alertStyle }), [alertStyle]);

  return <Alert {...props} jssStyle={jssStyle} />;
};
