/**
 * cn - 自定义渲染
 *    -- 支持自定义渲染标题、按钮、底部内容区域
 * en - Custom render
 *    -- Support custom rendering of title, button, and bottom content area
 */
import { Transfer, Button } from 'shineout';

const data: { id: string; name: string }[] = [];

for (let i = 0; i < 10; i++) {
  data.push({
    id: `id-${i}`,
    name: `name-${i + 1}`,
  });
}

export default () => {
  const renderFooter = () => {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '8px 12px',
          boxSizing: 'border-box',
        }}
      >
        <Button type='secondary'>Button</Button>
      </div>
    );
  };

  return (
    <Transfer
      titles={['Source', 'Target']}
      footers={[renderFooter(), renderFooter()]}
      data={data}
      keygen='id'
      operations={['To right', 'To left']}
      listHeight={184}
      renderItem='name'
    ></Transfer>
  );
};
