/**
 * cn - 额外操作
 *    -- 自定义渲染每个面板的扩容内容
 * en - Extra
 *    -- Customize the extra content of each panel
 */
import React from 'react';
import { Collapse, Checkbox } from 'shineout';

export default () => {
  return (
    <div>
      <Collapse defaultActive={['1']} style={{ maxWidth: 1180 }}>
        <Collapse.Item title='This is panel header 1' keygen='0'>
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
        <Collapse.Item title='This is panel header 3' keygen='2'>
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
