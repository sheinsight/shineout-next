import React, { useState } from 'react';
import classNames from 'classnames';
import { AlertClasses, AlertProps } from './alert.type';
import Icons from '../icons';
import AlertIcon from './alert-icon';
import { util } from '@sheinx/hooks';

const { devUseWarning } = util;

const HIDE = 0;
const SHOW = 1;
const PENDING = 2;

const Alert = (props: AlertProps) => {
  const {
    jssStyle,
    type: typeProp = 'warning',
    className,
    children,
    icon,
    title,
    titleStyle,
    iconSize,
    closable,
    hideClose,
    bordered,
    closeItem,
    onClose,
    ...rest
  } = props;
  if (props.hideClose) {
    devUseWarning.deprecated('hideClose', 'closable', 'Alert');
  }

  const [dismiss, setDismiss] = useState(SHOW);
  const getType = () => {
    if (typeProp === 'error') {
      return 'danger';
    }
    return typeProp;
  };

  const type = getType();

  const alertStyle = jssStyle?.alert?.() || ({} as AlertClasses);
  const rootClass = classNames(className, alertStyle.rootClass, alertStyle.alert, {
    [alertStyle[type]]: true,
    [alertStyle.withTitle]: title,
    [alertStyle.pending]: dismiss === PENDING,
    [alertStyle.noBordered]: bordered === false,
    [alertStyle.noChildren]: !children,
  });

  const getRootProps = () => {
    return rest;
  };
  // 兼容 onClose 允许开启关闭按钮
  const getCloseable = () => {
    if ('closable' in props && closable !== undefined) return closable;

    // 2.x 逻辑
    if (onClose && !hideClose) {
      return true;
    }
  };

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClose && typeof onClose === 'function') {
      onClose(e);
    }
    if (closable === 'only') return;
    setDismiss(PENDING);

    setTimeout(() => {
      setDismiss(HIDE);
    }, 300);
  };

  const renderIcon = () => {
    const style: React.CSSProperties = titleStyle || {}
    if (iconSize) {
      style.width = iconSize;
    }
    if (icon === true) {
      return <AlertIcon jssStyle={props.jssStyle} style={style} type={props.type} />;
    }

    return (
      <div className={alertStyle.icon} style={style}>
        {icon}
      </div>
    );
  };

  const renderTitle = () => {
    return <div className={alertStyle.title} style={titleStyle}>{title}</div>;
  };

  const renderClose = () => {
    if (React.isValidElement(closeItem))
      return React.cloneElement(closeItem, { onClick: handleClose } as React.Attributes);
    return (
      <div className={alertStyle.closeWrapper}>
        <div className={alertStyle.close} onClick={handleClose}>
          {closeItem || Icons.alert.Close}
        </div>
      </div>
    );
  };

  if (dismiss === HIDE) {
    return null;
  }
  if (title) {
    return (
      <div className={rootClass} {...getRootProps()}>
        {icon && renderIcon()}
        <div className={alertStyle.content}>
          {renderTitle()}
          <div className={alertStyle.text}>{children}</div>
        </div>

        {getCloseable() && renderClose()}
      </div>
    );
  }

  return (
    <div className={rootClass} {...getRootProps()}>
      {icon && renderIcon()}
      <div className={alertStyle.content}>
        <div className={alertStyle.text}>{children}</div>
      </div>
      {getCloseable() && renderClose()}
    </div>
  );
};

export default Alert;
