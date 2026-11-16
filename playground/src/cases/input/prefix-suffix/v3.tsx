import { Input } from 'shineout-v3';
import { icons } from 'shineout-v3';
function MyIcon(props: { style?: React.CSSProperties; children?: React.ReactNode }) {
  const style = {
    width: '1em',
    height: 20,
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto',
    color: 'var(--soui-input-icon-color,var(--soui-neutral-text-4,#666C7C))',
    ...props.style,
  };
  return <div style={style}>{props.children}</div>;
}

export default function Demo() {
  return (
    <Input
      placeholder='please enter'
      width={300}
      prefix={<MyIcon style={{ marginRight: 8, flexShrink: 0 }}>{icons.Calendar}</MyIcon>}
      suffix={<MyIcon style={{ flexShrink: 0 }}>{icons.Search}</MyIcon>}
      showClear
    />
  );
}
