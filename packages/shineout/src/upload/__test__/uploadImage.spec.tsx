import { render, cleanup, waitFor, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Upload from '..';
import { mockXhr, uploadFile } from './util';
import mountTest from '../../tests/mountTest';
import {
  classTest,
  createClassName,
  delay,
  displayTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';
import { classLengthTest } from '../../tests/structureTest';

const SO_PREFIX = 'upload';
const originClasses = [
  'wrapper',
  'imageHandler',
  'imageHandlerIcon',
  'imageResultTip',
  'icon',
  'imageResult',
];
const originItemClasses = ['wrapperImage', 'resultError', 'resultSuccess'];
const {
  wrapper,
  imageHandler,
  imageHandlerIcon,
  wrapperImage,
  imageResultTip,
  icon: uploadIcon,
  imageResult,
  resultError,
  resultSuccess,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});
afterEach(cleanup);
mountTest(<Upload.Image />);

const covertSize = (size: number) => `width: ${size}px; height: ${size}px;`;

describe('Upload.Image[Base]', () => {
  displayTest(Upload.Image, 'ShineoutUploadImage');
  test('should render default', () => {
    const { container } = render(<Upload.Image />);
    const uploadWrapper = container.querySelector(wrapper)!;
    classTest(uploadWrapper, wrapperImage);
    const imageHandlerWrapper = uploadWrapper.querySelector(imageHandler)!;
    styleTest(imageHandlerWrapper, covertSize(80));
    classLengthTest(imageHandlerWrapper.querySelector(imageHandlerIcon)!, 'svg', 1);
  });
  test('should render when set height and width', () => {
    const sizeNow = 100;
    const { container } = render(<Upload.Image width={sizeNow} height={sizeNow} />);
    const imageHandlerWrapper = container.querySelector(imageHandler)!;
    styleTest(imageHandlerWrapper, covertSize(100));
  });
  test('upload image', async () => {
    const xhr = mockXhr();
    const img = { width: 200, height: 200 };
    const onChange = jest.fn();
    window.Image = jest.fn().mockImplementation(() => img);
    const { container } = render(<Upload.Image action={'//404'} onChange={onChange} />);
    uploadFile(container, { name: 'test.png' });
    await waitFor(async () => {
      await delay(200);
    });
    // @ts-ignore
    img.onload();
    await waitFor(async () => {
      await delay(200);
    });
    // @ts-ignore
    xhr.onload({ currentTarget: { response: 'aaa.png', status: 200 } });
    await waitFor(async () => {
      await delay(200);
    });
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0][0]).toBe('aaa.png');
  });
  test('should render when validate size', async () => {
    const img = {};
    const errMsg = 'only allow 200px * 100px';
    const onChange = jest.fn();
    window.Image = jest.fn().mockImplementation(() => img);
    const { container } = render(
      <Upload.Image
        action={'//404'}
        onChange={onChange}
        validator={{
          imageSize: (i) => (i.width !== 200 || i.height !== 200 ? new Error(errMsg) : undefined),
        }}
      />,
    );
    uploadFile(container, { name: 'test.png' });
    await waitFor(async () => {
      await delay(200);
    });
    // @ts-ignore
    img.onload();
    await waitFor(async () => {
      await delay(200);
    });
    textContentTest(container.querySelector(imageResultTip)!, errMsg);
  });
  test('should render invalid type', async () => {
    const img = {};
    const onChange = jest.fn();
    window.Image = jest.fn().mockImplementation(() => img);
    const { container } = render(<Upload.Image action='//404' onChange={onChange} />);
    uploadFile(container, { name: 'test.png' });
    await waitFor(async () => {
      await delay(200);
    });
    // @ts-ignore
    img.onerror();
    await waitFor(async () => {
      await delay(200);
    });
    screen.debug();
    classTest(container.querySelector(imageResult)!, resultError);
  });
  test('should remove image and recover', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Upload.Image action='//404' onChange={onChange} defaultValue={['aa.png']} recoverAble />,
    );
    const buttons = container.querySelectorAll(uploadIcon);
    fireEvent.click(buttons[1]);
    await waitFor(async () => {
      await delay(200);
    });
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0].length).toBe(0);
    fireEvent.click(container.querySelectorAll(uploadIcon)[1]);
    await waitFor(async () => {
      await delay(200);
    });
    expect(onChange.mock.calls.length).toBe(2);
  });
  test('should render when set onPreview', async () => {
    const onPreview = jest.fn();
    const { container } = render(
      <Upload.Image action='//404' defaultValue={['aa.png']} recoverAble onPreview={onPreview} />,
    );
    const buttons = container.querySelectorAll(uploadIcon);
    fireEvent.click(buttons[0]);
    await waitFor(async () => {
      await delay(200);
    });
    expect(onPreview.mock.calls.length).toBe(1);
  });
  test('should render when set leftHandler', async () => {
    const { container, rerender } = render(
      <Upload.Image action={'//404'} defaultValue={['aa.png']} />,
    );
    const uploadWrapper = container.querySelector(wrapper)!;
    const firstChild = uploadWrapper.firstChild as Element;
    expect(firstChild.className).toBe(`${imageResult} ${resultSuccess}`);
    rerender(<Upload.Image action={'//404'} defaultValue={['aa.png']} leftHandler />);
    const firstChildRender = uploadWrapper.firstChild as Element;
    expect(firstChildRender.className).toBe(imageHandler);
    screen.debug();
  });
});
