import { styled } from '../jss-style';
import treeStyle, { TreeClasses } from './tree';

const useTreeStyle = styled(treeStyle, 'tree');
export { treeStyle, useTreeStyle };
export type { TreeClasses };
export default useTreeStyle;
