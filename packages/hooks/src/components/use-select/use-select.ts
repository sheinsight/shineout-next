import { useInputAble } from '../../common/use-input-able';
import { useListSelect } from '../../common/use-list-select';
import { BaseSelectProps } from './use-select.type';

const useSelect = <DataItem, Value>(props: BaseSelectProps<DataItem, Value>) => {
  const {
    data,
    treeData,
    separator,
    // childrenKey,
    control,
    defaultValue,
    beforeChange,
    format,
    disabled,
    multiple,
    prediction,
    value: valueProp,
    onChange: onChangeProp,
  } = props;

  const { value, onChange } = useInputAble({
    value: valueProp,
    control,
    defaultValue,
    beforeChange,
    onChange: onChangeProp,
  });

  const datum = useListSelect({
    data: data || treeData,
    separator,
    format,
    value,
    multiple,
    disabled,
    onChange,
    prediction,
  });

  return {
    value,
    datum,
  };
};

export default useSelect;
