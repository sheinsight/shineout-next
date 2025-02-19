/**
 * cn - 折叠
 *    -- 通过设置 `collapsible` 属性折叠面板区域
 * en - Collapsible
 *    -- Set the `collapsible` property to collapse the panel area
 */
import { Tabs } from 'shineout';

export default () => {
  const renderIcon = () => {
    return (
      <svg viewBox="0 0 24 24" width="14px" height="14px">
        <path fill='#666C7C' d="M16.002 1C16.9526 1 17.9107 1.91116 17.9958 2.86373L18.002 3V4H19.002C19.9526 4 20.9107 4.91116 20.9958 5.86373L21.002 6V22C21.002 22.6984 20.3103 23.1694 19.673 22.9446L19.5674 22.9006L13.502 19.974L7.43652 22.9006C6.84449 23.1863 6.1677 22.8326 6.02798 22.23L6.00823 22.1142L6.00195 22V19.145L4.43652 19.9006C3.84449 20.1863 3.1677 19.8326 3.02798 19.23L3.00823 19.1142L3.00195 19V3C3.00195 2.0725 3.9728 1.09337 4.87382 1.00627L5.00195 1H16.002ZM18.502 6H8.50195C8.25649 6 8.05234 6.17688 8.01001 6.41012L8.00195 6.5V19.6106C8.00195 19.6858 8.01893 19.7601 8.05163 19.8279C8.15829 20.049 8.40631 20.156 8.63478 20.0927L8.71923 20.0609L12.809 18.087L13.0674 17.963C13.2635 17.8684 13.4828 17.8413 13.6922 17.8819L13.8163 17.9143L13.9215 17.9569L13.9511 17.9701L17.6557 19.757L18.2847 20.0609C18.3524 20.0936 18.4267 20.1106 18.502 20.1106C18.7474 20.1106 18.9516 19.9337 18.9939 19.7005L19.002 19.6106V6.5C19.002 6.22386 18.7781 6 18.502 6ZM15.502 3H5.50195C5.25649 3 5.05234 3.17688 5.01001 3.41012L5.00195 3.5V16.6106C5.00195 16.6858 5.01893 16.7601 5.05163 16.8279C5.15829 17.049 5.40631 17.156 5.63478 17.0927L5.71923 17.0609L6.00195 16.924V6C6.00195 5.08197 6.95654 4.09423 7.8716 4.00633L8.00195 4H16.002V3.5C16.002 3.25454 15.8251 3.05039 15.5918 3.00806L15.502 3Z"></path>
      </svg>
    );
  };

  return (
    <div>
      <Tabs shape='line' defaultActive={0} collapsible>
        <Tabs.Panel tab='Tab 1'>
          <div style={{ padding: 16, fontSize: 14 }}>
            Joy in living comes from having fine emotions, trusting them, giving them the freedom of
            a bird in the open. Joy in living can never be assumed as a pose, or put on from the
            outside as a mask. People who have this joy do not need to talk about it; they radiate
            it. They just live out their joy and let it splash its sunlight and glow into other
            lives as naturally as bird sings. We can never get it by working for it directly. It
            comes, like happiness, to those who are aiming at something higher. It is a byproduct of
            great, simple living. The joy of living comes from what we put into living, not from
            what we seek to get from it. As you travel through life there are always those times
            when decisions just have to be made when the choices are hard, and solutions seem scarce
            and the rain seems to soak your parade!
          </div>
        </Tabs.Panel>
        <Tabs.Panel
          tab={
            <span style={{ marginInlineStart: 4, display: 'flex', alignItems: 'center' }}>
              <span style={{ marginInlineEnd: 4 }}>Tab2</span>
              {renderIcon()}
            </span>
          }
        >
          <div style={{ padding: 16, fontSize: 14 }}>Content of Tab 2</div>
        </Tabs.Panel>
        <Tabs.Panel
          tab={
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {renderIcon()}
              <span style={{ marginInlineStart: 4 }}>Tab3</span>
            </span>
          }
        >
          <div style={{ padding: 16, fontSize: 14 }}>Content of Tab 3</div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
