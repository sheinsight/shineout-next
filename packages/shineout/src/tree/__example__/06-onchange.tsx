/**
 * cn - 可选择树
 *    -- 配置 `onChange` 以及 `value` 属性开启数据选择功能
 *    -- 配置 `filteredData` 用于需过滤数据但勾选基于全量data的场景
 *    -- 配置 `mode` 属性返回不同结构的数据：
 *    -- 模式为 0 时，返回完全选中的节点，包含父节点
 *    -- 模式为 1 时，返回选中、半选中的节点
 *    -- 模式为 2 时，只返回叶子节点
 *    -- 模式为 3 时，只返回完全选中的父节点
 *    -- 模式为 4 时，所选即所得
 * en - Selectable tree
 *    -- Configure the `onChange` and `value` properties to enable data selection
 *    -- Configure the `mode` property to return different structures of data:
 *    -- When the mode is 0, it returns the fully selected node, including the parent node
 *    -- When the mode is 1, it returns the selected and half-selected nodes
 *    -- When the mode is 2, it only returns leaf nodes
 *    -- When the mode is 3, it only returns fully selected parent nodes
 *    -- When the mode is 4, it returns what you see is what you get
 */

import { useMemo, useState } from 'react';
import { Tree, Radio, TYPE, Input } from 'shineout';
import { createNestedArray } from './utils';

type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}


export const getFilterTree = <T, K extends (...args: any) => any>(
  treeNodes: T[] | undefined,
  filterFunc: (data: T) => boolean,
  filterExpandKeys: any | undefined,
  keyFunc: K,
  childrenKey = 'children' as keyof T,
) => {
  const mapFilteredNodeToData = (node: T): T | null => {
    if (!node) return null;
    let match = false;
    if (filterFunc(node)) {
      match = true;
    }
    //@ts-ignore
    const children = ((node[childrenKey] || []) as T[])
      .map(mapFilteredNodeToData)
      //@ts-ignore
      .filter((n: T) => n);
    if (children.length || match) {
      const key = keyFunc(node);
      if (filterExpandKeys && children.length > 0) filterExpandKeys.push(key);
      if (!node[childrenKey]) return node;
      return { ...node, [childrenKey]: children };
    }
    return null;
  };
  return treeNodes!.map(mapFilteredNodeToData).filter((node) => node);
};


const data: DataItem[] = createNestedArray([5, 1, 2]);

export default () => {
  const radio = [
    {
      mode: 'full',
      value: 0,
    },
    {
      mode: 'half',
      value: 1,
    },
    {
      mode: 'child only',
      value: 2,
    },
    {
      mode: 'shallow',
      value: 3,
    },
    {
      mode: 'freedom',
      value: 4,
    },
  ];

  const [value, setValue] = useState<TreeProps['value']>([]);
  const [mode, setMode] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [keyword, setKeyword] = useState<string | undefined>(undefined);

  const renderItem = (node: any) => {
    return <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>;
  };

  const handleChange: TreeProps['onChange'] = (v) => {
    setValue(v);
  };

  const handleModeChange = (v: any) => {
    setMode(v.value);
    setValue([]);
  };

  const filteredData = useMemo(() => {
    // 过滤树形数据
    return getFilterTree(data, (node) => {
      if (!keyword) return true;
      return node.id.indexOf(keyword) !== -1;
    }, [], (node) => node.id);
  }, [keyword, data])

  return (
    <div>
      <Radio.Group
        size='small'
        keygen='value'
        prediction={(item, v) => item === v.value}
        value={mode}
        onChange={handleModeChange}
        renderItem={(item) => `模式 ${item.value}`}
        data={radio}
        style={{ marginBottom: 24 }}
      />
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ flex: 1 }}>
          <Input value={keyword} onChange={setKeyword} placeholder="输入关键字过滤" />
          <Tree
            key={mode}
            line={false}
            value={value}
            data={data}
            filteredData={filteredData}
            mode={mode}
            keygen='id'
            renderItem={renderItem}
            onChange={handleChange}
          />
        </div>
        <pre
          style={{
            flex: 1,
            background: '#1d1d1d',
            color: '#94d5fc',
            borderRadius: 4,
            padding: 12,
          }}
        >
          <div style={{ marginBottom: 10 }}>
            <code style={{ color: '#5D8E4E' }}>
              <span>/</span>
              <span>/</span> DataItem[]
            </code>
          </div>
          {value && value.length > 0 && <code>{JSON.stringify(value, null, 2)}</code>}
          {!value || (value.length === 0 && <code style={{ color: '#757575' }}>no data</code>)}
        </pre>
      </div>
    </div>
  );
};
