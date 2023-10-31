import Progress from './progress';

type RefProgress = typeof Progress;

export interface ProgressComponent extends RefProgress {
  displayName: string;
}

const ProgressComp: ProgressComponent = Progress as ProgressComponent;

ProgressComp.displayName = 'ShineoutProgress';

export default ProgressComp;
