/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Tree } from '@sheinx/base';
import { useTreeStyle, useCheckboxStyle } from '@sheinx/shineout-style';

export default () => {
  const treeStyle = useTreeStyle();
  const checkboxStyle = useCheckboxStyle();

  const data = [
    {
      id: '1',
      name: 'node 1',
      children: [
        {
          id: '1-1',
          name: 'node 1-1',
          children: [
            {
              id: '1-1-1',
              name: 'node 1-1-1',
              children: [
                { id: '1-1-1-1', name: 'node 1-1-1-1' },
                { id: '1-1-1-2', name: 'node 1-1-1-2' },
              ],
            },
            { id: '1-1-2', name: 'node 1-1-2' },
          ],
        },
        { id: '1-2', name: 'node 1-2' },
      ],
    },
    {
      id: '2',
      name: 'node 2',
      children: [
        { id: '2-1', name: 'node 2-1' },
        { id: '2-2', name: 'node 2-2' },
      ],
    },
    { id: '3', name: 'node 3', children: [{ id: '3-1', name: 'node 3-1' }] },
    { id: '4', name: 'node 4', children: [{ id: '4-1', name: 'node 4-1' }] },
    { id: '5', name: 'node 5', children: [{ id: '5-1', name: 'node 5-1' }] },
  ];

  // const handleChange = () => {};

  return (
    <div>
      <Tree
        jssStyle={{ tree: treeStyle, checkbox: checkboxStyle }}
        parentClickExpand
        // onChange={handleChange}
        data={data}
        // line={false}
        renderItem='name'
      ></Tree>
    </div>
  );
};
