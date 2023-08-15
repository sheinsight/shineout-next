import Checkbox from './checkbox';
import Group from './group';

type RefCheckbox = typeof Checkbox;
type RefGroup = typeof Group;

interface GroupComponent extends RefGroup {
  displayName: string;
}
const CheckboxGroup: GroupComponent = Group as GroupComponent;
CheckboxGroup.displayName = 'ShineoutCheckboxGroup';

interface CheckboxComponent extends RefCheckbox {
  Group: GroupComponent;
  displayName: string;
}
(Checkbox as CheckboxComponent).displayName = 'ShineoutCheckbox';
(Checkbox as CheckboxComponent).Group = CheckboxGroup;

export default Checkbox as CheckboxComponent;
