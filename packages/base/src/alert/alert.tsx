import React, { useState } from 'react';
import classNames from 'classnames';
import { AlertClasses } from '@sheinx/shineout-style';
import { AlertProps } from './alert.type';
import Icons from '../icons';
import AlertIcon from './alert-icon';

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
    iconSize,
    closable,
    hideClose,
    bordered,
    closeItem,
    onClose,
    ...rest
  } = props;
  const [dismiss, setDismiss] = useState(SHOW);
  const getType = () => {
    if (typeProp === 'error') {
      return 'danger';
    }
    return typeProp;
  };

  const type = getType();

  const styles = jssStyle?.alert?.() || ({} as AlertClasses);
  const rootClass = classNames(className, styles.alert, {
    [styles[type]]: true,
    [styles.widthTitle]: title,
    [styles.pending]: dismiss === PENDING,
    [styles.noBordered]: bordered === false,
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
      return <AlertIcon jssStyle={props.jssStyle} style={style} type={props.type} />;
    }

    return (
      <div data-role='icon' className={styles.icon} style={style}>
        {icon}
      </div>
    );
  };

  const renderTitle = () => {
    return (
      <div data-role='title' className={styles.title}>
        {title}
      </div>
    );
  };

  const renderClose = () => {
    if (React.isValidElement(closeItem))
      return React.cloneElement(closeItem, {
        onClick: handleClose,
        'data-role': 'close',
      } as React.Attributes);
    return (
      <div data-role='close' className={styles.close} onClick={handleClose}>
        {closeItem || Icons.Close}
      </div>
    );
  };

  if (dismiss === HIDE) {
    return null;
  }

  if ('title' in props && title !== undefined) {
    return (
      <div data-role='alert' className={rootClass} {...getRootProps()}>
        {icon && renderIcon()}
        <div data-role='wrapper' className={styles.wrapper}>
          {renderTitle()}
          <div data-role='content' className={styles.content}>
            {children}
          </div>
        </div>

        {getCloseable() && renderClose()}
      </div>
    );
  }

  return (
    <div data-role='alert' className={rootClass} {...getRootProps()}>
      {icon && renderIcon()}
      <div data-role='wrapper' className={styles.wrapper}>
        <div data-role='content' className={styles.content}>
          {children}
        </div>
      </div>
      {getCloseable() && renderClose()}
    </div>
  );
};

export default Alert;
