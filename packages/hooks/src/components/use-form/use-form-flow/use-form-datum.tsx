import useLatestObj from '../../../common/use-latest-obj';
import { usePersistFn } from '../../../common/use-persist-fn';
import { useFormFunc } from '../form-func-context';

export interface FormDatum {
  set: (vals: { [name: string]: any } | string, value?: any) => void;
  get: (name?: string) => any;
}

const useFormDatum = () => {
  const formFunc = useFormFunc();

  const set: FormDatum['set'] = usePersistFn((vals, value) => {
    if (typeof vals === 'object') {
      formFunc?.setValue(vals);
    } else {
      formFunc?.setValue({ [vals]: value });
    }
  });
  const func = useLatestObj({
    set: set,
    get: formFunc?.getValue,
  });
  const datum = formFunc ? func : undefined;
  return datum as FormDatum | undefined;
};

export default useFormDatum;
