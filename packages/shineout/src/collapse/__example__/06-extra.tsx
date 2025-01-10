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
    <svg style={{ width: 12 }} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12ZM14 19C14 20.1046 13.1046 21 12 21C10.8954 21 10 20.1046 10 19C10 17.8954 10.8954 17 12 17C13.1046 17 14 17.8954 14 19Z'
        fill='#666C7C'
      />
    </svg>
  );
  return (
    <div>
      <Collapse defaultActive={['1']} style={{ maxWidth: 1180 }}>
        <Collapse.Item
          title='This is panel header 1'
          keygen='0'
          extra={
            <Button shape='square' size='small' mode='text'>
              {moreIcon}
            </Button>
          }
        >
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
        <Collapse.Item
          title='This is panel header 3'
          keygen='2'
          extra={<Button size='small' type='primary'>Button</Button>}
        >
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
