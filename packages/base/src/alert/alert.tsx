import React, { useState } from 'react';
import classNames from 'classnames';
import { AlertProps, AlertClasses } from './alert.type';
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
    onClose,
    ...rest
  } = props;
  const [dismiss, setDismiss] = useState(SHOW);

  const icons = {
    info: Icons.Info,
    success: Icons.Success,
    warning: Icons.Warning,
    danger: Icons.Danger,
  };
  const alertStyle = jssStyle?.alert || ({} as AlertClasses);
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

  const Row = (props?: { children?: React.ReactNode }) => {
    return <div data-soui-layout='row' {...props}></div>;
  };

  const Cell = (props?: { children?: React.ReactNode }) => {
    return <div data-soui-layout='cell' {...props}></div>;
  };

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClose && typeof onClose === 'function') {
      onClose(e);
    }
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
        <Cell data-soui-icon>
          <div className={alertStyle.icon} style={style}>
            {icons[type]}
          </div>
        </Cell>
      );
    }

    return (
      <Cell data-soui-icon>
        <div className={alertStyle.icon} style={style}>
          {icon}
        </div>
      </Cell>
    );
  };

  const renderTitle = () => {
    return (
      <Cell>
        <div className={alertStyle.title}>{title}</div>
      </Cell>
    );
  };

  const renderClose = () => {
    return (
      <Cell data-soui-close>
        <div className={alertStyle.close} onClick={handleClose}>
          {Icons.AlertClose}
        </div>
      </Cell>
    );
  };

  const renderChildren = () => {
    return <Cell data-soui-children>{children}</Cell>;
  };

  if (dismiss === HIDE) {
    return null;
  }

  if ('title' in props && title !== undefined) {
    return (
      <div className={rootClass}>
        <Row>
          {icon && renderIcon()}
          {renderTitle()}
          {getCloseable() && renderClose()}
        </Row>

        <Row>
          {icon && Cell()}
          {renderChildren()}
        </Row>
      </div>
    );
  }

  return (
    <div className={rootClass} {...getRootProps()}>
      <Row>
        {icon && renderIcon()}
        {renderChildren()}
        {getCloseable() && renderClose()}
      </Row>
    </div>
  );
};

export default Alert;
