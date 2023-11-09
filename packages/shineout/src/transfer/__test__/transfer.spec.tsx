import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Transfer from '..';
import mountTest from '../../tests/mountTest';
import { createClassName, displayTest, snapshotTest } from '../../tests/utils';
import TransferBase from '../__example__/01-base';
import TransferSize from '../__example__/02-size';
import TransferSimple from '../__example__/03-simple';
import TransferFilter from '../__example__/04-filter';
import TransferCustomFilter from '../__example__/05-custom-filter';
import TransferCustomRender from '../__example__/06-custom-render';
import TransferLoading from '../__example__/07-loading';
import TransferLoadingControl from '../__example__/08-loading-control';
import TransferControl from '../__example__/09-control';
import TransferSelected from '../__example__/10-selected-control';
import TranSsferBigData from '../__example__/11-bigdata';

const SO_PREFIX = 'transfer';
const originClasses = ['transfer'];
const originItemClasses = ['small', 'large'];
const {
  // transfer,
  // left,
  // large
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

const data: { id: string; name: string }[] = [];

for (let i = 0; i < 10; i++) {
  data.push({
    id: `id-${i}`,
    name: `name-${i + 1}`,
  });
}

const TransferTest = (props?: any) => (
  <Transfer data={data} keygen='id' renderItem={'name'} {...props} />
);

afterEach(cleanup);
mountTest(<TransferTest />);

describe('Transfer[Base]', () => {
  displayTest(Transfer as React.FC, 'ShineoutTransfer');
  snapshotTest(<TransferBase />);
  snapshotTest(<TransferSize />, 'about size');
  snapshotTest(<TransferSimple />, 'about simple');
  snapshotTest(<TransferFilter />, 'about filter');
  snapshotTest(<TransferCustomFilter />, 'about customFilter');
  snapshotTest(<TransferCustomRender />, 'about custom render');
  snapshotTest(<TransferLoading />, 'about loading');
  snapshotTest(<TransferLoadingControl />, 'about loading control');
  snapshotTest(<TransferControl />, 'about control');
  snapshotTest(<TransferSelected />, 'about seleced');
  snapshotTest(<TranSsferBigData />, 'about bigdata');
  test('should render when set className and style', () => {
    render(<TransferTest className='demo' style={{ backgroundColor: 'red' }} />);
    screen.debug();
  });
  test('shoud render default', () => {
    render(<TransferTest />);
    screen.debug();
  });
});
