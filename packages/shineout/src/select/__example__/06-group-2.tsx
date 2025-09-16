/**
 * cn -
 *    -- `groupBy`分组函数也可返回React组件
 * en -
 *    -- `groupBy` can return a React component
 */
import React, { useState } from 'react';
import { Checkbox, Select, TYPE } from 'shineout';

type SelectProps = TYPE.Select.Props<DataItem, string>;
interface DataItem {
  value: string;
  group: string;
}

export default () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [allChecked, setAllChecked] = useState({
    city: false,
    country: false,
  });
  const data: DataItem[] = [
    { value: 'Mars', group: '3' },
    { value: 'China', group: '2' },
    { value: 'Beijing', group: '1' },
    { value: 'Shanghai', group: '1' },
  ];

  const handleAllChecked = (group: string, value: boolean) => {
    setAllChecked({ ...allChecked, [group]: value });
    if (group === 'city') {
      const cityData = data.filter(d => d.group === '1');
      setSelected(prev => {
        let newSelected = [...prev];
        if (value) {
          newSelected.push(...cityData.map(d => d.value));
        } else {
          newSelected = newSelected.filter(d => !cityData.some(c => c.value === d));
        }
        return newSelected;
      });
    } else if (group === 'country') {
      const countryData = data.filter(d => d.group === '2');
      setSelected(prev => {
        let newSelected = [...prev];
        if (value) {
          newSelected.push(...countryData.map(d => d.value));
        } else {
          newSelected = newSelected.filter(d => !countryData.some(c => c.value === d));
        }
        return newSelected;
      });
    }
  };

  const groupBy: SelectProps['groupBy'] = (d) => {
    if (d.group === '1') {
      return <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        City
        <Checkbox value={allChecked.city} onChange={(v) => handleAllChecked('city', !!v)} style={{ marginRight: 0 }} />
      </div>
    }
    if (d.group === '2') {
      return <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Country
        <Checkbox value={allChecked.country} onChange={(v) => handleAllChecked('country', !!v)} style={{ marginRight: 0 }} />
      </div>
    }
    return 'Other';
  };

  return (
    <Select
      width={300}
      data={data}
      placeholder='Select a city'
      keygen='value'
      format='value'
      prediction={(v, d) => v === d.value}
      renderItem='value'
      style={{ width: 240 }}
      groupBy={groupBy}
      clearable
      multiple
      value={selected}
      onChange={(v) => setSelected(v)}
      compressed
    />
  );
};
