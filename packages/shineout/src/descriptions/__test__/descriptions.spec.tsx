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
} from '../../tests/utils';
import mountTest from '../../tests/mountTest';
import DescriptionsBase from '../__example__/01-base';
import DescriptionsColums from '../__example__/02-colums';
import DescriptionsAlignment from '../__example__/03-alignment';
import DescriptionsBorder from '../__example__/04-border';
import DescriptionsSize from '../__example__/05-size';
import DescriptionsResponsive from '../__example__/06-responsive';

const SO_PREFIX = 'descriptions';
const originClasses = ['wrapper', 'header', 'body'];
const originItemClasses = ['inlineHorizontal', 'horizontal'];
const { wrapper, header, body, inlineHorizontal, horizontal } = createClassName(
  SO_PREFIX,
  originClasses,
  originItemClasses,
);

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
    screen.debug();
  });
  test('should render when set border', () => {});
});
