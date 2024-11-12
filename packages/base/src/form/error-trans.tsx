import React from 'react';
import { util } from '@sheinx/hooks';
import { useConfig, getLocale } from '../config';
const ErrorTrans = (props: { error: Error }) => {
  const { error } = props;
  let e = error;
  if (util.isArray(error)) {
    error.forEach((err: Error) => {
      if (Object.values(err)[0]) e = Object.values(err)[0];
    });
  }
  const msg = e.message;
  //@ts-ignore
  const po = e.props || {};
  const { locale } = useConfig();
  if (msg.startsWith('$rules.')) {
    const rulelocale = msg.replace('$', '');
    const message = getLocale(locale, rulelocale);
    return <>{util.substitute(message, po)}</>;
  }
  return <>{msg}</>;
};

export default ErrorTrans;
