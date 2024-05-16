import ReactDom from 'react-dom';
import { useEffect, useState, useRef } from 'react';
import ModalContent from './modal-content';
import { ModalProps } from './modal.type';
import useContainer from '../absolute-list/use-container';

const Modal = (props: ModalProps) => {
  const { getRoot, unMount } = useContainer({
    container: props.container,
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
  if (!getRoot()) return null;
  return ReactDom.createPortal(Content, getRoot()!);
};

export default Modal;
