/**
 * cn - 简洁面板
 *    -- 在 Collapse 上设置 `simple` 可统一让所有子面板进入简洁模式，移除内容区域的上下内边距和背景色；也可在单个 Collapse.Item 上单独设置 `simple`，实现局部控制
 * en - Simple panel
 *    -- Set simple on Collapse to apply minimal content style to all items at once (no vertical padding, no background color); you can also set simple on individual Collapse.Item for granular control
 */
import React from 'react';
import { Collapse } from 'shineout';

export default () => {
  return (
    <div>
      <Collapse defaultActive={['0']} style={{ maxWidth: 1180 }} border={false} simple>
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
        <Collapse.Item title='This is panel header 3 (simple=false)' keygen='2' simple={false}>
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
