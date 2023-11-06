import { StepStyleProps } from './steps.type';

const ArrowStep = (props: StepStyleProps) => {
  const { size } = props;
  console.log(size);
  return <div>Arrow</div>;
};

export default ArrowStep;
