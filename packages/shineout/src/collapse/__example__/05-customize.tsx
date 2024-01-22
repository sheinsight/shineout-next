/**
 * cn - 自定义面板样式
 *    -- 可自定义标题背景色、内容背景色、折叠图标等
 * en - Customize
 *    -- You can customize the title background color, content background color, collapse icon, etc.
 */
import React from 'react';
import { Collapse } from 'shineout';

export default () => {
  const arrowIcon = (
    <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10.6957 5.75207L16.2694 11.3386C16.6589 11.7289 16.6589 12.3609 16.2694 12.7512L10.7576 18.2751C10.3675 18.6661 9.73435 18.6668 9.3434 18.2767C9.15675 18.0904 9.05121 17.838 9.04974 17.5744L8.98776 6.46395C8.98467 5.91168 9.42988 5.46147 9.98216 5.45839C10.2497 5.4569 10.5067 5.56268 10.6957 5.75207Z'
        fill='#666C7C'
      />
    </svg>
  );

  return (
    <div>
      <Collapse defaultActive={['1']} style={{ maxWidth: 1180 }} expandIcon={arrowIcon}>
        <Collapse.Item
          title='This is panel header 1'
          keygen='0'
          style={{ background: '#F4F5F8' }}
          contentStyle={{ background: '#FFFFFF' }}
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
          style={{ background: '#F4F5F8' }}
          contentStyle={{ background: '#FFFFFF' }}
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
          disabled
          style={{ background: '#F4F5F8' }}
          contentStyle={{ background: '#FFFFFF' }}
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
