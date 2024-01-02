import { styled } from '../jss-style';
import virtualScrollStyle from './virtual-scroll';
import type { VirtualScrollClasses } from './virtual-scroll';

const useVirtualScrollStyle = styled(virtualScrollStyle, 'virtual');

export { virtualScrollStyle, useVirtualScrollStyle, VirtualScrollClasses };
export default useVirtualScrollStyle;
