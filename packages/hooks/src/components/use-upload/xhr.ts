import { UploadOptions } from './use-upload.type';

declare class XDomainRequest extends XMLHttpRequest {}

function createCORSRequest(method: string, url: string) {
  let xhr: XMLHttpRequest | null = new XMLHttpRequest();
  if ('withCredentials' in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest !== 'undefined') {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

export default function (args: UploadOptions<any>) {
  const {
    url,
    name,
    file,
    onProgress,
    onLoad,
    onError,
    withCredentials,
    params = {},
    headers = {},
    onStart,
    responseType,
  } = args;

  if (!url) {
    console.error(new Error(`action is required, but its value is ${url}`));
    return undefined;
  }

  const data = new FormData();
  Object.keys(params).forEach((k) => {
    data.append(k, params[k]);
  });

  data.append(name, file);

  const xhr = createCORSRequest('post', url);
  if (!xhr) return undefined;
  xhr.withCredentials = !!withCredentials;
  if (responseType) {
    xhr.responseType = responseType;
  }
  if (onProgress) xhr.upload.addEventListener('progress', onProgress, false);
  xhr.onload = (e) => onLoad(e.currentTarget as any);
  xhr.onerror = onError;

  Object.keys(headers).forEach((k) => {
    xhr.setRequestHeader(k, headers[k]);
  });

  if (onStart) onStart(file);

  xhr.send(data);

  return xhr;
}
