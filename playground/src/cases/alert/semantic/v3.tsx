import { Alert } from 'shineout-v3';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Alert
        type='info'
        icon
        title='Heading'
        closable
        classNames={{
          icon: 'my-alert-icon',
          title: 'my-alert-title',
          content: 'my-alert-content',
          close: 'my-alert-close',
        }}
        styles={{
          root: { borderRadius: 8 },
          title: { fontSize: 16 },
          content: { color: '#555' },
        }}
      >
        This is a line of important text for alerting purposes
      </Alert>
      <Alert
        type='danger'
        icon
        closable
        classNames={{ root: ({ type }) => `my-alert my-alert--${type}` }}
        styles={{ root: { borderRadius: 8 } }}
      >
        Danger alert with functional classNames
      </Alert>
    </div>
  );
}
