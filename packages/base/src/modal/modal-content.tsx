import classNames from 'classnames';
import React, { useRef, useEffect, useState } from 'react';
import AlertIcon, { AlertIconMap } from '../alert/alert-icon';
import Icons from '../icons';
import { usePersistFn } from '@sheinx/hooks';
import { ModalFormProvider } from './modal-context';
import { useModalMove } from './use-modal-move';
import { useModalResize } from './use-modal-resize';

import type { ModalContentProps } from './modal-content.type';

let hasMask = false;

let mousePosition: { x: number; y: number } | null = null;

const getClickPosition: EventListener = (e: any) => {
  mousePosition = {
    x: e.clientX,
    y: e.clientY,
  };
  setTimeout(() => {
    mousePosition = null;
  }, 100);
};

document.addEventListener('click', getClickPosition, true);

const Modal = (props: ModalContentProps) => {
  const modalClasses = props.jssStyle?.modal?.();
  const panelRef = useRef<HTMLDivElement>(null);

  const isPositionX = ['left', 'right'].includes(props.position || '');
  const isPositionY = ['top', 'bottom'].includes(props.position || '');

  const defaultWidth = isPositionX ? 'auto' : 500;
  const {
    events = {},
    width = defaultWidth,
    maskCloseAble = true,
    esc = true,
    top = '10vh',
  } = props;
  const [origin, setOrigin] = useState('');
  const { current: context } = useRef({
    renderEd: false,
    isMask: false,
    mouseDownTarget: null as HTMLElement | null,
    mouseUpTarget: null as HTMLElement | null,
  });

  const [animation, setAnimation] = useState(props.visible || props.autoShow);
  const [visible, setVisible] = useState(props.visible || props.autoShow);

  const moveInfo = useModalMove();
  const resizeInfo = useModalResize({
    defaultWidth: width,
    defaultHeight: props.height,
    panelRef,
  });

  const handleMaskVisible = () => {
    // 多个moal 只有第一个显示的时候才显示遮罩
    // context.isMask 用来判断是否是第一个显示的modal
    if (visible && !hasMask) {
      context.isMask = true;
      hasMask = true;
    }
  };

  handleMaskVisible();

  const updateOrigin = () => {
    if (props.position || props.moveable || !props.zoom) return;
    if (!props.visible) return;
    if (!panelRef.current) return;
    const node = panelRef.current;
    if (mousePosition) {
      const { left, top } = node.getBoundingClientRect();
      const ol = mousePosition.x - left;
      const ot = mousePosition.y - top;
      setOrigin(`${ol}px ${ot}px`);
    } else {
      setOrigin('');
    }
  };

  const handleAnimationEnd = usePersistFn(() => {
    setAnimation(false);
    if (props.zoom && !visible) {
      setOrigin('');
    }
    if (!visible && context.isMask) {
      hasMask = false;
      context.isMask = false;
    }
  });

  const handleClose = usePersistFn(() => {
    if (!visible) return;
    if (props.autoShow) {
      setVisible(false);
      setAnimation(true);
    }
    props.onClose?.();
  });

  const handleMaskClick = (e: React.MouseEvent) => {
    if (e.currentTarget !== e.target) return;
    if (context.mouseDownTarget !== context.mouseUpTarget) return;
    if (maskCloseAble) {
      handleClose();
    }
  };

  const handleMaskMouseDown = (e: React.MouseEvent) => {
    context.mouseDownTarget = e.target as HTMLElement;
  };

  const handleMaskMouseUp = (e: React.MouseEvent) => {
    context.mouseUpTarget = e.target as HTMLElement;
  };

  // logic
  useEffect(() => {
    // bind esc events
    if (esc) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.keyCode === 27 || e.key === 'Escape') {
          handleClose();
        }
      };
      document.addEventListener('keydown', handleEsc);
      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    }
  }, []);

  useEffect(() => {
    // sync aniamtion
    if (props.autoShow) return;
    setVisible(!!props.visible);
    setAnimation(true);
  }, [props.visible]);

  const canDestroy = !visible && !animation;
  useEffect(() => {
    // notify parent destroy
    props.shouldDestroy?.(canDestroy);
  }, [canDestroy]);

  useEffect(() => {
    // unmount
    return () => {
      props.shouldDestroy?.(true);
      if (props.autoShow) {
        props.onClose?.();
      }
      if (context.isMask) {
        context.isMask = false;
        hasMask = false;
      }
    };
  }, []);

  // render

  const renderIcon = () => {
    return (
      <AlertIcon jssStyle={props.jssStyle} type={props.type} className={modalClasses?.headerIcon} />
    );
  };
  const renderHeader = () => {
    const showCloseIcon = maskCloseAble === null || !!maskCloseAble;
    return (
      <div
        className={modalClasses?.header}
        onMouseDown={props.moveable ? moveInfo.handleMouseDown : undefined}
      >
        {renderIcon()}
        <div className={modalClasses?.headerTitle}>{props.title}</div>
        {showCloseIcon && !props.hideClose && (
          <div className={modalClasses?.headerClose} onClick={handleClose}>
            {Icons?.Close}
          </div>
        )}
      </div>
    );
  };

  const renderBody = () => {
    const bodyStyle = {
      padding: props.padding,
      ...props.bodyStyle,
    };
    return (
      <div
        className={classNames(
          modalClasses?.body,
          props.type && !!AlertIconMap[props.type] && modalClasses?.bodyWithIcon,
        )}
        style={bodyStyle}
      >
        {props.children}
      </div>
    );
  };

  const renderFooter = () => {
    return <div className={modalClasses?.footer}>{props.footer}</div>;
  };

  const renderResize = () => {
    if (!props.resizable) return null;
    return (
      <>
        {!isPositionY && (
          <div
            className={modalClasses?.resizeX}
            data-position={props.position}
            onMouseDown={resizeInfo.handleXMouseDown}
          ></div>
        )}
        {!isPositionX && (
          <div
            className={modalClasses?.resizeY}
            data-position={props.position}
            onMouseDown={resizeInfo.handleYMouseDown}
          ></div>
        )}
        {!isPositionX && !isPositionY && (
          <div className={modalClasses?.resizeXY} onMouseDown={resizeInfo.handleXYMouseDown}></div>
        )}
      </>
    );
  };

  if (!context.renderEd && !visible) return null;

  context.renderEd = true;

  const panelStyle = {
    width: props.fullScreen ? undefined : resizeInfo.width,
    height: resizeInfo.height,
    transformOrigin: origin,
    top: props.fullScreen ? undefined : top,
    ...props.style,
  };

  if (isPositionX) {
    panelStyle.top = undefined;
    panelStyle.height = undefined;
  }
  if (isPositionY) {
    panelStyle.top = undefined;
    panelStyle.width = undefined;
  }
  if (props.moveable) {
    panelStyle.transform = `translate(${moveInfo.pos.x}px, ${moveInfo.pos.y}px)`;
  }

  return (
    <ModalFormProvider>
      <div
        className={classNames(
          props.rootClassName,
          modalClasses?.wrapper,
          animation && modalClasses?.wrapperAnimation,
          visible ? modalClasses?.wrapperShow : modalClasses?.wrapperHide,
          (context.isMask || props.forceMask) && modalClasses?.wrapperIsMask,
          props.fullScreen && modalClasses?.wrapperFullScreen,
          props.moveable && modalClasses?.wrapperMoveable,
          props.hideMask && modalClasses?.wrapperHideMask,
          props.zoom && !props.moveable && modalClasses?.wrapperZoom,
          (isPositionX || isPositionY) && modalClasses?.wrapperDrawer,
          props.position === 'left' && modalClasses?.wrapperDrawerLeft,
          props.position === 'right' && modalClasses?.wrapperDrawerRight,
          props.position === 'top' && modalClasses?.wrapperDrawerTop,
          props.position === 'bottom' && modalClasses?.wrapperDrawerBottom,
        )}
        onAnimationEnd={handleAnimationEnd}
        style={{ background: props.maskBackground, zIndex: props.zIndex }}
      >
        <div
          className={modalClasses?.mask}
          {...events}
          onMouseDown={handleMaskMouseDown}
          onMouseUp={handleMaskMouseUp}
          onClick={handleMaskClick}
          onAnimationStart={updateOrigin}
        >
          <div
            ref={panelRef}
            className={classNames(modalClasses?.panel, props.className)}
            style={panelStyle}
          >
            {renderHeader()}
            {renderBody()}
            {renderFooter()}
            {renderResize()}
          </div>
        </div>
      </div>
    </ModalFormProvider>
  );
};

export default Modal;
