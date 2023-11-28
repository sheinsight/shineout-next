import Pagination from './pagination';

type RefPagination = typeof Pagination;
export interface PaginationComponent extends RefPagination {
  displayName: string;
}

(Pagination as PaginationComponent).displayName = 'ShineoutPagination';

export default Pagination as PaginationComponent;
