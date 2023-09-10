import ISpin from './spin';

type RefSpin = typeof ISpin;

export interface SpinComponent extends RefSpin {
  displayName: string;
}

const SpinComp: SpinComponent = ISpin as SpinComponent;

SpinComp.displayName = 'ShineoutSpin';

export default SpinComp;
