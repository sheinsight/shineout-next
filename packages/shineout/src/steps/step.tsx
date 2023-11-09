import { Step } from '@sheinx/base';
import { useStepsStyle } from '@sheinx/shineout-style';
import { StepProps } from './step.type';

const jssStyle = {
  steps: useStepsStyle,
};
export default (props: StepProps) => {
  return <Step jssStyle={jssStyle} {...props} />;
};
