import { useState, useEffect } from 'react';
import { docSize } from '../../utils';
import { NormalizeWheel } from '../../utils/dom';
import { BaseImageGalleryProps } from './use-image-gallery.type';
import { usePersistFn } from '@sheinx/hooks';

let scrollX = 0;
const useImageGallery = (props: BaseImageGalleryProps) => {
  let shouldScroll = false;

  const { images, current: defaultCurrent } = props;
  const [current, setCurrent] = useState(defaultCurrent);
  const [direction, setDirection] = useState('init');

  const handleClose = () => {};

  const handleLockScroll = (status: boolean) => {
    shouldScroll = status;
  };

  const handleClick = (index?: number) => {
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
  };

  const handleScroll = usePersistFn((e: WheelEvent) => {
    if (shouldScroll) return;
    const wheel = NormalizeWheel(e);
    scrollX += wheel.spinX;

    if (scrollX < 0) handleClick(-1);
    if (scrollX > 0) handleClick(1);

    setTimeout(() => {
      scrollX = 0;
    }, 1000);
  });

  useEffect(() => {
    if (direction === 'init') return;
    setTimeout(() => {
      setDirection('init');
    }, 400);
  }, [current]);

  const getRootProps = () => {
    return {
      onClick: handleClick,
      onClose: handleClose,
    };
  };

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
    windowWidth: docSize.width,
    windowHeight: docSize.height,
    lockScroll: handleLockScroll,
    getRootProps,
  };
};

export default useImageGallery;
