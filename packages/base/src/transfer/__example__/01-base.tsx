/**
 * cn - 基本用法
 *    --基础 Tag 用法
 * en - Base
 *    --Base Tag
 */
import { useState } from 'react';
import { Transfer } from '@sheinx/base';
import {
  useTransferStyle,
  useButtonStyle,
  useCheckboxStyle,
  useEmptyStyle,
  useInputStyle,
  useSpinStyle,
} from '@sheinx/shineout-style';

let key = 0;

const originData = [];

for (let i = 0; i < 30; i++) {
  originData.push({
    id: `id-${i}`,
    name: `name-${i}`,
  });
}

export default () => {
  const jssStyle = {
    transfer: useTransferStyle,
    button: useButtonStyle,
    checkbox: useCheckboxStyle,
    empty: useEmptyStyle,
    input: useInputStyle,
    spin: useSpinStyle,
  };

  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>(['id-0', 'id-3', 'id-4']);
  const [value, setValue] = useState(['id-0']);
  const [data] = useState(originData);

  const handleClick = () => {
    const next = [...selectedKeys, key++];
    setSelectedKeys(next);
  };

  const handleChange = (v) => {
    console.log(v);
    setValue(v);
  };

  const handleSelectChange = (source, target) => {
    const value = [...source, ...target];
    setSelectedKeys(value);
  };

  // const handleFilter = (t, d) => {
  //   return d.name.indexOf(t) > -1;
  // };

  const renderItem = (item) => {
    return <div>{item.name}</div>;
  };

  // const renderFooter = () => {
  //   return <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>123</div>;
  // };

  return (
    <div>
      <button type='button' onClick={handleClick}>
        + select
      </button>
      <Transfer
        simple
        // size='large'
        data={data}
        disabled={(d) => d.id === 'id-0' || d.id === 'id-1'}
        keygen='id'
        format='id'
        jssStyle={jssStyle}
        value={value}
        selectedKeys={selectedKeys}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        renderItem={renderItem}
        titles={['Source', 'Target']}
        operations={['to right', 'to left']}
        // onFilter={handleFilter}
        // prediction={(v, d) => v === d.id}
        // format='name'
        // footers={[renderFooter(), renderFooter()]}
      ></Transfer>
    </div>
  );
};
