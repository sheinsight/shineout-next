import { Progress } from 'shineout-v3';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Progress
        shape='line'
        value={65}
        classNames={{ root: 'my-progress', track: 'my-track', indicator: 'my-indicator' }}
        styles={{ track: { borderRadius: 4, height: 10 }, indicator: { borderRadius: 4 } }}
      >
        65%
      </Progress>
      <div style={{ display: 'flex', gap: 24 }}>
        <Progress
          shape='circle'
          value={80}
          size={80}
          strokeWidth={6}
          classNames={{
            root: ({ value }: { value: number }) => (value >= 100 ? 'progress-done' : 'progress-active'),
            content: 'my-circle-content',
          }}
          styles={{ content: { fontSize: 16, fontWeight: 'bold' } }}
        >
          80%
        </Progress>
        <Progress
          shape='circle'
          value={100}
          type='success'
          size={80}
          strokeWidth={6}
          icon
          classNames={{ root: ({ type }: { type: string }) => `progress-${type}`, icon: 'my-icon' }}
        />
      </div>
    </div>
  );
}
