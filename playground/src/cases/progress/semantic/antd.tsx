import { Progress } from 'antd';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Progress
        percent={65}
        classNames={{ root: 'my-progress', rail: 'my-track', track: 'my-indicator' }}
        styles={{ rail: { borderRadius: 4, height: 10 }, track: { borderRadius: 4 } }}
      />
      <div style={{ display: 'flex', gap: 24 }}>
        <Progress
          type='circle'
          percent={80}
          size={80}
          strokeWidth={7.5}
          classNames={({ props }) => ({
            root: (props.percent ?? 0) >= 100 ? 'progress-done' : 'progress-active',
            indicator: 'my-circle-content',
          })}
          styles={{ indicator: { fontSize: 16, fontWeight: 'bold' } }}
        />
        <Progress
          type='circle'
          percent={100}
          status='success'
          size={80}
          strokeWidth={7.5}
          classNames={({ props }) => ({ root: `progress-${props.status ?? 'normal'}` })}
        />
      </div>
    </div>
  );
}
