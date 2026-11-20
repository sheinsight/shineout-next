import { Spin } from 'antd';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <Spin
        description='Loading...'
        classNames={{ indicator: 'my-indicator', description: 'my-description' }}
        styles={{
          root: { padding: 16, flex: 1 },
          description: { fontSize: 14, marginTop: 8 },
        }}
      />
      <Spin
        description='Please wait'
        spinning
        classNames={({ props }) => ({
          root: props.spinning ? 'my-spin my-spin--loading' : 'my-spin',
          section: 'my-loading-mask',
        })}
        styles={{
          root: { padding: 16, flex: 1 },
          section: { backdropFilter: 'blur(2px)' },
        }}
      >
        <div style={{ padding: 24, background: '#f5f5f5', borderRadius: 8, width: '100%' }}>
          <p>Some content here</p>
          <p>More content below</p>
        </div>
      </Spin>
    </div>
  );
}
