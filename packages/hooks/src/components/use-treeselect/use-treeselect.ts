import { useInputAble } from '../../common/use-input-able';
import { BaseTreeSelectProps } from './use-treeselect.type';


const useTreeSelect = <DataItem, Value>(props: BaseTreeSelectProps<DataItem, Value>) => {
  const { value: valueProp, defaultValue, control, beforeChange, onChange: onChangeProp } = props;

  const { value, onChange } = useInputAble({
    value: valueProp,
    control,
    defaultValue,
    beforeChange,
    onChange: onChangeProp,
  });

  return {
    value,
    onChange,
  };
};

export default useTreeSelect;
