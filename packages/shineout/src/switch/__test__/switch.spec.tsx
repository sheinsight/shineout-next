import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Switch from '..';
import mountTest from '../../tests/mountTest';
import { baseTest, displayTest, snapshotTest } from '../../tests/utils';
import SwitchBase from '../__example__/01-basic';
import SwitchStatus from '../__example__/02-status';
import SwitchSize from '../__example__/03-size';
import SwitchLoading from '../__example__/04-loading';

const SO_PREFIX = 'switch';
const switchClassName = `.${SO_PREFIX}-wrapper-0-2-2`;

afterEach(cleanup);
mountTest(<Switch />);
describe('Switch[Base]', () => {
  displayTest(Switch, 'ShineoutSwitch');
  // TODO: 未拼接外部className
  baseTest(Switch, switchClassName);
  snapshotTest(<SwitchBase />);
  snapshotTest(<SwitchStatus />, 'about status');
  snapshotTest(<SwitchSize />, 'about size');
  snapshotTest(<SwitchLoading />, 'about loading');
  test('should render', () => {
    render(<Switch className='demo' />);
    screen.debug();
  });
});
