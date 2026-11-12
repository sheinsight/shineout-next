import { Badge } from 'shineout-v3';
import Placeholder from '../_shared/placeholder';

export default function Demo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
      <Badge count={99}>
        <Placeholder />
      </Badge>
      <Badge count={100} overflowCount={9}>
        <Placeholder />
      </Badge>
      <Badge count={100} overflowCount={99}>
        <Placeholder />
      </Badge>
      <Badge count={1000} overflowCount={999}>
        <Placeholder />
      </Badge>
    </div>
  );
}
