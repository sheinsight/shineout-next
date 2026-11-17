import { Rate } from 'antd-v5';
import { star, sized } from '../_shared/icons';


export default function Demo() {
  return <Rate count={10} defaultValue={3} character={sized(star)} />;
}
