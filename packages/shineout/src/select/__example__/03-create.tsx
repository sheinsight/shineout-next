/**
 * cn - 创建选项
 *    --
 * en - Create option
 *    --
 */
import React from 'react';
import { Select } from 'shineout';

const data: { id: string; name: string }[] = [];
for (let i = 0; i < 15; i++) {
  data.push({
    id: `id-${i}`,
    name: `标签 ${i}`,
  });
}

export default () => {
  // const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
  const handleFilterWidthCreate = (data, createdData) => {
    return data.name.indexOf(createdData.name) > -1;
  };
  return (
    <div>
      <Select
        multiple
        width={300}
        data={data}
        onCreate={(d) => {
          return {
            id: `customId-${d}`,
            name: d,
          };
        }}
        onChange={(v) => console.log(v)}
        height={250}
        prediction={(v, d) => {
          return d.id === v.id;
        }}
        keygen='id'
        placeholder='Select Color'
        renderItem={(d) => d.name}
        onFilter={(text) => (d) => d.name.indexOf(text) > -1}
        onFilterWidthCreate={handleFilterWidthCreate}
      />
      <br />

      <Select
        width={300}
        data={data}
        onCreate={(d) => {
          return {
            id: `customId-${d}`,
            name: d,
          };
        }}
        onChange={(v) => console.log(v)}
        height={250}
        prediction={(v, d) => {
          return d.id === v.id;
        }}
        keygen='id'
        placeholder='Select Color'
        renderItem={(d) => d.name}
        onFilter={(text) => (d) => d.name.indexOf(text) > -1}
        onFilterWidthCreate={handleFilterWidthCreate}
      />
      <br />

      <Select
        width={300}
        data={data}
        onChange={(v) => console.log(v)}
        height={250}
        prediction={(v, d) => {
          return d.id === v.id;
        }}
        keygen='id'
        placeholder='Select Color'
        renderItem={(d) => d.name}
      />
    </div>
  );
};
