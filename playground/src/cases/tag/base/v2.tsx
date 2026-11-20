import { Tag } from 'shineout-v2';

const colors: any[] = ['default', 'info', 'danger', 'warning', 'success'];
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function Demo() {
  return (
    <div>
      {colors.map((item) => (
        <Tag key={item} type={item}>
          {capitalize(item)}
        </Tag>
      ))}
    </div>
  );
}
