import { useImage } from '@sheinx/hooks';
import { getDefaultContainer } from '../config';
import classNames from 'classnames';
import React from 'react';
import showGallery from './image-event';
import { ImageClasses, ImageProps } from './image.type';
import ImageGroup from './image-group';
import Icons from '../icons';

const PLACEHOLDER = 0;
const SRC = 1;
const ALT = 2;
const ERROR = 3;

const Image = (props: ImageProps) => {
  const {
    fit,
    alt,
    src,
    href,
    lazy,
    title,
    style,
    error,
    target,
    jssStyle,
    className,
    placeholder,
    width = '100%',
    height = '100%',
    shape = 'rounded',
    autoSSL,
    noImgDrag,
    onClick,
    ...rest
  } = props;

  const { status, getRootProps, getImageProps, getImageDivProps } = useImage({
    container: getDefaultContainer(),
    alt,
    src,
    href,
    lazy,
    autoSSL,
    noImgDrag,
    ...rest,
  });

  const imageStyle = jssStyle.image?.() || ({} as ImageClasses);
  const shouldPreview = href && target === '_modal' && status !== ERROR && status !== PLACEHOLDER;
  const shouldDownload = target === '_download';

  const rootProps = getRootProps({
    download: shouldDownload,
    target: shouldDownload ? '_self' : target,
    href: !href || target !== '_modal' ? href : undefined,
    style: Object.assign({}, style, { width, paddingBottom: height }),
    onClick,
    ...rest,
  });

  const rootClass = classNames(className, imageStyle.image, {
    [imageStyle.href]: !!href,
    [imageStyle.fit]: fit === 'fit',
    [imageStyle.fill]: fit === 'fill',
    [imageStyle.center]: fit === 'center',
    [imageStyle.stretch]: fit === 'stretch',
    [imageStyle.circle]: shape === 'circle',
    [imageStyle.rounded]: shape === 'rounded',
    [imageStyle.thumbnail]: shape === 'thumbnail',
    [imageStyle.preview]: shouldPreview,
    [imageStyle.download]: shouldDownload,
  });

  const imgClass = classNames(imageStyle.img);
  const imgInnerClass = classNames(imageStyle.inner);
  const placeholderClass = classNames(imageStyle.placeholder);
  const defaultPlaceholderClass = classNames(imageStyle.defaultPlaceholder);
  const errorClass = classNames(imageStyle.error);
  const defaultErrorClass = classNames(imageStyle.defaultError);
  const maskClass = classNames(imageStyle.previewMask);

  const handleOpenGallery = (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => {
    // 2.0 逻辑为：如果有 onClick 事件，则不会触发 Modal
    if (onClick) {
      // 该 onClick 在 hooks 中固定触发，无需在外部单独触发
      return;
    }
    if (shouldPreview) {
      e.preventDefault();
      showGallery(jssStyle, { thumb: src, src: href || src, key: 'key' });
    }
  };

  const renderImgeInnerEl = (src?: string) => {
    const imageProps = getImageProps({ src });

    return (
      <div className={imgInnerClass}>
        <img className={imgClass} {...imageProps} />
      </div>
    );
  };

  const renderDivInnerEl = (src?: string) => {
    const imageDivProps = getImageDivProps({ style: { backgroundImage: `url(${src})` } });
    return <div className={imgInnerClass} {...imageDivProps}></div>;
  };

  // 渲染 img / div 类型的内部标签
  const renderInner = (src?: string) => {
    return fit === 'fill' || fit === 'fit' ? renderDivInnerEl(src) : renderImgeInnerEl(src);
  };

  // 默认占位图
  const renderDefaultPlaceholder = () => {
    return (
      <div className={defaultPlaceholderClass}>
        {/* 后面替换成 Spin 组件 */}
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g clipPath='url(#clip0_1483_450)'>
            <path
              d='M7.99984 0.666626C12.0499 0.666626 15.3332 3.94987 15.3332 7.99996C15.3332 12.05 12.0499 15.3333 7.99984 15.3333C3.94975 15.3333 0.666504 12.05 0.666504 7.99996C0.666504 7.63177 0.964981 7.33329 1.33317 7.33329C1.70136 7.33329 1.99984 7.63177 1.99984 7.99996C1.99984 11.3137 4.68613 14 7.99984 14C11.3135 14 13.9998 11.3137 13.9998 7.99996C13.9998 4.68625 11.3135 1.99996 7.99984 1.99996C7.63165 1.99996 7.33317 1.70148 7.33317 1.33329C7.33317 0.965103 7.63165 0.666626 7.99984 0.666626Z'
              fill='#B3B7C1'
            />
          </g>
          <defs>
            <clipPath id='clip0_1483_450'>
              <rect width='16' height='16' fill='white' />
            </clipPath>
          </defs>
        </svg>
      </div>
    );
  };

  // 占位图
  const renderPlaceholder = () => {
    if (placeholder) {
      return <div className={placeholderClass}>{placeholder}</div>;
    }
    return renderDefaultPlaceholder();
  };

  // 默认错误图
  const renderDefaultError = () => {
    return <div className={defaultErrorClass}>{title || Icons.ImageError}</div>;
  };

  // 错误图
  const renderError = () => {
    if (error) {
      return <div className={errorClass}>{error}</div>;
    }
    return renderDefaultError();
  };

  // 根据图片的加载情况，渲染不同的内容
  const renderImage = () => {
    switch (status) {
      case PLACEHOLDER:
        return renderPlaceholder();
      case SRC:
        return renderInner(src);
      case ALT:
        return renderInner(alt);
      case ERROR:
        return renderError();
      default:
        return null;
    }
  };

  // 遮罩层
  const renderMask = () => {
    return (
      <span className={maskClass} onClick={handleOpenGallery}>
        {shouldDownload && Icons.ImageDownload}
        {shouldPreview && Icons.ImagePreview}
      </span>
    );
  };

  // 根据是否有 href 属性，渲染不同的标签
  const Tag = href ? 'a' : 'div';

  return (
    // @ts-ignore
    <Tag {...rootProps} className={rootClass}>
      {renderImage()}
      {(shouldPreview || shouldDownload) && renderMask()}
    </Tag>
  );
};

Image.Group = ImageGroup;

export default Image;
