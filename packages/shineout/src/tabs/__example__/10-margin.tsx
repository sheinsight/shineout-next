/**
 * cn - 自定义角标
 *    -- 通过设置 '--soui-tabs-badge-margin' CSS变量让角标可以完整的显示出来
 * en - Custom badge
 *    -- By setting the --soui-tabs-badge-margin variable, the badge can be fully displayed
 */
import { Tabs, Badge } from 'shineout';

export default () => {
  const tabs: any[] = [];
  for (let i = 0; i < 30; i++) {
    tabs.push({ title: `Tab ${i + 1}`, badge: i % 2, content: `Content of Tab ${i + 1}` });
  }

  const renderTab = (tab: any) => (
    <div style={{ position: 'relative' }}>
      {tab.title}
      {tab.badge && (
        <Badge
          count={100}
          overflowCount={99}
          style={{ position: 'absolute', zIndex: 1, top: -24, right: -16 }}
        />
      )}
    </div>
  );

  return (
    <div style={{ '--soui-tabs-badge-margin': '12px' } as React.CSSProperties}>
      <Tabs shape={'card'} defaultActive={0}>
        {tabs.map((tab, index) => {
          return (
            <Tabs.Panel key={index} tab={renderTab(tab)}>
              <div style={{ padding: 16, height: '100%', fontSize: 14 }}>{tab.content}</div>
            </Tabs.Panel>
          );
        })}
      </Tabs>
    </div>
  );
};
