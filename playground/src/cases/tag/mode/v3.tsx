import { Tag } from 'shineout-v3';

const colors: any[] = ['default', 'info', 'danger', 'warning', 'success'];
const modes: any[] = ['bright', 'fill', 'outline', 'brightOutline'];
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function Demo() {
  return (
    <div>
      {modes.map((mode, i) => (
        <div key={mode} style={{ marginBottom: i === modes.length - 1 ? 0 : 24 }}>
          {colors.map((color) => (
            <Tag mode={mode} key={color} color={color}>
              {capitalize(color)}
            </Tag>
          ))}
        </div>
      ))}
    </div>
  );
}
