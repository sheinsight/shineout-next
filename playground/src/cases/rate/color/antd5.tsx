import { Rate } from 'antd-v5';
import { star, sized } from '../_shared/icons';


export default function Demo() {
  return <Rate defaultValue={2} character={sized(star)} style={{ color: '#ff4d4f' }} />;
}
