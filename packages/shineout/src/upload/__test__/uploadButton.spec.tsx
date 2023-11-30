import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Upload from '..';
import mountTest from '../../tests/mountTest';
import { displayTest } from '../../tests/utils';

// const SO_PREFIX = 'upload';

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});
afterEach(cleanup);
mountTest(<Upload.Button />);

describe('Upload.Button[Base]', () => {
  displayTest(Upload.Button, 'ShineoutUploadButton');
});
