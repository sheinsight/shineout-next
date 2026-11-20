import { useState } from 'react';
import { Collapse, Radio } from 'antd';
import { TEXT } from '../_shared/content';

type Position = 'left' | 'right' | 'none';
type Region = 'header' | 'icon' | 'disabled';
const positions: Position[] = ['left', 'right', 'none'];
const regions: Region[] = ['header', 'icon', 'disabled'];
const rowStyle = { display: 'flex', marginBottom: 16, alignItems: 'center' };

// Shineout left / right ↔ antd start / end；none ↔ 面板 showArrow={false}；triggerRegion ↔ collapsible
export default function Demo() {
  const [position, setPosition] = useState<Position>('left');
  const [region, setRegion] = useState<Region>('header');
  const items = [0, 1, 2].map((i) => ({
    key: String(i),
    label: `This is panel header ${i + 1}`,
    children: TEXT,
    showArrow: position !== 'none',
  }));
  return (
    <div>
      <div style={rowStyle}>
        <div style={{ width: 80 }}>Icon:</div>
        <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)} options={positions} />
      </div>
      <div style={rowStyle}>
        <div style={{ width: 80 }}>Hotspot:</div>
        <Radio.Group value={region} onChange={(e) => setRegion(e.target.value)} options={regions} />
      </div>
      <Collapse
        style={{ maxWidth: 1180 }}
        collapsible={region}
        expandIconPlacement={position === 'right' ? 'end' : 'start'}
        items={items}
      />
    </div>
  );
}
