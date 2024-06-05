/**
 * cn - 不同样式
 *    -- 选项卡有三种样式，可通过 `shape` 属性设置，card 卡片，line 线条，button 按钮, fill 填充, dash 短线
 *    -- 设置 `shape = "line"` 标签页显示为线条
 * en - Shape
 *    -- There are three shapes for tabs, you can set the `shape` property to change it
 *    -- Set `shape = "line"` to show tabs as line
 */
import { Tabs } from 'shineout';

export default () => {
  const tabs: any[] = [];
  for (let i = 0; i < 3; i++) {
    tabs.push({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` });
  }

  return (
    <div style={{ height: 100 }}>
      <Tabs shape={'line'} defaultActive={0}>
        {tabs.map((tab, index) => {
          return (
            <Tabs.Panel key={index} tab={tab.title}>
              <div style={{ padding: 16, height: '100%', fontSize: 14 }}>{tab.content}</div>
            </Tabs.Panel>
          );
        })}
      </Tabs>
    </div>
  );
};
