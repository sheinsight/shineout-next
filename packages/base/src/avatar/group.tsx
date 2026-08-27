import React, { Children, cloneElement } from 'react';
import classNames from 'classnames';
import { AvatarContext } from './context';
import { AvatarGroupProps, AvatarClasses, AvatarGroupSemanticKey, AvatarSemanticKey } from './avatar.type';
import { AvatarContextProps } from './context';
import Avatar from './avatar';
import { Popover } from '../popover';
import { useSemantic } from '../common/use-semantic';
import { useConfig } from '../config';
import type { SemanticClassFn, SemanticStyleFn } from '../common/use-semantic';

interface AvatarProviderContext {
  children?: React.ReactNode;
}

const AvatarProvider: React.FC<AvatarContextProps & AvatarProviderContext> = (props) => {
  return <AvatarContext.Provider value={props}>{props.children}</AvatarContext.Provider>;
};

const AvatarGroup = (props: AvatarGroupProps) => {
  const {
    jssStyle,
    children: childrenProp,
    size,
    shape,
    max,
    popover,
    renderMax,
    classNames: classNamesProp,
    styles: stylesProp,
  } = props;

  const config = useConfig();
  const [semClass, semStyle] = useSemantic<AvatarGroupSemanticKey>(
    classNamesProp,
    stylesProp,
    config.avatar,
  );

  const avatarGroupClasses = jssStyle?.avatar?.() || ({} as AvatarClasses);

  // Pass 'root' key semantic to child Avatars via Context
  const childSemClass: SemanticClassFn<AvatarSemanticKey> = (key) => {
    if (key === 'root') return semClass('root');
    return undefined;
  };
  const childSemStyle: SemanticStyleFn<AvatarSemanticKey> = (key) => {
    if (key === 'root') return semStyle('root');
    return undefined;
  };

  const children = Children.toArray(childrenProp).map((child, index) =>
    cloneElement(child as React.ReactElement, { key: `avatar-key-${index}` }),
  );

  const childrenNumber = children.length;

  const groupClass = classNames(avatarGroupClasses.group, semClass('group'));
  const groupSemStyle = semStyle('group');

  const providerValue: AvatarContextProps = {
    shape,
    size,
    semClass: childSemClass,
    semStyle: childSemStyle,
  };

  if (max && max < childrenNumber) {
    const childrenShow = children.slice(0, max);
    const childrenHidden = children.slice(max, childrenNumber);

    if (renderMax) {
      childrenShow.push(
        <span key='avatar-provider-key' className={avatarGroupClasses.max}>
          {renderMax(childrenHidden, childrenHidden.length)}
        </span>,
      );
    } else {
      childrenShow.push(
        <span className={avatarGroupClasses.max} key="more-avatar">
          <Avatar key='avatar-provider-key' jssStyle={jssStyle}>
            +{childrenHidden.length}
          </Avatar>
          <Popover jssStyle={jssStyle} {...popover}>
            <div className={avatarGroupClasses.popover}>{childrenHidden}</div>
          </Popover>
        </span>,
      );
    }

    return (
      <AvatarProvider {...providerValue}>
        <div className={groupClass} style={groupSemStyle}>
          {childrenShow}
        </div>
      </AvatarProvider>
    );
  }

  return (
    <AvatarProvider {...providerValue}>
      <div className={groupClass} style={groupSemStyle}>
        {children}
      </div>
    </AvatarProvider>
  );
};

export default AvatarGroup;
