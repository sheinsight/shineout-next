import Image from './image';
import Group from './group';

type RefImage = typeof Image;
export interface ImageComponent extends RefImage {
  Group: typeof Group;
  displayName: string;
}

(Image as ImageComponent).displayName = 'ShineoutImage';
(Image as ImageComponent).Group = Group;

export default Image as ImageComponent;
