/**
 * cn - 自定义渲染筛选
 *    -- 通过`renderFilter`获取过滤参数实现自定义渲染过滤区域
 * en - Custom render filter
 *    -- Use `renderFilter` to get the filter parameters to achieve custom rendering of the filter area
 */
import { Transfer, Input } from 'shineout';

const data: { id: string; name: string }[] = [];

interface FilterProps {
  text?: string;
  disabled: boolean;
  onFilter?: (text: string) => void;
  placeholder?: string;
  isSrouce?: boolean;
}

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

  const renderFilter = (filterProps: FilterProps) => {
    return (
      <div style={{ display: 'flex' }}>
        <Input
          placeholder='Custom filter'
          onChange={filterProps.onFilter as (text?: string) => void}
        />
      </div>
    );
  };

  return (
    <Transfer
      data={data}
      keygen='id'
      listHeight={188}
      renderItem='name'
      searchPlaceholder='Input search text'
      onFilter={handleFilter}
      renderFilter={renderFilter}
    ></Transfer>
  );
};
