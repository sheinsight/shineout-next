import { useEffect, useState } from 'react';
import { UseSelectGroupProps } from './use-select-group.type';
import { getUidStr } from '../../utils';

const UseSelectGroup = <DataItem>(props: UseSelectGroupProps<DataItem>) => {
  const { data: dataProp, groupBy } = props;
  const [data, setData] = useState<DataItem[]>([]);
  const groupKey = getUidStr();

  const initGroupData = () => {
    if (typeof groupBy !== 'function') {
      setData(dataProp);
      return;
    }

    const groupData: { [group: string]: DataItem[] } = {};

    dataProp.forEach((item, index) => {
      const group = groupBy(item, index, data) as keyof typeof groupData;
      if (!groupData[group])
        groupData[group || ''] = (group ? [{ [groupKey]: group }] : []) as DataItem[];
    });
    const newData = Object.keys(groupData).reduce(
      (p, v) => (v ? p.concat(groupData[v] as any) : groupData[v].concat(p)),
      [],
    );
    console.log(newData);
  };

  useEffect(() => {
    initGroupData();
  }, [data]);

  return {
    data,
  };
};

export default UseSelectGroup;
