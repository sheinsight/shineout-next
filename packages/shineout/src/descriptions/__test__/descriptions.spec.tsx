import { render, cleanup } from '@testing-library/react';
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
// import ResponsiveObserve from '@sheinx/hooks/src/utils/dom/responsiveObserve';
import DescriptionsBase from '../__example__/01-base';
import DescriptionsColums from '../__example__/02-colums';
import DescriptionsAlignment from '../__example__/03-alignment';
import DescriptionsBorder from '../__example__/04-border';
import DescriptionArrangement from '../__example__/05-arrangement';
import DescriptionsSize from '../__example__/06-size';
import DescriptionsResponsive from '../__example__/07-responsive';

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
  snapshotTest(<DescriptionArrangement />, 'about arrangement');
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
  // TODO: responsiveObserver test
  test('should test responsiveObserve', async () => {
    // const observeMount = jest.spyOn(ResponsiveObserve, 'subscribe');
    // const observeUnMount = jest.spyOn(ResponsiveObserve, 'unsubscribe');
    render(<DescriptionsTest column={{ xs: 3 }} />);
    // await waitFor(() => {
    //   expect(observeMount).toHaveBeenCalled();
    // });
    // wrapper.unmount();
    // await waitFor(() => {
    //   expect(observeUnMount).toHaveBeenCalled();
    // });
  });
});
describe('Descriptions[Item]', () => {
  test('should render when set span', () => {
    const itemSpan = 3;
    const itemColumn = 10;
    const dataWithSpan = data.map((item) => ({ ...item, span: itemSpan }));
    const { container } = render(
      <Descriptions items={dataWithSpan} column={itemColumn} layout='inlineHorizontal' />,
    );
    const columns = Math.ceil(itemColumn / itemSpan);
    const row = Math.ceil(dataWithSpan.length / columns);

    expect(container.querySelectorAll('tr')).toHaveLength(row);
    expect(container.querySelectorAll('tr')[0].children).toHaveLength(columns);
  });
  test('should render when set itemLabelStyle', () => {
    const itemLabelStyle = { color: 'red' };
    const dataWithSpan = data.map((item) => ({ ...item, itemLabelStyle }));
    const { container } = render(<Descriptions items={dataWithSpan} />);
    container.querySelectorAll(labelInline).forEach((item) => {
      expect(item).toHaveStyle(itemLabelStyle);
    });
  });
  test('should render when set itemValueStyle', () => {
    const itemValueStyle = { color: 'red' };
    const dataWithSpan = data.map((item) => ({ ...item, itemValueStyle }));
    const { container } = render(<Descriptions items={dataWithSpan} />);
    container.querySelectorAll(valueInline).forEach((item) => {
      expect(item).toHaveStyle(itemValueStyle);
    });
  });
  test('should render when set itemLabelStyle and labelStyle at the same time', () => {
    const itemLabelStyle = { color: 'red' };
    const labelStyle = { color: 'blue' };
    const dataWithSpan = data.map((item) => ({ ...item, itemLabelStyle, labelStyle }));
    const { container } = render(<Descriptions items={dataWithSpan} />);
    container.querySelectorAll(labelInline).forEach((item) => {
      expect(item).toHaveStyle(itemLabelStyle);
      expect(item).not.toHaveStyle(labelStyle);
    });
  });
  test('should render when set itemValueStyle and valueStyle at the same time', () => {
    const itemValueStyle = { color: 'red' };
    const valueStyle = { color: 'blue' };
    const dataWithSpan = data.map((item) => ({ ...item, itemValueStyle, valueStyle }));
    const { container } = render(<Descriptions items={dataWithSpan} />);
    container.querySelectorAll(valueInline).forEach((item) => {
      expect(item).toHaveStyle(itemValueStyle);
      expect(item).not.toHaveStyle(valueStyle);
    });
  });
});
