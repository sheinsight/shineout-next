import IInput from './input';
import IGroup from './group';
import IPassword from './password';
import INumber from './number';

type RefInput = typeof IInput;
export interface InputComponent extends RefInput {
  displayName: string;
  Group: typeof IGroup & { displayName: string };
  Password: typeof IPassword & { displayName: string };
  Number: typeof INumber & { displayName: string };
}

const InputComp: InputComponent = IInput as InputComponent;

InputComp.Group = IGroup as InputComponent['Group'];
InputComp.Password = IPassword as InputComponent['Password'];
InputComp.Number = INumber as InputComponent['Number'];

InputComp.displayName = 'ShineoutInput';
InputComp.Group.displayName = 'ShineoutInputGroup';
InputComp.Password.displayName = 'ShineouInputPassword';
InputComp.Number.displayName = 'ShineouInputNumber';

export default InputComp;
