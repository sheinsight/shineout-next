import { useMemo, useState } from 'react';
import { getKey } from '../../utils';
import { KeygenResult } from '../../common/type';
import { useInputAble } from '../../common/use-input-able';
import { useListSelectMultiple } from '../../common/use-list-select';
import { BaseTransferProps, TransferListType } from './use-transfer.type';

const useTransfer = <DataItem, Value extends KeygenResult[]>(
  props: BaseTransferProps<DataItem, Value>,
) => {
  const {
    data,
    keygen,
    simple,
    format,
    disabled,
    prediction,
    selectedKeys: selectValue,
    defaultSelectedKeys: defaultSelectValue,
    value: valueProp,
    defaultValue,
    valueControl,
    selectControl,
    beforeChange,
    onChange: onChangeProp,
    onSearch,
    onSelectChange: onSelectChangeProp,
  } = props;

  const [filterSourceText, setFilterSourceText] = useState('');
  const [filterTargetText, setFilterTargetText] = useState('');

  const handleSelectedChange = (
    _value: KeygenResult[],
    source: KeygenResult[],
    target: KeygenResult[],
  ) => {
    onSelectChangeProp?.(source, target);
  };

  const { value: selectedKeys, onChange: onSelectChange } = useInputAble({
    value: selectValue,
    defaultValue: defaultSelectValue,
    control: selectControl,
    beforeChange: undefined,
    onChange: handleSelectedChange,
  });

  const { value, onChange } = useInputAble({
    value: valueProp,
    defaultValue: defaultValue,
    control: valueControl,
    beforeChange: beforeChange,
    onChange: onChangeProp,
  });

  const datum = useListSelectMultiple({
    data,
    format,
    value: value,
    prediction,
    onChange: onChange,
  });

  const { source, target, sourceSelectedKeys, targetSelectedKeys } = useMemo(() => {
    const source: DataItem[] = [];
    const target: DataItem[] = [];
    const selectMap = new Map<KeygenResult, boolean>();
    const sourceSelectedKeys: KeygenResult[] = [];
    const targetSelectedKeys: KeygenResult[] = [];

    selectedKeys?.forEach((key) => {
      selectMap.set(key, true);
    });

    data.forEach((item) => {
      const key = getKey(keygen, item);
      const isChecked = datum.check(item);
      const list = isChecked ? target : source;
      if (!simple) {
        const selected = isChecked ? targetSelectedKeys : sourceSelectedKeys;
        if (selectMap?.get(key)) selected.push(key);
      }

      list.push(item);
    });
    return { target, source, sourceSelectedKeys, targetSelectedKeys };
  }, [data, value, selectedKeys]);

  const getKeygen = () => {
    if (typeof keygen === 'boolean') return (item: DataItem) => item as KeygenResult;
    return keygen;
  };

  const handleSourceSelectedChange = (value: KeygenResult[]) => {
    const next = [...value, ...targetSelectedKeys];
    onSelectChange?.(next, value, targetSelectedKeys);
  };

  const handleTargetSelectedChange = (value: KeygenResult[]) => {
    const next = [...sourceSelectedKeys, ...value];
    onSelectChange?.(next, sourceSelectedKeys, value);
  };

  const sourceDatum = useListSelectMultiple({
    value: sourceSelectedKeys,
    data: source,
    disabled,
    format: getKeygen(),
    onChange: handleSourceSelectedChange,
  });

  const targetDatum = useListSelectMultiple({
    value: targetSelectedKeys,
    data: target,
    disabled,
    format: getKeygen(),
    onChange: handleTargetSelectedChange,
  });

  const handleFilter = (text: string, listType: TransferListType) => {
    const isSource = listType === 'source';
    const setFilterText = isSource ? setFilterSourceText : setFilterTargetText;
    if (onSearch) onSearch(text, isSource);
    setFilterText(text);
  };

  return {
    value,
    source,
    target,
    datum,
    sourceDatum,
    targetDatum,
    selectedKeys,
    filterSourceText,
    filterTargetText,
    sourceSelectedKeys,
    targetSelectedKeys,
    onSelectChange,
    onFilter: handleFilter,
  };
};

export default useTransfer;
