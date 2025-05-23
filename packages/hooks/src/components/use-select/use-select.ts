import { useInputAble } from '../../common/use-input-able';
import { useListSelect } from '../../common/use-list-select';
import { BaseSelectProps, UseSelectProps } from './use-select.type';

const emptyArray: any[] = [];
const useSelect = <DataItem, Value>(
  props: BaseSelectProps<DataItem, Value> & UseSelectProps<Value>,
) => {
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
    onSameChange,
    filterSameChange,
    noCache,
  } = props;

  const { value, onChange } = useInputAble({
    value: valueProp,
    control,
    defaultValue,
    beforeChange,
    onChange: onChangeProp,
    onSameChange,
    filterSameChange,
  });

  const datum = useListSelect({
    data: data || treeData || emptyArray,
    separator,
    format,
    value,
    multiple,
    disabled,
    // TODO: 类型定义需要修改
    onChange: onChange as any,
    prediction,
    keepCache: !noCache,
  });

  return {
    value,
    datum,
  };
};

export default useSelect;
