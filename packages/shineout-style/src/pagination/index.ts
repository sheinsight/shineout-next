import { styled } from '../jss-style';
import paginationStyle from './pagination';

const usePaginationStyle = styled(paginationStyle, 'tag');

export { paginationStyle, usePaginationStyle };

export type { PaginationClasses } from './pagination';
export default usePaginationStyle;
