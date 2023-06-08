import { useContext, useState } from 'react';
import usePersistFn from '../../common/use-persist-fn';
import { validate as valli } from '../../utils';
import { FormItemContext } from '../use-form/use-form-item/form-item-context';
import { UseValidateProps } from './use-validate.type';

const useValidate = (props: UseValidateProps) => {
  const [error, setError] = useState<Error | undefined>(undefined);
  const { rules = [], options = {}, shouldSetError } = props;
  const { updateError } = useContext(FormItemContext);
  const validate = usePersistFn((value: any) => {
    return valli(value, {}, rules, options)
      .then((res) => {
        const error = res === true ? undefined : res;
        setError(error);
        if (shouldSetError) {
          updateError('', error);
        }
        return res;
      })
      .catch((e: Error) => {
        setError(e);
        updateError('', e);
        return e;
      }) as Promise<Error | undefined>;
  });

  return { error, validate };
};

export default useValidate;
