import { List } from 'antd';
import { STRINGS } from '../_shared/data';

export default function Demo() {
  return <List bordered dataSource={STRINGS} renderItem={(item) => <List.Item>{item}</List.Item>} />;
}
