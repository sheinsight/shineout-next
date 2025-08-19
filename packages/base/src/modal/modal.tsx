import ReactDom from 'react-dom';
import { useEffect, useState, useRef } from 'react';
import ModalContent from './modal-content';
import { ModalProps } from './modal.type';
import useContainer from '../absolute-list/use-container';
import { util } from '@sheinx/hooks';

const { devUseWarning } = util;

const Modal = (props: ModalProps) => {
  // inject jssStyle
  props.jssStyle?.modal?.();

  if (props.maskOpacity) {
    devUseWarning.deprecated('maskOpacity', 'maskBackground', 'Modal');
  }
  const { getRoot, unMount } = useContainer({
    container: props.container,
    containerClassName: props.containerClassName
  });
  const [canDestroy, seCanDestroy] = useState(true);
  const { current: context } = useRef({ rendered: false });

  const destroyed = props.destroy && !props.visible && canDestroy;
  useEffect(() => {
    if (destroyed) {
      unMount();
    }
  }, [destroyed]);

  if (destroyed) {
    return null;
  }
  if (!context.rendered && !props.visible) {
    return null;
  }
  context.rendered = true;

  const Content = <ModalContent {...props} shouldDestroy={seCanDestroy} autoShow={false} />;
  const root = getRoot();
  if (!root) return null;
  return ReactDom.createPortal(Content, root);
};

export default Modal;
