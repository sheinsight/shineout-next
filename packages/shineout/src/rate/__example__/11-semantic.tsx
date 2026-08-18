/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / star / text）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / star / text).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Rate } from 'shineout';

const star = (
  <svg viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path d='M8.276 7.825L1.85649 8.7559L1.74278 8.77878C1.00761 8.96968 0.736859 9.90915 1.30093 10.4606L5.953 15.008L4.84231 21.3268L4.82911 21.4327C4.77288 22.2003 5.59415 22.7575 6.29763 22.3824L11.999 19.343L17.7023 22.3825L17.7988 22.4279C18.5105 22.7194 19.2948 22.1128 19.1578 21.3281L18.054 15.008L22.6997 10.46L22.7779 10.3745C23.2586 9.78723 22.9242 8.86973 22.1443 8.75601L15.758 7.825L12.895 2.05544C12.5264 1.31273 11.4661 1.31545 11.1013 2.06004L8.276 7.825Z' />
  </svg>
);

const StarRate = Rate(star, star);

export default () => {
  return (
    <StarRate
      defaultValue={3}
      text={['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful']}
      styles={{
        root: { padding: '8px 0' },
        star: { marginRight: 4 },
        text: { color: '#faad14', fontWeight: 500 },
      }}
    />
  );
};
