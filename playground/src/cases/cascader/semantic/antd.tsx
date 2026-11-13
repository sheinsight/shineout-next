import { Cascader } from 'antd';

const options = [
  { value: '1', label: 'Asia', children: [{ value: '1-1', label: 'China', children: [{ value: '1-1-1', label: 'Shanghai' }, { value: '1-1-2', label: 'Beijing' }] }, { value: '1-2', label: 'Japan', children: [{ value: '1-2-1', label: 'Tokyo' }] }] },
  { value: '2', label: 'Europe', children: [{ value: '2-1', label: 'France', children: [{ value: '2-1-1', label: 'Paris' }] }, { value: '2-2', label: 'Germany', children: [{ value: '2-2-1', label: 'Berlin' }] }] },
];

// antd 6 的节点是 root / prefix / suffix / input / placeholder / content / item / popup.{root, list, listItem}，
// 没有 header / option。按语义对应：popup→popup.root，list→popup.list，option→popup.listItem；header 没有对应，省略
export default function Demo() {
  return (
    <Cascader
      options={options}
      placeholder='Select a location'
      styles={{
        root: { border: '2px solid #1890ff', borderRadius: 6 },
        popup: {
          root: { borderRadius: 4 },
          list: { borderRight: '1px solid #f0f0f0' },
          listItem: { padding: '8px 12px' },
        },
      }}
    />
  );
}
