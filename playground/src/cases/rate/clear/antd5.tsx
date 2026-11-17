import { Rate } from 'antd-v5';
import { star, sized } from '../_shared/icons';


export default function Demo() {
  return <Rate allowClear character={sized(star)} />;
}
