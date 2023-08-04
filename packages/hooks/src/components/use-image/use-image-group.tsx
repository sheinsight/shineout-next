import React, { Children } from 'react';
import { extractEventHandlers, parseStyleUnitValue } from '../../utils';
import { ObjectType, HandlerType } from '../../common/type';
import { BaseImageGroupProps } from './use-image-group.type';
import { BaseImageProps, Images } from './use-image.type';

const useImageGroup = (props: BaseImageGroupProps) => {
  const { width, height, children, lazy, fit, shape, pile, target } = props;

  const targetSet = pile ? '_modal' : target;

  /**
   *
   * @param otherHandlers 由 group 层额外传入的事件处理函数
   * @param child Image 组件实例
   * @param index Image 组件在 ImageGroup 中的索引
   * @returns 无返回值
   */
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

      // 如果 ImageGroup 定义了 onClick 则需要执行，抛出组装好的图片数组 images 和当前点击的图片索引 current
      // @ts-ignore 这里的 ts 需要优化，事件可能会传入多个参数
      otherHandlers?.onClick?.(_images, current);
      // 如果 children 定义了 onClick 则需要执行
      child?.props?.onClick?.(event);
    };

  /**
   *
   * @param child Image 组件实例
   * @param index Image 组件在 ImageGroup 中的索引
   * @param externalProps 由 group 层额外传入的属性
   * @returns 固定返回 lazy fit width height shape target onClick 属性
   */
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

  /**
   *
   * @param child Image 组件实例
   * @param index Image 组件在 ImageGroup 中的索引
   * @param externalProps 由 group 层额外传入的属性
   * @returns 固定返回 style 属性
   */
  const getPileProps = <TOther extends ObjectType = ObjectType>(
    child: React.ReactElement<BaseImageProps>,
    index: number,
    externalProps: TOther = {} as TOther,
  ) => {
    const externalEventHandlers = {
      ...extractEventHandlers(externalProps),
    };
    const { value, unit } = parseStyleUnitValue(width || child.props.width || '100%') || {};

    return {
      ...externalEventHandlers,
      ...externalProps,

      style: {
        width: value || '100%',
        height: height || child.props.height || '100%',
        left: `calc(${value}${unit} * ${0.0625 * index})`,
      },
    };
  };

  return {
    getPileProps,
    getGroupItemProps,
  };
};

export default useImageGroup;
