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

for (let i = 0; i < 20; i++) {
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

  const renderItem = (item) => {
    return <div>{item.name}</div>;
  };

  return (
    <div>
      <button type='button' onClick={handleClick}>
        + select
      </button>
      {/* <div style={{width:200,height:200,overflow:'auto',background:'#ddd'}} >
        <div style={{width:200,height:300}}>
          
        </div>
      </div> */}
      <Transfer
        data={data}
        value={value}
        // selectedKeys={selectedKeys}
        keygen='id'
        jssStyle={jssStyle}
        onChange={handleChange}
        // onSelectChange={handleSelectChange}
        renderItem={renderItem}
        // renderItem='name'
      ></Transfer>
    </div>
  );
};
