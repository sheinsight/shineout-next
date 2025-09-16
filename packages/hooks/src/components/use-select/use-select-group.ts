import React, { useEffect, useState, useRef } from 'react';
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
      const groupResult = groupBy(item, index, dataProp);

      // 为React组件生成唯一键
      let groupKeyStr: string;
      if (React.isValidElement(groupResult)) {
        // 基于组件的类型和props生成唯一键
        const componentName = typeof groupResult.type === 'string'
          ? groupResult.type
          : groupResult.type?.name || 'Component';
        const propsHash = JSON.stringify(groupResult.props || {});
        groupKeyStr = `${componentName}_${propsHash}`;
      } else {
        groupKeyStr = String(groupResult || '');
      }

      if (!groupData[groupKeyStr]) {
        groupData[groupKeyStr] = (groupResult ? [{ [groupKey.current]: groupResult }] : []) as DataItem[];
      }
      groupData[groupKeyStr].push(item);
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
