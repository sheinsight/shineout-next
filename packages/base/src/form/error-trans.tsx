import React from 'react';
import { util } from '@sheinx/hooks';
import { useConfig, getLocale } from '../config';
const ErrorTrans = (props: { error: Error }) => {
  const { error } = props;
  const msg = error.message;
  //@ts-ignore
  const po = error.props || {};

  const { locale } = useConfig();
  if (msg.startsWith('$rules.')) {
    const rulelocale = msg.replace('$', '');
    const message = getLocale(locale, rulelocale);
    return <>{util.substitute(message, po)}</>;
  }
  return <>{msg}</>;
};

export default ErrorTrans;
