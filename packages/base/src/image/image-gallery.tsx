import classNames from 'classnames';
import { useImageGallery } from '@sheinx/hooks';
import Magnify from './image-magnify';
import { ImageGalleryProps, Images, MagnifyPositionType, ImageClasses } from './image.type';

const ImageModal = (props: ImageGalleryProps) => {
  let shouldScroll = false;

  const { jssStyle, images } = props;

  const { direction, current, windowWidth, windowHeight, getRootProps } = useImageGallery({
    images,
  });

  const { onClick } = getRootProps();

  const galleryStyle = jssStyle.image || ({} as ImageClasses);

  const overlayClass = classNames(jssStyle.image?.overlay);
  const magnifyClass = classNames(jssStyle.image?.magnify);

  const handleLockScroll = (status: boolean) => {
    shouldScroll = status;
    console.log(shouldScroll);
  };

  const renderColseIcon = () => {
    return <a></a>;
  };

  const renderImage = (image: Images, position: MagnifyPositionType) => {
    const galleryClass = classNames({
      [galleryStyle.galleryInit]: direction === 'init',
      [galleryStyle.galleryForward]: direction === 'forward',
      [galleryStyle.galleryBackward]: direction === 'backward',

      [galleryStyle.galleryLeft]: position === 'left',
      [galleryStyle.galleryRight]: position === 'right',
      [galleryStyle.galleryCenter]: position === 'center',
    });

    const handleClick = () => {
      if (position === 'center') {
        return undefined;
      }
      const index = position === 'left' ? -1 : 1;
      return onClick(index);
    };

    return (
      <div key={image.key} className={classNames(galleryClass)} onClick={handleClick}>
        {renderColseIcon()}
        <Magnify
          className={magnifyClass}
          position={position}
          src={image.src}
          lockScroll={handleLockScroll}
          maxWidth={windowWidth - 400}
          maxHeight={windowHeight - 160}
        ></Magnify>
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

  return (
    <>
      <div className={overlayClass}></div>
      {renderResult()}
    </>
  );
};

export default ImageModal;
