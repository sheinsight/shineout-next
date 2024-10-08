/**
 * cn - 选择行
 *    -- 设置 onChange 属性，会自动添加选择行
 * en - Select
 *    -- Set the onChange property will automatically add a row with checkbox
 */
import React, { useState, useEffect } from 'react';
import { List, Checkbox, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface ListItem {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}
type ListProps = TYPE.List.Props<ListItem, number[]>;
type ListOnChange = ListProps['onChange'];
type ListRenderItem = ListProps['renderItem'];

type CheckboxProps = TYPE.Checkbox.Props<any>;
type CheckboxOnChange = CheckboxProps['onChange'];

const style: React.CSSProperties = {
  padding: '12px 16px',
  display: 'flex',
  fontSize: 14,
  lineHeight: '22px',
  alignItems: 'center',
  justifyContent: 'flex-start',
  border: '1px solid transparent',
};

const App: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ListItem[]>([]);
  const [value, setValue] = useState<number[]>([1]);

  const fetchData = (c: number) => {
    setLoading(true);
    user.fetch
      .get('List', { current, pageSize: 10, sorter: {}, username: '' })
      .then((_data: { data: ListItem[] }) => {
        setData([...data, ..._data.data]);
        setCurrent(c);
        setLoading(false);
      });
  };

  const getChecked = () => {
    if (!value || value.length <= 0) return false;
    if (value.length === data.length) return true;
    return 'indeterminate';
  };

  const onChange: ListOnChange = (selectedValue, selectedDataItem, checked) => {
    console.log('selectValue, selectedDataItem, checked: ', selectedValue, selectedDataItem, checked);
    setValue(selectedValue);
  };

  const checkboxOnChange: CheckboxOnChange = (flag: boolean) => {
    if (flag) {
      setValue(data.map((v: ListItem) => v.id));
      return;
    }
    setValue([]);
  };

  const renderItem: ListRenderItem = (rowData) => (
    <div>{`From ${rowData.country}. Name: ${rowData.firstName}-${rowData.lastName}`}</div>
  );

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <div>
      <div style={style}>
        <Checkbox checked={getChecked()} onChange={checkboxOnChange} />
        <div>{`Selected ${value.length}`}</div>
      </div>
      <List
        format='id'
        keygen='id'
        bordered
        data={data}
        value={value}
        loading={loading}
        onChange={onChange}
        renderItem={renderItem}
      />
    </div>
  );
};

export default App;
