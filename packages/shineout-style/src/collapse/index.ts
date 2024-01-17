import { styled } from '../jss-style';
import collapseStyle from './collapse';
import collapseItemStyle from './collapse-item';

const useCollapseStyle = styled(collapseStyle, 'collapse');
export { collapseStyle, useCollapseStyle };
export default useCollapseStyle;

const useCollapseItemStyle = styled(collapseItemStyle, 'collapseItem');
export { collapseItemStyle, useCollapseItemStyle };
