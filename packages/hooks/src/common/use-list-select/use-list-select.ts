import { isArray, isObject } from '../../utils';
import React from 'react';

import { UnMatchedData, UseListProps } from './use-list.type';

const isUnMatchedData = (data: any): data is UnMatchedData => {
  return data && data.IS_NOT_MATCHED_VALUE;
};

const useListSelect = <DataItem, Value extends string | any[]>(
  props: UseListProps<DataItem, Value>,
) => {
  type ValueItem = Value[number];

  let valueArr: ValueItem[];
  if (typeof props.separator === 'string' && props.value) {
    if (typeof props.value === 'string') {
      valueArr = (props.value || '').split(props.separator);
    } else {
      console.error('use-list-select: separator is string, but value is not string');
      valueArr = props.value;
    }
  } else {
    valueArr = (props.value as ValueItem[]) || [];
  }

  const { current: context } = React.useRef({
    lastValue: undefined as Value | undefined,
    valueMap: new Map<ValueItem, boolean>(),
    lastData: [] as DataItem[],
    dataMap: new Map<ValueItem, DataItem>(),
  });
  const disabledCheck = (data: DataItem) => {
    if (typeof props.disabled === 'boolean') return props.disabled;
    if (typeof props.disabled === 'function') return props.disabled(data);
    return false;
  };

  const formatData = (data: DataItem): ValueItem => {
    if (typeof props.format === 'string' && isObject(data)) return data[props.format];
    if (typeof props.format === 'function') return props.format(data);
    return data as ValueItem;
  };
  const getDataMap = () => {
    if (props.data === context.lastData) return context.valueMap;

    const map = new Map<ValueItem, DataItem>();
    for (let i = 0; i < props.data.length; i++) {
      const item = props.data[i];
      map.set(formatData(item), item);
    }
    context.dataMap = map;
    context.lastData = props.data;
    return map;
  };

  const getValueMap = () => {
    if (props.value === context.lastValue) return context.valueMap;
    const map = new Map<ValueItem, boolean>();
    for (let i = 0; i < valueArr.length; i++) {
      const item = valueArr[i];
      map.set(item, true);
    }
    context.valueMap = map;
    context.lastValue = props.value;
    return map;
  };

  const add = (
    data: DataItem[] | DataItem,
    config: { unshift?: boolean; overwrite?: boolean } = {},
  ) => {
    if (data === null || data === undefined) return;

    const values = [] as ValueItem[];
    const raws = isArray(data) ? data : [data];
    for (let i = 0; i < raws.length; i++) {
      if (!disabledCheck(raws[i])) {
        values.push(formatData(raws[i]));
      }
    }
    const before = (config.overwrite ? [] : valueArr || []) as ValueItem[];
    if (values.length) {
      const newValue = config.unshift ? values.concat(before) : before.concat(values);
      const valueResult = props.separator ? newValue.join(props.separator) : newValue;
      props.onChange(valueResult as Value, data, true);
    }
  };

  // 删除数据
  const remove = (data: (DataItem | UnMatchedData) | (DataItem | UnMatchedData)[]) => {
    if (data === null || data === undefined) return;
    const values = [];
    const raws = isArray(data) ? data : [data];
    if (!props.prediction) {
      const rowValueMap = new Map();
      for (let i = 0; i < raws.length; i++) {
        const item = raws[i];
        if (isUnMatchedData(item)) {
          rowValueMap.set(item.value, true);
        } else {
          if (disabledCheck(item)) {
            continue;
          }
          rowValueMap.set(formatData(item), true);
        }
      }

      for (let i = 0; i < valueArr.length; i++) {
        const val = valueArr[i];
        if (!rowValueMap.get(val)) {
          values.push(val);
        }
      }
    } else {
      const { prediction } = props;
      outer: for (const val of valueArr) {
        for (let j = 0; j < raws.length; j++) {
          const item = raws[j];
          const isSame = isUnMatchedData(item)
            ? item.value === val
            : disabledCheck(item) || prediction(val, item);
          if (isSame) {
            raws.splice(j, 1);
            continue outer;
          }
        }
        values.push(val);
      }
    }
    const valueResult = props.separator ? values.join(props.separator) : values;
    props.onChange(valueResult as Value, data as DataItem, false);
  };
  const check = (raw: DataItem) => {
    if (props.prediction) {
      for (let i = 0, count = valueArr.length; i < count; i++) {
        if (props.prediction(valueArr[i], raw)) return true;
      }
      return false;
    }
    return !!getValueMap().get(formatData(raw));
  };

  const getDataByValues = (values: ValueItem[]) => {
    const result = [];
    if (!props.prediction) {
      if (!values || !values.length) return [];
      const map = getDataMap();
      for (let i = 0; i < values.length; i++) {
        const item = map.get(values[i]);
        if (item) {
          result.push(item);
        } else {
          result.push({ IS_NOT_MATCHED_VALUE: true, value: values[i] });
        }
      }
    } else {
      const raws = [...props.data];
      outer: for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < raws.length; j++) {
          const item = raws[j];
          if (props.prediction(values[i], item)) {
            result.push(item);
            raws.splice(j, 1);
            continue outer;
          }
          if (j === raws.length - 1) {
            result.push({ IS_NOT_MATCHED_VALUE: true, value: values[i] });
          }
        }
      }
    }

    return result;
  };

  return {
    add,
    remove,
    check,
    getDataByValues,
    isUnMatchedData,
    disabledCheck,
  };
};

export default useListSelect;
