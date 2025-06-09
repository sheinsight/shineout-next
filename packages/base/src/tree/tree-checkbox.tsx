import { useEffect } from 'react';
import { TreeCheckboxProps } from './tree-checkbox.type';
import { Checkbox } from '../checkbox';
import { useTreeContext } from './tree-context';

const TreeCheckbox = (props: TreeCheckboxProps) => {
  const { jssStyle, className, id, onChange, disabled, checked, size } = props;
  const { unBindUpdate } = useTreeContext();

  useEffect(() => {
    return () => {
      unBindUpdate(id);
    };
  }, []);

  return (
    <Checkbox
      //@ts-ignore
      theme='dark'
      className={className}
      jssStyle={jssStyle}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      needStopPropagation={true}
      size={size}
    ></Checkbox>
  );
};

export default TreeCheckbox;
