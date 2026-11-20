import { Button, Checkbox, Collapse } from 'shineout-v3';
import { MoreIcon, TEXT } from '../_shared/content';

export default function Demo() {
  return (
    <Collapse defaultActive={['1']} style={{ maxWidth: 1180 }}>
      <Collapse.Item title='This is panel header 1' keygen='0' extra={<MoreIcon />}>
        {TEXT}
      </Collapse.Item>
      <Collapse.Item title='This is panel header 2' keygen='1' extra={<Checkbox style={{ margin: 0 }}>checkbox</Checkbox>}>
        {TEXT}
      </Collapse.Item>
      <Collapse.Item
        title='This is panel header 3'
        keygen='2'
        extra={
          <Button type='primary' size='small'>
            Button
          </Button>
        }
      >
        {TEXT}
      </Collapse.Item>
    </Collapse>
  );
}
