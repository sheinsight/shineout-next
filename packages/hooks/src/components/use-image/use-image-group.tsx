import React, { Children } from 'react';
import { extractEventHandlers } from '../../utils';
import { ObjectType, HandlerType } from '../../common/type';
import { BaseImageGroupProps } from './use-image-group.type';
import { BaseImageProps, Images } from './use-image.type';

const useImageGroup = (props: BaseImageGroupProps) => {
  const { width, height, children, lazy, fit, shape, pile, target } = props;

  const targetSet = pile ? '_modal' : target;

  const handleClick =
    (otherHandlers: HandlerType, child: React.ReactElement<BaseImageProps>, index: number) =>
    (event: React.MouseEvent<HTMLDivElement>) => {
      const _images: Images[] = [];
      let current = 0;
      Children.toArray(children).forEach((child, i) => {
        const Child = child as React.ReactElement<BaseImageProps>;
        if (index === i) current = _images.length;
        const { src, href } = Child.props;
        _images.push({ thumb: src, src: href || src, key: i });
      });

      // 如果 ImageGroup 定义了 onClick 则需要执行
      otherHandlers?.onClick?.(_images, current);
      // 如果 children 定义了 onClick 则需要执行
      child?.props?.onClick?.(event);
    };

  const getGroupItemProps = <TOther extends ObjectType = ObjectType>(
    child: React.ReactElement<BaseImageProps>,
    index: number,
    externalProps: TOther = {} as TOther,
  ) => {
    const externalEventHandlers = {
      ...extractEventHandlers(externalProps),
    };
    return {
      ...externalEventHandlers,
      ...externalProps,

      lazy,
      fit: child.props.fit || fit || undefined,
      width: width || child.props.width || '100%',
      height: height || child.props.height || '100%',
      shape: shape || child.props.shape || 'rounded',
      target: targetSet || '_modal',
      onClick: handleClick(externalEventHandlers, child, index),
    };
  };

  return {
    getGroupItemProps,
  };
};

export default useImageGroup;
