/**
 * cn - 额外操作
 *    -- 自定义渲染每个面板的扩容内容
 * en - Extra
 *    -- Customize the extra content of each panel
 */
import React from 'react';
import { Collapse, Checkbox, Button } from 'shineout';

export default () => {
  const moreIcon = (
    <svg viewBox="0 0 24 24" width="16px" height="16px">
      <path fill="#666C7C" d="M14.002 4C14.002 5.10457 13.1065 6 12.002 6C10.8974 6 10.002 5.10457 10.002 4C10.002 2.89543 10.8974 2 12.002 2C13.1065 2 14.002 2.89543 14.002 4ZM14.0017 12.0903C14.0017 13.1949 13.1063 14.0903 12.0017 14.0903C10.8971 14.0903 10.0017 13.1949 10.0017 12.0903C10.0017 10.9858 10.8971 10.0903 12.0017 10.0903C13.1063 10.0903 14.0017 10.9858 14.0017 12.0903ZM14.0017 20C14.0017 21.1046 13.1063 22 12.0017 22C10.8971 22 10.0017 21.1046 10.0017 20C10.0017 18.8954 10.8971 18 12.0017 18C13.1063 18 14.0017 18.8954 14.0017 20Z"></path>
    </svg>
  )
  return (
    <div>
      <Collapse defaultActive={['1']} style={{ maxWidth: 1180 }}>
        <Collapse.Item title='This is panel header 1' keygen='0' extra={moreIcon}>
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>
        <Collapse.Item
          title='This is panel header 2'
          keygen='1'
          extra={<Checkbox style={{ margin: 0 }}>checkbox</Checkbox>}
        >
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>
        <Collapse.Item title='This is panel header 3' keygen='2' extra={<Button type='primary' size="small">Button</Button>}>
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>
      </Collapse>
    </div>
  );
};
