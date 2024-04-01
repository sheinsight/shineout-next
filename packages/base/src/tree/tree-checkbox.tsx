import { TreeCheckboxProps } from './tree-checkbox.type';
import { Checkbox } from '../checkbox';
import { useTreeContext } from './tree-context';
import { KeygenResult } from '@sheinx/hooks';

const TreeCheckbox = <Value extends KeygenResult[]>(props: TreeCheckboxProps<Value>) => {
  const { jssStyle, className, id, onChange, disabled } = props;
  const { getValue, set, getChecked } = useTreeContext();

  const handleChange = (_: any, checked: boolean) => {
    set(id, checked ? 1 : 0);
    if (onChange) {
      onChange(getValue() as Value, id);
    }
  };

  const checked = getChecked(id);

  return (
    <Checkbox
      //@ts-ignore
      theme='dark'
      className={className}
      jssStyle={jssStyle}
      checked={checked}
      disabled={disabled}
      onChange={handleChange}
    ></Checkbox>
  );
};

export default TreeCheckbox;
