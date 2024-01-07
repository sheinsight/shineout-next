import { useFormFlow, util } from '@sheinx/hooks';
import type { FormFlowProps } from './form-flow.type';

const FormFlow: React.FC<FormFlowProps> = (props) => {
  const datum = useFormFlow({ names: props.names });
  if (util.isFunc(props.children)) return props.children(datum) as JSX.Element;
  return props.children as JSX.Element;
};

export default FormFlow;
