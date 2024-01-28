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
    defaultValue,
    beforeChange,
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

  const { datum } = useTree({
    value,
    data,
    keygen,
    isControlled: control,
  });

  return {
    datum,
    value,
    onChange,
  };
};

export default useCascader;