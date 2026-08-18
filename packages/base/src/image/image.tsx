import { useImage, useLatestObj, usePersistFn } from '@sheinx/hooks';
import { ImageClasses, ImageSemanticKey } from './image.type';
import { getDefaultContainer, useConfig } from '../config';
import { useSemantic } from '../common';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import showGallery from './image-event';
import { ImageProps } from './image.type';
import ImageGroup from './image-group';
import Icons from '../icons';
import Spin from '../spin';

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
    target = '_modal',
    jssStyle,
    className,
    placeholder,
    width = '100%',
    height = '100%',
    shape = 'rounded',
    autoSSL,
    noImgDrag,
    onClick,
    componentRef,
    renderHoverMask,
    inViewOnly,
    classNames: classNamesProp,
    styles: stylesProp,
    ...rest
  } = props;

  const { status, getRootProps, getImageProps, getImageDivProps } = useImage({
    container: getDefaultContainer()!,
    alt,
    src,
    href,
    lazy,
    autoSSL,
    noImgDrag,
    fit,
    inViewOnly,
    ...rest,
  });

  // Semantic DOM
  const config = useConfig();
  const [semClass, semStyle] = useSemantic<ImageSemanticKey>(
    classNamesProp,
    stylesProp,
    config.image,
  );

  const imageStyle = jssStyle?.image?.() || ({} as ImageClasses);
  const shouldPreview = href && target === '_modal' && status !== ERROR && status !== PLACEHOLDER;
  const shouldDownload = target === '_download';

  const rootProps = getRootProps({
    download: shouldDownload,
    target: shouldDownload ? '_self' : target,
    href: !href || target !== '_modal' ? href : undefined,
    style: Object.assign({}, style, { width, paddingBottom: height }, semStyle('root')),
    onClick,
    ...rest,
  });

  const rootClass = classNames(className, imageStyle.rootClass, imageStyle.image, {
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
  }, semClass('root'));

  const imgClass = classNames(imageStyle.img, semClass('img'));
  const imgInnerClass = classNames(imageStyle.inner);
  const placeholderClass = classNames(imageStyle.placeholder, semClass('placeholder'));
  const defaultPlaceholderClass = classNames(imageStyle.defaultPlaceholder, semClass('placeholder'));
  const errorClass = classNames(imageStyle.error, semClass('error'));
  const defaultErrorClass = classNames(imageStyle.defaultError, semClass('error'));
  const maskClass = classNames(imageStyle.previewMask);

  const handleOpenGallery = (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => {
    // 2.0 逻辑为：如果有 onClick 事件，则不会触发 Modal
    if (onClick) {
      // 该 onClick 在 hooks 中固定触发，无需在外部单独触发
      return;
    }
    if (shouldPreview) {
      e.preventDefault();
      showGallery(jssStyle, { thumb: src, src: href || src, key: 'key' }, 0, imageStyle.gallery);
    }
  };

  const preview = usePersistFn(() => {
    showGallery(jssStyle, { thumb: src, src: href || src, key: 'key' }, 0, imageStyle.gallery);
  });

  const ComponentRef = useLatestObj({ preview });
  useEffect(() => {
    componentRef?.(ComponentRef);
  }, []);

  const renderImgeInnerEl = (src?: string) => {
    const imageProps = getImageProps({ src });

    return (
      <div className={imgInnerClass}>
        <img className={imgClass} style={semStyle('img')} {...imageProps} />
      </div>
    );
  };

  const renderDivInnerEl = (src?: string) => {
    const imageDivProps = getImageDivProps({ style: { backgroundImage: `url("${src}")` } });
    return <div className={classNames(imgInnerClass, semClass('img'))} {...imageDivProps} style={{ ...imageDivProps.style, ...semStyle('img') }}></div>;
  };

  // 渲染 img / div 类型的内部标签
  const renderInner = (src?: string) => {
    return fit === 'fit' ? renderDivInnerEl(src) : renderImgeInnerEl(src);
  };

  // 默认占位图
  const renderDefaultPlaceholder = () => {
    return (
      <div className={defaultPlaceholderClass} style={semStyle('placeholder')}>
        <Spin jssStyle={jssStyle} size={16} name='ring' ignoreConfig></Spin>
      </div>
    );
  };

  // 占位图
  const renderPlaceholder = () => {
    if (placeholder) {
      return <div className={placeholderClass} style={semStyle('placeholder')}>{placeholder}</div>;
    }
    return renderDefaultPlaceholder();
  };

  // 默认错误图
  const renderDefaultError = () => {
    return <div className={defaultErrorClass} style={semStyle('error')}>{title || Icons.image.LoadFail}</div>;
  };

  // 错误图
  const renderError = () => {
    if (error) {
      return <div className={errorClass} style={semStyle('error')}>{error}</div>;
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
    if (renderHoverMask) {
      return <span className={maskClass}>{renderHoverMask({ preview })}</span>;
    }
    return (
      <span className={maskClass} onClick={handleOpenGallery}>
        {shouldDownload && Icons.image.Download}
        {shouldPreview && Icons.image.Preview}
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
