
import { render, cleanup, fireEvent } from '@testing-library/react';
import Button from '..';
import mountTest from '../../tests/mountTest';
import {
  classContentTest,
  classTest,
  snapshotTest,
  styleTest,
  baseTest,
  textContentTest,
  attributesTest,
  displayTest,
  createClassName,
} from '../../tests/utils';
import { classLengthTest } from '../../tests/structureTest';
import ButtonBase from '../__example__/s-001-base';
import ButtonIcon from '../__example__/s-002-icon';
import ButtonShape from '../__example__/s-003-shape';
import ButtonSize from '../__example__/s-004-size';
import ButtonStatus from '../__example__/s-005-status';
import ButtonDisbled from '../__example__/s-006-disabled';
import ButtonLoading from '../__example__/s-007-loading';
import ButtonGroup from '../__example__/s-008-group';
import { useState } from 'react';

const SO_PREFIX = 'button';
const originClasses = [] as string[];
const originItemClasses = ['button', 'primary', 'secondary', 'outline', 'text', 'disabled', 'loading', 'href', 'round', 'square', 'circle', 'small', 'large', 'danger', 'warning', 'success'];
const {
  button: buttonClassName,
  secondary: buttonSecondary,
  outline: buttonOutline,
  text: buttonText,
  disabled: buttonDisabled,
  loading: buttonLoading,
  href: buttonHref,
  round: buttonRound,
  square: buttonSquare,
  circle: buttonCircle,
  small: buttonSmall,
  large: buttonLarge,
  primary: buttonPrimary,
  danger: buttonDanger,
  warning: buttonWarning,
  success: buttonSuccess,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});
afterEach(cleanup);
describe('Button[Base]', () => {
  mountTest(Button);
  baseTest(Button, 'button');
  displayTest(Button, 'ShineoutButton');
  snapshotTest(<ButtonBase />);
  snapshotTest(<ButtonIcon />, 'about icon');
  snapshotTest(<ButtonShape />, 'about shape');
  snapshotTest(<ButtonSize />, 'about size');
  snapshotTest(<ButtonStatus />, 'about status');
  snapshotTest(<ButtonDisbled />, 'about disbled');
  snapshotTest(<ButtonLoading />, 'about loading');
  snapshotTest(<ButtonGroup />, 'about group');
  test('should render className in a button', () => {
    const { container } = render(<ButtonBase />);
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(5);
    buttons.forEach((button) => {
      styleTest(button, 'margin: 0px;');
      classTest(button, buttonClassName);
      // classContentTest(button, button.textContent?.toLocaleLowerCase() as string);
    });
  });
  test('should render className about type and mode', () => {
    const { container } = render(
      <Button type='secondary' mode='outline'>
        Outline
      </Button>,
    );
    const button = container.querySelector('button');
    expect(button?.classList.contains(buttonSecondary)).toBeTruthy();
    expect(button?.classList.contains(buttonOutline)).toBeTruthy();
  });
  test('should render when default', () => {
    const { container } = render(<Button>button</Button>);
    const buttonWrapper = container.querySelector('button')!;
    classTest(buttonWrapper, buttonSecondary);
  });
  test('should render when set icon', () => {
    const { container } = render(<ButtonIcon />);
    container.querySelectorAll('button').forEach((button) => {
      classLengthTest(button, 'svg', 1);
    });
  });
  test('should render when set outline or text', () => {
    const { container } = render(<Button outline>button</Button>);
    classTest(container.querySelector('button')!, buttonOutline);
  });
  test('should render mode first when set mode and text or outline', () => {
    const { container } = render(
      <Button mode='outline' text>
        button
      </Button>,
    );
    const button = container.querySelector('button')!;
    classTest(button, buttonOutline);
    classTest(button, buttonText, false);
  });
  test('should render when set shape', () => {
    const shape = [buttonRound, buttonSquare, buttonCircle];
    const { container } = render(<ButtonShape />);
    container.querySelectorAll('button').forEach((button, index) => {
      if (index === 0) return;
      classContentTest(button, shape[index - 1]);
    });
  });
  test('should render when set size', () => {
    const sizes = [buttonSmall, '', buttonLarge];
    const { container } = render(<ButtonSize />);
    container.querySelectorAll('button').forEach((button, index) => {
      if (index === 1) return;
      classTest(button, sizes[index]);
    });
  });
  test('should render space in text when set space', () => {
    const { container } = render(<Button space>测试</Button>);
    const button = container.querySelector('button')!;
    expect(button?.textContent).not.toBe('测试');
    textContentTest(button, '测 试');
  });
});
describe('Button[Status]', () => {
  test('should render when set type', () => {
    const { container } = render(<ButtonStatus />);
    container.querySelectorAll('button').forEach((button, index) => {

      if (Math.floor(index / 4) === 0) classTest(button, buttonSecondary);
      if (Math.floor(index / 4) === 1) classTest(button, buttonPrimary);
      if (Math.floor(index / 4) === 2) classTest(button, buttonDanger);
      if (Math.floor(index / 4) === 3) classTest(button, buttonWarning);
      if (Math.floor(index / 4) === 4) classTest(button, buttonSuccess);
    });
  });
});
describe('Button[Disabled]', () => {
  test('should render when set disabled', () => {
    const { container } = render(<ButtonDisbled />);
    container.querySelectorAll('button').forEach((button) => {
      classTest(button, buttonDisabled);
    });
  });
  test('can not click when set disabled', () => {
    const handleFn = jest.fn();
    const { container } = render(
      <Button type='success' disabled onClick={handleFn}>
        button
      </Button>,
    );
    fireEvent.click(container.querySelector('button') as HTMLButtonElement);
    expect(handleFn.mock.calls.length).toBe(0);
  });
});
describe('Button[Loading]', () => {
  test('should render when set loading', () => {
    const { container } = render(<ButtonLoading />);
    const buttons = container.querySelectorAll('button');
    buttons.forEach((button, index) => {
      if(index > 3) return;
      expect(button.classList.contains(buttonLoading)).toBeTruthy();
    });
  });
  test('should can not click when set loading', () => {
    const handleFn = jest.fn();
    const { container } = render(
      <Button type='primary' loading onClick={handleFn}>
        button
      </Button>,
    );
    fireEvent.click(container.querySelector('button') as HTMLButtonElement);
    expect(handleFn.mock.calls.length).toBe(0);
  });
  test('should control by other status', () => {
    const ButtonLoadingStatus: React.FC<any> = () => {
      const [loading, setLoading] = useState<boolean>(false);
      const handleFn = jest.fn();
      return (
        <>
          <Button
            onClick={() => {
              setLoading(!loading);
            }}
          >
            Click
          </Button>
          <Button loading={loading} onClick={handleFn}>
            Status
          </Button>
        </>
      );
    };
    const { container } = render(<ButtonLoadingStatus />);
    fireEvent.click(container.querySelectorAll('button')[0]);
    classTest(container.querySelectorAll('button')[1]!, buttonLoading);
    fireEvent.click(container.querySelectorAll('button')[0]);
    classTest(container.querySelectorAll('button')[1]!, buttonLoading, false);
  });
});
// TODO: have warning about onRef when set href in button
describe('Button[Href]', () => {
  test('should render when set href', () => {
    const handleFn = jest.fn();
    const { container } = render(
      <Button href='aaa' onClick={handleFn}>
        href
      </Button>,
    );
    const href = container.querySelector('a')!;
    classLengthTest(container, 'a', 1);
    // classTest(href, buttonHref);
    attributesTest(href, 'href', 'aaa');
    fireEvent.click(href as HTMLAnchorElement);
    expect(handleFn.mock.calls.length).toBe(1);
  });
  test('should render when set href and target', () => {
    const { container } = render(
      <Button href='#home' target='_blank' type='primary'>
        Home
      </Button>,
    );
    const href = container.querySelector('a');
    expect(container.querySelectorAll('a').length).toBe(1);
    expect(href?.getAttribute('href')).toBe('#home');
    expect(href?.getAttribute('target')).toBe('_blank');
  });
});
describe('Button[HtmlType]', () => {
  const htmlTypes = ['button', 'reset', 'submit'];
  type htmlTypesProp = 'button' | 'submit' | 'reset' | undefined;
  htmlTypes.forEach((htmlType) => {
    test(`should render when set htmlType is ${htmlType}`, () => {
      const { container } = render(<Button htmlType={htmlType as htmlTypesProp}>Test</Button>);
      attributesTest(container.querySelector('button')!, 'type', htmlType);
    });
  });
});
describe('Button[Children]', () => {
  test('should render when children is null', () => {
    const { container } = render(<Button></Button>);
    expect(container.querySelector('button')?.firstChild).toBeNull();
  });
});
describe('Button[onClick]', () => {
  test('should render when set onClick', () => {
    const ButtonClick: React.FC<any> = () => {
      const [data, setData] = useState<number>(0);
      return (
        <>
          <span className='testData'>{data}</span>
          <Button
            onClick={() => {
              setData((prev) => prev + 1);
            }}
          >
            Click
          </Button>
        </>
      );
    };
    const { container } = render(<ButtonClick />);
    const testData = container.querySelector('.testData')!;
    const button = container.querySelector('button') as HTMLButtonElement;
    textContentTest(testData, '0');
    fireEvent.click(button);
    textContentTest(testData, '1');
    fireEvent.click(button);
    textContentTest(testData, '2');
  });
});
