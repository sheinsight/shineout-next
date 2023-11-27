import { cleanup, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Upload from '..';
import mountTest from '../../tests/mountTest';
import { classLengthTest } from '../../tests/structureTest';
import {
  attributesTest,
  baseTest,
  childrenTest,
  classTest,
  createClassName,
  delay,
  displayTest,
  snapshotTest,
  styleTest,
  textContentTest,
} from '../../tests/utils';
import { mockXhr } from './util';
import UploadBase from '../__example__/01-base-0';
import UploadBaseImage from '../__example__/01-base-1-image';
import UploadBaseButton from '../__example__/01-base-2-button';
import UploadResult from '../__example__/02-result-a';
import UploadResultImage from '../__example__/02-result-image';
import UploadConfirm from '../__example__/03-confirm';
import UploadRevover from '../__example__/04-recover';
import UploadValidateImage from '../__example__/05-validate-image';
import UploadValidateSize from '../__example__/05-validate-size';
import UploadHandleError from '../__example__/06-handle-error';
import UploadRequest from '../__example__/07-request-a';
import UploadRequestIgnore from '../__example__/07-request-ignore';
import UploadRequestZip from '../__example__/07-request-zip';
import UploadDefaultValue from '../__example__/08-defaultvalue';
import UploadDrag from '../__example__/09-drag';

const SO_PREFIX = 'upload';
const originClasses = [
  'wrapper',
  'handler',
  'result',
  'resultText',
  'icon',
  'resultTextBody',
  'resultTextFooter',
  'icon',
  'resultClose',
];
const originItemClasses = [
  'resultUploading',
  'resultStatusIcon',
  'iconHover',
  'resultError',
  'resultSuccess',
];
const {
  wrapper,
  handler,
  result,
  resultText,
  resultTextBody,
  resultTextFooter,
  icon,
  resultUploading,
  resultStatusIcon,
  resultClose,
  iconHover,
  resultError,
  resultSuccess,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);

// upload file function
const uploadFile = (wrapper: Element, options: { name: string }) => {
  const blob = new File(['content'], options.name, { type: 'text/plain', ...options });
  fireEvent.change(wrapper.querySelector('input')!, {
    target: {
      files: [blob],
    },
  });
};

const UploadTest = (props: any) => {
  const { children, ...rest } = props;
  return (
    <Upload action={'//jsonplaceholder.typicode.com/posts'} {...rest}>
      {children}
    </Upload>
  );
};

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.runAllTimers();
});
afterEach(cleanup);
mountTest(<Upload />);

describe('Upload[Base]', () => {
  displayTest(Upload, 'ShineoutUpload');
  baseTest(Upload, wrapper);
  childrenTest(Upload, wrapper);
  snapshotTest(<UploadBase />);
  snapshotTest(<UploadBaseImage />, 'about base image');
  snapshotTest(<UploadBaseButton />, 'about base button');
  snapshotTest(<UploadResult />, 'about result');
  snapshotTest(<UploadResultImage />, 'about result image');
  snapshotTest(<UploadConfirm />, 'about confirm');
  snapshotTest(<UploadRevover />, 'about recover');
  snapshotTest(<UploadValidateImage />, 'about validate image');
  snapshotTest(<UploadValidateSize />, 'about validate size');
  snapshotTest(<UploadHandleError />, 'about handle error');
  snapshotTest(<UploadRequest />, 'about request');
  snapshotTest(<UploadRequestIgnore />, 'about request ignore');
  snapshotTest(<UploadRequestZip />, 'about request zip');
  snapshotTest(<UploadDefaultValue />, 'about default value');
  snapshotTest(<UploadDrag />, 'about drag');
  const fileTextName = 'test.txt';
  test('should render default', () => {
    const { container } = render(<Upload />);
    const uploadWrapper = container.querySelector(wrapper)!;
    const uploadHandler = uploadWrapper.querySelector(handler)!;
    const uploadInput = uploadHandler.querySelector('input')!;
    attributesTest(uploadInput, 'type', 'file');
    styleTest(uploadInput, 'display: none;');
  });
  test('should render base function', async () => {
    const { container } = render(<UploadTest />);
    uploadFile(container, { name: fileTextName });
    await waitFor(async () => {
      await delay(200);
    });
    const uploadWrapper = container.querySelector(wrapper)!;
    const uploadResult = uploadWrapper.querySelector(result)!;
    classTest(uploadResult, resultUploading);
    const uploadResultText = uploadResult.querySelector(resultText)!;
    classLengthTest(uploadResultText.querySelector(icon)!, 'svg', 1);
    textContentTest(uploadResultText.querySelector(resultTextBody)!, fileTextName);
    const uploadResultFooter = uploadResultText.querySelector(resultTextFooter)!;
    classTest(uploadResultFooter.querySelector(icon)!, resultStatusIcon);
    const uploadResultClose = uploadResult.querySelector(resultClose)!;
    classTest(uploadResultClose, iconHover);
    classLengthTest(uploadResultClose, 'svg', 1);
  });
  test('should render when upload error', async () => {
    const { container } = render(<UploadTest action={'/api/upload'} />);
    uploadFile(container, { name: fileTextName });
    await waitFor(async () => {
      await delay(200);
    });
    classTest(container.querySelector(result)!, resultError);
  });
  test('should render when set onSuccess', async () => {
    const successText = 'success';
    const onSuccess = jest.fn((res) => {
      if (res === 'error') return new Error('error from success');
      return successText;
    });
    const { container } = render(
      <UploadTest action='//404' params={{ from: 'test' }} withCredentials onSuccess={onSuccess} />,
    );
    const xhr = mockXhr();
    uploadFile(container, { name: 'test.doc' });
    await waitFor(async () => {
      await delay(200);
    });
    // @ts-ignore
    xhr.onload({ currentTarget: { response: 'aaa', status: 200 } });
    await waitFor(async () => {
      await delay(200);
    });
    expect(onSuccess.mock.calls.length).toBe(1);
    classTest(container.querySelector(result)!, resultSuccess);
    textContentTest(container.querySelector(resultTextBody)!, successText);
  });
  test('should render when set accept', async () => {
    const { container } = render(<UploadTest accept={'image/*'} />);
    uploadFile(container, { name: fileTextName });
    await waitFor(async () => {
      await delay(200);
    });
    classTest(container.querySelector(result)!, resultError, false);
  });
  test('should render when set forceAccept', async () => {
    const { container } = render(<UploadTest forceAccept={'image/*'} />);
    const uploadInput = container.querySelector('input')!;
    attributesTest(uploadInput, 'accept', 'image/*');
    uploadFile(container, { name: fileTextName });
    await waitFor(async () => {
      await delay(200);
    });
    classTest(container.querySelector(result)!, resultError);
    textContentTest(container.querySelector(resultTextBody)!, `${fileTextName}(文件格式不正确) `);
  });
  test('should render when set forceAcceptErrorMsg', async () => {
    const ErrorMsg = 'error';
    const { container } = render(
      <UploadTest forceAccept={'image/*'} forceAcceptErrorMsg={ErrorMsg} />,
    );
    uploadFile(container, { name: fileTextName });
    await waitFor(async () => {
      await delay(200);
    });
    textContentTest(container.querySelector(resultTextBody)!, `${fileTextName}(${ErrorMsg}) `);
  });
});
