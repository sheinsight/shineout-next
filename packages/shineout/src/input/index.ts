import IInput from './input';
import IGroup from './Group';

type RefInput = typeof IInput;
export interface InputComponent extends RefInput {
  displayName: string;
  inGroup: true;
  Group: typeof IGroup & { displayName: string };
}

const InputComp: InputComponent = IInput as InputComponent;

InputComp.Group = IGroup as InputComponent['Group'];

InputComp.displayName = 'ShineoutInput';
InputComp.inGroup = true;
InputComp.Group.displayName = 'ShineoutInputGroup';

export default InputComp;
