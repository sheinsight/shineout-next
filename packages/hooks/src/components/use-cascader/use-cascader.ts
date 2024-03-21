import { KeygenResult } from '../../common/type';
import { useInputAble } from '../../common/use-input-able';
import { BaseCascaderProps } from './use-cascader.type';
import useTree from '../use-tree';

const useCascader = <DataItem, Value extends KeygenResult[]>(
  props: BaseCascaderProps<DataItem, Value>,
) => {
  const {
    data,
    control,
    keygen,
    mode,
    unmatch,
    disabled,
    defaultValue,
    beforeChange,
    value: valueProp,
    onChange: onChangeProp,
    filterSameChange,
  } = props;

  const { value, onChange } = useInputAble({
    value: valueProp,
    control,
    defaultValue,
    beforeChange,
    onChange: onChangeProp,
    filterSameChange,
  });
  const { datum } = useTree({
    value,
    data,
    unmatch: unmatch,
    keygen,
    mode,
    disabled,
    isControlled: control,
  });

  return {
    datum,
    value,
    onChange,
  };
};

export default useCascader;
