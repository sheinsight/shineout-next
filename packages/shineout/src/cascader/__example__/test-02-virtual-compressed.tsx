/**
 * cn - virtual-compressed
 *    -- 设置 virtual 属性，开启虚拟滚动
 * en - Big data performance
 *   -- Set the virtual property to enable virtual scrolling
 */
import React from 'react';
import { Cascader } from 'shineout';
import bigBizData from './big-biz-data';


// const bigData = generateBigTreeData(2, 50);

const App: React.FC = () => (
  <Cascader
    keygen='category_id'
    data={bigBizData}
    virtual
    expandTrigger='hover'
    mode={0}
    compressed
    clearable
    // compressedBound={200}
    // compressed="hide-popover"
    // renderResult={() => null}
    renderItem={(n) => {
      // if(n.category_name === '加大码'){

      //   return 'long long text 加大码long long text long long text 加大码long long textlong long text 加大码long long textlong long text 加大码long long text long long text 加大码long long textlong long text 加大码long long textlong long text 加大码long long text long long text 加大码long long textlong long text 加大码long long text'
      // }

        return `${n.category_name}`
    }}
    onFilter={(text) => (d) => d.category_name.indexOf(text) >= 0}
  />
);

export default App;