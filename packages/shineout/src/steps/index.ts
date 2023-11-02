import Steps from './steps';

type RefSteps = typeof Steps;

export interface StepsComponent extends RefSteps {
  displayName: string;
}

const StepsComp: StepsComponent = Steps as StepsComponent;

StepsComp.displayName = 'ShineoutSteps';

export default StepsComp;
