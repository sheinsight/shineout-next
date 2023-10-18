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
  useVirtualScrollStyle,
} from '@sheinx/shineout-style';

let key = 0;

const originData = [];

for (let i = 0; i < 100000; i++) {
  originData.push({
    id: i,
    name: `name-${i}`,
  });
}

export default () => {
  const jssStyle = {
    transfer: useTransferStyle,
    button: useButtonStyle,
    checkbox: useCheckboxStyle,
    empty: useEmptyStyle,
    virtualScroll: useVirtualScrollStyle,
  };

  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([0]);
  const [value, setValue] = useState([]);
  const [data] = useState(originData);

  const handleClick = () => {
    const next = [...selectedKeys, key++];
    setSelectedKeys(next);
  };

  const handleChange = (v) => {
    setValue(v);
  };
  // const handleSelectChange = (target, source, select) => {
  //   setSelectedKeys(select);
  // };

  return (
    <div>
      <button type='button' onClick={handleClick}>
        + select
      </button>
      <Transfer
        data={data}
        value={value}
        // selectedKeys={selectedKeys}
        keygen='id'
        jssStyle={jssStyle}
        onChange={handleChange}
        // onSelectChange={handleSelectChange}
        renderItem='name'
      ></Transfer>
    </div>
  );
};
