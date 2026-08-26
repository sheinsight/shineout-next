import React, { useState, useRef, isValidElement, useEffect, useContext } from 'react';
import classNames from 'classnames';
import { AvatarContext } from './context';
import { AvatarProps, AvatarClasses, AvatarSemanticKey } from './avatar.type';
import { useSemantic } from '../common/use-semantic';
import { useConfig } from '../config';

const Avatar = (props: AvatarProps) => {
  const {
    jssStyle,
    className,
    children,
    style,
    src,
    alt,
    icon,
    gap = 4,
    shape: shapeProp,
    srcSet,
    draggable,
    size: sizeProp,
    crossOrigin,
    onError,
    classNames: classNamesProp,
    styles: stylesProp,
    ...rest
  } = props;
  const [scale, setScale] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [isImgExist, setIsImgExist] = useState(true);
  const avatarRef = useRef<HTMLSpanElement>(null);
  const childrenRef = useRef<HTMLSpanElement>(null);

  const config = useConfig();
  const [selfSemClass, selfSemStyle] = useSemantic<AvatarSemanticKey>(
    classNamesProp,
    stylesProp,
    config.avatar,
  );

  const avatarContext = useContext(AvatarContext);

  // Merge: own prop > Group Context > global config
  const mergedSemClass = (key: AvatarSemanticKey) =>
    classNames(avatarContext.semClass?.(key), selfSemClass(key));
  const mergedSemStyle = (key: AvatarSemanticKey) => {
    const ctxStyle = avatarContext.semStyle?.(key);
    const selfStyle = selfSemStyle(key);
    if (!ctxStyle && !selfStyle) return undefined;
    return { ...ctxStyle, ...selfStyle };
  };

  const shape = shapeProp || avatarContext.shape || 'circle';
  const size = sizeProp || avatarContext.size;

  const hasImageElement = isValidElement(src);

  const avatarClasses = jssStyle?.avatar?.() || ({} as AvatarClasses);
  const rootClass = classNames(className, avatarClasses.wrapper, mergedSemClass('root'), {
    [avatarClasses.circle]: shape === 'circle',
    [avatarClasses.square]: shape === 'square',
    [avatarClasses.image]: hasImageElement || src,
    [avatarClasses.small]: size === 'small',
    [avatarClasses.large]: size === 'large',
    [avatarClasses.icon]: !!icon,
  });

  const setScaleByChildren = () => {
    if (!childrenRef.current || !avatarRef.current) return;
    const avatarWidth = avatarRef.current.offsetWidth;
    const childrenWidth = childrenRef.current.offsetWidth;

    if (childrenWidth !== 0 && avatarWidth !== 0) {
      if (gap * 2 < avatarWidth) {
        setScale(
          avatarWidth - gap * 2 < childrenWidth ? (avatarWidth - gap * 2) / childrenWidth : 1,
        );
      }
    }
  };

  const handleImageLoadError = () => {
    const errorFlag = onError?.() || false;
    if (errorFlag !== false) {
      setIsImgExist(false);
    }
  };

  const renderChildren = () => {
    if (typeof src === 'string' && isImgExist) {
      return (
        <img
          src={src}
          alt={alt}
          draggable={draggable}
          srcSet={srcSet}
          crossOrigin={crossOrigin}
          onError={handleImageLoadError}
        />
      );
    }

    if (hasImageElement) {
      return src;
    }

    if (icon) {
      return icon;
    }

    const className = classNames(icon ? avatarClasses.icon : avatarClasses.string);

    if (mounted || scale !== 1) {
      const transform = `scale(${scale})`;
      const childrenStyle: React.CSSProperties = {
        transform: transform,
        msTransform: transform,
        WebkitTransform: transform,
      };

      return (
        <span style={childrenStyle} className={className} ref={childrenRef}>
          {children}
        </span>
      );
    }

    return (
      <span style={{ opacity: 0 }} className={className} ref={childrenRef}>
        {children}
      </span>
    );
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsImgExist(true);
    setScale(1);
  }, [props.src]);

  useEffect(setScaleByChildren, [gap]);

  const rootSemStyle = mergedSemStyle('root');
  const mergedStyle = rootSemStyle ? { ...style, ...rootSemStyle } : style;

  return (
    <span ref={avatarRef} className={rootClass} style={mergedStyle} {...rest}>
      {renderChildren()}
    </span>
  );
};

export default Avatar;
