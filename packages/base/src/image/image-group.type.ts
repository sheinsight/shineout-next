import { ImageFitType, ImageShapeType, ImageTargetType } from '@sheinx/hooks';
import { JssStyleType } from './image.type';

export interface ImageGroupProps {
  jssStyle?: JssStyleType;
  showCount?: boolean;
  target?: ImageTargetType;
  shape?: ImageShapeType;
  lazy?: boolean;
  pile?: boolean;
  fit?: ImageFitType;
  width?: number | string;
  height?: number | string;
  children: React.ReactNode;
}
