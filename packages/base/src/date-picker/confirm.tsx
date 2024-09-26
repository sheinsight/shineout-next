
import React from 'react';
import { getLocale, useConfig } from '../config';
import Button from '../button';

import type { ConfirmProps } from './confirm.type';

const Confirm = (props: ConfirmProps) => {
  const { jssStyle, closeByConfirm } = props;
  const styles = jssStyle?.datePicker?.();
  const { locale } = useConfig();

  return (
    <div className={styles?.pickerFooterConfirm}>
      <Button
        size={'small'}
        type="primary"
        jssStyle={jssStyle}
        className={styles?.pickerFooterBtn}
        onClick={closeByConfirm}
      >
        {getLocale(locale, 'ok')}
      </Button>
    </div>
  );
};

export default Confirm;
