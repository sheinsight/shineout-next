import classNames from 'classnames';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import AlertIcon, { AlertIconMap } from '../alert/alert-icon';
import Icons from '../icons';
import { util } from '@sheinx/hooks';
import { create } from '@shined/reactive';
import { useDragMove, useDragResize, usePersistFn, useRender } from '@sheinx/hooks';
import { FormFooterProvider } from '../form/form-footer-context';

import type { ModalContentProps } from './modal-content.type';

let hasMask = false;

type OriginDocumentStyle = null | {
  overflow: string;
  paddingRight: string;
}

type CascadeConfig = {
  instanceId: string;
  cascadeWidth: number;
  cascade: boolean;
  position?: ModalContentProps['position'];
}
interface ModalConfig {
  instanceIds: string[];
  cascadeConfigs: CascadeConfig[];
  originDocumentStyle: OriginDocumentStyle,
}

const config = {
  instanceIds: [],
  cascadeConfigs: [],
  originDocumentStyle: null,
}
const state = create<ModalConfig>(config);

const useModalConfig = () => {
  return state.useSnapshot();
};

const addModalInstance = (instanceId: string) => {
  state.mutate.instanceIds.push(instanceId)
}

const addModalCascadeConfig = (options: CascadeConfig) => {
  state.mutate.cascadeConfigs.push({
    cascade: options.cascade,
    cascadeWidth: options.cascadeWidth,
    instanceId: options.instanceId,
    position: options.position,
  });
}

const removeModalInstance = (instanceId: string) => {
  state.mutate.instanceIds = state.mutate.instanceIds.filter((id) => id !== instanceId)
}

const removeModalCascadeConfig = (instanceId: string) => {
  if (!state.mutate.cascadeConfigs.length) return;
  state.mutate.cascadeConfigs = state.mutate.cascadeConfigs.filter((config) => config.instanceId !== instanceId)
}

const getInstanceIds = () => {
  return state.mutate.instanceIds;
}

const setOriginDocumentStyle = (style: OriginDocumentStyle) => {
  state.mutate.originDocumentStyle = style;
}

const getOriginDocumentStyle = () => {
  return state.mutate.originDocumentStyle;
}

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

if (util.isBrowser()) {
  document.addEventListener('click', getClickPosition, true);
}

const Modal = (props: ModalContentProps) => {
  const modalClasses = props.jssStyle?.modal?.();
  const panelRef = useRef<HTMLDivElement>(null);

  const isPositionX = ['left', 'right'].includes(props.position || '');
  const isPositionY = ['top', 'bottom'].includes(props.position || '');

  const defaultWidth = isPositionX ? 'auto' : 500;
  const { events = {}, maskCloseAble = true, esc = true, top = '10vh', style = {} } = props;

  const width = style.width || props.width || defaultWidth;
  const height = style.height || props.height;
  const [origin, setOrigin] = useState('');
  const { current: context } = useRef({
    renderEd: false,
    isMask: false,
    mouseDownTarget: null as HTMLElement | null,
    mouseUpTarget: null as HTMLElement | null,
    content: null as React.ReactNode,
    instanceId: util.generateUUID(),
  });

  const config = useModalConfig();

  const [animation, setAnimation] = useState(props.visible || props.autoShow);
  const [visible, setVisible] = useState(props.visible || props.autoShow);

  const moveInfo = useDragMove();

  const resizeInfo = useDragResize({
    defaultWidth: width,
    defaultHeight: height,
    panelRef,
  });

  const showMask = useMemo(() => {
    if (props.forceMask) return config.instanceIds.includes(context.instanceId)
    return config.instanceIds[0] === context.instanceId
  }, [config.instanceIds, props.forceMask])

  const rerender = useRender();
  const handleMaskVisible = () => {
    // 多个moal 只有第一个显示的时候才显示遮罩
    // context.isMask 用来判断是否是第一个显示的modal
    if (visible && !hasMask) {
      context.isMask = true;
      hasMask = true;

      rerender();
    }
  };

  useEffect(() => {
    const index = config.instanceIds.indexOf(context.instanceId);

    if (visible && index === -1) {
      addModalInstance(context.instanceId);
      addModalCascadeConfig({
        instanceId: context.instanceId,
        position: props.position,
        cascade: !!props.cascade && !!isPositionX,
        cascadeWidth: typeof props.cascade === 'object' ? (props.cascade.width || 180) : 180,
      });
    }

    if (!visible && index > -1 && !animation) {
      removeModalInstance(context.instanceId);
      removeModalCascadeConfig(context.instanceId);
    }
  }, [visible, props.position, animation, config.instanceIds])

  useEffect(handleMaskVisible, [visible]);

  const updateOrigin = () => {
    // 更新transform-origin
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
    removeModalCascadeConfig(context.instanceId)
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
    if (!props.autoShow) {
      setVisible(!!props.visible);
      setAnimation(true);
    }
  }, [props.visible]);

  const originDocumentStyle = getOriginDocumentStyle();

  // 设置 document.body.style.overflow 和 document.body.style.paddingRight，并记录原始值到 context 中
  const setDocumentOverflow = usePersistFn(() => {
    const doc = document.body.parentNode! as HTMLElement;
    if (context.isMask && !originDocumentStyle) {
      setOriginDocumentStyle({
        overflow: doc.style.overflow,
        paddingRight: doc.style.paddingRight,
      })
    }
    doc.style.overflow = 'hidden';
    if (!doc.style.paddingRight) {
      doc.style.paddingRight = `${window.innerWidth - util.docSize.width}px`;
    }
  })

  // 还原 document.body.style.overflow 和 document.body.style.paddingRight
  const resetDocumentOverflow = usePersistFn(() => {
    const doc = document.body.parentNode! as HTMLElement;
    // 把originDocumentStyle放到全局管理后，多个modal连续打开关闭场景下，可以正确还原
    if (originDocumentStyle) {
      doc.style.overflow = originDocumentStyle.overflow;
      doc.style.paddingRight = originDocumentStyle.paddingRight;
    }
  })

  useEffect(() => {
    if (!props.hideMask) {
      if (visible) {
        setDocumentOverflow();
      } else {
        if (config.instanceIds.length === 0) resetDocumentOverflow();
      }
    }
  }, [visible, config.instanceIds]);

  const canDestroy = !visible && !animation;
  useEffect(() => {
    // notify parent destroy
    props.shouldDestroy?.(canDestroy);
  }, [canDestroy]);

  useEffect(() => {
    // unmount
    return () => {
      removeModalInstance(context.instanceId)
      removeModalCascadeConfig(context.instanceId);
      const instanceIds = getInstanceIds();
      if (instanceIds.length === 0) {
        resetDocumentOverflow();
      }
      props.shouldDestroy?.(true);
      if (context.isMask) {
        context.isMask = false;
        hasMask = false;
      }
    };
  }, []);

  useEffect(() => {
    if (props.setInnerClose) {
      props.setInnerClose(() => {
        setVisible(false);
      });
    }
  }, [props.setInnerClose]);

  // render
  const renderIcon = (isEmptyTitle?: boolean) => {
    const iconRoot = classNames(modalClasses?.headerIcon, isEmptyTitle && modalClasses?.emptyIcon);

    return <AlertIcon jssStyle={props.jssStyle} type={props.type} className={iconRoot} />;
  };
  const renderHeader = () => {
    let showCloseIcon = maskCloseAble === null || !!maskCloseAble;
    if (props.hideClose !== undefined) {
      showCloseIcon = !props.hideClose;
    }

    const isEmptyTitle = !props.title && props.title !== 0;

    if (isEmptyTitle) {
      const closeRoot = classNames(modalClasses?.headerClose, modalClasses?.emptyClose);

      return (
        <>
          {renderIcon(isEmptyTitle)}
          {showCloseIcon && (
            <div className={closeRoot} onClick={handleClose}>
              {Icons.modal.Close}
            </div>
          )}
        </>
      );
    }

    return (
      <div
        className={modalClasses?.header}
        onMouseDown={props.moveable && !props.fullScreen ? moveInfo.handleMouseDown : undefined}
        style={props.headerStyle}
      >
        {renderIcon()}
        <div className={modalClasses?.headerTitle}>{props.title}</div>
        {showCloseIcon && (
          <div className={modalClasses?.headerClose} onClick={handleClose}>
            {Icons.modal.Close}
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
    if (!props.footer) return null;
    return <div className={modalClasses?.footer} style={props.footerStyle}>{props.footer}</div>;
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

  const cascadeStyle = useMemo(() => {
    if (!props.cascade) return;
    let instance = 0;
    const curCascadeConfig = config.cascadeConfigs.find(c => c.instanceId === context.instanceId);
    const samePositionConfigs = config.cascadeConfigs.filter(c => c.position === curCascadeConfig?.position);
    const currentIndex = samePositionConfigs.findIndex(c => c.instanceId === context.instanceId);
    if(curCascadeConfig && currentIndex < samePositionConfigs.length - 1) {
      instance = curCascadeConfig.cascadeWidth;
    }

    return {
      transform: props.position === 'left' ? `translateX(${instance}px)` : `translateX(-${instance}px)`,
      transition: instance ? 'transform 0.3s ease 0.05s' : 'transform 0.2s ease',
    }
  }, [config.cascadeConfigs, config.instanceIds])

  if (!context.renderEd && !visible) return null;

  context.renderEd = true;

  const panelStyle: React.CSSProperties = {
    transformOrigin: origin,
    top: props.fullScreen ? undefined : top,
    ...props.style,
    width: props.fullScreen ? undefined : width,
    height: props.fullScreen ? undefined : height,
    ...cascadeStyle,
  };
  if (props.resizable) {
    panelStyle.width = resizeInfo.width;
    panelStyle.height = resizeInfo.height;
  }

  if (isPositionX) {
    panelStyle.top = undefined;
    panelStyle.height = undefined;
  }
  if (isPositionY) {
    panelStyle.top = undefined;
    panelStyle.width = undefined;
  }
  if (props.moveable && !props.fullScreen) {
    panelStyle.transform = `translate(${moveInfo.pos.x}px, ${moveInfo.pos.y}px)`;
  }

  const renderContent = () => {
    if (!props.visible && context.content !== null) return context.content;

    return (
      <React.Fragment>
        {renderHeader()}
        {renderBody()}
        {renderFooter()}
        {renderResize()}
      </React.Fragment>
    );
  };

  const content = renderContent();

  context.content = content;

  return (
    <FormFooterProvider>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={classNames(
          props.rootClassName,
          modalClasses?.rootClass,
          modalClasses?.wrapper,
          animation && modalClasses?.wrapperAnimation,
          visible ? modalClasses?.wrapperShow : modalClasses?.wrapperHide,
          showMask && modalClasses?.wrapperIsMask,
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
        style={{ background: props.maskBackground, zIndex: props.zIndex, display: !visible && !animation ? 'none' : undefined }}
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
            {content}
          </div>
        </div>
      </div>
    </FormFooterProvider>
  );
};

export default Modal;
