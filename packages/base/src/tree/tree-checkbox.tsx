import { TreeCheckboxProps } from './tree-checkbox.type';
import { Checkbox } from '../checkbox';

const TreeCheckbox = (props: TreeCheckboxProps) => {
  const { jssStyle, className } = props;

  return <Checkbox className={className} jssStyle={jssStyle}></Checkbox>;
};

export default TreeCheckbox;
