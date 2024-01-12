import Card from './card';
import Header from './header';
import Body from './body';
import Footer from './footer';
import Accordion from './accordion';
import Submit from '../modal/submit';

type RefCard = typeof Card;

const HeaderComp = Header as typeof Header & { displayName: string };
const BodyComp = Body as typeof Body & { displayName: string };
const FooterComp = Footer as typeof Footer & { displayName: string };
const SubmitComp = Submit as typeof Submit & { displayName: string };
const AccordionComp = Accordion as typeof Accordion & { displayName: string };

HeaderComp.displayName = 'ShineoutCardHeader';
BodyComp.displayName = 'ShineoutCardBody';
FooterComp.displayName = 'ShineoutCardFooter';
SubmitComp.displayName = 'ShineoutCardSubmit';
AccordionComp.displayName = 'ShineoutCardAccordion';

export interface CardComponent extends RefCard {
  displayName: string;
  Header: typeof HeaderComp;
  Body: typeof BodyComp;
  Footer: typeof FooterComp;
  Submit: typeof SubmitComp;
  Accordion: typeof AccordionComp;
}

const CardComp: CardComponent = Card as CardComponent;

CardComp.displayName = 'ShineoutCard';
CardComp.Header = HeaderComp;
CardComp.Body = BodyComp;
CardComp.Footer = FooterComp;
CardComp.Accordion = AccordionComp;
CardComp.Submit = SubmitComp;

export default CardComp;
