import Radio from './radio';
import Group from './group';

type RefRadio = typeof Radio;
type RefGroup = typeof Group;

interface GroupComponent extends RefGroup {
  displayName: string;
}

const RadioGroup: GroupComponent = Group as GroupComponent;
RadioGroup.displayName = 'ShineoutRadioGroup';

interface RadioComponent extends RefRadio {
  Group: GroupComponent;
  displayName: string;
}

(Radio as RadioComponent).displayName = 'ShineoutRadio';
(Radio as RadioComponent).Group = RadioGroup;

export default Radio as RadioComponent;
