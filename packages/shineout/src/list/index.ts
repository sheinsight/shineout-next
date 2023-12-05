import List from './list';

type RefList = typeof List;

export interface ListComponent extends RefList {
  displayName: string;
}

const ListComp: ListComponent = List as ListComponent;

ListComp.displayName = 'ShineoutList';

export default ListComp;
