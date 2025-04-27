import { useMemo } from 'react';
import { useFormFlow, util } from '@sheinx/hooks';
import type { FormFlowProps } from './form-flow.type';

const FormFlow: React.FC<FormFlowProps> = (props) => {
  const { strict = true } = props;
  const datum = useFormFlow({ names: props.names });
  const valueOfNames = props.names?.map((name) => datum?.get(name));
  const memoizedResult = useMemo(() => {
    if (!strict) return null;
    if (util.isFunc(props.children)) {
      return props.children(datum) as JSX.Element;
    }

    return props.children as JSX.Element;
  }, [valueOfNames?.toString()]);

  if (strict) {
    return memoizedResult;
  }

  if (util.isFunc(props.children)) {
    return props.children(datum) as JSX.Element;
  }
  return props.children as JSX.Element;
};

export default FormFlow;
