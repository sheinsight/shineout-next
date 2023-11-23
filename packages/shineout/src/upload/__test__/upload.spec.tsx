import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Upload from '..';
import { createClassName, displayTest } from '../../tests/utils';

const SO_PREFIX = 'upload';
const originClasses = [''];
const originItemClasses = [''];
const {} = createClassName(SO_PREFIX, originClasses, originItemClasses);

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});
afterEach(cleanup);

describe('Upload[Base]', () => {
  displayTest(Upload, 'ShineoutUpload');
});
