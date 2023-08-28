import Dropdown from './dropdown';

type RefDropDown = typeof Dropdown;

export interface DropdownComponent extends RefDropDown {
  displayName: string;
}

(Dropdown as DropdownComponent).displayName = 'ShineoutDropdown';

export default Dropdown as DropdownComponent;
