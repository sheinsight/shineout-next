import List from './list';
import BaseItem from './base-item';

type RefList = typeof List;
type RefBaseItem = typeof BaseItem;

export interface BaseItemComponent extends RefBaseItem {
  displayName: string;
}

export interface ListComponent extends RefList {
  displayName: string;
  BaseItem: BaseItemComponent;
}

const BaseItemComp: BaseItemComponent = BaseItem as BaseItemComponent;

const ListComp: ListComponent = List as ListComponent;

ListComp.displayName = 'ShineoutList';
ListComp.BaseItem = BaseItemComp;

export default ListComp;
