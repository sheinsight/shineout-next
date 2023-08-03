import React, { useState, useEffect } from 'react';
import { BaseImageGalleryProps } from './use-image-gallery.type';

let ClientX = 0;
let ClientY = 0;

const useImageMagnify = (props: BaseImageGalleryProps) => {
  const { maxHeight, maxWidth, position, lockScroll, src } = props;

  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(true);
  const [, setStyle] = useState<
    { maxHeight?: number; maxWidth?: number; overlfow?: 'scroll' } | undefined
  >({
    maxWidth,
    maxHeight,
  });
  const imgRef = React.useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number, clientY: number) => {
    if (!imgRef.current) return;
    const element = imgRef.current;
    const rect = element.getBoundingClientRect();
    const image = element.querySelector('img');

    if (!image) return;
    const width = rect.width - 100;
    const height = rect.height - 100;
    const x = (clientX - rect.left - 50) / width;
    const y = (clientY - rect.top - 50) / height;
    element.scrollTop = (image.offsetHeight - height) * y;
    element.scrollLeft = (image.offsetWidth - width) * x;
  };

  const handleResize = (e: React.MouseEvent<HTMLDivElement>) => {
    if (position !== 'center') return;
    const newStatus = status === 1 ? 0 : 1;
    setStatus(newStatus);
    const { clientX, clientY } = e;
    ClientY = clientY;
    ClientX = clientX;
    if (newStatus === 0) return;
    lockScroll(newStatus === 1);
  };

  useEffect(() => {
    if (status === 1) {
      handleMove(ClientX, ClientY);
    } else {
      ClientX = 0;
      ClientY = 0;
    }
  }, [status]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleLoaded = () => {
    setLoading(false);
  };

  const getRootProps = () => {
    return {
      ref: imgRef,
      onLoad: handleLoaded,
      onClick: handleResize,
      onMouseMove: status === 1 ? handleMouseMove : undefined,
    };
  };

  useEffect(() => {
    setLoading(true);
    setStatus(0);
    setStyle({
      maxHeight,
      maxWidth,
    });
    lockScroll(false);
  }, [src]);

  return {
    status,
    maxWidth,
    maxHeight,
    loading,
    getRootProps,
  };
};

export default useImageMagnify;
