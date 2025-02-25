/**
 * cn - 左右高度不同
 *    -- 左右高度不同的 Transfer
 * en - Different height
 *    -- Transfer with different height
 */
import { Transfer, Input } from 'shineout';

const data: { id: string; name: string }[] = [];

interface FilterProps {
  text?: string;
  disabled: boolean;
  onFilter?: (text: string) => void;
  placeholder?: string;
  isSource?: boolean;
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
    if(filterProps.isSource) {
      return <div style={{width: 200}}>
        <Input placeholder="请输入" />
        <Input placeholder="请输入" />
      </div>
    }

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
