import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Menu } from 'shineout';
import { baseTest, createClassName, displayTest } from '../../tests/utils';
import mountTest from '../../tests/mountTest';

const SO_PREFIX = 'menu';
const originClasses = ['wrapper'];
const originItemClasses = [''];
const { wrapper } = createClassName(SO_PREFIX, originClasses, originItemClasses);

afterEach(cleanup);
mountTest(<Menu keygen='id' />);

describe('Menu[Base]', () => {
  displayTest(Menu as React.FC, 'ShineoutMenu');
  baseTest(Menu as React.FC, wrapper);
});
