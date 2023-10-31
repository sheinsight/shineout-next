import React, { useState } from 'react';
import classNames from 'classnames';
import { AlertClasses, AlertProps } from './alert.type';
import Icons from '../icons';

const HIDE = 0;
const SHOW = 1;
const PENDING = 2;

const Alert = (props: AlertProps) => {
  const {
    jssStyle,
    type = 'warning',
    className,
    children,
    icon,
    title,
    iconSize,
    closable,
    hideClose,
    bordered,
    closeItem,
    onClose,
    ...rest
  } = props;
  const [dismiss, setDismiss] = useState(SHOW);

  const icons = {
    info: Icons.PcInfoCircleFill,
    success: Icons.PcCheckCircleFill,
    warning: Icons.PcWarningCircleFill,
    danger: Icons.PcCloseCircleFill,
    confirmwarning: Icons.PcWarningCircleFill,
  };
  const alertStyle = jssStyle?.alert?.() || ({} as AlertClasses);
  const rootClass = classNames(className, alertStyle.alert, {
    [alertStyle[type]]: true,
    [alertStyle.widthTitle]: title,
    [alertStyle.pending]: dismiss === PENDING,
    [alertStyle.noBordered]: bordered === false,
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
    const style: { width?: number } = {};
    if (iconSize) {
      style.width = iconSize;
    }
    if (icon === true) {
      return (
        <div className={alertStyle.icon} style={style}>
          {icons[type]}
        </div>
      );
    }

    return (
      <div className={alertStyle.icon} style={style}>
        {icon}
      </div>
    );
  };

  const renderTitle = () => {
    return <div className={alertStyle.title}>{title}</div>;
  };

  const renderClose = () => {
    if (React.isValidElement(closeItem))
      return React.cloneElement(closeItem, { onClick: handleClose } as React.Attributes);
    return (
      <div className={alertStyle.close} onClick={handleClose}>
        {closeItem || Icons.AlertClose}
      </div>
    );
  };

  if (dismiss === HIDE) {
    return null;
  }

  if ('title' in props && title !== undefined) {
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
