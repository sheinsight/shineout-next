import Radio from './radio';
import Group from './group';

type RefRadio = typeof Radio;
interface RadioComponent extends RefRadio {
  Group: typeof Group;
  displayName: string;
}

(Radio as RadioComponent).displayName = 'ShineoutRadio';
(Radio as RadioComponent).Group = Group;
export default Radio as RadioComponent;
