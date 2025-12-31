import React from 'react';
import classnames from 'clsx';
import { IconCompProps } from './icon.type';
import { util } from '@sheinx/hooks';

const { devUseWarning } = util;

function Icon(
  props: IconCompProps = {
    prefix: 'icon',
    fontFamily: 'iconfont',
    name: '',
    type: 'default',
  },
) {
  const { children, prefix, name, fontFamily, fontSize, ext, jssStyle, ...otherProps } = props;
  let { type } = props;
  if (type === 'default') {
    type = undefined;
  }
  const iconClasses = jssStyle?.icon?.();
  const className = classnames(
    iconClasses?.rootClass,
    iconClasses?.wrapper,
    iconClasses?.[type!],
    props.className,
    `${prefix}-${name}`,
  );

  const style = Object.assign(
    {},
    {
      fontFamily,
      fontSize,
    },
    props.style,
  );

  if (ext === 'js') {
    return (
      <i {...otherProps} className={className} style={style}>
        <svg className={iconClasses?.svg} aria-hidden='true'>
          <use xlinkHref={`#${prefix}-${name}`} />
        </svg>
      </i>
    );
  }

  return (
    <i {...otherProps} className={className} style={style}>
      {children}
    </i>
  );
}

const links: {
  [url: string]: boolean;
} = {};
const scripts: {
  [url: string]: HTMLScriptElement;
} = {};

function makeIcon(
  url: string,
  fontFamily = 'iconfont',
  prefix = 'icon',
): React.ComponentType<IconCompProps> {
  if (typeof url !== 'string') {
    devUseWarning.error(`Shineout Icon url must be a string, but get ${url}`);
    return null as unknown as React.ComponentType<IconCompProps>;
  }
  const ext = url.substr(url.lastIndexOf('.') + 1);
  if (util.isBrowser()) {
    if (ext === 'css' && !links[url]) {
      links[url] = true;
      const link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('type', 'text/css');
      link.setAttribute('href', url);
      document.head.appendChild(link);
    }
    if (ext === 'js' && !scripts[url]) {
      const script = document.createElement('script');
      scripts[url] = script;
      script.setAttribute('src', url);
      document.body.appendChild(script);
    }
  }

  const wrapperIcon = (props: IconCompProps) => (
    <Icon ext={ext} fontFamily={fontFamily} prefix={prefix} {...props} />
  );
  wrapperIcon.isShineoutIcon = true;
  return wrapperIcon;
}

export default makeIcon;
