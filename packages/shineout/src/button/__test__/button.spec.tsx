import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Button from '..';
// import { Form } from 'shineout';
import mountTest from '../../tests/mountTest';
import ButtonBase from '../__example__/s-001-base';
import ButtonIcon from '../__example__/s-002-icon';
import ButtonShape from '../__example__/s-003-shape';
import ButtonSize from '../__example__/s-004-size';
import ButtonStatus from '../__example__/s-005-status';
import ButtonDisbled from '../__example__/s-006-disabled';
import ButtonLoading from '../__example__/s-007-loading';
import { useState } from 'react';

const SO_PREFIX = 'button';
afterEach(cleanup);
describe('Button[Base]', () => {
  mountTest(Button);

  test('should render correctly', () => {
    const { container } = render(<ButtonBase />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render className in a button', () => {
    const { container } = render(<ButtonBase />);
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(5);
    buttons.forEach((button) => {
      expect(button.getAttribute('style')).toBe('margin: 0px;');
      expect(button.classList.contains(`${SO_PREFIX}-button-0-2-1`)).toBeTruthy();
      expect(
        button.getAttribute('class')?.includes(button.textContent?.toLocaleLowerCase() as string),
      ).toBeTruthy();
    });
  });
  test('should render className about type and mode', () => {
    const { container } = render(
      <Button type='secondary' mode='outline'>
        Outline
      </Button>,
    );
    const button = container.querySelector('button');
    expect(button?.classList.contains(`${SO_PREFIX}-secondary-0-2-6`)).toBeTruthy();
    expect(button?.classList.contains(`${SO_PREFIX}-outline-0-2-11`)).toBeTruthy();
  });
  test('should render when default', () => {
    const { container } = render(<Button>button</Button>);
    expect(
      container.querySelector('button')?.classList.contains(`${SO_PREFIX}-default-0-2-4`),
    ).toBeTruthy();
  });
  test('should render when set className', () => {
    const { container } = render(<Button className='button'>className</Button>);
    expect(container.querySelector('button')?.classList.contains('button')).toBeTruthy();
  });
  test('should render when set icon', () => {
    const { container } = render(<ButtonIcon />);
    expect(container.firstChild).toMatchSnapshot();
    container.querySelectorAll('button').forEach((button) => {
      expect(button.querySelectorAll('svg').length).toBe(1);
    });
  });
  test('should render when set outline or text', () => {
    const { container } = render(<Button outline>button</Button>);
    expect(
      container.querySelector('button')?.classList.contains(`${SO_PREFIX}-outline-0-2-11`),
    ).toBeTruthy();
  });
  test('should render mode first when set mode and text or outline', () => {
    const { container } = render(
      <Button mode='outline' text>
        button
      </Button>,
    );
    const button = container.querySelector('button');
    expect(button?.classList.contains(`${SO_PREFIX}-outline-0-2-11`)).toBeTruthy();
    expect(button?.classList.contains(`${SO_PREFIX}-text-0-2-13`)).toBeFalsy();
  });
  test('should render when set shape', () => {
    const shape = ['square', 'circle', 'round'];
    const { container } = render(<ButtonShape />);
    expect(container.firstChild).toMatchSnapshot();
    container.querySelectorAll('button').forEach((button, index) => {
      if (index === 3) return;
      expect(button.classList[2].includes(shape[index])).toBeTruthy();
    });
  });
  test('should render when set size', () => {
    const sizes = ['small', '', 'large'];
    const { container } = render(<ButtonSize />);
    expect(container.firstChild).toMatchSnapshot();
    container.querySelectorAll('button').forEach((button, index) => {
      if (!button.classList[2]) return;
      expect(button.classList[2].includes(sizes[index])).toBeTruthy();
    });
  });
  test('should render space in text when set space', () => {
    const { container } = render(<Button space>测试</Button>);
    const button = container.querySelector('button');
    expect(button?.textContent).not.toBe('测试');
    expect(button?.textContent).toBe('测 试');
  });
});
describe('Button[Status]', () => {
  test('should render when set type', () => {
    const { container } = render(<ButtonStatus />);
    expect(container.firstChild).toMatchSnapshot();
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
    expect(container.firstChild).toMatchSnapshot();
    container.querySelectorAll('button').forEach((button) => {
      expect(
        button.classList[0].includes(button.textContent?.toLocaleLowerCase() as string),
      ).toBeTruthy();
      expect(button.classList.contains(`${SO_PREFIX}-disabled-0-2-18`)).toBeTruthy();
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
    expect(container.firstChild).toMatchSnapshot();
    container.querySelectorAll('button').forEach((button) => {
      expect(button.classList.contains(`${SO_PREFIX}-loading-0-2-19`)).toBeTruthy();
    });
  });
  // TODO: 未开发spin，当前onClick不受loading控制
  // test('should can not click when set loading', () => {
  //   const handleFn = jest.fn()
  //   const { container } = render(<Button type='success' loading onClick={handleFn}>button</Button>)
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
    expect(
      container.querySelectorAll('button')[1].classList.contains(`${SO_PREFIX}-loading-0-2-19`),
    ).toBeTruthy();
    fireEvent.click(container.querySelectorAll('button')[0]);
    expect(
      container.querySelectorAll('button')[1].classList.contains(`${SO_PREFIX}-loading-0-2-19`),
    ).toBeFalsy();
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
    const href = container.querySelector('a');
    expect(container.querySelectorAll('a').length).toBe(1);
    expect(href?.classList.contains(`${SO_PREFIX}-href-0-2-14`)).toBeTruthy();
    expect(href?.getAttribute('href')).toBe('aaa');
    fireEvent.click(href as HTMLAnchorElement);
    // TODO:useButton href 两次click
    // expect(handleFn.mock.calls.length).toBe(1)
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
  htmlTypes.forEach((htmlType) => {
    test(`should render when set htmlType is ${htmlType}`, () => {
      const { container } = render(<Button htmlType={htmlType}>Test</Button>);
      expect(container.querySelector('button')?.getAttribute('htmltype')).toBe(htmlType);
    });
  });
});
describe('Button[Children]', () => {
  test('should render without errors when children is null', () => {
    const { container } = render(<Button></Button>);
    expect(container.querySelector('button')?.firstChild).toBeNull();
  });
  test('should render without errors when children is undefined', () => {
    const { container } = render(<Button>{undefined}</Button>);
    expect(container.querySelector('button')?.firstChild).toBeNull();
  });
  test('should render without errors when children is false ans 0', () => {
    const { container } = render(
      <>
        <Button>{0}</Button>
        <Button>{false}</Button>
      </>,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(container.querySelectorAll('button')[0].textContent).toBe('0');
    expect(container.querySelectorAll('button')[1].firstChild).toBeNull();
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
    const testData = container.querySelector('.testData');
    const button = container.querySelector('button') as HTMLButtonElement;
    expect(testData?.textContent).toBe('0');
    fireEvent.click(button);
    expect(testData?.textContent).toBe('1');
    fireEvent.click(button);
    expect(testData?.textContent).toBe('2');
  });
});
// TODO: onRef
