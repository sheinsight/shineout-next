import { StepStyleProps } from './steps.type';

const DefaultStep = (props: StepStyleProps) => {
  const { size } = props;
  console.log(size);
  return <div>Default</div>;
};

export default DefaultStep;
