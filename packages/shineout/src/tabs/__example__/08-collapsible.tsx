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
      <svg
        width='14'
        height='14'
        viewBox='0 0 14 14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M9.33333 0.583374C9.88789 0.583374 10.4468 1.11488 10.4964 1.67055L10.5 1.75004V2.33337H11.0833C11.6379 2.33337 12.1968 2.86488 12.2464 3.42055L12.25 3.50004V12.8334C12.25 13.2408 11.8466 13.5155 11.4748 13.3844L11.4132 13.3587L7.875 11.6515L4.33683 13.3587C3.99148 13.5254 3.59669 13.3191 3.51518 12.9676L3.50366 12.9L3.5 12.8334V11.168L2.58683 11.6087C2.24148 11.7754 1.84669 11.5691 1.76518 11.2176L1.75366 11.15L1.75 11.0834V1.75004C1.75 1.209 2.31633 0.637838 2.84192 0.587033L2.91667 0.583374H9.33333ZM10.7917 3.50004H4.95833C4.81515 3.50004 4.69606 3.60322 4.67137 3.73928L4.66667 3.79171V11.4396C4.66667 11.4834 4.67657 11.5268 4.69564 11.5663C4.75786 11.6953 4.90254 11.7577 5.03582 11.7208L5.08508 11.7022L7.47075 10.5508L7.6215 10.4785C7.7359 10.4233 7.86383 10.4075 7.98596 10.4312L8.05839 10.4501L8.11974 10.4749L8.13701 10.4826L10.298 11.525L10.6649 11.7022C10.7045 11.7213 10.7478 11.7312 10.7917 11.7312C10.9349 11.7312 11.0539 11.628 11.0786 11.492L11.0833 11.4396V3.79171C11.0833 3.63062 10.9527 3.50004 10.7917 3.50004ZM9.04167 1.75004H3.20833C3.06515 1.75004 2.94606 1.85322 2.92137 1.98928L2.91667 2.04171V9.68956C2.91667 9.73345 2.92657 9.77677 2.94564 9.8163C3.00787 9.94526 3.15254 10.0077 3.28582 9.9708L3.33508 9.95225L3.5 9.87237V3.50004C3.5 2.96452 4.05684 2.38834 4.59063 2.33707L4.66667 2.33337H9.33333V2.04171C9.33333 1.89852 9.23016 1.77944 9.09409 1.75474L9.04167 1.75004Z'
          fill='#666C7C'
        />
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
