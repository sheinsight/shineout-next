import { Collapse } from 'shineout-v3';
import { TEXT } from '../_shared/content';

export default function Demo() {
  return (
    <Collapse accordion style={{ maxWidth: 1180 }}>
        <Collapse.Item title='This is panel header 1' keygen='0'>
          {TEXT}
        </Collapse.Item>
        <Collapse.Item title='This is panel header 2' keygen='1'>
          {TEXT}
        </Collapse.Item>
        <Collapse.Item title='This is panel header 3' keygen='2'>
          {TEXT}
        </Collapse.Item>
        <Collapse.Item title='This is panel header 4' keygen='3'>
          {TEXT}
        </Collapse.Item>
    </Collapse>
  );
}
