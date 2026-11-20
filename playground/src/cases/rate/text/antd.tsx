import { useState } from 'react';
import { Rate } from 'antd';
import { star, sized } from '../_shared/icons';

const texts = ['poor', 'fair', 'good', 'very good', 'excellent'];

export default function Demo() {
  const [value, setValue] = useState(4);
  return (
    <>
      <Rate allowHalf value={value} onChange={setValue} character={sized(star)} />
      <span style={{ marginInlineStart: 8 }}>{texts[Math.ceil(value) - 1]}</span>
    </>
  );
}
