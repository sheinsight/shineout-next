import { styled } from '../jss-style';
import menuStyle from './menu';
import menuSearchStyle from './search';

const useMenuStyle = styled(menuStyle, 'menu');
export { menuStyle, useMenuStyle };
export default useMenuStyle;

const useMenuSearchStyle = styled(menuSearchStyle, 'menu-search');
export { menuSearchStyle, useMenuSearchStyle };
