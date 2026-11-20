import { Rate } from 'antd';
import { star, sized } from '../_shared/icons';


export default function Demo() {
  return <Rate allowHalf defaultValue={3.5} character={sized(star)} />;
}
