/**
 * cn - 颜色
 *    -- 在创建组件时设置颜色
 * en - Icon color
 *    -- Set the color when the component is created
 */
import React from 'react';
import { Rate } from 'shineout';

const getColorStar = (color: string) => (
  <svg viewBox='0 0 24 24' fill={color} xmlns='http://www.w3.org/2000/svg'>
    <path d='M8.276 7.825L1.85649 8.7559L1.74278 8.77878C1.00761 8.96968 0.736859 9.90915 1.30093 10.4606L5.953 15.008L4.84231 21.3268L4.82911 21.4327C4.77288 22.2003 5.59415 22.7575 6.29763 22.3824L11.999 19.343L17.7023 22.3825L17.7988 22.4279C18.5105 22.7194 19.2948 22.1128 19.1578 21.3281L18.054 15.008L22.6997 10.46L22.7779 10.3745C23.2586 9.78723 22.9242 8.86973 22.1443 8.75601L15.758 7.825L12.895 2.05544C12.5264 1.31273 11.4661 1.31545 11.1013 2.06004L8.276 7.825Z' />
  </svg>
);

const heartBg = getColorStar('currentColor');
const heart = getColorStar('#ff4d4f');
const HeartRate = Rate(heartBg, heart);

const App: React.FC = () => <HeartRate defaultValue={2} />;

export default App;
