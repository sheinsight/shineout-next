import { Images } from './use-image.type';

export type ImageGalleryPosition = 'left' | 'center' | 'right';
export interface BaseImageGalleryProps {
  images: Images[];
  current: number;
  onClose?: (e?: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => void;
}
