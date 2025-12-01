import { useState } from 'react';
import { util } from '@sheinx/hooks';
import ModalContent from './modal-content';
import Button from '../button/button';
import { getLocale, useConfig } from '../config';
import { getRoot } from '../absolute-list/use-container';

import type { ModalJssStyle } from './modal.type';
import type { ModalOptions } from './modal-func.type';

const modals = new Set<HTMLElement>();
const destroy = (root: HTMLElement | null) => {
  if (!root) return;
  util.ReactUnmount(root);
  if (root && root.parentElement) {
    root.parentElement.removeChild(root);
  }
  modals.delete(root);
};

export const closeAll = () => {
  modals.forEach((modal) => {
    destroy(modal);
  });
};

const closeCallback = (fn: any, close: () => void, setLoading?: (l: boolean) => void) => () => {
  let callback;
  if (fn) callback = fn();
  if (callback && typeof callback.then === 'function') {
    if (setLoading) setLoading(true);
    callback
      .then(() => {
        close();
      })
      .catch(() => {
        if (setLoading) setLoading(false);
      });
  } else {
    close();
  }
};

interface FooterBtnOptions {
  jssStyle: ModalJssStyle;
  destroy: () => void;
  onOk: ModalOptions['onOk'];
  onCancel: ModalOptions['onCancel'];
  text: ModalOptions['text'];
  id: string;
  autoFocus?: boolean;
  type?: string;
}

const LoadingOk = (props: FooterBtnOptions) => {
  const { locale } = useConfig();
  const [loading, setLoading] = useState(false);
  const callback = closeCallback(props.onOk, props.destroy, setLoading);
  return (
    <Button
      autoFocus={props.autoFocus}
      type={props.type === 'error' ? 'danger' : 'primary'}
      jssStyle={props.jssStyle}
      loading={loading}
      onClick={callback}
    >
      {getLocale(locale, 'ok', props.text)}
    </Button>
  );
};
type MethodType = 'info' | 'warning' | 'error' | 'confirm' | 'show' | 'success';

const BtnCancel = (option: FooterBtnOptions) => {
  const onClick = closeCallback(option.onCancel!, option.destroy);
  const { locale } = useConfig();
  return (
    <Button
      autoFocus={option.autoFocus}
      mode='outline'
      id={`${option.id}-cancel`}
      key='cancel'
      onClick={onClick}
      jssStyle={option.jssStyle}
    >
      {getLocale(locale, 'cancel', option.text)}
    </Button>
  );
};

const method =
  (type: MethodType, jssStyle: ModalJssStyle) => (options: Omit<ModalOptions, 'jssStyle'>) => {
    const id = util.getUidStr();
    let innerClose: () => void;
    const root = getRoot({ container: options.container });
    if (!root) return;
    const destroyModal = () => {
      if (innerClose) innerClose();
      setTimeout(() => {
        destroy(root);
      }, 300);
    };
    modals.add(root);
    const btnOptions = {
      jssStyle,
      destroy: destroyModal,
      onOk: options.onOk,
      onCancel: options.onCancel,
      text: options.text,
      id,
    };

    const ok = (
      <LoadingOk
        {...btnOptions}
        type={type}
        autoFocus={options.autoFocusButton === 'ok'}
        key='ok'
      />
    );
    const cancel = (
      <BtnCancel {...btnOptions} autoFocus={options.autoFocusButton === 'cancel'} key='cancel' />
    );
    const footer =
      type === 'confirm' ? [cancel, ok] : options.footer !== undefined ? options.footer : [ok];
    const Content = (
      <ModalContent
        {...options}
        autoShow
        jssStyle={jssStyle}
        type={type as any}
        footer={footer}
        shouldDestroy={(can) => {
          if (can) destroyModal();
        }}
        setInnerClose={(close) => {
          innerClose = close;
        }}
      >
        {options.content || options.children}
      </ModalContent>
    );
    util.ReactRender(Content, root);
    return destroyModal;
  };

export default {
  type: method,
  closeAll,
};
