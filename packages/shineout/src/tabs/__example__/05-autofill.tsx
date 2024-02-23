/**
 * cn - 自动填充
 *    -- 设置 `autoFill` 属性后，选项卡会自动填充父元素的宽度
 * en - autoFill
 *    -- Set the `autoFill` property, the tab will automatically fill the width of the parent element
 */
import { Tabs } from 'shineout';

export default () => {
  const tabs = [];
  for (let i = 0; i < 3; i++) {
    tabs.push({ title: `Tab ${i + 1}`, content: `Content of Tab ${i + 1}` });
  }

  return (
    <div style={{ height: 150 }}>
      <Tabs shape='line' autoFill defaultActive={0}>
        {tabs.map((tab, index) => {
          return (
            <Tabs.Panel key={index} tab={tab.title}>
              <div
                style={{
                  padding: 16,
                  height: '100%',
                  fontSize: 14,
                  lineHeight: '20px',
                }}
              >
                Joy in living comes from having fine emotions, trusting them, giving them the
                freedom of a bird in the open. Joy in living can never be assumed as a pose, or put
                on from the outside as a mask. People who have this joy do not need to talk about
                it; they radiate it. They just live out their joy and let it splash its sunlight and
                glow into other lives as naturally as bird sings. We can never get it by working for
                it directly. It comes, like happiness, to those who are aiming at something higher.
                It is a byproduct of great, simple living. The joy of living comes from what we put
                into living, not from what we seek to get from it. As you travel through life there
                are always those times when decisions just have to be made when the choices are
                hard, and solutions seem scarce and the rain seems to soak your parade!
              </div>
            </Tabs.Panel>
          );
        })}
      </Tabs>
    </div>
  );
};
