import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Button from '..';
// import { Form } from 'shineout';
import mountTest from '../../tests/mountTest';
import {
  classContentTest,
  classTest,
  snapshotTest,
  styleTest,
  baseTest,
  textContentTest,
  attributesTest,
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
const buttonClassName = `${SO_PREFIX}-button-0-2-1`;
const buttonSecondary = `${SO_PREFIX}-secondary-0-2-6`;
const buttonOutline = `${SO_PREFIX}-outline-0-2-11`;
const buttonDefault = `${SO_PREFIX}-default-0-2-4`;
const buttonText = `${SO_PREFIX}-text-0-2-13`;
const buttonDisabled = `${SO_PREFIX}-disabled-0-2-18`;
const buttonLoading = `${SO_PREFIX}-loading-0-2-19`;
const buttonHref = `${SO_PREFIX}-href-0-2-14`;

afterEach(cleanup);
describe('Button[Base]', () => {
  mountTest(Button);
  baseTest(Button, 'button');
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
      classContentTest(button, button.textContent?.toLocaleLowerCase() as string);
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
    classTest(container.querySelector('button')!, buttonDefault);
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
    const shape = ['square', 'circle', 'round'];
    const { container } = render(<ButtonShape />);
    container.querySelectorAll('button').forEach((button, index) => {
      if (index === 3) return;
      expect(button.classList[2].includes(shape[index])).toBeTruthy();
    });
  });
  test('should render when set size', () => {
    const sizes = ['small', '', 'large'];
    const { container } = render(<ButtonSize />);
    container.querySelectorAll('button').forEach((button, index) => {
      if (!button.classList[2]) return;
      expect(button.classList[2].includes(sizes[index])).toBeTruthy();
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
    container.querySelectorAll('button').forEach((button) => {
      expect(
        button.classList[0].includes(button.textContent?.toLocaleLowerCase() as string),
      ).toBeTruthy();
    });
  });
});
describe('Button[Disabled]', () => {
  test('should render when set disabled', () => {
    const { container } = render(<ButtonDisbled />);
    container.querySelectorAll('button').forEach((button) => {
      expect(
        button.classList[0].includes(button.textContent?.toLocaleLowerCase() as string),
      ).toBeTruthy();
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
  // TODO: form中还未有button
  // test('should render when set disabled in form', () => {
  //   const handleFn = jest.fn()
  //   const { container } = render(
  //     <Form disabled={true}>
  //       <Button disabled={false} type='success' onClick={handleFn}>button</Button>
  //     </Form>
  //   )
  //   fireEvent.click(container.querySelector('button') as HTMLButtonElement)
  //   expect(handleFn.mock.calls.length).toBe(1)
  // })
});
describe('Button[Loading]', () => {
  test('should render when set loading', () => {
    const { container } = render(<ButtonLoading />);
    container.querySelectorAll('button').forEach((button) => {
      expect(button.classList.contains(buttonLoading)).toBeTruthy();
    });
  });
  // TODO: 未开发spin，当前onClick不受loading控制
  // test('should can not click when set loading', () => {
  //   const handleFn = jest.fn()
  //   const { container } = render(<Button type='primary' loading onClick={handleFn}>button</Button>)
  //   screen.debug()
  //   fireEvent.click(container.querySelector('button') as HTMLButtonElement)
  //   console.log('121', handleFn.mock.calls)
  //   expect(handleFn.mock.calls.length).toBe(0)
  // })
  // TODO: 添加对onClick的测试
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
    classTest(href, buttonHref);
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
    expect(href?.classList.contains(`${SO_PREFIX}-href-0-2-14`)).toBeTruthy();
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
      attributesTest(container.querySelector('button')!, 'htmltype', htmlType);
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
    screen.debug();
    const testData = container.querySelector('.testData')!;
    const button = container.querySelector('button') as HTMLButtonElement;
    textContentTest(testData, '0');
    fireEvent.click(button);
    textContentTest(testData, '1');
    fireEvent.click(button);
    textContentTest(testData, '2');
  });
});
// TODO: onRef
