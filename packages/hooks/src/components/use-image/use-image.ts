import React, { useEffect } from 'react';
import { HandlerType, ObjectType } from '../../common/type';
import { extractEventHandlers } from '../../utils';
import { addStack, removeStack, removeProtocol } from '../../utils';
import { BaseImageProps } from './use-image.type';

const config = {
  autoSSL: false,
};

const PLACEHOLDER = 0;
const SRC = 1;
const ALT = 2;
const ERROR = 3;

const useImage = (props: BaseImageProps = {}) => {
  let lazyId: string | null = null;

  const { container, lazy, src, alt, href, autoSSL, noImgDrag = false, onError } = props;

  const [status, setStatus] = React.useState<number>(PLACEHOLDER);
  const [imgCoverStyle, setImgCoverStyle] = React.useState<React.CSSProperties>({});

  const elementRef = React.useRef<HTMLDivElement | HTMLAnchorElement>(null);

  const getUrl = (url: string) => {
    const auto = 'autoSSL' in props ? autoSSL : config.autoSSL;
    if (auto) return removeProtocol(url);
    return url;
  };

  const handleError = (type: number, e: Event) => {
    if (onError) onError(e, type);
    if (type === SRC) {
      const img = new window.Image();
      img.onload = () => setStatus(ALT);
      img.onerror = (e) => handleError(ALT, e as Event);
      // 与 2.x 版本不同，2.x 不处理 ，这里默认为''
      img.src = getUrl(alt || '');
    } else if (type === ALT) setStatus(ERROR);
  };

  const handleAlt = () => {
    if (!alt) {
      setStatus(ERROR);
      return;
    }

    const img = new window.Image();
    img.onload = () => setStatus(ALT);
    img.onerror = (e) => handleError(ALT, e as Event);
    img.src = getUrl(alt);
  };

  const handleCoverStyle = (img: HTMLImageElement) => {
    const container = elementRef?.current;
    if (!container) return;

    // 根据容器的宽高获取宽高比
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const containerRatio = containerWidth / containerHeight;

    // 根据图片的自然尺寸获取宽高比
    const imageWidth = img.naturalWidth;
    const imageHeight = img.naturalHeight;
    const imageRatio = imageWidth / imageHeight;

    // 判断宽高比，决定图片填充策略
    if (imageRatio > containerRatio) {
      // 图片更宽，宽度占满容器，高度自适应
      setImgCoverStyle({
        height: '100%',
        width: 'auto',
      });
    } else {
      // 图片更高，填满容器高度
      setImgCoverStyle({
        width: '100%',
        height: 'auto',
      });
    }
  };

  const markToRender = () => {
    if (!src) {
      handleAlt();
      return;
    }
    const img = new window.Image();
    img.onload = () => {
      setStatus(SRC);
      if (props.fit === 'fill') {
        handleCoverStyle(img);
      }
    };
    img.onerror = (e) => handleError(SRC, e as Event);
    img.src = getUrl(src);
  };

  const fetchImage = () => {
    if (lazyId) removeStack(lazyId);
    lazyId = addStack({
      offset: typeof lazy === 'number' ? lazy : 0,
      element: elementRef.current!,
      render: markToRender,
      container: typeof container === 'string' ? document.querySelector(container) : container,
    });
  };

  const handleClick =
    (otherHandlers: HandlerType) =>
    (event: React.MouseEvent<HTMLImageElement | HTMLDivElement>) => {
      otherHandlers?.onClick?.(event);
    };

  const getImageProps = <TOther extends ObjectType = ObjectType>(
    externalProps: TOther = {} as TOther,
  ) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    const mergedEventHandlers = {
      ...externalEventHandlers,
      ...externalProps,
      alt,
      draggable: !noImgDrag,
    };

    return {
      style: imgCoverStyle,
      ...mergedEventHandlers,
    };
  };

  const getImageDivProps = <TOther extends ObjectType = ObjectType>(
    externalProps: TOther = {} as TOther,
  ) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    const mergedEventHandlers = {
      ...externalEventHandlers,
      ...externalProps,
    };

    return {
      ...mergedEventHandlers,
    };
  };

  const getRootProps = <TOther extends ObjectType = ObjectType>(
    externalProps: TOther = {} as TOther,
  ) => {
    const externalEventHandlers = extractEventHandlers(externalProps);
    const mergedEventHandlers = {
      ...externalEventHandlers,
      ...externalProps,
      ref: elementRef,
      onClick: handleClick(externalEventHandlers),
    };

    return {
      ...mergedEventHandlers,
    };
  };

  useEffect(() => {
    if (!lazy) {
      markToRender();
    } else {
      if (elementRef.current) {
        lazyId = addStack({
          offset: typeof lazy === 'number' ? lazy : 0,
          element: elementRef.current!,
          render: markToRender,
          offscreen: () => {
            setStatus(PLACEHOLDER);
          },
          noRemove: props.inViewOnly,
          container: typeof container === 'string' ? document.querySelector(container) : container,
        });
      }
    }

    return () => {
      if (lazyId) removeStack(lazyId);
    };
  }, [src]);

  return {
    src,
    alt,
    href,
    status,
    fetchImage,
    getRootProps,
    getImageProps,
    getImageDivProps,
  };
};

export default useImage;
