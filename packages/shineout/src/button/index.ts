import Button from './button';
import Group from './group';

type RefButton = typeof Button;
export interface ButtonComponent extends RefButton {
  Group: typeof Group;
  displayName: string;
}

(Button as ButtonComponent).displayName = 'ShineoutButton';
(Button as ButtonComponent).Group = Group;

export default Button as ButtonComponent;
