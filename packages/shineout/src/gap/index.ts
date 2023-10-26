import Gap from './gap';

type RefGap = typeof Gap;

export interface GapComponent extends RefGap {
  displayName: string;
}

const GapComp: GapComponent = Gap as GapComponent;

GapComp.displayName = 'ShineoutGap';

export default GapComp;
