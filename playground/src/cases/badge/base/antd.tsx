import { useState } from 'react';
import { Badge, Switch } from 'antd';
import Placeholder from '../_shared/placeholder';

export default function Demo() {
  const [showZero, setShowZero] = useState(false);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
      <Badge count={1}>
        <Placeholder />
      </Badge>
      <Badge count={0} showZero={showZero}>
        <Switch onChange={setShowZero} checked={showZero} />
      </Badge>
    </div>
  );
}
