import { Images, ImageTargetType, ImageFitType, ImageShapeType } from './use-image.type';

export interface BaseImageGroupProps {
  images: Images[];
  width?: number | string;
  height?: number | string;
  lazy?: boolean;
  pile?: boolean;
  target?: ImageTargetType;
  children: React.ReactNode;
  fit?: ImageFitType;
  shape?: ImageShapeType;
}
