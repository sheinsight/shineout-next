import { styled } from '../jss-style';
import stepsStyle, { StepsClasses } from './steps';

const useStepsStyle = styled(stepsStyle, 'steps');
export { stepsStyle, useStepsStyle };
export type { StepsClasses };
export default useStepsStyle;
