import { Progress } from '@sheinx/base';
import { useProgressStyle } from '@sheinx/shineout-style';
import { ProgressProps } from './progress.type';

const jssStyle = { progress: useProgressStyle };
export default (props: ProgressProps) => {
  return <Progress {...props} jssStyle={jssStyle} />;
};
