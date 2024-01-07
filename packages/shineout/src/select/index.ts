import Select from './select';

type RefSelect = typeof Select;

export interface SelectComponent extends RefSelect {
  displayName: string;
}

const SelectComp: SelectComponent = Select as SelectComponent;

SelectComp.displayName = 'ShineoutSelect';

export default SelectComp;
