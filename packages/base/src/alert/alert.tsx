import React, { useState } from 'react';
import classNames from 'classnames';
import { AlertClasses, AlertClassNamesInfo, AlertProps, AlertSemanticKey } from './alert.type';
import Icons from '../icons';
import AlertIcon from './alert-icon';
import { util } from '@sheinx/hooks';
import { useSemantic } from '../common';
import { useConfig } from '../config';

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
    iconClassName,
    title,
    titleStyle,
    iconSize,
    closable,
    hideClose,
    bordered,
    closeItem,
    onClose,
    classNames: classNamesProp,
    styles: stylesProp,
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

  // Semantic DOM
  const config = useConfig();
  const semInfo: AlertClassNamesInfo = { type: type as AlertClassNamesInfo['type'] };
  const [semClass, semStyle] = useSemantic<AlertSemanticKey, AlertClassNamesInfo>(
    classNamesProp,
    stylesProp,
    config.alert,
    semInfo,
  );

  const rootClass = classNames(className, alertStyle.rootClass, alertStyle.alert, {
    [alertStyle[type]]: true,
    [alertStyle.withTitle]: title,
    [alertStyle.pending]: dismiss === PENDING,
    [alertStyle.noBordered]: bordered === false,
    [alertStyle.noChildren]: !children,
  }, semClass('root', []));

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
    const style: React.CSSProperties = { ...titleStyle, ...semStyle('icon') };
    if (iconSize) {
      style.width = iconSize;
    }
    if (icon === true) {
      return <AlertIcon jssStyle={props.jssStyle} style={style} type={props.type} className={classNames(iconClassName, semClass('icon', []))} />;
    }

    return (
      <div className={classNames(alertStyle.icon, semClass('icon', []))} style={style}>
        {icon}
      </div>
    );
  };

  const renderTitle = () => {
    return <div className={classNames(alertStyle.title, props.titleClassName, semClass('title', []))} style={{ ...titleStyle, ...semStyle('title') }}>{title}</div>;
  };

  const renderClose = () => {
    if (React.isValidElement(closeItem))
      return React.cloneElement(closeItem, { onClick: handleClose } as React.Attributes);
    return (
      <div className={alertStyle.closeWrapper}>
        <div className={classNames(alertStyle.close, semClass('close', []))} style={semStyle('close')} onClick={handleClose}>
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
      <div className={rootClass} style={semStyle('root')} {...getRootProps()}>
        {icon && renderIcon()}
        <div className={alertStyle.content}>
          {renderTitle()}
          <div className={classNames(alertStyle.text, semClass('content', []))} style={semStyle('content')}>{children}</div>
        </div>

        {getCloseable() && renderClose()}
      </div>
    );
  }

  return (
    <div className={rootClass} style={semStyle('root')} {...getRootProps()}>
      {icon && renderIcon()}
      <div className={alertStyle.content}>
        <div className={classNames(alertStyle.text, semClass('content', []))} style={semStyle('content')}>{children}</div>
      </div>
      {getCloseable() && renderClose()}
    </div>
  );
};

export default Alert;
