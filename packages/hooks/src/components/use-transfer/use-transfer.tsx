import { useMemo } from 'react';
import { getKey } from '../../utils';
import { KeygenResult } from '../../common/type';
import { BaseTransferProps, TransferInfo, TransferListType } from './use-transfer.type';
// import useFormat from './use-format';
import useDefaultValue from '../../common/use-default-value';

const useTransfer = <DataItem, Value>(props: BaseTransferProps<DataItem, Value>) => {
  const {
    data,
    keygen,
    // format: formatProp,
    disabled,
    selectedKeys: selectedKeysProp,
    defaultSelectedKeys,
    value: valueProp,
    defaultValue,
    onChange,
    onSelectChange,
  } = props;

  const [selectedKeys, setSelectedKeys] = useDefaultValue([], {
    value: selectedKeysProp,
    defaultValue: defaultSelectedKeys || [],
  });

  const [value, setValue, valueState] = useDefaultValue([], {
    value: valueProp,
    defaultValue: defaultValue || [],
  });

  // const format = useFormat(formatProp);

  // const getFormat = () => {};

  // const getPrediction = (value: unknown, data: DataItem) => {
  //   return value === format(data);
  // };

  const [source, target, valueMap, dataMap, selectMap] = useMemo(() => {
    const valueMap = new Map();
    const selectMap = new Map();
    const dataMap = new Map();

    if (value !== undefined) {
      for (let i = 0; i < value.length; i++) valueMap.set(value[i], true);
    }

    if (selectedKeys !== undefined) {
      for (let i = 0; i < selectedKeys.length; i++) selectMap.set(selectedKeys[i], true);
    }

    // 初始化 source 和 target
    const source: TransferInfo<DataItem> = {
      data: [],
      validKeys: [],
      disabledKeys: [],
      selectedKeys: new Map(),
    };

    const target: TransferInfo<DataItem> = {
      data: [],
      validKeys: [],
      disabledKeys: [],
      selectedKeys: new Map(),
    };

    data.forEach((item) => {
      const key = getKey(keygen, item) as KeygenResult;
      dataMap.set(key, item);
      const info = valueMap.get(key) ? target : source;
      info.data.push(item);

      const selected = selectMap.get(key);
      if (selected) info.selectedKeys.set(key, true);
    });

    return [source, target, valueMap, dataMap, selectMap];
  }, [data, disabled, selectedKeys, value, valueState]);

  const handleChange = (to: TransferListType, keys: Map<KeygenResult, boolean>) => {
    const currentData: DataItem[] = [];

    const operate = to === 'source' ? 'delete' : 'set';

    keys.forEach((value, key) => {
      currentData.push(dataMap.get(key));
      valueMap[operate](key, value);
      selectMap.delete(key);
    });

    const newTargetKeys: KeygenResult[] = Array.from(valueMap.keys());
    const newSelectedKeys: KeygenResult[] = Array.from(selectMap.keys());
    setSelectedKeys(newSelectedKeys);
    setValue(newTargetKeys);
    onChange?.(newTargetKeys as Value, currentData, to === 'source');
  };

  const handleSelectChange = (key: KeygenResult) => {
    if (selectMap.get(key)) {
      selectMap.delete(key);
    } else {
      selectMap.set(key, true);
    }

    const select: KeygenResult[] = [];
    const targetSelect: KeygenResult[] = [];
    const sourceSelect: KeygenResult[] = [];

    selectMap.forEach((value, key) => {
      select.push(key);
      if (valueMap.get(key)) {
        targetSelect.push(key);
      } else {
        sourceSelect.push(key);
      }
    });
    setSelectedKeys(select);
    onSelectChange?.(targetSelect, sourceSelect, select);
  };

  return {
    source,
    target,
    valueMap,
    onSelect: handleSelectChange,
    onChange: handleChange,
  };
};

export default useTransfer;
