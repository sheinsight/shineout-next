import classNames from 'classnames';
import { useImageGallery } from '@sheinx/hooks';
import Magnify from './image-magnify';
import { ImageGalleryProps, Image, MagnifyPositionType, ImageClasses } from './image.type';

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
        <svg
          width='30'
          height='30'
          viewBox='0 0 30 30'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M15.0002 0.333344C23.1003 0.333344 29.6668 6.89983 29.6668 15C29.6668 23.1002 23.1003 29.6667 15.0002 29.6667C6.89998 29.6667 0.333496 23.1002 0.333496 15C0.333496 6.89983 6.89998 0.333344 15.0002 0.333344ZM12.0462 10.175C11.5231 9.76832 10.7668 9.80529 10.2862 10.2859C9.76545 10.8066 9.76545 11.6509 10.2862 12.1716L13.113 14.9994L10.2862 17.8284L10.1752 17.954C9.76854 18.4771 9.80551 19.2334 10.2862 19.714C10.8069 20.2347 11.6511 20.2347 12.1718 19.714L14.9996 16.8847L17.8286 19.714L17.9542 19.8249C18.4773 20.2316 19.2336 20.1947 19.7142 19.714C20.2349 19.1933 20.2349 18.3491 19.7142 17.8284L16.885 14.9994L19.7142 12.1716L19.8252 12.0459C20.2319 11.5229 20.1949 10.7666 19.7142 10.2859C19.1935 9.76523 18.3493 9.76523 17.8286 10.2859L14.9996 13.1127L12.1718 10.2859L12.0462 10.175Z'
            fill='#666C7C'
          />
        </svg>
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
