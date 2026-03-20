/**
 * cn - virtual-expand-all
 *    -- 设置 `defaultExpandAll` 属性可以在虚拟滚动模式下默认展开所有节点
 * en - Virtual Expand All
 *    -- Set the `defaultExpandAll` property to expand all nodes by default in virtual scroll mode
 */
import React, { useState, useEffect } from 'react';
import { TreeSelect, Form, Checkbox, TYPE } from 'shineout';
import { Tree } from "shineout"

const demo = [
      {
        "name": "产品概述",
        "id": 398,
        "content": null,
        "sortOrder": 1,
        "sectionType": 1,
        "children": [
          {
              "name": "产品概述-1",
              "id": 3981,
              "content": null,
              "sortOrder": 1,
              "sectionType": 1,
              "children": []
          }
        ]
    },
    {
        "name": "核心功能流程",
        "id": 400,
        "content": null,
        "sortOrder": 3,
        "sectionType": 1,
        "children": [
          {
              "name": "核心功能流程-1",
              "id": 4001,
              "content": null,
              "sortOrder": 1,
              "sectionType": 1,
              "children": []
          }
        ]
    },
    {
        "name": "数据模型设计",
        "id": 404,
        "content": null,
        "sortOrder": 7,
        "sectionType": 1,
        "children": [
          {
              "name": "数据模型设计-1",
              "id": 4041,
              "content": null,
              "sortOrder": 1,
              "sectionType": 1,
              "children": []
          }
        ]
    }
]

const App2 = () => {

  const handleDrag = () => {};
  const [treeData, setTreeData] = useState([]);

  useEffect(()=>{
    setTimeout(() => {
      setTreeData(demo)
    }, 0)
  }, [])

  return (
    <div>
      <Tree
        dragSibling
        defaultExpandAll
        line={false}
        data={treeData}
        keygen="id"
        renderItem="name"
        onDrop={handleDrag}
      />
    </div>
  );
};



type TreeSelectProps = TYPE.TreeSelect.Props<DataItem, string>;

interface DataItem {
  id: string;
  title: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    id: '1',
    title: '1',
    children: [
      {
        id: '1-1',
        title: '1-1',
        children: [
          { id: '1-1-1', title: '1-1-1' },
          { id: '1-1-2', title: '1-1-2' },
        ],
      },
      { id: '1-2', title: '1-2' },
    ],
  },
  {
    id: '2',
    title: '2',
    children: [
      { id: '2-1', title: '2-1' },
      { id: '2-2', title: '2-2' },
    ],
  },
  { id: '3', title: '3', children: [{ id: '3-1', title: '3-1' }] },
];

export default () => {
  const [value, setValue] = useState<TreeSelectProps['value']>(['1-1-2','2-1'] as any);
  const [config, setConfig] = useState<{ actionOnClick: TreeSelectProps['actionOnClick'] }>({
      actionOnClick: ['check'],
    });

  const handleChange: TreeSelectProps['onChange'] = (v) => {
    setValue(v);
  };

  return (
    <>
      <Form value={config} onChange={setConfig}>
        <Form.Item label='配置点击行为:' labelWidth='7em' labelAlign='left'>
          <Checkbox.Group name='actionOnClick' keygen data={['check', 'expand']} />
        </Form.Item>
      </Form>
      <TreeSelect
        virtual
        defaultExpandAll
        keygen='id'
        multiple
        value={value}
        onChange={handleChange}
        width={300}
        data={data}
        compressed
        renderItem={(node) => `node ${node.title}`}
        clearable
        actionOnClick={config.actionOnClick}
        placeholder='Please select content'
      />

      <App2 />
    </>
  );
};
