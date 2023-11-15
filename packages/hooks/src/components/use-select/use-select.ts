// import { getKey } from '../../utils';
// import { KeygenResult } from '../../common/type';
import { useInputAble } from '../../common/use-input-able';
import { useListSelect } from '../../common/use-list-select';
import { BaseSelectProps } from './use-select.type';

const useSelect = <DataItem, Value>(props: BaseSelectProps<DataItem, Value>) => {
  const {
    data,
    control,
    defaultValue,
    beforeChange,
    format,
    multiple,
    prediction,
    value: valueProp,
    onChange: onChangeProp,
  } = props;

  const { value, onChange } = useInputAble({
    value: valueProp,
    control: control,
    defaultValue,
    beforeChange,
    onChange: onChangeProp,
  });

  const datum = useListSelect({
    data,
    format,
    value,
    multiple,
    onChange,
    prediction,
  });

  return {
    datum,
  };
};

export default useSelect;
