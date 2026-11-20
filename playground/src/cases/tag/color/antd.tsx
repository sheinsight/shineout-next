import { Tag } from 'antd';

const colors: Record<string, string> = {'tangerine': 'volcano', 'magenta': 'magenta', 'purple': 'purple', 'indigo': 'geekblue', 'cyan': 'cyan', 'neon': 'lime', 'lemon': 'gold', 'brown': 'orange', 'orange': 'orange'};
const variants: any[] = ['filled', 'solid', 'outlined'];
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function Demo() {
  return (
    <div>
      {variants.map((variant) => (
        <div key={variant} style={{ marginBottom: 24 }}>
          {Object.keys(colors).map((name) => (
            <Tag variant={variant} key={name} color={colors[name]}>
              {capitalize(name)}
            </Tag>
          ))}
        </div>
      ))}
    </div>
  );
}
