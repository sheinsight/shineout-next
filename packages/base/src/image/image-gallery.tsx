import clsx from 'clsx';
import { useImageGallery } from '@sheinx/hooks';
import { ImageClasses } from './image.type';
import Magnify from './image-magnify';
import { Image, ImageGalleryProps, MagnifyPositionType } from './image.type';
import Icons from '../icons';
import { useConfig } from '../config';

const ImageModal = (props: ImageGalleryProps) => {
  const { jssStyle, images, ...rest } = props;
  const config = useConfig();


  const {
    current,
    direction,
    getMaginfyProps,
    getOverlayProps,
    getGalleryProps,
    getCloseIconProps,
  } = useImageGallery({
    ...rest,
    images,
    direction: config.direction,
  });

  const galleryStyle = jssStyle?.image?.() || ({} as ImageClasses);


  const overlayClass = clsx(galleryStyle?.overlay);
  const closeClass = clsx(galleryStyle?.close);

  const closeIconProps = getCloseIconProps();

  const renderColseIcon = () => {
    return (
      <a className={closeClass} {...closeIconProps} dir={config.direction}>
        {Icons.image.Close}
      </a>
    );
  };

  const renderImage = (image: Image, position: MagnifyPositionType) => {
    const galleryClass = clsx({
      [galleryStyle.galleryInit]: direction === 'init',
      [galleryStyle.galleryForward]: direction === 'forward',
      [galleryStyle.galleryBackward]: direction === 'backward',

      [galleryStyle.galleryLeft]: position === 'left',
      [galleryStyle.galleryRight]: position === 'right',
      [galleryStyle.galleryCenter]: position === 'center',
    });

    const index = position === 'left' ? -1 : 1;

    const galleryProps = getGalleryProps(index, position, {
      className: clsx(galleryClass),
    });

    const magnifyProps = getMaginfyProps(position, {
      jssStyle,
      src: image.src,
    });

    return (
      <div key={image.key} {...galleryProps} dir={config.direction}>
        {renderColseIcon()}
        <Magnify {...magnifyProps}></Magnify>
      </div>
    );
  };

  const renderResult = () => {
    return (
      <>
        {renderImage(images[current], 'center')}
        {images[current - 1] && renderImage(images[current - 1], 'left')}
        {images[current + 1] && renderImage(images[current + 1], 'right')}
      </>
    );
  };

  const overlayProps = getOverlayProps(rest);

  return (
    <>
      <div className={overlayClass} {...overlayProps}></div>
      {renderResult()}
    </>
  );
};

export default ImageModal;
