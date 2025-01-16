/**
 * cn - 头部附着
 *    -- sticky 属性会开启头部附着功能；sticky=true时，开启附着在顶部；sticky=number时，代表附着顶部，且距离顶部的间距；sticky=StickyProps时，参数将传入 Sticky 组件内；switchToTop 属性支持是否自动滚动到Tabs
 * en - Sticky header
 *    -- The sticky property will enable the sticky header feature; when sticky=true, the header will be attached to the top; when sticky=number, it means that the header is attached to the top and the distance from the top; when sticky=StickyProps, the parameters will be passed to the Sticky component; the switchToTop property supports whether to automatically scroll to Tabs
 */
import React, { useRef } from 'react';
import { Tabs } from 'shineout';

const App: React.FC = () => {
  const Element = useRef(null);
  const tabs = [];
  for (let i = 0; i < 3; i++) {
    tabs.push({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` });
  }

  return (
    <div style={{ position: 'relative', zIndex: 0 }}>
      <div id='sticky_element' style={{ height: 400, overflow: 'auto' }}>
        <div
          style={{
            height: 1600,
            backgroundColor: '#f4f5f8',
            backgroundImage:
              'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), ' +
              'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px',
          }}
        >
          <div style={{ height: 200 }}></div>
          <div ref={Element}>
            <Tabs
              shape='line'
              defaultActive={0}
              sticky={{
                scrollContainer: '#sticky_element',
                parent: Element.current,
                top: 0,
              }}
              style={{ backgroundColor: '#fff' }}
              inactiveBackground='transparent'
              activeBackground='transparent'
              tabBarStyle={{ backgroundColor: '#fff' }}
            >
              {tabs.map((tab, index) => {
                return (
                  <Tabs.Panel key={index} tab={tab.title}>
                    <div style={{ padding: 16, height: 100, fontSize: 14 }}>{tab.content}</div>
                  </Tabs.Panel>
                );
              })}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
