import React, { Children, cloneElement } from 'react';
import { AvatarContext } from './context';
import { AvatarGroupProps, AvatarClasses } from './avatar.type';
import { AvatarContextProps } from './context';
import Avatar from './avatar';
import { Popover } from '../popover';

interface AvatarProviderContext {
  children?: React.ReactNode;
}

const AvatarProvider: React.FC<AvatarContextProps & AvatarProviderContext> = (props) => {
  return <AvatarContext.Provider value={props}>{props.children}</AvatarContext.Provider>;
};

const AvatarGroup = (props: AvatarGroupProps) => {
  const { jssStyle, children: childrenProp, size, shape, max, popover, renderMax } = props;
  const avatarGroupClasses = jssStyle?.avatar?.() || ({} as AvatarClasses);

  const children = Children.toArray(childrenProp).map((child, index) =>
    cloneElement(child as React.ReactElement, { key: `avatar-key-${index}` }),
  );

  const childrenNumber = children.length;

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
      <AvatarProvider shape={shape} size={size}>
        <div className={avatarGroupClasses.group}>{childrenShow}</div>
      </AvatarProvider>
    );
  }

  return (
    <AvatarProvider shape={shape} size={size}>
      <div className={avatarGroupClasses.group}>{children}</div>
    </AvatarProvider>
  );
};

export default AvatarGroup;
