import Divider from './divider';

type RefDivider = typeof Divider;

export interface DividerComponent extends RefDivider {
  displayName: string;
}

const DividerComp: DividerComponent = Divider as DividerComponent;

DividerComp.displayName = 'ShineoutDivider';

export default DividerComp;
