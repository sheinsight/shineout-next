import { TreeCheckboxProps } from './tree-checkbox.type';
import { Checkbox } from '../checkbox';
import { useTreeContext } from './tree-context';

const TreeCheckbox = <DataItem,>(props: TreeCheckboxProps<DataItem>) => {
  const { jssStyle, className, id, onChange, disabled } = props;
  const { getValue, set, isDisabled, getChecked } = useTreeContext();

  const handleChange = (_: any, checked: boolean) => {
    set(id, checked ? 1 : 0);
    if (onChange) {
      onChange(getValue(), id);
    }
  };

  const checkDisabled = () => {
    if (disabled) return true;

    return isDisabled(id);
  };
  const checked = getChecked(id);

  return (
    <Checkbox
      className={className}
      jssStyle={jssStyle}
      checked={checked}
      disabled={checkDisabled()}
      onChange={handleChange}
    ></Checkbox>
  );
};

export default TreeCheckbox;
