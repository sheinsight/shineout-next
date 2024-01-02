import { useEffect, useState, useRef } from 'react';
import { UseSelectGroupProps } from './use-select-group.type';
import { getUidStr } from '../../utils';

const UseSelectGroup = <DataItem>(props: UseSelectGroupProps<DataItem>) => {
  const { data: dataProp = [], groupBy } = props;
  const [data, setData] = useState<DataItem[]>([]);
  const groupKey = useRef('');

  const initGroupData = () => {
    if (typeof groupBy !== 'function') {
      setData(dataProp);
      return;
    }

    const groupData: { [group: string]: DataItem[] } = {};

    dataProp.forEach((item, index) => {
      const group = groupBy(item, index, dataProp) as keyof typeof groupData;
      if (!groupData[group])
        groupData[group || ''] = (group ? [{ [groupKey.current]: group }] : []) as DataItem[];
      groupData[group].push(item);
    });
    const newData = Object.keys(groupData).reduce(
      (p: DataItem[], v) => (v ? p.concat(groupData[v]) : groupData[v].concat(p)),
      [],
    );
    setData(newData);
  };

  useEffect(() => {
    if (!groupBy) return;
    groupKey.current = getUidStr();
    initGroupData();
  }, [dataProp]);

  return {
    data,
    groupKey: groupKey.current,
  };
};

export default UseSelectGroup;
