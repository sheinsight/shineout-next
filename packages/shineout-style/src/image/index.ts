import { styled } from '../jss-style';
import imageStyle, { ImageClasses } from './image';

const useImageStyle = styled(imageStyle, 'image');

export { imageStyle, useImageStyle };
export type { ImageClasses };
export default useImageStyle;
