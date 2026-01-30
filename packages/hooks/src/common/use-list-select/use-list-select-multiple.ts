import { isArray, isObject } from '../../utils';
import React, { useMemo } from 'react';
import usePersistFn from '../use-persist-fn';

import { UnMatchedData, UseListMultipleProps } from './use-list.type';

const isUnMatchedData = (data: any): data is UnMatchedData => {
  return data && data.IS_NOT_MATCHED_VALUE;
};

const useListSelectMultiple = <DataItem, Value extends string | any[]>(
  props: UseListMultipleProps<DataItem, Value>,
) => {
  type ValueItem = Value[number];

  let valueArr: ValueItem[];
  if (typeof props.separator === 'string' && props.value) {
    if (typeof props.value === 'string') {
      valueArr = (props.value || '').split(props.separator);
    } else {
      console.error('[shineout] use-list-select: separator is string, but value is not string');
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
    flatDataCache: new Map<any, DataItem[]>(),
    valueDataCache: new Map<any, DataItem>(),
  });
  const disabledCheck = usePersistFn((data: DataItem) => {
    if (typeof props.disabled === 'boolean') return props.disabled;
    if (typeof props.disabled === 'function') return props.disabled(data);
    return false;
  });

  const formatData = usePersistFn((data: DataItem): ValueItem => {
    if (typeof props.format === 'string' && isObject(data)) return data[props.format];
    if (typeof props.format === 'function') return props.format(data);
    return data as ValueItem;
  });

  const getVaildData = usePersistFn(() => {
    const vaildData = props.data.filter((item: DataItem) => {
      return !disabledCheck(item);
    });
    return vaildData;
  });

  const getFlatDataValue = usePersistFn((data: (DataItem | UnMatchedData)[], childrenKey) => {
    const values = [] as ValueItem[];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (isUnMatchedData(item)) {
        values.push(item.value);
        continue;
      }

      const isDisabled = disabledCheck(item);

      // childrenKey 参数由 treeCheckAll 属性控制:
      // - 当 Table 组件设置 treeCheckAll=true 时, thead 全选会传入 childrenKey
      // - 当 treeCheckAll=false 或 undefined 时, childrenKey 为 undefined
      if (childrenKey) {
        // 树形递归模式 (treeCheckAll=true):
        // 即使父节点 disabled, 也要递归处理其子节点
        // 这样可以选中 disabled 父节点下未 disabled 的子节点
        if (!isDisabled) {
          values.push(formatData(item));
        }
        // 递归处理子节点
        if (item && (item as any)[childrenKey]) {
          const children = (item as any)[childrenKey];
          if (children.length) {
            values.push(...getFlatDataValue(children, childrenKey));
          }
        }
      } else {
        // 非树形递归模式 (treeCheckAll=false 或 undefined):
        // 保持原有逻辑, disabled 节点直接跳过, 不处理其子节点
        if (isDisabled) continue;
        values.push(formatData(item));
      }
    }
    return values;
  });

  const getFlatData = usePersistFn((data: (DataItem | UnMatchedData)[], childrenKey) => {
    const dataArr = [] as (DataItem | UnMatchedData)[];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      dataArr.push(item);
      if (isUnMatchedData(item)) continue;
      if (childrenKey && item && (item as any)[childrenKey]) {
        const children = (item as any)[childrenKey];
        if (children.length) {
          dataArr.push(...getFlatData(children, childrenKey));
        }
      }
    }
    return dataArr;
  });

  const getDataMap = usePersistFn((childrenKey?: string) => {
    // data 对应 value
    if (props.data === context.lastData) return context.dataMap;
    const map = new Map<ValueItem, DataItem>();
    const data = getFlatData(props.data, childrenKey);
    for (let i = 0; i < data.length; i++) {
      const item = data[i] as DataItem;
      map.set(formatData(item), item);
    }
    context.dataMap = map;
    context.lastData = props.data;
    return map;
  });

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

  const add = usePersistFn(
    (
      data: DataItem | DataItem[],
      config: {
        unshift?: boolean;
        overwrite?: boolean;
        childrenKey?: string;
        ignoreChange?: boolean;
      } = {},
    ) => {
      if (data === null || data === undefined) return;
      const { childrenKey } = config;

      const values = getFlatDataValue(isArray(data) ? data : [data], childrenKey);
      const before = (config.overwrite ? [] : valueArr || []) as ValueItem[];
      if (values.length) {
        const newValue = config.unshift ? values.concat(before) : before.concat(values);
        const valueResult = props.separator ? newValue.join(props.separator) : newValue;
        props.onChange(valueResult as Value, data, true);
      }
    },
  );

  const removeAll = usePersistFn(() => {
    props.onChange((props.separator ? '' : []) as unknown as Value, undefined as DataItem, false);
  });

  // 删除数据

  const remove = usePersistFn(
    (
      data: (DataItem | UnMatchedData) | (DataItem | UnMatchedData)[],
      config: { childrenKey?: string } = {},
    ) => {
      if (data === null || data === undefined) return;
      const { childrenKey } = config;
      const values = [];
      const raws = isArray(data) ? [...data] : [data];

      if (!props.prediction) {
        const removeValue = getFlatDataValue(raws, childrenKey);
        const rowValueSet = new Set(removeValue);
        for (let i = 0; i < valueArr.length; i++) {
          const val = valueArr[i];
          if (!rowValueSet.has(val)) {
            values.push(val);
          }
        }
      } else {
        const { prediction } = props;
        outer: for (const val of valueArr) {
          const flatDataArr = getFlatData(raws, childrenKey);
          for (let j = 0; j < flatDataArr.length; j++) {
            const item = flatDataArr[j];
            const isSame = isUnMatchedData(item)
              ? item.value === val
              : disabledCheck(item) || prediction(val, item);
            if (isSame) {
              flatDataArr.splice(j, 1);
              continue outer;
            }
          }
          values.push(val);
        }
      }
      const valueResult = props.separator ? values.join(props.separator) : values;
      props.onChange(valueResult as Value, data as DataItem, false);
    },
  );

  const check = usePersistFn((raw: DataItem) => {
    if (props.prediction) {
      for (let i = 0, count = valueArr.length; i < count; i++) {
        if (props.prediction(valueArr[i], raw)) return true;
      }
      return false;
    }
    return !!getValueMap().get(formatData(raw));
  });

  const getDataByValues = usePersistFn(
    (values: ValueItem[], info: { childrenKey?: string } = {}) => {
      const map = getDataMap(info.childrenKey);
      const result = [];
      if (props.keepCache && !context.valueDataCache) {
        context.valueDataCache = new Map();
      }
      if (!props.prediction) {
        if (!values || !values.length) return [];
        for (let i = 0; i < values.length; i++) {
          if (props.keepCache) {
            const item = context.valueDataCache.get(values[i]);
            if (item !== undefined) {
              result.push(item);
              continue;
            }
          }
          const item = map.get(values[i]);
          if (item) {
            if (props.keepCache) context.valueDataCache.set(values[i], item);
            result.push(item);
          } else {
            result.push({ IS_NOT_MATCHED_VALUE: true, value: values[i] });
          }
        }
      } else {
        // 获取map value 数组
        const raws = Array.from(map.values());
        outer: for (let i = 0; i < values.length; i++) {
          for (let j = 0; j < raws.length; j++) {
            const item = raws[j] as DataItem;
            if (props.prediction(values[i], item)) {
              result.push(item);
              raws.splice(j, 1);
              continue outer;
            }
          }
          result.push({ IS_NOT_MATCHED_VALUE: true, value: values[i] });
        }
      }

      return result;
    },
  );

  const getCheckedStatus = usePersistFn((childrenKey?: string) => {
    if (valueArr.length === 0) return false;
    const dataMap = getDataMap(childrenKey);
    const formatValues = Array.from(dataMap, ([_value, data]) => data);
    let checkedNum = 0;
    let validateNum = 0;
    for (let i = 0; i < formatValues.length; i++) {
      const data = formatValues[i];
      if (!disabledCheck(data)) {
        validateNum++;
        if (check(data)) checkedNum++;
      }
    }
    if (checkedNum === 0) return false;
    if (checkedNum === validateNum) return true;
    return 'indeterminate';
  });

  const func = useMemo(() => {
    return {
      add,
      remove,
      removeAll,
      check,
      format: formatData,
      getVaildData,
      getValueMap,
      getDataByValues,
      isUnMatchedData,
      disabledCheck,
      getCheckedStatus,
      data: props.data,
    };
  }, Object.values(props));

  return func;
};

export default useListSelectMultiple;
