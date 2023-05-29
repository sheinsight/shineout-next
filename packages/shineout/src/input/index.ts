import IInput from './input';
import IGroup from './group';
import IPassword from './password';

type RefInput = typeof IInput;
export interface InputComponent extends RefInput {
  displayName: string;
  inGroup: true;
  Group: typeof IGroup & { displayName: string };
  Password: typeof IPassword & { displayName: string };
}

const InputComp: InputComponent = IInput as InputComponent;

InputComp.Group = IGroup as InputComponent['Group'];
InputComp.Password = IPassword as InputComponent['Password'];

InputComp.displayName = 'ShineoutInput';
InputComp.Group.displayName = 'ShineoutInputGroup';
InputComp.Password.displayName = 'ShineouInputPassword';

export default InputComp;
