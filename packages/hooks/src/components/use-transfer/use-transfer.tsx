import { useMemo, useState } from 'react';
import { getKey } from '../../utils';
import { KeygenResult } from '../../common/type';
import { useInputAble } from '../../common/use-input-able';
import { BaseTransferProps, TransferInfo, TransferListType } from './use-transfer.type';
// import useFormat from './use-format';

const useTransfer = <DataItem, Value>(props: BaseTransferProps<DataItem, Value>) => {
  const {
    data,
    keygen,
    simple,
    // format: formatProp,
    disabled,
    selectedKeys: selectValue,
    defaultSelectedKeys: defaultSelectValue,
    value: valueProp,
    defaultValue,
    valueControl,
    selectControl,
    beforeChange,
    onFilter,
    onChange: onChangeProp,
    onSearch,
    onSelectChange: onSelectChangeProp,
  } = props;

  const [filterSourceText, setFilterSourceText] = useState('');
  const [filterTargetText, setFilterTargetText] = useState('');

  const { value: selectedKeys, onChange: onSelectChange } = useInputAble({
    value: selectValue,
    defaultValue: defaultSelectValue,
    control: selectControl,
    beforeChange: undefined,
    onChange: onSelectChangeProp,
  });

  const { value, onChange } = useInputAble({
    value: valueProp,
    defaultValue: defaultValue,
    control: valueControl,
    beforeChange: beforeChange,
    onChange: onChangeProp,
  });

  // const format = useFormat(formatProp);

  // const getFormat = () => {};

  // const getPrediction = (value: unknown, data: DataItem) => {
  //   return value === format(data);
  // };

  const getDisabled = () => {
    if (typeof disabled === 'boolean') return () => !!disabled;
    if (typeof disabled === 'function') return disabled;

    return () => false;
  };

  const [source, target, valueMap, dataMap, selectMap] = useMemo(() => {
    const valueMap = new Map();
    const selectMap = new Map();
    const dataMap = new Map();
    const disabled = getDisabled();

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
      const isSource = !valueMap.get(key);
      const filterText = isSource ? filterSourceText : filterTargetText;
      const info = isSource ? source : target;

      if (filterText && onFilter) {
        const validData = onFilter(filterText, item, isSource);
        if (validData) {
          info.data.push(item);
          info[disabled(item) ? 'disabledKeys' : 'validKeys'].push(key);
        }
      } else {
        info.data.push(item);
        info[disabled(item) ? 'disabledKeys' : 'validKeys'].push(key);
      }

      const selected = selectMap.get(key);
      if (selected) info.selectedKeys.set(key, true);
    });

    return [source, target, valueMap, dataMap, selectMap];
  }, [data, disabled, selectedKeys, value, filterSourceText, filterTargetText]);

  const handleChange = (to: TransferListType, keys: KeygenResult[]) => {
    const currentData: DataItem[] = [];
    const isTarget = to === 'target';
    const operate = isTarget ? 'set' : 'delete';

    keys.forEach((value, key) => {
      currentData.push(dataMap.get(key));
      valueMap[operate](key, value);
      selectMap.delete(key);
    });
    const newTargetKeys: KeygenResult[] = Array.from(valueMap.keys());
    onChange?.(newTargetKeys, currentData, isTarget);
    onSelectChange?.([]);
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
    onSelectChange?.(select);
    if (simple) {
      onChange?.(select);
    }
  };

  const handleSelectAll = (keys: KeygenResult[]) => {
    if (simple) {
      const validKeys = target.validKeys.concat(source.validKeys);
      onChange?.(validKeys, [], true);
      onSelectChange?.(validKeys);
      return;
    }
    onSelectChange?.(keys);
  };

  const handleRemoveAll = () => {
    onSelectChange?.([]);
    onChange?.([], [], false);
  };

  const handleFilter = (text: string, type: TransferListType) => {
    const isSource = type === 'source';
    const setFilterText = isSource ? setFilterSourceText : setFilterTargetText;
    if (onSearch) onSearch(text, isSource);
    setFilterText(text);
  };

  return {
    source,
    target,
    valueMap,
    filterSourceText,
    filterTargetText,
    onChange: handleChange,
    onFilter: handleFilter,
    onSelect: handleSelectChange,
    onSelectAll: handleSelectAll,
    onRemoveAll: handleRemoveAll,
  };
};

export default useTransfer;
