import { Listy } from 'antd';

const data = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

export default function Demo() {
  return (
    <Listy
      items={data}
      rowKey={(d) => d}
      itemRender={(d) => d}
      styles={{
        root: { borderRadius: 8, border: '1px solid #f0f0f0' },
        item: { padding: '12px 16px' },
      }}
    />
  );
}
