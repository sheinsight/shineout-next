import { cleanup, render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Upload from '..';
import mountTest from '../../tests/mountTest';
import { mockXhr, uploadFile } from './util';
import { createClassName, delay, displayTest, styleContentTest, styleTest, textContentTest } from '../../tests/utils';
import { classLengthTest } from '../../tests/structureTest';

const SO_PREFIX = 'upload';
const originClasses = ['buttonBg', 'buttonBgSpin', 'handler', 'wrapper'];
const originItemClasses = [''];
const { buttonBg, handler, wrapper } = createClassName(SO_PREFIX, originClasses, originItemClasses);

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
  test('should render default', () => {
    const { container } = render(<Upload.Button />);
    const uploadWrapper = container.querySelector(wrapper)!;
    classLengthTest(uploadWrapper.querySelector(handler)!, 'button', 1);
  });
  test('should render progress when upload', async () => {
    const uploadProgressPercent = 50;
    const { container } = render(
      <Upload.Button
        action='//jsonplaceholder.typicode.com/posts'
        name='file'
        onSuccess={(_res, file) => file.name}
        loading='正在上传...'
        placeholder='点击上传'
        type='primary'
      />,
    );
    textContentTest(container.querySelector('button')!, '点击上传');
    const xhr = mockXhr();
    uploadFile(container, { name: 'test.doc' });
    await waitFor(async () => {
      await delay(200);
    });
    xhr.upload.progress({ percent: uploadProgressPercent });
    await waitFor(async () => {
      await delay(200);
    });
    const uploadButtonBg = container.querySelector(buttonBg)!;
    styleContentTest(uploadButtonBg, `right: ${uploadProgressPercent}%;`);
    textContentTest(uploadButtonBg, '正在上传...');
  });
  test('should render when onError', async () => {
    const onHttpErrorFn = jest.fn();
    const { container } = render(<Upload.Button action={'//404'} onHttpError={onHttpErrorFn} />);
    const xhr = mockXhr();
    uploadFile(container, { name: 'test.doc' });
    await waitFor(async () => {
      await delay(200);
    });
    // @ts-ignore
    xhr.onerror({ statusText: '上传失败' });
    expect(onHttpErrorFn.mock.calls.length).toBe(1);
  });
  test('should render when onSuccess', async () => {
    const onSuccessFn = jest.fn((res) => {
      if (res === 'error') return new Error('error from success');
      return 'success';
    });
    const { container } = render(
      <Upload.Button
        action={'//404'}
        onSuccess={onSuccessFn}
        params={{ from: 'test' }}
        withCredentials
      />,
    );
    const xhr = mockXhr();
    uploadFile(container, { name: 'test.doc' });
    await waitFor(async () => {
      await delay(200);
    });
    // @ts-ignore
    xhr.onload({ currentTarget: { response: 'error', status: 200 } });
    await waitFor(async () => {
      await delay(200);
    });
    expect(onSuccessFn.mock.calls.length).toBe(1);
    expect(onSuccessFn.mock.calls[0].length).toBe(3);
  });
  test('should render when click handler', async () => {
    const { container } = render(<Upload.Button />);
    fireEvent.click(container.querySelector(handler)!);
  });
});
// onProgress
