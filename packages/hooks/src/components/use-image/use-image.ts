import React, { useEffect } from 'react';
import { HandlerType, ObjectType } from '../../common/type';
import { extractEventHandlers } from '../../utils';
import { addStack, removeStack, removeProtocol } from '../../utils';
import { BaseImageProps } from './use-image.type';

const config = {
  autoSSL: true,
};

const PLACEHOLDER = 0;
const SRC = 1;
const ALT = 2;
const ERROR = 3;

const useImage = (props: BaseImageProps = {}) => {
  let lazyId: string | null = null;
  let image = null;

  const { container, lazy, src, alt, href, target, title, autoSSL, noImgDrag, onError, onClick } =
    props;

  const [status, setStatus] = React.useState<number>(PLACEHOLDER);

  const elementRef = React.useRef<HTMLImageElement>(null);

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

  const markToRender = () => {
    if (!src) {
      handleAlt();
      return;
    }
    image = null;
    const img = new window.Image();
    img.onload = () => setStatus(SRC);
    img.onerror = (e) => handleError(SRC, e as Event);
    img.src = getUrl(src);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    image = img;
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
      onClick?.(event);
      otherHandlers?.onClick?.(event);
    };

  const getImageProps = <TOther extends ObjectType = ObjectType>(
    externalProps: TOther = {} as TOther,
  ) => {
    const mergedEventHandlers = {
      ...externalProps,
      alt,
      draggable: noImgDrag,
    };

    return {
      ...mergedEventHandlers,
    };
  };

  const getImageDivProps = <TOther extends ObjectType = ObjectType>(
    externalProps: TOther = {} as TOther,
  ) => {
    const mergedEventHandlers = {
      ...externalProps,
      title,
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
      ...externalProps,
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
      //
    }
  }, [src, alt]);

  return {
    src,
    alt,
    href,
    title,
    status,
    target,
    onClick,
    fetchImage,
    getRootProps,
    getImageProps,
    getImageDivProps,
  };
};

export default useImage;
