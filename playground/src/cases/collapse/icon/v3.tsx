import { useState } from 'react';
import { Collapse, Radio } from 'shineout-v3';
import { TEXT } from '../_shared/content';

type Position = 'left' | 'right' | 'none';
type Region = 'header' | 'icon' | 'disabled';
const positions: Position[] = ['left', 'right', 'none'];
const regions: Region[] = ['header', 'icon', 'disabled'];
const rowStyle = { display: 'flex', marginBottom: 16, alignItems: 'center' };

export default function Demo() {
  const [position, setPosition] = useState<Position>('left');
  const [region, setRegion] = useState<Region>('header');
  return (
    <div>
      <div style={rowStyle}>
        <div style={{ width: 80 }}>Icon:</div>
        <Radio.Group keygen data={positions} value={position} onChange={setPosition} />
      </div>
      <div style={rowStyle}>
        <div style={{ width: 80 }}>Hotspot:</div>
        <Radio.Group keygen data={regions} value={region} onChange={setRegion} />
      </div>
      <Collapse
        style={{ maxWidth: 1180 }}
        triggerRegion={region}
        expandIconPosition={position === 'none' ? undefined : position}
      >
        <Collapse.Item title='This is panel header 1' keygen='0' showExpandIcon={position !== 'none'}>
          {TEXT}
        </Collapse.Item>
        <Collapse.Item title='This is panel header 2' keygen='1' showExpandIcon={position !== 'none'}>
          {TEXT}
        </Collapse.Item>
        <Collapse.Item title='This is panel header 3' keygen='2' showExpandIcon={position !== 'none'}>
          {TEXT}
        </Collapse.Item>
      </Collapse>
    </div>
  );
}
