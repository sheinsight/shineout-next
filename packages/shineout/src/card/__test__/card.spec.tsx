import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '..';
import {
  baseTest,
  childrenTest,
  classTest,
  createClassName,
  delay,
  displayTest,
  snapshotTest,
  styleContentTest,
  styleTest,
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
import CardCollapse from '../__example__/07-collapse';
import CardAccordion from '../__example__/08-accordion';

const SO_PREFIX = 'card';
const originClasses = [
  'wrapper',
  'header',
  'body',
  'footer',
  'headerContent',
  'headerExtra',
  'indicator',
  'indicatorIcon',
  'bodyCollapse',
  'accordion',
  'resizeX',
  'resizeY',
  'resizeXY',
];
const originItemClasses = [
  'wrapperSplit',
  'wrapperShadow',
  'wrapperHover',
  'right',
  'center',
  'wrapperCollapsible',
  'wrapperCollapsed',
  'wrapperInAccordion',
  'wrapperResizable',
  'wrapperMoveable',
];
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
  right,
  center,
  wrapperCollapsible,
  indicator,
  indicatorIcon,
  bodyCollapse,
  accordion,
  wrapperCollapsed,
  wrapperInAccordion,
  resizeX,
  resizeY,
  resizeXY,
  wrapperResizable,
  wrapperMoveable,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const activeDefaultStyle = 'display: block; height: auto; transition: height 240ms ease-in-out;';
const noActiveDefaultStyle = 'display: block; height: 0px; overflow: hidden;';
const closeDefaultStyle = 'display: none; height: auto; transition: height 240ms ease-in-out;'
const noActiveTrueDefaultStyle = 'display: none; height: 0px; overflow: hidden;'

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

const CardFooterTest = (props: any) => (
  <Card>
    <Card.Header>{testHeaderContent}</Card.Header>
    <Card.Body>{testBodyContent}</Card.Body>
    <Card.Footer {...props}>{props.children || testFooterContent}</Card.Footer>
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
  snapshotTest(<CardCollapse />, 'about collapse');
  snapshotTest(<CardAccordion />, 'about accordion');
  test('should render default', () => {
    const extraContent = 'test'
    const { container, rerender } = render(<CardHeaderTest extra={extraContent} />);
    const cardWrapper = container.querySelector(wrapper)!;
    const cardHeader = cardWrapper.querySelector(header)!;
    const cardBody = cardWrapper.querySelector(body)!;
    const cardFooter = cardWrapper.querySelector(footer)!;
    const cardHeaderContent = cardHeader.querySelector(headerContent)!;

    textContentTest(cardHeaderContent, testHeaderContent);
    textContentTest(cardHeader.querySelector(headerExtra)!, extraContent);
    textContentTest(cardBody, testBodyContent);
    textContentTest(cardFooter, testFooterContent);
    classTest(cardFooter, right);
    rerender(<CardHeaderTest />);
    expect(container.querySelector(headerContent)).not.toBeInTheDocument();
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
  test('should render when set align is center in header', () => {
    const { container } = render(<CardHeaderTest align='center' />);
    const cardHeader = container.querySelector(header)!;
    classTest(cardHeader, center);
  });
  test('should render when set align is right in footer', () => {
    const { container } = render(<CardHeaderTest align='right' />);
    const cardHeader = container.querySelector(header)!;
    classTest(cardHeader, right);
  });
});
describe('Card[Footer]', () => {
  test('should render when set footer only', () => {
    const { container } = render(<Card.Footer>{testFooterContent}</Card.Footer>);
    expect(container.querySelector(footer)).toBeInTheDocument();
  });
  test('should render when set align is center in footer', () => {
    const { container } = render(<CardFooterTest align='center' />);
    const cardFooter = container.querySelector(footer)!;
    classTest(cardFooter, center);
  });
  test('should render when set align is center in left', () => {
    const { container } = render(<CardFooterTest align='left' />);
    const cardFooter = container.querySelector(footer)!;
    classTest(cardFooter, center, false);
    classTest(cardFooter, right, false);
  });
});
describe('Card[Collapse]', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.runAllTimers();
  });
  test('should render when set collapsible is true', async () => {
    const { container } = render(<CardTest collapsible />);

    const cardWrapper = container.querySelector(wrapper)!;
    classTest(cardWrapper, wrapperCollapsible);
    const cardHeaderWrapper = cardWrapper.querySelector(header)!;
    const cardIndicatorWrapper = cardHeaderWrapper.querySelector(indicator)!;
    classLengthTest(cardIndicatorWrapper, indicatorIcon, 1);
    const cardBodyCollapse = cardWrapper.querySelector(bodyCollapse)!;
    styleContentTest(cardBodyCollapse, noActiveTrueDefaultStyle);
    await waitFor(async () => {
      await delay(500);
    });

    styleContentTest(cardBodyCollapse, closeDefaultStyle);
    fireEvent.click(cardIndicatorWrapper.querySelector(indicatorIcon)!);
    await waitFor(async () => {
      await delay(500);
    });

    styleContentTest(cardBodyCollapse, activeDefaultStyle);
    fireEvent.click(cardIndicatorWrapper.querySelector(indicatorIcon)!);
    await waitFor(async () => {
      await delay(500);
    });
    styleContentTest(cardBodyCollapse, closeDefaultStyle);
  });
  test('should render when set defaultCollapsed', async () => {
    const { container } = render(<CardTest collapsible defaultCollapsed />);
    await waitFor(async () => {
      await delay(500);
    });

    const cardWrapper = container.querySelector(wrapper)!;
    const cardBodyCollapse = cardWrapper.querySelector(bodyCollapse)!;
    styleContentTest(cardBodyCollapse, closeDefaultStyle);

    const cardIndicatorWrapper = cardWrapper.querySelector(indicator)!;
    fireEvent.click(cardIndicatorWrapper.querySelector(indicatorIcon)!);
    await waitFor(async () => {
      await delay(500);
    });

    styleContentTest(cardBodyCollapse, activeDefaultStyle);
  });
  test('should render when set collapsed and defaultCollapsed at the same time', async () => {
    const { container } = render(<CardTest collapsible collapsed={false} defaultCollapsed />);
    await waitFor(async () => {
      await delay(500);
    });
    const cardWrapper = container.querySelector(wrapper)!;
    const cardBodyCollapse = cardWrapper.querySelector(bodyCollapse)!;
    styleContentTest(cardBodyCollapse, activeDefaultStyle);
  });
  test('should render when set collapsed and onCollapse', async () => {
    const App = () => {
      const [collapsed, setCollapsed] = React.useState(false);
      const onCollapse = (d: boolean) => {
        setCollapsed(!d);
      };
      return <CardTest collapsed={collapsed} onCollapse={onCollapse} collapsible />;
    };
    const { container } = render(<App />);
    const cardWrapper = container.querySelector(wrapper)!;
    const cardBodyCollapse = cardWrapper.querySelector(bodyCollapse)!;
    const cardIndicatorWrapper = cardWrapper.querySelector(indicator)!;
    fireEvent.click(cardIndicatorWrapper.querySelector(indicatorIcon)!);
    await waitFor(async () => {
      await delay(500);
    });
    styleContentTest(cardBodyCollapse, activeDefaultStyle);
  });
});
describe('Card[Form/Accordion]', () => {
  test('should render when set card.submit', async () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <CardFooterTest>
        <Card.Submit onClick={onSubmit} />
      </CardFooterTest>,
    );
    const cardFooter = container.querySelector(footer)!;
    fireEvent.click(cardFooter.querySelector('button')!);
    await waitFor(async () => {
      await delay(500);
    });
    expect(onSubmit.mock.calls.length).toBe(1);
  });
  test('should render when is accordion', async () => {
    const { container } = render(
      <Card.Accordion>
        <CardTest />
        <CardTest />
        <CardTest />
      </Card.Accordion>,
    );

    const cardAccordion = container.querySelector(accordion)!;
    const cardWrappers = cardAccordion.querySelectorAll(wrapper)!;
    cardWrappers.forEach((item) => {
      classTest(item, wrapperInAccordion);
      classTest(item, wrapperCollapsed);
      styleContentTest(item.querySelector(bodyCollapse)!, noActiveDefaultStyle);
    });
    fireEvent.click(cardWrappers[0].querySelector(indicatorIcon)!);
    await waitFor(async () => {
      await delay(500)
    })

    styleContentTest(cardWrappers[0].querySelector(bodyCollapse)!, activeDefaultStyle);
    fireEvent.click(cardWrappers[1].querySelector(indicatorIcon)!);
    await waitFor(async () => {
      await delay(500);
    });
    styleContentTest(cardWrappers[0].querySelector(bodyCollapse)!, closeDefaultStyle);
    styleContentTest(cardWrappers[1].querySelector(bodyCollapse)!, activeDefaultStyle);
  });
});
describe('Card[Resizable/Moveable]', () => {
  test('should render when set resizable', () => {
    const wrapperStyle = (height: number, width: number) =>
      `width: ${width}px; height: ${height}px;`;
    const { container } = render(<CardTest resizable />);
    const cardWrapper = container.querySelector(wrapper)!;
    classTest(cardWrapper, wrapperResizable);
    const cardResizeX = cardWrapper.querySelector(resizeX)!;
    const cardResizeY = cardWrapper.querySelector(resizeY)!;
    const cardResizeXY = cardWrapper.querySelector(resizeXY)!;
    expect(cardResizeX).toBeInTheDocument();
    expect(cardResizeY).toBeInTheDocument();
    expect(cardResizeXY).toBeInTheDocument();
    fireEvent.mouseDown(cardResizeX);
    fireEvent.mouseMove(cardResizeX, { clientX: 100 });
    fireEvent.mouseUp(cardResizeX);
    styleTest(cardWrapper, wrapperStyle(0, 100));
    fireEvent.mouseDown(cardResizeY);
    fireEvent.mouseMove(cardResizeY, { clientY: 100 });
    fireEvent.mouseUp(cardResizeY);
    styleTest(cardWrapper, wrapperStyle(100, 0));
    fireEvent.mouseDown(cardResizeXY);
    fireEvent.mouseMove(cardResizeXY, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(cardResizeXY);
    styleTest(cardWrapper, wrapperStyle(100, 100));
  });
  test('should render when set moveable', () => {
    const { container } = render(<CardTest moveable />);
    const cardWrapper = container.querySelector(wrapper)!;
    classTest(cardWrapper, wrapperMoveable);
    const cardHeader = cardWrapper.querySelector(header)!;
    fireEvent.mouseDown(cardHeader);
    fireEvent.mouseMove(document, { clientY: 1000 });
    fireEvent.mouseUp(document);
    // should render
  });
});