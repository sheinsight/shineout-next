/**
 * cn - 动态Tabs数量
 *    -- 内部测试
 * en - Dynamic Tabs
 *    -- Internal test
 */
import { useEffect, useState } from 'react';
import { Tabs } from 'shineout';

const AA = () => {
  const [list, setList] = useState([1, 2, 3]);

  useEffect(() => {
    setTimeout(() => {
      setList([1, 2]);
    }, 3000);
  }, []);

  return (
    <Tabs>
      {list.map((el) => (
        <Tabs.Panel tab={el} key={el} />
      ))}
    </Tabs>
  );
};

export default AA;

