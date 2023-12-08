import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Descriptions from '..';
import { classLengthTest } from '../../tests/structureTest';
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
import ResponsiveObserve from '@sheinx/hooks/src/utils/dom/responsiveObserve';
import DescriptionsBase from '../__example__/01-base';
import DescriptionsColums from '../__example__/02-colums';
import DescriptionsAlignment from '../__example__/03-alignment';
import DescriptionsBorder from '../__example__/04-border';
import DescriptionsSize from '../__example__/05-size';
import DescriptionsResponsive from '../__example__/06-responsive';

const SO_PREFIX = 'descriptions';
const originClasses = [
  'wrapper',
  'header',
  'body',
  'item',
  'labelInline',
  'valueInline',
  'extra',
  'title',
];
const originItemClasses = ['inlineHorizontal', 'horizontal', 'border', 'tableLayoutFixed'];
const {
  wrapper,
  header,
  body,
  inlineHorizontal,
  horizontal,
  item: itemClassName,
  labelInline,
  valueInline,
  border,
  extra,
  title,
  tableLayoutFixed,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const data = [
  {
    label: 'Name',
    value: 'Mai Mai',
  },
  {
    label: 'Residence',
    value: 'Beijing',
  },
  {
    label: 'Address',
    value: 'Yingdu Building,Zhichun Road,Beijing',
  },
  {
    label: 'Mobile',
    value: '187-2323-9834',
  },
  {
    label: 'Hometown',
    value: 'Beijing',
  },
];

const DescriptionsTest = (props: any) => <Descriptions items={data} title='User Info' {...props} />;

// Mock window.matchMedia for node.js environment
beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {},
      };
    };
});

afterEach(cleanup);

mountTest(<Descriptions />);

describe('Alert[Base]', () => {
  displayTest(Descriptions, 'ShineoutDescriptions');
  baseTest(Descriptions, wrapper);
  snapshotTest(<DescriptionsBase />);
  snapshotTest(<DescriptionsColums />, 'about colums');
  snapshotTest(<DescriptionsAlignment />, 'about alignment');
  snapshotTest(<DescriptionsBorder />, 'about border');
  snapshotTest(<DescriptionsSize />, 'about size');
  snapshotTest(<DescriptionsResponsive />, 'about responsive');
  test('should render default', () => {
    const { container } = render(<Descriptions />);
    const descriptionsWrapper = container.querySelector(wrapper)!;
    classLengthTest(descriptionsWrapper, header, 1);
    const descriptionsBody = descriptionsWrapper.querySelector(body)!;
    classTest(descriptionsBody, inlineHorizontal);
    const descriptionsTable = descriptionsBody.querySelector('table')!;
    attributesTest(descriptionsTable, 'cellpadding', '0');
    attributesTest(descriptionsTable, 'cellspacing', '0');
  });
  test('should render when set layout is horizontal', () => {
    const { container } = render(<DescriptionsTest layout='horizontal' />);
    const descriptionsBody = container.querySelector(body)!;
    classTest(descriptionsBody, horizontal);
    const trs = descriptionsBody.querySelectorAll('tr');
    expect(trs.length).toBe(2);
    classLengthTest(trs[0], 'td', 6);
    classLengthTest(trs[1], 'td', 4);
  });
  test('should render when set layout is vertical', () => {
    const { container } = render(<DescriptionsTest layout='vertical' />);
    const descriptionsBody = container.querySelector(body)!;
    const trs = descriptionsBody.querySelectorAll('tr');
    expect(trs.length).toBe(4);
    classLengthTest(trs[0], 'td', 3);
    classLengthTest(trs[1], 'td', 3);
    classLengthTest(trs[2], 'td', 2);
    classLengthTest(trs[3], 'td', 2);
    screen.debug();
  });
  test('should render when ser layout is inlineHorizontal', () => {
    const { container } = render(<DescriptionsTest layout='inlineHorizontal' />);
    const descriptionsBody = container.querySelector(body)!;
    classTest(descriptionsBody, inlineHorizontal);
    const trs = descriptionsBody.querySelectorAll('tr');
    expect(trs.length).toBe(2);
    classLengthTest(trs[0], 'td', 3);
    classLengthTest(trs[1], 'td', 2);
    descriptionsBody.querySelectorAll('td').forEach((item) => {
      const descriptionsItem = item.querySelector(itemClassName)!;
      classLengthTest(descriptionsItem, labelInline, 1);
      classLengthTest(descriptionsItem, valueInline, 1);
    });
  });
  test('should render when set layout is inlineVertical', () => {
    const { container } = render(<DescriptionsTest layout='inlineVertical' />);
    const descriptionsBody = container.querySelector(body)!;
    const trs = descriptionsBody.querySelectorAll('tr');
    expect(trs.length).toBe(2);
    classLengthTest(trs[0], 'td', 3);
    classLengthTest(trs[1], 'td', 2);
    descriptionsBody.querySelectorAll('td').forEach((item) => {
      const descriptionsItem = item.querySelector(itemClassName)!;
      classLengthTest(descriptionsItem, labelInline, 1);
      classLengthTest(descriptionsItem, valueInline, 1);
    });
  });
  test('should render when set border', () => {
    const { container } = render(<DescriptionsTest border />);
    const descriptionsBody = container.querySelector(body)!;
    classTest(descriptionsBody, border);
  });
  test('should render when set extra', () => {
    const titleContent = 'title';
    const extraContent = 'extra';
    const { container } = render(<DescriptionsTest title={titleContent} extra={extraContent} />);
    const descriptionsHeader = container.querySelector(header)!;
    textContentTest(descriptionsHeader.querySelector(title)!, titleContent);
    textContentTest(descriptionsHeader.querySelector(extra)!, extraContent);
  });
  test('should render when set colon', () => {
    const colonContent = ':';
    const { container } = render(<DescriptionsTest colon={colonContent} />);
    container.querySelectorAll(labelInline).forEach((item, index) => {
      textContentTest(item, `${data[index].label}${colonContent}`);
    });
  });
  test('should render when set tableLayout', () => {
    const { container } = render(<DescriptionsTest tableLayout='fixed' />);
    const descriptionsBody = container.querySelector(body)!;
    classTest(descriptionsBody, tableLayoutFixed);
  });
  test('should render when set labelStyle', () => {
    const labelStyle = { color: 'red' };
    const { container } = render(<DescriptionsTest labelStyle={labelStyle} />);
    container.querySelectorAll(labelInline).forEach((item) => {
      expect(item).toHaveStyle(labelStyle);
    });
  });
  test('should render when set valueStyle', () => {
    const valueStyle = { color: 'red' };
    const { container } = render(<DescriptionsTest valueStyle={valueStyle} />);
    container.querySelectorAll(valueInline).forEach((item) => {
      expect(item).toHaveStyle(valueStyle);
    });
  });
  test('should render when set column', () => {
    const { container } = render(<DescriptionsTest column={2} />);
    const descriptionsBody = container.querySelector(body)!;
    const trs = descriptionsBody.querySelectorAll('tr');
    expect(trs.length).toBe(3);
    classLengthTest(trs[0], 'td', 2);
    classLengthTest(trs[1], 'td', 2);
    classLengthTest(trs[2], 'td', 1);
  });
  test('should test responsiveObserve', () => {
    const observeMount = jest.spyOn(ResponsiveObserve, 'subscribe');
    const observeUnMount = jest.spyOn(ResponsiveObserve, 'unsubscribe');
    const wrapper = render(<DescriptionsTest column={{ xs: 3 }} />);

    expect(observeMount).toHaveBeenCalled();

    wrapper.unmount();

    expect(observeUnMount).toHaveBeenCalled();
  });
  // beforeAll(() => {
  //   Object.defineProperty(window, 'matchMedia', {
  //     writable: true,
  //     value: jest.fn().mockImplementation(query => ({
  //       matches: false,  // 默认不匹配任何媒体查询
  //       media: query,
  //       addEventListener: jest.fn(),
  //       removeEventListener: jest.fn(),
  //       addListener: jest.fn(),  // 旧的方法名，用于向后兼容
  //       removeListener: jest.fn(),  // 旧的方法名，用于向后兼容
  //     })),
  //   });
  // });
  // test('should render responsive', async () => {
  //   window.matchMedia.mockImplementation(query => ({
  //     matches: query === "(min-width: 600px)",
  //     media: query,
  //     onchange: null,
  //     addEventListener: jest.fn((event, handler) => {}),
  //     removeEventListener: jest.fn(),
  //     dispatchEvent: jest.fn(),
  //   }));
  //   const { container } = render(<DescriptionsResponsive />)

  //   await waitFor(async () => {
  //     await delay(200)
  //   })
  //   screen.debug()

  // })
});
