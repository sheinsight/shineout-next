type UploadType = {
  addEventListener: jest.Mock<void, [string, (event: any) => void]>;
  [key: string]: any;
};

export const mockXhr = () => {
  const xhr = {
    withCredentials: undefined,
    open: jest.fn(),
    send: jest.fn(),
    setRequestHeader: jest.fn(),
    upload: {
      addEventListener: jest.fn((key, handler) => {
        xhr.upload[key] = handler;
      }),
    } as UploadType,
  };
  const xhrMockClass = () => xhr;
  window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass) as any;
  return xhr;
};
