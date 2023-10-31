import { useRef, useState } from 'react';
import { UploadProps } from './upload.type';

const useUploadCommon = (props: Pick<UploadProps<any>, 'rules'>) => {
  // upload validate sync to form
  const [_count, setCount] = useState(0);
  const { current: context } = useRef<{ customRule?: any }>({});
  const rules = [...(props.rules || [])];
  if (context.customRule) {
    rules.push(context.customRule);
  }
  const validateHook = (r: any) => {
    context.customRule = r;
    setCount((c) => c + 1);
  };

  return {
    validateHook,
    rules,
  };
};

export default useUploadCommon;
