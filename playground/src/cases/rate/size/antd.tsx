import { Rate } from 'antd';
import { star, sized } from '../_shared/icons';

const titleStyle = { marginBottom: 8, fontSize: 16, fontWeight: 500 };

export default function Demo() {
  return (
    <div>
      <div style={titleStyle}>16px</div>
      <Rate character={sized(star)} style={{ fontSize: 16, marginBottom: 32 }} />
      <div style={titleStyle}>24px</div>
      <Rate character={sized(star)} style={{ fontSize: 24 }} />
    </div>
  );
}
