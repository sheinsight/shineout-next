import { Collapse } from 'shineout-v3';
import { TEXT } from '../_shared/content';

export default function Demo() {
  return (
    <Collapse style={{ maxWidth: 1180 }} defaultActive={['0']}>
      <Collapse.Item title='This is panel header 1' keygen='0'>
        <Collapse defaultActive={['1']}>
          <Collapse.Item title='This is panel nest header 2' keygen='1'>
            {TEXT}
          </Collapse.Item>
          <Collapse.Item title='This is panel nest header 3' keygen='2'>
            {TEXT}
          </Collapse.Item>
        </Collapse>
      </Collapse.Item>
      <Collapse.Item title='This is panel header 2' keygen='3'>
          {TEXT}
      </Collapse.Item>
      <Collapse.Item title='This is panel header 3' keygen='4'>
          {TEXT}
      </Collapse.Item>
      <Collapse.Item title='This is panel header 4' keygen='5'>
          {TEXT}
      </Collapse.Item>
    </Collapse>
  );
}
