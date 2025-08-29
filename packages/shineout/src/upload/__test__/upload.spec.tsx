import React from 'react';
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
import { mockXhr, uploadFile } from './util';
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
  'dropItem',
];
const originItemClasses = [
  'resultUploading',
  'iconHover',
  'resultError',
  'resultSuccess',
  'wrapperDisabled',
  'resultDeleted',
];
const {
  wrapper,
  handler,
  result,
  resultText,
  resultTextBody,
  icon,
  resultUploading,
  resultClose,
  iconHover,
  resultError,
  resultSuccess,
  dropItem,
  wrapperDisabled,
  resultDeleted,
} = createClassName(SO_PREFIX, originClasses, originItemClasses);
const {
  wrapper: popoverWrapper,
  wrapperOpen: popoverwrapperOpen,
  footer: popoverFooter,
  mention: popoverMention,
} = createClassName('popover', ['wrapper', 'footer', 'mention'], ['wrapperOpen']);

const UploadTest = (props: any) => {
  const { children, ...rest } = props;
  return (
    <Upload action={'//jsonplaceholder.typicode.com/posts'} {...rest}>
      {children}
    </Upload>
  );
};

const fileTextName = 'test.txt';

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
    const uploadResultClose = uploadResult.querySelector(resultClose)!;
    classTest(uploadResultClose, iconHover);
    classLengthTest(uploadResultClose, 'svg', 1);
  });
  test('should render when set onHttpError/onErrorRemove', async () => {
    const errorMsg = 'test error';
    const errorOriginMsg = 'error';
    const onErrorFn = jest.fn((x) => {
      if (!x.statusText) return errorOriginMsg;
      return '';
    });
    const onErrorRemoveFn = jest.fn();
    const { container } = render(
      <UploadTest action={'//404'} onHttpError={onErrorFn} onErrorRemove={onErrorRemoveFn} />,
    );
    const xhr = mockXhr();
    uploadFile(container, { name: fileTextName });
    await waitFor(async () => {
      await delay(200);
    });
    // @ts-ignore
    xhr.onerror({ statusText: errorMsg });
    await waitFor(async () => {
      await delay(200);
    });
    expect(onErrorFn.mock.calls.length).toBe(1);
    expect(onErrorFn.mock.calls[0][0].statusText).toBe(errorMsg);
    textContentTest(container.querySelector(resultTextBody)!, `${fileTextName}(${errorMsg}) `);
    fireEvent.click(container.querySelector(resultClose)!);
    expect(onErrorRemoveFn.mock.calls.length).toBe(1);
    classLengthTest(container, result, 0);
    const newXhr = mockXhr();
    uploadFile(container, { name: fileTextName });
    await waitFor(async () => {
      await delay(200);
    });
    // @ts-ignore
    newXhr.onerror({ statusText: '' });
    await waitFor(async () => {
      await delay(200);
    });
    textContentTest(
      container.querySelector(resultTextBody)!,
      `${fileTextName}(${errorOriginMsg}) `,
    );
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
    textContentTest(container.querySelector(resultTextBody)!, `${fileTextName}(Invalid file format) `);
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
  test('should render when set htmlName/params/responseType/withCredentials/headers', async () => {
    const { container } = render(
      <UploadTest
        headers={{ 'Content-Type': 'application/json' }}
        htmlName='fill'
        action='//404'
        params={{ from: 'test' }}
        responseType='json'
        withCredentials
      />,
    );
    const xhr = mockXhr();
    const files = [new File(['content'], '1.png')];
    uploadFile(container, { files });
    await waitFor(async () => {
      await delay(200);
    });
    expect(xhr.setRequestHeader.mock.calls.length).toBe(1);
    expect(xhr.setRequestHeader.mock.calls[0][0]).toBe('Content-Type');
    expect(xhr.setRequestHeader.mock.calls[0][1]).toBe('application/json');

    expect(xhr.send.mock.calls.length).toBe(1);
    expect(xhr.send.mock.calls[0][0].get('from')).toBe('test');
    expect(xhr.send.mock.calls[0][0].get('fill')).toBeTruthy();

    expect(xhr.withCredentials).toBe(true);
    // @ts-ignore
    expect(xhr.responseType).toBe('json');
  });
  test('should render when set filesFilter', async () => {
    const filesFilter = jest.fn((files) =>
      files.filter((file: File) => file.name.endsWith('.png')),
    );
    const onStartFn = jest.fn();
    const { container } = render(
      <UploadTest name='file' filesFilter={filesFilter} onStart={onStartFn} />,
    );
    const files = [
      new File(['content'], '1.png'),
      new File(['content'], '2.png'),
      new File(['content'], '3.txt'),
    ];
    uploadFile(container, { files });
    await waitFor(async () => {
      await delay(200);
    });
    expect(filesFilter.mock.calls.length).toBe(1);
    expect(filesFilter.mock.calls[0][0]).toStrictEqual(files);
    expect(onStartFn.mock.calls.length).toBe(2);
  });
  test('should render when set beforeCancel', async () => {
    const beforeCancel = jest.fn();
    const { container } = render(
      <UploadTest name='file' beforeCancel={beforeCancel} forceAccept='image/*' />,
    );
    uploadFile(container, { name: 'fool.png' });
    await waitFor(async () => {
      await delay(200);
    });
    fireEvent.click(container.querySelector(resultClose)!);
    await waitFor(async () => {
      await delay(200);
    });
    expect(beforeCancel.mock.calls.length).toBe(1);
  });
  test('should render when set showUploadList is false', () => {
    const { container } = render(
      <UploadTest action='//404' defaultValue={['a.png']} showUploadList={false} />,
    );
    classLengthTest(container, result, 0);
  });
});
describe('Upload[Drop onStart]', () => {
  test('should render when set drop', () => {
    const onStart = jest.fn();
    const { container } = render(<UploadTest name='file' onStart={onStart} drop />);
    const uploadWrapper = container.querySelector(wrapper)!;
    attributesTest(uploadWrapper.querySelector(dropItem)!, 'data-soui-dragover', 'false');
  });
  test('should upload file when set drop', async () => {
    const files = new File(['content'], 'test.txt');
    const onStart = jest.fn();
    const { container } = render(<UploadTest name='file' onStart={onStart} drop />);
    const uploadWrapper = container.querySelector(wrapper)!;
    fireEvent.drop(uploadWrapper.querySelector(dropItem)!, {
      type: 'drop',
      dataTransfer: { files: [files] },
    });
    await waitFor(async () => {
      await delay(200);
    });
    expect(onStart.mock.calls.length).toBe(1);
  });
});
describe('Upload[Multiple]', () => {
  test('should render when set multiple', async () => {
    const { container } = render(<UploadTest name='file' multiple />);

    const file1 = new File(['content'], 'file1.txt');
    const file2 = new File(['content'], 'file2.txt');
    uploadFile(container, { files: [file1, file2] });
    await waitFor(async () => {
      await delay(200);
    });
    const uploadInput = container.querySelector('input')!;
    expect(uploadInput.files).toHaveLength(2);
    expect(uploadInput.files?.[0]).toBe(file1);
    expect(uploadInput.files?.[1]).toBe(file2);
  });
  test('should render when set beforeUpload is function', async () => {
    const beforeUploadFn = jest.fn();
    const { container } = render(<UploadTest name='file' beforeUpload={beforeUploadFn} />);
    uploadFile(container, { name: fileTextName });
    await waitFor(async () => {
      await delay(200);
    });
    expect(beforeUploadFn.mock.calls.length).toBe(1);
  });
  test('should render when set beforeUpload is promise(resolve)', async () => {
    const beforeUploadProFn = jest.fn(() => Promise.resolve({ status: 200 }));
    const { container } = render(<UploadTest name='file' beforeUpload={beforeUploadProFn} />);
    uploadFile(container, { name: fileTextName });
    await waitFor(async () => {
      await delay(200);
    });
    expect(beforeUploadProFn.mock.calls.length).toBe(2);
  });
  test('should render when set customResult', async () => {
    const CustomResult = ({ value }: any) => <div className='demo'>{value}</div>;
    const { container } = render(<UploadTest name='file' customResult={CustomResult} />);
    classLengthTest(container, '.demo', 1);
  });
  // TODO: gapProps
});
describe('Upload[Value/DefaultValue/BeforeChange]', () => {
  test('should render when set value', async () => {
    const { container } = render(<UploadTest name='file' value={['test.txt', 'demo.txt']} />);
    const uploadWrapper = container.querySelector(wrapper)!;
    const uploadResult = uploadWrapper.querySelector(result)!;
    classTest(uploadResult, resultSuccess);
    const uploadResultTexts = container.querySelectorAll(resultTextBody);
    expect(uploadResultTexts.length).toBe(2);
    textContentTest(uploadResultTexts[0], 'test.txt');
    textContentTest(uploadResultTexts[1], 'demo.txt');
  });
  test('should render when set defaultValue', async () => {
    const { container } = render(<UploadTest name='file' defaultValue={['test.txt']} />);
    const uploadWrapper = container.querySelector(wrapper)!;
    const uploadResult = uploadWrapper.querySelector(result)!;
    classTest(uploadResult, resultSuccess);
    textContentTest(uploadResult.querySelector(resultTextBody)!, 'test.txt');
  });
  test('should render when simultaneously value and defaultValue', async () => {
    const { container } = render(
      <UploadTest name='file' value={['test.txt']} defaultValue={['demo.txt']} />,
    );
    const uploadWrapper = container.querySelector(wrapper)!;
    const uploadResult = uploadWrapper.querySelector(result)!;
    classTest(uploadResult, resultSuccess);
    textContentTest(uploadResult.querySelector(resultTextBody)!, 'test.txt');
  });
  test('should render when is controlled', async () => {
    const { container } = render(<UploadBase />);
    uploadFile(container, { name: fileTextName });
    await waitFor(async () => {
      await delay(200);
    });
    textContentTest(container.querySelector(resultTextBody)!, fileTextName);
  });
});
describe('Upload[BeforeRemove/OnChange/BeforeChange]', () => {
  test('should render when set beforeRemove, onChange and beforeChange', async () => {
    let time = 0;
    const beforeRemove = jest.fn(() => {
      if (time === 0) {
        time = 1;
        return Promise.reject();
      }
      return Promise.resolve();
    });
    const beforeChangeFn = jest.fn();
    const onChange = jest.fn();
    const { container } = render(
      <UploadTest
        name='file'
        beforeRemove={beforeRemove}
        onChange={onChange}
        defaultValue={['aaa.png']}
        forceAccept='image/*'
        beforeChange={beforeChangeFn}
      />,
    );
    const uploadResultClose = container.querySelector(resultClose)!;
    expect(uploadResultClose).toBeInTheDocument();
    fireEvent.click(uploadResultClose);
    await waitFor(async () => {
      await delay(200);
    });
    expect(beforeRemove.mock.calls.length).toBe(1);
    expect(onChange.mock.calls.length).toBe(0);

    fireEvent.click(uploadResultClose);
    await waitFor(async () => {
      await delay(200);
    });
    expect(beforeRemove.mock.calls.length).toBe(2);
    expect(onChange.mock.calls.length).toBe(1);
    expect(beforeChangeFn.mock.calls.length).toBe(1);
    expect(uploadResultClose).not.toBeInTheDocument();
  });
});
describe('Upload[CanDelete]', () => {
  test('should render when set canDelete is function', () => {
    const { container } = render(
      <UploadTest
        accept='image/*'
        name='file'
        canDelete={(value: any) => value === '1.png'}
        defaultValue={['1.png', '2.png']}
      />,
    );
    classLengthTest(container, resultTextBody, 2);
    classLengthTest(container, resultClose, 1);
    const uploadResultTexts = container.querySelectorAll(result);
    classLengthTest(uploadResultTexts[0], resultClose, 1);
    classLengthTest(uploadResultTexts[1], resultClose, 0);
  });
  test('should render when set canDelete is boolean', () => {
    const { container } = render(
      <UploadTest
        accept='image/*'
        name='file'
        canDelete={false}
        defaultValue={['1.png', '2.png']}
      />,
    );
    classLengthTest(container, resultTextBody, 2);
    classLengthTest(container, resultClose, 0);
  });
});
describe('Upload[Disabled]', () => {
  test('should render when set disabled', async () => {
    const { container } = render(<UploadTest name='file' disabled />);
    const uploadWrapper = container.querySelector(wrapper)!;
    classTest(uploadWrapper, wrapperDisabled);
    const uploadHandler = uploadWrapper.querySelector(handler)!;
    const uploadInput = uploadHandler.querySelector('input')!;
    attributesTest(uploadInput, 'disabled', '');
    uploadFile(container, { name: fileTextName });
    await waitFor(async () => {
      await delay(200);
    });
    classLengthTest(container, result, 0);
  });
});
describe('Upload[Limit]', () => {
  test('should render when set limit', async () => {
    const { container } = render(<UploadTest name='file' limit={1} />);
    const uploadWrapper = container.querySelector(wrapper)!;
    const uploadHandler = uploadWrapper.querySelector(handler)!;
    const uploadInput = uploadHandler.querySelector('input')!;
    expect(uploadInput).toBeInTheDocument();
    uploadFile(container, { name: fileTextName });
    await waitFor(async () => {
      await delay(200);
    });
    expect(uploadInput).not.toBeInTheDocument();
  });
});
describe('Upload[RecoverAble/RemoveConfirm]', () => {
  test('should render when set removeConfirm', async () => {
    const onChange = jest.fn();
    const removeConfirmMsg = 'are you sure';
    const { container } = render(
      <UploadTest
        action='//404'
        defaultValue={['b.jpg']}
        removeConfirm={removeConfirmMsg}
        onChange={onChange}
      />,
    );
    fireEvent.click(container.querySelector(resultClose)!);
    await waitFor(async () => {
      await delay(200);
    });
    const uploadPopoverWrapper = document.querySelector(popoverWrapper)!;
    classTest(uploadPopoverWrapper, popoverwrapperOpen);
    textContentTest(uploadPopoverWrapper.querySelector(popoverMention)!, removeConfirmMsg);
    const popoverButtons = uploadPopoverWrapper
      .querySelector(popoverFooter)
      ?.querySelectorAll('button');
    expect(popoverButtons?.length).toBe(2);
    fireEvent.click(popoverButtons![1]);
    await waitFor(async () => {
      await delay(200);
    });
    expect(onChange.mock.calls[0][0]).toStrictEqual([]);
  });
  test('should render when set recoverAble', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <UploadTest action='//404' defaultValue={['b.jpg']} recoverAble onChange={onChange} />,
    );
    fireEvent.click(container.querySelector(resultClose)!);
    await waitFor(async () => {
      await delay(200);
    });
    classTest(container.querySelector(result)!, resultDeleted);
    fireEvent.click(container.querySelector(resultClose)!);
    await waitFor(async () => {
      await delay(200);
    });
    expect(onChange.mock.calls[1][0]).toStrictEqual(['b.jpg']);
  });
});
describe('Upload[Request/RenderResult/RenderContent]', () => {
  test('should render when set renderResult', () => {
    const defaultValueName = 'a.png';
    const { container } = render(
      <UploadTest
        action='//404'
        defaultValue={[{ name: defaultValueName }]}
        renderResult={(i: any) => <div className='demo'>{i.name}</div>}
      />,
    );
    textContentTest(container.querySelector('.demo')!, defaultValueName);
  });
  // TODO: renderContent test for image
  // test('should render when set renderContent', async () => {
  // })
  test('should render when set request', async () => {
    const request = jest.fn((options) => {
      const { file, onLoad } = options;
      onLoad({ status: 200, response: file.name });
    });
    const { container } = render(
      <Upload
        accept='image/*'
        request={request}
        onSuccess={(dataURL: any, file: any) => ({ name: file.name, src: dataURL })}
        renderResult={(d) => d.src}
      />,
    );
    uploadFile(container, { name: 'test.doc' });
    await waitFor(async () => {
      await delay(200);
    });
    expect(request.mock.calls.length).toBe(1);
  });
  test('should render request example', async () => {
    const { container } = render(<UploadRequest />);
    uploadFile(container, { name: 'test.doc' });
    await waitFor(async () => {
      await delay(200);
    });
    textContentTest(container.querySelector(resultTextBody)!, 'test.doc');
  });
  test('should render when set requestIgnore exmple', async () => {
    const { container } = render(<UploadRequestIgnore />);
    uploadFile(container, { name: 'test.doc' });
    await waitFor(async () => {
      await delay(200);
    });
    textContentTest(container.querySelector(resultTextBody)!, 'test.doc');
  });
  test('should render when set requestZip exmple', async () => {
    const { container } = render(<UploadRequestZip />);
    uploadFile(container, { name: 'test.zip' });
    await waitFor(async () => {
      await delay(200);
    });
    textContentTest(container.querySelector(resultTextBody)!, 'test.zip(zipping...) ');
  });
});
describe('Upload[Validator]', () => {
  test('should render when set validator and validatorHandler about size', async () => {
    const fileName = '1.png';
    const errorSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const { container } = render(<UploadValidateSize />);
    const fileContent = new Array(100000).join('a');
    const files = [new File([fileContent], fileName)];
    uploadFile(container, { files });
    await waitFor(async () => {
      await delay(200);
    });
    textContentTest(
      container.querySelector(resultTextBody)!,
      `${fileName}(max file size is 10KB) `,
    );
    expect(errorSpy).toHaveBeenCalledWith(new Error('max file size is 10KB'), expect.anything());
  });
  test('should render when set validator about ext', async () => {
    const fileName = 'demo.txt';
    const errMsg = 'File extension must be jpg or png';
    const { container } = render(
      <UploadTest
        validator={{
          ext: (ext: string) => (['jpg', 'png'].includes(ext) ? undefined : new Error(errMsg)),
        }}
      />,
    );
    const files = [new File(['content'], fileName)];
    uploadFile(container, { files });
    await waitFor(async () => {
      await delay(200);
    });
    textContentTest(container.querySelector(resultTextBody)!, `${fileName}(${errMsg}) `);
  });
  test('should render when set customValidator', async () => {
    const errMsg = 'error';
    const { container } = render(
      <UploadTest
        validator={{
          customValidator: () => new Error(errMsg),
        }}
      />,
    );
    const fileName = 'demo.txt';
    const files = [new File(['content'], fileName)];
    uploadFile(container, { files });
    await waitFor(async () => {
      await delay(200);
    });
    textContentTest(container.querySelector(resultTextBody)!, `${fileName}(${errMsg}) `);
  });
});
describe('Upload[Error]', () => {
  test('should render without action', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(<Upload />);
    const fileName = 'demo.txt';
    const files = [new File(['content'], fileName)];
    uploadFile(container, { files });
    await waitFor(async () => {
      await delay(200);
    });
    expect(errorSpy).toHaveBeenCalledWith(new Error('[shineout] action is required, but its value is '));
  });
  test('should render when load error status', async () => {
    const xhr = mockXhr();
    const errMsg = 'error';
    const onErrorFn = () => errMsg;
    const { container } = render(<UploadTest onHttpError={onErrorFn} />);
    const fileName = 'demo.txt';
    const files = [new File(['content'], fileName)];
    uploadFile(container, { files });
    await waitFor(async () => {
      await delay(200);
    });
    // @ts-ignore
    xhr.onload({ currentTarget: { response: 'aaa', status: 300 } });
    await waitFor(async () => {
      await delay(200);
    });
    classTest(container.querySelector(result)!, resultError);
    textContentTest(container.querySelector(resultTextBody)!, `${fileName}(${errMsg}) `);
  });
  test('should render when onload result is error', async () => {
    const errMsg = 'error from success';
    const fileName = 'test.doc';
    const onSuccess = jest.fn(() => new Error(errMsg));
    const { container } = render(
      <UploadTest action='//404' params={{ from: 'test' }} withCredentials onSuccess={onSuccess} />,
    );
    const xhr = mockXhr();
    uploadFile(container, { name: fileName });
    await waitFor(async () => {
      await delay(200);
    });
    // @ts-ignore
    xhr.onload({ currentTarget: { response: 'aaa', status: 200 } });
    await waitFor(async () => {
      await delay(200);
    });
    textContentTest(container.querySelector(resultTextBody)!, `${fileName}(${errMsg}) `);
  });
});
