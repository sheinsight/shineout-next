import IButton from './button';
// ...

type RefButton = typeof IButton;
export interface ButtonComponent extends RefButton {
  displayName: string;
  // ...
}

const ButtonComp: ButtonComponent = IButton; // as ButtonComponent;

ButtonComp.displayName = 'ShineoutButton';
// ...

export default ButtonComp;
