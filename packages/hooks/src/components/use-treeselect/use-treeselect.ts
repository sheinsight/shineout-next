import { useMemo } from 'react';
import { useInputAble } from '../../common/use-input-able';
import usePersistFn from '../../common/use-persist-fn';
import { BaseTreeSelectProps } from './use-treeselect.type';
import { isArray } from '../../utils/is';
import type { KeygenResult } from '../../common/type';

const useTreeSelect = <DataItem, Value>(props: BaseTreeSelectProps<DataItem, Value>) => {
  const {
    value: valueProp,
    defaultValue,
    control,
    beforeChange,
    onChange: onChangeProp,
    filterSameChange,
    multiple,
  } = props;

  const { value, onChange } = useInputAble({
    value: valueProp,
    control,
    defaultValue,
    beforeChange,
    onChange: onChangeProp,
    filterSameChange,
  });

  const valueArr = useMemo(() => {
    if (value === undefined || value === null || value === '') return [];
    return Array.isArray(value) ? value : [value];
  }, [value, multiple]) as KeygenResult[];

  const handleChange = usePersistFn((v: KeygenResult[], ...reset) => {
    if (!multiple && isArray(v)) {
      onChange?.(v[0] as Value, ...reset);
    } else if (multiple && !isArray(v)) {
      if (v === undefined || v === null) {
        onChange?.([] as Value, ...reset);
      } else onChange?.([v] as Value, ...reset);
    } else {
      onChange?.(v as Value, ...reset);
    }
  });

  return {
    value: valueArr,
    onChange: handleChange,
  };
};

export default useTreeSelect;
