import Card from './card';

type RefCard = typeof Card;

export interface CardComponent extends RefCard {
  displayName: string;
}

const CardComp: CardComponent = Card as CardComponent;

CardComp.displayName = 'ShineoutCard';

export default CardComp;
