import { Badge } from 'shineout-v3';
import Placeholder from '../_shared/placeholder';

export default function Demo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
      <Badge dot>
        <Placeholder />
      </Badge>
      <Badge dot color='black' text='自定义文案' />
    </div>
  );
}
