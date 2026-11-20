import { Badge } from 'antd-v5';
import Placeholder from '../_shared/placeholder';

export default function Demo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <Badge count={99} size='small'>
        <Placeholder />
      </Badge>
      <Badge count={99}>
        <Placeholder />
      </Badge>
    </div>
  );
}
