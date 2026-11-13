import { Collapse } from 'shineout-v3';
import { ArrowIcon, TEXT } from '../_shared/content';

export default function Demo() {
  return (
    <Collapse defaultActive={['1']} style={{ maxWidth: 1180 }} expandIcon={<ArrowIcon />}>
        <Collapse.Item title='This is panel header 1' keygen='0' style={{ background: '#F4F5F8' }} contentStyle={{ background: '#FFFFFF' }}>
          {TEXT}
        </Collapse.Item>
        <Collapse.Item title='This is panel header 2' keygen='1' style={{ background: '#F4F5F8' }} contentStyle={{ background: '#FFFFFF' }}>
          {TEXT}
        </Collapse.Item>
        <Collapse.Item title='This is panel header 3' keygen='2' disabled style={{ background: '#F4F5F8' }} contentStyle={{ background: '#FFFFFF' }}>
          {TEXT}
        </Collapse.Item>
    </Collapse>
  );
}
