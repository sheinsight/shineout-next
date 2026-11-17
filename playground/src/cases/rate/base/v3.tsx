import { useState } from 'react';
import { useBenchState } from '../../../core/define';
import { Rate } from 'shineout-v3';
import { star } from '../_shared/icons';

const StarRate = Rate(star, star);

export default function Demo() {
  const [value, setValue] = useState(3);
  useBenchState({ value });
  return <StarRate value={value} onChange={(v?: number) => setValue(v ?? 0)} />;
}
