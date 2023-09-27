/**
 * cn - 额外内容
 *    -- 通过配置 `extra` 属性，允许传入额外的内容
 * en - extra
 *    -- Set the `extra` property to add extra content
 */
import { Tabs, Button } from 'shineout';

export default () => {
  const tabs = [];
  for (let i = 0; i < 3; i++) {
    tabs.push({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` });
  }

  const renderExtra = () => {
    return (
      <Button mode='text' type='primary'>
        extra operation
      </Button>
    );
  };

  return (
    <div style={{ height: 100 }}>
      <Tabs shape='line' defaultActive={0} extra={renderExtra()}>
        {tabs.map((tab, index) => {
          return (
            <Tabs.Panel key={index} tab={tab.title}>
              <div style={{ padding: 5, height: '100%' }}>{tab.content}</div>
            </Tabs.Panel>
          );
        })}
      </Tabs>
    </div>
  );
};
