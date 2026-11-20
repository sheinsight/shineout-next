import { Alert } from 'antd';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Alert
        showIcon
        closable
        type='info'
        title='Heading'
        description='This is a line of important text for alerting purposes'
        classNames={{
          icon: 'my-alert-icon',
          title: 'my-alert-title',
          description: 'my-alert-content',
          close: 'my-alert-close',
        }}
        styles={{
          root: { borderRadius: 8 },
          title: { fontSize: 16 },
          description: { color: '#555' },
        }}
      />
      <Alert
        showIcon
        closable
        type='error'
        title='Danger alert with functional classNames'
        classNames={({ props }) => ({ root: `my-alert my-alert--${props.type}` })}
        styles={{ root: { borderRadius: 8 } }}
      />
    </div>
  );
}
