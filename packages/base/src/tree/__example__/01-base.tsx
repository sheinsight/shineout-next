/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React, { useState } from 'react';
import { Tree } from '@sheinx/base';
import { produce } from 'immer';
import { useTreeStyle, useCheckboxStyle, useSpinStyle } from '@sheinx/shineout-style';

export default () => {
  const treeStyle = useTreeStyle();
  const checkboxStyle = useCheckboxStyle();
  const spinStyle = useSpinStyle();

  // const data1 = [
  //   {
  //     id: '1',
  //     name: 'node 1',
  //     children: [
  //       {
  //         id: '1-1',
  //         name: 'node 1-1',
  //         children: [
  //           {
  //             id: '1-1-1',
  //             name: 'node 1-1-1',
  //             children: [
  //               { id: '1-1-1-1', name: 'node 1-1-1-1' },
  //               { id: '1-1-1-2', name: 'node 1-1-1-2' },
  //             ],
  //           },
  //           { id: '1-1-2', name: 'node 1-1-2' },
  //         ],
  //       },
  //       { id: '1-2', name: 'node 1-2' },
  //     ],
  //   },
  //   {
  //     id: '2',
  //     name: 'node 2',
  //     children: [
  //       { id: '2-1', name: 'node 2-1' },
  //       { id: '2-2', name: 'node 2-2' },
  //     ],
  //   },
  //   { id: '3', name: 'node 3', children: [{ id: '3-1', name: 'node 3-1' }] },
  //   { id: '4', name: 'node 4', children: [{ id: '4-1', name: 'node 4-1' }] },
  //   { id: '5', name: 'node 5', children: [{ id: '5-1', name: 'node 5-1' }] },
  //   { id: '6', name: 'node 6', children: undefined },
  // ];
  const initData = ['0', '1', '2', '3', '4'].map((i) => ({ id: i }));
  const createRange = () => Array.from({ length: Math.round(Math.random() * 4) }, (_, i) => i);

  const [data, setData] = useState(initData);
  const [, setValue] = useState([]);
  const handleChange = (v) => {
    setValue(v);
  };

  const handleDrop = (d) => {
    setData(d);
  };

  const handleLoader = (key: any) => {
    const nextData = produce(data, (draft) => {
      const path: string[] = key.split(',');
      let target: any = draft;
      path.forEach((pid, i) => {
        target = target.find((d) => d.id === pid);
        if (i < path.length - 1) target = target.children;
      });
      target.children = [...createRange().map((i) => ({ id: `${target.id}-${i}` }))];
    });
    setTimeout(() => setData(nextData), 1000);
  };

  return (
    <div>
      <Tree
        line={false}
        jssStyle={{ tree: treeStyle, checkbox: checkboxStyle, spin: spinStyle }}
        data={data}
        keygen={(node, parentKey) => `${parentKey},${node.id}`.replace(/^,/, '')}
        loader={handleLoader}
        onDrop={handleDrop}
        onChange={handleChange}
        renderItem={(node) => `node ${node.id}`}
      />
    </div>
  );
};
