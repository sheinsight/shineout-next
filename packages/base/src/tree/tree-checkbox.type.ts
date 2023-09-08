import { SpinClasses } from '../spin/spin.type';
import { CheckboxClasses } from '../checkbox/checkbox.type';
import { TreeClasses } from './tree.type';

export interface TreeCheckboxProps {
  jssStyle: {
    tree: TreeClasses;
    spin: SpinClasses;
    checkbox: CheckboxClasses;
  };
}
