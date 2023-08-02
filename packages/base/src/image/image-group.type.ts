import { ImageTargetType, ImageShapeType } from '@sheinx/hooks';
import { ImageClasses } from './image.type';

export interface ImageGroupProps {
  jssStyle: {
    image: ImageClasses;
  };
  showCount?: boolean;
  target?: ImageTargetType;
  shape?: ImageShapeType;
  lazy?: boolean;
  pile?: boolean;
  width?: number | string;
  height?: number | string;
  children: React.ReactNode;
}
