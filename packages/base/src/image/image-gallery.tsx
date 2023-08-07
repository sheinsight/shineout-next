import classNames from 'classnames';
import { useImageGallery } from '@sheinx/hooks';
import Magnify from './image-magnify';
import { ImageGalleryProps, Image, MagnifyPositionType, ImageClasses } from './image.type';
import Icons from '../icons';

const ImageModal = (props: ImageGalleryProps) => {
  const { jssStyle, images, ...rest } = props;

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
  });

  const galleryStyle = jssStyle.image || ({} as ImageClasses);

  const overlayClass = classNames(jssStyle.image?.overlay);
  const magnifyClass = classNames(jssStyle.image?.magnify);
  const closeClass = classNames(jssStyle.image?.close);

  const closeIconProps = getCloseIconProps();

  const renderColseIcon = () => {
    return (
      <a className={closeClass} {...closeIconProps}>
        {Icons.ImageClose}
      </a>
    );
  };

  const renderImage = (image: Image, position: MagnifyPositionType) => {
    const galleryClass = classNames({
      [galleryStyle.galleryInit]: direction === 'init',
      [galleryStyle.galleryForward]: direction === 'forward',
      [galleryStyle.galleryBackward]: direction === 'backward',

      [galleryStyle.galleryLeft]: position === 'left',
      [galleryStyle.galleryRight]: position === 'right',
      [galleryStyle.galleryCenter]: position === 'center',
    });

    const index = position === 'left' ? -1 : 1;

    const galleryProps = getGalleryProps(index, position, {
      className: classNames(galleryClass),
    });

    const magnifyProps = getMaginfyProps(position, {
      className: magnifyClass,
      src: image.src,
    });

    return (
      <div key={image.key} {...galleryProps}>
        {renderColseIcon()}
        <Magnify {...magnifyProps}></Magnify>
      </div>
    );
  };

  const renderResult = () => {
    const result = [];

    result.push(renderImage(images[current], 'center'));

    if (images[current - 1]) {
      result.push(renderImage(images[current - 1], 'left'));
    }

    if (images[current + 1]) {
      result.push(renderImage(images[current + 1], 'right'));
    }
    return result;
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
