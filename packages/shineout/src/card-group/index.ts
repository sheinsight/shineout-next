import CardGroup from './card-group';
import GroupItem from './item';

type RefCardGroup = typeof CardGroup;

const Item = GroupItem as typeof GroupItem & { displayName: string };
Item.displayName = 'ShineoutCardGroupItem';

export interface CardGroupComponent extends RefCardGroup {
  displayName: string;
  Item: typeof Item;
}

const CardGroupComp: CardGroupComponent = CardGroup as CardGroupComponent;

CardGroupComp.displayName = 'ShineoutCardGroup';
CardGroupComp.Item = Item;

export default CardGroupComp;
