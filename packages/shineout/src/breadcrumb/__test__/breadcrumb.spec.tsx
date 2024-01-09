import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Breadcrumb } from 'shineout';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import {
  attributesTest,
  baseTest,
  classTest,
  createClassName,
  displayTest,
  snapshotTest,
  textContentTest,
} from '../../tests/utils';
import mountTest from '../../tests/mountTest';
import BreadcrumbBase from '../__example__/01-base';
import BreadcrumbSize from '../__example__/01-size';
import BreadcrumbSeparator from '../__example__/02-separator';
import BreadcrumbIcon from '../__example__/03-icon';
import BreadcrumbRenderItem from '../__example__/04-renderItem';
import BreadcrumbDropdown from '../__example__/05-dropdown';
import BreadcrumbMax from '../__example__/06-max';

const SO_PREFIX = 'breadcrumb';
const originClasses = ['wrapper', 'item', 'content', 'separator'];
const originItemClasses = [''];
const { wrapper, item, content, separator } = createClassName(
  SO_PREFIX,
  originClasses,
  originItemClasses,
);

const defaultSeparator = '/';

const renderData: any = [
  {
    title: 'Home',
  },
  {
    title: 'Self',
  },
];

afterEach(cleanup);
mountTest(<Breadcrumb />);

describe('Breadcrumb[Base]', () => {
  displayTest(Breadcrumb, 'ShineoutBreadcrumb');
  baseTest(Breadcrumb, wrapper);
  test(`should render correctly`, () => {
    const { container } = render(
      <Router>
        <BreadcrumbBase />
      </Router>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  test(`should render correctly about size`, () => {
    const { container } = render(
      <Router>
        <BreadcrumbSize />
      </Router>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  snapshotTest(<BreadcrumbSeparator />, 'about separator');
  snapshotTest(<BreadcrumbIcon />, 'about icon');
  snapshotTest(<BreadcrumbRenderItem />, 'about renderItem');
  test(`should render correctly about dropdown`, () => {
    const { container } = render(
      <Router>
        <BreadcrumbDropdown />
      </Router>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  snapshotTest(<BreadcrumbMax />, 'about max');

  test('should render when default', () => {
    const { container } = render(<Breadcrumb data={renderData} />);
    const breadcrumbWrapper = container.querySelector(wrapper)!;
    const breadcrumbItems = breadcrumbWrapper.querySelectorAll(item);
    expect(breadcrumbItems.length).toBe(renderData.length);
    breadcrumbItems.forEach((item, index) => {
      textContentTest(item.querySelector(content)!, renderData[index].title);
      if (index !== renderData.length - 1) {
        textContentTest(item.querySelector(separator)!, defaultSeparator);
      }
    });
  });
  test('should render when set icon in data', () => {
    const icon = <div className='test'>test</div>;
    const renderDataIcon = [
      {
        title: 'Home',
        icon,
      },
      {
        title: 'Self',
        icon,
      },
    ];
    const { container } = render(<Breadcrumb data={renderDataIcon} />);
    const breadcrumbWrapper = container.querySelector(wrapper)!;
    const breadcrumbItems = breadcrumbWrapper.querySelectorAll(item);
    breadcrumbItems.forEach((item) => {
      const iconEl = item.querySelector('.test')!;
      expect(iconEl).toBeInTheDocument();
    });
  });
  test('should render when set url in data', () => {
    const renderDataUrl = [
      {
        title: 'Home',
        url: '/home',
      },
      {
        title: 'Self',
        url: '/self',
      },
    ];
    const { container } = render(<Breadcrumb data={renderDataUrl} />);
    screen.debug();
    const breadcrumbWrapper = container.querySelector(wrapper)!;
    const breadcrumbItems = breadcrumbWrapper.querySelectorAll(item);
    breadcrumbItems.forEach((item, index) => {
      const urlEl = item.querySelector('a')!;
      expect(urlEl).toBeInTheDocument();
      classTest(urlEl, content.split('.')[1]);
      attributesTest(urlEl, 'href', renderDataUrl[index].url);
    });
  });
  test('should render when set onClick in data', () => {
    const onClick = jest.fn();
    const renderDataOnClick = [
      {
        title: 'Home',
        onClick,
      },
      {
        title: 'Self',
        onClick,
      },
    ];
    const { container } = render(<Breadcrumb data={renderDataOnClick} />);
    const breadcrumbWrapper = container.querySelector(wrapper)!;
    const breadcrumbItems = breadcrumbWrapper.querySelectorAll(item);
    screen.debug();
    breadcrumbItems.forEach((item) => {
      const onClickEl = item.querySelector('a')!;
      expect(onClickEl).toBeInTheDocument();
      fireEvent.click(onClickEl);
    });
    expect(onClick.mock.calls.length).toBe(breadcrumbItems.length);
  });
  test('should render when set Link in data', () => {
    const renderDataLink = [
      {
        title: <Link to='/cn/components/shineout/button'>Button</Link>,
      },
      {
        title: 'Self',
        url: '/self',
      },
    ];
    const { container } = render(
      <Router>
        <Breadcrumb data={renderDataLink} />
      </Router>,
    );
    const breadcrumbWrapper = container.querySelector(wrapper)!;
    const breadcrumbItems = breadcrumbWrapper.querySelectorAll(item);
    breadcrumbItems.forEach((item) => {
      const urlEl = item.querySelector('a')!;
      expect(urlEl).toBeInTheDocument();
    });
  });
  test('should render when set separator is string', () => {
    const separatorString = '>';
    const { container } = render(<Breadcrumb data={renderData} separator={separatorString} />);
    const breadcrumbWrapper = container.querySelector(wrapper)!;
    const breadcrumbItems = breadcrumbWrapper.querySelectorAll(item);
    breadcrumbItems.forEach((item, index) => {
      if (index !== renderData.length - 1) {
        textContentTest(item.querySelector(separator)!, separatorString);
      }
    });
  });
  test('should render when set separator is reactNode', () => {
    const separatorString = 'test';
    const separatorElement = <div className={separatorString}>test</div>;
    const { container } = render(<Breadcrumb data={renderData} separator={separatorElement} />);
    const breadcrumbWrapper = container.querySelector(wrapper)!;
    const breadcrumbItems = breadcrumbWrapper.querySelectorAll(item);
    breadcrumbItems.forEach((item, index) => {
      if (index !== renderData.length - 1) {
        const temp = item.querySelector(separator)!;
        textContentTest(temp.querySelector(`.${separatorString}`)!, separatorString);
      }
    });
  });
  test('should render when set renderItem', () => {
    const renderClass = 'test';
    const renderItem = (v: any) => <div className={renderClass}>{v.title}</div>;
    const { container } = render(<Breadcrumb data={renderData} renderItem={renderItem} />);
    const breadcrumbWrapper = container.querySelector(wrapper)!;
    const breadcrumbItems = breadcrumbWrapper.querySelectorAll(item);
    breadcrumbItems.forEach((item, index) => {
      const temp = item.querySelector(`.${renderClass}`)!;
      textContentTest(temp, renderData[index].title);
    });
  });
  test('should render when set max', () => {
    const renderDataMax = [
      {
        title: 'Home',
      },
      {
        title: 'Help',
      },
      {
        title: 'Self',
      },
    ];
    const max = 2;
    const { container } = render(<Breadcrumb data={renderDataMax} max={max} />);
    const breadcrumbWrapper = container.querySelector(wrapper)!;
    const breadcrumbItems = breadcrumbWrapper.querySelectorAll(item);
    expect(breadcrumbItems.length).toBe(max + 1);
    breadcrumbItems.forEach((item, index) => {
      if (index === 0) textContentTest(item.querySelector(content)!, renderDataMax[index].title);
      if (index === 1) textContentTest(item.querySelector(content)!, '...');
      if (index > 1)
        textContentTest(
          item.querySelector(content)!,
          renderDataMax[renderDataMax.length - max + 1].title,
        );
    });
  });
});
