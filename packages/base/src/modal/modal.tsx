import ReactDom from 'react-dom';
import { useCallback, useEffect, useState, useRef } from 'react';
import ModalContent from './modal-content';
import { ModalProps } from './modal.type';
import useContainer from '../absolute-list/use-container';
import { util } from '@sheinx/hooks';
import { useConfig } from '../config';
import { useWatermarkTarget } from '../watermark/context';

const { devUseWarning } = util;

const WatermarkPortalTarget = ({ root }: { root: HTMLElement }) => {
  const getTarget = useCallback(() => root.firstElementChild as HTMLElement | null, [root]);
  useWatermarkTarget(getTarget);
  return null;
};

const Modal = (props: ModalProps) => {
  // inject jssStyle
  props.jssStyle?.modal?.();

  if (props.maskOpacity) {
    devUseWarning.deprecated('maskOpacity', 'maskBackground', 'Modal');
  }
  const { getRoot, unMount } = useContainer({
    container: props.container,
    containerClassName: props.containerClassName,
  });
  const [canDestroy, seCanDestroy] = useState(true);
  const { current: context } = useRef({ rendered: false });
  const config = useConfig();

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

  const isRtl = config.direction === 'rtl';
  let position = props.position;
  if (isRtl) {
    if (position === 'left') {
      position = 'right';
    } else if (position === 'right') {
      position = 'left';
    }
  }

  const Content = (
    <ModalContent {...props} shouldDestroy={seCanDestroy} autoShow={false} position={position} />
  );
  const root = getRoot();
  if (!root) return null;
  return ReactDom.createPortal(
    <>
      {Content}
      <WatermarkPortalTarget root={root} />
    </>,
    root,
  );
};

export default Modal;
