import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Badge from '..';
import mountTest from '../../tests/mountTest';
import {
  childrenTest,
  classContentTest,
  createClassName,
  displayTest,
  snapshotTest,
  textContentTest,
} from '../../tests/utils';
import BadgeBase from '../__example__/01-base';
import BadgeNoChildren from '../__example__/02-nochildren';
import BadgeOverflowCount from '../__example__/03-overflowcount';
import BadgeSmallSize from '../__example__/03-small-size';
import BadgeDot from '../__example__/04-dot';
import BadgeStatus from '../__example__/05-status';

const SO_PREFIX = 'badge';
const originClasses = ['badge', 'textBadge', 'standalone'];
const originItemClasses = [
  'count',
  'custom',
  'number',
  'small',
  'dot',
  'textDot',
  'text',
  'singleWord',
  'multipleWords',
  'warning',
  'success',
  'error',
  'default',
  'processing',
];

const { badge, textBadge, standalone, count, number, small, dot, textDot, text, singleWord, multipleWords } =
  createClassName(SO_PREFIX, originClasses, originItemClasses);

afterEach(cleanup);
mountTest(<Badge count={1} />);

describe('Badge[Base]', () => {
  displayTest(Badge, 'ShineoutBadge');
  childrenTest(Badge, badge);

  test('should render when set className', () => {
    const { container } = render(<Badge count={1} className="demo" />);
    const wrapper = container.querySelector(badge)!;
    expect(wrapper.classList.contains('demo')).toBe(true);
  });
  snapshotTest(<BadgeBase />);
  snapshotTest(<BadgeNoChildren />, 'about no children');
  snapshotTest(<BadgeOverflowCount />, 'about overflow count');
  snapshotTest(<BadgeSmallSize />, 'about small size');
  snapshotTest(<BadgeDot />, 'about dot');
  snapshotTest(<BadgeStatus />, 'about status');

  test('should render default with count', () => {
    const { container } = render(<Badge count={5}><span>child</span></Badge>);
    const wrapper = container.querySelector(badge)!;
    expect(wrapper).toBeInTheDocument();
    const sup = wrapper.querySelector('sup')!;
    expect(sup).toBeInTheDocument();
    classContentTest(sup, number);
    classContentTest(sup, singleWord);
    textContentTest(sup, '5');
  });

  test('should render multi-digit count', () => {
    const { container } = render(<Badge count={100}><span>child</span></Badge>);
    const sup = container.querySelector('sup')!;
    classContentTest(sup, number);
    classContentTest(sup, multipleWords);
    textContentTest(sup, '100');
  });

  test('should not render when count is 0 and showZero is false', () => {
    const { container } = render(<Badge count={0}><span>child</span></Badge>);
    const sup = container.querySelector('sup');
    expect(sup).toBeNull();
  });

  test('should render when count is 0 and showZero is true', () => {
    const { container } = render(<Badge count={0} showZero><span>child</span></Badge>);
    const sup = container.querySelector('sup')!;
    expect(sup).toBeInTheDocument();
    textContentTest(sup, '0');
  });
});

describe('Badge[OverflowCount]', () => {
  test('should render overflowCount+', () => {
    const { container } = render(<Badge count={100} overflowCount={99}><span>child</span></Badge>);
    const sup = container.querySelector('sup')!;
    textContentTest(sup, '99+');
    classContentTest(sup, multipleWords);
  });

  test('should render normal count when less than overflowCount', () => {
    const { container } = render(<Badge count={50} overflowCount={99}><span>child</span></Badge>);
    const sup = container.querySelector('sup')!;
    textContentTest(sup, '50');
  });
});

describe('Badge[Size]', () => {
  test('should render small size', () => {
    const { container } = render(<Badge count={5} size="small"><span>child</span></Badge>);
    const sup = container.querySelector('sup')!;
    classContentTest(sup, small);
  });

  test('should not have small class when size is default', () => {
    const { container } = render(<Badge count={5}><span>child</span></Badge>);
    const sup = container.querySelector('sup')!;
    classContentTest(sup, small, false);
  });
});

describe('Badge[Dot]', () => {
  test('should render dot mode', () => {
    const { container } = render(<Badge dot><span>child</span></Badge>);
    const sup = container.querySelector('sup')!;
    classContentTest(sup, dot);
    expect(sup.textContent).toBe('');
  });

  test('should render dot with color', () => {
    const { container } = render(<Badge dot color="green"><span>child</span></Badge>);
    const sup = container.querySelector('sup')!;
    expect(sup.style.background).toBe('green');
  });

  test('should render dot with text (textBadge mode)', () => {
    const { container } = render(<Badge dot text="Online" />);
    const wrapper = container.querySelector(badge)!;
    classContentTest(wrapper, textBadge.replace('.', ''));
    const dotEl = wrapper.querySelector(`span`)!;
    expect(dotEl).toBeInTheDocument();
    expect(wrapper.textContent).toContain('Online');
  });

  test('should apply color in dot + text mode', () => {
    const { container } = render(<Badge dot color="green" text="Online" />);
    const wrapper = container.querySelector(badge)!;
    const dotEl = wrapper.querySelectorAll('span')[0]!;
    expect(dotEl.style.background).toBe('green');
  });
});

describe('Badge[Status]', () => {
  const statuses = ['default', 'processing', 'error', 'warning', 'success'] as const;

  statuses.forEach((status) => {
    test(`should render status ${status}`, () => {
      const { container } = render(<Badge dot status={status} />);
      const wrapper = container.querySelector(badge)!;
      const dotEl = wrapper.querySelectorAll('span')[0]!;
      classContentTest(dotEl, `${SO_PREFIX}-${status}`);
    });
  });

  test('should render status with text', () => {
    const { container } = render(<Badge dot status="success" text="Success" />);
    const wrapper = container.querySelector(badge)!;
    expect(wrapper.textContent).toContain('Success');
  });
});

describe('Badge[Standalone]', () => {
  test('should render standalone mode without children', () => {
    const { container } = render(<Badge count={5} />);
    const wrapper = container.querySelector(badge)!;
    classContentTest(wrapper, standalone.replace('.', ''));
  });

  test('should render standalone with color', () => {
    const { container } = render(<Badge count={5} color="#faad14" />);
    const sup = container.querySelector('sup')!;
    expect(sup.style.background).toBe('rgb(250, 173, 20)');
  });

  test('should render custom ReactElement count', () => {
    const { container } = render(<Badge count={<span className="custom-icon">★</span>}><span>child</span></Badge>);
    const wrapper = container.querySelector(badge)!;
    expect(wrapper.querySelector('.custom-icon')).toBeInTheDocument();
    expect(wrapper.querySelector('.custom-icon')!.textContent).toBe('★');
  });

  test('should render string count', () => {
    const { container } = render(<Badge count="hot"><span>child</span></Badge>);
    const sup = container.querySelector('sup')!;
    expect(sup).toBeInTheDocument();
  });
});
