import { util } from '@sheinx/hooks';
import { useState, useEffect } from 'react';
import { BaseTagProps } from './tag.type';

const Done = 2;
const Finish = 0;
const Pendding = 1;

const { isEmpty, isPromise, isString, isFunc } = util;

const useTag = (props: BaseTagProps) => {
  const { onClose, disabled, onCompleted, onClick, children, closable } = props;

  const [dismiss, setDismiss] = useState(Finish);
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState<string | undefined>(undefined);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }
    // 2.x 逻辑仅为 !isEmpty 导致输入框清空后无法再次编辑。3.x 支持空字符串，清空后 value 为 ''也允许再次编辑
    if (onCompleted && (!isEmpty(value) || value === '')) {
      setShowInput(true);
    }
    onClick?.(e);
  };

  const handleBlur = (v: string) => {
    if (isFunc(onCompleted)) onCompleted(v);
    setShowInput(false);
  };

  const handleDismiss = (e: React.MouseEvent<HTMLDivElement>) => {
    let callback;
    if (closable === 'only') {
      if (isFunc(onClose)) onClose(e);
      return;
    }
    if (onClose === true) {
      setDismiss(Done);
      return;
    }

    if (typeof onClose === 'function') {
      callback = onClose(e);
      if (isPromise(callback)) {
        setDismiss(Pendding);
        (callback as Promise<any>)
          .then(() => {
            setDismiss(Done);
          })
          .catch(() => {
            setDismiss(Finish);
          });

        return;
      }
    }

    if (e.defaultPrevented) {
      return;
    }

    setDismiss(Done);
  };

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || dismiss !== Finish) {
      return;
    }
    handleDismiss(e);
  };

  const handleInputChange = (v?: string) => {
    setValue(v);
  };

  useEffect(() => {
    if (onCompleted && isString(children) && !isEmpty(children)) {
      setValue(children);
    }
  }, []);

  return {
    value,
    dismiss,
    showInput,
    handleBlur,
    handleClose,
    handleClick,
    handleInputChange,
  };
};

export default useTag;
