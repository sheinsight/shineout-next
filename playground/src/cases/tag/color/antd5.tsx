import { Tag } from 'antd-v5';

const colors: Record<string, string> = {'tangerine': 'volcano', 'magenta': 'magenta', 'purple': 'purple', 'indigo': 'geekblue', 'cyan': 'cyan', 'neon': 'lime', 'lemon': 'gold', 'brown': 'orange', 'orange': 'orange'};
const rows = [false, true];
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function Demo() {
  return (
    <div>
      {rows.map((bordered) => (
        <div key={String(bordered)} style={{ marginBottom: 24 }}>
          {Object.keys(colors).map((name) => (
            <Tag bordered={bordered} key={name} color={colors[name]}>
              {capitalize(name)}
            </Tag>
          ))}
        </div>
      ))}
    </div>
  );
}
