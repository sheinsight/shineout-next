import { useState } from 'react';
import { useBenchState } from '../../../core/define';
import { Rate } from 'antd-v5';
import { star, sized } from '../_shared/icons';


export default function Demo() {
  const [value, setValue] = useState(3);
  useBenchState({ value });
  return <Rate character={sized(star)} value={value} onChange={setValue} />;
}
