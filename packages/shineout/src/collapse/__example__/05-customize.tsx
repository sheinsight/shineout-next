/**
 * cn - 自定义面板样式
 *    -- 可自定义标题背景色、内容背景色、折叠图标等
 * en - Customize
 *    -- You can customize the title background color, content background color, collapse icon, etc.
 */
import React from 'react';
import { Collapse } from 'shineout';

export default () => {
  return (
    <div>
      <Collapse defaultActive={['1']} style={{ maxWidth: 1180 }} expandIcon={'1'}>
        <Collapse.Item title='This is panel header 1' keygen='0'>
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>
        <Collapse.Item title='This is panel header 2' keygen='1'>
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
