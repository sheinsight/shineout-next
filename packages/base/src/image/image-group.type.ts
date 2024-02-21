import { ImageFitType, ImageShapeType, ImageTargetType } from '@sheinx/hooks';
import { ImageJssStyleType } from './image.type';

export interface ImageGroupProps {
  jssStyle?: ImageJssStyleType;
  /**
   * @en The number of images to be displayed
   * @cn 显示图片数量
   */
  showCount?: boolean;
  /**
   * @en Target of image
   * @cn 图片打开方式
   * @default '_modal'
   */
  target?: ImageTargetType;
  /**
   * @en Image shape
   * @cn 图片形状
   * @default 'rounded'
   */
  shape?: ImageShapeType;
  /**
   * @en Whether to delay loading
   * @cn 是否延迟加载
   * @default false
   */
  lazy?: boolean;
  /**
   * @en Whether to stack
   * @cn 是否堆叠
   * @default false
   */
  pile?: boolean;
  /**
   * @en Image fill type
   * @cn 图片填充方式
   */
  fit?: ImageFitType;
  /**
   * @en The width of the image
   * @cn 图片宽度
   * @default '100%'
   */
  width?: number | string;
  /**
   * @en The height of the image
   * @cn 图片高度
   * @default '100%'
   */
  height?: number | string;
  /**
   * @en Children
   * @cn 子元素
   */
  children: React.ReactNode;
}
