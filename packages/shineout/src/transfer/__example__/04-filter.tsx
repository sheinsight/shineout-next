/**
 * cn - 筛选
 *    -- 通过 `onFilter` 属性设置自定义筛选方法
 *    -- 设置 `highlight` 属性，开启搜索关键字高亮功能
 * en - Filter
 *    -- Set custom filter method through the `onFilter` property
 *    -- Set the `highlight` property to enable the search keyword highlight feature
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
      highlight
    ></Transfer>
  );
};
