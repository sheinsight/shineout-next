import { ImageGalleryPosition } from './use-image-gallery.type';
export interface BaseImageMagnifyProps {
  maxHeight: number;
  maxWidth: number;
  position: ImageGalleryPosition;
  lockScroll(lock: boolean): void;
  src?: string;
}
