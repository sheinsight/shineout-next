import { useState, useEffect } from 'react';
import { docSize } from '../../utils';
import { BaseImageGalleryProps } from './use-image-gallery.type';

const useImageGallery = (props: BaseImageGalleryProps) => {
  const { images } = props;

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState('init');

  const handleClose = () => {};

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

  useEffect(() => {
    if (direction === 'init') return;
    setTimeout(() => {
      // setDirection('init');
    }, 400);
  }, [current]);

  const getRootProps = () => {
    return {
      onClick: handleClick,
      onClose: handleClose,
    };
  };

  return {
    images,
    current,
    direction,
    windowWidth: docSize.width,
    windowHeight: docSize.height,
    getRootProps,
  };
};

export default useImageGallery;
