import React from 'react';
import classnames from 'classnames';
import { IconCompProps } from './icon.type';

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
  const className = classnames(
    jssStyle?.wrapper,
    jssStyle?.[type!],
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
        <svg className={jssStyle?.svg} aria-hidden='true'>
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
    console.error(`Shineout Icon url must be a string, but get ${url}`);
    return null as unknown as React.ComponentType<IconCompProps>;
  }
  const ext = url.substr(url.lastIndexOf('.') + 1);
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

  const wrapperIcon = (props: IconCompProps) => (
    <Icon ext={ext} fontFamily={fontFamily} prefix={prefix} {...props} />
  );
  wrapperIcon.isShineoutIcon = true;
  return wrapperIcon;
}

export default makeIcon;
