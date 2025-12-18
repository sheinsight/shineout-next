/**
 * cn - Result-Tag-Height
 *    -- 验证Result Tag高度
 * en - Result-Tag-Height
 *    -- Verify the height of Result Tag
 */
import React from 'react';
import { TreeSelect, Cascader, Select, Tag } from 'shineout';


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

  return (
    <>
    <h2>TreeSelect</h2>
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 24 }}>
      <TreeSelect
        size='small'
        width={300}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
        multiple
      ></TreeSelect>
      <TreeSelect
        width={300}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
        multiple
      ></TreeSelect>
      <TreeSelect
        size='large'
        width={300}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
        multiple
      ></TreeSelect>
    </div>

    <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 24 }}>
      <TreeSelect
        size='small'
        width={300}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        innerTitle='Please select content'
        multiple
      ></TreeSelect>
      <TreeSelect
        width={300}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        innerTitle='Please select content'
        multiple
      ></TreeSelect>
      <TreeSelect
        size='large'
        width={300}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        innerTitle='Please select content'
        multiple
      ></TreeSelect>
    </div>
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 24 }}>
      <Tag size="small" closable>Small</Tag>
      <Tag size="default" closable>Default</Tag>
      <Tag size="large" closable>Large</Tag>
    </div>

    <h2>Select</h2>
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 24 }}>
      <Select
        size='small'
        width={300}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
        multiple
      ></Select>
      <Select
        width={300}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
        multiple
      ></Select>
      <Select
        size='large'
        width={300}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
        multiple
      ></Select>
    </div>

    <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 24 }}>
      <Select
        size='small'
        width={300}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        innerTitle='Please select content'
        multiple
      ></Select>
      <Select
        width={300}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        innerTitle='Please select content'
        multiple
      ></Select>
      <Select
        size='large'
        width={300}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        innerTitle='Please select content'
        multiple
      ></Select>
    </div>

    <h2>Cascader</h2>
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 24 }}>
      <Cascader
        size='small'
        width={300}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
        singleRemove
      ></Cascader>
      <Cascader
        width={300}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
        singleRemove
      ></Cascader>
      <Cascader
        size='large'
        width={300}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
        singleRemove
      ></Cascader>
    </div>

    <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 24 }}>
      <Cascader
        size='small'
        width={300}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        innerTitle='Please select content'
        singleRemove
      ></Cascader>
      <Cascader
        width={300}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        innerTitle='Please select content'
        singleRemove
      ></Cascader>
      <Cascader
        size='large'
        width={300}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node.title}`}
        data={data}
        innerTitle='Please select content'
        singleRemove
      ></Cascader>
    </div>
    </>
  );
};
