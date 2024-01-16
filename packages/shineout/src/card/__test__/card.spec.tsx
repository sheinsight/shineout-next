import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '..';
import {
  baseTest,
  childrenTest,
  classTest,
  createClassName,
  displayTest,
  snapshotTest,
  textContentTest,
} from '../../tests/utils';
import { classLengthTest } from '../../tests/structureTest';
import mountTest from '../../tests/mountTest';
import CardBase from '../__example__/01-base';
import CardShadow from '../__example__/02-shadow';
import CardHover from '../__example__/03-hover';
import CardBorder from '../__example__/04-border';
import CardSplit from '../__example__/05-split';
import CardForm from '../__example__/06-form';
import CardCollpase from '../__example__/07-collpase';
import CardAccordion from '../__example__/08-accordion';

const SO_PREFIX = 'card';
const originClasses = ['wrapper', 'header', 'body', 'footer', 'headerContent', 'headerExtra'];
const originItemClasses = ['wrapperSplit', 'wrapperShadow', 'wrapperHover'];
const {
  wrapper,
  header,
  body,
  footer,
  headerContent,
  wrapperSplit,
  wrapperShadow,
  wrapperHover,
  headerExtra,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const testHeaderContent = 'Header';
const testBodyContent = 'body';
const testFooterContent = 'footer';

const CardTest = (props: any) => (
  <Card {...props}>
    <Card.Header>{testHeaderContent}</Card.Header>
    <Card.Body>{testBodyContent}</Card.Body>
    <Card.Footer>{testFooterContent}</Card.Footer>
  </Card>
);

const CardHeaderTest = (props: any) => (
  <Card>
    <Card.Header {...props}>{testHeaderContent}</Card.Header>
    <Card.Body>{testBodyContent}</Card.Body>
    <Card.Footer>{testFooterContent}</Card.Footer>
  </Card>
);

afterEach(cleanup);
mountTest(<Card />);

describe('Card[Base]', () => {
  displayTest(Card, 'ShineoutCard');
  baseTest(Card, wrapper);
  baseTest(Card.Header, header);
  baseTest(Card.Body, body);
  baseTest(Card.Footer, footer);
  childrenTest(Card, wrapper);
  childrenTest(Card.Header, header);
  childrenTest(Card.Body, body);
  childrenTest(Card.Footer, footer);
  snapshotTest(<CardBase />);
  snapshotTest(<CardShadow />, 'about shadow');
  snapshotTest(<CardHover />, 'about hover');
  snapshotTest(<CardBorder />, 'about border');
  snapshotTest(<CardSplit />, 'about split');
  snapshotTest(<CardForm />, 'about form');
  snapshotTest(<CardCollpase />, 'about collpase');
  snapshotTest(<CardAccordion />, 'about accordion');
  test('should render default', () => {
    const { container } = render(<CardTest />);
    const cardWrapper = container.querySelector(wrapper)!;
    const cardHeader = cardWrapper.querySelector(header)!;
    const cardBody = cardWrapper.querySelector(body)!;
    const cardFooter = cardWrapper.querySelector(footer)!;
    const cardHeaderContent = cardHeader.querySelector(headerContent)!;
    textContentTest(cardHeaderContent, testHeaderContent);
    textContentTest(cardBody, testBodyContent);
    textContentTest(cardFooter, testFooterContent);
  });
  test('should render when set split', () => {
    const { container } = render(<CardTest split />);
    const cardWrapper = container.querySelector(wrapper)!;
    classTest(cardWrapper, wrapperSplit);
  });
  test('should render when set shadow is true', () => {
    const { container } = render(<CardTest shadow />);
    const cardWrapper = container.querySelector(wrapper)!;
    classTest(cardWrapper, wrapperShadow);
  });
  test('should render when set shadow is hover', () => {
    const { container } = render(<CardTest shadow='hover' />);
    const cardWrapper = container.querySelector(wrapper)!;
    classTest(cardWrapper, wrapperHover);
  });
});
describe('Card[Header]', () => {
  test('should render when set header only', () => {
    const { container } = render(<Card.Header>{testHeaderContent}</Card.Header>);
    expect(container.querySelector(header)).toBeInTheDocument();
  });
  test('should render when set extra', () => {
    const { container } = render(<CardHeaderTest extra={<div className='demo'>extra</div>} />);
    const cardHeader = container.querySelector(header)!;
    const cardHeaderExtra = cardHeader.querySelector(headerExtra)!;
    classLengthTest(cardHeaderExtra, '.demo', 1);
  });
  // TODO: align
  test('should render when set align is center', () => {
    render(<CardHeaderTest align='center' />);
    screen.debug();
  });
});
