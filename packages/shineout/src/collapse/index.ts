import Collapse from './collapse';
import CollapseItem from './collapse-item';

type RefCollapse = typeof Collapse;
type RefCollapseItem = typeof CollapseItem;

interface ItemComponent extends RefCollapseItem {
  displayName: string;
}

const Item: ItemComponent = CollapseItem as ItemComponent;
Item.displayName = 'ShineoutCollapseItem';

export interface CollapseComponent extends RefCollapse {
  Item: ItemComponent;
  displayName: string;
}

const CollapseComp: CollapseComponent = Collapse as CollapseComponent;

CollapseComp.Item = Item;
CollapseComp.displayName = 'ShineoutCollapse';

export default CollapseComp;
