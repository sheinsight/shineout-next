import { useState } from 'react';
import { produce } from '../../utils/immer';
import { FileRecord, UseUploadProps, XhrResult } from './use-upload.type';
import useLatestObj from '../../common/use-latest-obj';
import xhrUpload from './xhr';
import { attrAccept } from '../../utils/accept';
import { getUidStr } from '../../utils/uid';
import usePersistFn from '../../common/use-persist-fn';
import { isFunc } from '../../utils/is';

const VALIDATORITEMS: {
  key: 'size' | 'ext' | 'customValidator' | 'imageSize';
  param: (blob: File, image?: { width: number; height: number }) => any;
}[] = [
  { key: 'size', param: (blob: File) => blob.size },
  {
    key: 'ext',
    param: (blob: File) => {
      const exts = blob.name.split('.');
      return exts[exts.length - 1];
    },
  },
  { key: 'customValidator', param: (blob: File) => blob },
  { key: 'imageSize', param: (blob: File, image) => image },
];

const promised = (action: (...args: any) => any, ...args: any) => {
  const res = action(...args);
  if (res && typeof res.then === 'function') return res;
  return new Promise((resolve, reject) => {
    if (res instanceof Error) reject(res);
    resolve(true);
  });
};
const defaultValue: any[] = []
const useUpload = <T>(props: UseUploadProps<T>) => {
  const { limit = 100, value = defaultValue } = props;
  const accept = props.forceAccept || props.accept;
  const forceAccept = !!props.forceAccept;
  const [filesState, setFiles] = useState<Record<string, FileRecord>>({});
  const [recycleValues, setRecycleValues] = useState<T[]>([]);

  const restLength = limit - value.length - Object.keys(filesState).length;

  const text = {
    forceAcceptErrorMsg: 'invalidAccept',
    invalidImage: 'invalidImage',
    ...props.text,
  };

  const validateFile = async (blob: File, image?: { width: number; height: number }) => {
    const { validator } = props;
    let error = null;
    let i = 0;
    if (forceAccept) {
      const acceptRes = attrAccept(blob, accept);
      if (!acceptRes) return new Error(text.forceAcceptErrorMsg);
    }
    while (VALIDATORITEMS[i]) {
      const item = VALIDATORITEMS[i];
      if (validator && typeof validator[item.key] === 'function') {
        try {
          await promised(validator![item.key]!, item.param(blob, image), filesState);
        } catch (err: any) {
          error = err instanceof Error ? err : new Error(err);
        }
        if (error instanceof Error) return error;
      }
      i += 1;
    }

    return null;
  };

  const validatorHandle = (error: Error, file: File) => {
    const { validatorHandle: vth = true } = props;

    if (typeof vth === 'function') return vth(error, file);

    return !!vth;
  };

  const getAction = (file: File) => {
    const { action } = props;
    if (typeof action === 'string') return action;
    if (typeof action === 'function') return action(file);
    return '';
  };

  const handleError = (id: string, xhr: XhrResult, file: File) => {
    const { onHttpError } = props;

    let message = xhr.statusText;
    const onError = (props as any).onError;
    if (onError) message = onError(xhr, file) || message;
    if (onHttpError) message = onHttpError(xhr, file) || message;

    setFiles((files) =>
      produce(files, (draft) => {
        if (!draft[id]) return draft;
        draft[id].status = 3;
        draft[id].message = message;
      }),
    );
  };

  const latestState = useLatestObj({ filesState, value });

  const uploadFile = (id: string, file: File, data?: string) => {
    const request = props.request || xhrUpload;
    let throttle = false;
    const options = {
      url: getAction(file),
      name: props.htmlName || 'file',
      params: props.params,
      withCredentials: !!props.withCredentials,
      file,
      headers: props.headers,
      responseType: props.responseType,
      onStart: props.onStart,
      onProgress: (e: ProgressEvent & { percent?: number }, msg?: string) => {
        if (throttle) return;
        throttle = true;
        setTimeout(() => {
          throttle = false;
        }, 16);

        const percent = typeof e.percent === 'number' ? e.percent : (e.loaded / e.total) * 100;
        const { filesState } = latestState;
        const newFiles = { ...filesState };
        if (!newFiles[id]) return;
        newFiles[id].process = percent;
        if (msg) newFiles[id].message = msg;
        setFiles(newFiles);
        if (typeof props.onProgress === 'function') {
          props.onProgress(newFiles[id]);
        }
      },
      onLoad: (xhr: XhrResult) => {
        if (!/^2|1223/.test(`${xhr.status}`)) {
          handleError(id, xhr, file);
          return;
        }

        let result: any;
        if (xhr.responseType === 'text' || !xhr.responseType) result = xhr.responseText;
        if (!result) result = xhr.response;
        if (props.onSuccess) {
          result = props.onSuccess(result, file, data, xhr);
        }

        if (result instanceof Error) {
          setFiles((files) => {
            return produce(files, (draft) => {
              if (!draft[id]) return draft;
              draft[id].status = 3;
              draft[id].name = file.name;
              draft[id].message = result.message;
            });
          });
        } else {
          setFiles((files) => {
            return produce(files, (draft) => {
              delete draft[id];
            });
          });
          // add value
          props.onChange(((prev: T[]) => {
            return [
              ...(prev || []),
              result
            ]
          }) as any);
        }
      },
      onError: (xhr: XhrResult) => handleError(id, xhr, file),
    };
    if (props.onProgress === false || props.onProgress === null) {
      options.onProgress = () => {};
    }
    return request(options);
  };

  /**
   *
   * @param files
   * @param fromDragger
   *
   *  1. 判断文件是否超出个数限制
   *  2. 进行文件本地校验
   *  3. 错误处理 validatorHandle 为 true 进行报错处理， 否则直接删除文件
   *  3.1 错误结果也要 beforeUpload 处理 。。。？
   *  4. beforeUpload  判断
   *  4.1 then 判断status 上传
   *  4.2 失败处理
   *  5. 上传文件
   */

  const handleImage = (blob: File): Promise<{ src: string; width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result as string;
        const image = new window.Image();
        image.onerror = () => {
          reject(new Error(text.invalidImage));
        };
        image.onload = () => {
          resolve({
            src: data,
            width: image.width,
            height: image.height,
          });
        };
        image.src = data;
      };
      reader.readAsDataURL(blob);
    });
  };

  const addFiles = usePersistFn(async (files: File[]) => {
    if (props.disabled) return;
    let fileList = files;
    let newFiles = { ...filesState };
    if (props.filesFilter) fileList = props.filesFilter(files);
    const resetLength = limit - Object.keys(newFiles).length - value.length;
    if (resetLength < 0) return;
    const list = Array.from({ length: Math.min(fileList.length, resetLength) });
    for (let i = 0; i < list.length; i++) {
      const blob = fileList[i];
      const id = getUidStr();
      const fileRecord: FileRecord = {
        name: blob.name,
        process: -1,
        status: 1,
        blob,
      };
      newFiles[id] = fileRecord;

      let error: Error | null | void = null;
      let imageResult: { src: string; width: number; height: number } | undefined = undefined;
      if (props.isImage && !props.ignorePreview) {
        try {
          imageResult = await handleImage(blob);
          fileRecord.src = imageResult.src;
        } catch (e) {
          if (e instanceof Error) error = e;
        }
      }
      if (!error) {
        error = await validateFile(blob, imageResult);
      }

      if (error instanceof Error) {
        if (!validatorHandle(error, blob)) {
          delete newFiles[id];
          setFiles({ ...newFiles });
          continue;
        }
        fileRecord.message = error.message;
        fileRecord.status = 3;
        setFiles({ ...newFiles });
        continue;
      }
      if (props.beforeUpload) {
        const beforeUploadResult = props.beforeUpload(blob);
        // @ts-ignoreq
        if (beforeUploadResult && beforeUploadResult.then) {
          props
            .beforeUpload(blob)
            .then((args) => {
              if (args.status !== 'error') {
                newFiles[id].xhr = uploadFile(id, blob, fileRecord.src);
                setFiles({ ...newFiles });
              }
            })
            .catch(() => {
              delete newFiles[id];
              setFiles({ ...newFiles });
            });
          continue;
        }
      } else {
        fileRecord.xhr = uploadFile(id, blob, fileRecord.src);
        setFiles({ ...newFiles });
      }
    }
  });

  const removeFile = usePersistFn((id: string) => {
    const { beforeCancel, onErrorRemove } = props;
    const file = filesState[id];

    if (beforeCancel && isFunc(beforeCancel)) beforeCancel(file);

    if (file) {
      if (file.xhr && file.xhr.abort) file.xhr.abort();
      setFiles((pre) =>
        produce(pre, (draft) => {
          const newFiles = { ...draft };
          delete newFiles[id];
          return newFiles;
        }),
      );
      if (file.status === 3 && onErrorRemove) {
        onErrorRemove(file.xhr!, file.blob, file);
      }
    }
  });

  const removeValue = usePersistFn((index: number) => {
    if (props.disabled) return;
    const { recoverAble, beforeRemove } = props;
    const current = props.value[index];
    const startRemove =
      typeof beforeRemove === 'function' ? beforeRemove(current) : Promise.resolve();
    startRemove
      .then(() => {
        const newRecycle = [...recycleValues];
        if (typeof recoverAble !== 'number' ? !!recoverAble : recycleValues.length < recoverAble) {
          newRecycle.push(value[index]);
        }
        setRecycleValues(newRecycle);
        const newValue = produce(latestState.value, (draft) => {
          draft.splice(index, 1);
        });
        props.onChange(newValue);
      })
      .catch(() => {});
  });

  const recoverValue = usePersistFn((index: number) => {
    if (props.disabled) return;
    props.onChange(
      produce(latestState.value, (draft: T[]) => {
        draft.push(recycleValues[index]);
      }),
    );
    setRecycleValues((pre) => {
      const newRecycle = [...pre];
      newRecycle.splice(index, 1);
      return newRecycle;
    });
  });

  const func = useLatestObj({
    addFiles,
    removeFile,
    removeValue,
    recoverValue,
  });
  return {
    files: filesState,
    recycleValues,
    accept,
    restLength,
    func,
  };
};

export default useUpload;
