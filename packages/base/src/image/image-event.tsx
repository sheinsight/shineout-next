import { getDefaultContainer } from '../config';
import { Images } from './image.type';
import classNames from 'classnames';
import ImageModal from './image-gallery';
import { util } from '@sheinx/hooks';
import { ImageClasses } from './image.type';

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

const getContainer = (classnames: { image?: ImageClasses }) => {
  if (container) return container;
  const defaultContainer = getDefaultContainer();
  container = document.createElement('div');
  container.className = classNames(classnames?.image?.gallery);
  defaultContainer.appendChild(container);

  return container;
};

const showGallery = (
  jssStyle: { image?: ImageClasses },
  images: Images | Images[],
  current: number = 0,
) => {
  const Images = !Array.isArray(images) ? [images] : images;
  const container = getContainer(jssStyle);

  document.addEventListener('keydown', keyClose);

  ReactRender(
    <ImageModal jssStyle={jssStyle} onClose={close} current={current} images={Images} />,
    container,
  );
};

export default showGallery;
