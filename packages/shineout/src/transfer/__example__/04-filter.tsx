/**
 * cn - 筛选
 *    -- 通过`onFilter`属性设置自定义筛选方法
 * en - Filter
 *    -- Set custom filter method through the `onFilter` property
 */
import { Transfer } from 'shineout';

const data: { id: string; name: string }[] = [];

for (let i = 0; i < 10; i++) {
  data.push({
    id: `id-${i}`,
    name: `name-${i + 1}`,
  });
}

export default () => {
  const handleFilter = (text: string, item: { id: string; name: string }) => {
    return item.name.indexOf(text) > -1;
  };
  return (
    <Transfer
      data={data}
      keygen='id'
      listHeight={188}
      renderItem='name'
      searchPlaceholder='Input search text'
      onFilter={handleFilter}
    ></Transfer>
  );
};
