import { Collapse } from 'shineout-v3';
import { TEXT } from '../_shared/content';

export default function Demo() {
  return (
    <Collapse defaultActive={['0']} style={{ maxWidth: 1180 }} border={false} simple>
        <Collapse.Item title='This is panel header 1' keygen='0'>
          {TEXT}
        </Collapse.Item>
        <Collapse.Item title='This is panel header 2' keygen='1'>
          {TEXT}
        </Collapse.Item>
        <Collapse.Item title='This is panel header 3 (simple=false)' keygen='2' simple={false}>
          {TEXT}
        </Collapse.Item>
    </Collapse>
  );
}
