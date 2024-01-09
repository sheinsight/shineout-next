import { useEffect } from 'react';
import { useFormBind } from '../form-bind-context';
import useRender from '../../../common/use-render';
import useFormDatum from './use-form-datum';

import type { UseFormFlowProps } from './use-form-flow.type';

const UseFormItem = (props: UseFormFlowProps) => {
  const { names } = props;
  const formBind = useFormBind();
  const update = useRender();
  const formDatum = useFormDatum();

  useEffect(() => {
    if (formBind && formBind.func) {
      formBind.func.watch(names, update);
    }
    return () => {
      if (formBind && formBind.func) {
        formBind.func.unWatch(names, update);
      }
    };
  }, [names]);

  return formDatum;
};

export default UseFormItem;
