import Checkbox from './checkbox';
import Group from './group';

type RefCheckbox = typeof Checkbox;
interface CheckboxComponent extends RefCheckbox {
  Group: typeof Group;
  displayName: string;
}

(Checkbox as CheckboxComponent).displayName = 'ShineoutCheckbox';
(Checkbox as CheckboxComponent).Group = Group;
export default Checkbox as CheckboxComponent;
