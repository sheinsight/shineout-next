import { Rate } from 'antd';
import { star, sized } from '../_shared/icons';


export default function Demo() {
  return <Rate value={3.6} disabled allowHalf character={sized(star)} />;
}
