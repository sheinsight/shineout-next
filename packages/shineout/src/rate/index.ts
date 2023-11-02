import Rate from './rate';

type RefRate = typeof Rate;

export interface RateComponent extends RefRate {
  displayName: string;
}

const RateComp: RateComponent = Rate as RateComponent;

RateComp.displayName = 'ShineoutRate';

export default RateComp;
