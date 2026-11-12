import { Button } from 'antd';

// antd 6 的节点是 root / icon / content，没有 loading；加载图标属于 icon 节点。
// 函数式 classNames 是整个 classNames 传一个函数，参数里取 props.loading
export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button type='primary' classNames={{ root: 'my-button' }} styles={{ root: { borderRadius: 20 } }}>
        Rounded Button
      </Button>
      <Button
        type='primary'
        loading
        classNames={({ props }) => ({
          root: props.loading ? 'btn btn--loading' : 'btn',
          icon: 'my-spinner',
        })}
        styles={{ icon: { marginRight: 8 } }}
      >
        Submitting
      </Button>
    </div>
  );
}
