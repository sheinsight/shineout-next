import React, { useState } from 'react';
import Popover from './popover';
import Alert from '../alert';
import Button from '../button';
import { getLocale, useConfig } from '../config';
import { ConfirmProps } from './confirm.type';

const Confirm = (props: ConfirmProps) => {
  const [ok, setOk] = useState(false);
  const [cancel, setCancel] = useState(false);
  const { locale } = useConfig();

  const handleOk = (close: () => void) => {
    const { onOk } = props;
    let callback: Promise<any> | void;
    if (onOk) callback = onOk();
    if (callback && typeof callback.then === 'function') {
      setOk(true);
      (callback as Promise<any>).then(() => {
        close();
        setOk(false);
      });
    } else {
      close();
    }
  };

  const handleCancel = (close: () => void) => {
    const { onCancel } = props;
    let callback: Promise<any> | void;
    if (onCancel) callback = onCancel();
    if (callback && typeof callback.then === 'function') {
      setCancel(true);
      (callback as Promise<any>).then(() => {
        close();
        setCancel(false);
      });
    } else {
      close();
    }
  };

  const {
    children,
    type = 'confirmwarning',
    text,
    onOk: _ok,
    okType = 'danger',
    onCancel: _cancel,
    icon = true,
    jssStyle,
    title,
    ...other
  } = props;
  return (
    <Popover {...other} trigger='click' jssStyle={jssStyle}>
      {(close) => (
        <div className={jssStyle?.popover?.confirm}>
          <div className={jssStyle?.popover?.mention}>
            <Alert
              jssStyle={jssStyle}
              type={type as any}
              title={title}
              icon={icon}
              className={jssStyle?.popover?.mention}
            >
              {children}
            </Alert>
          </div>

          <div className={jssStyle?.popover?.footer}>
            <Button
              jssStyle={jssStyle}
              loading={cancel}
              mode={'outline'}
              size='small'
              onClick={() => {
                handleCancel(close);
              }}
            >
              {getLocale(locale, 'cancel', text)}
            </Button>
            <Button
              jssStyle={jssStyle}
              loading={ok}
              size='small'
              type={okType}
              onClick={() => {
                handleOk(close);
              }}
            >
              {getLocale(locale, 'ok', text)}
            </Button>
          </div>
        </div>
      )}
    </Popover>
  );
};

export default Confirm;
