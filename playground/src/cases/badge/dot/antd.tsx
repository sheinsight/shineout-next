import { Badge } from 'antd';
import Placeholder from '../_shared/placeholder';

export default function Demo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
      <Badge dot>
        <Placeholder />
      </Badge>
      <Badge color='black' text='自定义文案' />
    </div>
  );
}
