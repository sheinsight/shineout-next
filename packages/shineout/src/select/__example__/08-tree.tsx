/**
 * cn - 树形数据
 *    -- 设置 `treeData` 属性，即可创建树形数据；效果同 `TreeSelect`组件。
 * en - Tree Data
 *    -- Set the `treeData` property to create tree data; the effect is the same as the `TreeSelect` component.
 */
import React from 'react';
import { Select, TYPE } from 'shineout';

type SelectProps = TYPE.Select.Props<DataItem, string>;

type DataItem = {
  id: string;
  title: string;
  children?: DataItem[];
};

export default () => {
  const treeData: SelectProps['treeData'] = [
    {
      id: '1',
      title: 'node 1',
      children: [
        {
          id: '1-1',
          title: 'node 1-1',
          children: [
            {
              id: '1-1-1',
              title: 'node 1-1-1',
              // 模拟嵌套深度为10层的树形数据，重复嵌套children
              children: [
                {
                  id: '1-1-1-1',
                  title: 'node 1-1-1-1',
                  children: [
                    {
                      id: '1-1-1-1-1',
                      title: 'node 1-1-1-1-1',
                      children: [
                        {
                          id: '1-1-1-1-1-1',
                          title: 'node 1-1-1-1-1-1',
                          children: [
                            {
                              id: '1-1-1-1-1-1-1',
                              title: 'node 1-1-1-1-1-1-1',
                              children: [
                                {
                                  id: '1-1-1-1-1-1-1-1',
                                  title: 'node 1-1-1-1-1-1-1-1',
                                  children: [
                                    {
                                      id: '1-1-1-1-1-1-1-1-1',
                                      title: 'node 1-1-1-1-1-1-1-1-1',
                                      children: [
                                        {
                                          id: '1-1-1-1-1-1-1-1-1-1',
                                          title: 'node 1-1-1-1-1-1-1-1-1-1',
                                          children: [
                                            {
                                              id: '1-1-1-1-1-1-1-1-1-1-1',
                                              title: 'node 1-1-1-1-1-1-1-1-1-1-1',
                                              children: [
                                                {
                                                  id: '1-1-1-1-1-1-1-1-1-1-1-1',
                                                  title: 'node 1-1-1-1-1-1-1-1-1-1-1-1',
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ]
            },
            { id: '1-1-2', title: 'node 1-1-2' },
          ],
        },
        { id: '1-2', title: 'node 1-2' },
      ],
    },
    {
      id: '2',
      title: 'node 2',
    },
    { id: '3', title: 'node 3', children: [{ id: '3-1', title: 'node 3-1' }] },
    { id: '4', title: 'node 4' },
  ];

  const prediction: SelectProps['prediction'] = (v, d) => v === d.id;

  const renderItem: SelectProps['renderItem'] = (d) => d.title;

  return (
    <div>
      <Select
        width={300}
        childrenKey='children'
        treeData={treeData}
        keygen='id'
        format='id'
        placeholder='Select Color'
        prediction={prediction}
        renderItem={renderItem}
        clearable
      />
    </div>
  );
};
