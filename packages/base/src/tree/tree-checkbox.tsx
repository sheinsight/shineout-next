import { TreeCheckboxProps } from './tree-checkbox.type';
import { Checkbox } from '../checkbox';
import { useTreeContext } from './tree-context';

const TreeCheckbox = (props: TreeCheckboxProps) => {
  const { jssStyle, className, id, onChange, disabled } = props;
  const { getValue, set, getChecked } = useTreeContext();

  const handleChange = (_: any, checked: boolean) => {
    set(id, checked ? 1 : 0);
    if (onChange) {
      onChange(getValue(), id);
    }
  };

  const checked = getChecked(id);

  return (
    <Checkbox
      className={className}
      jssStyle={jssStyle}
      checked={checked}
      disabled={disabled}
      onChange={handleChange}
    ></Checkbox>
  );
};

export default TreeCheckbox;
