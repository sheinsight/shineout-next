import { Tag } from 'antd';

const colors = ['default', 'processing', 'error', 'warning', 'success'];
const variants: any[] = ['filled', 'solid', 'outlined'];
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function Demo() {
  return (
    <div>
      {variants.map((variant, i) => (
        <div key={variant} style={{ marginBottom: i === variants.length - 1 ? 0 : 24 }}>
          {colors.map((color) => (
            <Tag variant={variant} key={color} color={color}>
              {capitalize(color)}
            </Tag>
          ))}
        </div>
      ))}
    </div>
  );
}
