import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Descriptions from '..';
import { baseTest, createClassName, displayTest, snapshotTest } from '../../tests/utils';
import mountTest from '../../tests/mountTest';
import DescriptionsBase from '../__example__/01-base';
import DescriptionsColums from '../__example__/02-colums';
import DescriptionsAlignment from '../__example__/03-alignment';
import DescriptionsBorder from '../__example__/04-border';
import DescriptionsSize from '../__example__/05-size';
import DescriptionsResponsive from '../__example__/06-responsive';

const SO_PREFIX = 'descriptions';
const originClasses = ['wrapper'];
const originItemClasses = [''];
const { wrapper } = createClassName(SO_PREFIX, originClasses, originItemClasses);

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
    render(<Descriptions />);
    screen.debug();
  });
});
