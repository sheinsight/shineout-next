/**
 * cn - 勾选受控
 *    -- 勾选项支持受控
 *    -- 注意，勾选项返回值为`keygen`所组成的数组
 * en - Selected control
 *    -- The selected item supports controlled
 *    -- Note that the return value of the selected item is an array of `keygen`
 */
import { useState } from 'react';
import { Transfer } from 'shineout';

const data: { id: string; name: string }[] = [];

for (let i = 0; i < 10; i++) {
  data.push({
    id: `id-${i}`,
    name: `name-${i + 1}`,
  });
}

export default () => {
  const [selectedKeys, setSelectedKeys] = useState([]);

  const handleSelectedChange = (source, target) => {
    setSelectedKeys([...source, ...target]);
  };

  return (
    <div>
      <Transfer
        data={data}
        selectedKeys={selectedKeys}
        onSelectChange={handleSelectedChange}
        keygen='id'
        listHeight={232}
        renderItem='name'
      ></Transfer>
    </div>
  );
};
