import Sticky from './sticky';

type RefSticky = typeof Sticky;

export interface StickyComponent extends RefSticky {
  displayName: string;
}

const StickyComp: StickyComponent = Sticky as StickyComponent;

StickyComp.displayName = 'ShineoutSticky';

export default StickyComp;
