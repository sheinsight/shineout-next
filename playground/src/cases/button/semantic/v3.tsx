import { Button } from 'shineout-v3';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button type='primary' classNames={{ root: 'my-button' }} styles={{ root: { borderRadius: 20 } }}>
        Rounded Button
      </Button>
      <Button
        type='primary'
        loading
        classNames={{
          root: ({ loading }) => (loading ? 'btn btn--loading' : 'btn'),
          loading: 'my-spinner',
        }}
        styles={{ loading: { marginRight: 8 } }}
      >
        Submitting
      </Button>
    </div>
  );
}
