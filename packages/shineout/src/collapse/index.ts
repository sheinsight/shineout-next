import Collapse from './collapse';

type RefCollapse = typeof Collapse;

export interface CollapseComponent extends RefCollapse {
  displayName: string;
}

const CollapseComp: CollapseComponent = Collapse as CollapseComponent;

CollapseComp.displayName = 'ShineoutCollapse';

export default CollapseComp;
