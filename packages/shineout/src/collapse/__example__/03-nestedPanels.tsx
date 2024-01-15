/**
 * cn - 嵌套面板
 *    -- 嵌套面板
 * en - Nested panels
 *    -- Nested panels
 */
import React from 'react';
import { Collapse } from 'shineout';

export default () => {
  return (
    <div>
      <Collapse style={{ maxWidth: 1180 }} defaultActive={['0']}>
        <Collapse.Item title='This is panel header 1' keygen='0'>
          <Collapse defaultActive={['1']}>
            <Collapse.Item title='This is panel nest header 2' keygen='1'>
              Joy in living comes from having fine emotions, trusting them, giving them the freedom
              of a bird in the open. Joy in living can never be assumed as a pose, or put on from
              the outside as a mask. People who have this joy do not need to talk about it; they
              radiate it. They just live out their joy and let it splash its sunlight and glow into
              other lives as naturally as bird sings.
            </Collapse.Item>

            <Collapse.Item title='This is panel nest header 3' keygen='2'>
              Joy in living comes from having fine emotions, trusting them, giving them the freedom
              of a bird in the open. Joy in living can never be assumed as a pose, or put on from
              the outside as a mask. People who have this joy do not need to talk about it; they
              radiate it. They just live out their joy and let it splash its sunlight and glow into
              other lives as naturally as bird sings.
            </Collapse.Item>
          </Collapse>
        </Collapse.Item>
        <Collapse.Item title='This is panel header 2' keygen='3'>
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>

        <Collapse.Item title='This is panel header 3' keygen='4'>
          Joy in living comes from having fine emotions, trusting them, giving them the freedom of a
          bird in the open. Joy in living can never be assumed as a pose, or put on from the outside
          as a mask. People who have this joy do not need to talk about it; they radiate it. They
          just live out their joy and let it splash its sunlight and glow into other lives as
          naturally as bird sings.
        </Collapse.Item>

        <Collapse.Item title='This is panel header 4' keygen='5'>
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
