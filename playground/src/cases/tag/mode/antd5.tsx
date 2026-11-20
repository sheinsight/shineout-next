import { Tag } from 'antd-v5';

const colors = ['default', 'processing', 'error', 'warning', 'success'];
// antd 5 没有 variant，只有 bordered：false 是浅底色（对应 bright），true 是描边（对应 outline）
const rows = [false, true];
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function Demo() {
  return (
    <div>
      {rows.map((bordered, i) => (
        <div key={String(bordered)} style={{ marginBottom: i === rows.length - 1 ? 0 : 24 }}>
          {colors.map((color) => (
            <Tag bordered={bordered} key={color} color={color}>
              {capitalize(color)}
            </Tag>
          ))}
        </div>
      ))}
    </div>
  );
}
