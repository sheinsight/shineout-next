import IPopover from './popover';

type RefPopover = typeof IPopover;

export interface PopoverComponent extends RefPopover {
  displayName: string;
}

const PopoverComp: PopoverComponent = IPopover as PopoverComponent;

PopoverComp.displayName = 'ShineoutPopover';

export default PopoverComp;
