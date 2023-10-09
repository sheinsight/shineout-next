import { getDefaultContainer } from '../config';
import { Image, ImageProps } from './image.type';
import ImageGallery from './image-gallery';
import { util } from '@sheinx/hooks';

const { ReactRender, ReactUnmount } = util;

let container: Element | null;

const close = () => {
  // eslint-disable-next-line
  document.removeEventListener('keydown', keyClose);

  if (container && container.parentNode) container.parentNode.removeChild(container);

  if (container) ReactUnmount(container);

  container = null;
};

const keyClose = (e: KeyboardEvent) => {
  if (e.keyCode === 27) close();
};

const getContainer = () => {
  if (container) return container;
  const defaultContainer = getDefaultContainer();
  container = document.createElement('div');
  defaultContainer.appendChild(container);

  return container;
};

const showGallery = (
  jssStyle: ImageProps['jssStyle'],
  images: Image | Image[],
  current: number = 0,
) => {
  const Images = !Array.isArray(images) ? [images] : images;
  const container = getContainer();

  document.addEventListener('keydown', keyClose);

  ReactRender(
    <ImageGallery jssStyle={jssStyle} onClose={close} current={current} images={Images} />,
    container,
  );
};

export default showGallery;
