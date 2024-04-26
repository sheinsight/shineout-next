import useLatestObj from '../../../common/use-latest-obj';
import { useFormFunc } from '../form-func-context';

export interface FormDatum {
  set: (vals: { [name: string]: any }) => void;
  get: (name?: string) => any;
}
const useFormDatum = () => {
  const formFunc = useFormFunc();
  const func = useLatestObj({
    set: formFunc?.setValue,
    get: formFunc?.getValue,
  });
  const datum = formFunc ? func : undefined;
  return datum as FormDatum | undefined;
};

export default useFormDatum;
