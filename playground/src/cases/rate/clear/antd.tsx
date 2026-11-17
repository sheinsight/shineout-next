import { Rate } from 'antd';
import { star, sized } from '../_shared/icons';


export default function Demo() {
  return <Rate allowClear character={sized(star)} />;
}
