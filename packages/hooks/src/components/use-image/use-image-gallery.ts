import React, { useState, useEffect } from 'react';
import { docSize, extractEventHandlers } from '../../utils';
import { NormalizeWheel } from '../../utils/dom';
import { HandlerType, ObjectType } from '../../common/type';

import { BaseImageGalleryProps, ImageGalleryPosition } from './use-image-gallery.type';
import { usePersistFn } from '@sheinx/hooks';

let scrollX = 0;
const useImageGallery = (props: BaseImageGalleryProps) => {
  let shouldScroll = false;

  const { images, current: defaultCurrent, onClose } = props;
  const [current, setCurrent] = useState(defaultCurrent);
  const [direction, setDirection] = useState('init');

  const handleClose =
    (otherHandlers: HandlerType) =>
    (event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => {
      onClose?.();
      otherHandlers?.onClick?.(event);
    };

  const handleLockScroll = (status: boolean) => {
    shouldScroll = status;
  };

  const handleClick = usePersistFn((index?: number) => {
    if (index === undefined) return;
    let newCurrent = current + index;
    if (newCurrent < 0) {
      newCurrent = 0;
    } else if (newCurrent >= images.length) {
      newCurrent = images.length - 1;
    } else {
      setDirection(index === 1 ? 'forward' : 'backward');
    }
    setCurrent(newCurrent);
  });

  // handle scroll
  const handleScroll = usePersistFn((e: WheelEvent) => {
    if (shouldScroll) return;
    e.preventDefault();
    if (scrollX !== 0) return;
    const wheel = NormalizeWheel(e);
    scrollX += wheel.spinX;
    if (props.direction === 'rtl') {
      scrollX = -scrollX;
    }

    if (scrollX < 0) handleClick(-1);
    if (scrollX > 0) handleClick(1);

    setTimeout(() => {
      scrollX = 0;
    }, 1000);
  });

  /**
   *
   * @param index 当前点击的 Image 索引
   * @param position 当前点击的 Image 的位置，用于判断是否需要左右切换图片
   * @param otherHandlers 由 gallery 层额外传入的事件处理函数
   * @returns
   */
  const handleGalleryClick =
    (index: number, position: ImageGalleryPosition, otherHandlers: HandlerType) =>
    (event: React.MouseEvent<HTMLImageElement | HTMLDivElement>) => {
      if (position !== 'center') {
        handleClick(index);
      }

      otherHandlers?.onClick?.(event);
    };

  /**
   *
   * @param externalProps 由 overlay 层额外传入的属性
   * @returns 固定返回一个 onClick 事件属性，用于点击关闭图片预览
   */
  const getOverlayProps = <TOther extends ObjectType = ObjectType>(
    externalProps: TOther = {} as TOther,
  ) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    return {
      ...externalProps,
      onClick: handleClose(externalEventHandlers),
    };
  };

  /**
   *
   * @param index 当前点击的 Image 索引，并从该索引开始展示
   * @param position 当前点击的 Image 的位置，用于判断是否需要左右切换图片
   * @param externalProps 由 gallery 层额外传入的属性
   * @returns 固定返回一个 onClick 事件属性，用于处理切换图片
   */
  const getGalleryProps = <TOther extends ObjectType = ObjectType>(
    index: number,
    position: ImageGalleryPosition,
    externalProps: TOther = {} as TOther,
  ) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    return {
      ...externalProps,
      onClick: handleGalleryClick(index, position, externalEventHandlers),
    };
  };

  /**
   *
   * @param externalProps 由 gallery 层额外传入的属性
   * @returns 固定返回一个 onClick 事件属性，用于点击关闭图片预览
   */
  const getCloseIconProps = <TOther extends ObjectType = ObjectType>(
    externalProps: TOther = {} as TOther,
  ) => {
    const externalEventHandlers = extractEventHandlers(externalProps);

    return {
      ...externalProps,
      onClick: handleClose(externalEventHandlers),
    };
  };

  /**
   *
   * @param position 当前点击的 Image 的位置，用确定图片预览的位置
   * @param externalProps 由 gallery 层额外传入的属性
   * @returns 固定返回 position maxWidth maxHeight lockScroll 属性。lockScroll 用于控制图片预览时是否允许滚动
   */
  const getMaginfyProps = <TOther extends ObjectType = ObjectType>(
    position: ImageGalleryPosition,
    externalProps: TOther = {} as TOther,
  ) => {
    return {
      ...externalProps,
      position,
      lockScroll: handleLockScroll,
      maxWidth: docSize.width - 400,
      maxHeight: docSize.height - 250,
    };
  };

  useEffect(() => {
    if (direction === 'init') return;
    setTimeout(() => {
      setDirection('init');
    }, 400);
  }, [current]);

  useEffect(() => {
    document.addEventListener('wheel', handleScroll, { passive: false });
    return () => {
      document.removeEventListener('wheel', handleScroll, {
        passive: false,
      } as EventListenerOptions);
    };
  }, []);

  return {
    images,
    current,
    direction,
    getMaginfyProps,
    getGalleryProps,
    getOverlayProps,
    getCloseIconProps,
  };
};

export default useImageGallery;
