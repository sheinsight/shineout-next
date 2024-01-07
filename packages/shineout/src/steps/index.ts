import Steps from './steps';
import Step from './step';

type RefSteps = typeof Steps;
type RefStep = typeof Step;

export interface StepComponent extends RefStep {
  displayName: string;
}

const StepsStep: StepComponent = Step as StepComponent;
StepsStep.displayName = 'ShineoutStep';

export interface StepsComponent extends RefSteps {
  Step: StepComponent;
  displayName: string;
}

const StepsComp: StepsComponent = Steps as StepsComponent;

StepsComp.displayName = 'ShineoutSteps';
StepsComp.Step = StepsStep;

export default StepsComp;
